import type { Metadata } from "next"
import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import { Footer } from "@/components/footer"
import { PageWrapper } from "@/components/page-wrapper"
import { getPage } from "@/lib/wordpress"
import { DemoContent } from "./demo-content"

export const revalidate = 300

export async function generateMetadata(): Promise<Metadata> {
  let page = null
  try {
    page = await getPage("demo")
  } catch (error) {
    console.error("Error fetching demo page:", error)
  }

  return {
    title: page?.acf?.meta_title || "Demo Gratuita - Agentes IA con Voz Humana",
    description:
      page?.acf?.meta_description ||
      "Escucha la diferencia. Demo gratuita de agentes IA con voz humana. Voz masculina y femenina disponible.",
  }
}

export default async function DemoPage() {
  let page = null
  try {
    page = await getPage("demo")
  } catch (error) {
    console.error("Error fetching demo page:", error)
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <GlassmorphismNav />
      <main className="flex-1 pt-20">
        <PageWrapper
          breadcrumbs={[
            { label: "Inicio", href: "/" },
            { label: "Solicitar Demo" },
          ]}
        >
          <DemoContent page={page} />
        </PageWrapper>
      </main>
      <Footer />
    </div>
  )
}
