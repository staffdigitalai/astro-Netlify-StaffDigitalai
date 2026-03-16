import type { Metadata } from "next"
import { InmobiliariasClient } from "./client"

export const metadata: Metadata = {
  title: "IA para Inmobiliarias | StaffDigital AI",
  description: "Automatiza la cualificacion de leads, gestiona visitas y responde consultas de compradores e inquilinos con IA 24/7.",
}

export default function InmobiliariasPage() {
  return <InmobiliariasClient />
}
