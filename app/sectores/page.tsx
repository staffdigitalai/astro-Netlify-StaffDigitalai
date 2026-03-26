import type { Metadata } from "next"
import { getSectorPages, WPSectorPage, stripHtml } from "@/lib/wordpress"
import { SectorsListClient } from "./sectors-list-client"

export const metadata: Metadata = {
  title: "Sectores | Agentes IA por Industria",
  description:
    "Agentes IA con voz humana especializados por sector: clinicas, concesionarios, restaurantes, inmobiliarias y mas.",
  openGraph: {
    title: "Sectores | Agentes IA por Industria | StaffDigital AI",
    description:
      "Agentes IA con voz humana especializados para cada industria. Encuentra la solucion perfecta para tu sector.",
  },
}

// Fallback sector data when WordPress is unavailable
const fallbackSectors: WPSectorPage[] = [
  {
    id: 1,
    date: new Date().toISOString(),
    slug: "clinicas",
    title: { rendered: "Clinicas y Centros Medicos" },
    excerpt: { rendered: "<p>Automatiza citas, reduce no-shows y atiende pacientes 24/7 con IA conversacional.</p>" },
    content: { rendered: "" },
    featured_media: 0,
    menu_order: 1,
    acf: {
      icono: "Stethoscope",
      subtitulo: "Gestion inteligente de pacientes",
      metricas: [
        { valor: "-80%", etiqueta: "No-shows" },
        { valor: "+35%", etiqueta: "Ocupacion" },
      ],
    },
  },
  {
    id: 2,
    date: new Date().toISOString(),
    slug: "dentistas",
    title: { rendered: "Clinicas Dentales" },
    excerpt: { rendered: "<p>Optimiza tu consulta dental con gestion automatica de citas y atencion al paciente.</p>" },
    content: { rendered: "" },
    featured_media: 0,
    menu_order: 2,
    acf: {
      icono: "Smile",
      subtitulo: "Pacientes felices, agenda llena",
    },
  },
  {
    id: 3,
    date: new Date().toISOString(),
    slug: "peluquerias",
    title: { rendered: "Peluquerias y Estetica" },
    excerpt: { rendered: "<p>Gestiona reservas por WhatsApp, reduce cancelaciones y fideliza clientes.</p>" },
    content: { rendered: "" },
    featured_media: 0,
    menu_order: 3,
    acf: {
      icono: "Scissors",
      subtitulo: "Belleza y eficiencia",
    },
  },
  {
    id: 4,
    date: new Date().toISOString(),
    slug: "restaurantes",
    title: { rendered: "Restaurantes y Hosteleria" },
    excerpt: { rendered: "<p>Reservas automaticas, pedidos a domicilio y atención al cliente sin interrupciones.</p>" },
    content: { rendered: "" },
    featured_media: 0,
    menu_order: 4,
    acf: {
      icono: "UtensilsCrossed",
      subtitulo: "Mesas llenas, clientes contentos",
    },
  },
  {
    id: 5,
    date: new Date().toISOString(),
    slug: "inmobiliarias",
    title: { rendered: "Inmobiliarias" },
    excerpt: { rendered: "<p>Cualifica compradores, programa visitas y responde consultas de propiedades 24/7.</p>" },
    content: { rendered: "" },
    featured_media: 0,
    menu_order: 5,
    acf: {
      icono: "Home",
      subtitulo: "Ventasmás rapidas",
    },
  },
  {
    id: 6,
    date: new Date().toISOString(),
    slug: "concesionarios",
    title: { rendered: "Concesionarios" },
    excerpt: { rendered: "<p>Cualifica leads, agenda pruebas de conduccion y responde sobre stock y financiacion.</p>" },
    content: { rendered: "" },
    featured_media: 0,
    menu_order: 6,
    acf: {
      icono: "Car",
      subtitulo: "Acelera tus ventas",
    },
  },
  {
    id: 7,
    date: new Date().toISOString(),
    slug: "gimnasios",
    title: { rendered: "Gimnasios y Fitness" },
    excerpt: { rendered: "<p>Gestiona altas, reservas de clases y atencion a socios de forma automatica.</p>" },
    content: { rendered: "" },
    featured_media: 0,
    menu_order: 7,
    acf: {
      icono: "Dumbbell",
      subtitulo: "Mas socios, menos gestion",
    },
  },
  {
    id: 8,
    date: new Date().toISOString(),
    slug: "retail",
    title: { rendered: "Retail y Comercio" },
    excerpt: { rendered: "<p>Atención al cliente omnicanal, gestión de pedidos y soporte postventa automatizado.</p>" },
    content: { rendered: "" },
    featured_media: 0,
    menu_order: 8,
    acf: {
      icono: "ShoppingBag",
      subtitulo: "Vende mas, atiende mejor",
    },
  },
  {
    id: 9,
    date: new Date().toISOString(),
    slug: "oficinas",
    title: { rendered: "Oficinas y Servicios" },
    excerpt: { rendered: "<p>Recepcion virtual, gestión de visitas y atención telefónica inteligente.</p>" },
    content: { rendered: "" },
    featured_media: 0,
    menu_order: 9,
    acf: {
      icono: "Building2",
      subtitulo: "Profesionalidad automatizada",
    },
  },
  {
    id: 10,
    date: new Date().toISOString(),
    slug: "servicios-tecnicos",
    title: { rendered: "Servicios Tecnicos" },
    excerpt: { rendered: "<p>Gestión de incidencias, programacion de visitas y soporte tecnico automatizado.</p>" },
    content: { rendered: "" },
    featured_media: 0,
    menu_order: 10,
    acf: {
      icono: "Wrench",
      subtitulo: "Respuesta rapida garantizada",
    },
  },
  {
    id: 11,
    date: new Date().toISOString(),
    slug: "educacion",
    title: { rendered: "Educacion y Formacion" },
    excerpt: { rendered: "<p>Atencion a alumnos, gestión de matriculas e información sobre cursos 24/7.</p>" },
    content: { rendered: "" },
    featured_media: 0,
    menu_order: 11,
    acf: {
      icono: "GraduationCap",
      subtitulo: "Aprendizaje continuo",
    },
  },
  {
    id: 12,
    date: new Date().toISOString(),
    slug: "almacenes",
    title: { rendered: "Almacenes y Logistica" },
    excerpt: { rendered: "<p>Seguimiento de pedidos, gestión de incidencias y comunicacion con clientes automatizada.</p>" },
    content: { rendered: "" },
    featured_media: 0,
    menu_order: 12,
    acf: {
      icono: "Warehouse",
      subtitulo: "Logistica inteligente",
    },
  },
]

async function getSectorsData(): Promise<WPSectorPage[]> {
  try {
    const sectors = await getSectorPages()
    if (sectors && sectors.length > 0) {
      return sectors
    }
    return fallbackSectors
  } catch (error) {
    console.error("Error fetching sectors from WordPress:", error)
    return fallbackSectors
  }
}

export default async function SectoresPage() {
  const sectors = await getSectorsData()

  // Transform sectors for client component
  const sectorsData = sectors.map((sector) => ({
    id: sector.id,
    slug: sector.slug,
    title: sector.title.rendered,
    excerpt: stripHtml(sector.excerpt.rendered),
    icon: sector.acf?.icono || "Building2",
    subtitle: sector.acf?.subtitulo || "",
    metricas: sector.acf?.metricas || [],
  }))

  return <SectorsListClient sectors={sectorsData} />
}
