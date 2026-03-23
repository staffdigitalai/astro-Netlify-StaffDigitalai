"use client"

import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import Aurora from "@/components/Aurora"
import { Footer } from "@/components/footer"
import { SectorPageTemplate } from "@/components/sector-page-template"
import { ConversationSimulator } from "@/components/conversation-simulator"
import { getConversationsForSector } from "@/lib/conversation-data"
import type { SectorPageData } from "@/components/sector-page-template"
import { Phone, Clock, CalendarX, UtensilsCrossed, Users, AlertTriangle, CalendarCheck, MessageSquare, Star, BarChart3 } from "lucide-react"

const data: SectorPageData = {
  sectorName: "Restaurantes",
  badge: "StaffDigital AI para Restauracion",
  headline: "Mesas Llenas,",
  headlineAccent: "Servicio Impecable",
  subheadline: "Gestiona reservas, responde consultas sobre el menu y reduce no-shows con un asistente IA que atiende mientras tu cocinas.",
  lossStatement: "Los restaurantes pierden hasta",
  lossValue: "€35K+",
  lossValueNum: 35,
  lossSuffix: "anuales por reservas perdidas y no-shows",
  painPoints: [
    { icon: Phone, title: "Llamadas en pleno servicio", description: "El telefono suena durante el servicio y nadie puede contestar, perdiendo reservas y pedidos." },
    { icon: CalendarX, title: "No-shows constantes", description: "Mesas reservadas que quedan vacias porque el cliente no aviso de la cancelacion." },
    { icon: Clock, title: "Consultas repetitivas", description: "Preguntas constantes sobre horarios, menu, alergenos, precios y disponibilidad que consumen tiempo." },
    { icon: UtensilsCrossed, title: "Pedidos a domicilio caidos", description: "Pedidos para llevar que se pierden por falta de atencion en canales digitales." },
    { icon: Users, title: "Eventos sin seguimiento", description: "Consultas para eventos, grupos y celebraciones que no se gestionan a tiempo." },
    { icon: AlertTriangle, title: "Resenas sin responder", description: "Opiniones en Google y redes sociales que quedan sin respuesta afectando la reputacion." },
  ],
  features: [
    { icon: CalendarCheck, title: "Reservas Inteligentes 24/7", description: "Acepta reservas por telefono, WhatsApp, Instagram y web automaticamente. Gestiona listas de espera y confirma con el cliente.", highlight: "+50% reservas fuera de horario" },
    { icon: MessageSquare, title: "Asistente de Menu y Alergenos", description: "Responde preguntas sobre platos, ingredientes, alergenos y opciones especiales de forma precisa e inmediata en cualquier canal." },
    { icon: Star, title: "Gestion de Reputacion", description: "Solicita resenas a clientes satisfechos automaticamente y alerta sobre opiniones negativas para responder rapidamente." },
    { icon: BarChart3, title: "Optimizacion de Ocupacion", description: "Analiza patrones de reserva, horas punta y preferencias de clientes para maximizar la rotacion de mesas.", highlight: "95% ocupacion en servicio" },
  ],
  stats: [
    { value: "+50%", label: "Reservas fuera de horario" },
    { value: "-75%", label: "Reduccion de no-shows" },
    { value: "24/7", label: "Atencion automatica" },
    { value: "95%", label: "Ocupacion de mesas" },
  ],
  ctaTitle: "Listo para llenar las mesas de tu",
  ctaAccent: "restaurante con IA?",
  ctaDescription: "Unete a restaurantes que ya gestionan sus reservas y atencion con inteligencia artificial.",
}

export function SectorPageClient() {
  const conversations = getConversationsForSector("restaurantes")

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
              title="Tu IA Gestionando Reservas"
              subtitle="Mira como nuestros asistentes gestionan reservas, consultas de menu y pedidos."
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
