"use client"

import Link from "next/link"
import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import Aurora from "@/components/Aurora"
import { Footer } from "@/components/footer"
import { ConversationSimulator } from "@/components/conversation-simulator"
import { getWhatsAppSubPageConversations } from "@/lib/conversation-data"
import { Button } from "@/components/ui/button"
import { PageWrapper } from "@/components/page-wrapper"
import { 
  MessageSquare, 
  Phone, 
  Calendar, 
  Users, 
  Headphones, 
  Link2,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  ChevronRight
} from "lucide-react"

interface WhatsAppSubPageClientProps {
  slug: string
}

// Page content configuration
const pageContent: Record<string, {
  title: string
  subtitle: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  color: string
  features: string[]
  useCases: { title: string; description: string }[]
  stats: { value: string; label: string }[]
}> = {
  "agente-voz-whatsapp": {
    title: "Agente de Voz WhatsApp",
    subtitle: "Responde mensajes de voz con IA",
    description: "Tu asistente IA escucha notas de voz, las transcribe automaticamente y responde con audio natural. Conversaciones fluidas sin que el cliente tenga que escribir.",
    icon: Phone,
    color: "from-green-500/20 to-emerald-500/10",
    features: [
      "Transcripcion automatica de notas de voz",
      "Respuestas por audio con voz natural",
      "Deteccion de idioma automatica",
      "Análisis de sentimiento en tiempo real",
      "Escalado a humano cuando es necesario",
      "Historial completo de conversaciones",
    ],
    useCases: [
      { title: "Clientes que prefieren hablar", description: "Muchos usuarios prefieren enviar audios a escribir. Tu IA les atiende en su formato preferido." },
      { title: "Consultas complejas", description: "Los clientes pueden explicar problemas detallados por voz y recibir soluciones inmediatas." },
      { title: "Accesibilidad", description: "Personas con dificultades para escribir pueden interactuar facilmente con tu negocio." },
    ],
    stats: [
      { value: "Audio", label: "Respuestas" },
      { value: "<10s", label: "Procesado" },
      { value: "95%", label: "Precision" },
    ],
  },
  "atencion-cliente-whatsapp": {
    title: "Atencion al Cliente 24/7",
    subtitle: "Soporte instantaneo sin esperas",
    description: "Resuelve consultas, gestiona incidencias y da soporte en segundos. Tu equipo solo interviene en casos complejos mientras la IA maneja el 80% de las consultas.",
    icon: Headphones,
    color: "from-blue-500/20 to-blue-600/10",
    features: [
      "Respuestas instantaneas 24/7",
      "Base de conocimiento personalizada",
      "Gestión de incidencias automatica",
      "Escalado inteligente a humanos",
      "Multiidioma (ES, PT, EN, CA)",
      "Integración con sistemas de tickets",
    ],
    useCases: [
      { title: "Consultas frecuentes", description: "Horarios, precios, disponibilidad... respuestas inmediatas sin saturar tu equipo." },
      { title: "Seguimiento de pedidos", description: "Los clientes consultan estado de envios y la IA responde con datos en tiempo real." },
      { title: "Gestión de devoluciones", description: "Inicia procesos de devolucion automaticamente siguiendo tu politica." },
    ],
    stats: [
      { value: "24/7", label: "Disponible" },
      { value: "-70%", label: "Tickets" },
      { value: "<5s", label: "Respuesta" },
    ],
  },
  "agente-ventas-whatsapp": {
    title: "Agente de Ventas IA",
    subtitle: "Convierte leads en clientes",
    description: "Cualifica prospectos, presenta productos, resuelve objeciones y cierra ventas. Tu mejor vendedor trabajando 24/7 sin descanso.",
    icon: TrendingUp,
    color: "from-purple-500/20 to-purple-600/10",
    features: [
      "Cualificacion automatica de leads",
      "Presentacion de productos personalizada",
      "Manejo de objeciones con IA",
      "Propuestas y presupuestos automaticos",
      "Follow-up automatico",
      "Cierre de ventas asistido",
    ],
    useCases: [
      { title: "Leads de madrugada", description: "Un lead a las 3AM recibe atencion inmediata en lugar de esperar hasta manana." },
      { title: "Alto volumen de consultas", description: "Gestiona cientos de conversaciones simultaneas sin perder calidad." },
      { title: "Upselling y cross-selling", description: "Sugiere productos complementarios basandose en el historial del cliente." },
    ],
    stats: [
      { value: "+35%", label: "Conversion" },
      { value: "Auto", label: "Follow-up" },
      { value: "0", label: "Leads perdidos" },
    ],
  },
  "citas-reservas-whatsapp": {
    title: "Citas y Reservas",
    subtitle: "Agenda automatica 24/7",
    description: "Gestiona tu agenda por WhatsApp. Los clientes reservan, modifican o cancelan citas cuando quieren. Recordatorios automaticos reducen no-shows un 80%.",
    icon: Calendar,
    color: "from-orange-500/20 to-orange-600/10",
    features: [
      "Reservas 24/7 automaticas",
      "Sincronizacion con Google Calendar",
      "Recordatorios SMS y WhatsApp",
      "Gestión de cancelaciones",
      "Lista de espera automatica",
      "Confirmacion de asistencia",
    ],
    useCases: [
      { title: "Clinicas y consultas", description: "Pacientes reservan cita sin llamar. Recordatorio 24h antes reduce faltas." },
      { title: "Restaurantes", description: "Reservas de mesa automaticas con confirmacion y gestión de no-shows." },
      { title: "Servicios a domicilio", description: "Clientes eligen dia, hora y direccion. Tecnico recibe notificacion." },
    ],
    stats: [
      { value: "-80%", label: "No-shows" },
      { value: "24/7", label: "Reservas" },
      { value: "Auto", label: "Recordatorios" },
    ],
  },
  "lead-qualification-whatsapp": {
    title: "Cualificacion de Leads",
    subtitle: "Scoring automatico inteligente",
    description: "Identifica leads calientes con preguntas estrategicas. Scoring automatico prioriza los mejores prospectos para tu equipo de ventas.",
    icon: Users,
    color: "from-cyan-500/20 to-cyan-600/10",
    features: [
      "Preguntas de cualificacion automaticas",
      "Scoring basado en respuestas",
      "Identificacion de necesidades",
      "Segmentacion por sector/tamano",
      "Priorizacion para vendedores",
      "Datos enriquecidos al CRM",
    ],
    useCases: [
      { title: "B2B complejo", description: "Identifica presupuesto, timeline y decision-maker antes de pasar a ventas." },
      { title: "Alto volumen de leads", description: "Filtra curiosos de compradores reales automaticamente." },
      { title: "Sectorizacion", description: "Dirige leads al vendedor especializado segun su industria." },
    ],
    stats: [
      { value: "Auto", label: "Scoring" },
      { value: "+45%", label: "SQL rate" },
      { value: "100%", label: "Cualificados" },
    ],
  },
  "integración-crm-whatsapp": {
    title: "Integración CRM",
    subtitle: "Sincronizacion en tiempo real",
    description: "Conecta WhatsApp con tu CRM favorito. Cada conversacion, lead y venta sincronizada automaticamente. Cero entrada manual de datos.",
    icon: Link2,
    color: "from-pink-500/20 to-pink-600/10",
    features: [
      "HubSpot, Salesforce, Pipedrive",
      "Sincronizacion bidireccional",
      "Creacion automatica de contactos",
      "Actualizacion de deals/oportunidades",
      "Historial de conversaciones en CRM",
      "+50 integraciones disponibles",
    ],
    useCases: [
      { title: "Equipo de ventas", description: "Vendedores ven conversacion WhatsApp directamente en su CRM." },
      { title: "Marketing automation", description: "Leads de WhatsApp entran en tus flujos de nurturing automaticamente." },
      { title: "Reporting unificado", description: "Metricas de WhatsApp junto con el resto de canales en tu dashboard." },
    ],
    stats: [
      { value: "Real-time", label: "Sync" },
      { value: "50+", label: "Integraciónes" },
      { value: "0", label: "Datos perdidos" },
    ],
  },
}

