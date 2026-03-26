import type { Metadata } from "next"
import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import { Footer } from "@/components/footer"
import { PageWrapper } from "@/components/page-wrapper"
import { getPage } from "@/lib/wordpress"
import { IntegracionesContent } from "./integraciones-content"

export const revalidate = 300

export async function generateMetadata(): Promise<Metadata> {
  let page = null
  try {
    page = await getPage("integraciones")
  } catch (error) {
    console.error("Error fetching integraciones page:", error)
  }

  return {
    title: page?.acf?.meta_title || "Integraciónes - StaffDigital AI",
    description:
      page?.acf?.meta_description ||
      "Conecta StaffDigital AI con tus herramientas favoritas. Salesforce, HubSpot, Google Calendar ymás de 100 integraciones.",
  }
}

export default async function IntegraciónesPage() {
  let page = null
  try {
    page = await getPage("integraciones")
  } catch (error) {
    console.error("Error fetching integraciones page:", error)
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <GlassmorphismNav />
      <main className="flex-1 pt-20">
        <PageWrapper
          breadcrumbs={[
            { label: "Inicio", href: "/" },
            { label: "Integraciónes" },
          ]}
        >
          <IntegracionesContent page={page} />
        </PageWrapper>
      </main>
      <Footer />
    </div>
  )
}
