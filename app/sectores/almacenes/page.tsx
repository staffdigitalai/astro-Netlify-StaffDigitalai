import type { Metadata } from "next"
import { SectorPageClient } from "./client"

export const metadata: Metadata = {
  title: "IA para Almacenes y Logistica | StaffDigital AI",
  description: "Optimiza la gestión de pedidos, coordina entregas y automatiza la comunicacion en tu almacen con IA 24/7.",
}

export default function AlmacenesPage() {
  return <SectorPageClient />
}
