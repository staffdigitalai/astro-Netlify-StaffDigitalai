"use client"

import { useState, useRef } from "react"
import { Phone, Volume2, VolumeX, Play, Pause, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface AudioSample {
  id: string
  label: string
  description: string
  scenario: string
  traditional: string // placeholder — will be real audio URLs
  humanVoice: string
}

const samples: AudioSample[] = [
  {
    id: "reception",
    label: "Recepción de llamada",
    description: "Un cliente llama para pedir información",
    scenario: "\"Hola, quería información sobre sus servicios de seguridad para mi empresa.\"",
    traditional: "/audio/traditional-reception.mp3",
    humanVoice: "/audio/human-reception.mp3",
  },
  {
    id: "booking",
    label: "Reserva de cita",
    description: "Un paciente llama para agendar una consulta",
    scenario: "\"Buenos días, me gustaría pedir cita para la semana que viene.\"",
    traditional: "/audio/traditional-booking.mp3",
    humanVoice: "/audio/human-booking.mp3",
  },
  {
    id: "support",
    label: "Soporte técnico",
    description: "Un cliente llama con un problema técnico",
    scenario: "\"Llamo porque mi sistema no funciona desde esta mañana.\"",
    traditional: "/audio/traditional-support.mp3",
    humanVoice: "/audio/human-support.mp3",
  },
]

function ComparisonCard({
  title,
  icon,
  features,
  variant,
}: {
  title: string
  icon: React.ReactNode
  features: string[]
  variant: "old" | "new"
}) {
  return (
    <div
      className={`p-6 rounded-2xl border ${
        variant === "old"
          ? "border-red-500/20 bg-red-500/5"
          : "border-emerald-500/20 bg-emerald-500/5"
      }`}
    >
      <div className="flex items-center gap-3 mb-4">
        {icon}
        <h3 className="text-lg font-bold">{title}</h3>
      </div>
      <ul className="space-y-2">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
            <span className={variant === "old" ? "text-red-400" : "text-emerald-400"}>
              {variant === "old" ? "✗" : "✓"}
            </span>
            {f}
          </li>
        ))}
      </ul>
    </div>
  )
}

export function DemoVoiceClient() {
  const [activeSample, setActiveSample] = useState(0)
  const [audioPlaceholder, setAudioPlaceholder] = useState(false)

  return (
    <div className="max-w-5xl mx-auto space-y-16">
      {/* Hero */}
      <div className="text-center space-y-6">
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium">
          <Volume2 className="w-4 h-4 mr-2" />
          Escucha la diferencia
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
          <span className="text-foreground">Voz Robótica vs </span>
          <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
            Voz Humana IA
          </span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Nuestros agentes IA utilizan tecnología de voz humana propietaria.
          El resultado: conversaciones indistinguibles de una persona real.
        </p>
      </div>

      {/* Audio comparison */}
      <div className="space-y-8">
        {/* Scenario tabs */}
        <div className="flex flex-wrap justify-center gap-3">
          {samples.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setActiveSample(i)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeSample === i
                  ? "bg-white text-black"
                  : "bg-white/10 text-white/70 hover:bg-white/20"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Scenario description */}
        <div className="text-center">
          <p className="text-muted-foreground">{samples[activeSample].description}</p>
          <p className="text-sm text-white/50 mt-2 italic">
            Cliente dice: {samples[activeSample].scenario}
          </p>
        </div>

        {/* Audio players side by side */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Traditional */}
          <div className="p-6 rounded-2xl border border-red-500/20 bg-red-500/5 space-y-4">
            <div className="flex items-center gap-3">
              <VolumeX className="w-5 h-5 text-red-400" />
              <h3 className="font-bold text-red-400">Voz Robótica Tradicional</h3>
            </div>
            <div className="bg-black/30 rounded-xl p-4 flex items-center justify-center min-h-[80px]">
              <Button
                variant="outline"
                size="sm"
                className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                onClick={() => setAudioPlaceholder(true)}
              >
                <Play className="w-4 h-4 mr-2" />
                Reproducir voz robótica
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              IVR típico con voz sintetizada, pausas artificiales y entonación monótona.
            </p>
          </div>

          {/* Human Voice IA */}
          <div className="p-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 space-y-4">
            <div className="flex items-center gap-3">
              <Volume2 className="w-5 h-5 text-emerald-400" />
              <h3 className="font-bold text-emerald-400">Voz Humana IA — StaffDigital</h3>
            </div>
            <div className="bg-black/30 rounded-xl p-4 flex items-center justify-center min-h-[80px]">
              <Button
                variant="outline"
                size="sm"
                className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"
                onClick={() => setAudioPlaceholder(true)}
              >
                <Play className="w-4 h-4 mr-2" />
                Reproducir voz humana
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Tecnología de voz humana propietaria. Entonación natural, emociones, pausas orgánicas.
            </p>
          </div>
        </div>

        {audioPlaceholder && (
          <p className="text-center text-sm text-amber-400">
            Las muestras de audio estarán disponibles próximamente. Mientras tanto,{" "}
            <Link href="/demo" className="underline hover:text-white">
              solicita una demo en vivo
            </Link>{" "}
            para escuchar a nuestros agentes IA en acción.
          </p>
        )}
      </div>

      {/* Comparison table */}
      <div className="grid md:grid-cols-2 gap-6">
        <ComparisonCard
          title="IVR / Voz Robótica"
          icon={<VolumeX className="w-6 h-6 text-red-400" />}
          variant="old"
          features={[
            "Entonación monótona y artificial",
            "Menús interminables: 'Pulse 1 para...'",
            "No entiende contexto ni emociones",
            "Los clientes cuelgan frustrados",
            "Sin capacidad de improvisación",
            "Experiencia fría e impersonal",
          ]}
        />
        <ComparisonCard
          title="Voz Humana IA — StaffDigital"
          icon={<Volume2 className="w-6 h-6 text-emerald-400" />}
          variant="new"
          features={[
            "Indistinguible de una persona real",
            "Conversación natural y fluida",
            "Entiende contexto, ironía y emociones",
            "Los clientes se sienten escuchados",
            "Se adapta a cada situación",
            "Voz masculina y femenina disponible",
          ]}
        />
      </div>

      {/* Live test CTA */}
      <div className="text-center p-8 rounded-2xl border border-border bg-card/50 space-y-6">
        <Phone className="w-12 h-12 text-emerald-400 mx-auto" />
        <h2 className="text-2xl md:text-3xl font-bold">
          Pruébalo ahora mismo
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Llama al número de demostración y habla con nuestro agente IA.
          Verás que es imposible distinguirlo de una persona real.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-8">
            <a href="tel:+34931229129">
              <Phone className="w-4 h-4 mr-2" />
              Llamar al +34 931 229 129
            </a>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full px-8">
            <Link href="/demo">
              Solicitar demo personalizada
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Llamada gratuita. El agente IA atenderá en español.
        </p>
      </div>
    </div>
  )
}
