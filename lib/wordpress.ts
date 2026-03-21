// WordPress Headless CMS API Library
// Supports multilingual content (es, pt-pt, en) and ACF custom fields

const WP_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'https://cms.staffdigital.ai/wp-json/wp/v2'

export type Language = 'es' | 'pt-pt' | 'en'

// Types for WordPress data
export interface WPPost {
  id: number
  slug: string
  title: {
    rendered: string
  }
  excerpt: {
    rendered: string
  }
  content: {
    rendered: string
  }
  date: string
  modified: string
  featured_media: number
  categories: number[]
  tags: number[]
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string
      alt_text: string
      media_details?: {
        sizes?: {
          medium?: { source_url: string }
          large?: { source_url: string }
          full?: { source_url: string }
        }
      }
    }>
    'wp:term'?: Array<Array<{
      id: number
      name: string
      slug: string
    }>>
  }
}

export interface WPCaseStudy {
  id: number
  slug: string
  title: {
    rendered: string
  }
  content: {
    rendered: string
  }
  excerpt: {
    rendered: string
  }
  date: string
  featured_media: number
  acf: {
    cliente: string
    sector: string | number
    resultado: string
    testimonio: string
    imagen_destacada?: string
    descripcion_corta?: string
  }
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string
      alt_text: string
    }>
  }
}

export interface WPFAQ {
  id: number
  slug: string
  title: {
    rendered: string
  }
  acf: {
    pregunta: string
    respuesta: string
    sector: string | number
  }
}

export interface WPSector {
  id: number
  name: string
  slug: string
  description: string
  count: number
}

export interface WPCategory {
  id: number
  name: string
  slug: string
  description: string
  count: number
  parent: number
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  totalPages: number
  currentPage: number
}

// Helper to strip HTML tags for plain text excerpts
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim()
}

