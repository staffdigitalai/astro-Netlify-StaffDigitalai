// WordPress API Configuration
const WP_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'https://cms.staffdigital.ai/wp-json/wp/v2';

// Types
export interface WPPost {
  id: number;
  date: string;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  featured_media: number;
  categories: number[];
  content_types?: number[]; // Content type taxonomy (guia, comparativa, pregunta-seo)
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text: string;
      media_details: {
        sizes: {
          medium?: { source_url: string };
          large?: { source_url: string };
          full?: { source_url: string };
        };
      };
    }>;
    'wp:term'?: Array<Array<{
      id: number;
      name: string;
      slug: string;
    }>>;
  };
  acf?: {
    meta_title?: string;
    meta_description?: string;
    reading_time?: number;
  };
}

export interface WPCategory {
  id: number;
  name: string;
  slug: string;
  count: number;
}

export interface WPSector {
  id: number;
  name: string;
  slug: string;
  count: number;
}

// Content Type taxonomy (guia, comparativa, pregunta-seo)
export interface WPContentType {
  id: number;
  name: string;
  slug: string;
  count: number;
}

// Service CPT with ACF fields
export interface WPService {
  id: number;
  date: string;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  featured_media: number;
  menu_order: number;
  acf: {
    icono?: string;
    subtitulo?: string;
    beneficios?: Array<{
      titulo: string;
      descripcion: string;
      icono?: string;
    }>;
    caracteristicas?: Array<{
      titulo: string;
      descripcion: string;
    }>;
    casos_uso?: Array<{
      titulo: string;
      descripcion: string;
    }>;
    cta_texto?: string;
    cta_link?: string;
    es_destacado?: boolean;
    meta_title?: string;
    meta_description?: string;
  };
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text: string;
    }>;
  };
}

// Sector Page CPT with ACF fields
export interface WPSectorPage {
  id: number;
  date: string;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  featured_media: number;
  menu_order: number;
  acf: {
    subtitulo?: string;
    icono?: string;
    problemas_sector?: Array<{
      problema: string;
      descripcion: string;
    }>;
    soluciones?: Array<{
      titulo: string;
      descripcion: string;
      icono?: string;
    }>;
    metricas?: Array<{
      valor: string;
      etiqueta: string;
      descripción?: string;
    }>;
    testimonios?: Array<{
      nombre: string;
      cargo: string;
      empresa: string;
      texto: string;
      imagen?: string;
    }>;
    servicios_relacionados?: number[]; // IDs of related services
    meta_title?: string;
    meta_description?: string;
  };
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text: string;
    }>;
  };
}

// WordPress Page (for base pages like precios, nosotros, etc.)
export interface WPPage {
  id: number;
  date: string;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  featured_media: number;
  parent: number;
  template: string;
  acf?: {
    subtitulo?: string;
    secciones?: Array<{
      tipo: string;
      titulo?: string;
      contenido?: string;
      items?: Array<{
        titulo: string;
        descripcion: string;
        icono?: string;
      }>;
    }>;
    // Pricing page specific
    planes?: Array<{
      nombre: string;
      precio: string;
      periodo?: string;
      descripcion: string;
      caracteristicas: string[];
      cta_texto: string;
      cta_link: string;
      destacado?: boolean;
    }>;
    meta_title?: string;
    meta_description?: string;
  };
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text: string;
    }>;
  };
}

export interface WPCaseStudy {
  id: number;
  date: string;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  featured_media: number;
  sectors?: number[]; // Sector taxonomy IDs
  acf: {
    cliente?: string;
    sector?: string;
    resultado_principal?: string;
    resultado?: string;
    testimonio?: string;
    metricas?: Array<{
      valor: string;
      etiqueta: string;
    }>;
    servicios_utilizados?: number[];
    meta_title?: string;
    meta_description?: string;
  };
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text: string;
    }>;
    'wp:term'?: Array<Array<{
      id: number;
      name: string;
      slug: string;
    }>>;
  };
}

export interface WPFaq {
  id: number;
  slug: string;
  title: { rendered: string };
  acf: {
    pregunta?: string;
    respuesta?: string;
    sector?: string;
    orden?: number;
  };
}

export type SupportedLang = 'es' | 'pt-pt' | 'en';

// Utility to build query string
function buildQueryString(params: Record<string, string | number | undefined>): string {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.append(key, String(value));
    }
  });
  return searchParams.toString();
}

// Fetch wrapper with error handling, timeout, and retry
async function wpFetch<T>(endpoint: string, params: Record<string, string | number | undefined> = {}): Promise<T> {
  const queryString = buildQueryString(params);
  const url = `${WP_API_URL}${endpoint}${queryString ? `?${queryString}` : ''}`;

  const maxRetries = 2;
  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);

      const response = await fetch(url, {
        next: { revalidate: 300 }, // ISR: cache for 5 minutes
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`WordPress API error: ${response.status} ${response.statusText} for ${url}`);
      }

      return response.json();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      if (attempt < maxRetries) {
        // Wait 1s before retry
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  }

  throw lastError!;
}

