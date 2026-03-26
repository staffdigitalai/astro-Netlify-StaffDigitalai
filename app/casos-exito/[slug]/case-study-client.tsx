"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { ArrowRight, ArrowLeft, Quote, TrendingUp, Building2, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PageWrapper } from "@/components/page-wrapper"
import { CTASection } from "@/components/cta-section"
import { useFormModals } from "@/components/contact-form-modals"
import type { WPCaseStudy } from "@/lib/wordpress"
import { stripHtml } from "@/lib/wordpress"

interface CaseStudyClientProps {
  caseStudy: WPCaseStudy
}

export function CaseStudyClient({ caseStudy }: CaseStudyClientProps) {
  const { openContactForm } = useFormModals()
  const contentRef = useRef<HTMLElement>(null)
  const metricsRef = useRef<HTMLElement>(null)

  const title = stripHtml(caseStudy.title.rendered)
  const cliente = caseStudy.acf?.cliente || ""
  const sector = caseStudy.acf?.sector || ""
  const resultadoPrincipal = caseStudy.acf?.resultado_principal || caseStudy.acf?.resultado || ""
  const testimonio = caseStudy.acf?.testimonio || ""
  const metricas = caseStudy.acf?.metricas || []

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll(".fade-in-element")
            elements.forEach((el, i) => {
              setTimeout(() => {
                el.classList.add("animate-fade-in-up")
              }, i * 100)
            })
          }
        }
      },
      { threshold: 0.1 }
    )

    const refs = [contentRef, metricsRef]
    for (const ref of refs) {
      if (ref.current) observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  const breadcrumbs = [
    { label: "Casos de Exito", href: "/casos-exito" },
    { label: title },
  ]

  return (
    <PageWrapper breadcrumbs={breadcrumbs}>
      {/* Hero Section */}
      <section className="px-4 pt-8 pb-16 md:pb-24">
        <div className="max-w-4xl mx-auto">
          {/* Back link */}
          <Link
            href="/casos-exito"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            Volver a casos de exito
          </Link>

          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-3 mb-6 animate-fade-in-badge">
            {sector && (
              <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 hover:bg-orange-500/30">
                {sector}
              </Badge>
            )}
            {cliente && (
              <span className="flex items-center gap-2 text-white/60 text-sm">
                <Building2 size={14} />
                {cliente}
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight text-balance mb-6 animate-fade-in-heading">
            {title}
          </h1>

          {/* Result highlight */}
          {resultadoPrincipal && (
            <div className="flex items-start gap-3 p-4 md:p-6 rounded-2xl bg-gradient-to-r from-green-500/10 to-emerald-500/5 border border-green-500/20 mb-8 animate-fade-in-subheading">
              <TrendingUp className="h-6 w-6 text-green-400 flex-shrink-0 mt-0.5" />
              <p className="text-lg md:text-xl text-green-300 font-medium">
                {resultadoPrincipal}
              </p>
            </div>
          )}

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-start gap-4 animate-fade-in-buttons">
            <Button
              size="lg"
              onClick={openContactForm}
              className="bg-white text-black rounded-full px-8 py-4 text-lg font-medium transition-all duration-300 hover:bg-gray-50 hover:scale-105 hover:shadow-lg group cursor-pointer"
            >
              Quiero resultados similares
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      {metricas.length > 0 && (
        <section ref={metricsRef} className="px-4 py-16 md:py-24">
          <div className="max-w-5xl mx-auto">
            <div className="fade-in-element opacity-0 translate-y-8 transition-all duration-1000 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 md:p-12">
              <h2 className="text-2xl font-bold text-white text-center mb-8">
                Resultados Clave
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
                {metricas.map((metrica, index) => (
                  <div key={index} className="text-center">
                    <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent mb-2">
                      {metrica.valor}
                    </p>
                    <p className="text-white/50 text-sm">{metrica.etiqueta}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Content Section */}
      {caseStudy.content.rendered && (
        <section ref={contentRef} className="px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto">
            <div
              className="fade-in-element opacity-0 translate-y-8 transition-all duration-1000 prose prose-invert prose-lg max-w-none
                prose-headings:text-white prose-headings:font-bold
                prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:border-b prose-h2:border-white/10 prose-h2:pb-4
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
                prose-p:text-white/70 prose-p:leading-relaxed
                prose-a:text-orange-400 prose-a:no-underline hover:prose-a:underline
                prose-strong:text-white
                prose-ul:text-white/70 prose-li:marker:text-orange-400
                prose-li:my-2"
              dangerouslySetInnerHTML={{ __html: caseStudy.content.rendered }}
            />
          </div>
        </section>
      )}

      {/* Testimonial Section */}
      {testimonio && (
        <section className="px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto">
            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-orange-500/10 to-amber-500/5 p-8 md:p-12">
              <Quote className="h-12 w-12 text-orange-400/40 mb-6" />
              <blockquote className="text-xl md:text-2xl text-white/90 font-medium leading-relaxed mb-6 text-balance">
                "{testimonio}"
              </blockquote>
              {cliente && (
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-orange-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">{cliente}</p>
                    {sector && <p className="text-white/50 text-sm">{sector}</p>}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Next Steps Section */}
      <section className="px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Tu empresa puede ser la proxima
          </h2>
          <p className="text-white/60 text-lg mb-8 max-w-xl mx-auto">
            Descubre como nuestras soluciones de IA pueden transformar tu negocio con resultados medibles.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              onClick={openContactForm}
              className="bg-white text-black rounded-full px-8 py-4 text-lg font-medium transition-all duration-300 hover:bg-gray-50 hover:scale-105 hover:shadow-lg group cursor-pointer"
            >
              Solicitar Demo Gratuita
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Link
              href="/casos-exito"
              className="inline-flex items-center gap-2 px-6 py-3 text-white/80 hover:text-white transition-colors"
            >
              Vermás casos de exito
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <CTASection />
    </PageWrapper>
  )
}
