"use client"

import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import Aurora from "@/components/Aurora"
import { Footer } from "@/components/footer"
import { SectorPageTemplate } from "@/components/sector-page-template"
import { ConversationSimulator } from "@/components/conversation-simulator"
import { getConversationsForSector } from "@/lib/conversation-data"
import type { SectorPageData } from "@/components/sector-page-template"
import { Building, Phone, Calendar, Users, Mail, AlertTriangle, Headphones, MessageSquare, Shield, BarChart3 } from "lucide-react"

const data: SectorPageData = {
  sectorName: "Oficinas y Condominios",
  badge: "StaffDigital AI para Edificios",
  headline: "Recepcion Digital",
  headlineAccent: "Siempre Activa",
  subheadline: "Gestiona visitas, reservas de espacios y comunicacion con inquilinos o empleados de forma automatica e inteligente.",
  lossStatement: "La gestion ineficiente cuesta hasta",
  lossValue: "€25K+",
  lossValueNum: 25,
  lossSuffix: "anuales en costes operativos innecesarios",
  painPoints: [
    { icon: Phone, title: "Recepcion desbordada", description: "Llamadas constantes para reservar salas, preguntar por servicios o reportar incidencias." },
    { icon: Calendar, title: "Reservas conflictivas", description: "Dobles reservas de salas de reuniones, conflictos de horarios y espacios infrautilizados." },
    { icon: Users, title: "Gestion de visitas manual", description: "Control de accesos y registro de visitantes ineficiente que compromete la seguridad." },
    { icon: Mail, title: "Comunicacion fragmentada", description: "Avisos importantes que no llegan a todos los inquilinos o empleados a tiempo." },
    { icon: AlertTriangle, title: "Incidencias sin seguimiento", description: "Reportes de mantenimiento que se pierden y no se resuelven a tiempo." },
    { icon: Building, title: "Servicios descoordinados", description: "Limpieza, mantenimiento y seguridad sin coordinacion eficiente entre ellos." },
  ],
  features: [
    { icon: Headphones, title: "Recepcion Virtual IA", description: "Atiende llamadas y mensajes de inquilinos, visitantes y proveedores. Gestiona el registro de visitas y control de accesos automaticamente.", highlight: "-70% carga en recepcion" },
    { icon: Calendar, title: "Reservas Inteligentes de Espacios", description: "Sistema automatizado de reserva de salas, puestos de trabajo y espacios comunes que optimiza la ocupacion y evita conflictos." },
    { icon: MessageSquare, title: "Comunicacion Centralizada", description: "Envia avisos, notificaciones de mantenimiento y comunicados a todos los inquilinos por el canal que prefieran." },
    { icon: Shield, title: "Gestion de Incidencias", description: "Los inquilinos reportan problemas por chat o voz, la IA los clasifica, prioriza y asigna al equipo correspondiente.", highlight: "Resolucion 3x mas rapida" },
  ],
  stats: [
    { value: "-70%", label: "Carga en recepcion" },
    { value: "3x", label: "Velocidad resolucion" },
    { value: "24/7", label: "Atencion a inquilinos" },
    { value: "95%", label: "Satisfaccion inquilinos" },
  ],
  ctaTitle: "Listo para digitalizar tu",
  ctaAccent: "edificio con IA?",
  ctaDescription: "Unete a edificios y condominios que ya gestionan sus operaciones con inteligencia artificial.",
}

export function SectorPageClient() {
  const conversations = getConversationsForSector("oficinas")

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
              subtitle="Mira como nuestros asistentes gestionan reservas de salas y consultas de inquilinos."
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
