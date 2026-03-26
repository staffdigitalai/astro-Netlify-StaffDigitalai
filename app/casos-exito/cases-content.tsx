"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ChevronLeft, ChevronRight, Building2, TrendingUp, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { WPCaseStudy, WPSector } from "@/lib/wordpress"
import { getFeaturedImageUrl } from "@/lib/wordpress"

interface CasesContentProps {
  initialSectors: WPSector[]
}

// Sample data for when WordPress is not configured
const sampleCases: WPCaseStudy[] = [
  {
    id: 1,
    slug: "automatización-retail",
    title: { rendered: "Automatización de Atencion al Cliente para Retail" },
    content: { rendered: "<p>Caso de estudio detallado sobre como implementamos automatización IA.</p>" },
    excerpt: { rendered: "Reduccion del 70% en tiempos de respuesta." },
    date: new Date().toISOString(),
    acf: {
      cliente: "RetailMax",
      sector: "Retail",
      resultado: "70% reduccion en tiempos de respuesta, 45% ahorro en costes operativos",
      testimonio: "La solución de StaffDigital transformo completamente nuestra atención al cliente."
    }
  },
  {
    id: 2,
    slug: "clinica-dental-automation",
    title: { rendered: "Gestion Inteligente de Citas para Clinica Dental" },
    content: { rendered: "<p>Implementacion de sistema de reservas automatizado.</p>" },
    excerpt: { rendered: "Aumento del 50% en eficiencia de agenda." },
    date: new Date().toISOString(),
    acf: {
      cliente: "DentalCare Plus",
      sector: "Salud",
      resultado: "50%más eficiencia en gestión de citas, 30% reducción de no-shows",
      testimonio: "Ahora nuestro equipo puede enfocarse en lo que realmente importa: los pacientes."
    }
  },
  {
    id: 3,
    slug: "logistica-predictiva",
    title: { rendered: "Optimizacion Logistica con IA Predictiva" },
    content: { rendered: "<p>Sistema de prediccion de demanda para cadena de suministro.</p>" },
    excerpt: { rendered: "35% mejora en precision de inventario." },
    date: new Date().toISOString(),
    acf: {
      cliente: "LogiTech Solutions",
      sector: "Logistica",
      resultado: "35% mejora en precision de inventario, 20% reducción de costes de almacen",
      testimonio: "La IA nos permite anticipar la demanda con una precision que nunca imaginamos."
    }
  },
  {
    id: 4,
    slug: "finanzas-automatizadas",
    title: { rendered: "Automatización de Procesos Financieros" },
    content: { rendered: "<p>Transformacion digital del departamento financiero.</p>" },
    excerpt: { rendered: "80% reduccion en errores de facturacion." },
    date: new Date().toISOString(),
    acf: {
      cliente: "FinanceGroup",
      sector: "Finanzas",
      resultado: "80% reduccion en errores, 60% ahorro de tiempo en conciliaciones",
      testimonio: "El ROI fue evidente desde el primer mes de implementacion."
    }
  }
]

const sampleSectors = [
  { id: 1, name: "Retail", slug: "retail" },
  { id: 2, name: "Salud", slug: "salud" },
  { id: 3, name: "Logistica", slug: "logistica" },
  { id: 4, name: "Finanzas", slug: "finanzas" },
]

export function CasesContent({ initialSectors }: CasesContentProps) {
  const [cases, setCases] = useState<WPCaseStudy[]>([])
  const [loading, setLoading] = useState(true)
  const [totalPages, setTotalPages] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedSector, setSelectedSector] = useState<string | undefined>(undefined)
  const [usingSampleData, setUsingSampleData] = useState(false)

  const sectors = initialSectors.length > 0 ? initialSectors : sampleSectors

  // Fetch cases from WordPress or use sample data
  const fetchCases = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      params.append("page", String(currentPage))
      params.append("per_page", "6")
      params.append("_embed", "1")

      const apiUrl = "https://cms.staffdigital.ai/wp-json/wp/v2"
      const url = `${apiUrl}/case-studies?${params.toString()}`

      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 8000)

      const response = await fetch(url, { signal: controller.signal })
      clearTimeout(timeoutId)

      if (response.ok) {
        const data = await response.json()
        if (Array.isArray(data) && data.length > 0) {
          setCases(data)
          setTotalPages(parseInt(response.headers.get("X-WP-TotalPages") || "1", 10))
          setUsingSampleData(false)
          return
        }
      }
      setCases(sampleCases)
      setUsingSampleData(true)
    } catch {
      setCases(sampleCases)
      setUsingSampleData(true)
    } finally {
      setLoading(false)
    }
  }, [currentPage])

  useEffect(() => {
    fetchCases()
  }, [fetchCases])

  // Filter cases by sector (client-side for sample data)
  const filteredCases = selectedSector
    ? cases.filter((c) => {
        const caseSector = c.acf?.sector?.toLowerCase()
        return caseSector === selectedSector.toLowerCase() || caseSector === selectedSector
      })
    : cases

  const handleSectorChange = (sectorName: string | undefined) => {
    setSelectedSector(sectorName)
  }

  return (
    <div className="space-y-8">
      {/* Sector Filter */}
      <div className="flex flex-wrap gap-2 p-4 rounded-2xl border border-border bg-card/50 backdrop-blur-sm">
        <Button
          variant={!selectedSector ? "default" : "outline"}
          size="sm"
          onClick={() => handleSectorChange(undefined)}
          className="rounded-full"
        >
          Todos
        </Button>
        {sectors.map((sector) => (
          <Button
            key={sector.id}
            variant={selectedSector === sector.name ? "default" : "outline"}
            size="sm"
            onClick={() => handleSectorChange(sector.name)}
            className="rounded-full"
          >
            {sector.name}
          </Button>
        ))}
      </div>

      {/* Cases Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="rounded-2xl border border-border bg-card animate-pulse h-[300px]" />
          ))}
        </div>
      ) : filteredCases.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-muted-foreground text-lg">No se encontraron casos de estudio.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCases.map((caseStudy) => {
            const imageUrl = getFeaturedImageUrl(caseStudy, "large")

            return (
              <Link
                key={caseStudy.id}
                href={`/casos-exito/${caseStudy.slug}`}
                className="group"
              >
                <article className="h-full rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/30 hover:bg-card/80 transition-all duration-300">
                  <div className="flex flex-col lg:flex-row h-full">
                    {/* Image */}
                    <div className="relative w-full lg:w-2/5 h-48 lg:h-auto min-h-[200px] bg-muted overflow-hidden flex-shrink-0">
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
