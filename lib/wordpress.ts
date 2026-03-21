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

export interface WPCaseStudy {
  id: number;
  date: string;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  featured_media: number;
  acf: {
    cliente?: string;
    sector?: string;
    resultado?: string;
    testimonio?: string;
  };
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text: string;
    }>;
  };
}

export interface WPFaq {
  id: number;
  slug: string;
  acf: {
    pregunta?: string;
    respuesta?: string;
    sector?: string;
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

// Fetch wrapper with error handling
async function wpFetch<T>(endpoint: string, params: Record<string, string | number | undefined> = {}): Promise<T> {
  const queryString = buildQueryString(params);
  const url = `${WP_API_URL}${endpoint}${queryString ? `?${queryString}` : ''}`;
  
  const response = await fetch(url, {
    next: { revalidate: 300 }, // Cache for 5 minutes
  });

  if (!response.ok) {
    throw new Error(`WordPress API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

// Get total pages from response headers
async function wpFetchWithPagination<T>(
  endpoint: string, 
  params: Record<string, string | number | undefined> = {}
): Promise<{ data: T; totalPages: number; total: number }> {
  const queryString = buildQueryString(params);
  const url = `${WP_API_URL}${endpoint}${queryString ? `?${queryString}` : ''}`;
  
  const response = await fetch(url, {
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error(`WordPress API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  const totalPages = parseInt(response.headers.get('X-WP-TotalPages') || '1', 10);
  const total = parseInt(response.headers.get('X-WP-Total') || '0', 10);

  return { data, totalPages, total };
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
