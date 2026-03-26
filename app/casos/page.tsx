import type { Metadata } from "next"
import { Suspense } from "react"
import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import { Footer } from "@/components/footer"
import { CasesContent } from "./cases-content"
import { getSectors } from "@/lib/wordpress"

export const metadata: Metadata = {
  title: "Casos de Exito - StaffDigital AI",
  description: "Descubre como hemos ayudado a empresas a transformar sus operaciones con automatización IA.",
}

export default async function CasosPage() {
  let sectors: Awaited<ReturnType<typeof getSectors>> = []
  
  try {
    sectors = await getSectors()
  } catch (error) {
    console.error("Error fetching sectors:", error)
  }

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-primary/3 rounded-full blur-[100px]" />
      </div>

      <GlassmorphismNav />

      <div className="relative z-10 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-foreground text-sm font-medium mb-6 animate-fade-in-badge">
              <span className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse" />
              Casos de Exito
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground leading-tight text-balance mb-6 animate-fade-in-heading">
              Historias de{" "}
              <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-orange-400 bg-clip-text text-transparent">
                Transformacion
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-in-subheading">
              Descubre como empresas reales han revolucionado sus operaciones con nuestras soluciones de IA.
            </p>
          </div>

          {/* Cases Content with Filters */}
          <Suspense
            fallback={
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="rounded-2xl border border-border bg-card animate-pulse h-[300px]" />
                ))}
              </div>
            }
          >
            <CasesContent initialSectors={sectors} />
          </Suspense>
        </div>
      </div>

      <Footer />
    </main>
  )
}
