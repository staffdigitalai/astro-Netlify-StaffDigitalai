"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { ArrowRight, Check, Phone, MessageSquare, Globe, Shield, Home, BarChart3, FileText, Megaphone, Zap, Bot, Users, Headphones, Calendar, Mail, Database, Settings, Cpu, Sparkles, Clock, Target, PiggyBank, Plug, TrendingUp, CheckCircle, FolderOpen, Scan, Repeat, LayoutDashboard, Star } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PageWrapper } from "@/components/page-wrapper"
import { CTASection } from "@/components/cta-section"
import { useFormModals } from "@/components/contact-form-modals"
import type { WPService } from "@/lib/wordpress"
import { stripHtml } from "@/lib/wordpress"

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
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
  Clock,
  Target,
  PiggyBank,
  Plug,
  TrendingUp,
  CheckCircle,
  FolderOpen,
  Scan,
  Repeat,
  LayoutDashboard,
  Star,
  Check,
}

interface DynamicServiceClientProps {
  service: WPService
}

export function DynamicServiceClient({ service }: DynamicServiceClientProps) {
  const { openContactForm, openBudgetForm } = useFormModals()
  const benefitsRef = useRef<HTMLElement>(null)
  const featuresRef = useRef<HTMLElement>(null)
  const statsRef = useRef<HTMLElement>(null)

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

    const refs = [benefitsRef, featuresRef, statsRef]
    for (const ref of refs) {
      if (ref.current) observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  const title = service.title.rendered
  const subtitle = service.acf?.subtitulo || ""
  const excerpt = stripHtml(service.excerpt.rendered)
  const MainIcon = iconMap[service.acf?.icono || "Zap"] || Zap
  const isFeatured = service.acf?.es_destacado || false
  const beneficios = service.acf?.beneficios || []
  const caracteristicas = service.acf?.caracteristicas || []
  const metricas = service.acf?.metricas || []

  const breadcrumbs = [
    { label: "Soluciones", href: "/soluciones" },
    { label: title },
  ]

  return (
    <PageWrapper breadcrumbs={breadcrumbs}>
      {/* Hero Section */}
      <section className="px-4 pt-8 pb-16 md:pb-24">
        <div className="max-w-4xl mx-auto text-center">
          {isFeatured && (
            <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-400 text-sm font-medium mb-6 animate-fade-in-badge">
              <Star size={14} fill="currentColor" />
              Solucion Destacada
            </div>
          )}

          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-500/20 to-amber-500/10 border border-orange-500/20 mb-8 animate-fade-in-badge">
            <MainIcon size={40} className="text-orange-400" />
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight text-balance mb-4 animate-fade-in-heading">
            {title}
          </h1>

          {subtitle && (
            <p className="text-xl md:text-2xl text-orange-400/80 font-medium mb-6 animate-fade-in-subheading">
              {subtitle}
            </p>
          )}

          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10 animate-fade-in-subheading">
            {excerpt}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-buttons">
            <Button
              size="lg"
              onClick={openContactForm}
              className="bg-white text-black rounded-full px-8 py-4 text-lg font-medium transition-all duration-300 hover:bg-gray-50 hover:scale-105 hover:shadow-lg group cursor-pointer w-full sm:w-auto"
            >
              Pide tu Demo
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={openBudgetForm}
              className="bg-transparent text-white border-2 border-white/30 rounded-full px-8 py-4 text-lg font-medium transition-all duration-300 hover:bg-white/10 hover:border-white/50 hover:scale-105 cursor-pointer backdrop-blur-sm w-full sm:w-auto"
            >
              Pedir Presupuesto
            </Button>
          </div>

          {/* Live AI Phone Demo CTA — only on atencion-telefonica-ia */}
          {service.slug === "atencion-telefonica-ia" && (
            <div className="mt-10 animate-fade-in-buttons">
              <a
                href="tel:+34931229129"
                className="group inline-flex flex-col items-center gap-3 px-8 py-6 rounded-2xl border-2 border-green-500/30 bg-green-500/10 backdrop-blur-sm hover:bg-green-500/20 hover:border-green-500/50 hover:scale-105 transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Phone size={24} className="text-green-400 group-hover:animate-bounce" />
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping" />
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full" />
                  </div>
                  <span className="text-xl font-bold text-white">
                    Prueba nuestro sistema ahora
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-mono font-bold text-green-400 tracking-wider">
                    +34 931 229 129
                  </span>
                </div>
                <span className="text-sm text-white/50">
                  Llama gratis y habla con nuestra IA en tiempo real
                </span>
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Benefits Section */}
      {beneficios.length > 0 && (
        <section ref={benefitsRef} className="px-4 py-20 md:py-32">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-balance fade-in-element opacity-0 translate-y-8 transition-all duration-1000">
                Beneficios de{" "}
                <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-orange-400 bg-clip-text text-transparent">
                  {title}
                </span>
              </h2>
              <p className="text-white/60 text-lg max-w-2xl mx-auto fade-in-element opacity-0 translate-y-8 transition-all duration-1000">
                Como esta solucion puede transformar tu negocio
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {beneficios.map((beneficio, index) => {
                const BenefitIcon = iconMap[beneficio.icono || "Check"] || Check
                return (
                  <div
                    key={index}
                    className="fade-in-element opacity-0 translate-y-8 transition-all duration-1000 group"
                  >
                    <div className="h-full p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500/20 to-amber-500/10 border border-orange-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <BenefitIcon size={24} className="text-orange-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {beneficio.titulo}
                      </h3>
                      <p className="text-white/60 leading-relaxed text-sm">
                        {beneficio.descripcion}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      {caracteristicas.length > 0 && (
        <section ref={featuresRef} className="px-4 py-20 md:py-32">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-balance fade-in-element opacity-0 translate-y-8 transition-all duration-1000">
                Caracteristicas Principales
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {caracteristicas.map((caracteristica, index) => (
                <div
                  key={index}
                  className="fade-in-element opacity-0 translate-y-8 transition-all duration-1000 group"
                >
                  <div className="h-full p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center flex-shrink-0">
                        <Check size={20} className="text-green-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-2">
                          {caracteristica.titulo}
                        </h3>
                        <p className="text-white/60 leading-relaxed">
                          {caracteristica.descripcion}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Stats Section */}
      {metricas.length > 0 && (
        <section ref={statsRef} className="px-4 py-20 md:py-32">
          <div className="max-w-5xl mx-auto">
            <div className="fade-in-element opacity-0 translate-y-8 transition-all duration-1000 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 md:p-12">
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

      {/* WordPress Content Section */}
      {service.content.rendered && (
        <section className="px-4 py-20 md:py-32">
          <div className="max-w-4xl mx-auto">
            <div
              className="prose prose-invert prose-lg max-w-none
                prose-headings:text-white prose-headings:font-bold
                prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                prose-p:text-white/70 prose-p:leading-relaxed
                prose-a:text-orange-400 prose-a:no-underline hover:prose-a:underline
                prose-strong:text-white
                prose-ul:text-white/70 prose-li:marker:text-orange-400"
              dangerouslySetInnerHTML={{ __html: service.content.rendered }}
            />
          </div>
        </section>
      )}

      {/* Related Services */}
      <section className="px-4 py-20 md:py-32">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Otras Soluciones
            </h2>
            <p className="text-white/60">
              Descubremás formas de transformar tu negocio con IA
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/soluciones/ia-conversacional"
              className="px-6 py-3 rounded-full border border-white/10 bg-white/5 text-white/80 hover:bg-white/10 hover:border-white/20 hover:text-white transition-all"
            >
              IA Conversacional
            </Link>
            <Link
              href="/soluciones/automatización-omnicanal"
              className="px-6 py-3 rounded-full border border-white/10 bg-white/5 text-white/80 hover:bg-white/10 hover:border-white/20 hover:text-white transition-all"
            >
              Automatización Omnicanal
            </Link>
            <Link
              href="/soluciones/seguridad-ia"
              className="px-6 py-3 rounded-full border border-white/10 bg-white/5 text-white/80 hover:bg-white/10 hover:border-white/20 hover:text-white transition-all"
            >
              Seguridad IA
            </Link>
            <Link
              href="/soluciones/home-staging-ia"
              className="px-6 py-3 rounded-full border border-white/10 bg-white/5 text-white/80 hover:bg-white/10 hover:border-white/20 hover:text-white transition-all"
            >
              Home Staging IA
            </Link>
          </div>
        </div>
      </section>

      <CTASection />
    </PageWrapper>
  )
}
