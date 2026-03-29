import type { MetadataRoute } from "next"

const BASE_URL = "https://www.staffdigital.ai"
const WP_API = "https://cms.staffdigital.ai/wp-json/wp/v2"

// All static pages with their priority and change frequency
const staticPages: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/blog", priority: 0.9, changeFrequency: "daily" },
  { path: "/casos", priority: 0.9, changeFrequency: "weekly" },
  { path: "/precios", priority: 0.9, changeFrequency: "monthly" },
  { path: "/demo", priority: 0.9, changeFrequency: "monthly" },
  { path: "/nosotros", priority: 0.7, changeFrequency: "monthly" },
  { path: "/faq", priority: 0.7, changeFrequency: "monthly" },
  { path: "/tecnologia", priority: 0.7, changeFrequency: "monthly" },
  { path: "/integraciones", priority: 0.7, changeFrequency: "monthly" },
  { path: "/metodologia", priority: 0.7, changeFrequency: "monthly" },
  { path: "/seguridad-compliance", priority: 0.7, changeFrequency: "monthly" },
  // Soluciones
  { path: "/soluciones", priority: 0.8, changeFrequency: "monthly" },
  { path: "/soluciones/whatsapp-ia-empresas", priority: 0.8, changeFrequency: "monthly" },
  { path: "/soluciones/agentes-ia-voz-humana", priority: 1.0, changeFrequency: "weekly" },
  { path: "/soluciones/atencion-telefonica-ia", priority: 0.9, changeFrequency: "monthly" },
  { path: "/soluciones/agente-chat-web-ia", priority: 0.8, changeFrequency: "monthly" },
  { path: "/soluciones/agente-chat-productos-ia", priority: 0.8, changeFrequency: "monthly" },
  { path: "/soluciones/ia-omnicanal", priority: 0.8, changeFrequency: "monthly" },
  { path: "/soluciones/agente-ventas-ia", priority: 0.8, changeFrequency: "monthly" },
  { path: "/soluciones/ia-call-center", priority: 0.8, changeFrequency: "monthly" },
  { path: "/soluciones/automacion-ventas-ia", priority: 0.8, changeFrequency: "monthly" },
  { path: "/soluciones/agente-soporte-ia", priority: 0.8, changeFrequency: "monthly" },
  { path: "/soluciones/agente-agendamientos-ia", priority: 0.8, changeFrequency: "monthly" },
  { path: "/soluciones/lead-generation-ia", priority: 0.8, changeFrequency: "monthly" },
  { path: "/soluciones/onboarding-automatico", priority: 0.7, changeFrequency: "monthly" },
  { path: "/soluciones/home-staging-ia", priority: 0.7, changeFrequency: "monthly" },
  // Sectores
  { path: "/sectores", priority: 0.7, changeFrequency: "monthly" },
  { path: "/sectores/concesionarios", priority: 0.7, changeFrequency: "monthly" },
  { path: "/sectores/restaurantes", priority: 0.7, changeFrequency: "monthly" },
  { path: "/sectores/clinicas", priority: 0.7, changeFrequency: "monthly" },
  { path: "/sectores/peluquerias", priority: 0.7, changeFrequency: "monthly" },
  { path: "/sectores/retail", priority: 0.7, changeFrequency: "monthly" },
  { path: "/sectores/oficinas", priority: 0.7, changeFrequency: "monthly" },
  { path: "/sectores/almacenes", priority: 0.7, changeFrequency: "monthly" },
  { path: "/sectores/servicios-tecnicos", priority: 0.7, changeFrequency: "monthly" },
  { path: "/sectores/inmobiliarias", priority: 0.7, changeFrequency: "monthly" },
  { path: "/sectores/educacion", priority: 0.7, changeFrequency: "monthly" },
  { path: "/sectores/gimnasios", priority: 0.7, changeFrequency: "monthly" },
  { path: "/sectores/dentistas", priority: 0.7, changeFrequency: "monthly" },
  { path: "/sectores/centros-belleza", priority: 0.7, changeFrequency: "monthly" },
  { path: "/sectores/turismo-hoteleria", priority: 0.7, changeFrequency: "monthly" },
  { path: "/sectores/saas-startups", priority: 0.7, changeFrequency: "monthly" },
  { path: "/sectores/ecommerce", priority: 0.7, changeFrequency: "monthly" },
  { path: "/sectores/logistica", priority: 0.7, changeFrequency: "monthly" },
  { path: "/sectores/lead-generation-pymes", priority: 0.7, changeFrequency: "monthly" },
  { path: "/sectores/crm-automation", priority: 0.7, changeFrequency: "monthly" },
]

async function fetchWPSlugs(type: "posts" | "cases"): Promise<{ slug: string; modified: string }[]> {
  try {
    const endpoint = type === "posts" ? "posts" : "cases"
    const res = await fetch(`${WP_API}/${endpoint}?per_page=100&_fields=slug,modified`, {
      next: { revalidate: 3600 },
    })
    if (!res.ok) return []
    const data = await res.json()
    return data.map((item: { slug: string; modified: string }) => ({
      slug: item.slug,
      modified: item.modified,
    }))
  } catch {
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch dynamic content from WordPress
  const [posts, cases] = await Promise.all([
    fetchWPSlugs("posts"),
    fetchWPSlugs("cases"),
  ])

  const staticEntries: MetadataRoute.Sitemap = staticPages.map((page) => ({
    url: `${BASE_URL}${page.path}`,
    lastModified: new Date(),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }))

  const blogEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.modified),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }))

  const caseEntries: MetadataRoute.Sitemap = cases.map((c) => ({
    url: `${BASE_URL}/casos/${c.slug}`,
    lastModified: new Date(c.modified),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  return [...staticEntries, ...blogEntries, ...caseEntries]
}
