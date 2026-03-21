"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { Calendar, ArrowRight, Search, Filter, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { WPPost, WPCategory, Language, PaginatedResponse } from "@/lib/wordpress"
import { stripHtml, formatDate, getFeaturedImageUrl } from "@/lib/wordpress"

const languages: { code: Language; label: string }[] = [
  { code: "es", label: "Espanol" },
  { code: "pt-pt", label: "Portugues" },
  { code: "en", label: "English" },
]

export function BlogContent() {
  const [posts, setPosts] = useState<WPPost[]>([])
  const [categories, setCategories] = useState<WPCategory[]>([])
  const [selectedLang, setSelectedLang] = useState<Language>("es")
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPosts = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    
    try {
      const params = new URLSearchParams({
        lang: selectedLang,
        page: currentPage.toString(),
        per_page: "9",
        _embed: "true",
        orderby: "date",
        order: "desc"
      })

      if (selectedCategory) {
        params.append("categories", selectedCategory.toString())
      }
      if (searchQuery) {
        params.append("search", searchQuery)
      }

      const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'https://cms.staffdigital.ai/wp-json/wp/v2'
      const response = await fetch(`${apiUrl}/posts?${params}`)
      
      if (!response.ok) {
        throw new Error("Error al cargar los posts")
      }

      const data: WPPost[] = await response.json()
      const total = parseInt(response.headers.get("X-WP-Total") || "0", 10)
      const pages = parseInt(response.headers.get("X-WP-TotalPages") || "1", 10)

      setPosts(data)
      setTotalPages(pages)
    } catch (err) {
      setError("No se pudieron cargar los articulos. Intenta de nuevo mas tarde.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }, [selectedLang, selectedCategory, searchQuery, currentPage])

  const fetchCategories = useCallback(async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'https://cms.staffdigital.ai/wp-json/wp/v2'
      const response = await fetch(`${apiUrl}/categories?lang=${selectedLang}&per_page=20&hide_empty=true`)
      
      if (response.ok) {
        const data: WPCategory[] = await response.json()
        setCategories(data)
      }
    } catch (err) {
      console.error("Error fetching categories:", err)
    }
  }, [selectedLang])

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [selectedLang, selectedCategory, searchQuery])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentPage(1)
    fetchPosts()
  }

  return (
    <section className="pt-32 pb-20 px-4 relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse" />
            Blog
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-balance">
            Articulos y{" "}
            <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-orange-400 bg-clip-text text-transparent">
              Novedades
            </span>
          </h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Descubre las ultimas tendencias en automatizacion con IA, chatbots y transformacion digital.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-12 space-y-6">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <Input
                type="text"
                placeholder="Buscar articulos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-3 bg-white/5 border-white/10 text-white placeholder:text-white/40 rounded-full focus:border-primary/50 focus:ring-primary/20"
              />
            </div>
          </form>

          {/* Language & Category Filters */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {/* Language Toggle */}
            <div className="flex items-center gap-2 p-1 bg-white/5 rounded-full border border-white/10">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setSelectedLang(lang.code)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedLang === lang.code
                      ? "bg-white text-black"
                      : "text-white/60 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2 flex-wrap justify-center">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                  selectedCategory === null
                    ? "bg-primary text-primary-foreground border-primary"
                    : "text-white/60 border-white/10 hover:text-white hover:border-white/20"
                }`}
              >
                Todos
              </button>
              {categories.slice(0, 5).map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                    selectedCategory === category.id
                      ? "bg-primary text-primary-foreground border-primary"
                      : "text-white/60 border-white/10 hover:text-white hover:border-white/20"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white/5 rounded-2xl overflow-hidden animate-pulse border border-white/10">
                <div className="h-48 bg-white/10" />
                <div className="p-6 space-y-4">
                  <div className="h-4 w-24 bg-white/10 rounded" />
                  <div className="h-6 w-full bg-white/10 rounded" />
                  <div className="h-4 w-3/4 bg-white/5 rounded" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="text-center py-16">
            <p className="text-white/60 mb-4">{error}</p>
            <Button onClick={fetchPosts} variant="outline" className="text-white border-white/20">
              Intentar de nuevo
            </Button>
          </div>
        )}

        {/* Posts Grid */}
        {!isLoading && !error && posts.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} lang={selectedLang} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && posts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-white/60">No se encontraron articulos con los filtros seleccionados.</p>
          </div>
        )}

        {/* Pagination */}
        {!isLoading && totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-12">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="text-white border-white/20 disabled:opacity-50"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            
            <div className="flex items-center gap-2">
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
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
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-10 h-10 rounded-full text-sm font-medium transition-all duration-200 ${
                      currentPage === pageNum
                        ? "bg-white text-black"
                        : "text-white/60 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {pageNum}
                  </button>
                )
              })}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="text-white border-white/20 disabled:opacity-50"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}

function PostCard({ post, lang }: { post: WPPost; lang: Language }) {
  const imageUrl = getFeaturedImageUrl(post)
  const categoryName = post._embedded?.["wp:term"]?.[0]?.[0]?.name

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 hover:border-white/20 transition-all duration-300"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-white/5">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={stripHtml(post.title.rendered)}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-orange-500/20 flex items-center justify-center">
              <span className="text-2xl font-bold text-white/40">
                {stripHtml(post.title.rendered).charAt(0)}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Meta */}
        <div className="flex items-center gap-3 mb-3">
          {categoryName && (
            <span className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full border border-primary/20">
              {categoryName}
            </span>
          )}
          <div className="flex items-center gap-1.5 text-white/40 text-sm">
            <Calendar className="w-3.5 h-3.5" />
            <span>{formatDate(post.date, lang)}</span>
          </div>
        </div>

        {/* Title */}
        <h3
          className="text-lg font-semibold text-white mb-2 line-clamp-2 group-hover:text-primary transition-colors"
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />

        {/* Excerpt */}
        <p className="text-white/50 text-sm line-clamp-2 mb-4">
          {stripHtml(post.excerpt.rendered)}
        </p>

        {/* Read More */}
        <div className="flex items-center gap-2 text-primary text-sm font-medium group-hover:gap-3 transition-all">
          Leer mas
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </Link>
  )
}
