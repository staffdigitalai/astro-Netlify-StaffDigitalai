"use client"

import Link from "next/link"
import { ArrowRight, Search, Settings, Rocket, BarChart3, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { WPPage } from "@/lib/wordpress"

interface MetodologiaContentProps {
  page: WPPage | null
}

const pasos = [
  {
    numero: "01",
    icon: Search,
    title: "Analisis y Diagnostico",
    descripcion: "Estudiamos tu negocio en profundidad para identificar las oportunidades de automatizaciónmás impactantes.",
    duracion: "1-2 semanas",
    entregables: ["Informe de diagnostico", "Mapa de procesos", "Plan de accion"],
  },
  {
    numero: "02",
    icon: Settings,
    title: "Configuracion y Entrenamiento",
    descripcion: "Configuramos la IA segun tus necesidades especificas y la entrenamos con tus datos y protocolos.",
    duracion: "2-3 semanas",
    entregables: ["IA configurada", "Base de conocimiento", "Scripts personalizados"],
  },
  {
    numero: "03",
    icon: Rocket,
    title: "Implementacion y Lanzamiento",
    descripcion: "Desplegamos la solución de forma gradual, asegurando una transicion suave y sin interrupciones.",
    duracion: "1 semana",
    entregables: ["Sistema en produccion", "Integraciónes activas", "Formacion al equipo"],
  },
  {
    numero: "04",
    icon: BarChart3,
    title: "Monitorizacion y Optimizacion",
    descripcion: "Seguimos el rendimiento en tiempo real y optimizamos continuamente para maximizar resultados.",
    duracion: "Continuo",
    entregables: ["Dashboards en vivo", "Informes periodicos", "Mejoras continuas"],
  },
  {
    numero: "05",
    icon: RefreshCw,
    title: "Escalado y Evolucion",
    descripcion: "Expandimos la solucion a nuevos canales y procesos segun crece tu negocio.",
    duracion: "Segun necesidad",
    entregables: ["Nuevas funcionalidades", "Mas canales", "Mayor automatización"],
  },
]

export function MetodologiaContent({ page }: MetodologiaContentProps) {
  return (
    <div className="space-y-16">
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-6">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
          <span className="text-foreground">Nuestra </span>
          <span className="bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
            Metodologia
          </span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground text-pretty">
          {page?.acf?.subtitulo ||
            "Un proceso probado enmás de 500 implementaciones exitosas. Desde el analisis inicial hasta la optimizacion continua."}
        </p>
      </div>

      {/* WordPress Content */}
      {page?.content?.rendered && (
        <div
          className="prose prose-invert prose-lg max-w-3xl mx-auto"
          dangerouslySetInnerHTML={{ __html: page.content.rendered }}
        />
      )}

      {/* Steps */}
      <div className="space-y-8 max-w-4xl mx-auto">
        {pasos.map((paso, i) => (
          <div key={i} className="relative flex gap-6">
            {/* Timeline line */}
            {i < pasos.length - 1 && (
              <div className="absolute left-[39px] top-[80px] w-0.5 h-[calc(100%+2rem)] bg-border" />
            )}
            
            {/* Number circle */}
            <div className="relative z-10 flex-shrink-0 w-20 h-20 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
              <span className="text-xl font-bold text-primary">{paso.numero}</span>
            </div>
            
            {/* Content */}
            <div className="flex-1 p-6 rounded-xl border border-border bg-card/50 space-y-4">
              <div className="flex items-center gap-3">
                <paso.icon className="h-5 w-5 text-primary" />
                <h3 className="text-xl font-bold">{paso.title}</h3>
                <span className="ml-auto text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
                  {paso.duracion}
                </span>
              </div>
              <p className="text-muted-foreground">{paso.descripcion}</p>
              <div className="flex flex-wrap gap-2">
                {paso.entregables.map((entregable, j) => (
                  <span key={j} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                    {entregable}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Garantias */}
      <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div className="text-center p-6 rounded-xl border border-border bg-card/50">
          <div className="text-3xl font-bold text-primary mb-2">4-6</div>
          <div className="text-sm text-muted-foreground">Semanas de implementacion tipica</div>
        </div>
        <div className="text-center p-6 rounded-xl border border-border bg-card/50">
          <div className="text-3xl font-bold text-primary mb-2">95%</div>
          <div className="text-sm text-muted-foreground">Proyectos entregados a tiempo</div>
        </div>
        <div className="text-center p-6 rounded-xl border border-border bg-card/50">
          <div className="text-3xl font-bold text-primary mb-2">24/7</div>
          <div className="text-sm text-muted-foreground">Soporte post-implementacion</div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center space-y-6 p-8 lg:p-12 rounded-2xl border border-border bg-gradient-to-br from-primary/5 via-background to-primary/5">
        <h2 className="text-2xl md:text-3xl font-bold">
          Listo para empezar?
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Agenda una llamada con nuestro equipo para analizar tu caso y disenar un plan personalizado.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/demo">
              Solicitar demo gratuita
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/casos-exito">Ver casos de exito</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
