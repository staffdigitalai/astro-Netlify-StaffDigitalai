"use client"

import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import Aurora from "@/components/Aurora"
import { Footer } from "@/components/footer"
import { SectorPageTemplate } from "@/components/sector-page-template"
import { ConversationSimulator } from "@/components/conversation-simulator"
import { getConversationsForSector } from "@/lib/conversation-data"
import type { SectorPageData } from "@/components/sector-page-template"
import { Phone, Clock, CalendarX, CreditCard, Users, AlertTriangle, CalendarCheck, MessageSquare, Stethoscope, BarChart3 } from "lucide-react"

const data: SectorPageData = {
  sectorName: "Clinicas Dentales",
  badge: "StaffDigital AI para Dentistas",
  headline: "Tu Clinica Dental",
  headlineAccent: "Siempre Disponible",
  subheadline: "Gestiona citas, responde consultas sobre tratamientos y reduce no-shows con un asistente IA que trabaja para ti 24/7.",
  lossStatement: "Las clinicas dentales pierden hasta",
  lossValue: "€40K+",
  lossValueNum: 40,
  lossSuffix: "anuales por citas perdidas y no-shows",
  painPoints: [
    { icon: Phone, title: "Llamadas sin contestar", description: "Pacientes que intentan reservar cita durante tratamientos y no consiguen contactar con la clinica." },
    { icon: CalendarX, title: "No-shows constantes", description: "Hasta un 25% de pacientes no acuden a su cita, dejando huecos imposibles de rellenar a ultima hora." },
    { icon: Clock, title: "Recepcion multitarea", description: "La recepcionista atiende telefono, cobra, gestiona seguros y recibe pacientes simultaneamente." },
    { icon: CreditCard, title: "Presupuestos sin seguimiento", description: "Pacientes que reciben presupuesto y nunca reciben un recordatorio para confirmar el tratamiento." },
    { icon: Users, title: "Primera visita perdida", description: "Pacientes potenciales que preguntan por WhatsApp o redes y no reciben respuesta rapida." },
    { icon: AlertTriangle, title: "Recordatorios manuales", description: "Personal dedicando tiempo a llamar pacientes uno por uno para confirmar citas del dia siguiente." },
  ],
  features: [
    { icon: CalendarCheck, title: "Gestion de Citas Inteligente", description: "Reserva, modifica y cancela citas por telefono, WhatsApp o web. Rellena huecos automaticamente contactando pacientes en lista de espera.", highlight: "Reduccion del 80% en no-shows" },
    { icon: MessageSquare, title: "Consultas sobre Tratamientos", description: "Responde preguntas frecuentes sobre ortodoncia, implantes, blanqueamiento, precios y seguros de forma natural y personalizada." },
    { icon: Stethoscope, title: "Seguimiento Post-Tratamiento", description: "Envia instrucciones de cuidado tras intervenciones, recoge feedback del paciente y programa revisiones automaticamente." },
    { icon: BarChart3, title: "Conversion de Presupuestos", description: "Seguimiento automatico de presupuestos pendientes con recordatorios personalizados que aumentan la tasa de aceptacion.", highlight: "+30% conversion de presupuestos" },
  ],
  stats: [
    { value: "-80%", label: "Reduccion de no-shows" },
    { value: "+30%", label: "Conversion presupuestos" },
    { value: "24/7", label: "Atencion al paciente" },
    { value: "3s", label: "Tiempo de respuesta" },
  ],
  ctaTitle: "Listo para transformar tu",
  ctaAccent: "clinica dental con IA?",
  ctaDescription: "Unete a clinicas dentales que ya gestionan su agenda y pacientes con inteligencia artificial.",
}

export function SectorPageClient() {
  const conversations = getConversationsForSector("dentistas")

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
              subtitle="Mira como nuestros asistentes gestionan citas, urgencias y consultas dentales."
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
