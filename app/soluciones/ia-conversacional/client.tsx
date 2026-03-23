"use client"

import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import Aurora from "@/components/Aurora"
import { Footer } from "@/components/footer"
import { ServicePageTemplate } from "@/components/service-page-template"
import { FeaturesSection } from "@/components/features-section"
import { LeadsProblemSection } from "@/components/leads-problem-section"
import { ROICalculatorSection } from "@/components/roi-calculator-section"
import { PillarCTASection } from "@/components/pillar-cta-section"
import { ConversationSimulator } from "@/components/conversation-simulator"
import { getConversationsForService } from "@/lib/conversation-data"
import type { ServicePageData } from "@/components/service-page-template"
import { 
  MessageSquare, 
  Phone, 
  CalendarCheck, 
  Users, 
  Bot, 
  Headphones,
  Clock,
  Target,
  Zap,
  Globe,
  TrendingUp,
  PiggyBank,
  UserCheck,
  Sparkles,
  Stethoscope,
  Scissors,
  UtensilsCrossed,
  Car,
  Building2,
  Home
} from "lucide-react"

const data: ServicePageData = {
  serviceName: "IA Conversacional",
  badge: "Chatbots y Agentes de Voz Inteligentes",
  headline: "Atencion al Cliente",
  headlineAccent: "24/7 con IA",
  subheadline: "Chatbots inteligentes, asistentes virtuales y agentes de voz que cualifican leads, reservan citas y responden consultas automaticamente.",
  valueStatement: "Empresas con IA conversacional aumentan",
  valueHighlight: "+40%",
  valueSuffix: "la conversion de leads",

  // Overview section
  overviewTitle: "Que es la IA Conversacional?",
  overviewDescription: "La IA Conversacional combina procesamiento de lenguaje natural, aprendizaje automatico y reconocimiento de voz para crear asistentes virtuales que mantienen conversaciones naturales con tus clientes. Desde chatbots en tu web hasta agentes telefonicos que responden llamadas, esta tecnologia transforma como las empresas interactuan con sus clientes.",
  overviewPoints: [
    "Respuestas instantaneas y personalizadas basadas en el contexto del cliente y su historial",
    "Capacidad de aprender y mejorar continuamente con cada interaccion",
    "Integracion perfecta con tus sistemas existentes (CRM, calendario, bases de datos)",
    "Transferencia inteligente a agentes humanos cuando la situacion lo requiere",
  ],

  // Services list
  services: [
    { 
      icon: MessageSquare, 
      title: "Chatbots Inteligentes 24/7", 
      description: "Chatbots con IA avanzada que entienden el contexto, responden consultas complejas y guian a los visitantes hacia la conversion. Personalizados para tu sector y marca.",
      highlight: "Respuesta en menos de 3 segundos"
    },
    { 
      icon: Phone, 
      title: "Agentes de Voz IA", 
      description: "Asistentes telefonicos con voz natural que responden llamadas, toman mensajes, gestionan citas y resuelven consultas frecuentes cuando no puedes atender.",
      highlight: "Disponible 24/7/365"
    },
    { 
      icon: Users, 
      title: "Cualificacion Automatica de Leads", 
      description: "Sistema inteligente que cualifica prospectos haciendo las preguntas correctas, evaluando su interes y priorizando los leads mas calientes para tu equipo comercial.",
      highlight: "+60% leads cualificados"
    },
    { 
      icon: CalendarCheck, 
      title: "Reserva de Citas Automatica", 
      description: "Agenda citas directamente desde el chat o llamada, sincronizado con tu calendario, con confirmaciones automaticas y recordatorios previos a la cita.",
    },
    { 
      icon: Globe, 
      title: "Soporte Multiidioma", 
      description: "Atiende clientes en espanol, portugues, ingles, catalan y mas de 50 idiomas automaticamente, detectando el idioma del usuario y respondiendo en consecuencia.",
    },
    { 
      icon: Bot, 
      title: "Asistente de Ventas IA", 
      description: "Guia a los clientes en su proceso de compra, responde preguntas sobre productos y servicios, y sugiere opciones relevantes basadas en sus necesidades.",
    },
  ],

  // Benefits for SMEs
  benefitsTitle: "Beneficios para PYMEs",
  benefitsSubtitle: "Como la IA conversacional impulsa el crecimiento de pequenas y medianas empresas",
  benefits: [
    { 
      icon: Clock, 
      title: "Atencion Sin Horarios", 
      description: "Nunca pierdas una oportunidad de venta por estar cerrado. Tus clientes reciben atencion inmediata a cualquier hora del dia o la noche." 
    },
    { 
      icon: PiggyBank, 
      title: "Reduccion de Costes", 
      description: "Automatiza hasta el 80% de consultas repetitivas, permitiendo que tu equipo se centre en tareas de mayor valor sin aumentar plantilla." 
    },
    { 
      icon: TrendingUp, 
      title: "Aumento de Conversiones", 
      description: "Captura y cualifica leads automaticamente, aumentando las conversiones hasta un 40% con respuestas instantaneas." 
    },
    { 
      icon: UserCheck, 
      title: "Mejor Experiencia Cliente", 
      description: "Respuestas inmediatas, personalizadas y consistentes que mejoran la satisfaccion del cliente y fidelizan." 
    },
    { 
      icon: Zap, 
      title: "Implementacion Rapida", 
      description: "Sistema operativo en dias, no meses. Sin necesidad de grandes inversiones en infraestructura o formacion." 
    },
    { 
      icon: Sparkles, 
      title: "Escalabilidad Instantanea", 
      description: "Gestiona picos de demanda sin problemas. La IA puede atender a cientos de clientes simultaneamente." 
    },
  ],

  // Use cases by sector
  sectorUseCases: [
    { 
      sector: "Clinicas y Dentistas", 
      sectorIcon: Stethoscope,
      useCases: [
        "Reserva de citas automatica sincronizada con agenda",
        "Respuesta a preguntas sobre tratamientos y precios",
        "Recordatorios de citas y seguimiento post-visita",
        "Triaje inicial para urgencias",
      ]
    },
    { 
      sector: "Peluquerias y Estetica", 
      sectorIcon: Scissors,
      useCases: [
        "Gestion de reservas por WhatsApp o web",
        "Sugerencia de servicios basada en historial",
        "Confirmacion y reprogramacion de citas",
        "Promocion de tratamientos complementarios",
      ]
    },
    { 
      sector: "Restaurantes", 
      sectorIcon: UtensilsCrossed,
      useCases: [
        "Reservas de mesa con preferencias (terraza, zona tranquila)",
        "Respuesta a preguntas sobre menu y alergenos",
        "Gestion de pedidos a domicilio",
        "Recordatorio de reservas y solicitud de resenas",
      ]
    },
    { 
      sector: "Concesionarios", 
      sectorIcon: Car,
      useCases: [
        "Cualificacion de compradores potenciales",
        "Programacion de pruebas de conduccion",
        "Informacion sobre financiacion y stock",
        "Seguimiento de leads de campanas",
      ]
    },
    { 
      sector: "Oficinas y Servicios", 
      sectorIcon: Building2,
      useCases: [
        "Recepcion virtual inteligente",
        "Programacion de reuniones y visitas",
        "Respuesta a consultas sobre servicios",
        "Derivacion a departamentos especificos",
      ]
    },
    { 
      sector: "Inmobiliarias", 
      sectorIcon: Home,
      useCases: [
        "Cualificacion de compradores (presupuesto, ubicacion)",
        "Programacion de visitas a propiedades",
        "Informacion sobre inmuebles disponibles",
        "Seguimiento automatico de interesados",
      ]
    },
  ],

  // Stats
  stats: [
    { value: "24/7", label: "Disponibilidad" },
    { value: "+40%", label: "Conversion leads" },
    { value: "3s", label: "Tiempo respuesta" },
    { value: "-70%", label: "Carga equipo" },
  ],

  // Related services
  relatedServices: [
    { 
      title: "Automatizacion Omnicanal", 
      description: "Integra todos tus canales en una bandeja unificada con respuestas automaticas.",
      href: "/soluciones/automatizacion-omnicanal"
    },
    { 
      title: "Seguridad IA", 
      description: "Monitorizacion inteligente y alertas automaticas para tu negocio.",
      href: "/soluciones/seguridad-ia"
    },
    { 
      title: "Home Staging IA", 
      description: "Solucion completa de preparacion y marketing inmobiliario con IA.",
      href: "/soluciones/home-staging-ia"
    },
  ],

  // CTA
  ctaTitle: "Listo para automatizar tu",
  ctaAccent: "atencion al cliente?",
  ctaDescription: "Descubre como la IA conversacional puede transformar la experiencia de tus clientes y aumentar tus ventas.",
  accentColor: "orange",
}

export function ConversationalAIClient() {
  const conversations = getConversationsForService("ia-conversacional")

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      <main className="min-h-screen relative overflow-hidden">
        <div className="fixed inset-0 w-full h-full">
          <Aurora colorStops={["#475569", "#64748b", "#475569"]} amplitude={1.2} blend={0.6} speed={0.8} />
        </div>
        <div className="relative z-10">
          <GlassmorphismNav />
          <ServicePageTemplate data={data}>
            <LeadsProblemSection />
          </ServicePageTemplate>
          {conversations.length > 0 && (
            <ConversationSimulator
              title="Tu Chatbot en Accion"
              subtitle="Mira como nuestros chatbots cualifican leads y responden consultas automaticamente."
              badge="Simulacion Chat Web"
              badgeIcon="chat"
              simulations={conversations}
            />
          )}
          <FeaturesSection />
          <ROICalculatorSection />
          <PillarCTASection />
          <Footer />
        </div>
      </main>
    </div>
  )
}
