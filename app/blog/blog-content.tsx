"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { Calendar, ArrowRight, ChevronLeft, ChevronRight, Search, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import type { WPPost, WPCategory, SupportedLang } from "@/lib/wordpress"
import { formatDate, stripHtml, getFeaturedImageUrl } from "@/lib/wordpress"

interface BlogContentProps {
  initialCategories: WPCategory[]
  searchParams: { [key: string]: string | string[] | undefined }
}

const languages: { code: SupportedLang; label: string }[] = [
  { code: "es", label: "Espanol" },
  { code: "pt-pt", label: "Portugues" },
  { code: "en", label: "English" },
]

export function BlogContent({ initialCategories, searchParams }: BlogContentProps) {
  const router = useRouter()
  const urlSearchParams = useSearchParams()

  const initialLang = (searchParams.lang as SupportedLang) || "es"
  const initialCategory = searchParams.category ? parseInt(searchParams.category as string, 10) : undefined
  const initialPage = searchParams.page ? parseInt(searchParams.page as string, 10) : 1
  const initialSearch = (searchParams.search as string) || ""

  const [posts, setPosts] = useState<WPPost[]>([])
  const [categories, setCategories] = useState<WPCategory[]>(initialCategories)
  const [loading, setLoading] = useState(true)
  const [totalPages, setTotalPages] = useState(1)
  const [currentPage, setCurrentPage] = useState(initialPage)
  const [selectedLang, setSelectedLang] = useState<SupportedLang>(initialLang)
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(initialCategory)
  const [searchQuery, setSearchQuery] = useState(initialSearch)
  const [debouncedSearch, setDebouncedSearch] = useState(initialSearch)

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery)
    }, 500)
    return () => clearTimeout(timer)
  }, [searchQuery])

  // Fetch posts
  const fetchPosts = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      params.append("lang", selectedLang)
      params.append("page", String(currentPage))
      params.append("per_page", "9")
      params.append("_embed", "1")
      if (selectedCategory) params.append("categories", String(selectedCategory))
      if (debouncedSearch) params.append("search", debouncedSearch)

      const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || "https://cms.staffdigital.ai/wp-json/wp/v2"
      const response = await fetch(`${apiUrl}/posts?${params.toString()}`)
      
      if (response.ok) {
        const data = await response.json()
        setPosts(data)
        setTotalPages(parseInt(response.headers.get("X-WP-TotalPages") || "1", 10))
      }
    } catch (error) {
      console.error("Error fetching posts:", error)
    } finally {
      setLoading(false)
    }
  }, [selectedLang, selectedCategory, currentPage, debouncedSearch])

  // Fetch categories when language changes
  const fetchCategories = useCallback(async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || "https://cms.staffdigital.ai/wp-json/wp/v2"
      const response = await fetch(`${apiUrl}/categories?lang=${selectedLang}&per_page=100&hide_empty=1`)
      if (response.ok) {
        const data = await response.json()
        setCategories(data)
      }
    } catch (error) {
      console.error("Error fetching categories:", error)
    }
  }, [selectedLang])

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  // Update URL params
  useEffect(() => {
    const params = new URLSearchParams()
    if (selectedLang !== "es") params.set("lang", selectedLang)
    if (selectedCategory) params.set("category", String(selectedCategory))
    if (currentPage > 1) params.set("page", String(currentPage))
    if (debouncedSearch) params.set("search", debouncedSearch)

    const newUrl = params.toString() ? `/blog?${params.toString()}` : "/blog"
    router.replace(newUrl, { scroll: false })
  }, [selectedLang, selectedCategory, currentPage, debouncedSearch, router])

  const handleCategoryChange = (categoryId: number | undefined) => {
    setSelectedCategory(categoryId)
    setCurrentPage(1)
  }

  const handleLangChange = (lang: SupportedLang) => {
    setSelectedLang(lang)
    setCurrentPage(1)
    setSelectedCategory(undefined)
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
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => handleCategoryChange(category.id)}
              className="rounded-full"
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Language Selector */}
        <div className="flex items-center gap-2">
          <Globe className="h-4 w-4 text-muted-foreground" />
          <div className="flex gap-1">
            {languages.map((lang) => (
              <Button
                key={lang.code}
                variant={selectedLang === lang.code ? "default" : "ghost"}
                size="sm"
                onClick={() => handleLangChange(lang.code)}
                className="rounded-full px-3"
              >
                {lang.code.toUpperCase()}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="rounded-2xl border border-border bg-card animate-pulse h-[400px]" />
          ))}
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-muted-foreground text-lg">No se encontraron articulos.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => {
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
      {totalPages > 1 && (
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
