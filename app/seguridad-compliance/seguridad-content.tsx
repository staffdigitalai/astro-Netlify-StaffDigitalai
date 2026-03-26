"use client"

import Link from "next/link"
import { ArrowRight, Shield, Lock, Eye, Server, FileCheck, AlertTriangle, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { WPPage } from "@/lib/wordpress"

interface SeguridadContentProps {
  page: WPPage | null
}

const caracteristicas = [
  {
    icon: Lock,
    title: "Encriptacion End-to-End",
    descripcion: "Todos los datos se encriptan en transito (TLS 1.3) y en reposo (AES-256).",
  },
  {
    icon: Server,
    title: "Servidores Europeos",
    descripcion: "Infraestructura alojada en la UE con certificacion de centros de datos.",
  },
  {
    icon: Eye,
    title: "Privacidad por Diseno",
    descripcion: "Minimizacion de datos y politicas de retencion configurables.",
  },
  {
    icon: FileCheck,
    title: "Auditorias Regulares",
    descripcion: "Pentesting y auditorias de seguridad trimestrales por terceros.",
  },
  {
    icon: AlertTriangle,
    title: "Deteccion de Anomalias",
    descripcion: "Monitorizacion 24/7 con alertas automaticas ante comportamientos sospechosos.",
  },
  {
    icon: Shield,
    title: "Control de Acceso",
    descripcion: "RBAC, MFA obligatorio y logs de auditoria completos.",
  },
]

const certificaciones = [
  {
    nombre: "RGPD",
    descripcion: "Cumplimiento total con el Reglamento General de Proteccion de Datos de la UE.",
  },
  {
    nombre: "ISO 27001",
    descripcion: "Certificacion internacional en gestión de seguridad de la información.",
  },
  {
    nombre: "SOC 2 Type II",
    descripcion: "Auditoria de controles de seguridad, disponibilidad y confidencialidad.",
  },
  {
    nombre: "HIPAA",
    descripcion: "Cumplimiento para el sector sanitario (disponible bajo peticion).",
  },
]

const compromisos = [
  "Tus datos nunca se usan para entrenar modelos de IA",
  "Sin acceso a datos por parte de terceros",
  "Posibilidad de despliegue on-premise",
  "Borrado completo de datos bajo peticion",
  "DPO dedicado para consultas de privacidad",
  "Acuerdos de procesamiento de datos (DPA) disponibles",
]

export function SeguridadContent({ page }: SeguridadContentProps) {
  return (
    <div className="space-y-16">
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-6">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
          <span className="text-foreground">Seguridad y </span>
          <span className="bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
            Compliance
          </span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground text-pretty">
          {page?.acf?.subtitulo ||
            "La seguridad de tus datos es nuestra maxima prioridad. Cumplimos con los estandaresmás exigentes del mercado."}
        </p>
      </div>

      {/* WordPress Content */}
      {page?.content?.rendered && (
        <div
          className="prose prose-invert prose-lg max-w-3xl mx-auto"
          dangerouslySetInnerHTML={{ __html: page.content.rendered }}
        />
      )}

      {/* Security Features */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {caracteristicas.map((carac, i) => (
          <div key={i} className="p-6 rounded-xl border border-border bg-card/50 space-y-3">
            <div className="p-2 rounded-lg bg-primary/10 w-fit">
              <carac.icon className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-semibold">{carac.title}</h3>
            <p className="text-sm text-muted-foreground">{carac.descripcion}</p>
          </div>
        ))}
      </div>

      {/* Certifications */}
      <div className="space-y-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center">Certificaciones y Cumplimiento</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {certificaciones.map((cert, i) => (
            <div key={i} className="p-6 rounded-xl border border-primary/30 bg-primary/5 text-center space-y-3">
              <div className="text-2xl font-bold text-primary">{cert.nombre}</div>
              <p className="text-sm text-muted-foreground">{cert.descripcion}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Commitments */}
      <div className="max-w-3xl mx-auto p-8 rounded-2xl border border-border bg-card/50 space-y-6">
        <h2 className="text-2xl font-bold text-center">Nuestros Compromisos</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {compromisos.map((compromiso, i) => (
            <div key={i} className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
              <span className="text-sm">{compromiso}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center space-y-6 p-8 lg:p-12 rounded-2xl border border-border bg-gradient-to-br from-primary/5 via-background to-primary/5">
        <h2 className="text-2xl md:text-3xl font-bold">
          Tienes preguntas sobre seguridad?
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Nuestro equipo de seguridad esta disponible para responder cualquier consulta sobre
          cumplimiento normativo y proteccion de datos.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/demo">
              Solicitar información
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/faq">Ver FAQs</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
