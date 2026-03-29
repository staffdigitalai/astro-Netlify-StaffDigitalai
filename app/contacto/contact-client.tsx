"use client"

import { useState } from "react"
import { MapPin, Phone, Mail, MessageSquare, Clock, ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useChatwoot } from "@/lib/use-chatwoot"
import Link from "next/link"

const offices = [
  {
    city: "Barcelona",
    country: "España",
    address: "Carrer d'Aragó, 308, 1º 2ª",
    zip: "08009 Barcelona",
    phone: "+34 931 229 129",
    email: "info@staffdigital.ai",
    hours: "Lunes a Viernes, 9:00 - 18:00 CET",
  },
  {
    city: "Lisboa",
    country: "Portugal",
    address: "Escritório virtual",
    zip: "Lisboa, Portugal",
    phone: "+351 210 210 193",
    email: "info@staffdigital.ai",
    hours: "Segunda a Sexta, 9:00 - 18:00 WET",
  },
]

const contactMethods = [
  {
    icon: Phone,
    title: "Llámanos",
    description: "Habla con nuestro agente IA o con un humano",
    action: "tel:+34931229129",
    actionLabel: "+34 931 229 129",
  },
  {
    icon: MessageSquare,
    title: "WhatsApp",
    description: "Escríbenos por WhatsApp Business",
    action: "https://wa.me/34931229129",
    actionLabel: "Abrir WhatsApp",
  },
  {
    icon: Mail,
    title: "Email",
    description: "Respuesta en menos de 24 horas",
    action: "mailto:info@staffdigital.ai",
    actionLabel: "info@staffdigital.ai",
  },
]

export function ContactClient() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { submit, isLoading, error } = useChatwoot()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)

    await submit("consulta", {
      nombre: form.get("nombre") as string,
      email: form.get("email") as string,
      telefono: form.get("telefono") as string,
      empresa: form.get("empresa") as string,
      mensaje: form.get("mensaje") as string,
    })

    if (!error) {
      setIsSubmitted(true)
    }
  }

  return (
    <div className="max-w-5xl mx-auto space-y-16">
      {/* Hero */}
      <div className="text-center space-y-6">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
          <span className="text-foreground">Hablemos de </span>
          <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            tu proyecto
          </span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Cuéntanos qué necesitas y te proponemos una solución personalizada en menos de 24 horas.
        </p>
      </div>

      {/* Contact methods */}
      <div className="grid sm:grid-cols-3 gap-6">
        {contactMethods.map((method) => (
          <a
            key={method.title}
            href={method.action}
            className="p-6 rounded-2xl border border-border bg-card/50 hover:bg-card/80 transition-all hover:scale-[1.02] space-y-3 block"
          >
            <method.icon className="w-8 h-8 text-primary" />
            <h3 className="font-bold text-lg">{method.title}</h3>
            <p className="text-sm text-muted-foreground">{method.description}</p>
            <p className="text-sm text-primary font-medium">{method.actionLabel}</p>
          </a>
        ))}
      </div>

      {/* Form + Offices */}
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Form */}
        <div className="p-8 rounded-2xl border border-border bg-card/50 space-y-6">
          {isSubmitted ? (
            <div className="text-center space-y-4 py-8">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
                <Check className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">Mensaje enviado</h2>
              <p className="text-muted-foreground">
                Te responderemos en menos de 24 horas.
              </p>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-bold">Envíanos un mensaje</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nombre">Nombre *</Label>
                    <Input id="nombre" name="nombre" required placeholder="Tu nombre" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="empresa">Empresa</Label>
                    <Input id="empresa" name="empresa" placeholder="Tu empresa" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" name="email" type="email" required placeholder="tu@empresa.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telefono">Teléfono</Label>
                    <Input id="telefono" name="telefono" type="tel" placeholder="+34 600 000 000" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mensaje">Mensaje *</Label>
                  <Textarea
                    id="mensaje"
                    name="mensaje"
                    required
                    placeholder="Cuéntanos cómo podemos ayudarte..."
                    rows={4}
                  />
                </div>
                <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                  {isLoading ? "Enviando..." : (
                    <>
                      Enviar mensaje
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
                {error && (
                  <p className="text-sm text-red-500 text-center">
                    Error: {error}. Intenta de nuevo o llámanos directamente.
                  </p>
                )}
                <p className="text-xs text-muted-foreground text-center">
                  Al enviar, aceptas nuestra{" "}
                  <Link href="/privacidad" className="underline hover:text-foreground">
                    política de privacidad
                  </Link>.
                </p>
              </form>
            </>
          )}
        </div>

        {/* Offices */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold">Nuestras oficinas</h2>
          {offices.map((office) => (
            <div
              key={office.city}
              className="p-6 rounded-2xl border border-border bg-card/50 space-y-3"
            >
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                <h3 className="font-bold text-lg">
                  {office.city}, {office.country}
                </h3>
              </div>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>{office.address}</p>
                <p>{office.zip}</p>
              </div>
              <div className="space-y-1 text-sm">
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <a href={`tel:${office.phone.replace(/\s/g, "")}`} className="hover:text-primary">
                    {office.phone}
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <a href={`mailto:${office.email}`} className="hover:text-primary">
                    {office.email}
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  {office.hours}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
