"use client"

import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import Aurora from "@/components/Aurora"
import { Footer } from "@/components/footer"
import { ServicePageTemplate } from "@/components/service-page-template"
import type { ServicePageData } from "@/components/service-page-template"
import { 
  Home, 
  Camera, 
  Globe, 
  MessageSquare,
  Phone,
  CalendarCheck,
  Sparkles,
  Wrench,
  Image,
  LayoutTemplate,
  Users,
  TrendingUp,
  Clock,
  PiggyBank,
  Zap,
  Eye,
  Building2,
  MapPin,
  Key,
  Briefcase,
  Award,
  Target
} from "lucide-react"

const data: ServicePageData = {
  serviceName: "Home Staging IA",
  badge: "Marketing Inmobiliario Inteligente",
  headline: "Vende Propiedades",
  headlineAccent: "Mas Rapido con IA",
  subheadline: "Solucion integral para inmobiliarias: desde la preparacion fisica hasta el marketing digital con agentes IA que cualifican compradores y reservan visitas.",
  valueStatement: "Inmuebles con home staging se venden hasta",
  valueHighlight: "50%",
  valueSuffix: "mas rapido",

  // Overview section
  overviewTitle: "Que es Home Staging con IA?",
  overviewDescription: "Home Staging IA es una solucion completa que combina la preparacion fisica de propiedades con tecnologia de inteligencia artificial para maximizar el atractivo de cada inmueble. Desde la limpieza y staging virtual hasta landing pages personalizadas y agentes IA que atienden compradores 24/7, cubrimos todo el proceso de comercializacion inmobiliaria.",
  overviewPoints: [
    "Preparacion integral: limpieza profesional, pequenas reparaciones y staging fisico o virtual",
    "Contenido visual premium: fotografia HDR, tours 360°, video walkthrough y fotos aereas",
    "Marketing digital: landing pages exclusivas y publicacion en portales optimizada",
    "Atencion IA 24/7: chatbots y agentes telefonicos que cualifican y reservan visitas automaticamente",
  ],

  // Services list
  services: [
    { 
      icon: Sparkles, 
      title: "Preparacion Integral de Propiedades", 
      description: "Servicio completo de limpieza profesional, pequenas reparaciones, despeje, y home staging virtual o fisico para maximizar el atractivo visual de cada propiedad.",
      highlight: "Listo para vender en 48h"
    },
    { 
      icon: Camera, 
      title: "Fotografia y Video Profesional", 
      description: "Sesion fotografica HDR de alta calidad, tour virtual 360°, video walkthrough cinematografico y fotos aereas con dron para presentaciones impactantes.",
      highlight: "+300% mas visitas"
    },
    { 
      icon: LayoutTemplate, 
      title: "Landing Pages Personalizadas", 
      description: "Microsite exclusivo para cada propiedad con galeria interactiva, planos, informacion de la zona, calculadora de hipoteca y formulario de contacto optimizado.",
    },
    { 
      icon: MessageSquare, 
      title: "Agentes IA para Compradores", 
      description: "Chatbot y agente telefonico IA que responden consultas 24/7, cualifican compradores segun presupuesto y urgencia, y reservan visitas automaticamente.",
      highlight: "24/7 atencion compradores"
    },
    { 
      icon: Image, 
      title: "Home Staging Virtual", 
      description: "Transforma fotos de espacios vacios en imagenes amuebladas virtualmente con IA. Multiples estilos decorativos para diferentes perfiles de comprador.",
    },
    { 
      icon: Globe, 
      title: "Marketing Multi-portal", 
      description: "Publicacion automatica en Idealista, Fotocasa, Habitaclia y mas portales con textos SEO optimizados y sincronizacion de cambios en tiempo real.",
    },
  ],

  // Benefits for SMEs
  benefitsTitle: "Beneficios para Inmobiliarias",
  benefitsSubtitle: "Como el Home Staging con IA transforma tu agencia inmobiliaria",
  benefits: [
    { 
      icon: Clock, 
      title: "Ventas Mas Rapidas", 
      description: "Reduce el tiempo medio de venta hasta un 50% gracias a presentaciones profesionales y atencion inmediata a compradores." 
    },
    { 
      icon: TrendingUp, 
      title: "Mayor Precio de Venta", 
      description: "Propiedades con home staging profesional se venden hasta un 10% por encima del precio de mercado." 
    },
    { 
      icon: Users, 
      title: "Mas Compradores Cualificados", 
      description: "La IA filtra curiosos de compradores serios, enviandote solo leads que realmente tienen intencion y capacidad de compra." 
    },
    { 
      icon: PiggyBank, 
      title: "Ahorro de Tiempo", 
      description: "Automatiza tareas repetitivas: atencion inicial, cualificacion, reserva de visitas, y seguimiento de interesados." 
    },
    { 
      icon: Zap, 
      title: "Diferenciacion Competitiva", 
      description: "Destaca frente a otras agencias con presentaciones premium y tecnologia de vanguardia que impresiona a propietarios." 
    },
    { 
      icon: Eye, 
      title: "Visibilidad Maximizada", 
      description: "Fotos profesionales y landing pages optimizadas generan hasta 3x mas visitas online a tus propiedades." 
    },
  ],

  // Use cases by sector
  sectorUseCases: [
    { 
      sector: "Agencias Inmobiliarias", 
      sectorIcon: Building2,
      useCases: [
        "Servicio premium para captacion de propietarios exclusivos",
        "Diferenciacion frente a competidores con presentaciones de alto impacto",
        "Atencion 24/7 a compradores sin aumentar equipo",
        "Cualificacion automatica para optimizar tiempo de agentes",
      ]
    },
    { 
      sector: "Promotoras Inmobiliarias", 
      sectorIcon: Key,
      useCases: [
        "Visualizacion de pisos sobre plano con staging virtual",
        "Landing pages para cada promocion con configurador",
        "Gestion de listas de espera con IA",
        "Cualificacion de compradores para priorizar entregas",
      ]
    },
    { 
      sector: "Inversores y Propietarios", 
      sectorIcon: Briefcase,
      useCases: [
        "Preparacion express de viviendas para alquiler o venta",
        "Maximizacion del precio con presentacion profesional",
        "Gestion de consultas sin dedicar tiempo personal",
        "Seguimiento automatico de interesados",
      ]
    },
    { 
      sector: "Pisos Turisticos", 
      sectorIcon: MapPin,
      useCases: [
        "Fotos profesionales para Airbnb, Booking, etc.",
        "Landing page propia para reservas directas",
        "Chatbot para consultas de huespedes potenciales",
        "Automatizacion de check-in/check-out virtual",
      ]
    },
    { 
      sector: "Propiedades de Lujo", 
      sectorIcon: Award,
      useCases: [
        "Produccion audiovisual cinematografica de alta gama",
        "Tours virtuales inmersivos con narracion",
        "Marketing exclusivo en redes y portales premium",
        "Cualificacion exhaustiva de compradores VIP",
      ]
    },
    { 
      sector: "Locales Comerciales", 
      sectorIcon: Target,
      useCases: [
        "Visualizacion de diferentes usos comerciales con staging",
        "Landing pages orientadas a inversores y empresas",
        "Informacion automatica sobre licencias y normativa",
        "Cualificacion de potencial inquilino o comprador",
      ]
    },
  ],

  // Stats
  stats: [
    { value: "-50%", label: "Tiempo de venta" },
    { value: "+300%", label: "Visitas online" },
    { value: "24/7", label: "Atencion IA" },
    { value: "48h", label: "Preparacion" },
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
      title: "Seguridad IA", 
      description: "Monitorizacion inteligente y alertas automaticas.",
      href: "/soluciones/seguridad-ia"
    },
  ],

  // CTA
  ctaTitle: "Listo para vender propiedades",
  ctaAccent: "mas rapido?",
  ctaDescription: "Descubre como el home staging con IA puede transformar tu agencia inmobiliaria y acelerar las ventas.",
  accentColor: "purple",
}

export function HomeStagingClient() {
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
