"use client"

import Link from "next/link"
import { ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { WPPage } from "@/lib/wordpress"

interface IntegracionesContentProps {
  page: WPPage | null
}

const categorias = [
  {
    nombre: "CRM y Ventas",
    integraciones: [
      { nombre: "Salesforce", descripcion: "Sincroniza leads, contactos y oportunidades" },
      { nombre: "HubSpot", descripcion: "Automatiza tu funnel de ventas" },
      { nombre: "Pipedrive", descripcion: "Gestiona tu pipeline de forma inteligente" },
      { nombre: "Zoho CRM", descripcion: "Conecta todas tus interacciones" },
    ],
  },
  {
    nombre: "Calendarios y Citas",
    integraciones: [
      { nombre: "Google Calendar", descripcion: "Programa citas automaticamente" },
      { nombre: "Calendly", descripcion: "Reservas sin fricciones" },
      { nombre: "Microsoft Outlook", descripcion: "Sincronizacion completa" },
      { nombre: "Cal.com", descripcion: "Agenda abierta y personalizable" },
    ],
  },
  {
    nombre: "Comunicacion",
    integraciones: [
      { nombre: "WhatsApp Business", descripcion: "Automatiza conversaciones" },
      { nombre: "Twilio", descripcion: "SMS y llamadas programaticas" },
      { nombre: "Slack", descripcion: "Notificaciones y comandos" },
      { nombre: "Microsoft Teams", descripcion: "Integra en tu workspace" },
    ],
  },
  {
    nombre: "E-commerce",
    integraciones: [
      { nombre: "Shopify", descripcion: "Atención al cliente automatizada" },
      { nombre: "WooCommerce", descripcion: "Soporte para tu tienda" },
      { nombre: "Prestashop", descripcion: "Automatiza pedidos y consultas" },
      { nombre: "Magento", descripcion: "Escala tu atencion" },
    ],
  },
  {
    nombre: "Helpdesk y Soporte",
    integraciones: [
      { nombre: "Zendesk", descripcion: "Tickets inteligentes" },
      { nombre: "Freshdesk", descripcion: "Soporte automatizado" },
      { nombre: "Intercom", descripcion: "Conversaciones unificadas" },
      { nombre: "Crisp", descripcion: "Chat y soporte multicanal" },
    ],
  },
  {
    nombre: "Automatización",
    integraciones: [
      { nombre: "Zapier", descripcion: "Conecta +5000 apps" },
      { nombre: "Make (Integromat)", descripcion: "Workflows complejos" },
      { nombre: "n8n", descripcion: "Automatización open source" },
      { nombre: "API REST", descripcion: "Integración personalizada" },
    ],
  },
]

export function IntegracionesContent({ page }: IntegracionesContentProps) {
  return (
    <div className="space-y-16">
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-6">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
          <span className="text-foreground">Conecta con tus </span>
          <span className="bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
            Herramientas Favoritas
          </span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground text-pretty">
          {page?.acf?.subtitulo ||
            "Mas de 100 integraciones nativas con las herramientas que ya usas. Conecta tu CRM, calendario, helpdesk y mucho mas."}
        </p>
      </div>

      {/* WordPress Content */}
      {page?.content?.rendered && (
        <div
          className="prose prose-invert prose-lg max-w-3xl mx-auto"
          dangerouslySetInnerHTML={{ __html: page.content.rendered }}
        />
      )}

      {/* Stats */}
      <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto">
        <div className="text-center p-6 rounded-xl border border-border bg-card/50">
          <div className="text-3xl font-bold text-primary mb-1">100+</div>
          <div className="text-sm text-muted-foreground">Integraciónes nativas</div>
        </div>
        <div className="text-center p-6 rounded-xl border border-border bg-card/50">
          <div className="text-3xl font-bold text-primary mb-1">5min</div>
          <div className="text-sm text-muted-foreground">Tiempo de conexion</div>
        </div>
        <div className="text-center p-6 rounded-xl border border-border bg-card/50">
          <div className="text-3xl font-bold text-primary mb-1">API</div>
          <div className="text-sm text-muted-foreground">Abierta y documentada</div>
        </div>
      </div>

      {/* Integration Categories */}
      <div className="space-y-12">
        {categorias.map((categoria, i) => (
          <div key={i} className="space-y-6">
            <h2 className="text-2xl font-bold">{categoria.nombre}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {categoria.integraciones.map((integración, j) => (
                <div key={j} className="p-4 rounded-xl border border-border bg-card/50 space-y-2">
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span className="font-semibold">{integración.nombre}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{integración.descripcion}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Custom Integration */}
      <div className="max-w-3xl mx-auto p-8 rounded-2xl border border-border bg-card/50 text-center space-y-4">
        <h2 className="text-2xl font-bold">No encuentras tu integración?</h2>
        <p className="text-muted-foreground">
          Nuestra API abierta te permite conectar cualquier sistema. Ademas, podemos desarrollar
          integraciones personalizadas para tu negocio.
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          <span className="text-sm bg-muted px-3 py-1 rounded-full">REST API</span>
          <span className="text-sm bg-muted px-3 py-1 rounded-full">Webhooks</span>
          <span className="text-sm bg-muted px-3 py-1 rounded-full">GraphQL</span>
          <span className="text-sm bg-muted px-3 py-1 rounded-full">SDK</span>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center space-y-6 p-8 lg:p-12 rounded-2xl border border-border bg-gradient-to-br from-primary/5 via-background to-primary/5">
        <h2 className="text-2xl md:text-3xl font-bold">
          Listo para conectar tus herramientas?
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Agenda una demo y te mostramos como integrar StaffDigital AI con tu stack tecnologico actual.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/demo">
              Solicitar demo
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/tecnologia">Ver tecnologia</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
