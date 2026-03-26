import type { Metadata } from "next"
import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import { Footer } from "@/components/footer"
import { PageWrapper } from "@/components/page-wrapper"
import { getPage } from "@/lib/wordpress"
import { MetodologiaContent } from "./metodologia-content"

export const revalidate = 300

export async function generateMetadata(): Promise<Metadata> {
  let page = null
  try {
    page = await getPage("metodologia")
  } catch (error) {
    console.error("Error fetching metodologia page:", error)
  }

  return {
    title: page?.acf?.meta_title || "Metodologia - StaffDigital AI",
    description:
      page?.acf?.meta_description ||
      "Descubre nuestro proceso de implementacion de IA. Metodologia probada enmás de 500 proyectos exitosos.",
  }
}

export default async function MetodologiaPage() {
  let page = null
  try {
    page = await getPage("metodologia")
  } catch (error) {
    console.error("Error fetching metodologia page:", error)
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <GlassmorphismNav />
      <main className="flex-1 pt-20">
        <PageWrapper
          breadcrumbs={[
            { label: "Inicio", href: "/" },
            { label: "Metodologia" },
          ]}
        >
          <MetodologiaContent page={page} />
        </PageWrapper>
      </main>
      <Footer />
    </div>
  )
}
