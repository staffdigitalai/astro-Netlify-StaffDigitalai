import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getService, getServices, stripHtml, WPService } from "@/lib/wordpress"
import { DynamicServiceClient } from "./dynamic-service-client"

interface Props {
  params: Promise<{ slug: string }>
}

// Static slugs that have their own dedicated pages (keep backwards compatibility)
const STATIC_SERVICE_SLUGS = [
  "ia-conversacional",
  "automatización-omnicanal",
  "seguridad-ia",
  "home-staging-ia",
]

export async function generateStaticParams() {
  try {
    const services = await getServices()
    return services
      .filter((service) => !STATIC_SERVICE_SLUGS.includes(service.slug))
      .map((service) => ({
        slug: service.slug,
      }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params

  // Skip for static pages - they have their own metadata
  if (STATIC_SERVICE_SLUGS.includes(slug)) {
    return {}
  }

  try {
    const service = await getService(slug)
    if (!service) {
      return {
        title: "Servicio no encontrado | StaffDigital AI",
      }
    }

    const title = service.acf?.meta_title || `${service.title.rendered} | StaffDigital AI`
    const description =
      service.acf?.meta_description || stripHtml(service.excerpt.rendered)

    return {
      title,
      description,
      openGraph: {
        title,
        description,
      },
    }
  } catch {
    return {
      title: "Soluciones | StaffDigital AI",
    }
  }
}

// Fallback service data generator
function generateFallbackService(slug: string): WPService | null {
  const fallbackData: Record<string, Partial<WPService>> = {
    "atencion-telefonica-ia": {
      id: 1,
      slug: "atencion-telefonica-ia",
      title: { rendered: "Atención Telefónica IA" },
      excerpt: {
        rendered:
          "<p>Agentes de voz IA que responden llamadas 24/7, cualifican leads, gestionan citas y resuelven consultas automaticamente. Tu recepcion virtual inteligente.</p>",
      },
      content: {
        rendered: `
          <h2>Que es la Atención Telefónica IA?</h2>
          <p>Nuestros agentes de voz con inteligencia artificial responden llamadas entrantes de forma natural, cualifican clientes potenciales, gestionan reservas de citas y resuelven consultas frecuentes, todo automaticamente y disponible 24/7.</p>
          <h3>Caracteristicas principales</h3>
          <ul>
            <li>Voz natural con IA conversacional avanzada</li>
            <li>Cualificacion automatica de leads</li>
            <li>Gestión de citas sincronizada con tu calendario</li>
            <li>Transferencia inteligente a agentes humanos</li>
            <li>Soporte multiidioma</li>
          </ul>
        `,
      },
      acf: {
        icono: "Phone",
        subtitulo: "Tu recepcion virtual inteligente 24/7",
        es_destacado: true,
        beneficios: [
          {
            titulo: "Disponibilidad 24/7",
            descripcion: "Nunca pierdas una llamada. Atiende clientes a cualquier hora del dia o la noche.",
            icono: "Clock",
          },
          {
            titulo: "Cualificacion de Leads",
            descripcion: "Identifica y prioriza los prospectosmás calientes automaticamente.",
            icono: "Target",
          },
          {
            titulo: "Reduccion de Costes",
            descripcion: "Ahorra hasta un 70% en costes de recepcion y atención telefónica.",
            icono: "PiggyBank",
          },
          {
            titulo: "Integración Total",
            descripcion: "Conecta con tu CRM, calendario y sistemas existentes sin fricciones.",
            icono: "Plug",
          },
        ],
        caracteristicas: [
          {
            titulo: "Voz Natural con IA",
            descripcion: "Conversaciones fluidas e indistinguibles de un agente humano.",
          },
          {
            titulo: "Gestión de Citas",
            descripcion: "Reserva, confirma y reprograma citas automaticamente.",
          },
          {
            titulo: "Transferencia Inteligente",
            descripcion: "Deriva llamadas complejas a tu equipo con contexto completo.",
          },
          {
            titulo: "Reportes Detallados",
            descripcion: "Analytics de llamadas, conversion y rendimiento en tiempo real.",
          },
        ],
        metricas: [
          { valor: "24/7", etiqueta: "Disponibilidad" },
          { valor: "+85%", etiqueta: "Llamadas atendidas" },
          { valor: "-70%", etiqueta: "Costes recepcion" },
          { valor: "3s", etiqueta: "Tiempo respuesta" },
        ],
        cta_texto: "Pedir Demo",
        cta_link: "/demo",
      },
    },
    "analisis-datos-ia": {
      id: 6,
      slug: "analisis-datos-ia",
      title: { rendered: "Análisis de Datos IA" },
      excerpt: {
        rendered:
          "<p>Dashboards inteligentes, predicciones y reportes automaticos para tomar mejores decisiones de negocio.</p>",
      },
      content: { rendered: "" },
      acf: {
        icono: "BarChart3",
        subtitulo: "Inteligencia de negocio avanzada",
        beneficios: [
          {
            titulo: "Predicciones Precisas",
            descripcion: "Anticipa tendencias y comportamientos con machine learning.",
            icono: "TrendingUp",
          },
          {
            titulo: "Dashboards en Tiempo Real",
            descripcion: "Visualiza metricas clave de tu negocio al instante.",
            icono: "LayoutDashboard",
          },
          {
            titulo: "Reportes Automaticos",
            descripcion: "Genera informes detallados sin esfuerzo manual.",
            icono: "FileText",
          },
        ],
      },
    },
    "automatización-documentos": {
      id: 7,
      slug: "automatización-documentos",
      title: { rendered: "Automatización de Documentos" },
      excerpt: {
        rendered:
          "<p>Extraccion de datos, clasificacion y procesamiento automatico de facturas, contratos y documentos.</p>",
      },
      content: { rendered: "" },
      acf: {
        icono: "FileText",
        subtitulo: "Documentos procesados en segundos",
        beneficios: [
          {
            titulo: "Extraccion Inteligente",
            descripcion: "Captura datos de facturas, contratos y formularios automaticamente.",
            icono: "Scan",
          },
          {
            titulo: "Clasificacion Automatica",
            descripcion: "Organiza documentos por tipo, fecha y contenido.",
            icono: "FolderOpen",
          },
          {
            titulo: "Validacion de Datos",
            descripcion: "Detecta errores y discrepancias automaticamente.",
            icono: "CheckCircle",
          },
        ],
      },
    },
    "marketing-ia": {
      id: 8,
      slug: "marketing-ia",
      title: { rendered: "Marketing IA" },
      excerpt: {
        rendered:
          "<p>Generacion de contenido, campanas automatizadas y personalizacion a escala con inteligencia artificial.</p>",
      },
      content: { rendered: "" },
      acf: {
        icono: "Megaphone",
        subtitulo: "Contenido y campanas inteligentes",
        beneficios: [
          {
            titulo: "Contenido Automatico",
            descripcion: "Genera textos, imagenes y videos optimizados para cada canal.",
            icono: "Sparkles",
          },
          {
            titulo: "Personalizacion a Escala",
            descripcion: "Adapta mensajes para cada segmento de audiencia.",
            icono: "Users",
          },
          {
            titulo: "Optimizacion Continua",
            descripcion: "Mejora automatica basada en resultados y A/B testing.",
            icono: "Repeat",
          },
        ],
      },
    },
  }

  const data = fallbackData[slug]
  if (!data) return null

  return {
    id: data.id || 0,
    date: new Date().toISOString(),
    slug: data.slug || slug,
    title: data.title || { rendered: slug },
    excerpt: data.excerpt || { rendered: "" },
    content: data.content || { rendered: "" },
    featured_media: 0,
    menu_order: data.id || 0,
    acf: data.acf || {},
  } as WPService
}

export default async function DynamicServicePage({ params }: Props) {
  const { slug } = await params

  // Skip dynamic rendering for static pages
  if (STATIC_SERVICE_SLUGS.includes(slug)) {
    notFound()
  }

  let service: WPService | null = null

  try {
    service = await getService(slug)
  } catch (error) {
    console.error("Error fetching service from WordPress:", error)
  }

  // Try fallback if WordPress fails
  if (!service) {
    service = generateFallbackService(slug)
  }

  if (!service) {
    notFound()
  }

  return <DynamicServiceClient service={service} />
}
