"use client"

import { useEffect, useRef } from "react"
import { ArrowRight, Check, Building2 } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface Service {
  icon: LucideIcon
  title: string
  description: string
  highlight?: string
}

interface Benefit {
  icon: LucideIcon
  title: string
  description: string
}

interface SectorUseCase {
  sector: string
  sectorIcon: LucideIcon
  useCases: string[]
}

interface Stat {
  value: string
  label: string
}

interface RelatedService {
  title: string
  description: string
  href: string
}

export interface ServicePageData {
  serviceName: string
  badge: string
  headline: string
  headlineAccent: string
  subheadline: string
  valueStatement: string
  valueHighlight: string
  valueSuffix: string
  // Overview section
  overviewTitle: string
  overviewDescription: string
  overviewPoints: string[]
  // Services list
  services: Service[]
  // Benefits for SMEs
  benefitsTitle: string
  benefitsSubtitle: string
  benefits: Benefit[]
  // Use cases by sector
  sectorUseCases: SectorUseCase[]
  // Stats
  stats: Stat[]
  // Related services
  relatedServices: RelatedService[]
  // CTA
  ctaTitle: string
  ctaAccent: string
  ctaDescription: string
  accentColor: "orange" | "blue" | "emerald" | "purple"
}

const colorVariants = {
  orange: {
    gradient: "from-orange-400 via-amber-300 to-orange-400",
    iconBg: "from-orange-500/20 to-amber-500/20",
    iconBorder: "border-orange-500/20",
    iconText: "text-orange-400",
    statGradient: "from-orange-400 to-amber-300",
    badge: "bg-orange-400",
    sectorBg: "from-orange-500/10 to-amber-500/10",
    sectorBorder: "border-orange-500/20",
  },
  blue: {
    gradient: "from-blue-400 via-cyan-300 to-blue-400",
    iconBg: "from-blue-500/20 to-cyan-500/20",
    iconBorder: "border-blue-500/20",
    iconText: "text-blue-400",
    statGradient: "from-blue-400 to-cyan-300",
    badge: "bg-blue-400",
    sectorBg: "from-blue-500/10 to-cyan-500/10",
    sectorBorder: "border-blue-500/20",
  },
  emerald: {
    gradient: "from-emerald-400 via-teal-300 to-emerald-400",
    iconBg: "from-emerald-500/20 to-teal-500/20",
    iconBorder: "border-emerald-500/20",
    iconText: "text-emerald-400",
    statGradient: "from-emerald-400 to-teal-300",
    badge: "bg-emerald-400",
    sectorBg: "from-emerald-500/10 to-teal-500/10",
    sectorBorder: "border-emerald-500/20",
  },
  purple: {
    gradient: "from-purple-400 via-pink-300 to-purple-400",
    iconBg: "from-purple-500/20 to-pink-500/20",
    iconBorder: "border-purple-500/20",
    iconText: "text-purple-400",
    statGradient: "from-purple-400 to-pink-300",
    badge: "bg-pink-400",
    sectorBg: "from-purple-500/10 to-pink-500/10",
    sectorBorder: "border-purple-500/20",
  },
}