// Get total pages from response headers (with retry)
async function wpFetchWithPagination<T>(
  endpoint: string,
  params: Record<string, string | number | undefined> = {}
): Promise<{ data: T; totalPages: number; total: number }> {
  const queryString = buildQueryString(params);
  const url = `${WP_API_URL}${endpoint}${queryString ? `?${queryString}` : ''}`;

  const maxRetries = 2;
  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);

      const response = await fetch(url, {
        next: { revalidate: 300 },
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`WordPress API error: ${response.status} ${response.statusText} for ${url}`);
      }

      const data = await response.json();
      const totalPages = parseInt(response.headers.get('X-WP-TotalPages') || '1', 10);
      const total = parseInt(response.headers.get('X-WP-Total') || '0', 10);

      return { data, totalPages, total };
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      if (attempt < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  }

  throw lastError!;
}

// Posts
export async function getPosts(options: {
  lang?: SupportedLang;
  category?: number;
  page?: number;
  perPage?: number;
  search?: string;
} = {}): Promise<{ posts: WPPost[]; totalPages: number; total: number }> {
  const { lang = 'es', category, page = 1, perPage = 9, search } = options;
  
  const { data, totalPages, total } = await wpFetchWithPagination<WPPost[]>('/posts', {
    lang,
    categories: category,
    page,
    per_page: perPage,
    search,
    _embed: 1,
  });

  return { posts: data, totalPages, total };
}

export async function getPost(slug: string, lang: SupportedLang = 'es'): Promise<WPPost | null> {
  const posts = await wpFetch<WPPost[]>('/posts', {
    slug,
    lang,
    _embed: 1,
  });

  return posts[0] || null;
}

// Categories
export async function getCategories(lang: SupportedLang = 'es'): Promise<WPCategory[]> {
  return wpFetch<WPCategory[]>('/categories', {
    lang,
    per_page: 100,
    hide_empty: 1,
  });
}

// Sectors
export async function getSectors(): Promise<WPSector[]> {
  return wpFetch<WPSector[]>('/sectors', {
    per_page: 100,
  });
}

// Case Studies
export async function getCaseStudies(options: {
  lang?: SupportedLang;
  sector?: number;
  page?: number;
  perPage?: number;
} = {}): Promise<{ caseStudies: WPCaseStudy[]; totalPages: number; total: number }> {
  const { lang = 'es', sector, page = 1, perPage = 9 } = options;
  
  const { data, totalPages, total } = await wpFetchWithPagination<WPCaseStudy[]>('/case-studies', {
    lang,
    sector,
    page,
    per_page: perPage,
    _embed: 1,
  });

  return { caseStudies: data, totalPages, total };
}

export async function getCaseStudy(slug: string, lang: SupportedLang = 'es'): Promise<WPCaseStudy | null> {
  const caseStudies = await wpFetch<WPCaseStudy[]>('/case-studies', {
    slug,
    lang,
    _embed: 1,
  });

  return caseStudies[0] || null;
}

// FAQs
export async function getFaqs(lang: SupportedLang = 'es'): Promise<WPFaq[]> {
  return wpFetch<WPFaq[]>('/faqs', {
    lang,
    per_page: 100,
  });
}

// Group FAQs by sector
export async function getFaqsGroupedBySector(lang: SupportedLang = 'es'): Promise<Map<string, WPFaq[]>> {
  const faqs = await getFaqs(lang);
  const grouped = new Map<string, WPFaq[]>();

  faqs.forEach((faq) => {
    const sector = faq.acf?.sector || 'General';
    if (!grouped.has(sector)) {
      grouped.set(sector, []);
    }
    grouped.get(sector)!.push(faq);
  });

  return grouped;
}

// Helper to get featured image URL
export function getFeaturedImageUrl(post: WPPost | WPCaseStudy, size: 'medium' | 'large' | 'full' = 'large'): string | null {
  const media = post._embedded?.['wp:featuredmedia']?.[0];
  if (!media) return null;
  
  if ('media_details' in media && media.media_details?.sizes) {
    return media.media_details.sizes[size]?.source_url || media.source_url;
  }
  
  return media.source_url;
}

// Helper to strip HTML from excerpt
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim();
}

