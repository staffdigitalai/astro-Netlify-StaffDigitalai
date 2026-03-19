"use client"

import { useEffect, useRef } from "react"
import { TestimonialsColumn } from "@/components/ui/testimonials-column"

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll(".fade-in-element")
            elements.forEach((element, index) => {
              setTimeout(() => {
                element.classList.add("animate-fade-in-up")
              }, index * 300)
            })
          }
        })
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const testimonials = [
    {
      text: "Pasamos de perder el 70% de las consultas fuera de horario a captar cada lead. Las reservas de clientes aumentaron un 50% en el primer mes.",
      name: "Miguel Rodriguez",
      role: "Propietario",
    },
    {
      text: "Dedicamos mucho menos tiempo a pensar en la respuesta a leads gracias a la interaccion instantanea que nos ofrece StaffDigital AI.",
      name: "Sara Martinez",
      role: "Directora Comercial",
    },
    {
      text: "Con StaffDigital AI, nuestras tasas de conversion aumentaron un 85% y nuestros ingresos de fin de semana subieron un 40%.",
      name: "Carlos Torres",
      role: "Director General",
    },
    {
      text: "La IA gestiona las preguntas de los clientes 24/7, asi que nunca perdemos una venta potencial. Nuestro equipo puede centrarse en cerrar acuerdos.",
      name: "Elena Fernandez",
      role: "Directora de Operaciones",
    },
    {
      text: "Las puntuaciones de satisfaccion del cliente mejoraron dramaticamente desde que implementamos StaffDigital AI. A los clientes les encantan las respuestas instantaneas.",
      name: "David Sanchez",
      role: "Responsable de Experiencia del Cliente",
    },
    {
      text: "Nuestra tienda vio un aumento del 60% en leads cualificados. El chatbot gestiona las consultas de productos perfectamente mientras nos centramos en los clientes presenciales.",
      name: "Laura Gomez",
      role: "Directora de Tienda",
    },
    {
      text: "Las consultas inmobiliarias se gestionan al instante. Hemos cerrado 3 veces mas acuerdos desde que implementamos el asistente IA de StaffDigital AI.",
      name: "Javier Lopez",
      role: "Agente Inmobiliario",
    },
    {
      text: "Las reservas del hotel aumentaron un 45% con la disponibilidad 24/7. Los huespedes reciben respuestas inmediatas sobre servicios y disponibilidad.",
      name: "Maria Garcia",
      role: "Directora de Hosteleria",
    },
  ]

  return (
    <section id="testimonials" ref={sectionRef} className="relative pt-12 pb-12 md:pt-16 md:pb-16 px-4 sm:px-6 lg:px-8">
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header Section - Keep as user loves it */}
        <div className="text-center mb-12 md:mb-16">
          <div className="fade-in-element opacity-0 translate-y-8 transition-all duration-1000 ease-out inline-flex items-center gap-2 text-white/60 text-sm font-medium tracking-wider uppercase mb-6">
            <div className="w-8 h-px bg-white/30"></div>
            Casos de Exito
            <div className="w-8 h-px bg-white/30"></div>
          </div>
          <h2 className="fade-in-element opacity-0 translate-y-8 transition-all duration-1000 ease-out text-5xl md:text-6xl lg:text-7xl font-light text-white mb-8 tracking-tight text-balance">
            Las empresas que <span className="font-medium italic">impulsamos</span>
          </h2>
          <p className="fade-in-element opacity-0 translate-y-8 transition-all duration-1000 ease-out text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
            Descubre como empresas lideres estan transformando su atencion al cliente con soluciones de chat impulsadas por IA
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="fade-in-element opacity-0 translate-y-8 transition-all duration-1000 ease-out relative flex justify-center items-center min-h-[600px] md:min-h-[800px] overflow-hidden">
          <div
            className="flex gap-8 max-w-6xl"
            style={{
              maskImage: "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
            }}
          >
            <TestimonialsColumn testimonials={testimonials.slice(0, 3)} duration={15} className="flex-1" />
            <TestimonialsColumn
              testimonials={testimonials.slice(2, 5)}
              duration={12}
              className="flex-1 hidden md:block"
            />
            <TestimonialsColumn
              testimonials={testimonials.slice(1, 4)}
              duration={18}
              className="flex-1 hidden lg:block"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
