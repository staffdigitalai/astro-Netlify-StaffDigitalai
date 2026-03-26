"use client"

import { useEffect, useRef, useState } from "react"
import { X, Check, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const othersProblems = [
  "Implementan herramientas aisladas sin una estrategia global",
  "Se centran solo en agentes IA basicos o automatizaciones simples",
  "No integran atencion, automatizacion, seguridad y presentacion visual",
  "Requieren mas gestion interna por parte de tu equipo",
]

const ourSolutions = [
  "Unimos IA conversacional, IA conversacional omnicanal, seguridad inteligente y Home Staging AI",
  "Disenamos una estrategia adaptada a tu negocio y canales",
  "Integramos las soluciones con tus procesos, CRM y operativa",
  "Gestionamos la implementacion, optimizacion y evolucion contigo",
]

export function WhyDifferentSection() {
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
      },
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
    <section ref={sectionRef} className="py-12 sm:py-16 px-4 relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* Por Que StaffDigital AI es Diferente Section */}
        <div
          className={`text-center mb-10 sm:mb-12 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-balance mb-4">
            Por Que StaffDigital AI es <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">Diferente</span>
          </h2>
          <p className="text-base sm:text-lg text-white/70 max-w-3xl mx-auto font-light leading-relaxed">
            No se trata solo de implementar IA, sino de tener una solucion completa, conectada y gestionada para generar resultados reales.
          </p>
        </div>

        {/* Comparison Cards */}
        <div
          className={`grid lg:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16 transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          {/* Others Card - Red */}
          <div className="group">
            <div className="bg-white/5 backdrop-blur-md border border-red-500/20 rounded-2xl p-6 sm:p-8 h-full hover:bg-red-500/5 transition-all duration-500">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-red-500/20">
                  <X className="h-6 w-6 text-red-400" />
                </div>
                <div>
                  <p className="text-red-400 text-sm font-medium">Otras empresas</p>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">Soluciones Parciales</h3>
                </div>
              </div>

              <div className="space-y-4">
                {othersProblems.map((problem, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <X className="w-3 h-3 text-red-400" />
                    </div>
                    <p className="text-white/70 text-sm sm:text-base">{problem}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* StaffDigital Card - Green */}
          <div className="group">
            <div className="bg-white/5 backdrop-blur-md border border-green-500/20 rounded-2xl p-6 sm:p-8 h-full hover:bg-green-500/5 transition-all duration-500 relative overflow-hidden">
              {/* Subtle glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent pointer-events-none"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-green-500/20">
                    <Check className="h-6 w-6 text-green-400" />
                  </div>
                  <div>
                    <p className="text-green-400 text-sm font-medium">StaffDigital AI</p>
                    <h3 className="text-xl sm:text-2xl font-bold text-white">Solucion Integral Gestionada</h3>
                  </div>
                </div>

                <div className="space-y-4">
                  {ourSolutions.map((solution, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-green-400" />
                      </div>
                      <p className="text-white/70 text-sm sm:text-base">{solution}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div
          className={`text-center transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="bg-gradient-to-r from-orange-500/10 to-amber-500/10 backdrop-blur-sm border border-orange-500/20 rounded-2xl p-8 sm:p-10">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Transforma tu Negocio con IA
            </h3>
            <p className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto mb-6">
              Descubre como podemos ayudarte a captar mas clientes, automatizar procesos y hacer crecer tu empresa.
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-full px-8 py-4 text-lg font-medium transition-all duration-300 hover:scale-105 cursor-pointer shadow-lg shadow-orange-500/25 group"
            >
              Habla con un Experto
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
