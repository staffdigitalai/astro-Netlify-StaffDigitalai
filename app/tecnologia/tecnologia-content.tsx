"use client"

import Link from "next/link"
import { ArrowRight, Brain, Mic, MessageSquare, Zap, Shield, Globe, Cpu, Network, Database } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { WPPage } from "@/lib/wordpress"

interface TecnologiaContentProps {
  page: WPPage | null
}

const tecnologias = [
  {
    icon: Brain,
    title: "Large Language Models (LLMs)",
    descripcion: "Utilizamos los modelos de lenguajemás avanzados del mercado para garantizar conversaciones naturales y precisas.",
    detalles: ["GPT-4, Claude, Gemini", "Fine-tuning personalizado", "Contexto extendido"],
  },
  {
    icon: Mic,
    title: "Speech-to-Text / Text-to-Speech",
    descripcion: "Tecnologia de reconocimiento y sintesis de voz de ultima generacion para llamadas telefonicas naturales.",
    detalles: ["Voces realistas", "Deteccion de emociones", "Multiples idiomas"],
  },
  {
    icon: MessageSquare,
    title: "NLP y Comprension Semantica",
    descripcion: "Procesamiento de lenguaje natural avanzado que entiende el contexto y la intencion del usuario.",
    detalles: ["Análisis de sentimiento", "Extraccion de entidades", "Resolución de ambiguedades"],
  },
  {
    icon: Network,
    title: "Arquitectura Multicanal",
    descripcion: "Infraestructura unificada que permite gestionar todos los canales desde una unica plataforma.",
    detalles: ["Web, WhatsApp, Telefono", "Email, SMS, Redes", "API abierta"],
  },
  {
    icon: Database,
    title: "RAG y Base de Conocimiento",
    descripcion: "Sistema de Retrieval-Augmented Generation que conecta la IA con tu información empresarial.",
    detalles: ["Documentos, FAQs, Manuales", "Actualizacion en tiempo real", "Busqueda semantica"],
  },
  {
    icon: Cpu,
    title: "Agentes Autonomos",
    descripcion: "IAs que pueden tomar decisiones y ejecutar acciones de forma autonoma siguiendo tus protocolos.",
    detalles: ["Automatización de tareas", "Integraciónes activas", "Escalado automatico"],
  },
]

const caracteristicas = [
  {
    icon: Zap,
    title: "Respuesta < 300ms",
    descripcion: "Latencia ultra-baja para conversaciones fluidas en tiempo real.",
  },
  {
    icon: Shield,
    title: "99.9% Uptime",
    descripcion: "Infraestructura redundante con alta disponibilidad garantizada.",
  },
  {
    icon: Globe,
    title: "50+ Idiomas",
    descripcion: "Soporte multilingue con deteccion automatica del idioma.",
  },
]

export function TecnologiaContent({ page }: TecnologiaContentProps) {
  return (
    <div className="space-y-16">
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-6">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
          <span className="text-foreground">Tecnologia de </span>
          <span className="bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
            Vanguardia
          </span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground text-pretty">
          {page?.acf?.subtitulo ||
            "Combinamos los ultimos avances en IA con una arquitectura robusta para ofrecer soluciones que realmente funcionan."}
        </p>
      </div>

      {/* WordPress Content */}
      {page?.content?.rendered && (
        <div
          className="prose prose-invert prose-lg max-w-3xl mx-auto"
          dangerouslySetInnerHTML={{ __html: page.content.rendered }}
        />
      )}

      {/* Technologies Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tecnologias.map((tech, i) => (
          <div key={i} className="p-6 rounded-xl border border-border bg-card/50 space-y-4">
            <div className="p-3 rounded-lg bg-primary/10 w-fit">
              <tech.icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-bold">{tech.title}</h3>
            <p className="text-sm text-muted-foreground">{tech.descripcion}</p>
            <div className="flex flex-wrap gap-2 pt-2">
              {tech.detalles.map((detalle, j) => (
                <span key={j} className="text-xs bg-muted px-2 py-1 rounded">
                  {detalle}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Performance Stats */}
      <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {caracteristicas.map((carac, i) => (
          <div key={i} className="text-center p-6 rounded-xl border border-border bg-card/50">
            <carac.icon className="h-8 w-8 text-primary mx-auto mb-3" />
            <div className="text-xl font-bold mb-1">{carac.title}</div>
            <div className="text-sm text-muted-foreground">{carac.descripcion}</div>
          </div>
        ))}
      </div>

      {/* Architecture Diagram Placeholder */}
      <div className="max-w-4xl mx-auto p-8 rounded-2xl border border-border bg-card/50 text-center">
        <h2 className="text-2xl font-bold mb-4">Arquitectura de la Plataforma</h2>
        <p className="text-muted-foreground mb-6">
          Nuestra arquitectura esta disenada para escalar desde pequenas empresas hasta grandes corporaciones,
          manteniendo siempre el maximo rendimiento y seguridad.
        </p>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div className="p-4 rounded-lg bg-muted/50">
            <div className="font-semibold mb-2">Capa de Entrada</div>
            <div className="text-muted-foreground text-xs">Web, WhatsApp, Telefonia, API</div>
          </div>
          <div className="p-4 rounded-lg bg-primary/10">
            <div className="font-semibold mb-2">Motor de IA</div>
            <div className="text-muted-foreground text-xs">LLMs, NLP, Agentes, RAG</div>
          </div>
          <div className="p-4 rounded-lg bg-muted/50">
            <div className="font-semibold mb-2">Integraciónes</div>
            <div className="text-muted-foreground text-xs">CRM, ERP, Calendarios, APIs</div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center space-y-6 p-8 lg:p-12 rounded-2xl border border-border bg-gradient-to-br from-primary/5 via-background to-primary/5">
        <h2 className="text-2xl md:text-3xl font-bold">
          Quieres ver la tecnologia en accion?
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Agenda una demo tecnica y descubre como nuestra tecnologia puede transformar tu negocio.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/demo">
              Solicitar demo tecnica
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/integraciones">Ver integraciones</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
