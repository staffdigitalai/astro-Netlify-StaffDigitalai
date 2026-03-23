"use client"

import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import Aurora from "@/components/Aurora"
import { Footer } from "@/components/footer"
import { SectorPageTemplate } from "@/components/sector-page-template"
import { ConversationSimulator } from "@/components/conversation-simulator"
import { getConversationsForSector } from "@/lib/conversation-data"
import type { SectorPageData } from "@/components/sector-page-template"
import { Phone, Clock, CalendarX, Users, Star, AlertTriangle, CalendarCheck, MessageSquare, Sparkles, BarChart3 } from "lucide-react"

const data: SectorPageData = {
  sectorName: "Peluquerias y Salones",
  badge: "StaffDigital AI para Salones de Belleza",
  headline: "Agenda Llena,",
  headlineAccent: "Clientes Felices",
  subheadline: "Automatiza reservas, gestiona cancelaciones y fideliza a tus clientes con un asistente IA que trabaja mientras tu creas.",
  lossStatement: "Los salones pierden hasta",
  lossValue: "€30K+",
  lossValueNum: 30,
  lossSuffix: "anuales por citas canceladas y huecos vacios",
  painPoints: [
    { icon: Phone, title: "Llamadas durante servicios", description: "El telefono suena mientras estas con un cliente y pierdes la reserva porque no puedes contestar." },
    { icon: CalendarX, title: "Cancelaciones de ultima hora", description: "Clientes que cancelan sin previo aviso y dejan huecos imposibles de rellenar a tiempo." },
    { icon: Clock, title: "Gestion manual de agenda", description: "Horas dedicadas a cuadrar horarios, estilistas y servicios en una agenda cada vez mas compleja." },
    { icon: Users, title: "Clientes que no vuelven", description: "Sin sistema de seguimiento, pierdes clientes que simplemente olvidan volver." },
    { icon: Star, title: "Sin resenas proactivas", description: "Clientes satisfechos que nunca dejan resena porque nadie se lo pide en el momento adecuado." },
    { icon: AlertTriangle, title: "Mensajes sin responder", description: "Consultas por Instagram y WhatsApp sobre disponibilidad, precios y servicios que quedan sin atender." },
  ],
  features: [
    { icon: CalendarCheck, title: "Reservas Automaticas 24/7", description: "Los clientes reservan cita por WhatsApp, Instagram, web o telefono a cualquier hora. La IA sugiere horarios segun estilista y servicio.", highlight: "+40% reservas fuera de horario" },
    { icon: MessageSquare, title: "Gestion de Cancelaciones", description: "Cuando alguien cancela, la IA contacta automaticamente a clientes en lista de espera para rellenar el hueco al instante." },
    { icon: Sparkles, title: "Fidelizacion Inteligente", description: "Recordatorios personalizados de retoques, cumpleanos y promociones especiales. Solicita resenas automaticamente a clientes satisfechos." },
    { icon: BarChart3, title: "Optimizacion de Agenda", description: "Analiza patrones de reserva, horas punta y servicios mas demandados para maximizar la ocupacion de cada estilista.", highlight: "95% ocupacion de agenda" },
  ],
  stats: [
    { value: "+40%", label: "Reservas fuera de horario" },
    { value: "95%", label: "Ocupacion de agenda" },
    { value: "24/7", label: "Atencion automatica" },
    { value: "-90%", label: "Huecos por cancelacion" },
  ],
  ctaTitle: "Listo para llenar la agenda de tu",
  ctaAccent: "salon con IA?",
  ctaDescription: "Unete a peluquerias y salones que ya gestionan sus reservas con inteligencia artificial.",
}

export function SectorPageClient() {
  const conversations = getConversationsForSector("peluquerias")

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      <main className="min-h-screen relative overflow-hidden">
        <div className="fixed inset-0 w-full h-full">
          <Aurora colorStops={["#475569", "#64748b", "#475569"]} amplitude={1.2} blend={0.6} speed={0.8} />
        </div>
        <div className="relative z-10">
          <GlassmorphismNav />
          <SectorPageTemplate data={data} />
          {conversations.length > 0 && (
            <ConversationSimulator
              title="Tu IA Gestionando Citas"
              subtitle="Mira como nuestros asistentes gestionan reservas de servicios y cancelaciones."
              badge="Simulacion en Vivo"
              badgeIcon="whatsapp"
              simulations={conversations}
            />
          )}
          <Footer />
        </div>
      </main>
    </div>
  )
}
