"use client"

import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import Aurora from "@/components/Aurora"
import { Footer } from "@/components/footer"
import { ServicePageTemplate } from "@/components/service-page-template"
import type { ServicePageData } from "@/components/service-page-template"
import { 
  Layers, 
  Mail, 
  MessageCircle, 
  Workflow,
  Inbox,
  RefreshCw,
  Database,
  Send,
  Bell,
  BarChart3,
  Link2,
  Settings,
  Clock,
  PiggyBank,
  TrendingUp,
  Users,
  Zap,
  Shield,
  Stethoscope,
  ShoppingBag,
  Car,
  Building2,
  UtensilsCrossed,
  Wrench
} from "lucide-react"

const data: ServicePageData = {
  serviceName: "Automatizacion Omnicanal",
  badge: "Bandeja Unificada y Workflows Inteligentes",
  headline: "Todos tus Canales,",
  headlineAccent: "Una Sola Plataforma",
  subheadline: "Unifica WhatsApp, email, redes sociales y telefono en una bandeja inteligente con respuestas automaticas y workflows personalizados.",
  valueStatement: "Reduce el tiempo de respuesta hasta",
  valueHighlight: "90%",
  valueSuffix: "con automatizacion omnicanal",

  // Overview section
  overviewTitle: "Que es la Automatizacion Omnicanal?",
  overviewDescription: "La automatizacion omnicanal centraliza todas las comunicaciones de tu negocio en una unica plataforma inteligente. Desde WhatsApp hasta email, desde Instagram hasta llamadas telefonicas, todos los mensajes llegan a un mismo lugar donde la IA los prioriza, responde automaticamente o los asigna al equipo adecuado.",
  overviewPoints: [
    "Bandeja unica que consolida WhatsApp, email, Instagram, Facebook, Telegram y telefono",
    "Respuestas automaticas inteligentes que mantienen el contexto de cada conversacion",
    "Workflows personalizados que se ejecutan sin intervencion manual",
    "CRM integrado con historial completo de cada cliente en una sola vista",
  ],

  // Services list
  services: [
    { 
      icon: Inbox, 
      title: "Bandeja Unificada Inteligente", 
      description: "Todos tus mensajes de WhatsApp, email, Instagram, Facebook y mas en un solo lugar, con priorizacion automatica por IA segun urgencia y valor del cliente.",
      highlight: "Vista 360° del cliente"
    },
    { 
      icon: Mail, 
      title: "Automatizacion de Email", 
      description: "Respuestas automaticas personalizadas, seguimientos programados, campanas de nurturing y secuencias de onboarding gestionadas por IA.",
      highlight: "+50% tasa de apertura"
    },
    { 
      icon: Database, 
      title: "CRM Integrado", 
      description: "Sincronizacion bidireccional con tu CRM existente (Hubspot, Salesforce, Zoho) o usa nuestro CRM integrado con todas las interacciones centralizadas.",
    },
    { 
      icon: Workflow, 
      title: "Workflows Automaticos", 
      description: "Crea flujos de trabajo visuales que se ejecutan automaticamente basados en triggers, condiciones y acciones. Sin necesidad de programacion.",
      highlight: "Sin codigo necesario"
    },
    { 
      icon: Link2, 
      title: "Integraciones Nativas", 
      description: "Conecta con mas de 100 herramientas incluyendo Zapier, Make, Google Sheets, Calendly y APIs personalizadas para automatizar cualquier proceso.",
    },
    { 
      icon: BarChart3, 
      title: "Analiticas Avanzadas", 
      description: "Dashboard en tiempo real con metricas de rendimiento por canal, tiempo de respuesta, satisfaccion del cliente y productividad del equipo.",
    },
  ],

  // Benefits for SMEs
  benefitsTitle: "Beneficios para PYMEs",
  benefitsSubtitle: "Como la automatizacion omnicanal transforma las operaciones de tu negocio",
  benefits: [
    { 
      icon: Clock, 
      title: "Ahorro de Tiempo Masivo", 
      description: "Reduce el 90% del tiempo dedicado a gestionar comunicaciones dispersas en multiples plataformas." 
    },
    { 
      icon: PiggyBank, 
      title: "Optimizacion de Recursos", 
      description: "Un equipo pequeno puede gestionar el volumen de comunicaciones de uno grande gracias a la automatizacion." 
    },
    { 
      icon: TrendingUp, 
      title: "Mejora en Respuesta", 
      description: "Ningun mensaje sin responder. Priorizacion inteligente asegura que los clientes importantes reciban atencion rapida." 
    },
    { 
      icon: Users, 
      title: "Colaboracion de Equipo", 
      description: "Asignacion automatica de conversaciones, notas internas y transferencias fluidas entre miembros del equipo." 
    },
    { 
      icon: Zap, 
      title: "Procesos Estandarizados", 
      description: "Workflows garantizan que cada tipo de solicitud siga el proceso correcto, reduciendo errores humanos." 
    },
    { 
      icon: Shield, 
      title: "Historial Centralizado", 
      description: "Cada interaccion queda registrada. Nunca pierdas contexto aunque cambie el miembro del equipo asignado." 
    },
  ],

  // Use cases by sector
  sectorUseCases: [
    { 
      sector: "Clinicas y Salud", 
      sectorIcon: Stethoscope,
      useCases: [
        "Confirmacion automatica de citas por WhatsApp y email",
        "Seguimiento post-consulta con encuestas de satisfaccion",
        "Recordatorios de medicacion y proximas citas",
        "Gestion de urgencias con priorizacion automatica",
      ]
    },
    { 
      sector: "Retail y Ecommerce", 
      sectorIcon: ShoppingBag,
      useCases: [
        "Seguimiento de pedidos automatico en todos los canales",
        "Gestion de devoluciones y reclamaciones centralizada",
        "Campanas de recuperacion de carritos abandonados",
        "Notificaciones de stock y ofertas personalizadas",
      ]
    },
    { 
      sector: "Concesionarios", 
      sectorIcon: Car,
      useCases: [
        "Seguimiento automatico de leads de campanas",
        "Recordatorios de revisiones y mantenimientos",
        "Gestion de citas de taller por multiples canales",
        "Nurturing de prospectos hasta la compra",
      ]
    },
    { 
      sector: "Oficinas y Servicios", 
      sectorIcon: Building2,
      useCases: [
        "Gestion de solicitudes de soporte centralizadas",
        "Asignacion automatica segun tipo de consulta",
        "Escalado inteligente de incidencias",
        "Informes de SLA y tiempos de respuesta",
      ]
    },
    { 
      sector: "Restauracion y Hosteleria", 
      sectorIcon: UtensilsCrossed,
      useCases: [
        "Confirmacion de reservas por WhatsApp y email",
        "Gestion de resenas y feedback post-visita",
        "Comunicacion de eventos y promociones",
        "Atencion de pedidos delivery desde multiples apps",
      ]
    },
    { 
      sector: "Servicios Tecnicos", 
      sectorIcon: Wrench,
      useCases: [
        "Gestion de tickets de soporte unificada",
        "Asignacion automatica a tecnicos por zona/especialidad",
        "Seguimiento de reparaciones con actualizaciones",
        "Encuestas de satisfaccion post-servicio",
      ]
    },
  ],

  // Stats
  stats: [
    { value: "-90%", label: "Tiempo respuesta" },
    { value: "+50%", label: "Productividad" },
    { value: "100+", label: "Integraciones" },
    { value: "24/7", label: "Automatizacion" },
  ],

  // Related services
  relatedServices: [
    { 
      title: "IA Conversacional", 
      description: "Chatbots y agentes de voz inteligentes para atencion 24/7.",
      href: "/soluciones/ia-conversacional"
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
  ctaTitle: "Listo para unificar",
  ctaAccent: "todos tus canales?",
  ctaDescription: "Descubre como la automatizacion omnicanal puede simplificar tus operaciones y mejorar la experiencia del cliente.",
  accentColor: "blue",
}

export function OmnichannelClient() {
  return (
    <div className="min-h-screen bg-black overflow-hidden">
      <main className="min-h-screen relative overflow-hidden">
        <div className="fixed inset-0 w-full h-full">
          <Aurora colorStops={["#475569", "#64748b", "#475569"]} amplitude={1.2} blend={0.6} speed={0.8} />
        </div>
        <div className="relative z-10">
          <GlassmorphismNav />
          <ServicePageTemplate data={data} />
          <Footer />
        </div>
      </main>
    </div>
  )
}
