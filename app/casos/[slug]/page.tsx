import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Building2, TrendingUp, Quote, CheckCircle, ArrowRight } from "lucide-react"
import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { WPCaseStudy } from "@/lib/wordpress"

// Sample case studies data (same as cases-content.tsx)
const sampleCases: WPCaseStudy[] = [
  {
    id: 1,
    slug: "automatización-retail",
    title: { rendered: "Automatización de Atencion al Cliente para Retail" },
    content: { rendered: `
      <p>RetailMax, una cadena de tiendas conmás de 50 sucursales, enfrentaba el desafio de gestionar miles de consultas diarias de clientes sobre disponibilidad de productos, horarios y promociones.</p>
      
      <h2>El Desafio</h2>
      <p>El equipo de atención al cliente estaba sobrecargado, con tiempos de respuesta que superaban las 4 horas en promedio. Esto generaba frustracion en los clientes y perdida de ventas potenciales.</p>
      
      <h2>La Solucion</h2>
      <p>Implementamos un asistente virtual inteligente capaz de:</p>
      <ul>
        <li>Responder consultas sobre disponibilidad de productos en tiempo real</li>
        <li>Proporcionar información de horarios y ubicaciones</li>
        <li>Gestionar quejas y redirigir casos complejos a agentes humanos</li>
        <li>Ofrecer recomendaciones personalizadas basadas en el historial de compras</li>
      </ul>
      
      <h2>Resultados</h2>
      <p>En solo 3 meses de implementacion, los resultados superaron las expectativas. El tiempo de respuesta se redujo drasticamente y la satisfaccion del cliente mejoro significativamente.</p>
    ` },
    excerpt: { rendered: "Reduccion del 70% en tiempos de respuesta." },
    date: new Date().toISOString(),
    featured_media: 0,
    acf: {
      cliente: "RetailMax",
      sector: "Retail",
      resultado: "70% reduccion en tiempos de respuesta, 45% ahorro en costes operativos",
      testimonio: "La solución de StaffDigital transformo completamente nuestra atención al cliente. Ahora podemos atender amás clientes con mejor calidad."
    }
  },
  {
    id: 2,
    slug: "clinica-dental-automation",
    title: { rendered: "Gestion Inteligente de Citas para Clinica Dental" },
    content: { rendered: `
      <p>DentalCare Plus, una red de clinicas dentales, necesitaba optimizar su proceso de gestión de citas que consumia gran parte del tiempo del personal administrativo.</p>
      
      <h2>El Desafio</h2>
      <p>La clinica recibia cientos de llamadas diarias para agendar, modificar o cancelar citas. El proceso manual generaba errores, citas duplicadas y un alto indice de no-shows.</p>
      
      <h2>La Solucion</h2>
      <p>Desarrollamos un sistema de reservas automatizado que incluye:</p>
      <ul>
        <li>Agente IA para agendar citas 24/7 via WhatsApp y web</li>
        <li>Sistema de recordatorios automaticos via SMS y email</li>
        <li>Gestion inteligente de lista de espera</li>
        <li>Dashboard de analitica para optimizar horarios</li>
      </ul>
      
      <h2>Resultados</h2>
      <p>La implementacion permitio al personal enfocarse en tareas de mayor valor mientras el sistema manejaba la programacion de manera eficiente.</p>
    ` },
    excerpt: { rendered: "Aumento del 50% en eficiencia de agenda." },
    date: new Date().toISOString(),
    featured_media: 0,
    acf: {
      cliente: "DentalCare Plus",
      sector: "Salud",
      resultado: "50%más eficiencia en gestión de citas, 30% reducción de no-shows",
      testimonio: "Ahora nuestro equipo puede enfocarse en lo que realmente importa: los pacientes. El sistema de citas funciona perfectamente."
    }
  },
  {
    id: 3,
    slug: "logistica-predictiva",
    title: { rendered: "Optimizacion Logistica con IA Predictiva" },
    content: { rendered: `
      <p>LogiTech Solutions, empresa de distribucion con operaciones en 5 paises, enfrentaba desafios significativos en la prediccion de demanda y gestión de inventario.</p>
      
      <h2>El Desafio</h2>
      <p>La falta de precision en las predicciones generaba exceso de inventario en algunos productos y escasez en otros, impactando tanto los costes como la satisfaccion del cliente.</p>
      
      <h2>La Solucion</h2>
      <p>Implementamos un sistema de IA predictiva que:</p>
      <ul>
        <li>Analiza datos historicos y tendencias del mercado</li>
        <li>Predice demanda con alta precision por producto y region</li>
        <li>Optimiza automaticamente los niveles de inventario</li>
        <li>Genera alertas proactivas para reabastecimiento</li>
      </ul>
      
      <h2>Resultados</h2>
      <p>La precision en la prediccion de demanda mejoro drasticamente, reduciendo tanto el exceso de inventario como las situaciones de falta de stock.</p>
    ` },
    excerpt: { rendered: "35% mejora en precision de inventario." },
    date: new Date().toISOString(),
    featured_media: 0,
    acf: {
      cliente: "LogiTech Solutions",
      sector: "Logistica",
      resultado: "35% mejora en precision de inventario, 20% reducción de costes de almacen",
      testimonio: "La IA nos permite anticipar la demanda con una precision que nunca imaginamos. Ha transformado completamente nuestra operacion."
    }
  },
  {
    id: 4,
    slug: "finanzas-automatizadas",
    title: { rendered: "Automatización de Procesos Financieros" },
    content: { rendered: `
      <p>FinanceGroup, firma de servicios financieros, necesitaba modernizar sus procesos de conciliacion y facturacion que consumian cientos de horas mensuales.</p>
      
      <h2>El Desafio</h2>
      <p>Los procesos manuales de conciliacion bancaria y facturacion generaban errores frecuentes, retrasos en los cierres mensuales y alto consumo de recursos humanos.</p>
      
      <h2>La Solucion</h2>
      <p>Desarrollamos una plataforma de automatización financiera que incluye:</p>
      <ul>
        <li>Conciliacion bancaria automatica con deteccion de discrepancias</li>
        <li>Generacion y envio automatico de facturas</li>
        <li>Clasificacion inteligente de gastos</li>
        <li>Reportes financieros automatizados</li>
      </ul>
      
      <h2>Resultados</h2>
      <p>El cierre mensual que antes tomaba una semana ahora se completa en menos de dos dias, con una reduccion dramatica en errores.</p>
    ` },
    excerpt: { rendered: "80% reduccion en errores de facturacion." },
    date: new Date().toISOString(),
    featured_media: 0,
    acf: {
      cliente: "FinanceGroup",
      sector: "Finanzas",
      resultado: "80% reduccion en errores, 60% ahorro de tiempo en conciliaciones",
      testimonio: "El ROI fue evidente desde el primer mes de implementacion. Nuestro equipo financiero ahora se enfoca en analisis estrategico."
    }
  }
]

