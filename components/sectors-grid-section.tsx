"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowRight, Car, Stethoscope, Scissors, UtensilsCrossed, ShoppingBag, Building2, Warehouse, Wrench, Home, GraduationCap, Dumbbell } from "lucide-react"
import Link from "next/link"

const sectors = [
  {
    id: "concesionarios",
    icon: Car,
    title: "Concesionarios",
    subtitle: "Automotive Dealerships",
    description: "Venta de vehiculos, posventa, talleres y recambios con atencion 24/7 y gestion de citas automatizada.",
    href: "/sectores/concesionarios",
    gradient: "from-slate-500 to-zinc-500",
    bgGradient: "from-slate-500/20 to-zinc-500/20",
    borderColor: "border-slate-500/30",
  },
  {
    id: "clinicas",
    icon: Stethoscope,
    title: "Clinicas",
    subtitle: "Medical Clinics",
    description: "Centros medicos, clinicas especializadas y consultas con gestion de pacientes y recordatorios.",
    href: "/sectores/clinicas",
    gradient: "from-blue-500 to-cyan-500",
    bgGradient: "from-blue-500/20 to-cyan-500/20",
    borderColor: "border-blue-500/30",
  },
  {
    id: "peluquerias",
    icon: Scissors,
    title: "Centros de Belleza",
    subtitle: "Beauty Centers",
    description: "Peluquerias, estetica, spas y centros de bienestar con reservas online y fidelizacion.",
    href: "/sectores/peluquerias",
    gradient: "from-pink-500 to-rose-500",
    bgGradient: "from-pink-500/20 to-rose-500/20",
    borderColor: "border-pink-500/30",
  },
  {
    id: "restaurantes",
    icon: UtensilsCrossed,
    title: "Restaurantes y Hosteleria",
    subtitle: "Restaurants & Hospitality",
    description: "Restaurantes, bares, hoteles y catering con reservas, pedidos y atencion multicanal.",
    href: "/sectores/restaurantes",
    gradient: "from-orange-500 to-amber-500",
    bgGradient: "from-orange-500/20 to-amber-500/20",
    borderColor: "border-orange-500/30",
  },
  {
    id: "retail",
    icon: ShoppingBag,
    title: "Retail",
    subtitle: "Retail Stores",
    description: "Tiendas fisicas y online con atencion al cliente, stock y promociones automatizadas.",
    href: "/sectores/retail",
    gradient: "from-emerald-500 to-teal-500",
    bgGradient: "from-emerald-500/20 to-teal-500/20",
    borderColor: "border-emerald-500/30",
  },
  {
    id: "oficinas",
    icon: Building2,
    title: "Oficinas",
    subtitle: "Office Spaces",
    description: "Espacios corporativos, coworking y centros de negocios con control de accesos y servicios.",
    href: "/sectores/oficinas",
    gradient: "from-indigo-500 to-violet-500",
    bgGradient: "from-indigo-500/20 to-violet-500/20",
    borderColor: "border-indigo-500/30",
  },
  {
    id: "almacenes",
    icon: Warehouse,
    title: "Logistica",
    subtitle: "Logistics & Warehouses",
    description: "Almacenes, centros de distribucion y empresas de transporte con seguimiento y alertas.",
    href: "/sectores/almacenes",
    gradient: "from-amber-600 to-yellow-500",
    bgGradient: "from-amber-600/20 to-yellow-500/20",
    borderColor: "border-amber-600/30",
  },
  {
    id: "servicios-tecnicos",
    icon: Wrench,
    title: "Servicios Tecnicos",
    subtitle: "Technical Services",
    description: "SAT, instaladores, mantenimiento y reparaciones con gestion de tickets y agenda.",
    href: "/sectores/servicios-tecnicos",
    gradient: "from-red-500 to-orange-500",
    bgGradient: "from-red-500/20 to-orange-500/20",
    borderColor: "border-red-500/30",
  },
  {
    id: "inmobiliarias",
    icon: Home,
    title: "Inmobiliarias",
    subtitle: "Real Estate",
    description: "Agencias inmobiliarias con cualificacion de leads, visitas virtuales y gestion de propiedades.",
    href: "/sectores/inmobiliarias",
    gradient: "from-purple-500 to-pink-500",
    bgGradient: "from-purple-500/20 to-pink-500/20",
    borderColor: "border-purple-500/30",
  },
  {
    id: "educacion",
    icon: GraduationCap,
    title: "Educacion",
    subtitle: "Education",
    description: "Colegios, academias, universidades y centros de formacion con matriculacion y seguimiento.",
    href: "/sectores/educacion",
    gradient: "from-sky-500 to-blue-500",
    bgGradient: "from-sky-500/20 to-blue-500/20",
    borderColor: "border-sky-500/30",
  },
  {
    id: "gimnasios",
    icon: Dumbbell,
    title: "Gimnasios",
    subtitle: "Gyms & Fitness",
    description: "Centros deportivos, gimnasios y clubes con gestion de socios, clases y reservas.",
    href: "/sectores/gimnasios",
    gradient: "from-lime-500 to-green-500",
    bgGradient: "from-lime-500/20 to-green-500/20",
    borderColor: "border-lime-500/30",
  },
]

