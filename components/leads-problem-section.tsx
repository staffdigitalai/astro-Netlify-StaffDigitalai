"use client"

import { useRef } from "react"
import { useInView } from "framer-motion"
import { Clock, AlertTriangle, Users, TrendingDown, Bot, Calendar, Plug, MessageSquare, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function LeadsProblemSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  const problems = [
    {
      icon: Clock,
      text: "El personal pierde consultas fuera de horario y los fines de semana",
    },
    {
      icon: Users,
      text: "Ocupados atendiendo clientes mientras los leads online se enfrian",
    },
    {
      icon: TrendingDown,
      text: "Inversion en marketing desperdiciada en consultas sin responder",
    },
  ]

  const solutions = [
    {
      icon: Bot,
      text: "Cualifica leads al instante y agenda citas",
    },
    {
      icon: Calendar,
      text: "Se integra con tu CRM y sistema de calendario",
    },
    {
      icon: MessageSquare,
      text: "Funciona en web, WhatsApp, email y telefono",
    },
  ]

  const stats = [
    { value: "€500+", label: "Valor medio por lead perdido" },
    { value: "78%", label: "Eligen al primero que responde" },
    { value: "24/7", label: "Nuestra IA nunca duerme" },
  ]

  return (
    <section ref={sectionRef} className="py-12 sm:py-16 px-4 relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div 
          className="text-center mb-12"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.6s ease-out",
          }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium mb-4">
            <AlertTriangle size={14} />
            El Problema que Toda Empresa Enfrenta
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            El 60-70% de Tus Leads Se Estan{" "}
            <span className="text-red-400">Perdiendo</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Mientras atiendes a tus clientes, tus consultas online quedan sin respuesta. Asi es como lo solucionamos.
          </p>
        </div>

        {/* Problem vs Solution Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* La Realidad - Problem */}
          <div
            className="bg-red-500/5 backdrop-blur-sm border border-red-500/20 rounded-2xl p-6"
            style={{
              opacity: isInView ? 1 : 0,
              transform: isInView ? "translateX(0)" : "translateX(-30px)",
              transition: "all 0.6s ease-out 0.2s",
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-red-500/20 border border-red-500/30 flex items-center justify-center">
                <Clock size={24} className="text-red-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">La Realidad</h3>
                <div className="text-3xl font-bold text-red-400">+4 Horas</div>
              </div>
            </div>
            <p className="text-white/50 text-sm mb-6">
              Tiempo medio de respuesta, pero el 78% de los clientes eligen la primera empresa que responde
            </p>
            <div className="space-y-4">
              {problems.map((problem, index) => {
                const Icon = problem.icon
                return (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon size={16} className="text-red-400" />
                    </div>
                    <p className="text-white/70 text-sm">{problem.text}</p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Nuestra Solucion */}
          <div
            className="bg-emerald-500/5 backdrop-blur-sm border border-emerald-500/20 rounded-2xl p-6"
            style={{
              opacity: isInView ? 1 : 0,
              transform: isInView ? "translateX(0)" : "translateX(30px)",
              transition: "all 0.6s ease-out 0.2s",
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                <Bot size={24} className="text-emerald-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Nuestra Solucion</h3>
                <div className="text-3xl font-bold text-emerald-400">24/7</div>
              </div>
            </div>
            <p className="text-white/50 text-sm mb-6">
              El asistente IA responde en segundos, agenda citas mientras duermes
            </p>
            <div className="space-y-4">
              {solutions.map((solution, index) => {
                const Icon = solution.icon
                return (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon size={16} className="text-emerald-400" />
                    </div>
                    <p className="text-white/70 text-sm">{solution.text}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div 
          className="grid grid-cols-3 gap-4 mb-12"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.6s ease-out 0.4s",
          }}
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center"
            >
              <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent mb-1">
                {stat.value}
              </div>
              <p className="text-white/50 text-xs md:text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div 
          className="bg-gradient-to-r from-orange-500/10 to-amber-500/10 backdrop-blur-sm border border-orange-500/20 rounded-2xl p-8 text-center"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.6s ease-out 0.5s",
          }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Deja de Perder Clientes Hoy
          </h3>
          <p className="text-white/60 text-lg max-w-2xl mx-auto mb-6">
            Obtiene una auditoria gratuita de tiempo de respuesta y descubre exactamente cuantos leads estas perdiendo ahora mismo.
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-full px-8 py-4 text-lg font-medium transition-all duration-300 hover:scale-105 cursor-pointer shadow-lg shadow-orange-500/25 group"
          >
            Auditoria Gratuita
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  )
}
