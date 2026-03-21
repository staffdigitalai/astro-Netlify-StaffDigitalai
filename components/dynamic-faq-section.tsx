"use client"

import { useState, useEffect, useCallback } from "react"
import { HelpCircle, ChevronDown, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import type { WPFAQ, WPSector, Language } from "@/lib/wordpress"

interface DynamicFAQSectionProps {
  lang?: Language
  className?: string
  title?: string
  subtitle?: string
  showSectorTabs?: boolean
  maxItems?: number
}

export function DynamicFAQSection({
  lang = "es",
  className,
  title = "Preguntas Frecuentes",
  subtitle = "Encuentra respuestas a las preguntas mas comunes sobre nuestras soluciones de IA.",
  showSectorTabs = true,
  maxItems
}: DynamicFAQSectionProps) {
  const [faqs, setFaqs] = useState<WPFAQ[]>([])
  const [sectors, setSectors] = useState<WPSector[]>([])
  const [selectedSector, setSelectedSector] = useState<number | null>(null)
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set())
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchFaqs = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    
    try {
      const params = new URLSearchParams({
        lang,
        per_page: "100"
      })

      if (selectedSector) {
        params.append("sector", selectedSector.toString())
      }

      const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'https://cms.staffdigital.ai/wp-json/wp/v2'
      const response = await fetch(`${apiUrl}/faqs?${params}`)
      
      if (!response.ok) {
        throw new Error("Error al cargar las FAQs")
      }

      const data: WPFAQ[] = await response.json()
      setFaqs(maxItems ? data.slice(0, maxItems) : data)
    } catch (err) {
      setError("No se pudieron cargar las preguntas frecuentes.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }, [lang, selectedSector, maxItems])

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
    fetchFaqs()
  }, [fetchFaqs])

  useEffect(() => {
    if (showSectorTabs) {
      fetchSectors()
    }
  }, [fetchSectors, showSectorTabs])

  const toggleItem = (id: number) => {
    setExpandedItems(prev => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  // Group FAQs by sector
  const groupedFaqs = faqs.reduce<Map<string, WPFAQ[]>>((acc, faq) => {
    const sectorId = typeof faq.acf?.sector === 'string' 
      ? parseInt(faq.acf.sector, 10) 
      : faq.acf?.sector
    
    const sectorName = sectors.find(s => s.id === sectorId)?.name || 'General'
    
    if (!acc.has(sectorName)) {
      acc.set(sectorName, [])
    }
    acc.get(sectorName)!.push(faq)
    return acc
  }, new Map())

  return (
    <section className={cn("py-20 px-4 relative z-10", className)}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-6">
            <HelpCircle className="w-4 h-4 mr-2" />
            FAQ
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-balance">
            {title}
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Sector Filter Tabs */}
        {showSectorTabs && sectors.length > 0 && (
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            <button
              onClick={() => setSelectedSector(null)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border",
                selectedSector === null
                  ? "bg-primary text-primary-foreground border-primary"
                  : "text-white/60 border-white/10 hover:text-white hover:border-white/20 bg-white/5"
              )}
            >
              Todas
            </button>
            {sectors.map((sector) => (
              <button
                key={sector.id}
                onClick={() => setSelectedSector(sector.id)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border",
                  selectedSector === sector.id
                    ? "bg-primary text-primary-foreground border-primary"
                    : "text-white/60 border-white/10 hover:text-white hover:border-white/20 bg-white/5"
                )}
              >
                {sector.name}
              </button>
            ))}
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="text-center py-16">
            <p className="text-white/60">{error}</p>
          </div>
        )}

        {/* FAQ List */}
        {!isLoading && !error && (
          <div className="space-y-8">
            {/* If sector is selected, show flat list */}
            {selectedSector !== null ? (
              <div className="space-y-3">
                {faqs.map((faq) => (
                  <FAQItem
                    key={faq.id}
                    faq={faq}
                    isExpanded={expandedItems.has(faq.id)}
                    onToggle={() => toggleItem(faq.id)}
                  />
                ))}
              </div>
            ) : (
              /* Show grouped by sector */
              Array.from(groupedFaqs.entries()).map(([sectorName, sectorFaqs]) => (
                <div key={sectorName}>
                  <h3 className="text-lg font-semibold text-white/80 mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    {sectorName}
                  </h3>
                  <div className="space-y-3">
                    {sectorFaqs.map((faq) => (
                      <FAQItem
                        key={faq.id}
                        faq={faq}
                        isExpanded={expandedItems.has(faq.id)}
                        onToggle={() => toggleItem(faq.id)}
                      />
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && faqs.length === 0 && (
          <div className="text-center py-16">
            <p className="text-white/60">No se encontraron preguntas frecuentes.</p>
          </div>
        )}
      </div>
    </section>
  )
}

interface FAQItemProps {
  faq: WPFAQ
  isExpanded: boolean
  onToggle: () => void
}

function FAQItem({ faq, isExpanded, onToggle }: FAQItemProps) {
  const question = faq.acf?.pregunta || faq.title.rendered.replace(/<[^>]*>/g, '')
  const answer = faq.acf?.respuesta || ''

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden transition-all duration-200 hover:border-white/20">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 p-5 text-left cursor-pointer"
        aria-expanded={isExpanded}
      >
        <span className="text-white font-medium leading-relaxed">{question}</span>
        <ChevronDown 
          className={cn(
            "w-5 h-5 text-white/40 flex-shrink-0 transition-transform duration-200",
            isExpanded && "rotate-180"
          )} 
        />
      </button>
      
      <div
        className={cn(
          "grid transition-all duration-200",
          isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden">
          <div className="px-5 pb-5 pt-0">
            <div className="border-t border-white/10 pt-4">
              <p className="text-white/60 leading-relaxed whitespace-pre-wrap">{answer}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
