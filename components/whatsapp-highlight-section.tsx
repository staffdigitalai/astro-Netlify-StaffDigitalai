"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MessageSquare, ArrowRight, CheckCircle2, Smartphone } from "lucide-react"

const features = [
  "Respuesta instantanea <5 segundos",
  "Disponible 24/7, festivos incluidos",
  "Integracion con tu CRM existente",
  "Sin instalacion de apps",
]

const stats = [
  { value: "90%+", label: "Penetracion WhatsApp" },
  { value: "-70%", label: "Tickets de soporte" },
  { value: "+35%", label: "Conversion ventas" },
]

export function WhatsAppHighlightSection() {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Green gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-transparent to-emerald-500/10 pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-500/20 backdrop-blur-md border border-green-500/30 text-white text-sm font-medium mb-6">
              <MessageSquare className="w-4 h-4 mr-2 text-green-400" />
              Nuevo: WhatsApp IA para Empresas
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
              Automatiza tu atencion en el{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">
                canal #1 de Espana
              </span>
            </h2>
            
            <p className="text-lg text-white/70 mb-6 leading-relaxed">
              Tus clientes ya usan WhatsApp. Atiendeles donde prefieren con agentes IA 
              que responden, venden y agendan citas automaticamente.
            </p>

            {/* Features */}
            <div className="space-y-3 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-white/80">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-green-500 hover:bg-green-600 text-white font-semibold"
                asChild
              >
                <Link href="/soluciones/whatsapp-ia-empresas">
                  <Smartphone className="w-5 h-5 mr-2" />
                  Descubrir WhatsApp IA
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/20 text-white hover:bg-white/10"
                asChild
              >
                <Link href="/demo">
                  Ver demo en vivo
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Stats Card */}
          <div className="relative">
            <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/10 backdrop-blur-sm border border-green-500/30 rounded-3xl p-8">
              {/* WhatsApp mockup header */}
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                <div className="w-12 h-12 rounded-full bg-green-500/30 flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Tu Asistente IA</h3>
                  <p className="text-green-400 text-sm">en linea</p>
                </div>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-green-400">{stat.value}</div>
                    <div className="text-xs text-white/60">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Sample messages */}
              <div className="space-y-3">
                <div className="flex justify-end">
                  <div className="bg-green-500/30 border border-green-500/40 rounded-2xl rounded-br-sm px-4 py-2 max-w-[80%]">
                    <p className="text-white text-sm">Hola, quiero reservar una cita para manana</p>
                    <span className="text-xs text-white/40">10:30</span>
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="bg-white/10 border border-white/20 rounded-2xl rounded-bl-sm px-4 py-2 max-w-[80%]">
                    <p className="text-white text-sm">Buenos dias! Tenemos hueco a las 10:00 y 16:30. Cual prefiere?</p>
                    <span className="text-xs text-white/40">10:30</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-green-500/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  )
}
