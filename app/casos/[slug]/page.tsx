import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Building2, TrendingUp, Quote, CheckCircle2, ArrowRight } from "lucide-react"
import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import { Footer } from "@/components/footer"
import { Aurora } from "@/components/Aurora"
import { Button } from "@/components/ui/button"
import { getCaseStudy, getCaseStudies, getSectors, stripHtml, getFeaturedImageUrl } from "@/lib/wordpress"
import type { Metadata } from "next"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const caseStudy = await getCaseStudy(slug)

  if (!caseStudy) {
    return {
      title: "Caso no encontrado | StaffDigital AI",
    }
  }

  return {
    title: `${stripHtml(caseStudy.title.rendered)} | StaffDigital AI Casos de Exito`,
    description: caseStudy.acf?.descripcion_corta || stripHtml(caseStudy.excerpt?.rendered || ''),
    openGraph: {
      title: stripHtml(caseStudy.title.rendered),
      description: caseStudy.acf?.descripcion_corta || stripHtml(caseStudy.excerpt?.rendered || ''),
      type: "article",
    },
  }
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params
  const [caseStudy, sectors] = await Promise.all([
    getCaseStudy(slug),
    getSectors()
  ])

  if (!caseStudy) {
    notFound()
  }

  const imageUrl = getFeaturedImageUrl(caseStudy)
  
  // Get sector name
  const sectorId = typeof caseStudy.acf?.sector === 'string' 
    ? parseInt(caseStudy.acf.sector, 10) 
    : caseStudy.acf?.sector
  const sectorName = sectors.find(s => s.id === sectorId)?.name || ''

  // Get related case studies
  const relatedCasesData = await getCaseStudies({
    sector: sectorId,
    perPage: 4
  })
  const relatedCases = relatedCasesData.data.filter(c => c.id !== caseStudy.id).slice(0, 3)

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Aurora Effect */}
      <div className="fixed inset-0 -z-10">
        <Aurora
          colorStops={["#22c55e", "#16a34a", "#15803d"]}
          amplitude={1.2}
          blend={0.6}
          speed={0.2}
        />
      </div>

      {/* Navigation */}
      <GlassmorphismNav />

      {/* Article */}
      <article className="pt-32 pb-20 px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Back Link */}
          <Link
            href="/casos"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Volver a Casos de Exito
          </Link>

          {/* Header */}
          <header className="mb-10">
            {/* Meta badges */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              {sectorName && (
                <span className="px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full border border-primary/20">
                  {sectorName}
                </span>
              )}
              {caseStudy.acf?.cliente && (
                <span className="px-3 py-1 text-sm bg-white/10 text-white/80 rounded-full border border-white/10">
                  {caseStudy.acf.cliente}
                </span>
              )}
            </div>

            {/* Title */}
            <h1
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight text-balance"
              dangerouslySetInnerHTML={{ __html: caseStudy.title.rendered }}
            />
          </header>

          {/* Featured Image */}
          {imageUrl && (
            <div className="relative aspect-video rounded-2xl overflow-hidden mb-10 border border-white/10">
              <Image
                src={imageUrl}
                alt={stripHtml(caseStudy.title.rendered)}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Key Result Card */}
          {caseStudy.acf?.resultado && (
            <div className="bg-gradient-to-r from-primary/10 to-orange-500/10 border border-primary/20 rounded-2xl p-8 mb-10">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <p className="text-white/60 text-sm mb-1">Resultado Principal</p>
                  <p className="text-3xl md:text-4xl font-bold text-white">{caseStudy.acf.resultado}</p>
                </div>
              </div>
            </div>
          )}

          {/* Content */}
          <div
            className="prose prose-invert prose-lg max-w-none mb-12
              prose-headings:text-white prose-headings:font-bold
              prose-p:text-white/70 prose-p:leading-relaxed
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-strong:text-white
              prose-ul:text-white/70 prose-ol:text-white/70
              prose-li:marker:text-primary
              prose-blockquote:border-l-primary prose-blockquote:text-white/60 prose-blockquote:italic
              prose-img:rounded-xl prose-img:border prose-img:border-white/10"
            dangerouslySetInnerHTML={{ __html: caseStudy.content.rendered }}
          />

          {/* Testimonial */}
          {caseStudy.acf?.testimonio && (
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-10">
              <Quote className="w-8 h-8 text-primary/30 mb-4" />
              <blockquote className="text-xl md:text-2xl text-white/80 italic leading-relaxed mb-6">
                "{caseStudy.acf.testimonio}"
              </blockquote>
              {caseStudy.acf?.cliente && (
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-orange-500/20 flex items-center justify-center border border-white/10">
                    <Building2 className="w-5 h-5 text-white/60" />
                  </div>
                  <div>
                    <p className="text-white font-medium">{caseStudy.acf.cliente}</p>
                    {sectorName && <p className="text-white/50 text-sm">{sectorName}</p>}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* CTA */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-3">
              Quieres resultados similares?
            </h3>
            <p className="text-white/60 mb-6 max-w-lg mx-auto">
              Descubre como StaffDigital AI puede transformar tu negocio con soluciones de IA personalizadas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-black rounded-full px-8 hover:bg-gray-50 hover:scale-105 transition-all group"
              >
                Pide tu Demo
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white rounded-full px-8 hover:bg-white/10"
                asChild
              >
                <Link href="/casos">Ver mas casos</Link>
              </Button>
            </div>
          </div>
        </div>
      </article>

      {/* Related Cases */}
      {relatedCases.length > 0 && (
        <section className="py-16 px-4 border-t border-white/10 relative z-10">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-8">Casos Relacionados</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedCases.map((relatedCase) => {
                const relatedImageUrl = getFeaturedImageUrl(relatedCase)
                return (
                  <Link
                    key={relatedCase.id}
                    href={`/casos/${relatedCase.slug}`}
                    className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                  >
                    <div className="relative h-40 overflow-hidden bg-gradient-to-br from-primary/10 to-orange-500/10">
                      {relatedImageUrl ? (
                        <Image
                          src={relatedImageUrl}
                          alt={stripHtml(relatedCase.title.rendered)}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Building2 className="w-10 h-10 text-white/30" />
                        </div>
                      )}
                      {relatedCase.acf?.resultado && (
                        <div className="absolute bottom-2 right-2 px-2 py-1 bg-primary/90 rounded-full text-xs font-bold text-primary-foreground">
                          {relatedCase.acf.resultado}
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      {relatedCase.acf?.cliente && (
                        <p className="text-white/40 text-sm mb-2">{relatedCase.acf.cliente}</p>
                      )}
                      <h3
                        className="text-white font-medium line-clamp-2 group-hover:text-primary transition-colors"
                        dangerouslySetInnerHTML={{ __html: relatedCase.title.rendered }}
                      />
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <Footer />
    </main>
  )
}
