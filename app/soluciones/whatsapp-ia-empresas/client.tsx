"use client"

import Link from "next/link"
import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import Aurora from "@/components/Aurora"
import { Footer } from "@/components/footer"
import { ConversationSimulator } from "@/components/conversation-simulator"
import { getWhatsAppHubConversations } from "@/lib/conversation-data"
import { Button } from "@/components/ui/button"
import { 
  MessageSquare, 
  Phone, 
  Calendar, 
  Users, 
  Headphones, 
  Link2,
  ArrowRight,
  CheckCircle2,
  Smartphone,
  Zap,
  Shield,
  TrendingUp
} from "lucide-react"

const whatsappSubPages = [
  {
    slug: "agente-voz-whatsapp",
    title: "Agente de Voz WhatsApp",
    description: "Responde mensajes de voz con IA y envia audios naturales automaticamente.",
    icon: Phone,
    color: "from-green-500/20 to-green-600/10",
    borderColor: "border-green-500/30",
  },
  {
    slug: "atencion-cliente-whatsapp",
    title: "Atencion al Cliente 24/7",
    description: "Resuelve consultas, gestiona incidencias y da soporte sin esperas.",
    icon: Headphones,
    color: "from-blue-500/20 to-blue-600/10",
    borderColor: "border-blue-500/30",
  },
  {
    slug: "agente-ventas-whatsapp",
    title: "Agente de Ventas IA",
    description: "Cualifica leads, presenta productos y cierra ventas por WhatsApp.",
    icon: TrendingUp,
    color: "from-purple-500/20 to-purple-600/10",
    borderColor: "border-purple-500/30",
  },
  {
    slug: "citas-reservas-whatsapp",
    title: "Citas y Reservas",
    description: "Agenda citas, envia recordatorios y reduce no-shows automaticamente.",
    icon: Calendar,
    color: "from-orange-500/20 to-orange-600/10",
    borderColor: "border-orange-500/30",
  },
  {
    slug: "lead-qualification-whatsapp",
    title: "Cualificacion de Leads",
    description: "Identifica leads calientes, hace scoring automatico y prioriza ventas.",
    icon: Users,
    color: "from-cyan-500/20 to-cyan-600/10",
    borderColor: "border-cyan-500/30",
  },
  {
    slug: "integracion-crm-whatsapp",
    title: "Integracion CRM",
    description: "Sincroniza con HubSpot, Salesforce, Pipedrive y +50 herramientas.",
    icon: Link2,
    color: "from-pink-500/20 to-pink-600/10",
    borderColor: "border-pink-500/30",
  },
]

const stats = [
  { value: "90%+", label: "Penetracion WhatsApp en Espana", description: "El canal preferido de tus clientes" },
  { value: "-70%", label: "Reduccion de tickets", description: "La IA resuelve consultas automaticamente" },
  { value: "<5s", label: "Tiempo de respuesta", description: "Atencion instantanea 24/7" },
  { value: "+35%", label: "Aumento en conversiones", description: "Leads atendidos = ventas cerradas" },
]

const benefits = [
  "Responde en segundos, no en horas",
  "Disponible 24/7, festivos incluidos",
  "Habla espanol, portugues e ingles",
  "Se integra con tu CRM existente",
  "Aprende de cada conversacion",
  "Escala sin contratar personal",
]

