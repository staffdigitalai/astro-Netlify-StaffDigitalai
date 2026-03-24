import { NextRequest, NextResponse } from "next/server"

const CHATWOOT_URL = "https://chat.staffdigital.eu"
const ACCOUNT_ID = "2"
const INBOX_ID = "2"
const API_TOKEN = process.env.CHATWOOT_API_TOKEN
const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY
const ELEVENLABS_WEBHOOK_SECRET = process.env.ELEVENLABS_WEBHOOK_SECRET

// ---------- Chatwoot helpers ----------

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
        c.phone_number?.replace(/[\s\-]/g, "") === phone.replace(/[\s\-]/g, "")
    ) || null
  )
}

async function searchContactByEmail(email: string) {
  const response = await fetch(
    `${CHATWOOT_URL}/api/v1/accounts/${ACCOUNT_ID}/contacts/search?q=${encodeURIComponent(email)}`,
    { headers: { api_access_token: API_TOKEN! } }
  )
  if (!response.ok) return null
  const data = await response.json()
  return (
    data.payload?.find(
      (c: { email?: string }) => c.email?.toLowerCase() === email.toLowerCase()
    ) || null
  )
}

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
      headers: { "Content-Type": "application/json", api_access_token: API_TOKEN! },
      body: JSON.stringify(data),
    }
  )
  if (!response.ok) return null
  return response.json()
}

