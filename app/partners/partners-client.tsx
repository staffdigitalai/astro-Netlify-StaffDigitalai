"use client"

import { Handshake, Globe, Shield, Cpu, Phone, MessageSquare, BarChart3, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import type { WPPage } from "@/lib/wordpress"

interface PartnersClientProps {
  page: WPPage | null
}

const partnerCategories = [
  {
    title: "IA y Procesamiento de Lenguaje",
    icon: Cpu,
    partners: [
      { name: "OpenAI", description: "Modelos GPT para comprensión y generación de texto" },
      { name: "Anthropic (Claude)", description: "Razonamiento avanzado y análisis contextual" },
      { name: "Tecnología de Voz Propietaria", description: "Voces humanas indistinguibles de personas reales" },
    ],
  },
  {
    title: "Telecomunicaciones",
    icon: Phone,
    partners: [
      { name: "Telnyx", description: "Infraestructura SIP global para llamadas de voz" },
      { name: "Twilio", description: "APIs de comunicación omnicanal" },
      { name: "Ringover", description: "Telefonía cloud empresarial" },
      { name: "DIDWW", description: "Numeración internacional y enrutamiento" },
    ],
  },
  {
    title: "Mensajería e Integración",
    icon: MessageSquare,
    partners: [
      { name: "WhatsApp Business API", description: "Canal oficial de WhatsApp para empresas" },
      { name: "Chatwoot", description: "Plataforma omnicanal open source" },
      { name: "n8n", description: "Automatización de workflows sin código" },
      { name: "Zapier", description: "Conector universal con +5000 apps" },
    ],
  },
  {
    title: "CRM y Productividad",
    icon: BarChart3,
    partners: [
      { name: "Twenty CRM", description: "CRM open source moderno (recomendado)" },
      { name: "HubSpot", description: "CRM y marketing automation" },
      { name: "Salesforce", description: "CRM empresarial líder" },
      { name: "Pipedrive", description: "CRM enfocado en ventas" },
    ],
  },
  {
    title: "Infraestructura y Seguridad",
    icon: Shield,
    partners: [
      { name: "Cloudflare", description: "CDN, DDoS protection y DNS" },
      { name: "Vercel", description: "Hosting y edge computing" },
      { name: "Hetzner / OVH", description: "Servidores dedicados en la UE" },
      { name: "Resend", description: "Email transaccional de alta entregabilidad" },
    ],
  },
]

export function PartnersClient({ page }: PartnersClientProps) {
  return (
    <div className="max-w-5xl mx-auto space-y-16">
      {/* Hero */}
      <div className="text-center space-y-6">
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm font-medium">
          <Handshake className="w-4 h-4 mr-2" />
          Ecosistema de partners
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
          <span className="text-foreground">Partners </span>
          <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            Tecnológicos
          </span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          {page?.acf?.subtitulo ||
            "Trabajamos con los mejores proveedores de IA, telecomunicaciones y CRM para garantizar resultados excepcionales."}
        </p>
      </div>

      {/* WP Content */}
      {page?.content?.rendered && (
        <div
          className="prose prose-invert max-w-3xl mx-auto"
          dangerouslySetInnerHTML={{ __html: page.content.rendered }}
        />
      )}

      {/* Partner categories */}
      <div className="space-y-12">
        {partnerCategories.map((cat) => (
          <div key={cat.title} className="space-y-6">
            <div className="flex items-center gap-3">
              <cat.icon className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold">{cat.title}</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {cat.partners.map((p) => (
                <div
                  key={p.name}
                  className="p-4 rounded-xl border border-border bg-card/50 hover:bg-card/80 transition-colors space-y-2"
                >
                  <div className="font-semibold text-foreground">{p.name}</div>
                  <p className="text-sm text-muted-foreground">{p.description}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Become a partner CTA */}
      <div className="text-center p-8 rounded-2xl border border-border bg-card/50 space-y-6">
        <Globe className="w-12 h-12 text-primary mx-auto" />
        <h2 className="text-2xl md:text-3xl font-bold">¿Quieres ser partner?</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Si eres proveedor de tecnología, integrador o consultor y quieres ofrecer
          agentes IA con voz humana a tus clientes, hablemos.
        </p>
        <Button asChild size="lg" className="rounded-full px-8">
          <Link href="/demo">
            Contactar como partner
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
