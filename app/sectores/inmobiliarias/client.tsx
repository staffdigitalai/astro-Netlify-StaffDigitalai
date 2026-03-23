"use client"

import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import Aurora from "@/components/Aurora"
import { Footer } from "@/components/footer"
import { SectorPageTemplate } from "@/components/sector-page-template"
import { ConversationSimulator } from "@/components/conversation-simulator"
import { getConversationsForSector } from "@/lib/conversation-data"
import type { SectorPageData } from "@/components/sector-page-template"
import { Clock, Phone, CalendarX, FileText, Users, AlertTriangle, CalendarCheck, MessageSquare, Home, BarChart3, Camera, MapPin } from "lucide-react"

const data: SectorPageData = {
  sectorName: "Inmobiliarias",
  badge: "StaffDigital AI para Inmobiliarias",
  headline: "Vende Propiedades",
  headlineAccent: "Mientras Duermes",
  subheadline: "Cualifica leads, agenda visitas y responde consultas de compradores e inquilinos con un asistente IA disponible 24/7.",
  lossStatement: "Las inmobiliarias pierden hasta",
  lossValue: "€80K+",
  lossValueNum: 80,
  lossSuffix: "anuales por leads no atendidos a tiempo",
  painPoints: [
    { icon: Phone, title: "Leads sin respuesta", description: "El 78% de compradores contacta con la primera inmobiliaria que responde. Perder minutos significa perder ventas." },
    { icon: CalendarX, title: "Visitas canceladas", description: "Visitas que se pierden por falta de confirmacion o cambios de ultima hora sin gestion automatica." },
    { icon: Clock, title: "Consultas repetitivas", description: "Tu equipo responde las mismas preguntas sobre ubicacion, precio y caracteristicas cientos de veces." },
    { icon: FileText, title: "Cualificacion manual", description: "Agentes dedicando horas a filtrar leads que no estan listos para comprar o no cumplen requisitos." },
    { icon: Users, title: "Seguimiento inconsistente", description: "Leads prometedores que se enfrian porque nadie hace seguimiento oportuno y personalizado." },
    { icon: AlertTriangle, title: "Informacion desactualizada", description: "Propiedades vendidas que siguen recibiendo consultas o precios no actualizados en portales." },
  ],
  features: [
    { icon: MessageSquare, title: "Cualificacion Automatica de Leads", description: "El asistente IA identifica presupuesto, zona preferida, numero de habitaciones y urgencia de compra antes de pasar el lead a un agente.", highlight: "3x mas leads cualificados" },
    { icon: CalendarCheck, title: "Gestion Inteligente de Visitas", description: "Agenda, confirma y reagenda visitas automaticamente. Envia recordatorios con direccion y detalles de la propiedad.", highlight: "-70% cancelaciones" },
    { icon: Home, title: "Asistente Virtual de Propiedades", description: "Responde preguntas sobre cada inmueble: metros cuadrados, gastos de comunidad, orientacion, reformas y mas. 24 horas, 7 dias." },
    { icon: BarChart3, title: "Dashboard de Rendimiento", description: "Visualiza conversion de leads, propiedades mas demandadas, tiempo medio de venta y rendimiento por agente en tiempo real." },
    { icon: Camera, title: "Integracion con Home Staging IA", description: "Conecta con nuestro servicio de preparacion de propiedades para fotos profesionales y landing pages optimizadas." },
    { icon: MapPin, title: "Respuestas Contextuales por Zona", description: "El asistente conoce cada barrio: colegios cercanos, transporte, comercios y tendencias de precios para convencer a compradores." },
  ],
  stats: [
    { value: "3x", label: "Mas leads cualificados" },
    { value: "-70%", label: "Cancelacion visitas" },
    { value: "24/7", label: "Atencion a compradores" },
    { value: "<2min", label: "Tiempo de respuesta" },
  ],
  ctaTitle: "Listo para vender mas",
  ctaAccent: "propiedades con IA?",
  ctaDescription: "Unete a inmobiliarias que ya cualifican leads y agendan visitas automaticamente con inteligencia artificial.",
}

export function InmobiliariasClient() {
  const conversations = getConversationsForSector("inmobiliarias")

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
              title="Tu IA Cualificando Compradores"
              subtitle="Mira como nuestros asistentes cualifican leads y agendan visitas a propiedades."
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
