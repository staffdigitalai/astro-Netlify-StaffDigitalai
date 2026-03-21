"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { Calendar, ArrowRight, ChevronLeft, ChevronRight, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import type { WPPost, WPCategory } from "@/lib/wordpress"
import { formatDate, stripHtml, getFeaturedImageUrl } from "@/lib/wordpress"

interface BlogContentProps {
  initialCategories: WPCategory[]
}

// Sample blog posts for when WordPress is not configured
const samplePosts: WPPost[] = [
  {
    id: 1,
    slug: "como-implementar-ia-en-tu-empresa",
    title: { rendered: "Como Implementar IA en tu Empresa: Guia Completa 2024" },
    content: { rendered: "<p>Guia detallada sobre implementacion de inteligencia artificial.</p>" },
    excerpt: { rendered: "Descubre los pasos esenciales para integrar soluciones de IA en tu negocio y maximizar el retorno de inversion." },
    date: new Date().toISOString(),
    _embedded: { "wp:term": [[{ name: "Tecnologia" }]] }
  },
  {
    id: 2,
    slug: "automatizacion-atencion-cliente",
    title: { rendered: "5 Beneficios de Automatizar tu Atencion al Cliente" },
    content: { rendered: "<p>Los beneficios de la automatizacion en servicio al cliente.</p>" },
    excerpt: { rendered: "La automatizacion del servicio al cliente puede transformar completamente la experiencia de tus usuarios." },
    date: new Date(Date.now() - 86400000).toISOString(),
    _embedded: { "wp:term": [[{ name: "Automatizacion" }]] }
  },
  {
    id: 3,
    slug: "chatbots-inteligentes-2024",
    title: { rendered: "Chatbots Inteligentes: El Futuro de la Comunicacion Empresarial" },
    content: { rendered: "<p>Como los chatbots estan revolucionando la comunicacion.</p>" },
    excerpt: { rendered: "Los chatbots con IA estan redefiniendo como las empresas se comunican con sus clientes." },
    date: new Date(Date.now() - 172800000).toISOString(),
    _embedded: { "wp:term": [[{ name: "Chatbots" }]] }
  },
  {
    id: 4,
    slug: "roi-automatizacion-procesos",
    title: { rendered: "Calculando el ROI de la Automatizacion de Procesos" },
    content: { rendered: "<p>Metodologia para calcular el retorno de inversion.</p>" },
    excerpt: { rendered: "Aprende a medir el impacto financiero real de las soluciones de automatizacion en tu empresa." },
    date: new Date(Date.now() - 259200000).toISOString(),
    _embedded: { "wp:term": [[{ name: "Negocios" }]] }
  },
  {
    id: 5,
    slug: "tendencias-ia-2024",
    title: { rendered: "Las 10 Tendencias de IA que Dominaran 2024" },
    content: { rendered: "<p>Principales tendencias en inteligencia artificial.</p>" },
    excerpt: { rendered: "Mantente actualizado con las ultimas innovaciones en inteligencia artificial y machine learning." },
    date: new Date(Date.now() - 345600000).toISOString(),
    _embedded: { "wp:term": [[{ name: "Tendencias" }]] }
  },
  {
    id: 6,
    slug: "integracion-crm-ia",
    title: { rendered: "Integrando IA con tu CRM: Mejores Practicas" },
    content: { rendered: "<p>Como integrar inteligencia artificial con sistemas CRM.</p>" },
    excerpt: { rendered: "Descubre como potenciar tu CRM existente con capacidades de inteligencia artificial." },
    date: new Date(Date.now() - 432000000).toISOString(),
    _embedded: { "wp:term": [[{ name: "CRM" }]] }
  }
]

const sampleCategories: WPCategory[] = [
  { id: 1, name: "Tecnologia", slug: "tecnologia" },
  { id: 2, name: "Automatizacion", slug: "automatizacion" },
  { id: 3, name: "Negocios", slug: "negocios" },
  { id: 4, name: "Tendencias", slug: "tendencias" },
]

