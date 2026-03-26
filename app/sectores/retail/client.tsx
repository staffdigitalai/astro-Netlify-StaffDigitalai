"use client"

import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import Aurora from "@/components/Aurora"
import { Footer } from "@/components/footer"
import { SectorPageTemplate } from "@/components/sector-page-template"
import { ConversationSimulator } from "@/components/conversation-simulator"
import { getConversationsForSector } from "@/lib/conversation-data"
import type { SectorPageData } from "@/components/sector-page-template"
import { ShoppingCart, Clock, Users, MessageSquare, BarChart3, Package, Headphones, TrendingUp } from "lucide-react"

const data: SectorPageData = {
  sectorName: "Retail",
  badge: "StaffDigital AI para Retail",
  headline: "Vende Mas,",
  headlineAccent: "Atiende Mejor",
  subheadline: "Automatiza la atención al cliente en tu comercio, responde consultas sobre productos, stock y pedidos 24/7 en todos tus canales.",
  lossStatement: "Las tiendas pierden hasta",
  lossValue: "€35K+",
  lossValueNum: 35,
  lossSuffix: "anuales en ventas perdidas por falta de atencion",
  painPoints: [
    { icon: Clock, title: "Clientes sin respuesta", description: "Consultas sobre productos, tallas y disponibilidad que quedan sin atender fuera del horario comercial." },
    { icon: ShoppingCart, title: "Carritos abandonados", description: "Clientes que abandonan la compra porque no obtienen respuestas rapidas a sus dudas." },
    { icon: Users, title: "Personal saturado", description: "Empleados que no dan abasto en horas punta, perdiendo oportunidades de venta." },
    { icon: MessageSquare, title: "Canales desconectados", description: "Consultas por WhatsApp, Instagram, web y telefono que se gestionan por separado." },
    { icon: Package, title: "Consultas repetitivas", description: "El 70% de las preguntas son sobre horarios, ubicacion, stock y envios." },
    { icon: BarChart3, title: "Sin datos de cliente", description: "Pierdes información valiosa sobre preferencias y comportamiento de compra." },
  ],
  features: [
    { icon: Headphones, title: "Asistente de Ventas IA 24/7", description: "Responde preguntas sobre productos, tallas, colores, disponibilidad y precios en tiempo real. Sugiere artículos complementarios para aumentar el ticket medio.", highlight: "Aumento del 25% en ventas cruzadas" },
    { icon: Package, title: "Gestión de Pedidos Automatica", description: "Informa sobre el estado de envios, gestiona devoluciones y procesa cambios automaticamente en todos tus canales de venta." },
    { icon: MessageSquare, title: "Omnicanal Integrado", description: "Una sola IA atendiendo WhatsApp, Instagram DMs, chat web, email y telefono con la personalidad de tu marca.", highlight: "Respuesta en menos de 3 segundos" },
    { icon: TrendingUp, title: "Análisis de Comportamiento", description: "Detecta tendencias de compra, productosmás consultados y motivos de abandono para optimizar tu estrategia comercial." },
  ],
  stats: [
    { value: "+40%", label: "Conversion de consultas" },
    { value: "3s", label: "Tiempo de respuesta" },
    { value: "24/7", label: "Disponibilidad total" },
    { value: "-60%", label: "Carga de trabajo manual" },
  ],
  ctaTitle: "Listo para transformar tu",
  ctaAccent: "comercio con IA?",
  ctaDescription: "Unete a comercios que ya vendenmás con atencion automatizada e inteligente.",
}

export function SectorPageClient() {
  const conversations = getConversationsForSector("retail")

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
              title="Tu IA Atendiendo Clientes"
              subtitle="Mira como nuestros asistentes gestionan consultas de productos, stock y envios."
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
