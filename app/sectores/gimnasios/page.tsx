import type { Metadata } from "next"
import { GimnasiosClient } from "./client"

export const metadata: Metadata = {
  title: "IA para Gimnasios y Centros Deportivos | StaffDigital AI",
  description: "Automatiza altas de socios, reserva de clases y atención al cliente con un asistente IA disponible 24/7.",
}

export default function GimnasiosPage() {
  return <GimnasiosClient />
}