// Helper to strip HTML from excerpt
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim()
}

// Helper to get featured image URL
function getFeaturedImageUrl(caseStudy: WPCaseStudy, size: "medium" | "large" | "full" = "large"): string | null {
  const media = caseStudy._embedded?.["wp:featuredmedia"]?.[0]
  if (!media) return null
  return media.source_url
}

async function getCaseData(slug: string): Promise<WPCaseStudy | null> {
  // First try to get from WordPress API
  try {
    const apiUrl = "https://cms.staffdigital.ai/wp-json/wp/v2"
    const response = await fetch(`${apiUrl}/case-studies?slug=${slug}&_embed=1`, {
      next: { revalidate: 300 }
    })
    
    if (response.ok) {
      const cases = await response.json()
      if (cases.length > 0) {
        return cases[0]
      }
    }
  } catch (error) {
    console.error("Error fetching case study from API:", error)
  }
  
  // Fallback to sample data
  return sampleCases.find(c => c.slug === slug) || null
}

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params
  const caseStudy = await getCaseData(slug)

  if (!caseStudy) {
    return {
      title: "Caso no encontrado - StaffDigital AI",
    }
  }

  return {
    title: `${stripHtml(caseStudy.title.rendered)} - Casos de Exito | StaffDigital AI`,
    description: caseStudy.acf?.resultado || stripHtml(caseStudy.excerpt.rendered).slice(0, 160),
  }
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params
  const caseStudy = await getCaseData(slug)

  if (!caseStudy) {
    return (
      <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
        <GlassmorphismNav />
        <div className="relative z-10 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-foreground mb-4">Caso no encontrado</h1>
            <p className="text-muted-foreground mb-8">El caso de exito que buscas no existe o ha sido eliminado.</p>
            <Button asChild>
              <Link href="/casos">Volver a casos de exito</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  const imageUrl = getFeaturedImageUrl(caseStudy, "full")

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-orange-500/3 rounded-full blur-[100px]" />
      </div>

      <GlassmorphismNav />

      <article className="relative z-10 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <Link href="/casos" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 group">
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Volver a casos de exito
          </Link>

          {/* Header */}
          <header className="space-y-6 mb-12">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-3">
              {caseStudy.acf?.sector && (
                <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 px-3 py-1">
                  {caseStudy.acf.sector}
                </Badge>
              )}
              {caseStudy.acf?.cliente && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Building2 className="h-4 w-4" />
                  <span>{caseStudy.acf.cliente}</span>
                </div>
              )}
            </div>

            {/* Title */}
            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight text-balance"
              dangerouslySetInnerHTML={{ __html: caseStudy.title.rendered }}
            />
          </header>

          {/* Featured Image */}
          {imageUrl && (
            <div className="relative w-full h-64 sm:h-80 md:h-[480px] rounded-2xl overflow-hidden mb-12">
              <Image
                src={imageUrl}
                alt={stripHtml(caseStudy.title.rendered)}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Key Results Card */}
          {caseStudy.acf?.resultado && (
            <div className="mb-12 p-6 md:p-8 rounded-2xl border border-green-500/20 bg-gradient-to-br from-green-500/10 to-emerald-500/5">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="h-6 w-6 text-green-400" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-2">Resultado Principal</h2>
                  <p className="text-xl md:text-2xl font-bold text-green-400">
                    {caseStudy.acf.resultado}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Content */}
          <div
            className="prose prose-invert prose-lg max-w-none mb-12
              prose-headings:text-foreground prose-headings:font-bold
              prose-p:text-muted-foreground prose-p:leading-relaxed
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-strong:text-foreground
              prose-ul:text-muted-foreground prose-ol:text-muted-foreground
              prose-li:marker:text-primary
              prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground prose-blockquote:italic
              prose-img:rounded-xl prose-img:shadow-lg"
            dangerouslySetInnerHTML={{ __html: caseStudy.content.rendered }}
          />

          {/* Testimonial */}
          {caseStudy.acf?.testimonio && (
            <div className="mb-12 p-6 md:p-8 rounded-2xl border border-border bg-card/50 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0">
                  <Quote className="h-6 w-6 text-amber-400" />
                </div>
                <div>
                  <p className="text-lg md:text-xl text-foreground italic leading-relaxed mb-4">
                    &ldquo;{caseStudy.acf.testimonio}&rdquo;
                  </p>
                  {caseStudy.acf?.cliente && (
                    <p className="text-muted-foreground font-medium">
                      - {caseStudy.acf.cliente}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Key Benefits */}
          <div className="mb-12 p-6 md:p-8 rounded-2xl border border-border bg-card/50 backdrop-blur-sm">
            <h3 className="text-xl font-bold text-foreground mb-6">Por que elegir StaffDigital AI</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                "Implementacion rapida y personalizada",
                "Integración con sistemas existentes",
                "Soporte continuo 24/7",
                "ROI demostrable desde el primer mes"
              ].map((benefit, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-muted-foreground">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer CTA */}
          <div className="p-8 rounded-3xl border border-white/20 bg-[radial-gradient(35%_128px_at_50%_0%,theme(backgroundColor.white/15%),theme(backgroundColor.white/5%))] text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Quieres resultados similares?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Descubre como StaffDigital AI puede transformar tu empresa con agentes IA con voz humana personalizados para tu sector.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="rounded-full group">
                <Link href="/#contact">
                  Solicitar Demo
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full">
                <Link href="/casos">
                  Vermás casos
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  )
}
