"use client"

import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import Aurora from "@/components/Aurora"
import { Footer } from "@/components/footer"
import { SectorPageTemplate } from "@/components/sector-page-template"
import { ConversationSimulator } from "@/components/conversation-simulator"
import { getConversationsForSector } from "@/lib/conversation-data"
import type { SectorPageData } from "@/components/sector-page-template"
import { Truck, Clock, Package, AlertTriangle, PhoneOff, FileText, MessageSquare, BarChart3, MapPin, Bell } from "lucide-react"

const data: SectorPageData = {
  sectorName: "Almacenes y Logistica",
  badge: "StaffDigital AI para Logistica",
  headline: "Operaciones Sin",
  headlineAccent: "Interrupciones",
  subheadline: "Coordina pedidos, automatiza la comunicacion con clientes y proveedores, y optimiza tus operaciones logisticas con IA.",
  lossStatement: "Los almacenes pierden hasta",
  lossValue: "€60K+",
  lossValueNum: 60,
  lossSuffix: "anuales por ineficiencias operativas",
  painPoints: [
    { icon: PhoneOff, title: "Consultas de estado constantes", description: "Clientes y proveedores llamando continuamente para preguntar por el estado de sus pedidos y entregas." },
    { icon: Clock, title: "Coordinacion manual", description: "Horas dedicadas a coordinar entregas, rutas y horarios entre conductores, almacen y clientes." },
    { icon: AlertTriangle, title: "Incidencias sin gestionar", description: "Retrasos, danos y errores de envio que se comunican tarde y generan insatisfaccion." },
    { icon: Package, title: "Control de inventario reactivo", description: "Falta de visibilidad en tiempo real del stock que causa roturas y sobrecostes." },
    { icon: FileText, title: "Documentacion dispersa", description: "Albaranes, facturas y ordenes repartidas entre email, telefono y papel." },
    { icon: Truck, title: "Entregas descoordinadas", description: "Conductores sin información actualizada y clientes sin saber cuando recibiran su pedido." },
  ],
  features: [
    { icon: MapPin, title: "Tracking Automatico de Pedidos", description: "Los clientes reciben actualizaciones proactivas sobre el estado de sus envios por WhatsApp, SMS o email sin necesidad de llamar.", highlight: "-75% llamadas de seguimiento" },
    { icon: MessageSquare, title: "Coordinacion IA con Proveedores", description: "Automatiza la comunicacion de ordenes de compra, confirmaciones de entrega y gestión de incidencias con proveedores." },
    { icon: Bell, title: "Alertas Inteligentes", description: "Notificaciones automaticas de stock bajo, retrasos en entregas y anomalias operativas antes de que se conviertan en problemas." },
    { icon: BarChart3, title: "Dashboard Operativo", description: "Visibilidad total de pedidos, entregas, incidencias y rendimiento del equipo en un panel centralizado.", highlight: "+40% eficiencia operativa" },
  ],
  stats: [
    { value: "-75%", label: "Llamadas de seguimiento" },
    { value: "+40%", label: "Eficiencia operativa" },
    { value: "24/7", label: "Atencion automatizada" },
    { value: "98%", label: "Satisfaccion clientes" },
  ],
  ctaTitle: "Listo para optimizar tu",
  ctaAccent: "logistica con IA?",
  ctaDescription: "Unete a empresas de logistica que ya automatizan sus operaciones con inteligencia artificial.",
}

export function SectorPageClient() {
  const conversations = getConversationsForSector("almacenes")

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
              title="Tu IA Gestionando Envios"
              subtitle="Mira como nuestros asistentes gestionan consultas de tracking y estado de pedidos."
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
