"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ArrowRight, ChevronLeft, ChevronRight, Building2, TrendingUp, Quote, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { WPCaseStudy, WPSector, SupportedLang } from "@/lib/wordpress"
import { getFeaturedImageUrl, stripHtml } from "@/lib/wordpress"

interface CasesContentProps {
  initialSectors: WPSector[]
  searchParams: { [key: string]: string | string[] | undefined }
}

const languages: { code: SupportedLang; label: string }[] = [
  { code: "es", label: "Espanol" },
  { code: "pt-pt", label: "Portugues" },
  { code: "en", label: "English" },
]

export function CasesContent({ initialSectors, searchParams }: CasesContentProps) {
  const router = useRouter()

  const initialLang = (searchParams.lang as SupportedLang) || "es"
  const initialSector = searchParams.sector ? parseInt(searchParams.sector as string, 10) : undefined
  const initialPage = searchParams.page ? parseInt(searchParams.page as string, 10) : 1

  const [cases, setCases] = useState<WPCaseStudy[]>([])
  const [loading, setLoading] = useState(true)
  const [totalPages, setTotalPages] = useState(1)
  const [currentPage, setCurrentPage] = useState(initialPage)
  const [selectedLang, setSelectedLang] = useState<SupportedLang>(initialLang)
  const [selectedSector, setSelectedSector] = useState<number | undefined>(initialSector)

  // Fetch cases
  const fetchCases = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      params.append("lang", selectedLang)
      params.append("page", String(currentPage))
      params.append("per_page", "6")
      params.append("_embed", "1")
      if (selectedSector) params.append("sector", String(selectedSector))

      const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || "https://cms.staffdigital.ai/wp-json/wp/v2"
      const response = await fetch(`${apiUrl}/case-studies?${params.toString()}`)
      
      if (response.ok) {
        const data = await response.json()
        setCases(data)
        setTotalPages(parseInt(response.headers.get("X-WP-TotalPages") || "1", 10))
      }
    } catch (error) {
      console.error("Error fetching cases:", error)
    } finally {
      setLoading(false)
    }
  }, [selectedLang, selectedSector, currentPage])

  useEffect(() => {
    fetchCases()
  }, [fetchCases])

  // Update URL params
  useEffect(() => {
    const params = new URLSearchParams()
    if (selectedLang !== "es") params.set("lang", selectedLang)
    if (selectedSector) params.set("sector", String(selectedSector))
    if (currentPage > 1) params.set("page", String(currentPage))

    const newUrl = params.toString() ? `/casos?${params.toString()}` : "/casos"
    router.replace(newUrl, { scroll: false })
  }, [selectedLang, selectedSector, currentPage, router])

  const handleSectorChange = (sectorId: number | undefined) => {
    setSelectedSector(sectorId)
    setCurrentPage(1)
  }

  const handleLangChange = (lang: SupportedLang) => {
    setSelectedLang(lang)
    setCurrentPage(1)
  }

  return (
    <div className="space-y-8">
      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between p-4 rounded-2xl border border-border bg-card/50 backdrop-blur-sm">
        {/* Sectors */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant={!selectedSector ? "default" : "outline"}
            size="sm"
            onClick={() => handleSectorChange(undefined)}
            className="rounded-full"
          >
            Todos
          </Button>
          {initialSectors.map((sector) => (
            <Button
              key={sector.id}
              variant={selectedSector === sector.id ? "default" : "outline"}
              size="sm"
              onClick={() => handleSectorChange(sector.id)}
              className="rounded-full"
            >
              {sector.name}
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

      {/* Cases Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="rounded-2xl border border-border bg-card animate-pulse h-[300px]" />
          ))}
        </div>
      ) : cases.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-muted-foreground text-lg">No se encontraron casos de estudio.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cases.map((caseStudy) => {
            const imageUrl = getFeaturedImageUrl(caseStudy, "large")

            return (
              <Link
                key={caseStudy.id}
                href={`/casos/${caseStudy.slug}`}
                className="group"
              >
                <article className="h-full rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/30 hover:bg-card/80 transition-all duration-300">
                  <div className="flex flex-col lg:flex-row h-full">
                    {/* Image */}
                    <div className="relative w-full lg:w-2/5 h-48 lg:h-auto bg-muted overflow-hidden flex-shrink-0">
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={caseStudy.title.rendered}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-orange-500/20 to-amber-500/10 flex items-center justify-center">
                          <Building2 className="h-12 w-12 text-orange-400/40" />
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-6 flex flex-col justify-between">
                      <div className="space-y-4">
                        {/* Sector & Client */}
                        <div className="flex flex-wrap items-center gap-2">
                          {caseStudy.acf?.sector && (
                            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                              {caseStudy.acf.sector}
                            </Badge>
                          )}
                          {caseStudy.acf?.cliente && (
                            <span className="text-sm text-muted-foreground flex items-center gap-1">
                              <Building2 className="h-3 w-3" />
                              {caseStudy.acf.cliente}
                            </span>
                          )}
                        </div>

                        {/* Title */}
                        <h2
                          className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2"
                          dangerouslySetInnerHTML={{ __html: caseStudy.title.rendered }}
                        />

                        {/* Result highlight */}
                        {caseStudy.acf?.resultado && (
                          <div className="flex items-start gap-2 p-3 rounded-lg bg-gradient-to-r from-green-500/10 to-emerald-500/5 border border-green-500/20">
                            <TrendingUp className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-green-300 font-medium line-clamp-2">
                              {caseStudy.acf.resultado}
                            </p>
                          </div>
                        )}

                        {/* Testimonial preview */}
                        {caseStudy.acf?.testimonio && (
                          <div className="flex items-start gap-2">
                            <Quote className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-1" />
                            <p className="text-sm text-muted-foreground italic line-clamp-2">
                              {caseStudy.acf.testimonio}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Read more */}
                      <div className="flex items-center gap-2 text-primary text-sm font-medium pt-4 mt-auto">
                        Ver caso completo
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
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
