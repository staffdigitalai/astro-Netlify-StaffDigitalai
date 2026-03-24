import { NextRequest, NextResponse } from "next/server"

const CHATWOOT_URL = "https://chat.staffdigital.eu"
const ACCOUNT_ID = "2"
const INBOX_ID = "2"
const API_TOKEN = process.env.CHATWOOT_API_TOKEN
const ELEVENLABS_WEBHOOK_SECRET = process.env.ELEVENLABS_WEBHOOK_SECRET

// ---------- Chatwoot helpers ----------

// Search contact by phone number (E.164 format)
async function searchContactByPhone(phone: string) {
  const response = await fetch(
    `${CHATWOOT_URL}/api/v1/accounts/${ACCOUNT_ID}/contacts/search?q=${encodeURIComponent(phone)}`,
    { headers: { api_access_token: API_TOKEN! } }
  )
  if (!response.ok) return null
  const data = await response.json()
  return (
    data.payload?.find(
      (c: { phone_number?: string }) =>
        c.phone_number?.replace(/\s/g, "") === phone.replace(/\s/g, "")
    ) || null
  )
}

// Search contact by email
async function searchContactByEmail(email: string) {
  const response = await fetch(
    `${CHATWOOT_URL}/api/v1/accounts/${ACCOUNT_ID}/contacts/search?q=${encodeURIComponent(email)}`,
    { headers: { api_access_token: API_TOKEN! } }
  )
  if (!response.ok) return null
  const data = await response.json()
  return (
    data.payload?.find(
      (c: { email?: string }) =>
        c.email?.toLowerCase() === email.toLowerCase()
    ) || null
  )
}

// Create a new contact
async function createContact(data: {
  name: string
  phone_number?: string
  email?: string
  custom_attributes?: Record<string, string>
}) {
  const response = await fetch(
    `${CHATWOOT_URL}/api/v1/accounts/${ACCOUNT_ID}/contacts`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        api_access_token: API_TOKEN!,
      },
      body: JSON.stringify(data),
    }
  )
  if (!response.ok) return null
  return response.json()
}

