"use client"

import { useState, useEffect, useCallback } from "react"
import { HelpCircle, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import type { WPFaq, SupportedLang } from "@/lib/wordpress"

interface DynamicFaqSectionProps {
  initialLang?: SupportedLang
  showLanguageSelector?: boolean
  maxItems?: number
  className?: string
}

const languages: { code: SupportedLang; label: string }[] = [
  { code: "es", label: "ES" },
  { code: "pt-pt", label: "PT" },
  { code: "en", label: "EN" },
]

export function DynamicFaqSection({
  initialLang = "es",
  showLanguageSelector = true,
  maxItems,
  className = "",
}: DynamicFaqSectionProps) {
  const [faqs, setFaqs] = useState<WPFaq[]>([])
  const [groupedFaqs, setGroupedFaqs] = useState<Map<string, WPFaq[]>>(new Map())
  const [loading, setLoading] = useState(true)
  const [selectedLang, setSelectedLang] = useState<SupportedLang>(initialLang)
  const [selectedSector, setSelectedSector] = useState<string>("all")

  const fetchFaqs = useCallback(async () => {
    setLoading(true)
    try {
      const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || "https://cms.staffdigital.ai/wp-json/wp/v2"
      const response = await fetch(`${apiUrl}/faqs?lang=${selectedLang}&per_page=100`)
      
      if (response.ok) {
        const data: WPFaq[] = await response.json()
        setFaqs(data)

        // Group by sector
        const grouped = new Map<string, WPFaq[]>()
        data.forEach((faq) => {
          const sector = faq.acf?.sector || "General"
          if (!grouped.has(sector)) {
            grouped.set(sector, [])
          }
          grouped.get(sector)!.push(faq)
        })
        setGroupedFaqs(grouped)
      }
    } catch (error) {
      console.error("Error fetching FAQs:", error)
    } finally {
      setLoading(false)
    }
  }, [selectedLang])

  useEffect(() => {
    fetchFaqs()
  }, [fetchFaqs])

  const sectors = Array.from(groupedFaqs.keys())
  
  const displayedFaqs = selectedSector === "all" 
    ? faqs 
    : groupedFaqs.get(selectedSector) || []

  const finalFaqs = maxItems ? displayedFaqs.slice(0, maxItems) : displayedFaqs

  if (loading) {
    return (
      <section className={`py-20 px-4 sm:px-6 lg:px-8 ${className}`}>
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 rounded-xl border border-border bg-card animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (faqs.length === 0) {
    return null
  }

  return (
    <section className={`py-20 px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-foreground text-sm font-medium mb-6">
            <HelpCircle className="w-4 h-4 mr-2" />
            FAQ
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight text-balance mb-4">
            Preguntas{" "}
            <span className="bg-gradient-to-r from-primary via-primary to-primary/80 bg-clip-text text-transparent">
              Frecuentes
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Encuentra respuestas a las preguntas mas comunes sobre nuestras soluciones de IA.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-8 p-4 rounded-2xl border border-border bg-card/50 backdrop-blur-sm">
          {/* Sector Filter */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedSector === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedSector("all")}
              className="rounded-full"
            >
              Todos
            </Button>
            {sectors.map((sector) => (
              <Button
                key={sector}
                variant={selectedSector === sector ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedSector(sector)}
                className="rounded-full"
              >
                {sector}
              </Button>
            ))}
          </div>

          {/* Language Selector */}
          {showLanguageSelector && (
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <div className="flex gap-1">
                {languages.map((lang) => (
                  <Button
                    key={lang.code}
                    variant={selectedLang === lang.code ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setSelectedLang(lang.code)}
                    className="rounded-full px-3"
                  >
                    {lang.label}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* FAQ Accordion */}
        <Accordion type="single" collapsible className="space-y-3">
          {finalFaqs.map((faq, index) => (
            <AccordionItem
              key={faq.id}
              value={`faq-${faq.id}`}
              className="border border-border rounded-xl bg-card/50 backdrop-blur-sm px-6 overflow-hidden data-[state=open]:bg-card/80 transition-colors"
            >
              <AccordionTrigger className="text-left text-foreground hover:no-underline py-5">
                <span className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">
                    {index + 1}
                  </span>
                  <span className="font-medium">{faq.acf?.pregunta || "Pregunta no disponible"}</span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-5 pl-12">
                {faq.acf?.respuesta || "Respuesta no disponible"}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Show more link */}
        {maxItems && displayedFaqs.length > maxItems && (
          <div className="text-center mt-8">
            <Button variant="outline" className="rounded-full">
              Ver todas las preguntas
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
