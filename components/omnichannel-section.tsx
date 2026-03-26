"use client"

import { MessageSquare, Globe, Mail, Phone, Share2 } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const channels = [
  {
    icon: MessageSquare,
    name: "WhatsApp",
    color: "from-green-500 to-green-600",
    description: "Mensajeria directa con clientes",
  },
  {
    icon: Globe,
    name: "Agente IA Web",
    color: "from-blue-500 to-blue-600",
    description: "Widget personalizado en tu web",
  },
  {
    icon: MessageSquare,
    name: "Messenger",
    color: "from-blue-600 to-blue-700",
    description: "Integracion con Facebook",
  },
  {
    icon: Share2,
    name: "Instagram",
    color: "from-purple-500 via-pink-500 to-orange-500",
    description: "Automatizacion de DMs",
  },
  {
    icon: Mail,
    name: "Email",
    color: "from-slate-400 to-slate-500",
    description: "Respuestas automaticas",
  },
  {
    icon: Phone,
    name: "Telefono",
    color: "from-orange-500 to-red-500",
    description: "Recepcionista de voz IA",
  },
]

export function OmnichannelSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [activeChannel, setActiveChannel] = useState<number | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Auto-cycle through channels
  useEffect(() => {
    if (!isVisible) return

    let index = 0
    const interval = setInterval(() => {
      setActiveChannel(index % channels.length)
      index++
    }, 2000)

    return () => clearInterval(interval)
  }, [isVisible])

  return (
    <section ref={sectionRef} className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-6">
            <Globe className="w-4 h-4 mr-2" />
            Omnicanal
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white text-balance mb-4">
            Un Solo Cerebro IA,{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Todos los Canales
            </span>
          </h2>
          <p className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto font-light">
            Tu asistente IA gestiona todas las conversaciones desde una unica plataforma inteligente.
          </p>
        </div>

        {/* Central hub visualization */}
        <div className="relative max-w-3xl mx-auto">
          {/* Center circle */}
          <div
            className={`mx-auto w-24 h-24 rounded-full bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border border-white/20 flex items-center justify-center mb-12 transition-all duration-1000 ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"
            }`}
          >
            <span className="text-white font-bold text-sm text-center leading-tight">Staff<br/>Digital<br/>AI</span>
          </div>

          {/* Channel cards grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {channels.map((channel, index) => {
              const Icon = channel.icon
              const isActive = activeChannel === index

              return (
                <div
                  key={index}
                  className={`group relative bg-white/5 backdrop-blur-md rounded-xl p-5 border transition-all duration-500 cursor-pointer hover:scale-105 ${
                    isActive
                      ? "border-white/30 bg-white/10 shadow-lg shadow-white/5"
                      : "border-white/10 hover:border-white/20"
                  } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                  style={{ transitionDelay: `${300 + index * 100}ms` }}
                  onMouseEnter={() => setActiveChannel(index)}
                >
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${channel.color} flex items-center justify-center mb-3 transition-transform duration-300 ${isActive ? "scale-110" : ""}`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-white font-semibold text-sm mb-1">{channel.name}</h3>
                  <p className="text-white/50 text-xs">{channel.description}</p>

                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute top-3 right-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Bottom stat */}
          <div
            className={`text-center mt-12 transition-all duration-1000 delay-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <p className="text-white/40 text-sm">
              Todas las conversaciones centralizadas — respuesta media{" "}
              <span className="text-white font-semibold">&lt;30 segundos</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
