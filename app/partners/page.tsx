import type { Metadata } from "next"
import { getPage, stripHtml } from "@/lib/wordpress"
import { PartnersClient } from "./partners-client"

export const metadata: Metadata = {
  title: "Partners Tecnológicos | StaffDigital AI",
  description:
    "Alianzas con los mejores proveedores de IA, telecomunicaciones y CRM. Nuestros partners garantizan la máxima calidad de servicio.",
  openGraph: {
    title: "Partners Tecnológicos | StaffDigital AI",
    description: "Alianzas estratégicas para resultados excepcionales.",
  },
}

export const revalidate = 3600

export default async function PartnersPage() {
  let page = null
  try {
    page = await getPage("partners")
  } catch (error) {
    console.error("Error fetching partners page:", error)
  }

  return (
    <main className="min-h-screen pt-32 pb-20 px-4">
      <PartnersClient page={page} />
    </main>
  )
}
