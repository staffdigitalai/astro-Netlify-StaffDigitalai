"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { ArrowRight, Star, Phone, MessageSquare, Globe, Shield, Home, BarChart3, FileText, Megaphone, Zap, Bot, Users, Headphones, Calendar, Mail, Database, Settings, Cpu, Sparkles } from "lucide-react"
import { PageWrapper } from "@/components/page-wrapper"
import { CTASection } from "@/components/cta-section"

// Icon mapping from string to Lucide icon
const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Phone,
  MessageSquare,
  Globe,
  Shield,
  Home,
  BarChart3,
  FileText,
  Megaphone,
  Zap,
  Bot,
  Users,
  Headphones,
  Calendar,
  Mail,
  Database,
  Settings,
  Cpu,
  Sparkles,
}

interface ServiceData {
  id: number
  slug: string
  title: string
  excerpt: string
  icon: string
  subtitle: string
  isFeatured: boolean
  ctaText: string
  ctaLink: string
}

interface ServicesListClientProps {
  services: ServiceData[]
}

export function ServicesListClient({ services }: ServicesListClientProps) {
  const gridRef = useRef<HTMLDivElement>(null)

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

    if (gridRef.current) {
      observer.observe(gridRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Sort services: featured first, then by menu order
  const sortedServices = [...services].sort((a, b) => {
    if (a.isFeatured && !b.isFeatured) return -1
    if (!a.isFeatured && b.isFeatured) return 1
    return 0
  })

  return (
    <PageWrapper breadcrumbs={[{ label: "Soluciones" }]}>
      {/* Hero Section */}
      <section className="px-4 pt-8 pb-16 md:pb-24">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-8 animate-fade-in-badge">
            <span className="w-2 h-2 bg-orange-400 rounded-full mr-2 animate-pulse" />
            Soluciones de IA para Empresas
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight text-balance mb-6 animate-fade-in-heading">
            Transforma tu negocio con{" "}
            <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-orange-400 bg-clip-text text-transparent">
              Inteligencia Artificial
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed animate-fade-in-subheading">
            Descubre nuestras soluciones de IA disenadas para automatizar procesos, mejorar la atención al cliente y escalar tu negocio sin aumentar costes.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="px-4 pb-20 md:pb-32" ref={gridRef}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedServices.map((service) => {
              const IconComponent = iconMap[service.icon] || Zap
              return (
                <Link
                  key={service.id}
                  href={`/soluciones/${service.slug}`}
                  className={`fade-in-element opacity-0 translate-y-8 transition-all duration-1000 group block relative ${
                    service.isFeatured ? "md:col-span-2 lg:col-span-1" : ""
                  }`}
                >
                  <div
                    className={`h-full p-6 md:p-8 rounded-2xl border transition-all duration-300 ${
                      service.isFeatured
                        ? "border-orange-500/40 bg-gradient-to-br from-orange-500/10 to-amber-500/5 hover:border-orange-500/60 hover:from-orange-500/15 hover:to-amber-500/10"
                        : "border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20"
                    } backdrop-blur-sm`}
                  >
                    {service.isFeatured && (
                      <div className="absolute -top-3 left-6 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500 text-white text-xs font-semibold">
                        <Star size={12} fill="currentColor" />
                        Destacado
                      </div>
                    )}

                    <div className="flex items-start gap-4">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform ${
                          service.isFeatured
                            ? "bg-gradient-to-br from-orange-500/30 to-amber-500/20 border border-orange-500/30"
                            : "bg-gradient-to-br from-white/10 to-white/5 border border-white/10"
                        }`}
                      >
                        <IconComponent
                          size={24}
                          className={service.isFeatured ? "text-orange-400" : "text-white/80"}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-semibold text-white mb-1 group-hover:text-white/90">
                          {service.title}
                        </h3>
                        {service.subtitle && (
                          <p className="text-white/50 text-sm mb-3">{service.subtitle}</p>
                        )}
                        <p className="text-white/60 leading-relaxed text-sm line-clamp-3">
                          {service.excerpt}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 flex items-center justify-between">
                      <span
                        className={`text-sm font-medium ${
                          service.isFeatured ? "text-orange-400" : "text-white/70"
                        } group-hover:text-white transition-colors`}
                      >
                        {service.ctaText}
                      </span>
                      <ArrowRight
                        size={18}
                        className={`${
                          service.isFeatured ? "text-orange-400" : "text-white/50"
                        } group-hover:translate-x-1 group-hover:text-white transition-all`}
                      />
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-4 pb-20 md:pb-32">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 md:p-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent mb-2">
                  +500
                </p>
                <p className="text-white/50 text-sm">Empresas confian en nosotros</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent mb-2">
                  24/7
                </p>
                <p className="text-white/50 text-sm">Disponibilidad total</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent mb-2">
                  -70%
                </p>
                <p className="text-white/50 text-sm">Reduccion de costes</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent mb-2">
                  +40%
                </p>
                <p className="text-white/50 text-sm">Aumento de conversiones</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </PageWrapper>
  )
}
