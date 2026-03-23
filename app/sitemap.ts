import type { MetadataRoute } from "next"

const BASE_URL = "https://www.staffdigital.ai"
const WP_API = "https://cms.staffdigital.ai/wp-json/wp/v2"

// All static pages with their priority and change frequency
const staticPages: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/blog", priority: 0.9, changeFrequency: "daily" },
  { path: "/casos", priority: 0.9, changeFrequency: "weekly" },
  { path: "/faq", priority: 0.7, changeFrequency: "monthly" },
  // Soluciones
  { path: "/soluciones/ia-conversacional", priority: 0.8, changeFrequency: "monthly" },
  { path: "/soluciones/automatizacion-omnicanal", priority: 0.8, changeFrequency: "monthly" },
  { path: "/soluciones/seguridad-ia", priority: 0.8, changeFrequency: "monthly" },
  { path: "/soluciones/home-staging-ia", priority: 0.8, changeFrequency: "monthly" },
  // Sectores
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
