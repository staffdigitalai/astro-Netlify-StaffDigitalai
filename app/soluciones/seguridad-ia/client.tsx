"use client"

import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import Aurora from "@/components/Aurora"
import { Footer } from "@/components/footer"
import { ServicePageTemplate } from "@/components/service-page-template"
import type { ServicePageData } from "@/components/service-page-template"
import { 
  Shield, 
  Camera, 
  Bell, 
  Users,
  Car,
  Eye,
  Smartphone,
  AlertTriangle,
  Lock,
  Monitor,
  Wifi,
  Clock,
  PiggyBank,
  TrendingUp,
  Zap,
  FileCheck,
  ShoppingBag,
  Warehouse,
  Building2,
  UtensilsCrossed,
  Home,
  Wrench
} from "lucide-react"

const data: ServicePageData = {
  serviceName: "Seguridad IA",
  badge: "Videovigilancia Inteligente con IA",
  headline: "Seguridad que",
  headlineAccent: "Piensa por Ti",
  subheadline: "Monitorizacion inteligente con deteccion de personas, vehiculos y comportamientos sospechosos. Alertas automaticas y respuesta inmediata.",
  valueStatement: "Reduce falsas alarmas hasta",
  valueHighlight: "95%",
  valueSuffix: "con deteccion inteligente",

  // Overview section
  overviewTitle: "Que es la Seguridad con IA?",
  overviewDescription: "La seguridad con IA transforma tus camaras existentes en un sistema de vigilancia inteligente. Mediante algoritmos de vision por computador y aprendizaje profundo, detectamos personas, vehiculos, objetos y comportamientos anomalos en tiempo real, eliminando las falsas alarmas y alertandote solo cuando realmente importa.",
  overviewPoints: [
    "Deteccion precisa de personas, vehiculos y objetos con 98% de fiabilidad",
    "Eliminacion del 95% de falsas alarmas causadas por animales, clima o sombras",
    "Alertas instantaneas con imagen y video directamente a tu movil",
    "Compatible con camaras existentes - no necesitas cambiar tu infraestructura",
  ],

  // Services list
  services: [
    { 
      icon: Eye, 
      title: "Deteccion Inteligente con IA", 
      description: "Reconocimiento avanzado de personas, vehiculos, objetos y comportamientos anomalos con precision superior al 98%. Diferencia entre amenazas reales y falsas alarmas.",
      highlight: "98% precision"
    },
    { 
      icon: Bell, 
      title: "Alertas Automaticas Inteligentes", 
      description: "Notificaciones instantaneas al detectar eventos relevantes, filtrando automaticamente falsas alarmas por animales, clima o movimientos irrelevantes.",
      highlight: "-95% falsas alarmas"
    },
    { 
      icon: Lock, 
      title: "Integracion con Alarmas", 
      description: "Conecta con tu sistema de alarmas existente para activacion automatica basada en detecciones de IA. Compatible con los principales proveedores.",
    },
    { 
      icon: Monitor, 
      title: "Dashboard de Monitorizacion", 
      description: "Panel centralizado con vista en tiempo real de todas las camaras, historial de eventos, zonas calientes y analiticas de seguridad.",
      highlight: "Acceso remoto 24/7"
    },
    { 
      icon: Smartphone, 
      title: "App Movil con Video en Vivo", 
      description: "Recibe alertas push con capturas del evento, accede a video en directo y revisa grabaciones desde cualquier lugar con tu smartphone.",
    },
    { 
      icon: Clock, 
      title: "Grabacion Inteligente", 
      description: "Solo graba cuando hay movimiento relevante, ahorrando almacenamiento y facilitando la busqueda de eventos especificos en el historial.",
    },
  ],

  // Benefits for SMEs
  benefitsTitle: "Beneficios para PYMEs",
  benefitsSubtitle: "Como la seguridad con IA protege tu negocio de forma inteligente",
  benefits: [
    { 
      icon: PiggyBank, 
      title: "Ahorro en Vigilancia", 
      description: "Reduce costes de seguridad hasta un 60% eliminando la necesidad de vigilancia presencial continua." 
    },
    { 
      icon: AlertTriangle, 
      title: "Prevencion Activa", 
      description: "Detecta comportamientos sospechosos antes de que ocurra el incidente, permitiendo actuar preventivamente." 
    },
    { 
      icon: FileCheck, 
      title: "Evidencia Automatica", 
      description: "Grabaciones indexadas automaticamente por tipo de evento, facilitando la revision y uso como evidencia si es necesario." 
    },
    { 
      icon: Zap, 
      title: "Respuesta Inmediata", 
      description: "Alertas en menos de 1 segundo permiten reaccion rapida, ya sea llamando a la policia o activando medidas disuasorias." 
    },
    { 
      icon: TrendingUp, 
      title: "Tranquilidad Total", 
      description: "Supervisa tu negocio desde cualquier lugar, sabiendo que seras alertado instantaneamente ante cualquier incidencia." 
    },
    { 
      icon: Shield, 
      title: "Sin Falsas Alarmas", 
      description: "Olvida las llamadas nocturnas por un gato o una rama. La IA distingue amenazas reales de eventos irrelevantes." 
    },
  ],

  // Use cases by sector
  sectorUseCases: [
    { 
      sector: "Retail y Comercios", 
      sectorIcon: ShoppingBag,
      useCases: [
        "Deteccion de comportamientos sospechosos en tienda",
        "Alerta de merodeo fuera del horario comercial",
        "Control de aforo en tiempo real",
        "Prevencion de hurtos con alertas inmediatas",
      ]
    },
    { 
      sector: "Almacenes y Logistica", 
      sectorIcon: Warehouse,
      useCases: [
        "Vigilancia de zonas de carga y descarga",
        "Control de acceso vehicular a instalaciones",
        "Deteccion de intrusiones en perimetro",
        "Monitorizacion de areas restringidas",
      ]
    },
    { 
      sector: "Oficinas y Coworking", 
      sectorIcon: Building2,
      useCases: [
        "Control de acceso inteligente por reconocimiento",
        "Deteccion de presencia fuera de horario",
        "Alertas de puertas abiertas en zonas seguras",
        "Gestion de visitantes y contratistas",
      ]
    },
    { 
      sector: "Restaurantes y Hosteleria", 
      sectorIcon: UtensilsCrossed,
      useCases: [
        "Vigilancia de cajas y zonas de cobro",
        "Control de accesos a almacenes y neveras",
        "Deteccion de actividad sospechosa nocturna",
        "Monitorizacion de terrazas y espacios exteriores",
      ]
    },
    { 
      sector: "Concesionarios", 
      sectorIcon: Car,
      useCases: [
        "Vigilancia de exposicion y stock exterior",
        "Deteccion de vehiculos no autorizados",
        "Control de taller y zonas de reparacion",
        "Alertas de merodeo en horario nocturno",
      ]
    },
    { 
      sector: "Residencial y Comunidades", 
      sectorIcon: Home,
      useCases: [
        "Control de acceso a zonas comunes",
        "Deteccion de intrusiones en parkings",
        "Vigilancia de piscinas y jardines",
        "Alertas de paqueteria y visitas",
      ]
    },
  ],

  // Stats
  stats: [
    { value: "98%", label: "Precision deteccion" },
    { value: "-95%", label: "Falsas alarmas" },
    { value: "24/7", label: "Monitorizacion" },
    { value: "<1s", label: "Tiempo alerta" },
  ],

  // Related services
  relatedServices: [
    { 
      title: "IA Conversacional", 
      description: "Chatbots y agentes de voz inteligentes para atencion 24/7.",
      href: "/soluciones/ia-conversacional"
    },
    { 
      title: "Automatizacion Omnicanal", 
      description: "Unifica todos tus canales en una bandeja inteligente.",
      href: "/soluciones/automatizacion-omnicanal"
    },
    { 
      title: "Home Staging IA", 
      description: "Solucion completa de preparacion y marketing inmobiliario con IA.",
      href: "/soluciones/home-staging-ia"
    },
  ],

  // CTA
  ctaTitle: "Listo para una seguridad",
  ctaAccent: "verdaderamente inteligente?",
  ctaDescription: "Descubre como la videovigilancia con IA puede proteger tu negocio las 24 horas sin falsas alarmas.",
  accentColor: "emerald",
}

export function SecurityAIClient() {
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
