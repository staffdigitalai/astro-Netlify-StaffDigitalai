import type { Metadata } from "next"
import { EducacionClient } from "./client"

export const metadata: Metadata = {
  title: "IA para Centros Educativos | StaffDigital AI",
  description: "Automatiza matriculaciones, responde consultas de familias y gestiona comunicaciones con un asistente IA 24/7.",
}

export default function EducacionPage() {
  return <EducacionClient />
}