export function WhatsAppHubClient() {
  const conversations = getWhatsAppHubConversations()

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      <main className="min-h-screen relative overflow-hidden">
        <div className="fixed inset-0 w-full h-full">
          <Aurora colorStops={["#25D366", "#128C7E", "#075E54"]} amplitude={1.2} blend={0.5} speed={0.8} />
        </div>

        <div className="relative z-10">
          <GlassmorphismNav />

          {/* Hero Section */}
          <section className="min-h-screen flex items-center justify-center px-4 pt-24 md:pt-32 pb-20 relative">
            <div className="max-w-6xl mx-auto text-center relative z-10">
              {/* Badge */}
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-500/20 backdrop-blur-md border border-green-500/30 text-white text-sm font-medium mb-8 mt-8 md:mt-12">
                <MessageSquare className="w-4 h-4 mr-2 text-green-400" />
                WhatsApp es el canal #1 en Espana
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight text-balance">
                WhatsApp IA para{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">
                  Empresas
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto mb-8 leading-relaxed">
                Automatiza tu atencion al cliente en el canal que todos usan. 
                Agentes IA que responden, venden y agendan citas 24/7.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-10">
                {stats.map((stat, index) => (
                  <div 
                    key={index}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 text-center"
                  >
                    <div className="text-2xl md:text-3xl font-bold text-green-400 mb-1">{stat.value}</div>
                    <div className="text-xs text-white/60">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-6 text-lg rounded-xl"
                  asChild
                >
                  <Link href="/demo">
                    <Smartphone className="w-5 h-5 mr-2" />
                    Ver mi agente WhatsApp en accion
                  </Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg rounded-xl"
                  asChild
                >
                  <Link href="/precios">
                    Ver precios
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>

          {/* Sub-pages Grid */}
          <section className="py-20 px-4 relative">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Soluciones WhatsApp IA
                </h2>
                <p className="text-white/60 max-w-2xl mx-auto">
                  Elige el agente que mejor se adapte a tu negocio o combinalos todos.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {whatsappSubPages.map((page) => {
                  const Icon = page.icon
                  return (
                    <Link
                      key={page.slug}
                      href={`/soluciones/whatsapp-ia-empresas/${page.slug}`}
                      className={`group bg-gradient-to-br ${page.color} backdrop-blur-sm border ${page.borderColor} rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-xl bg-white/10 border ${page.borderColor} flex items-center justify-center flex-shrink-0`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-green-400 transition-colors">
                            {page.title}
                          </h3>
                          <p className="text-sm text-white/60 leading-relaxed">
                            {page.description}
                          </p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-white/40 group-hover:text-green-400 group-hover:translate-x-1 transition-all flex-shrink-0" />
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          </section>

          {/* Conversation Simulator */}
          <ConversationSimulator
            title="Tu Agente WhatsApp en Accion"
            subtitle="Mira como nuestra IA gestiona atencion al cliente, ventas y reservas en tiempo real."
            badge="Simulacion WhatsApp"
            badgeIcon="whatsapp"
            simulations={conversations}
          />

          {/* Benefits Section */}
          <section className="py-20 px-4 relative">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                    Por que WhatsApp IA?
                  </h2>
                  <p className="text-white/60 mb-8 leading-relaxed">
                    Tus clientes ya estan en WhatsApp. No les hagas descargar apps ni esperar en colas telefonicas. 
                    Atiendeles donde prefieren, cuando lo necesitan.
                  </p>
                  <div className="space-y-4">
                    {benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                        <span className="text-white/80">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center">
                      <Zap className="w-7 h-7 text-green-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">Implementacion rapida</h3>
                      <p className="text-white/60 text-sm">Operativo en menos de 48 horas</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b border-white/10">
                      <span className="text-white/70">Configuracion inicial</span>
                      <span className="text-green-400 font-medium">2-4 horas</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-white/10">
                      <span className="text-white/70">Integracion CRM</span>
                      <span className="text-green-400 font-medium">1 dia</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-white/10">
                      <span className="text-white/70">Entrenamiento IA</span>
                      <span className="text-green-400 font-medium">Automatico</span>
                    </div>
                    <div className="flex items-center justify-between py-3">
                      <span className="text-white/70">Soporte continuo</span>
                      <span className="text-green-400 font-medium">24/7</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Security Section */}
          <section className="py-20 px-4 relative">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-6">
                <Shield className="w-4 h-4 mr-2" />
                Seguridad empresarial
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                WhatsApp Business API Oficial
              </h2>
              <p className="text-white/60 max-w-2xl mx-auto mb-8">
                Usamos la API oficial de Meta. Tus conversaciones estan cifradas de extremo a extremo 
                y cumplimos con RGPD. Sin riesgo de bloqueo de cuenta.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="bg-white/5 border border-white/10 rounded-xl px-6 py-3">
                  <span className="text-white/80">Cifrado E2E</span>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl px-6 py-3">
                  <span className="text-white/80">RGPD Compliant</span>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl px-6 py-3">
                  <span className="text-white/80">API Oficial Meta</span>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl px-6 py-3">
                  <span className="text-white/80">ISO 27001</span>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 px-4 relative">
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm border border-green-500/30 rounded-3xl p-8 md:p-12 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Empieza a automatizar WhatsApp hoy
                </h2>
                <p className="text-white/70 max-w-xl mx-auto mb-8">
                  Prueba gratuita de 14 dias. Sin tarjeta de credito. Configuracion en menos de 1 hora.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg" 
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-6 text-lg rounded-xl"
                    asChild
                  >
                    <Link href="/demo">
                      Solicitar demo gratuita
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg rounded-xl"
                    asChild
                  >
                    <Link href="/casos-exito">
                      Ver casos de exito
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          <Footer />
        </div>
      </main>
    </div>
  )
}
