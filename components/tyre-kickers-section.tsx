"use client"
import { useEffect, useRef } from "react"

export function TyreKickersSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  const benefits = [
    {
      title: "Respuestas Instantaneas",
      description:
        "StaffDigital AI responde amás de 50 preguntas comunes sobre ITV, kilometraje, permutas y precios al instante en tu web, telefono y canales sociales",
    },
    {
      title: "Cualifica Leads",
      description:
        "Filtra automaticamente compradores serios de curiosos haciendo las preguntas adecuadas adaptadas a tu concesionario",
    },
    {
      title: "Ahorra Tiempo",
      description: "Deja de responder las mismas preguntas una y otra vez - deja que StaffDigital AI gestione los curiosos",
    },
    {
      title: "Disponibilidad 24/7",
      description: "No pierdas ninguna consulta seria mientras filtras curiosos las 24 horas - en todos los canales",
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
