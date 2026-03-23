"use client"

import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import Aurora from "@/components/Aurora"
import { Footer } from "@/components/footer"
import { SectorPageTemplate } from "@/components/sector-page-template"
import { ConversationSimulator } from "@/components/conversation-simulator"
import { getConversationsForSector } from "@/lib/conversation-data"
import type { SectorPageData } from "@/components/sector-page-template"
import { Wrench, Phone, Clock, FileText, MapPin, AlertTriangle, Headphones, MessageSquare, CalendarCheck, BarChart3 } from "lucide-react"

const data: SectorPageData = {
  sectorName: "Servicios Tecnicos",
  badge: "StaffDigital AI para SAT",
  headline: "Avisos Gestionados,",
  headlineAccent: "Tecnicos Coordinados",
  subheadline: "Recibe avisos de averia, coordina tecnicos en campo y mantiene a tus clientes informados del estado de su reparacion automaticamente.",
  lossStatement: "Los SAT pierden hasta",
  lossValue: "€45K+",
  lossValueNum: 45,
  lossSuffix: "anuales por ineficiencias en coordinacion",
  painPoints: [
    { icon: Phone, title: "Avalancha de llamadas", description: "Clientes reportando averias por telefono que colapsan la centralita en horas punta." },
    { icon: Clock, title: "Tiempos de espera largos", description: "Clientes frustrados esperando respuesta sobre cuando llegara el tecnico." },
    { icon: MapPin, title: "Rutas ineficientes", description: "Tecnicos desplazandose sin una planificacion optimizada de rutas y prioridades." },
    { icon: FileText, title: "Partes de trabajo en papel", description: "Documentacion manual que se pierde, se retrasa y genera errores de facturacion." },
    { icon: AlertTriangle, title: "Falta de seguimiento", description: "Clientes que no saben el estado de su reparacion y llaman repetidamente para preguntar." },
    { icon: Wrench, title: "Diagnostico lento", description: "Tecnicos que llegan sin contexto sobre el problema y necesitan mas tiempo para resolverlo." },
  ],
  features: [
    { icon: Headphones, title: "Recepcion de Avisos IA", description: "Recoge datos del aviso por telefono, WhatsApp o web: tipo de averia, urgencia, ubicacion y disponibilidad del cliente. Sin colas de espera.", highlight: "-85% tiempo de registro" },
    { icon: CalendarCheck, title: "Asignacion Inteligente", description: "Asigna automaticamente el tecnico mas adecuado segun especialidad, ubicacion y carga de trabajo. Optimiza rutas para maximizar intervenciones diarias." },
    { icon: MessageSquare, title: "Actualizaciones Proactivas", description: "El cliente recibe notificaciones automaticas: confirmacion del aviso, hora estimada de llegada, y estado de la reparacion en tiempo real." },
    { icon: BarChart3, title: "Analisis de Rendimiento", description: "Metricas de tiempo de respuesta, tasa de resolucion en primera visita y satisfaccion del cliente para optimizar tu operacion.", highlight: "+45% productividad tecnicos" },
  ],
  stats: [
    { value: "-85%", label: "Tiempo de registro" },
    { value: "+45%", label: "Productividad tecnicos" },
    { value: "24/7", label: "Recepcion de avisos" },
    { value: "92%", label: "Resolucion 1a visita" },
  ],
  ctaTitle: "Listo para optimizar tu",
  ctaAccent: "servicio tecnico con IA?",
  ctaDescription: "Unete a empresas de asistencia tecnica que ya coordinan sus operaciones con inteligencia artificial.",
}

export function SectorPageClient() {
  const conversations = getConversationsForSector("servicios-tecnicos")

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
              title="Tu IA Recibiendo Avisos"
              subtitle="Mira como nuestros asistentes gestionan avisos de averia y coordinan tecnicos."
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