// Helper to format dates
export function formatDate(dateString: string, locale: Language = 'es'): string {
  const date = new Date(dateString)
  const localeMap: Record<Language, string> = {
    es: 'es-ES',
    'pt-pt': 'pt-PT',
    en: 'en-US'
  }
  return date.toLocaleDateString(localeMap[locale], {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Get featured image URL from embedded data
export function getFeaturedImageUrl(post: WPPost | WPCaseStudy, size: 'medium' | 'large' | 'full' = 'large'): string | null {
  if (!post._embedded?.['wp:featuredmedia']?.[0]) return null
  
  const media = post._embedded['wp:featuredmedia'][0]
  
  // Try to get the requested size, fallback to source_url
  if (media.media_details?.sizes?.[size]) {
    return media.media_details.sizes[size].source_url
  }
  
  return media.source_url || null
}

// Generic fetch helper with error handling
async function fetchAPI<T>(
  endpoint: string,
  params: Record<string, string | number | boolean> = {}
): Promise<T> {
  const url = new URL(`${WP_API_URL}${endpoint}`)
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.append(key, String(value))
    }
  })

  const response = await fetch(url.toString(), {
    next: { revalidate: 300 } // Cache for 5 minutes
  })

  if (!response.ok) {
    throw new Error(`WordPress API error: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

// Fetch with pagination headers
async function fetchPaginatedAPI<T>(
  endpoint: string,
  params: Record<string, string | number | boolean> = {}
): Promise<PaginatedResponse<T>> {
  const url = new URL(`${WP_API_URL}${endpoint}`)
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.append(key, String(value))
    }
  })

  const response = await fetch(url.toString(), {
    next: { revalidate: 300 }
  })

  if (!response.ok) {
    throw new Error(`WordPress API error: ${response.status} ${response.statusText}`)
  }

  const data = await response.json()
  const total = parseInt(response.headers.get('X-WP-Total') || '0', 10)
  const totalPages = parseInt(response.headers.get('X-WP-TotalPages') || '1', 10)
  const currentPage = Number(params.page) || 1

  return {
    data,
    total,
    totalPages,
    currentPage
  }
}

// ============ POSTS ============

export interface GetPostsOptions {
  lang?: Language
  page?: number
  perPage?: number
  category?: number
  search?: string
  orderBy?: 'date' | 'title' | 'modified'
  order?: 'asc' | 'desc'
}

export async function getPosts(options: GetPostsOptions = {}): Promise<PaginatedResponse<WPPost>> {
  const {
    lang = 'es',
    page = 1,
    perPage = 10,
    category,
    search,
    orderBy = 'date',
    order = 'desc'
  } = options

  const params: Record<string, string | number | boolean> = {
    lang,
    page,
    per_page: perPage,
    orderby: orderBy,
    order,
    _embed: true
  }

  if (category) params.categories = category
  if (search) params.search = search

  return fetchPaginatedAPI<WPPost>('/posts', params)
}

export async function getPost(slug: string, lang: Language = 'es'): Promise<WPPost | null> {
  try {
    const posts = await fetchAPI<WPPost[]>('/posts', {
      slug,
      lang,
      _embed: true
    })
    return posts[0] || null
  } catch {
    return null
  }
}

// ============ CASE STUDIES ============

export interface GetCaseStudiesOptions {
  lang?: Language
  page?: number
  perPage?: number
  sector?: number
}

export async function getCaseStudies(options: GetCaseStudiesOptions = {}): Promise<PaginatedResponse<WPCaseStudy>> {
  const {
    lang = 'es',
    page = 1,
    perPage = 10,
    sector
  } = options

  const params: Record<string, string | number | boolean> = {
    lang,
    page,
    per_page: perPage,
    _embed: true
  }

  if (sector) params.sector = sector

  return fetchPaginatedAPI<WPCaseStudy>('/case-studies', params)
}

export async function getCaseStudy(slug: string, lang: Language = 'es'): Promise<WPCaseStudy | null> {
  try {
    const studies = await fetchAPI<WPCaseStudy[]>('/case-studies', {
      slug,
      lang,
      _embed: true
    })
    return studies[0] || null
  } catch {
    return null
  }
}

// ============ FAQs ============

export interface GetFAQsOptions {
  lang?: Language
  sector?: number
}

export async function getFaqs(options: GetFAQsOptions = {}): Promise<WPFAQ[]> {
  const { lang = 'es', sector } = options

  const params: Record<string, string | number | boolean> = {
    lang,
    per_page: 100 // FAQs are usually not paginated
  }

  if (sector) params.sector = sector

  return fetchAPI<WPFAQ[]>('/faqs', params)
}

// Get FAQs grouped by sector
export async function getFaqsGroupedBySector(lang: Language = 'es'): Promise<Map<string, WPFAQ[]>> {
  const [faqs, sectors] = await Promise.all([
    getFaqs({ lang }),
    getSectors()
  ])

  const sectorMap = new Map<number, string>()
  sectors.forEach(s => sectorMap.set(s.id, s.name))

  const grouped = new Map<string, WPFAQ[]>()
  
  faqs.forEach(faq => {
    const sectorId = typeof faq.acf.sector === 'string' 
      ? parseInt(faq.acf.sector, 10) 
      : faq.acf.sector
    
    const sectorName = sectorMap.get(sectorId) || 'General'
    
    if (!grouped.has(sectorName)) {
      grouped.set(sectorName, [])
    }
    grouped.get(sectorName)!.push(faq)
  })

  return grouped
}

// ============ SECTORS ============

export async function getSectors(): Promise<WPSector[]> {
  return fetchAPI<WPSector[]>('/sectors', {
    per_page: 100,
    hide_empty: false
  })
}

export async function getSector(id: number): Promise<WPSector | null> {
  try {
    return await fetchAPI<WPSector>(`/sectors/${id}`)
  } catch {
    return null
  }
}

// ============ CATEGORIES ============

export async function getCategories(lang: Language = 'es'): Promise<WPCategory[]> {
  return fetchAPI<WPCategory[]>('/categories', {
    lang,
    per_page: 100,
    hide_empty: true
  })
}

export async function getCategory(id: number): Promise<WPCategory | null> {
  try {
    return await fetchAPI<WPCategory>(`/categories/${id}`)
  } catch {
    return null
  }
}
