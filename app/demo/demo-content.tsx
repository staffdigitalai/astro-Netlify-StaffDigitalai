"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Check, Calendar, Clock, Users, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useChatwoot } from "@/lib/use-chatwoot"
import type { WPPage } from "@/lib/wordpress"

interface DemoContentProps {
  page: WPPage | null
}

const beneficios = [
  {
    icon: Calendar,
    title: "30 minutos",
    descripcion: "Demo personalizada y sin compromiso",
  },
  {
    icon: Users,
    title: "Con tu equipo",
    descripcion: "Invita a quien necesites a la llamada",
  },
  {
    icon: MessageSquare,
    title: "Caso real",
    descripcion: "Te mostramos como aplicar IA a tu sector",
  },
  {
    icon: Clock,
    title: "Propuesta rapida",
    descripcion: "Recibe una propuesta en 24-48h",
  },
]

const queIncluye = [
  "Análisis de tu situación actual",
  "Demo en vivo de nuestras soluciones",
  "Resolución de todas tus dudas",
  "Recomendaciones personalizadas",
  "Propuesta económica sin compromiso",
]

export function DemoContent({ page }: DemoContentProps) {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { submit, isLoading, error } = useChatwoot()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)

    await submit("demo", {
      nombre: `${form.get("nombre")} ${form.get("apellidos")}`,
      email: form.get("email") as string,
      telefono: form.get("telefono") as string,
      empresa: form.get("empresa") as string,
      producto: form.get("sector") as string || "No especificado",
      fecha: "A coordinar",
    })

    if (!error) {
      setIsSubmitted(true)
    }
  }

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto text-center space-y-6 py-12">
        <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
          <Check className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold">Solicitud enviada</h1>
        <p className="text-lg text-muted-foreground">
          Gracias por tu interes. Nuestro equipo se pondra en contacto contigo en menos de 24 horas
          para agendar tu demo personalizada.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button asChild>
            <Link href="/">Volver al inicio</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/casos-exito">Ver casos de exito</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-16">
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-6">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
          <span className="text-foreground">Solicita tu </span>
          <span className="bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
            Demo Gratuita
          </span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground text-pretty">
          {page?.acf?.subtitulo ||
            "Descubre en 30 minutos como StaffDigital AI puede transformar la atención al cliente de tu negocio."}
        </p>
      </div>

      {/* Main content */}
      <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
        {/* Form */}
        <div className="p-8 rounded-2xl border border-border bg-card/50 space-y-6">
          <h2 className="text-xl font-bold">Completa tus datos</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre *</Label>
                <Input id="nombre" name="nombre" required placeholder="Tu nombre" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="apellidos">Apellidos *</Label>
                <Input id="apellidos" name="apellidos" required placeholder="Tus apellidos" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email corporativo *</Label>
              <Input id="email" name="email" type="email" required placeholder="tu@empresa.com" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="telefono">Telefono *</Label>
              <Input id="telefono" name="telefono" type="tel" required placeholder="+34 600 000 000" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="empresa">Empresa *</Label>
              <Input id="empresa" name="empresa" required placeholder="Nombre de tu empresa" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="sector">Sector</Label>
              <Input id="sector" name="sector" placeholder="Ej: Clinicas, Inmobiliarias, E-commerce..." />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="mensaje">Cuentanos tu caso (opcional)</Label>
              <Textarea 
                id="mensaje" 
                name="mensaje" 
                placeholder="Que problemas quieres resolver? Que volumen de consultas tienes?" 
                rows={4}
              />
            </div>
            
            <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
              {isLoading ? (
                "Enviando..."
              ) : (
                <>
                  Solicitar demo gratuita
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
            
            {error && (
              <p className="text-sm text-red-500 text-center">
                Error al enviar: {error}. Intenta de nuevo o contactanos por chat.
              </p>
            )}
            <p className="text-xs text-muted-foreground text-center">
              Al enviar este formulario, aceptas nuestra{" "}
              <Link href="/privacidad" className="underline hover:text-foreground">
                política de privacidad
              </Link>
              .
            </p>
          </form>
        </div>

        {/* Benefits */}
        <div className="space-y-8">
          <div className="grid grid-cols-2 gap-4">
            {beneficios.map((beneficio, i) => (
              <div key={i} className="p-4 rounded-xl border border-border bg-card/50 space-y-2">
                <beneficio.icon className="h-5 w-5 text-primary" />
                <div className="font-semibold">{beneficio.title}</div>
                <p className="text-sm text-muted-foreground">{beneficio.descripcion}</p>
              </div>
            ))}
          </div>

          <div className="p-6 rounded-xl border border-border bg-card/50 space-y-4">
            <h3 className="font-bold">Que incluye la demo?</h3>
            <ul className="space-y-3">
              {queIncluye.map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm">
                  <Check className="h-4 w-4 text-primary shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 rounded-xl border border-primary/30 bg-primary/5 space-y-3">
            <div className="text-sm text-muted-foreground">Empresas que confian en nosotros</div>
            <div className="text-3xl font-bold text-primary">+500</div>
            <div className="text-sm">empresas ya usan StaffDigital AI</div>
          </div>
        </div>
      </div>
    </div>
  )
}