// Get or create contact — searches by phone first, then email, then creates
async function getOrCreateContact(phone?: string, email?: string, name?: string) {
  // 1. Search by phone
  if (phone) {
    const byPhone = await searchContactByPhone(phone)
    if (byPhone) return byPhone
  }

  // 2. Search by email
  if (email) {
    const byEmail = await searchContactByEmail(email)
    if (byEmail) {
      // Update phone if contact exists but doesn't have one
      if (phone && !byEmail.phone_number) {
        await fetch(
          `${CHATWOOT_URL}/api/v1/accounts/${ACCOUNT_ID}/contacts/${byEmail.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              api_access_token: API_TOKEN!,
            },
            body: JSON.stringify({ phone_number: phone }),
          }
        )
      }
      return byEmail
    }
  }

  // 3. Create new
  const contactData: Record<string, unknown> = {
    name: name || phone || "Llamada telefonica",
    custom_attributes: { source: "elevenlabs-phone" },
  }
  if (phone) contactData.phone_number = phone
  if (email) contactData.email = email

  const result = await createContact(contactData as Parameters<typeof createContact>[0])
  return result?.payload?.contact || null
}

// Create conversation with transcript
async function createConversation(
  contactId: number,
  messageContent: string,
  labels: string[],
  customAttributes: Record<string, string>
) {
  const response = await fetch(
    `${CHATWOOT_URL}/api/v1/accounts/${ACCOUNT_ID}/conversations`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        api_access_token: API_TOKEN!,
      },
      body: JSON.stringify({
        contact_id: contactId,
        inbox_id: parseInt(INBOX_ID),
        message: { content: messageContent },
        custom_attributes: customAttributes,
      }),
    }
  )
  if (!response.ok) return null
  const conv = await response.json()

  // Add labels
  if (conv.id && labels.length > 0) {
    await fetch(
      `${CHATWOOT_URL}/api/v1/accounts/${ACCOUNT_ID}/conversations/${conv.id}/labels`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          api_access_token: API_TOKEN!,
        },
        body: JSON.stringify({ labels }),
      }
    )
  }

  return conv
}

// ---------- ElevenLabs webhook types ----------

interface ElevenLabsTranscriptEntry {
  role: "agent" | "user"
  message: string
  time_in_call_secs?: number
}

interface ElevenLabsWebhookPayload {
  // Top-level fields
  type?: string
  event_type?: string
  conversation_id?: string
  agent_id?: string
  agent_name?: string
  status?: string
  call_duration_secs?: number
  caller_id?: string
  phone_number?: string
  // Transcript
  transcript?: ElevenLabsTranscriptEntry[]
  // Metadata — contains call_duration_secs, start_time, cost
  metadata?: {
    start_time_unix_secs?: number
    call_duration_secs?: number
    [key: string]: unknown
  }
  // Analysis — summary, success, data collection
  analysis?: {
    call_successful?: string
    transcript_summary?: string
    evaluation_criteria_results?: Record<string, unknown>
    data_collection_results?: Record<string, unknown>
    data_collection_results_list?: Array<{ name?: string; value?: string }>
    [key: string]: unknown
  }
  recording_url?: string
  // Client data — contains dynamic_variables with system__caller_id
  conversation_initiation_client_data?: {
    dynamic_variables?: {
      system__caller_id?: string
      system__called_number?: string
      system__call_duration_secs?: number
      system__conversation_id?: string
      [key: string]: unknown
    }
    [key: string]: unknown
  }
}

// ---------- Main handler ----------

export async function POST(request: NextRequest) {
  try {
    if (!API_TOKEN) {
      console.error("CHATWOOT_API_TOKEN not set")
      return NextResponse.json({ error: "Server config error" }, { status: 500 })
    }

    // Verify webhook secret if configured
    if (ELEVENLABS_WEBHOOK_SECRET) {
      const authHeader = request.headers.get("authorization")
      const signature = request.headers.get("x-elevenlabs-signature")
      const secret = authHeader?.replace("Bearer ", "") || signature
      if (secret !== ELEVENLABS_WEBHOOK_SECRET) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
      }
    }

    const payload: ElevenLabsWebhookPayload = await request.json()
    console.log("ElevenLabs webhook received:", JSON.stringify(payload).substring(0, 500))

    // Extract dynamic variables (where ElevenLabs puts phone data for SIP/Telnyx calls)
    const dynVars = payload.conversation_initiation_client_data?.dynamic_variables || {}

    // Extract caller phone — try multiple locations
    let callerPhone = payload.caller_id
      || (dynVars.system__caller_id ? `+${String(dynVars.system__caller_id).replace(/^\+/, "")}` : undefined)
      || undefined
    // Ensure E.164 format
    if (callerPhone && !callerPhone.startsWith("+")) {
      callerPhone = callerPhone.length <= 9 ? `+34${callerPhone}` : `+${callerPhone}`
    }

    const agentName = payload.agent_name || "Agente IA"

    // Extract data collected during the call (name, email, etc.)
    const collectedList = payload.analysis?.data_collection_results_list || []
    const collectedMap = payload.analysis?.data_collection_results as Record<string, { value?: string }> | undefined
    const callerName = collectedList.find(d => d.name === "nombre")?.value
      || collectedMap?.nombre?.value
      || collectedMap?.name?.value
      || undefined
    const callerEmail = collectedList.find(d => d.name === "email")?.value
      || collectedMap?.email?.value
      || undefined

    // Build transcript text
    const transcript = payload.transcript || []
    const transcriptText = transcript
      .map((entry) => {
        const speaker = entry.role === "agent" ? `🤖 ${agentName}` : "👤 Cliente"
        const time = entry.time_in_call_secs != null
          ? `[${Math.floor(entry.time_in_call_secs / 60)}:${String(Math.floor(entry.time_in_call_secs % 60)).padStart(2, "0")}]`
          : ""
        return `${time} ${speaker}: ${entry.message}`
      })
      .join("\n")

    // Build summary — check multiple locations for duration
    const summary = payload.analysis?.transcript_summary || ""
    const durationSecs = payload.call_duration_secs
      || payload.metadata?.call_duration_secs
      || (dynVars.system__call_duration_secs as number)
      || 0
    const duration = durationSecs > 0
      ? `${Math.floor(durationSecs / 60)}m ${Math.floor(durationSecs % 60)}s`
      : "N/A"
    const successful = payload.analysis?.call_successful || payload.status || "N/A"

    // Build message for Chatwoot
    const messageContent = `📞 Llamada telefonica IA — ${agentName}

📊 Resumen:
• Duracion: ${duration}
• Estado: ${successful}
• Agente: ${agentName}
• Telefono cliente: ${callerPhone || "Desconocido"}
${summary ? `• Resumen IA: ${summary}` : ""}

💬 Transcripcion:
${transcriptText || "Sin transcripcion disponible"}
${payload.recording_url ? `\n🎙️ Grabacion: ${payload.recording_url}` : ""}`

    // Get or create contact (merges with existing chat/WhatsApp contacts)
    const contact = await getOrCreateContact(
      callerPhone,
      callerEmail,
      callerName || (callerPhone ? `Llamada ${callerPhone}` : undefined)
    )

    if (!contact) {
      console.error("Failed to get or create contact for", callerPhone)
      return NextResponse.json({ error: "Contact creation failed" }, { status: 500 })
    }

    const contactId = contact.id

    // Create conversation with transcript
    const conv = await createConversation(
      contactId,
      messageContent,
      ["llamada-ia", "elevenlabs"],
      {
        form_type: "llamada-ia",
        source: "elevenlabs",
        agent_name: agentName,
        conversation_id: payload.conversation_id || "",
        call_duration: duration,
        call_successful: String(successful),
      }
    )

    console.log("Chatwoot conversation created:", conv?.id, "for contact:", contactId)

    return NextResponse.json({
      success: true,
      contactId,
      conversationId: conv?.id,
    })
  } catch (error) {
    console.error("ElevenLabs webhook error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    )
  }
}

// Health check
export async function GET() {
  return NextResponse.json({ status: "ok", service: "elevenlabs-webhook" })
}
