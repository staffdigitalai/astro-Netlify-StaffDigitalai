"use client"

import Link from "next/link"
import { ArrowRight, Users, Target, Lightbulb, Award, Globe, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { WPPage } from "@/lib/wordpress"

interface NosotrosContentProps {
  page: WPPage | null
}

const valores = [
  {
    icon: Target,
    title: "Innovacion constante",
    description: "Desarrollamos tecnologia de vanguardia que transforma la forma en que las empresas operan.",
  },
  {
    icon: Users,
    title: "Enfoque en el cliente",
    description: "Cada solucion que creamos esta disenada pensando en las necesidades reales de nuestros clientes.",
  },
  {
    icon: Lightbulb,
    title: "Simplicidad",
    description: "Hacemos que la tecnologia compleja sea accesible y facil de usar para cualquier empresa.",
  },
  {
    icon: Award,
    title: "Excelencia",
    description: "Nos comprometemos con losmás altos estandares de calidad en todo lo que hacemos.",
  },
  {
    icon: Globe,
    title: "Alcance global",
    description: "Nuestras soluciones funcionan enmás de 50 idiomas, adaptandose a cualquier mercado.",
  },
  {
    icon: Heart,
    title: "Compromiso",
    description: "Construimos relaciones a largo plazo basadas en la confianza y los resultados.",
  },
]

const stats = [
  { value: "500+", label: "Empresas confian en nosotros" },
  { value: "50M+", label: "Conversaciones automatizadas" },
  { value: "95%", label: "Tasa de satisfaccion" },
  { value: "24/7", label: "Soporte disponible" },
]

export function NosotrosContent({ page }: NosotrosContentProps) {
  return (
    <div className="space-y-16">
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-6">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
          <span className="text-foreground">Transformamos empresas con </span>
          <span className="bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
            Inteligencia Artificial
          </span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground text-pretty">
          {page?.acf?.subtitulo ||
            "Somos un equipo de expertos en IA dedicados a hacer que la automatización sea accesible para todas las empresas."}
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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
        {stats.map((stat, i) => (
          <div key={i} className="text-center p-6 rounded-xl border border-border bg-card/50">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Mission */}
      <div className="max-w-3xl mx-auto text-center space-y-6 p-8 rounded-2xl border border-border bg-card/50">
        <h2 className="text-2xl md:text-3xl font-bold">Nuestra Mision</h2>
        <p className="text-lg text-muted-foreground">
          Democratizar el acceso a la inteligencia artificial para que cualquier empresa, 
          sin importar su tamano, pueda beneficiarse de la automatización inteligente 
          y competir en igualdad de condiciones.
        </p>
      </div>

      {/* Values */}
      <div className="space-y-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center">
          Nuestros Valores
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {valores.map((valor, i) => (
            <div key={i} className="p-6 rounded-xl border border-border bg-card/50 space-y-3">
              <div className="p-2 rounded-lg bg-primary/10 w-fit">
                <valor.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold">{valor.title}</h3>
              <p className="text-sm text-muted-foreground">{valor.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center space-y-6 p-8 lg:p-12 rounded-2xl border border-border bg-gradient-to-br from-primary/5 via-background to-primary/5">
        <h2 className="text-2xl md:text-3xl font-bold">
          Quieres formar parte del cambio?
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Descubre como podemos ayudar a tu empresa a dar el salto hacia la automatización inteligente.
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
