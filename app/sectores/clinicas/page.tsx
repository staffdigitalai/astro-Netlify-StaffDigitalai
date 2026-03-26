import type { Metadata } from "next"
import { SectorPageClient } from "./client"

export const metadata: Metadata = {
  title: "IA para Clinicas y Centros Medicos | StaffDigital AI",
  description: "Automatiza la gestión de citas, responde consultas de pacientes y optimiza la recepcion de tu clinica con IA 24/7.",
}

export default function ClinicasPage() {
  return <SectorPageClient />
}