// Helper to format date
export function formatDate(dateString: string, locale: string = 'es-ES'): string {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// ============================================
// SERVICES
// ============================================

export async function getServices(options: {
  lang?: SupportedLang;
  perPage?: number;
} = {}): Promise<WPService[]> {
  const { lang = 'es', perPage = 100 } = options;
  
  return wpFetch<WPService[]>('/services', {
    lang,
    per_page: perPage,
    orderby: 'menu_order',
    order: 'asc',
    _embed: 1,
  });
}

export async function getService(slug: string, lang: SupportedLang = 'es'): Promise<WPService | null> {
  const services = await wpFetch<WPService[]>('/services', {
    slug,
    lang,
    _embed: 1,
  });

  return services[0] || null;
}

// ============================================
// SECTOR PAGES
// ============================================

export async function getSectorPages(options: {
  lang?: SupportedLang;
  perPage?: number;
} = {}): Promise<WPSectorPage[]> {
  const { lang = 'es', perPage = 100 } = options;
  
  return wpFetch<WPSectorPage[]>('/sector-pages', {
    lang,
    per_page: perPage,
    orderby: 'menu_order',
    order: 'asc',
    _embed: 1,
  });
}

export async function getSectorPage(slug: string, lang: SupportedLang = 'es'): Promise<WPSectorPage | null> {
  const sectorPages = await wpFetch<WPSectorPage[]>('/sector-pages', {
    slug,
    lang,
    _embed: 1,
  });

  return sectorPages[0] || null;
}

// ============================================
// WORDPRESS PAGES (for precios, nosotros, etc.)
// ============================================

export async function getPage(slug: string, lang: SupportedLang = 'es'): Promise<WPPage | null> {
  const pages = await wpFetch<WPPage[]>('/pages', {
    slug,
    lang,
    _embed: 1,
  });

  return pages[0] || null;
}

export async function getPages(options: {
  lang?: SupportedLang;
  parent?: number;
  perPage?: number;
} = {}): Promise<WPPage[]> {
  const { lang = 'es', parent, perPage = 100 } = options;
  
  return wpFetch<WPPage[]>('/pages', {
    lang,
    parent,
    per_page: perPage,
    _embed: 1,
  });
}

// ============================================
// CONTENT TYPES TAXONOMY (for blog filtering)
// ============================================

export async function getContentTypes(lang: SupportedLang = 'es'): Promise<WPContentType[]> {
  return wpFetch<WPContentType[]>('/content-types', {
    lang,
    per_page: 100,
    hide_empty: 1,
  });
}

// Get posts filtered by content type
export async function getPostsByContentType(options: {
  contentType?: string; // slug: guia, comparativa, pregunta-seo
  lang?: SupportedLang;
  page?: number;
  perPage?: number;
  search?: string;
} = {}): Promise<{ posts: WPPost[]; totalPages: number; total: number }> {
  const { contentType, lang = 'es', page = 1, perPage = 9, search } = options;
  
  // First get the content type ID if slug provided
  let contentTypeId: number | undefined;
  if (contentType) {
    const contentTypes = await getContentTypes(lang);
    const found = contentTypes.find(ct => ct.slug === contentType);
    contentTypeId = found?.id;
  }
  
  const { data, totalPages, total } = await wpFetchWithPagination<WPPost[]>('/posts', {
    lang,
    'content-types': contentTypeId,
    page,
    per_page: perPage,
    search,
    _embed: 1,
  });

  return { posts: data, totalPages, total };
}

// Get SEO question posts (pregunta-seo content type)
export async function getSeoQuestionPosts(options: {
  lang?: SupportedLang;
  page?: number;
  perPage?: number;
} = {}): Promise<{ posts: WPPost[]; totalPages: number; total: number }> {
  return getPostsByContentType({
    ...options,
    contentType: 'pregunta-seo',
  });
}

// Get a single SEO question post by slug
export async function getSeoQuestionPost(slug: string, lang: SupportedLang = 'es'): Promise<WPPost | null> {
  // Get posts with pregunta-seo content type and matching slug
  const { posts } = await getPostsByContentType({
    contentType: 'pregunta-seo',
    lang,
    perPage: 100, // Get all to find by slug
  });
  
  return posts.find(p => p.slug === slug) || null;
}

// Get all SEO question slugs (for generateStaticParams)
export async function getAllSeoQuestionSlugs(lang: SupportedLang = 'es'): Promise<string[]> {
  const { posts } = await getSeoQuestionPosts({ lang, perPage: 100 });
  return posts.map(p => p.slug);
}

// ============================================
// HELPER FOR FEATURED IMAGES (extended)
// ============================================

export function getServiceFeaturedImageUrl(service: WPService): string | null {
  const media = service._embedded?.['wp:featuredmedia']?.[0];
  return media?.source_url || null;
}

export function getSectorPageFeaturedImageUrl(sectorPage: WPSectorPage): string | null {
  const media = sectorPage._embedded?.['wp:featuredmedia']?.[0];
  return media?.source_url || null;
}

export function getPageFeaturedImageUrl(page: WPPage): string | null {
  const media = page._embedded?.['wp:featuredmedia']?.[0];
  return media?.source_url || null;
}
