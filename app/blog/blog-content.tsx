"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { Calendar, ArrowRight, ChevronLeft, ChevronRight, Search, BookOpen, Scale, HelpCircle, FileText, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import type { WPPost, WPCategory, WPContentType } from "@/lib/wordpress"
import { formatDate, stripHtml, getFeaturedImageUrl } from "@/lib/wordpress"

interface BlogContentProps {
  initialCategories: WPCategory[]
  initialContentTypes?: WPContentType[]
  initialPosts?: WPPost[]
  initialTotalPages?: number
}

// Content type display configuration
const contentTypeConfig: Record<string, { label: string; icon: React.ComponentType<{ className?: string }>; color: string }> = {
  guia: { label: "Guias", icon: BookOpen, color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
  comparativa: { label: "Comparativas", icon: Scale, color: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
  "pregunta-seo": { label: "Preguntas SEO", icon: HelpCircle, color: "bg-green-500/20 text-green-400 border-green-500/30" },
  articulo: { label: "Artículos", icon: FileText, color: "bg-orange-500/20 text-orange-400 border-orange-500/30" },
  "caso-estudio": { label: "Casos de Estudio", icon: FileText, color: "bg-amber-500/20 text-amber-400 border-amber-500/30" },
  tutorial: { label: "Tutoriales", icon: BookOpen, color: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30" },
}

export function BlogContent({ initialCategories, initialContentTypes = [], initialPosts = [], initialTotalPages = 1 }: BlogContentProps) {
  const hasInitialData = initialPosts.length > 0
  const [posts, setPosts] = useState<WPPost[]>(initialPosts)
  const [loading, setLoading] = useState(!hasInitialData)
  const [error, setError] = useState<string | null>(null)
  const [totalPages, setTotalPages] = useState(initialTotalPages)
  const [currentPage, setCurrentPage] = useState(1)
  // Track whether user has interacted (changed filters/page) — skip initial fetch if we have SSR data
  const [userInteracted, setUserInteracted] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined)
  const [selectedContentType, setSelectedContentType] = useState<string | undefined>(undefined)
  const [searchQuery, setSearchQuery] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")

  const categories = initialCategories
  const contentTypes = initialContentTypes

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery)
    }, 500)
    return () => clearTimeout(timer)
  }, [searchQuery])

  // Fetch posts from WordPress
  const fetchPosts = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const params = new URLSearchParams()
      params.append("page", String(currentPage))
      params.append("per_page", "9")
      params.append("_embed", "1")
      if (debouncedSearch) params.append("search", debouncedSearch)

      // Add content type filter if selected
      if (selectedContentType) {
        const contentType = contentTypes.find(ct => ct.slug === selectedContentType)
        if (contentType) {
          params.append("content-types", String(contentType.id))
        }
      }

      const apiUrl = "https://cms.staffdigital.ai/wp-json/wp/v2"
      const url = `${apiUrl}/posts?${params.toString()}`

      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 15000)

      const response = await fetch(url, { signal: controller.signal })
      clearTimeout(timeoutId)

      if (response.ok) {
        const data = await response.json()
        if (Array.isArray(data)) {
          setPosts(data)
          setTotalPages(parseInt(response.headers.get("X-WP-TotalPages") || "1", 10))
          return
        }
      }
      setError("No se pudieron cargar los artículos.")
      setPosts([])
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") {
        setError("La conexion con el servidor tardo demasiado. Intenta de nuevo.")
      } else {
        setError("Error al conectar con el blog. Intenta de nuevomás tarde.")
      }
      setPosts([])
    } finally {
      setLoading(false)
    }
  }, [currentPage, debouncedSearch, selectedContentType, contentTypes])

  useEffect(() => {
    // Skip first fetch if we have SSR data and user hasn't interacted
    if (hasInitialData && !userInteracted) return
    fetchPosts()
  }, [fetchPosts, hasInitialData, userInteracted])

  // Filter posts by category (client-side)
  const filteredPosts = selectedCategory
    ? posts.filter((p) => {
        const categoryNames = p._embedded?.["wp:term"]?.[0]?.map((t) => t.name.toLowerCase()) || []
        return categoryNames.includes(selectedCategory.toLowerCase())
      })
    : posts

  const handleCategoryChange = (categorySlug: string | undefined) => {
    setSelectedCategory(categorySlug)
    setCurrentPage(1)
    setUserInteracted(true)
  }

  const handleContentTypeChange = (typeSlug: string | undefined) => {
    setSelectedContentType(typeSlug)
    setCurrentPage(1)
    setUserInteracted(true)
  }

  return (
    <div className="space-y-8">
      {/* Content Type Tabs */}
      {contentTypes.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2 p-4 rounded-2xl border border-border bg-card/50 backdrop-blur-sm">
          <Button
            variant={!selectedContentType ? "default" : "outline"}
            size="sm"
            onClick={() => handleContentTypeChange(undefined)}
            className="rounded-full gap-2"
          >
            <FileText className="h-4 w-4" />
            Todos
          </Button>
          {contentTypes.map((type) => {
            const config = contentTypeConfig[type.slug] || { label: type.name, icon: FileText, color: "" }
            const Icon = config.icon
            return (
              <Button
                key={type.id}
                variant={selectedContentType === type.slug ? "default" : "outline"}
                size="sm"
                onClick={() => handleContentTypeChange(type.slug)}
                className={`rounded-full gap-2 ${selectedContentType === type.slug ? "" : config.color}`}
              >
                <Icon className="h-4 w-4" />
                {config.label}
                {type.count > 0 && (
                  <span className="ml-1 text-xs opacity-60">({type.count})</span>
                )}
              </Button>
            )
          })}
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between p-4 rounded-2xl border border-border bg-card/50 backdrop-blur-sm">
        {/* Search */}
        <div className="relative w-full lg:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Buscar artículos..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setCurrentPage(1)
              setUserInteracted(true)
            }}
            className="pl-10 bg-background/50 border-border"
          />
        </div>

        {/* Categories */}
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <Button
              variant={!selectedCategory ? "default" : "outline"}
              size="sm"
              onClick={() => handleCategoryChange(undefined)}
              className="rounded-full"
            >
              Todas las categorias
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
        )}
      </div>

      {/* Error State */}
      {error && (
        <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
            <AlertCircle className="h-8 w-8 text-destructive" />
          </div>
          <p className="text-muted-foreground text-lg">{error}</p>
          <Button variant="outline" onClick={fetchPosts} className="rounded-full">
            Reintentar
          </Button>
        </div>
      )}

      {/* Posts Grid */}
      {!error && loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="rounded-2xl border border-border bg-card animate-pulse h-[400px]" />
          ))}
        </div>
      ) : !error && filteredPosts.length === 0 ? (
        <div className="text-center py-20 space-y-4">
          <p className="text-muted-foreground text-lg">No se encontraron artículos.</p>
          {(selectedContentType || selectedCategory || debouncedSearch) && (
            <Button
              variant="outline"
              onClick={() => {
                setSelectedContentType(undefined)
                setSelectedCategory(undefined)
                setSearchQuery("")
                setCurrentPage(1)
              }}
              className="rounded-full"
            >
              Limpiar filtros
            </Button>
          )}
        </div>
      ) : !error && (
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
                        alt={stripHtml(post.title.rendered)}
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
      {totalPages > 1 && !error && (
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
