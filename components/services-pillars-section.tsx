"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowRight, MessageSquare, Layers, Shield, Home } from "lucide-react"
import Link from "next/link"

const pillars = [
  {
    id: "conversational-ai",
    icon: MessageSquare,
    title: "IA Conversacional",
    titleEn: "Conversational AI",
    description: "Chatbots inteligentes, asistentes virtuales, agentes de voz, cualificacion de leads y reserva automatica de citas.",
    features: ["Chatbots 24/7", "Agentes de Voz", "Cualificacion de Leads", "Reserva de Citas"],
    href: "/soluciones/ia-conversacional",
    gradient: "from-orange-500 to-amber-500",
    bgGradient: "from-orange-500/20 to-amber-500/20",
    borderColor: "border-orange-500/20",
  },
  {
    id: "omnichannel",
    icon: Layers,
    title: "Automatizacion Omnicanal",
    titleEn: "Omnichannel Automation",
    description: "Bandeja unificada, respuestas automaticas, automatizacion de email, CRM y flujos de trabajo integrados.",
    features: ["Bandeja Unificada", "Email Automatico", "CRM Integrado", "Workflows"],
    href: "/soluciones/automatizacion-omnicanal",
    gradient: "from-blue-500 to-cyan-500",
    bgGradient: "from-blue-500/20 to-cyan-500/20",
    borderColor: "border-blue-500/20",
  },
  {
    id: "security",
    icon: Shield,
    title: "Seguridad IA y Videovigilancia",
    titleEn: "AI Security & Video Surveillance",
    description: "Monitorizacion inteligente, deteccion de personas y vehiculos, alertas automaticas e integracion con alarmas.",
    features: ["Deteccion IA", "Alertas Automaticas", "Integracion Alarmas", "Dashboard Remoto"],
    href: "/soluciones/seguridad-ia",
    gradient: "from-emerald-500 to-teal-500",
    bgGradient: "from-emerald-500/20 to-teal-500/20",
    borderColor: "border-emerald-500/20",
  },
  {
    id: "home-staging",
    icon: Home,
    title: "Home Staging IA",
    titleEn: "AI Home Staging",
    description: "Solucion completa para inmobiliarias: limpieza, reparaciones, fotografia profesional, landing pages y agentes IA.",
    features: ["Preparacion Integral", "Landing Pages", "Chat IA Compradores", "Reserva Visitas"],
    href: "/soluciones/home-staging-ia",
    gradient: "from-purple-500 to-pink-500",
    bgGradient: "from-purple-500/20 to-pink-500/20",
    borderColor: "border-purple-500/20",
  },
]

export function ServicesPillarsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
      }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative py-16 md:py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-orange-400 rounded-full mr-2 animate-pulse" />
            Soluciones Especializadas
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-balance mb-6">
            Cuatro Pilares de{" "}
            <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-orange-400 bg-clip-text text-transparent">
              Transformacion IA
            </span>
          </h2>
          <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto leading-relaxed">
            Soluciones completas de inteligencia artificial disenadas para impulsar la eficiencia 
            y el crecimiento de PYMEs en Espana y Portugal.
          </p>
        </div>

        {/* Pillars Grid */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon
            return (
              <Link
                key={pillar.id}
                href={pillar.href}
                className="group block"
                style={{
                  transitionDelay: isVisible ? `${300 + index * 100}ms` : "0ms",
                }}
              >
                <div className={`h-full p-6 md:p-8 rounded-3xl border ${pillar.borderColor} bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl`}>
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${pillar.bgGradient} border ${pillar.borderColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={28} className="text-white/80" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-white/90 transition-colors">
                    {pillar.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white/60 leading-relaxed mb-6">
                    {pillar.description}
                  </p>

                  {/* Features Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {pillar.features.map((feature) => (
                      <span
                        key={feature}
                        className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="flex items-center text-white/70 group-hover:text-white transition-colors">
                    <span className="text-sm font-medium">Descubrir mas</span>
                    <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div
          className={`text-center mt-12 transition-all duration-1000 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-white/50 text-sm mb-4">
            No sabes cual es la mejor solucion para tu negocio?
          </p>
          <Link
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/15 border border-white/20 hover:border-white/30 rounded-full text-white font-medium transition-all duration-300 hover:scale-105"
          >
            Habla con un experto
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}
