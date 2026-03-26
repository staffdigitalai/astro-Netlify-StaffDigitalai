"use client"

import { Check, Star, Zap, Building2, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { WPPage } from "@/lib/wordpress"

interface PricingContentProps {
  page: WPPage | null
}

// Fallback pricing data
const fallbackPlans = [
  {
    nombre: "Essential",
    precio: "299",
    periodo: "/mes",
    descripcion: "Perfecto para pequenas empresas que quieren empezar con IA",
    caracteristicas: [
      "1 agente de IA conversacional",
      "500 conversaciones/mes",
      "Agente IA web integrado",
      "Soporte por email",
      "Integraciónes basicas",
      "Dashboard de analiticas",
    ],
    cta_texto: "Empezar ahora",
    cta_link: "/demo",
    destacado: false,
    icon: Zap,
  },
  {
    nombre: "Professional",
    precio: "699",
    periodo: "/mes",
    descripcion: "Para empresas en crecimiento que necesitanmás capacidad",
    caracteristicas: [
      "3 agentes de IA",
      "2.000 conversaciones/mes",
      "Agente IA + WhatsApp + Telefono",
      "Soporte prioritario 24/7",
      "Integraciónes avanzadas (CRM)",
      "Analiticas avanzadas",
      "Automatización de citas",
      "Entrenamiento personalizado",
    ],
    cta_texto: "Solicitar demo",
    cta_link: "/demo",
    destacado: true,
    icon: Star,
  },
  {
    nombre: "Enterprise",
    precio: "Personalizado",
    periodo: "",
    descripcion: "Solucion completa para grandes organizaciones",
    caracteristicas: [
      "Agentes ilimitados",
      "Conversaciones ilimitadas",
      "Todos los canales incluidos",
      "Account manager dedicado",
      "Integraciónes a medida",
      "SLA garantizado",
      "Formacion para tu equipo",
      "Desarrollo personalizado",
      "On-premise disponible",
    ],
    cta_texto: "Contactar ventas",
    cta_link: "/demo",
    destacado: false,
    icon: Building2,
  },
]

export function PricingContent({ page }: PricingContentProps) {
  // Use WordPress data if available, otherwise fallback
  const plans = page?.acf?.planes?.length ? page.acf.planes : fallbackPlans

  return (
    <div className="space-y-16">
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-6">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
          <span className="text-foreground">Planes y </span>
          <span className="bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
            Precios
          </span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground text-pretty">
          {page?.acf?.subtitulo ||
            "Elige el plan que mejor se adapte a las necesidades de tu negocio. Sin permanencia, cancela cuando quieras."}
        </p>
      </div>

      {/* Pricing Grid */}
      <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
        {plans.map((plan, index) => {
          const isHighlighted = plan.destacado
          const Icon = fallbackPlans[index]?.icon || Star

          return (
            <div
              key={plan.nombre}
              className={`relative rounded-2xl border p-6 lg:p-8 flex flex-col ${
                isHighlighted
                  ? "border-primary bg-primary/5 shadow-lg shadow-primary/10"
                  : "border-border bg-card/50"
              }`}
            >
              {isHighlighted && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">
                  Mas popular
                </Badge>
              )}

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-lg ${
                      isHighlighted ? "bg-primary/20" : "bg-muted"
                    }`}
                  >
                    <Icon
                      className={`h-5 w-5 ${
                        isHighlighted ? "text-primary" : "text-muted-foreground"
                      }`}
                    />
                  </div>
                  <h3 className="text-xl font-bold">{plan.nombre}</h3>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold">
                    {typeof plan.precio === "number" || !isNaN(Number(plan.precio))
                      ? `${plan.precio}€`
                      : plan.precio}
                  </span>
                  {plan.periodo && (
                    <span className="text-muted-foreground">{plan.periodo}</span>
                  )}
                </div>

                <p className="text-muted-foreground text-sm">
                  {plan.descripcion}
                </p>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.caracteristicas.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <Check
                      className={`h-4 w-4 mt-0.5 shrink-0 ${
                        isHighlighted ? "text-primary" : "text-muted-foreground"
                      }`}
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                asChild
                className={`w-full ${
                  isHighlighted
                    ? "bg-primary hover:bg-primary/90"
                    : "bg-muted hover:bg-muted/80"
                }`}
                variant={isHighlighted ? "default" : "outline"}
              >
                <Link href={plan.cta_link || "/demo"}>
                  {plan.cta_texto}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          )
        })}
      </div>

      {/* FAQ / Additional Info */}
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <h2 className="text-2xl font-bold">Preguntas frecuentes sobre precios</h2>
        <div className="grid md:grid-cols-2 gap-6 text-left">
          <div className="p-6 rounded-xl border border-border bg-card/50">
            <h3 className="font-semibold mb-2">Hay permanencia?</h3>
            <p className="text-sm text-muted-foreground">
              No, todos nuestros planes son sin permanencia. Puedes cancelar o
              cambiar de plan en cualquier momento.
            </p>
          </div>
          <div className="p-6 rounded-xl border border-border bg-card/50">
            <h3 className="font-semibold mb-2">Que pasa si supero el limite?</h3>
            <p className="text-sm text-muted-foreground">
              Te avisaremos antes de alcanzar el limite y podras ampliar tu plan
              o pagar por conversaciones adicionales.
            </p>
          </div>
          <div className="p-6 rounded-xl border border-border bg-card/50">
            <h3 className="font-semibold mb-2">Ofreceis descuentos?</h3>
            <p className="text-sm text-muted-foreground">
              Si, ofrecemos descuentos del 20% en planes anuales y precios
              especiales para startups y ONGs.
            </p>
          </div>
          <div className="p-6 rounded-xl border border-border bg-card/50">
            <h3 className="font-semibold mb-2">Puedo probar antes?</h3>
            <p className="text-sm text-muted-foreground">
              Si, ofrecemos una demo personalizada gratuita y 14 dias de prueba
              sin compromiso en todos los planes.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center space-y-6 p-8 lg:p-12 rounded-2xl border border-border bg-gradient-to-br from-primary/5 via-background to-primary/5">
        <h2 className="text-2xl md:text-3xl font-bold">
          No sabes que plan elegir?
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Nuestro equipo puede ayudarte a encontrar la solucion perfecta para
          tu negocio. Agenda una llamada sin compromiso.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/demo">
              Solicitar demo gratuita
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/faq">Ver todas las FAQs</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
