"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { MessageSquare, Phone, Globe, CheckCheck, Mic, Play, Pause } from "lucide-react"
import type { ConversationSimulation } from "@/lib/conversation-data"

interface ConversationSimulatorProps {
  title?: string
  subtitle?: string
  badge?: string
  badgeIcon?: "whatsapp" | "chat" | "phone" | "default"
  simulations: ConversationSimulation[]
  className?: string
  showStats?: boolean
}

// Phone mockup for WhatsApp conversations
function WhatsAppMockup({ 
  simulation, 
  visibleMessages,
  isTyping 
}: { 
  simulation: ConversationSimulation
  visibleMessages: number
  isTyping: boolean
}) {
  return (
    <div className="bg-slate-900/80 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
      {/* WhatsApp header */}
      <div className="bg-green-600 px-4 py-3 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
          <span className="text-white text-xs font-bold">SD</span>
        </div>
        <div>
          <div className="text-white text-sm font-medium">{simulation.headerName || "StaffDigital AI"}</div>
          <div className="text-green-200 text-xs">{simulation.headerStatus || "en linea"}</div>
        </div>
        <div className="ml-auto flex items-center gap-1">
          <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse" />
          <span className="text-green-200 text-xs">24/7</span>
        </div>
      </div>

      {/* Chat area */}
      <div className="p-4 min-h-[320px] max-h-[360px] bg-[#0b141a] space-y-3 overflow-y-auto">
        {simulation.messages.slice(0, visibleMessages).map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.isUser ? "justify-end" : "justify-start"} animate-fade-in-up`}
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div
              className={`max-w-[80%] px-3 py-2 rounded-lg text-sm ${
                msg.isUser
                  ? "bg-green-700 text-white rounded-br-none"
                  : "bg-slate-800 text-white/90 rounded-bl-none"
              }`}
            >
              {msg.text.startsWith("[Nota de voz") ? (
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-green-600/50 flex items-center justify-center">
                    <Mic className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="h-1 bg-white/20 rounded-full w-24">
                      <div className="h-1 bg-white/60 rounded-full w-3/4" />
                    </div>
                    <span className="text-[10px] text-white/40">0:15</span>
                  </div>
                  <Play className="w-4 h-4 text-white/60" />
                </div>
              ) : (
                <p>{msg.text}</p>
              )}
              <div className={`flex items-center gap-1 mt-1 ${msg.isUser ? "justify-end" : "justify-start"}`}>
                <span className="text-[10px] text-white/40">{msg.time}</span>
                {msg.isUser && <CheckCheck className="w-3 h-3 text-blue-400" />}
              </div>
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-slate-800 px-4 py-2 rounded-lg rounded-bl-none">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <div className="w-2 h-2 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <div className="w-2 h-2 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Web chat mockup
function ChatMockup({ 
  simulation, 
  visibleMessages,
  isTyping 
}: { 
  simulation: ConversationSimulation
  visibleMessages: number
  isTyping: boolean
}) {
  return (
    <div className="bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
      {/* Chat header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-3 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
          <Globe className="w-4 h-4 text-white" />
        </div>
        <div>
          <div className="text-white text-sm font-medium">{simulation.headerName || "Asistente Virtual"}</div>
          <div className="text-blue-200 text-xs">{simulation.headerStatus || "Activo"}</div>
        </div>
        <div className="ml-auto">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
        </div>
      </div>

      {/* Chat area */}
      <div className="p-4 min-h-[320px] max-h-[360px] bg-slate-950 space-y-3 overflow-y-auto">
        {simulation.messages.slice(0, visibleMessages).map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.isUser ? "justify-end" : "justify-start"} animate-fade-in-up`}
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div
              className={`max-w-[80%] px-3 py-2 rounded-xl text-sm ${
                msg.isUser
                  ? "bg-blue-600 text-white"
                  : "bg-white/10 text-white/90 border border-white/10"
              }`}
            >
              {msg.text.includes("[Lead Score") ? (
                <div>
                  <div className="text-xs text-green-400 font-medium mb-1">
                    {msg.text.match(/\[([^\]]+)\]/)?.[1]}
                  </div>
                  <p>{msg.text.replace(/\[[^\]]+\]\s*/, "")}</p>
                </div>
              ) : (
                <p>{msg.text}</p>
              )}
              <div className={`mt-1 ${msg.isUser ? "text-right" : "text-left"}`}>
                <span className="text-[10px] text-white/40">{msg.time}</span>
              </div>
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white/10 border border-white/10 px-4 py-2 rounded-xl">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-blue-400/60 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <div className="w-2 h-2 bg-blue-400/60 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <div className="w-2 h-2 bg-blue-400/60 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Phone call mockup
function PhoneMockup({ 
  simulation, 
  visibleMessages,
  isTyping 
}: { 
  simulation: ConversationSimulation
  visibleMessages: number
  isTyping: boolean
}) {
  return (
    <div className="bg-slate-900/80 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
      {/* Phone header */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 px-4 py-3 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
          <Phone className="w-4 h-4 text-white" />
        </div>
        <div>
          <div className="text-white text-sm font-medium">{simulation.headerName || "Llamada IA"}</div>
          <div className="text-orange-200 text-xs">En curso</div>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-3 bg-white/60 rounded-full animate-pulse" />
            <div className="w-1.5 h-4 bg-white/80 rounded-full animate-pulse" style={{ animationDelay: "100ms" }} />
            <div className="w-1.5 h-2 bg-white/40 rounded-full animate-pulse" style={{ animationDelay: "200ms" }} />
          </div>
        </div>
      </div>

      {/* Transcript area */}
      <div className="p-4 min-h-[320px] max-h-[360px] bg-slate-950 space-y-3 overflow-y-auto">
        <div className="text-center text-white/30 text-xs mb-4 pb-2 border-b border-white/10">
          Transcripcion en tiempo real
        </div>
        {simulation.messages.slice(0, visibleMessages).map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.isUser ? "justify-end" : "justify-start"} animate-fade-in-up`}
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div
              className={`max-w-[85%] px-3 py-2 rounded-lg text-sm ${
                msg.isUser
                  ? "bg-orange-500/20 text-white border border-orange-500/30"
                  : msg.text.startsWith("[Sistema]") || msg.text.startsWith("[Llamada")
                    ? "bg-slate-800/50 text-white/60 border border-white/5 italic"
                    : "bg-white/10 text-white/90 border border-white/10"
              }`}
            >
              <div className="flex items-start gap-2">
                {!msg.isUser && !msg.text.startsWith("[") && (
                  <div className="w-5 h-5 rounded-full bg-orange-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Mic className="w-3 h-3 text-orange-400" />
                  </div>
                )}
                <div>
                  <p>{msg.text}</p>
                  <span className="text-[10px] text-white/30 mt-1 block">{msg.time}</span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Speaking indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white/10 border border-white/10 px-4 py-2 rounded-lg flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                <div className="w-1 h-3 bg-orange-400/60 rounded-full animate-pulse" />
                <div className="w-1 h-4 bg-orange-400/80 rounded-full animate-pulse" style={{ animationDelay: "100ms" }} />
                <div className="w-1 h-2 bg-orange-400/40 rounded-full animate-pulse" style={{ animationDelay: "200ms" }} />
                <div className="w-1 h-5 bg-orange-400/60 rounded-full animate-pulse" style={{ animationDelay: "300ms" }} />
              </div>
              <span className="text-xs text-white/40">Hablando...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export function ConversationSimulator({
  title = "Tu IA en Accion",
  subtitle = "Mira como nuestros asistentes IA gestionan conversaciones reales con clientes.",
  badge = "Simulacion en Vivo",
  badgeIcon = "default",
  simulations,
  className = "",
  showStats = true,
}: ConversationSimulatorProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [activeSimulation, setActiveSimulation] = useState(0)
  const [visibleMessages, setVisibleMessages] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  // Intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Message animation
  useEffect(() => {
    if (!isVisible || isPaused || simulations.length === 0) return

    const currentSim = simulations[activeSimulation]
    if (!currentSim) return

    const totalMessages = currentSim.messages.length

    if (visibleMessages >= totalMessages) {
      // Wait, then move to next simulation or restart
      const timeout = setTimeout(() => {
        const nextSim = (activeSimulation + 1) % simulations.length
        setActiveSimulation(nextSim)
        setVisibleMessages(0)
        setIsTyping(false)
      }, 3000)
      return () => clearTimeout(timeout)
    }

    // Show typing indicator before bot messages
    const nextMessage = currentSim.messages[visibleMessages]
    if (nextMessage && !nextMessage.isUser) {
      setIsTyping(true)
      const typingTimeout = setTimeout(() => {
        setIsTyping(false)
        setVisibleMessages((prev) => prev + 1)
      }, 1000)
      return () => clearTimeout(typingTimeout)
    }

    // Show user messages immediately
    const messageTimeout = setTimeout(() => {
      setVisibleMessages((prev) => prev + 1)
    }, 1200)

    return () => clearTimeout(messageTimeout)
  }, [isVisible, isPaused, visibleMessages, activeSimulation, simulations])

  if (simulations.length === 0) return null

  const currentSim = simulations[activeSimulation]
  const BadgeIcon = badgeIcon === "whatsapp" ? MessageSquare : badgeIcon === "phone" ? Phone : badgeIcon === "chat" ? Globe : MessageSquare

  const renderMockup = () => {
    switch (currentSim.type) {
      case "whatsapp":
        return <WhatsAppMockup simulation={currentSim} visibleMessages={visibleMessages} isTyping={isTyping} />
      case "chat":
        return <ChatMockup simulation={currentSim} visibleMessages={visibleMessages} isTyping={isTyping} />
      case "phone":
        return <PhoneMockup simulation={currentSim} visibleMessages={visibleMessages} isTyping={isTyping} />
      default:
        return <WhatsAppMockup simulation={currentSim} visibleMessages={visibleMessages} isTyping={isTyping} />
    }
  }

  return (
    <section ref={sectionRef} className={`py-20 px-4 relative ${className}`}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div
          className={`text-center mb-12 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-6">
            <BadgeIcon className="w-4 h-4 mr-2" />
            {badge}
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white text-balance mb-4">
            {title}
          </h2>
          <p className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto font-light">
            {subtitle}
          </p>
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Simulation selector (if multiple) */}
          {simulations.length > 1 && (
            <div
              className={`space-y-4 transition-all duration-1000 delay-200 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
              }`}
            >
              <div className="text-white/50 text-sm font-medium mb-4">Casos de uso:</div>
              {simulations.map((sim, index) => (
                <button
                  key={sim.id}
                  onClick={() => {
                    setActiveSimulation(index)
                    setVisibleMessages(0)
                    setIsTyping(false)
                  }}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-300 ${
                    activeSimulation === index
                      ? "bg-white/10 border-white/30"
                      : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        sim.type === "whatsapp"
                          ? "bg-green-500/20"
                          : sim.type === "phone"
                          ? "bg-orange-500/20"
                          : "bg-blue-500/20"
                      }`}
                    >
                      {sim.type === "whatsapp" ? (
                        <MessageSquare className="w-5 h-5 text-green-400" />
                      ) : sim.type === "phone" ? (
                        <Phone className="w-5 h-5 text-orange-400" />
                      ) : (
                        <Globe className="w-5 h-5 text-blue-400" />
                      )}
                    </div>
                    <div>
                      <div className="text-white font-medium text-sm">{sim.title}</div>
                      <div className="text-white/50 text-xs">{sim.description}</div>
                    </div>
                    {activeSimulation === index && (
                      <div className="ml-auto">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      </div>
                    )}
                  </div>
                </button>
              ))}

              {/* Pause/Play button */}
              <button
                onClick={() => setIsPaused(!isPaused)}
                className="flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors mt-4"
              >
                {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                {isPaused ? "Reanudar" : "Pausar"} simulacion
              </button>
            </div>
          )}

          {/* Mockup */}
          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            } ${simulations.length === 1 ? "lg:col-span-2 max-w-md mx-auto" : ""}`}
          >
            {renderMockup()}

            {/* Stats below mockup */}
            {showStats && currentSim.stats && (
              <div className="grid grid-cols-3 gap-4 mt-8">
                {currentSim.stats.map((stat, i) => (
                  <div
                    key={i}
                    className={`text-center transition-all duration-700 ${
                      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    }`}
                    style={{ transitionDelay: `${800 + i * 200}ms` }}
                  >
                    <div className="text-xl font-bold text-white">{stat.value}</div>
                    <div className="text-xs text-white/50">{stat.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
