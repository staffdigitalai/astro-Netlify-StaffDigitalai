import { NextRequest, NextResponse } from "next/server"

const CHATWOOT_URL = "https://chat.staffdigital.eu"
const ACCOUNT_ID = "2"
const INBOX_ID = "2"
const API_TOKEN = process.env.CHATWOOT_API_TOKEN

interface ContactPayload {
  name: string
  email: string
  phone_number?: string
  custom_attributes?: Record<string, string>
}

interface ConversationPayload {
  contact_id: number
  inbox_id: number
  message: {
    content: string
  }
  custom_attributes?: Record<string, string>
}

// Create a contact in Chatwoot
async function createContact(data: ContactPayload) {
  const response = await fetch(`${CHATWOOT_URL}/api/v1/accounts/${ACCOUNT_ID}/contacts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api_access_token": API_TOKEN,
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Failed to create contact: ${error}`)
  }

  return response.json()
}

// Create a conversation with a message
async function createConversation(data: ConversationPayload) {
  const response = await fetch(`${CHATWOOT_URL}/api/v1/accounts/${ACCOUNT_ID}/conversations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api_access_token": API_TOKEN,
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Failed to create conversation: ${error}`)
  }

  return response.json()
}

// Add labels to a conversation
async function addLabels(conversationId: number, labels: string[]) {
  const response = await fetch(
    `${CHATWOOT_URL}/api/v1/accounts/${ACCOUNT_ID}/conversations/${conversationId}/labels`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api_access_token": API_TOKEN,
      },
      body: JSON.stringify({ labels }),
    }
  )

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Failed to add labels: ${error}`)
  }

  return response.json()
}

export async function POST(request: NextRequest) {
  try {
    if (!API_TOKEN) {
      console.error("CHATWOOT_API_TOKEN is not set")
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      )
    }

    const body = await request.json()
    const { formType, formData } = body

    if (!formType || !formData) {
      return NextResponse.json(
        { error: "Missing formType or formData" },
        { status: 400 }
      )
    }

    // 1. Create contact
    const contactResponse = await createContact({
      name: formData.nombre || formData.name,
      email: formData.email,
      phone_number: formData.telefono || formData.phone,
      custom_attributes: {
        empresa: formData.empresa || formData.company || "",
        source: "staffdigital.ai",
      },
    })

    const contactId = contactResponse.payload?.contact?.id

    if (!contactId) {
      throw new Error("Failed to get contact ID")
    }

    // 2. Create conversation based on form type
    let messageContent: string
    let labels: string[]
    let customAttributes: Record<string, string> = {
      form_type: formType,
      source: "staffdigital.ai",
    }

    switch (formType) {
      case "consulta":
        messageContent = `Nueva consulta desde staffdigital.ai

Nombre: ${formData.nombre || formData.name}
Email: ${formData.email}
Telefono: ${formData.telefono || formData.phone || "No proporcionado"}
Empresa: ${formData.empresa || formData.company || "No proporcionada"}
Mensaje: ${formData.mensaje || formData.message}`
        labels = ["consulta"]
        break

      case "presupuesto":
        messageContent = `Solicitud de presupuesto desde staffdigital.ai

Nombre: ${formData.nombre || formData.name}
Email: ${formData.email}
Telefono: ${formData.telefono || formData.phone || "No proporcionado"}
Empresa: ${formData.empresa || formData.company || "No proporcionada"}
Servicio: ${formData.servicio || formData.service || "No especificado"}
Presupuesto estimado: ${formData.presupuesto || formData.budget || "No especificado"}
Descripcion: ${formData.descripcion || formData.description || "Sin descripcion"}`
        labels = ["presupuesto"]
        customAttributes.servicio = formData.servicio || formData.service || ""
        break

      case "demo":
        messageContent = `Solicitud de demo desde staffdigital.ai

Nombre: ${formData.nombre || formData.name}
Email: ${formData.email}
Telefono: ${formData.telefono || formData.phone || "No proporcionado"}
Empresa: ${formData.empresa || formData.company || "No proporcionada"}
Producto: ${formData.producto || formData.product || "No especificado"}
Fecha preferida: ${formData.fecha || formData.date || "No especificada"}`
        labels = ["demo"]
        customAttributes.producto = formData.producto || formData.product || ""
        break

      default:
        messageContent = `Formulario desde staffdigital.ai

${JSON.stringify(formData, null, 2)}`
        labels = ["web"]
    }

    const conversationResponse = await createConversation({
      contact_id: contactId,
      inbox_id: parseInt(INBOX_ID),
      message: {
        content: messageContent,
      },
      custom_attributes: customAttributes,
    })

    // 3. Add labels
    if (conversationResponse.id) {
      await addLabels(conversationResponse.id, labels)
    }

    return NextResponse.json({
      success: true,
      contactId,
      conversationId: conversationResponse.id,
    })
  } catch (error) {
    console.error("Chatwoot API error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    )
  }
}