export function ServicePageTemplate({ data, children }: { data: ServicePageData; children?: React.ReactNode }) {
  const overviewRef = useRef<HTMLElement>(null)
  const servicesRef = useRef<HTMLElement>(null)
  const benefitsRef = useRef<HTMLElement>(null)
  const sectorsRef = useRef<HTMLElement>(null)
  const statsRef = useRef<HTMLElement>(null)
  const relatedRef = useRef<HTMLElement>(null)

  const colors = colorVariants[data.accentColor]

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

    const refs = [overviewRef, servicesRef, benefitsRef, sectorsRef, statsRef, relatedRef]
    for (const ref of refs) {
      if (ref.current) observer.observe(ref.current)
    }
    return () => observer.disconnect()
  }, [])

  return (
    <div className="relative z-10">
      {/* Hero Section */}
      <section className="min-h-screen flex items-start justify-center px-4 pt-24 md:pt-32 pb-20 relative">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-8 mt-8 md:mt-12 animate-fade-in-badge">
            <span className={`w-2 h-2 ${colors.badge} rounded-full mr-2 animate-pulse`} />
            {data.badge}
          </div>

          <div className="space-y-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight text-balance animate-fade-in-heading">
              {data.headline}{" "}
              <span className={`bg-gradient-to-r ${colors.gradient} bg-clip-text text-transparent`}>
                {data.headlineAccent}
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed animate-fade-in-subheading">
              {data.subheadline}
            </p>

            <div className="animate-fade-in-subheading">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 flex-wrap">
                <span className="text-lg md:text-xl text-slate-300">{data.valueStatement}</span>
                <span className={`text-3xl md:text-4xl font-bold bg-gradient-to-r ${colors.statGradient} bg-clip-text text-transparent`}>
                  {data.valueHighlight}
                </span>
                <span className="text-lg md:text-xl text-slate-300">{data.valueSuffix}</span>
              </div>
            </div>

            <div className="max-w-xs sm:max-w-3xl mx-auto px-6 sm:px-0 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-buttons">
              <Button
                size="lg"
                className="bg-white text-black rounded-full px-8 py-4 text-lg font-medium transition-all duration-300 hover:bg-gray-50 hover:scale-105 hover:shadow-lg group cursor-pointer w-full sm:w-auto"
              >
                Pide tu Demo Hoy
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent text-white border-2 border-white/30 rounded-full px-8 py-4 text-lg font-medium transition-all duration-300 hover:bg-white/10 hover:border-white/50 hover:scale-105 cursor-pointer backdrop-blur-sm w-full sm:w-auto"
              >
                Pedir Presupuesto
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Optional content after hero */}
      {children}

      {/* Overview Section */}
      <section ref={overviewRef} className="py-20 md:py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-white text-balance fade-in-element opacity-0 translate-y-8 transition-all duration-1000">
                {data.overviewTitle}
              </h2>
              <p className="text-white/70 text-lg leading-relaxed fade-in-element opacity-0 translate-y-8 transition-all duration-1000">
                {data.overviewDescription}
              </p>
            </div>
            <div className="space-y-4 fade-in-element opacity-0 translate-y-8 transition-all duration-1000">
              {data.overviewPoints.map((point, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm"
                >
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${colors.iconBg} border ${colors.iconBorder} flex items-center justify-center flex-shrink-0`}>
                    <Check size={16} className={colors.iconText} />
                  </div>
                  <p className="text-white/80 leading-relaxed">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services List Section */}
      <section ref={servicesRef} className="py-20 md:py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-balance fade-in-element opacity-0 translate-y-8 transition-all duration-1000">
              Servicios de{" "}
              <span className={`bg-gradient-to-r ${colors.gradient} bg-clip-text text-transparent`}>
                {data.serviceName}
              </span>
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto fade-in-element opacity-0 translate-y-8 transition-all duration-1000">
              Todo lo que necesitas para transformar tu negocio
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {data.services.map((service) => {
              const Icon = service.icon
              return (
                <div
                  key={service.title}
                  className="fade-in-element opacity-0 translate-y-8 transition-all duration-1000 group"
                >
                  <div className="h-full p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colors.iconBg} border ${colors.iconBorder} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                        <Icon size={24} className={colors.iconText} />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-2">{service.title}</h3>
                        <p className="text-white/60 leading-relaxed">{service.description}</p>
                        {service.highlight && (
                          <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
                            <Check size={14} className="text-green-400" />
                            <span className="text-green-400 text-sm font-medium">{service.highlight}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Benefits for SMEs Section */}
      <section ref={benefitsRef} className="py-20 md:py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-balance fade-in-element opacity-0 translate-y-8 transition-all duration-1000">
              {data.benefitsTitle}
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto fade-in-element opacity-0 translate-y-8 transition-all duration-1000">
              {data.benefitsSubtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.benefits.map((benefit) => {
              const Icon = benefit.icon
              return (
                <div
                  key={benefit.title}
                  className="fade-in-element opacity-0 translate-y-8 transition-all duration-1000 group"
                >
                  <div className="h-full p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colors.iconBg} border ${colors.iconBorder} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon size={24} className={colors.iconText} />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{benefit.title}</h3>
                    <p className="text-white/60 leading-relaxed text-sm">{benefit.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Use Cases by Sector Section */}
      <section ref={sectorsRef} className="py-20 md:py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-balance fade-in-element opacity-0 translate-y-8 transition-all duration-1000">
              Casos de Uso por{" "}
              <span className={`bg-gradient-to-r ${colors.gradient} bg-clip-text text-transparent`}>
                Sector
              </span>
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto fade-in-element opacity-0 translate-y-8 transition-all duration-1000">
              Descubre como diferentes industrias aprovechan {data.serviceName.toLowerCase()}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.sectorUseCases.map((sectorCase) => {
              const SectorIcon = sectorCase.sectorIcon
              return (
                <div
                  key={sectorCase.sector}
                  className="fade-in-element opacity-0 translate-y-8 transition-all duration-1000 group"
                >
                  <div className="h-full p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${colors.sectorBg} border ${colors.sectorBorder} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <SectorIcon size={20} className={colors.iconText} />
                      </div>
                      <h3 className="text-lg font-semibold text-white">{sectorCase.sector}</h3>
                    </div>
                    <ul className="space-y-2">
                      {sectorCase.useCases.map((useCase, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-white/40 mt-2 flex-shrink-0" />
                          <span className="text-white/60 text-sm leading-relaxed">{useCase}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-20 md:py-32 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="fade-in-element opacity-0 translate-y-8 transition-all duration-1000 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 md:p-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
              {data.stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className={`text-3xl md:text-4xl font-bold bg-gradient-to-r ${colors.statGradient} bg-clip-text text-transparent mb-2`}>
                    {stat.value}
                  </p>
                  <p className="text-white/50 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related Services Section */}
      {data.relatedServices.length > 0 && (
        <section ref={relatedRef} className="py-20 md:py-32 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 fade-in-element opacity-0 translate-y-8 transition-all duration-1000">
                Soluciones Relacionadas
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {data.relatedServices.map((service) => (
                <Link
                  key={service.title}
                  href={service.href}
                  className="fade-in-element opacity-0 translate-y-8 transition-all duration-1000 group block"
                >
                  <div className="h-full p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-white/90">{service.title}</h3>
                    <p className="text-white/60 text-sm mb-4">{service.description}</p>
                    <div className="flex items-center text-white/70 group-hover:text-white transition-colors">
                      <span className="text-sm">Ver mas</span>
                      <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section id="contact" className="relative py-8 px-4 sm:px-6 lg:px-8 mb-32">
        <div className="relative max-w-4xl mx-auto">
          <div className="fade-in-element opacity-0 translate-y-8 transition-all duration-1000 text-center p-8 md:p-10 rounded-3xl border border-white/20 bg-[radial-gradient(35%_128px_at_50%_0%,theme(backgroundColor.white/15%),theme(backgroundColor.white/5%))]">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-light text-white mb-6 text-balance leading-tight">
              {data.ctaTitle}{" "}
              <span className="font-medium italic bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">
                {data.ctaAccent}
              </span>
            </h3>
            <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto leading-relaxed">
              {data.ctaDescription}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button className="group inline-flex items-center gap-3 px-8 py-4 md:px-12 md:py-6 bg-gradient-to-r from-white to-slate-100 text-slate-900 rounded-full font-semibold text-base md:text-lg hover:from-slate-50 hover:to-slate-200 transition-all duration-300 hover:scale-105 shadow-2xl">
                Pide tu Demo Hoy
                <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
