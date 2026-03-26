import type { Metadata } from "next"
import { SecurityAIClient } from "./client"

export const metadata: Metadata = {
  title: "Seguridad IA y Videovigilancia | Deteccion Inteligente | StaffDigital AI",
  description: "Monitorizacion inteligente con IA, deteccion de personas y vehiculos, alertas automaticas e integración con alarmas. Seguridad 24/7.",
}

export default function SecurityAIPage() {
  return <SecurityAIClient />
}
