import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Building2, TrendingUp, Quote, CheckCircle, ArrowRight } from "lucide-react"
import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getCaseStudy, getFeaturedImageUrl, stripHtml } from "@/lib/wordpress"

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params
  const caseStudy = await getCaseStudy(slug)

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
  const caseStudy = await getCaseStudy(slug)

  if (!caseStudy) {
    notFound()
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
                "Integracion con sistemas existentes",
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
              Descubre como StaffDigital AI puede transformar tu empresa con soluciones de automatizacion inteligente personalizadas para tu sector.
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
                  Ver mas casos
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