export function SectorsGridSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
      }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative py-16 md:py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-orange-400 rounded-full mr-2 animate-pulse" />
            Sectores que Atendemos
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-balance mb-6">
            Soluciones IA para{" "}
            <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-orange-400 bg-clip-text text-transparent">
              Tu Sector
            </span>
          </h2>
          <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto leading-relaxed">
            Automatizacion inteligente adaptada a las necesidades especificas de cada industria. 
            Descubre como podemos transformar tu negocio.
          </p>
        </div>

        {/* Sectors Grid - Responsive layout */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-5 transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          {sectors.map((sector, index) => {
            const Icon = sector.icon
            return (
              <Link
                key={sector.id}
                href={sector.href}
                className={`group block transition-all duration-500 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{
                  transitionDelay: isVisible ? `${300 + index * 50}ms` : "0ms",
                }}
              >
                <div className={`h-full p-5 rounded-2xl border ${sector.borderColor} bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:scale-[1.03] hover:shadow-xl`}>
                  {/* Icon & Title Row */}
                  <div className="flex items-start gap-4 mb-3">
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${sector.bgGradient} border ${sector.borderColor} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon size={22} className="text-white/80" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-base font-semibold text-white group-hover:text-white/90 transition-colors truncate">
                        {sector.title}
                      </h3>
                      <p className="text-xs text-white/40 truncate">
                        {sector.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-white/50 leading-relaxed mb-4 line-clamp-2">
                    {sector.description}
                  </p>

                  {/* CTA */}
                  <div className="flex items-center text-white/50 group-hover:text-white/80 transition-colors">
                    <span className="text-xs font-medium">Ver soluciones</span>
                    <ArrowRight size={14} className="ml-1.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Bottom Stats */}
        <div
          className={`mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 transition-all duration-1000 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
              11+
            </div>
            <p className="text-white/50 text-sm mt-1">Sectores</p>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
              500+
            </div>
            <p className="text-white/50 text-sm mt-1">Empresas activas</p>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
              2M+
            </div>
            <p className="text-white/50 text-sm mt-1">Conversaciones/mes</p>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
              98%
            </div>
            <p className="text-white/50 text-sm mt-1">Satisfaccion</p>
          </div>
        </div>

        {/* Bottom CTA */}
        <div
          className={`text-center mt-12 transition-all duration-1000 delay-900 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-white/50 text-sm mb-4">
            No encuentras tu sector? Contactanos para una solucion personalizada.
          </p>
          <Link
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 rounded-full text-white font-medium transition-all duration-300 hover:scale-105 shadow-lg shadow-orange-500/25"
          >
            Solicitar Demo Gratuita
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}
