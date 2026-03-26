import type { Metadata } from "next"
import { OmnichannelClient } from "./client"

export const metadata: Metadata = {
  title: "Automatización Omnicanal | Bandeja Unificada y CRM | StaffDigital AI",
  description: "Unifica todos tus canales de comunicacion con IA. Bandeja unificada, respuestas automaticas, automatización de email y CRM integrado.",
}

export default function OmnichannelPage() {
  return <OmnichannelClient />
}
