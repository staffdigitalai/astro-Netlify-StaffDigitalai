import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { WhatsAppSubPageClient } from "./client"

// Define the valid slugs for WhatsApp sub-pages
const validSlugs = [
  "agente-voz-whatsapp",
  "atencion-cliente-whatsapp", 
  "agente-ventas-whatsapp",
  "citas-reservas-whatsapp",
  "lead-qualification-whatsapp",
  "integracion-crm-whatsapp",
]

// Page metadata mapping
const pageMetadata: Record<string, { title: string; description: string }> = {
  "agente-voz-whatsapp": {
    title: "Agente de Voz WhatsApp IA - Respuestas por Audio | StaffDigital",
    description: "Responde mensajes de voz con IA en WhatsApp. Transcripcion automatica, respuestas por audio naturales y conversaciones fluidas 24/7.",
  },
  "atencion-cliente-whatsapp": {
    title: "Atencion al Cliente WhatsApp 24/7 - Chatbot IA | StaffDigital",
    description: "Automatiza tu atencion al cliente en WhatsApp. Resuelve consultas, gestiona incidencias y da soporte instantaneo sin esperas.",
  },
  "agente-ventas-whatsapp": {
    title: "Agente de Ventas WhatsApp IA - Cierra Ventas Automatico | StaffDigital",
    description: "Convierte leads en clientes por WhatsApp. Cualifica, presenta productos, negocia y cierra ventas automaticamente con IA.",
  },
  "citas-reservas-whatsapp": {
    title: "Citas y Reservas WhatsApp IA - Agenda Automatica | StaffDigital",
    description: "Automatiza la gestion de citas por WhatsApp. Agenda, confirma, envia recordatorios y reduce no-shows hasta un 80%.",
  },
  "lead-qualification-whatsapp": {
    title: "Cualificacion de Leads WhatsApp IA - Scoring Automatico | StaffDigital",
    description: "Cualifica leads automaticamente por WhatsApp. Scoring inteligente, preguntas estrategicas y priorizacion para tu equipo de ventas.",
  },
  "integracion-crm-whatsapp": {
    title: "Integracion CRM WhatsApp - HubSpot, Salesforce, Pipedrive | StaffDigital",
    description: "Conecta WhatsApp con tu CRM. Sincronizacion en tiempo real con HubSpot, Salesforce, Pipedrive y +50 herramientas.",
  },
}

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return validSlugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  
  if (!validSlugs.includes(slug)) {
    return { title: "Pagina no encontrada" }
  }

  const meta = pageMetadata[slug]
  return {
    title: meta?.title || "WhatsApp IA | StaffDigital",
    description: meta?.description || "Soluciones de WhatsApp IA para empresas.",
  }
}

export default async function WhatsAppSubPage({ params }: PageProps) {
  const { slug } = await params

  if (!validSlugs.includes(slug)) {
    notFound()
  }

  return <WhatsAppSubPageClient slug={slug} />
}
