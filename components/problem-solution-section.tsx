"use client"

import { useEffect, useRef, useState } from "react"
import { MessageSquare, Search, FileText, Rocket, X, Check } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Consulta",
    description: "Analizamos tu negocio, canales actuales y objetivos. Entendemos tus necesidades especificas.",
  },
  {
    number: "02",
    icon: Search,
    title: "Analisis",
    description: "Evaluamos oportunidades de mejora y disenamos la estrategia de IA personalizada para ti.",
  },
  {
    number: "03",
    icon: FileText,
    title: "Presupuesto",
    description: "Te presentamos una propuesta clara con plazos, costes y retorno de inversion esperado.",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Implementacion",
    description: "Desplegamos, integramos y optimizamos. Gestionamos todo para que tu solo veas resultados.",
  },
]

const othersProblems = [
  "Implementan herramientas aisladas sin una estrategia global",
  "Se centran solo en chatbots o automatizaciones basicas",
  "No integran atencion, automatizacion, seguridad y presentacion visual",
  "Requieren mas gestion interna por parte de tu equipo",
]

const ourSolutions = [
  "Unimos IA conversacional, automatizacion omnicanal, seguridad inteligente y Home Staging AI",
  "Disenamos una estrategia adaptada a tu negocio y canales",
  "Integramos las soluciones con tus procesos, CRM y operativa",
  "Gestionamos la implementacion, optimizacion y evolucion contigo",
]

export function ProblemSolutionSection() {
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
        {/* Como Funciona Section */}
        <div
          className={`text-center mb-10 sm:mb-14 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-orange-400 rounded-full mr-2 animate-pulse"></span>
            Proceso Simple y Efectivo
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white text-balance mb-4 sm:mb-6">
            Como <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">Funciona</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/70 max-w-3xl mx-auto font-light leading-relaxed">
            De la consulta a los resultados en cuatro pasos claros. Sin complicaciones.
          </p>
        </div>

        {/* Steps Grid */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16 sm:mb-20 transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div
                key={step.number}
                className="group relative"
                style={{ transitionDelay: `${300 + index * 100}ms` }}
              >
                {/* Connector Line (hidden on last item and mobile) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-white/20 to-transparent z-0"></div>
                )}
                
                <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 sm:p-6 h-full hover:bg-white/10 transition-all duration-500 hover:border-orange-400/30 hover:scale-[1.02] z-10">
                  {/* Step Number */}
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white text-xs font-bold shadow-lg">
                    {step.number}
                  </div>
                  
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500/20 to-amber-500/20 border border-orange-500/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon size={24} className="text-orange-400" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Por Que StaffDigital AI es Diferente Section */}
        <div
          className={`text-center mb-10 sm:mb-12 transition-all duration-1000 delay-500 ${
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
          className={`grid lg:grid-cols-2 gap-6 sm:gap-8 transition-all duration-1000 delay-700 ${
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
      </div>
    </section>
  )
}
