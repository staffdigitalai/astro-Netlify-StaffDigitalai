"use client"

import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import Aurora from "@/components/Aurora"
import { Footer } from "@/components/footer"
import { SectorPageTemplate } from "@/components/sector-page-template"
import type { SectorPageData } from "@/components/sector-page-template"
import { Clock, Phone, CalendarX, FileText, Users, AlertTriangle, CalendarCheck, MessageSquare, GraduationCap, BarChart3, BookOpen, Bell } from "lucide-react"

const data: SectorPageData = {
  sectorName: "Educacion",
  badge: "StaffDigital AI para Educacion",
  headline: "Tu Secretaria",
  headlineAccent: "Digital 24/7",
  subheadline: "Gestiona matriculaciones, responde consultas de familias y automatiza comunicaciones con un asistente IA siempre disponible.",
  lossStatement: "Los centros educativos pierden hasta",
  lossValue: "€40K+",
  lossValueNum: 40,
  lossSuffix: "anuales en matriculas perdidas por respuesta tardia",
  painPoints: [
    { icon: Phone, title: "Consultas sin responder", description: "Familias interesadas que llaman en horario no lectivo o durante clases y no obtienen respuesta." },
    { icon: CalendarX, title: "Proceso de matricula lento", description: "Familias abandonan el proceso por formularios complejos o falta de seguimiento durante la inscripcion." },
    { icon: Clock, title: "Secretaria saturada", description: "Personal administrativo abrumado con consultas repetitivas sobre horarios, precios y requisitos." },
    { icon: FileText, title: "Comunicaciones manuales", description: "Circulares, recordatorios y avisos enviados manualmente consumiendo horas de trabajo administrativo." },
    { icon: Users, title: "Seguimiento de prospectos", description: "Familias que asisten a jornadas de puertas abiertas pero nadie les hace seguimiento personalizado." },
    { icon: AlertTriangle, title: "Informacion inconsistente", description: "Diferentes respuestas segun quien atienda sobre becas, extraescolares o normativa del centro." },
  ],
  features: [
    { icon: GraduationCap, title: "Asistente de Matriculacion", description: "Guia a las familias paso a paso en el proceso de inscripcion, responde dudas sobre documentacion y plazos, y agenda entrevistas.", highlight: "+45% conversion matriculas" },
    { icon: MessageSquare, title: "Atencion a Familias 24/7", description: "Responde consultas sobre horarios, menu del comedor, extraescolares, uniformes y mas a cualquier hora del dia." },
    { icon: CalendarCheck, title: "Gestion de Citas y Tutorias", description: "Agenda reuniones con tutores, entrevistas de admision y visitas al centro automaticamente.", highlight: "-60% carga administrativa" },
    { icon: BarChart3, title: "Dashboard de Comunicaciones", description: "Visualiza tasas de apertura, consultas mas frecuentes y satisfaccion de las familias en tiempo real." },
    { icon: BookOpen, title: "Base de Conocimiento Inteligente", description: "El asistente aprende del reglamento interno, proyecto educativo y FAQ para dar respuestas precisas y coherentes." },
    { icon: Bell, title: "Notificaciones Automaticas", description: "Envia recordatorios de pagos, fechas importantes, eventos y circulares por el canal preferido de cada familia." },
  ],
  stats: [
    { value: "+45%", label: "Conversion matriculas" },
    { value: "-60%", label: "Carga administrativa" },
    { value: "24/7", label: "Atencion familias" },
    { value: "98%", label: "Satisfaccion familias" },
  ],
  ctaTitle: "Listo para transformar tu",
  ctaAccent: "centro educativo?",
  ctaDescription: "Unete a colegios y academias que ya gestionan matriculas y comunicaciones con inteligencia artificial.",
}

export function EducacionClient() {
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
