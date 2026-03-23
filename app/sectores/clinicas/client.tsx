"use client"

import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import Aurora from "@/components/Aurora"
import { Footer } from "@/components/footer"
import { SectorPageTemplate } from "@/components/sector-page-template"
import { ConversationSimulator } from "@/components/conversation-simulator"
import { getConversationsForSector } from "@/lib/conversation-data"
import type { SectorPageData } from "@/components/sector-page-template"
import { Clock, Phone, CalendarX, FileText, Users, AlertTriangle, CalendarCheck, MessageSquare, Stethoscope, BarChart3 } from "lucide-react"

const data: SectorPageData = {
  sectorName: "Clinicas",
  badge: "StaffDigital AI para Clinicas",
  headline: "Tu Recepcion",
  headlineAccent: "Nunca Cierra",
  subheadline: "Gestiona citas, responde consultas de pacientes y reduce no-shows con un asistente IA disponible 24 horas, 7 dias.",
  lossStatement: "Las clinicas pierden hasta",
  lossValue: "€50K+",
  lossValueNum: 50,
  lossSuffix: "anuales por citas perdidas y no-shows",
  painPoints: [
    { icon: Phone, title: "Llamadas sin contestar", description: "Pacientes que llaman fuera de horario o durante horas punta y no consiguen reservar cita." },
    { icon: CalendarX, title: "No-shows frecuentes", description: "Hasta un 30% de citas se pierden por falta de recordatorios y confirmaciones automaticas." },
    { icon: Clock, title: "Recepcion saturada", description: "Personal administrativo dedicando horas a tareas repetitivas en lugar de atencion al paciente." },
    { icon: FileText, title: "Gestion manual de citas", description: "Agendas desorganizadas, dobles reservas y huecos sin rellenar que reducen la facturacion." },
    { icon: Users, title: "Listas de espera ineficientes", description: "Pacientes en lista de espera que no se contactan cuando surgen cancelaciones." },
    { icon: AlertTriangle, title: "Informacion inconsistente", description: "Pacientes reciben informacion diferente segun quien conteste el telefono." },
  ],
  features: [
    { icon: CalendarCheck, title: "Gestion Inteligente de Citas", description: "Reserva, modifica y cancela citas automaticamente por telefono, WhatsApp o web. Rellena huecos contactando pacientes en lista de espera.", highlight: "Reduccion del 80% en no-shows" },
    { icon: MessageSquare, title: "Atencion al Paciente 24/7", description: "Responde preguntas sobre servicios, precios, preparacion para consultas y horarios a cualquier hora del dia o la noche." },
    { icon: Stethoscope, title: "Triaje Inicial Automatizado", description: "Recoge sintomas y motivo de consulta antes de la cita para que el medico tenga contexto previo. Deriva urgencias al personal adecuado." },
    { icon: BarChart3, title: "Dashboard de Rendimiento", description: "Visualiza tasas de ocupacion, motivos de consulta mas frecuentes y satisfaccion del paciente en tiempo real.", highlight: "+35% de ocupacion de agenda" },
  ],
  stats: [
    { value: "-80%", label: "Reduccion de no-shows" },
    { value: "+35%", label: "Ocupacion de agenda" },
    { value: "24/7", label: "Atencion al paciente" },
    { value: "3s", label: "Tiempo de respuesta" },
  ],
  ctaTitle: "Listo para optimizar tu",
  ctaAccent: "clinica con IA?",
  ctaDescription: "Unete a clinicas que ya gestionan su agenda y pacientes con inteligencia artificial.",
}

export function SectorPageClient() {
  const conversations = getConversationsForSector("clinicas")

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
              title="Tu IA Gestionando Pacientes"
              subtitle="Mira como nuestros asistentes gestionan citas, urgencias y consultas de pacientes."
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
