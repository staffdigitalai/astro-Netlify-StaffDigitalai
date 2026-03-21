"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Building2, TrendingUp, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { WPCaseStudy, WPSector, Language } from "@/lib/wordpress"
import { stripHtml, getFeaturedImageUrl } from "@/lib/wordpress"

export function CasesContent() {
  const [cases, setCases] = useState<WPCaseStudy[]>([])
  const [sectors, setSectors] = useState<WPSector[]>([])
  const [selectedSector, setSelectedSector] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCases = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    
    try {
      const params = new URLSearchParams({
        lang: "es",
        per_page: "20",
        _embed: "true"
      })

      if (selectedSector) {
        params.append("sector", selectedSector.toString())
      }

      const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'https://cms.staffdigital.ai/wp-json/wp/v2'
      const response = await fetch(`${apiUrl}/case-studies?${params}`)
      
      if (!response.ok) {
        throw new Error("Error al cargar los casos de estudio")
      }

      const data: WPCaseStudy[] = await response.json()
      setCases(data)
    } catch (err) {
      setError("No se pudieron cargar los casos de estudio. Intenta de nuevo mas tarde.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }, [selectedSector])

  const fetchSectors = useCallback(async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'https://cms.staffdigital.ai/wp-json/wp/v2'
      const response = await fetch(`${apiUrl}/sectors?per_page=20`)
      
      if (response.ok) {
        const data: WPSector[] = await response.json()
        setSectors(data)
      }
    } catch (err) {
      console.error("Error fetching sectors:", err)
    }
  }, [])

  useEffect(() => {
    fetchCases()
  }, [fetchCases])

  useEffect(() => {
    fetchSectors()
  }, [fetchSectors])

  return (
    <section className="pt-32 pb-20 px-4 relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse" />
            Casos de Exito
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-balance">
            Historias de{" "}
            <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-orange-400 bg-clip-text text-transparent">
              Transformacion
            </span>
          </h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Descubre como empresas de diferentes sectores han transformado sus operaciones con nuestras soluciones de IA.
          </p>
        </div>

        {/* Sector Filter */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          <button
            onClick={() => setSelectedSector(null)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 border ${
              selectedSector === null
                ? "bg-primary text-primary-foreground border-primary"
                : "text-white/60 border-white/10 hover:text-white hover:border-white/20 bg-white/5"
            }`}
          >
            Todos los Sectores
          </button>
          {sectors.map((sector) => (
            <button
              key={sector.id}
              onClick={() => setSelectedSector(sector.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 border ${
                selectedSector === sector.id
                  ? "bg-primary text-primary-foreground border-primary"
                  : "text-white/60 border-white/10 hover:text-white hover:border-white/20 bg-white/5"
              }`}
            >
              {sector.name}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white/5 rounded-2xl overflow-hidden animate-pulse border border-white/10">
                <div className="h-64 bg-white/10" />
                <div className="p-8 space-y-4">
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
            <Button onClick={fetchCases} variant="outline" className="text-white border-white/20">
              Intentar de nuevo
            </Button>
          </div>
        )}

        {/* Cases Grid */}
        {!isLoading && !error && cases.length > 0 && (
          <div className="grid md:grid-cols-2 gap-8">
            {cases.map((caseStudy) => (
              <CaseCard key={caseStudy.id} caseStudy={caseStudy} sectors={sectors} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && cases.length === 0 && (
          <div className="text-center py-16">
            <p className="text-white/60">No se encontraron casos de estudio para el sector seleccionado.</p>
          </div>
        )}
      </div>
    </section>
  )
}

function CaseCard({ caseStudy, sectors }: { caseStudy: WPCaseStudy; sectors: WPSector[] }) {
  const imageUrl = getFeaturedImageUrl(caseStudy)
  
  // Get sector name from ACF field
  const sectorId = typeof caseStudy.acf?.sector === 'string' 
    ? parseInt(caseStudy.acf.sector, 10) 
    : caseStudy.acf?.sector
  const sectorName = sectors.find(s => s.id === sectorId)?.name || caseStudy.acf?.sector || ''

  return (
    <Link
      href={`/casos/${caseStudy.slug}`}
      className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 hover:border-white/20 transition-all duration-300"
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden bg-gradient-to-br from-primary/10 to-orange-500/10">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={stripHtml(caseStudy.title.rendered)}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-orange-500/20 flex items-center justify-center border border-white/10">
              <Building2 className="w-10 h-10 text-white/40" />
            </div>
          </div>
        )}
        
        {/* Overlay with result */}
        {caseStudy.acf?.resultado && (
          <div className="absolute bottom-4 right-4 px-4 py-2 bg-primary/90 backdrop-blur-sm rounded-full flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-primary-foreground" />
            <span className="text-sm font-bold text-primary-foreground">{caseStudy.acf.resultado}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-8">
        {/* Sector & Client */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          {sectorName && (
            <span className="px-3 py-1 text-xs font-medium bg-white/10 text-white/80 rounded-full border border-white/10">
              {sectorName}
            </span>
          )}
          {caseStudy.acf?.cliente && (
            <span className="text-white/50 text-sm">
              Cliente: <span className="text-white/80">{caseStudy.acf.cliente}</span>
            </span>
          )}
        </div>

        {/* Title */}
        <h3
          className="text-xl font-semibold text-white mb-3 line-clamp-2 group-hover:text-primary transition-colors"
          dangerouslySetInnerHTML={{ __html: caseStudy.title.rendered }}
        />

        {/* Excerpt */}
        {caseStudy.excerpt?.rendered && (
          <p className="text-white/50 text-sm line-clamp-2 mb-4">
            {stripHtml(caseStudy.excerpt.rendered)}
          </p>
        )}

        {/* Testimonial preview */}
        {caseStudy.acf?.testimonio && (
          <div className="bg-white/5 rounded-xl p-4 border border-white/5 mb-4">
            <Quote className="w-4 h-4 text-primary/50 mb-2" />
            <p className="text-white/60 text-sm italic line-clamp-2">
              {caseStudy.acf.testimonio}
            </p>
          </div>
        )}

        {/* Read More */}
        <div className="flex items-center gap-2 text-primary text-sm font-medium group-hover:gap-3 transition-all">
          Ver caso completo
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </Link>
  )
}