// Related pages for sidebar
const relatedPages = [
  { slug: "agente-voz-whatsapp", title: "Agente de Voz", icon: Phone },
  { slug: "atencion-cliente-whatsapp", title: "Atencion al Cliente", icon: Headphones },
  { slug: "agente-ventas-whatsapp", title: "Agente de Ventas", icon: TrendingUp },
  { slug: "citas-reservas-whatsapp", title: "Citas y Reservas", icon: Calendar },
  { slug: "lead-qualification-whatsapp", title: "Cualificacion Leads", icon: Users },
  { slug: "integración-crm-whatsapp", title: "Integración CRM", icon: Link2 },
]

export function WhatsAppSubPageClient({ slug }: WhatsAppSubPageClientProps) {
  const content = pageContent[slug]
  const conversations = getWhatsAppSubPageConversations(slug)
  const Icon = content?.icon || MessageSquare

  if (!content) {
    return null
  }

  const breadcrumbs = [
    { label: "Inicio", href: "/" },
    { label: "Soluciones", href: "/soluciones" },
    { label: "WhatsApp IA", href: "/soluciones/whatsapp-ia-empresas" },
    { label: content.title },
  ]

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      <main className="min-h-screen relative overflow-hidden">
        <div className="fixed inset-0 w-full h-full">
          <Aurora colorStops={["#25D366", "#128C7E", "#075E54"]} amplitude={1.2} blend={0.5} speed={0.8} />
        </div>

        <div className="relative z-10">
          <GlassmorphismNav />

          <PageWrapper breadcrumbs={breadcrumbs}>
            {/* Hero Section */}
            <section className="pt-8 pb-16">
              <div className="max-w-4xl">
                <div className={`inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r ${content.color} border border-green-500/30 text-white text-sm font-medium mb-6`}>
                  <Icon className="w-4 h-4 mr-2 text-green-400" />
                  WhatsApp IA para Empresas
                </div>

                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                  {content.title}
                </h1>
                <p className="text-xl text-green-400 mb-6">{content.subtitle}</p>
                <p className="text-lg text-white/70 leading-relaxed mb-8">
                  {content.description}
                </p>

                {/* Stats */}
                <div className="flex flex-wrap gap-4 mb-8">
                  {content.stats.map((stat, index) => (
                    <div 
                      key={index}
                      className="bg-white/5 border border-white/10 rounded-xl px-6 py-3 text-center"
                    >
                      <div className="text-xl font-bold text-green-400">{stat.value}</div>
                      <div className="text-xs text-white/60">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    size="lg" 
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold"
                    asChild
                  >
                    <Link href="/demo">
                      Solicitar demo
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-white/20 text-white hover:bg-white/10"
                    asChild
                  >
                    <Link href="/soluciones/whatsapp-ia-empresas">
                      Ver todas las soluciones
                    </Link>
                  </Button>
                </div>
              </div>
            </section>

            {/* Main Content Grid */}
            <section className="py-16">
              <div className="grid lg:grid-cols-3 gap-12">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-12">
                  {/* Features */}
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-6">Caracteristicas</h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {content.features.map((feature, index) => (
                        <div 
                          key={index}
                          className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-4"
                        >
                          <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                          <span className="text-white/80">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Use Cases */}
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-6">Casos de uso</h2>
                    <div className="space-y-4">
                      {content.useCases.map((useCase, index) => (
                        <div 
                          key={index}
                          className="bg-white/5 border border-white/10 rounded-xl p-6"
                        >
                          <h3 className="text-lg font-semibold text-white mb-2">{useCase.title}</h3>
                          <p className="text-white/60">{useCase.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sticky top-24">
                    <h3 className="text-lg font-semibold text-white mb-4">Otras soluciones WhatsApp</h3>
                    <div className="space-y-2">
                      {relatedPages.filter(p => p.slug !== slug).map((page) => {
                        const PageIcon = page.icon
                        return (
                          <Link
                            key={page.slug}
                            href={`/soluciones/whatsapp-ia-empresas/${page.slug}`}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-colors group"
                          >
                            <PageIcon className="w-5 h-5 text-white/60 group-hover:text-green-400 transition-colors" />
                            <span className="text-white/80 group-hover:text-white transition-colors flex-1">{page.title}</span>
                            <ChevronRight className="w-4 h-4 text-white/40 group-hover:text-green-400 transition-colors" />
                          </Link>
                        )
                      })}
                    </div>
                    <div className="mt-6 pt-6 border-t border-white/10">
                      <Link
                        href="/soluciones/whatsapp-ia-empresas"
                        className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-green-500/20 border border-green-500/30 text-green-400 hover:bg-green-500/30 transition-colors"
                      >
                        <MessageSquare className="w-4 h-4" />
                        Ver hub WhatsApp IA
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </PageWrapper>

          {/* Conversation Simulator */}
          <ConversationSimulator
            title={`${content.title} en Accion`}
            subtitle={`Mira como funciona ${content.title.toLowerCase()} en tiempo real.`}
            badge="Simulacion WhatsApp"
            badgeIcon="whatsapp"
            simulations={conversations}
          />

          {/* CTA Section */}
          <section className="py-20 px-4 relative">
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm border border-green-500/30 rounded-3xl p-8 md:p-12 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Prueba {content.title} gratis
                </h2>
                <p className="text-white/70 max-w-xl mx-auto mb-8">
                  14 dias de prueba gratuita. Configuracion en menos de 1 hora. Sin tarjeta de credito.
                </p>
                <Button 
                  size="lg" 
                  className="bg-green-500 hover:bg-green-600 text-white font-semibold px-8"
                  asChild
                >
                  <Link href="/demo">
                    Empezar prueba gratuita
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>

          <Footer />
        </div>
      </main>
    </div>
  )
}