export function BlogContent({ initialCategories }: BlogContentProps) {
  const [posts, setPosts] = useState<WPPost[]>([])
  const [loading, setLoading] = useState(true)
  const [totalPages, setTotalPages] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined)
  const [searchQuery, setSearchQuery] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")
  const [usingSampleData, setUsingSampleData] = useState(false)

  const categories = initialCategories.length > 0 ? initialCategories : sampleCategories

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery)
    }, 500)
    return () => clearTimeout(timer)
  }, [searchQuery])

  // Fetch posts from WordPress or use sample data
  const fetchPosts = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      params.append("page", String(currentPage))
      params.append("per_page", "9")
      params.append("_embed", "1")
      if (debouncedSearch) params.append("search", debouncedSearch)

      const apiUrl = "https://cms.staffdigital.ai/wp-json/wp/v2"
      const url = `${apiUrl}/posts?${params.toString()}`
      
      const response = await fetch(url)
      
      if (response.ok) {
        const data = await response.json()
        if (data.length > 0) {
          setPosts(data)
          setTotalPages(parseInt(response.headers.get("X-WP-TotalPages") || "1", 10))
          setUsingSampleData(false)
        } else {
          setPosts(samplePosts)
          setUsingSampleData(true)
        }
      } else {
        setPosts(samplePosts)
        setUsingSampleData(true)
      }
    } catch (error) {
      console.error("Error fetching posts:", error)
      setPosts(samplePosts)
      setUsingSampleData(true)
    } finally {
      setLoading(false)
    }
  }, [currentPage, debouncedSearch])

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  // Filter posts (client-side for sample data)
  const filteredPosts = selectedCategory
    ? posts.filter((p) => {
        const categoryNames = p._embedded?.["wp:term"]?.[0]?.map((t) => t.name.toLowerCase()) || []
        return categoryNames.includes(selectedCategory.toLowerCase())
      })
    : posts

  const handleCategoryChange = (categorySlug: string | undefined) => {
    setSelectedCategory(categorySlug)
  }

  return (
    <div className="space-y-8">
      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between p-4 rounded-2xl border border-border bg-card/50 backdrop-blur-sm">
        {/* Search */}
        <div className="relative w-full lg:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Buscar articulos..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setCurrentPage(1)
            }}
            className="pl-10 bg-background/50 border-border"
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant={!selectedCategory ? "default" : "outline"}
            size="sm"
            onClick={() => handleCategoryChange(undefined)}
            className="rounded-full"
          >
            Todos
          </Button>
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.name ? "default" : "outline"}
              size="sm"
              onClick={() => handleCategoryChange(category.name)}
              className="rounded-full"
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Posts Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="rounded-2xl border border-border bg-card animate-pulse h-[400px]" />
          ))}
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-muted-foreground text-lg">No se encontraron articulos.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => {
            const imageUrl = getFeaturedImageUrl(post, "large")
            const categoryNames = post._embedded?.["wp:term"]?.[0]?.map((t) => t.name) || []

            return (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group"
              >
                <article className="h-full rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/30 hover:bg-card/80 transition-all duration-300">
                  {/* Image */}
                  <div className="relative h-48 bg-muted overflow-hidden">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={post.title.rendered}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                        <span className="text-muted-foreground text-4xl font-bold opacity-20">SD</span>
                      </div>
                    )}
                    {/* Category badges */}
                    {categoryNames.length > 0 && (
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                        {categoryNames.slice(0, 2).map((name) => (
                          <Badge key={name} variant="secondary" className="bg-background/80 backdrop-blur-sm text-xs">
                            {name}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5 space-y-3">
                    {/* Date */}
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <Calendar className="h-4 w-4" />
                      <time dateTime={post.date}>{formatDate(post.date)}</time>
                    </div>

                    {/* Title */}
                    <h2
                      className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2"
                      dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                    />

                    {/* Excerpt */}
                    <p className="text-muted-foreground text-sm line-clamp-3">
                      {stripHtml(post.excerpt.rendered)}
                    </p>

                    {/* Read more */}
                    <div className="flex items-center gap-2 text-primary text-sm font-medium pt-2">
                      Leer mas
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </article>
              </Link>
            )
          })}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && !usingSampleData && (
        <div className="flex items-center justify-center gap-2 pt-8">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="rounded-full"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="flex items-center gap-1">
            {[...Array(Math.min(5, totalPages))].map((_, i) => {
              let pageNum: number
              if (totalPages <= 5) {
                pageNum = i + 1
              } else if (currentPage <= 3) {
                pageNum = i + 1
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i
              } else {
                pageNum = currentPage - 2 + i
              }

              return (
                <Button
                  key={pageNum}
                  variant={currentPage === pageNum ? "default" : "outline"}
                  size="icon"
                  onClick={() => setCurrentPage(pageNum)}
                  className="rounded-full w-10 h-10"
                >
                  {pageNum}
                </Button>
              )
            })}
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="rounded-full"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}
