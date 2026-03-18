"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowRight, Check } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PainPoint {
  icon: LucideIcon
  title: string
  description: string
}

interface Feature {
  icon: LucideIcon
  title: string
  description: string
  highlight?: string
}

interface Stat {
  value: string
  label: string
}

export interface SectorPageData {
  sectorName: string
  badge: string
  headline: string
  headlineAccent: string
  subheadline: string
  lossStatement: string
  lossValue: string
  lossValueNum: number
  lossSuffix: string
  painPoints: PainPoint[]
  features: Feature[]
  stats: Stat[]
  ctaTitle: string
  ctaAccent: string
  ctaDescription: string
}

export function SectorPageTemplate({ data }: { data: SectorPageData }) {
  const [counter, setCounter] = useState(0)
  const painRef = useRef<HTMLElement>(null)
  const featRef = useRef<HTMLElement>(null)
  const statsRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const duration = 2000
    const steps = 60
    const increment = data.lossValueNum / steps
    const stepDuration = duration / steps
    let currentStep = 0

    const timer = setInterval(() => {
      currentStep++
      if (currentStep <= steps) {
        setCounter(Math.min(Math.round(increment * currentStep), data.lossValueNum))
      } else {
        clearInterval(timer)
      }
    }, stepDuration)

    return () => clearInterval(timer)
  }, [data.lossValueNum])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll(".fade-in-element")
            elements.forEach((el, i) => {
              setTimeout(() => {
                el.classList.add("animate-fade-in-up")
              }, i * 150)
            })
          }
        }
      },
      { threshold: 0.1 },
    )

    const refs = [painRef, featRef, statsRef]
    for (const ref of refs) {
      if (ref.current) observer.observe(ref.current)
    }
    return () => observer.disconnect()
  }, [])

  return (
    <div className="relative z-10">
      {/* Hero */}
      <section className="min-h-screen flex items-start justify-center px-4 pt-24 md:pt-32 pb-20 relative">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-8 mt-8 md:mt-12 animate-fade-in-badge">
            <span className="w-2 h-2 bg-white/60 rounded-full mr-2 animate-pulse" />
            {data.badge}
          </div>

          <div className="space-y-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight text-balance animate-fade-in-heading">
              {data.headline}{" "}
              <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-orange-400 bg-clip-text text-transparent">
                {data.headlineAccent}
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed animate-fade-in-subheading">
              {data.subheadline}
            </p>

            <div className="animate-fade-in-subheading">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 flex-wrap">
                <span className="text-lg md:text-xl text-slate-300">{data.lossStatement}</span>
                <span className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent animate-pulse-glow">
                  {data.lossValue.replace(/\d+/, String(counter))}
                </span>
                <span className="text-lg md:text-xl text-slate-300">{data.lossSuffix}</span>
              </div>
            </div>

            <div className="max-w-xs sm:max-w-3xl mx-auto px-6 sm:px-0 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-buttons">
              <Button
                size="lg"
                className="bg-white text-black rounded-full px-8 py-4 text-lg font-medium transition-all duration-300 hover:bg-gray-50 hover:scale-105 hover:shadow-lg group cursor-pointer w-full sm:w-auto"
              >
                Pide tu Demo Hoy
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent text-white border-2 border-white/30 rounded-full px-8 py-4 text-lg font-medium transition-all duration-300 hover:bg-white/10 hover:border-white/50 hover:scale-105 cursor-pointer backdrop-blur-sm w-full sm:w-auto"
              >
                Pedir Presupuesto
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points */}
      <section ref={painRef} className="py-20 md:py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-balance fade-in-element opacity-0 translate-y-8 transition-all duration-1000">
              Problemas que resolvemos en{" "}
              <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                {data.sectorName}
              </span>
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto fade-in-element opacity-0 translate-y-8 transition-all duration-1000">
              Los desafios diarios que frenan tu negocio
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.painPoints.map((point) => {
              const Icon = point.icon
              return (
                <div
                  key={point.title}
                  className="fade-in-element opacity-0 translate-y-8 transition-all duration-1000 group"
                >
                  <div className="h-full p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                    <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-4 group-hover:bg-red-500/20 transition-colors">
                      <Icon size={24} className="text-red-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{point.title}</h3>
                    <p className="text-white/60 leading-relaxed text-sm">{point.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features / Solutions */}
      <section ref={featRef} className="py-20 md:py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-balance fade-in-element opacity-0 translate-y-8 transition-all duration-1000">
              Como StaffDigital AI transforma tu{" "}
              <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                {data.sectorName.toLowerCase()}
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {data.features.map((feature) => {
              const Icon = feature.icon
              return (
                <div
                  key={feature.title}
                  className="fade-in-element opacity-0 translate-y-8 transition-all duration-1000 group"
                >
                  <div className="h-full p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500/20 to-amber-500/20 border border-orange-500/20 flex items-center justify-center flex-shrink-0 group-hover:from-orange-500/30 group-hover:to-amber-500/30 transition-colors">
                        <Icon size={24} className="text-orange-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                        <p className="text-white/60 leading-relaxed">{feature.description}</p>
                        {feature.highlight && (
                          <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
                            <Check size={14} className="text-green-400" />
                            <span className="text-green-400 text-sm font-medium">{feature.highlight}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section ref={statsRef} className="py-20 md:py-32 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="fade-in-element opacity-0 translate-y-8 transition-all duration-1000 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 md:p-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
              {data.stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </p>
                  <p className="text-white/50 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="relative py-8 px-4 sm:px-6 lg:px-8 mb-32">
        <div className="relative max-w-4xl mx-auto">
          <div className="fade-in-element opacity-0 translate-y-8 transition-all duration-1000 text-center p-8 md:p-10 rounded-3xl border border-white/20 bg-[radial-gradient(35%_128px_at_50%_0%,theme(backgroundColor.white/15%),theme(backgroundColor.white/5%))]">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-light text-white mb-6 text-balance leading-tight">
              {data.ctaTitle}{" "}
              <span className="font-medium italic bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">
                {data.ctaAccent}
              </span>
            </h3>
            <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto leading-relaxed">
              {data.ctaDescription}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button className="group inline-flex items-center gap-3 px-8 py-4 md:px-12 md:py-6 bg-gradient-to-r from-white to-slate-100 text-slate-900 rounded-full font-semibold text-base md:text-lg hover:from-slate-50 hover:to-slate-200 transition-all duration-300 hover:scale-105 shadow-2xl">
                Pide tu Demo Hoy
                <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
