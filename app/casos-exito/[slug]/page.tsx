import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getCaseStudy, getCaseStudies, stripHtml, WPCaseStudy } from "@/lib/wordpress"
import { CaseStudyClient } from "./case-study-client"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  try {
    const { caseStudies } = await getCaseStudies({ perPage: 100 })
    return caseStudies.map((cs) => ({
      slug: cs.slug,
    }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params

  try {
    const caseStudy = await getCaseStudy(slug)
    if (!caseStudy) {
      return {
        title: "Caso no encontrado | StaffDigital AI",
      }
    }

    const title = caseStudy.acf?.meta_title || `${stripHtml(caseStudy.title.rendered)} | Casos de Exito | StaffDigital AI`
    const description =
      caseStudy.acf?.meta_description ||
      caseStudy.acf?.resultado_principal ||
      stripHtml(caseStudy.excerpt.rendered)

    return {
      title,
      description,
      openGraph: {
        title,
        description,
      },
    }
  } catch {
    return {
      title: "Casos de Exito | StaffDigital AI",
    }
  }
}

// Fallback case study data
const fallbackCaseStudies: Record<string, WPCaseStudy> = {
  "automatización-retail": {
    id: 1,
    date: new Date().toISOString(),
    slug: "automatización-retail",
    title: { rendered: "Automatización de Atencion al Cliente para Retail" },
    excerpt: { rendered: "<p>Reduccion del 70% en tiempos de respuesta.</p>" },
    content: {
      rendered: `
        <h2>El Reto</h2>
        <p>RetailMax, una cadena de tiendas conmás de 50 locales, enfrentaba un desafio significativo en su atención al cliente. Con un volumen demás de 10,000 consultas mensuales y un equipo limitado, los tiempos de respuesta se habian disparado, afectando la satisfaccion del cliente.</p>
        
        <h2>La Solucion</h2>
        <p>Implementamos un sistema de IA conversacional multicanal que integra WhatsApp, email y chat web. El sistema incluye:</p>
        <ul>
          <li>Agente IA con voz humana con NLP avanzado</li>
          <li>Clasificacion automatica de consultas</li>
          <li>Escalado inteligente a agentes humanos</li>
          <li>Dashboard de metricas en tiempo real</li>
        </ul>
        
        <h2>Resultados</h2>
        <p>En solo 3 meses de implementacion, RetailMax logro una transformacion radical en su operacion de atención al cliente.</p>
      `,
    },
    featured_media: 0,
    acf: {
      cliente: "RetailMax",
      sector: "Retail",
      resultado_principal: "70% reduccion en tiempos de respuesta",
      resultado: "70% reduccion en tiempos de respuesta, 45% ahorro en costes operativos",
      testimonio: "La solución de StaffDigital transformo completamente nuestra atención al cliente. Ahora podemos gestionar el triple de consultas con el mismo equipo.",
      metricas: [
        { valor: "-70%", etiqueta: "Tiempo de respuesta" },
        { valor: "-45%", etiqueta: "Costes operativos" },
        { valor: "+60%", etiqueta: "Satisfaccion cliente" },
        { valor: "3x", etiqueta: "Capacidad de atencion" },
      ],
    },
  },
  "clinica-dental-automation": {
    id: 2,
    date: new Date().toISOString(),
    slug: "clinica-dental-automation",
    title: { rendered: "Gestion Inteligente de Citas para Clinica Dental" },
    excerpt: { rendered: "<p>Aumento del 50% en eficiencia de agenda.</p>" },
    content: {
      rendered: `
        <h2>El Reto</h2>
        <p>DentalCare Plus, una clinica dental con 5 consultorios, perdia hasta un 25% de sus citas por no-shows y tenia una recepcion sobrecargada gestionando llamadas y reservas manualmente.</p>
        
        <h2>La Solucion</h2>
        <p>Desarrollamos un sistema integral de gestión de citas con:</p>
        <ul>
          <li>Reserva automatica 24/7 por WhatsApp y web</li>
          <li>Recordatorios inteligentes con confirmacion</li>
          <li>Relleno automatico de cancelaciones</li>
          <li>Integración con software de gestion clinica</li>
        </ul>
        
        <h2>Resultados</h2>
        <p>La clinica experimento una mejora dramatica en su eficiencia operativa desde el primer mes.</p>
      `,
    },
    featured_media: 0,
    acf: {
      cliente: "DentalCare Plus",
      sector: "Salud",
      resultado_principal: "50%más eficiencia en gestión de citas",
      resultado: "50%más eficiencia en gestión de citas, 30% reducción de no-shows",
      testimonio: "Ahora nuestro equipo puede enfocarse en lo que realmente importa: los pacientes. La gestión de citas se hace sola.",
      metricas: [
        { valor: "+50%", etiqueta: "Eficiencia agenda" },
        { valor: "-30%", etiqueta: "No-shows" },
        { valor: "24/7", etiqueta: "Disponibilidad" },
        { valor: "+40%", etiqueta: "Capacidad consultas" },
      ],
    },
  },
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params

  let caseStudy: WPCaseStudy | null = null

  try {
    caseStudy = await getCaseStudy(slug)
  } catch (error) {
    console.error("Error fetching case study from WordPress:", error)
  }

  // Try fallback if WordPress fails
  if (!caseStudy) {
    caseStudy = fallbackCaseStudies[slug] || null
  }

  if (!caseStudy) {
    notFound()
  }

  return <CaseStudyClient caseStudy={caseStudy} />
}
