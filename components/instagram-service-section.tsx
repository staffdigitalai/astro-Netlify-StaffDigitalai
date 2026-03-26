"use client"
import { useEffect, useRef } from "react"

export function InstagramServiceSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  const benefits = [
    {
      title: "Reservas de Servicio",
      description:
        "StaffDigital AI programa automaticamente citas de servicio y envia confirmaciones en todos los canales - web, telefono y redes sociales, personalizado a tu flujo de trabajo",
    },
    {
      title: "Consultas de Recambios",
      description:
        "Responde preguntas sobre disponibilidad de recambios, precios y plazos de entrega basandose en tu inventario en tiempo real, ya sea por telefono, web o redes sociales",
    },
    {
      title: "Gestión de Pedidos",
      description:
        "Procesa pedidos de recambios y proporciona actualizaciones de seguimiento sin intervencion humana en cada punto de contacto con el cliente, adaptado a tus sistemas",
    },
    {
      title: "Actualizaciones al Cliente",
      description:
        "Mantiene a los clientes informados sobre el progreso del servicio y estado de llegada de recambios 24/7 con la voz de tu concesionario - sin importar como te contacten",
    },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll(".fade-in-element")
            elements.forEach((element, index) => {
              setTimeout(() => {
                element.classList.add("animate-fade-in-up")
              }, index * 100)
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

  return (
    null
  )
}
