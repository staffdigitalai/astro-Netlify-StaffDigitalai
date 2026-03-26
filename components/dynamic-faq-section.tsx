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

// Fallback FAQs when WordPress is unavailable
const fallbackFaqs: WPFaq[] = [
  {
    id: 1,
    slug: "que-es-staffdigital-ai",
    title: { rendered: "Que es StaffDigital AI?" },
    acf: {
      pregunta: "Que es StaffDigital AI y como puede ayudar a mi negocio?",
      respuesta: "StaffDigital AI es una plataforma de inteligencia artificial que automatiza procesos clave de tu negocio, incluyendo atención telefónica, agentes IA con voz humana, gestión de citas y mas. Ayudamos a empresas a reducir costes, mejorar la atención al cliente y escalar sus operaciones sin aumentar personal.",
      sector: "General",
    },
  },
  {
    id: 2,
    slug: "cuanto-cuesta",
    title: { rendered: "Cuanto cuesta implementar IA?" },
    acf: {
      pregunta: "Cuanto cuesta implementar soluciones de IA en mi empresa?",
      respuesta: "Ofrecemos diferentes planes adaptados a cada necesidad, desde pequenas empresas hasta grandes corporaciones. Los precios varian segun las funcionalidades requeridas y el volumen de uso. Contactanos para recibir una propuesta personalizada sin compromiso.",
      sector: "General",
    },
  },
  {
    id: 3,
    slug: "tiempo-implementacion",
    title: { rendered: "Tiempo de implementacion" },
    acf: {
      pregunta: "Cuanto tiempo tarda en implementarse una solución de IA?",
      respuesta: "La implementacion tipica tarda entre 2 y 4 semanas, dependiendo de la complejidad del proyecto y las integraciones necesarias. Proyectosmás simples como agentes IA basicos pueden estar operativos en pocos dias.",
      sector: "General",
    },
  },
  {
    id: 4,
    slug: "integraciones-crm",
    title: { rendered: "Integraciónes con CRM" },
    acf: {
      pregunta: "Se integra con mi CRM y otros sistemas existentes?",
      respuesta: "Si, nuestras soluciones se integran con los principales CRMs del mercado (Salesforce, HubSpot, Pipedrive, etc.) y con multiples herramientas de gestion. Tambien ofrecemos API abierta para integraciones personalizadas.",
      sector: "Tecnologia",
    },
  },
  {
    id: 5,
    slug: "soporte-disponible",
    title: { rendered: "Soporte y asistencia" },
    acf: {
      pregunta: "Que tipo de soporte ofreceis?",
      respuesta: "Ofrecemos soporte tecnico 24/7 para todos nuestros clientes, con tiempos de respuesta garantizados. Ademas, cada cliente tiene asignado un gestor de cuenta dedicado para resolver cualquier duda o necesidad.",
      sector: "General",
    },
  },
  {
    id: 6,
    slug: "idiomas-soportados",
    title: { rendered: "Idiomas soportados" },
    acf: {
      pregunta: "En que idiomas funcionan las soluciones de IA?",
      respuesta: "Nuestras soluciones soportanmás de 50 idiomas, incluyendo espanol, portugues, ingles, catalan, frances, aleman e italiano. El sistema detecta automaticamente el idioma del usuario y responde en consecuencia.",
      sector: "General",
    },
  },
  {
    id: 7,
    slug: "seguridad-datos",
    title: { rendered: "Seguridad de datos" },
    acf: {
      pregunta: "Como protegeis los datos de mis clientes?",
      respuesta: "Cumplimos con RGPD y las normativas de proteccion de datosmás estrictas. Todos los datos se almacenan de forma encriptada en servidores europeos certificados. Realizamos auditorias de seguridad periodicas y contamos con certificacion ISO 27001.",
      sector: "Seguridad",
    },
  },
  {
    id: 8,
    slug: "escalabilidad",
    title: { rendered: "Escalabilidad" },
    acf: {
      pregunta: "Puede la solucion crecer con mi negocio?",
      respuesta: "Absolutamente. Nuestras soluciones estan disenadas para escalar automaticamente segun tus necesidades. Puedes empezar con funcionalidades basicas e ir anadiendo modulos a medida que crece tu negocio, sin interrupciones en el servicio.",
      sector: "General",
    },
  },
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

  const groupFaqsBySector = useCallback((faqList: WPFaq[]) => {
    const grouped = new Map<string, WPFaq[]>()
    faqList.forEach((faq) => {
      const sector = faq.acf?.sector || "General"
      if (!grouped.has(sector)) {
        grouped.set(sector, [])
      }
      grouped.get(sector)!.push(faq)
    })
    // Sort FAQs by orden field if available
    grouped.forEach((faqList, sector) => {
      faqList.sort((a, b) => (a.acf?.orden || 0) - (b.acf?.orden || 0))
    })
    return grouped
  }, [])

  const fetchFaqs = useCallback(async () => {
    setLoading(true)
    try {
      const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || "https://cms.staffdigital.ai/wp-json/wp/v2"
      
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 8000)
      
      const response = await fetch(`${apiUrl}/faqs?lang=${selectedLang}&per_page=100`, {
        signal: controller.signal,
      })
      clearTimeout(timeoutId)
      
      if (response.ok) {
        const data: WPFaq[] = await response.json()
        if (data.length > 0) {
          setFaqs(data)
          setGroupedFaqs(groupFaqsBySector(data))
          return
        }
      }
      // Fallback to sample data
      setFaqs(fallbackFaqs)
      setGroupedFaqs(groupFaqsBySector(fallbackFaqs))
    } catch (error) {
      console.error("Error fetching FAQs:", error)
      // Use fallback data on error
      setFaqs(fallbackFaqs)
      setGroupedFaqs(groupFaqsBySector(fallbackFaqs))
    } finally {
      setLoading(false)
    }
  }, [selectedLang, groupFaqsBySector])

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
            Encuentra respuestas a las preguntasmás comunes sobre nuestras soluciones de IA.
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
