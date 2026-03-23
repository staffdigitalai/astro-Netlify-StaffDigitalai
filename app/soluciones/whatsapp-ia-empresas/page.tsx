import type { Metadata } from "next"
import { getService } from "@/lib/wordpress"
import { WhatsAppHubClient } from "./client"

export async function generateMetadata(): Promise<Metadata> {
  try {
    const service = await getService("whatsapp-ia-empresas", "es")
    if (service?.acf?.meta_title) {
      return {
        title: service.acf.meta_title,
        description: service.acf.meta_description || "Automatiza tu atencion al cliente en WhatsApp con IA. Agentes inteligentes 24/7, integracion CRM, y respuestas instantaneas.",
      }
    }
  } catch (error) {
    console.error("Error fetching WhatsApp hub metadata:", error)
  }

  return {
    title: "WhatsApp IA para Empresas - Agentes Inteligentes 24/7 | StaffDigital",
    description: "Automatiza tu atencion al cliente en WhatsApp con IA. Agentes de voz, ventas, citas y soporte 24/7. +90% penetracion WhatsApp en Espana. Respuesta <5s.",
    keywords: ["whatsapp ia", "whatsapp business ia", "chatbot whatsapp", "agente whatsapp", "automatizacion whatsapp"],
  }
}

export default function WhatsAppHubPage() {
  return <WhatsAppHubClient />
}
