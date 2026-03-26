import type { Metadata } from "next"
import { ConversationalAIClient } from "./client"

export const metadata: Metadata = {
  title: "IA Conversacional | Agentes IA con Voz Humana | StaffDigital AI",
  description: "Agentes IA con voz humana, asistentes virtuales, agentes de voz y cualificacion automatica de leads. Atencion al cliente 24/7 para tu negocio.",
}

export default function ConversationalAIPage() {
  return <ConversationalAIClient />
}
