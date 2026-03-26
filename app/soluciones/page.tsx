import type { Metadata } from "next"
import { getServices, WPService, stripHtml } from "@/lib/wordpress"
import { ServicesListClient } from "./services-list-client"

export const metadata: Metadata = {
  title: "Soluciones de IA para Empresas | StaffDigital AI",
  description:
    "Descubre nuestras soluciones de inteligencia artificial: atencion telefonica IA, agentes IA con voz humana, IA conversacional omnicanal, seguridad y mas. Transforma tu negocio con IA.",
  openGraph: {
    title: "Soluciones de IA para Empresas | StaffDigital AI",
    description:
      "Descubre nuestras soluciones de inteligencia artificial para automatizar y escalar tu negocio.",
  },
}

// Fallback services data when WordPress is unavailable
const fallbackServices: WPService[] = [
  {
    id: 1,
    date: new Date().toISOString(),
    slug: "atencion-telefonica-ia",
    title: { rendered: "Atencion Telefonica IA" },
    excerpt: {
      rendered:
        "<p>Agentes de voz IA que responden llamadas 24/7, cualifican leads y gestionan citas automaticamente.</p>",
    },
    content: { rendered: "" },
    featured_media: 0,
    menu_order: 1,
    acf: {
      icono: "Phone",
      subtitulo: "Tu recepcion virtual inteligente",
      es_destacado: true,
      cta_texto: "Pedir Demo",
      cta_link: "/demo",
    },
  },
  {
    id: 2,
    date: new Date().toISOString(),
    slug: "ia-conversacional",
    title: { rendered: "IA Conversacional" },
    excerpt: {
      rendered:
        "<p>Agentes IA con voz humana y asistentes virtuales que atienden a tus clientes en cualquier canal.</p>",
    },
    content: { rendered: "" },
    featured_media: 0,
    menu_order: 2,
    acf: {
      icono: "MessageSquare",
      subtitulo: "Agentes IA y asistentes virtuales",
      cta_texto: "Ver Mas",
      cta_link: "/soluciones/ia-conversacional",
    },
  },
  {
    id: 3,
    date: new Date().toISOString(),
    slug: "automatizacion-omnicanal",
    title: { rendered: "IA Conversacional Omnicanal" },
    excerpt: {
      rendered:
        "<p>Unifica WhatsApp, email, redes sociales y mas en una bandeja inteligente con respuestas automaticas.</p>",
    },
    content: { rendered: "" },
    featured_media: 0,
    menu_order: 3,
    acf: {
      icono: "Globe",
      subtitulo: "Todos tus canales en uno",
      cta_texto: "Ver Mas",
      cta_link: "/soluciones/automatizacion-omnicanal",
    },
  },
  {
    id: 4,
    date: new Date().toISOString(),
    slug: "seguridad-ia",
    title: { rendered: "Seguridad IA" },
    excerpt: {
      rendered:
        "<p>Monitorizacion inteligente, deteccion de anomalias y alertas automaticas para proteger tu negocio.</p>",
    },
    content: { rendered: "" },
    featured_media: 0,
    menu_order: 4,
    acf: {
      icono: "Shield",
      subtitulo: "Proteccion inteligente 24/7",
      cta_texto: "Ver Mas",
      cta_link: "/soluciones/seguridad-ia",
    },
  },
  {
    id: 5,
    date: new Date().toISOString(),
    slug: "home-staging-ia",
    title: { rendered: "Home Staging IA" },
    excerpt: {
      rendered:
        "<p>Transforma fotos de propiedades con home staging virtual, renders y marketing inmobiliario con IA.</p>",
    },
    content: { rendered: "" },
    featured_media: 0,
    menu_order: 5,
    acf: {
      icono: "Home",
      subtitulo: "Marketing inmobiliario con IA",
      cta_texto: "Ver Mas",
      cta_link: "/soluciones/home-staging-ia",
    },
  },
  {
    id: 6,
    date: new Date().toISOString(),
    slug: "analisis-datos-ia",
    title: { rendered: "Analisis de Datos IA" },
    excerpt: {
      rendered:
        "<p>Dashboards inteligentes, predicciones y reportes automaticos para tomar mejores decisiones.</p>",
    },
    content: { rendered: "" },
    featured_media: 0,
    menu_order: 6,
    acf: {
      icono: "BarChart3",
      subtitulo: "Inteligencia de negocio avanzada",
      cta_texto: "Ver Mas",
      cta_link: "/soluciones/analisis-datos-ia",
    },
  },
  {
    id: 7,
    date: new Date().toISOString(),
    slug: "automatizacion-documentos",
    title: { rendered: "Automatizacion de Documentos" },
    excerpt: {
      rendered:
        "<p>Extraccion de datos, clasificacion y procesamiento automatico de facturas, contratos y mas.</p>",
    },
    content: { rendered: "" },
    featured_media: 0,
    menu_order: 7,
    acf: {
      icono: "FileText",
      subtitulo: "Documentos procesados en segundos",
      cta_texto: "Ver Mas",
      cta_link: "/soluciones/automatizacion-documentos",
    },
  },
  {
    id: 8,
    date: new Date().toISOString(),
    slug: "marketing-ia",
    title: { rendered: "Marketing IA" },
    excerpt: {
      rendered:
        "<p>Generacion de contenido, campanas automatizadas y personalizacion a escala con inteligencia artificial.</p>",
    },
    content: { rendered: "" },
    featured_media: 0,
    menu_order: 8,
    acf: {
      icono: "Megaphone",
      subtitulo: "Contenido y campanas inteligentes",
      cta_texto: "Ver Mas",
      cta_link: "/soluciones/marketing-ia",
    },
  },
]

async function getServicesData(): Promise<WPService[]> {
  try {
    const services = await getServices()
    if (services && services.length > 0) {
      return services
    }
    return fallbackServices
  } catch (error) {
    console.error("Error fetching services from WordPress:", error)
    return fallbackServices
  }
}

export default async function SolucionesPage() {
  const services = await getServicesData()

  // Transform services for client component
  const servicesData = services.map((service) => ({
    id: service.id,
    slug: service.slug,
    title: service.title.rendered,
    excerpt: stripHtml(service.excerpt.rendered),
    icon: service.acf?.icono || "Zap",
    subtitle: service.acf?.subtitulo || "",
    isFeatured: service.acf?.es_destacado || false,
    ctaText: service.acf?.cta_texto || "Ver Mas",
    ctaLink: service.acf?.cta_link || `/soluciones/${service.slug}`,
  }))

  return <ServicesListClient services={servicesData} />
}