async function getOrCreateContact(phone?: string, email?: string, name?: string) {
  if (phone) {
    const byPhone = await searchContactByPhone(phone)
    if (byPhone) return byPhone
  }
  if (email) {
    const byEmail = await searchContactByEmail(email)
    if (byEmail) {
      if (phone && !byEmail.phone_number) {
        await fetch(
          `${CHATWOOT_URL}/api/v1/accounts/${ACCOUNT_ID}/contacts/${byEmail.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json", api_access_token: API_TOKEN! },
            body: JSON.stringify({ phone_number: phone }),
          }
        )
      }
      return byEmail
    }
  }
  const result = await createContact({
    name: name || phone || "Llamada telefonica",
    ...(phone ? { phone_number: phone } : {}),
    ...(email ? { email } : {}),
    custom_attributes: { source: "elevenlabs-phone" },
  })
  return result?.payload?.contact || null
}

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
      headers: { "Content-Type": "application/json", api_access_token: API_TOKEN! },
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
  if (conv.id && labels.length > 0) {
    await fetch(
      `${CHATWOOT_URL}/api/v1/accounts/${ACCOUNT_ID}/conversations/${conv.id}/labels`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json", api_access_token: API_TOKEN! },
        body: JSON.stringify({ labels }),
      }
    )
  }
  return conv
}

// ---------- ElevenLabs API ----------

interface ElevenLabsConversation {
  conversation_id: string
  agent_id: string
  agent_name: string
  status: string
  transcript: Array<{ role: "agent" | "user"; message: string; time_in_call_secs?: number }>
  metadata: {
    start_time_unix_secs: number
    call_duration_secs: number
    cost: number
  }
  analysis: {
    call_successful: string
    transcript_summary: string
    data_collection_results: Record<string, { value?: string }>
    data_collection_results_list: Array<{ name: string; value: string }>
  }
  conversation_initiation_client_data: {
    dynamic_variables: {
      system__caller_id?: string
      system__called_number?: string
      system__call_duration_secs?: number
      [key: string]: unknown
    }
  }
}

async function fetchConversationFromElevenLabs(conversationId: string): Promise<ElevenLabsConversation | null> {
  if (!ELEVENLABS_API_KEY) {
    console.error("ELEVENLABS_API_KEY not set — cannot fetch conversation details")
    return null
  }

  // Retry up to 3 times with delay (transcript may not be ready immediately)
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const response = await fetch(
        `https://api.elevenlabs.io/v1/convai/conversations/${conversationId}`,
        { headers: { "xi-api-key": ELEVENLABS_API_KEY } }
      )

      if (!response.ok) {
        console.error(`ElevenLabs API error (attempt ${attempt + 1}):`, response.status, await response.text())
        if (attempt < 2) {
          await new Promise(r => setTimeout(r, 3000 * (attempt + 1))) // 3s, 6s
          continue
        }
        return null
      }

      const data = await response.json()

      // Check if transcript is available
      if (data.transcript && data.transcript.length > 0) {
        return data as ElevenLabsConversation
      }

      // Transcript might not be ready yet — wait and retry
      if (attempt < 2) {
        console.log(`Transcript empty on attempt ${attempt + 1}, retrying in ${3 * (attempt + 1)}s...`)
        await new Promise(r => setTimeout(r, 3000 * (attempt + 1)))
      } else {
        // Return what we have even without transcript
        return data as ElevenLabsConversation
      }
    } catch (err) {
      console.error(`ElevenLabs API fetch error (attempt ${attempt + 1}):`, err)
      if (attempt < 2) await new Promise(r => setTimeout(r, 3000 * (attempt + 1)))
    }
  }
  return null
}

// ---------- Process call and create Chatwoot record ----------

async function processCall(conversationId: string, agentIdFromWebhook?: string) {
  // 1. Fetch full conversation details from ElevenLabs API
  const conv = await fetchConversationFromElevenLabs(conversationId)

  if (!conv) {
    console.error("Could not fetch conversation from ElevenLabs:", conversationId)
    // Create a minimal record so we don't lose track
    const contact = await getOrCreateContact(undefined, undefined, "Llamada sin datos")
    if (contact) {
      await createConversation(
        contact.id,
        `📞 Llamada telefonica IA\n\n⚠️ No se pudieron obtener los datos de la conversacion ${conversationId} desde ElevenLabs.`,
        ["llamada-ia", "elevenlabs", "error"],
        { source: "elevenlabs", conversation_id: conversationId }
      )
    }
    return
  }

  // 2. Extract caller phone from dynamic_variables
  const dynVars = conv.conversation_initiation_client_data?.dynamic_variables || {}
  let callerPhone: string | undefined
  const rawCallerId = dynVars.system__caller_id
  if (rawCallerId) {
    const cleaned = String(rawCallerId).replace(/[^\d+]/g, "")
    callerPhone = cleaned.startsWith("+") ? cleaned
      : cleaned.length <= 9 ? `+34${cleaned}`
      : `+${cleaned}`
  }

  // 3. Extract collected data (name, email from agent data collection)
  const collected = conv.analysis?.data_collection_results || {}
  const collectedList = conv.analysis?.data_collection_results_list || []
  const callerName = collectedList.find(d => d.name === "nombre")?.value
    || collected.nombre?.value
    || collected.name?.value
    || undefined
  const callerEmail = collectedList.find(d => d.name === "email")?.value
    || collected.email?.value
    || undefined

  // 4. Build transcript
  const agentName = conv.agent_name || "Agente IA"
  const transcript = conv.transcript || []
  const transcriptText = transcript
    .map((entry) => {
      const speaker = entry.role === "agent" ? `🤖 ${agentName}` : "👤 Cliente"
      const time = entry.time_in_call_secs != null
        ? `[${Math.floor(entry.time_in_call_secs / 60)}:${String(Math.floor(entry.time_in_call_secs % 60)).padStart(2, "0")}]`
        : ""
      return `${time} ${speaker}: ${entry.message}`
    })
    .join("\n")

  // 5. Build summary
  const durationSecs = conv.metadata?.call_duration_secs || 0
  const duration = durationSecs > 0
    ? `${Math.floor(durationSecs / 60)}m ${Math.floor(durationSecs % 60)}s`
    : "N/A"
  const successful = conv.analysis?.call_successful || conv.status || "N/A"
  const summary = conv.analysis?.transcript_summary || ""

  // 6. Build Chatwoot message
  const messageContent = `📞 Llamada telefonica IA — ${agentName}

📊 Resumen:
• Duracion: ${duration}
• Estado: ${successful}
• Agente: ${agentName}
• Telefono cliente: ${callerPhone || "Desconocido"}
${callerName ? `• Nombre: ${callerName}` : ""}
${callerEmail ? `• Email: ${callerEmail}` : ""}
${summary ? `\n📝 Resumen IA: ${summary}` : ""}

💬 Transcripcion:
${transcriptText || "Sin transcripcion disponible"}`

  // 7. Get or create contact (merges with existing chat/WhatsApp contacts)
  const contact = await getOrCreateContact(
    callerPhone,
    callerEmail,
    callerName || (callerPhone ? `Llamada ${callerPhone}` : undefined)
  )

  if (!contact) {
    console.error("Failed to get or create contact for", callerPhone, callerEmail)
    return
  }

  // 8. Create conversation with transcript
  const chatwootConv = await createConversation(
    contact.id,
    messageContent,
    ["llamada-ia", "elevenlabs"],
    {
      form_type: "llamada-ia",
      source: "elevenlabs",
      agent_name: agentName,
      conversation_id: conversationId,
      call_duration: duration,
      call_successful: String(successful),
    }
  )

  console.log(
    "Chatwoot conversation created:", chatwootConv?.id,
    "for contact:", contact.id,
    "phone:", callerPhone,
    "ElevenLabs conv:", conversationId
  )
}

// ---------- Main webhook handler ----------

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

    const rawBody = await request.text()
    console.log("ElevenLabs webhook received:", rawBody.substring(0, 500))

    let payload: Record<string, unknown>
    try {
      payload = JSON.parse(rawBody)
    } catch {
      console.error("Failed to parse webhook payload:", rawBody.substring(0, 500))
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
    }

    // Extract conversation_id — the key piece we need
    const conversationId = (payload.conversation_id as string)
      || (payload.data as Record<string, unknown>)?.conversation_id as string
      || undefined
    const agentId = (payload.agent_id as string) || undefined

    console.log("Webhook event — conversation_id:", conversationId, "agent_id:", agentId,
      "type:", payload.type || payload.event_type || "unknown")

    if (!conversationId) {
      console.error("No conversation_id in webhook payload. Keys:", Object.keys(payload).join(", "))
      // Still return 200 so ElevenLabs doesn't disable the webhook
      return NextResponse.json({ received: true, error: "no conversation_id" })
    }

    // IMPORTANT: Respond 200 immediately, process async
    // ElevenLabs requires fast response to keep webhook active
    // Use waitUntil pattern for Vercel Edge/Serverless
    const processPromise = processCall(conversationId, agentId)

    // In Vercel serverless, we can't use waitUntil easily,
    // so we await but with a timeout safety net
    const timeoutPromise = new Promise<void>(resolve => setTimeout(resolve, 25000))
    await Promise.race([processPromise, timeoutPromise])

    return NextResponse.json({ success: true, conversation_id: conversationId })
  } catch (error) {
    console.error("ElevenLabs webhook error:", error)
    // Always return 200 to prevent webhook deactivation
    return NextResponse.json({
      received: true,
      error: error instanceof Error ? error.message : "Unknown error",
    })
  }
}

// Health check
export async function GET() {
  return NextResponse.json({ status: "ok", service: "elevenlabs-webhook" })
}
