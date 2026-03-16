"use client"

import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import Aurora from "@/components/Aurora"
import { Footer } from "@/components/footer"
import { SectorPageTemplate } from "@/components/sector-page-template"
import type { SectorPageData } from "@/components/sector-page-template"
import { Clock, Phone, CalendarX, FileText, Users, AlertTriangle, CalendarCheck, MessageSquare, Dumbbell, BarChart3, Trophy, Heart } from "lucide-react"

const data: SectorPageData = {
  sectorName: "Gimnasios",
  badge: "StaffDigital AI para Gimnasios",
  headline: "Mas Socios,",
  headlineAccent: "Menos Bajas",
  subheadline: "Convierte visitantes en socios, gestiona reservas de clases y reduce bajas con un asistente IA que motiva y fideliza.",
  lossStatement: "Los gimnasios pierden hasta",
  lossValue: "€60K+",
  lossValueNum: 60,
  lossSuffix: "anuales por bajas evitables y leads no convertidos",
  painPoints: [
    { icon: Phone, title: "Leads que no contestan", description: "Personas interesadas que visitan tu web o te escriben fuera de horario y cuando les llamas ya se han apuntado en otro gym." },
    { icon: CalendarX, title: "Clases medio vacias", description: "Socios que reservan y no aparecen, bloqueando plazas que otros habrian aprovechado." },
    { icon: Clock, title: "Recepcion colapsada", description: "Personal de recepcion dedicando tiempo a consultas basicas en vez de atender a socios presenciales." },
    { icon: FileText, title: "Proceso de alta lento", description: "Formularios largos y papeleo que desmotivan a potenciales socios en el momento de mayor interes." },
    { icon: Users, title: "Bajas silenciosas", description: "Socios que dejan de venir sin que nadie detecte la caida de actividad ni intente recuperarlos." },
    { icon: AlertTriangle, title: "Fidelizacion reactiva", description: "Solo te enteras de que un socio quiere irse cuando ya ha tomado la decision de darse de baja." },
  ],
  features: [
    { icon: Dumbbell, title: "Conversion de Leads 24/7", description: "El asistente IA responde al instante a interesados, muestra tarifas, horarios y beneficios, y agenda visitas guiadas o clases de prueba.", highlight: "+55% conversion leads" },
    { icon: CalendarCheck, title: "Reserva Inteligente de Clases", description: "Socios reservan por WhatsApp o chat. El sistema envia recordatorios y gestiona listas de espera automaticamente.", highlight: "-40% no-shows" },
    { icon: MessageSquare, title: "Atencion al Socio Multicanal", description: "Responde preguntas sobre horarios, instalaciones, tarifas especiales y promociones por cualquier canal." },
    { icon: BarChart3, title: "Prediccion de Bajas", description: "Detecta socios en riesgo de abandono por patron de asistencia y activa campanas de recuperacion personalizadas." },
    { icon: Trophy, title: "Gamificacion y Retos", description: "Envia mensajes motivacionales, recuerda objetivos y celebra logros para mantener a los socios comprometidos." },
    { icon: Heart, title: "Seguimiento Personalizado", description: "Recordatorios de renovacion, felicitaciones de cumpleanos y ofertas especiales basadas en preferencias de cada socio." },
  ],
  stats: [
    { value: "+55%", label: "Conversion de leads" },
    { value: "-40%", label: "No-shows en clases" },
    { value: "-30%", label: "Tasa de bajas" },
    { value: "24/7", label: "Atencion a socios" },
  ],
  ctaTitle: "Listo para hacer crecer tu",
  ctaAccent: "gimnasio con IA?",
  ctaDescription: "Unete a centros deportivos que ya convierten mas leads y retienen mas socios con inteligencia artificial.",
}

export function GimnasiosClient() {
  return (
    <div className="min-h-screen bg-black overflow-hidden">
      <main className="min-h-screen relative overflow-hidden">
        <div className="fixed inset-0 w-full h-full">
          <Aurora colorStops={["#475569", "#64748b", "#475569"]} amplitude={1.2} blend={0.6} speed={0.8} />
        </div>
        <div className="relative z-10">
          <GlassmorphismNav />
          <SectorPageTemplate data={data} />
          <Footer />
        </div>
      </main>
    </div>
  )
}
