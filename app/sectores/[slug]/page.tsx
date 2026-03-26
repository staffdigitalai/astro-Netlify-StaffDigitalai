import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getSectorPage, getSectorPages, stripHtml, WPSectorPage } from "@/lib/wordpress"
import { DynamicSectorClient } from "./dynamic-sector-client"

interface Props {
  params: Promise<{ slug: string }>
}

// Static slugs that have their own dedicated pages (keep backwards compatibility)
const STATIC_SECTOR_SLUGS = [
  "clinicas",
  "dentistas",
  "peluquerias",
  "restaurantes",
  "inmobiliarias",
  "concesionarios",
  "gimnasios",
  "retail",
  "oficinas",
  "servicios-tecnicos",
  "educacion",
  "almacenes",
]

export async function generateStaticParams() {
  try {
    const sectors = await getSectorPages()
    return sectors
      .filter((sector) => !STATIC_SECTOR_SLUGS.includes(sector.slug))
      .map((sector) => ({
        slug: sector.slug,
      }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params

  // Skip for static pages - they have their own metadata
  if (STATIC_SECTOR_SLUGS.includes(slug)) {
    return {}
  }

  try {
    const sector = await getSectorPage(slug)
    if (!sector) {
      return {
        title: "Sector no encontrado | StaffDigital AI",
      }
    }

    const title = sector.acf?.meta_title || `IA para ${sector.title.rendered} | StaffDigital AI`
    const description =
      sector.acf?.meta_description || stripHtml(sector.excerpt.rendered)

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
      title: "Sectores | StaffDigital AI",
    }
  }
}

// Fallback sector data generator for new sectors not yet with static pages
function generateFallbackSector(slug: string): WPSectorPage | null {
  const fallbackData: Record<string, Partial<WPSectorPage>> = {
    "hoteles": {
      id: 100,
      slug: "hoteles",
      title: { rendered: "Hoteles y Alojamientos" },
      excerpt: {
        rendered:
          "<p>Optimiza la experiencia del huesped con recepcion virtual, reservas automaticas y atencion 24/7.</p>",
      },
      acf: {
        icono: "Hotel",
        subtitulo: "Hospitalidad inteligente",
        problemas_sector: [
          { problema: "Recepcion saturada", descripcion: "Personal sobrecargado con consultas repetitivas de huespedes." },
          { problema: "Reservas fuera de horario", descripcion: "Perdida de reservas por falta de atencion nocturna." },
          { problema: "Consultas multiidioma", descripcion: "Dificultad para atender huespedes internacionales." },
        ],
        soluciones: [
          { titulo: "Conserje Virtual 24/7", descripcion: "Atiende consultas de huespedes en cualquier idioma y a cualquier hora.", icono: "MessageSquare" },
          { titulo: "Gestión de Reservas", descripcion: "Reserva, modifica y cancela automaticamente por cualquier canal.", icono: "Calendar" },
          { titulo: "Upselling Inteligente", descripcion: "Sugiere servicios adicionales basados en preferencias del huesped.", icono: "TrendingUp" },
        ],
        metricas: [
          { valor: "+25%", etiqueta: "Satisfaccion huesped" },
          { valor: "-50%", etiqueta: "Tiempo respuesta" },
          { valor: "24/7", etiqueta: "Disponibilidad" },
          { valor: "+15%", etiqueta: "Revenue por reserva" },
        ],
      },
    },
    "home-staging": {
      id: 101,
      slug: "home-staging",
      title: { rendered: "Home Staging Virtual" },
      excerpt: {
        rendered:
          "<p>Transforma propiedades vacias en hogares atractivos con home staging virtual y renders fotorrealistas.</p>",
      },
      acf: {
        icono: "Home",
        subtitulo: "Vende propiedadesmás rapido",
        problemas_sector: [
          { problema: "Propiedades vacias sin interes", descripcion: "Los compradores no visualizan el potencial del espacio." },
          { problema: "Coste alto del staging fisico", descripcion: "Amuelar temporalmente es caro y logisticamente complejo." },
          { problema: "Tiempo de venta prolongado", descripcion: "Propiedades tardanmás en venderse sin presentacion adecuada." },
        ],
        soluciones: [
          { titulo: "Home Staging Virtual", descripcion: "Amuebla digitalmente cualquier espacio en 24-48 horas.", icono: "Image" },
          { titulo: "Renders Fotorrealistas", descripcion: "Visualizaciones 3D indistinguibles de fotos reales.", icono: "Camera" },
          { titulo: "Tours Virtuales", descripcion: "Recorridos interactivos para compradores remotos.", icono: "Video" },
        ],
        metricas: [
          { valor: "-40%", etiqueta: "Tiempo de venta" },
          { valor: "+20%", etiqueta: "Precio de cierre" },
          { valor: "24h", etiqueta: "Entrega" },
          { valor: "-90%", etiqueta: "Coste vs staging fisico" },
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
  } as WPSectorPage
}

export default async function DynamicSectorPage({ params }: Props) {
  const { slug } = await params

  // Skip dynamic rendering for static pages (they have their own page.tsx)
  if (STATIC_SECTOR_SLUGS.includes(slug)) {
    notFound()
  }

  let sector: WPSectorPage | null = null

  try {
    sector = await getSectorPage(slug)
  } catch (error) {
    console.error("Error fetching sector from WordPress:", error)
  }

  // Try fallback if WordPress fails
  if (!sector) {
    sector = generateFallbackSector(slug)
  }

  if (!sector) {
    notFound()
  }

  return <DynamicSectorClient sector={sector} />
}
