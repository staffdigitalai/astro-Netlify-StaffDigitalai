import type { Metadata } from "next"
import { ConcesionariosClient } from "./client"

export const metadata: Metadata = {
  title: "IA para Concesionarios de Coches | StaffDigital AI",
  description: "Automatiza la atención al cliente, cualifica leads y gestiona consultas en tu concesionario con IA 24/7 en todos los canales.",
}

export default function ConcesionariosPage() {
  return <ConcesionariosClient />
}
