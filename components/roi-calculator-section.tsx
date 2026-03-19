"use client"

import { useState, useEffect } from "react"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, Users, DollarSign } from "lucide-react"

interface CalculatorInputs {
  monthlyVisitors: number
  currentConversionRate: number
  averageOrderValue: number
  businessType: string
}

export function ROICalculatorSection() {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    monthlyVisitors: 10000,
    currentConversionRate: 2,
    averageOrderValue: 150,
    businessType: "ecommerce",
  })

  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.1 },
    )

    const section = document.getElementById("roi-calculator")
    if (section) {
      observer.observe(section)
    }

    return () => observer.disconnect()
  }, [])

  const getBusinessDefaults = () => {
    const businessDefaults = {
      ecommerce: { avgOrder: 85, maxOrder: 500, conversion: 35 },
      retail: { avgOrder: 65, maxOrder: 300, conversion: 30 },
      realestate: { avgOrder: 5000, maxOrder: 50000, conversion: 40 },
      hospitality: { avgOrder: 180, maxOrder: 1000, conversion: 25 },
      healthcare: { avgOrder: 250, maxOrder: 2000, conversion: 45 },
      finance: { avgOrder: 1200, maxOrder: 10000, conversion: 35 },
      automotive: { avgOrder: 25000, maxOrder: 100000, conversion: 30 },
      default: { avgOrder: 150, maxOrder: 2000, conversion: 35 },
    }

    return businessDefaults[inputs.businessType as keyof typeof businessDefaults] || businessDefaults.default
  }

  useEffect(() => {
    const defaults = getBusinessDefaults()
    setInputs((prev) => ({ ...prev, averageOrderValue: defaults.avgOrder }))
  }, [inputs.businessType])

  const businessConfig = getBusinessDefaults()

  // Current metrics
  const currentLeads = Math.round((inputs.monthlyVisitors * inputs.currentConversionRate) / 100)
  const currentRevenue = currentLeads * inputs.averageOrderValue

  // Improved metrics with AI
  const newConversionRate = inputs.currentConversionRate * (1 + businessConfig.conversion / 100)
  const newLeads = Math.round((inputs.monthlyVisitors * newConversionRate) / 100)
  const newRevenue = newLeads * inputs.averageOrderValue

  // Gains
  const additionalLeads = newLeads - currentLeads
  const additionalRevenue = newRevenue - currentRevenue

  return (
    <section id="roi-calculator" className="py-12 md:py-16 px-4 relative">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div
          className={`text-center mb-8 md:mb-10 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-4">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-white/80">Calculadora de ROI</span>
          </div>

          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 text-balance">
            Calcula tu{" "}
            <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
              potencial de crecimiento
            </span>
          </h2>
        </div>

        {/* Compact Calculator */}
        <div
          className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {/* Inputs Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 mb-8">
            {/* Business Type */}
            <div>
              <label className="block text-xs font-medium text-white/60 mb-2">Tipo de Negocio</label>
              <Select
                value={inputs.businessType}
                onValueChange={(value) => setInputs((prev) => ({ ...prev, businessType: value }))}
              >
                <SelectTrigger className="bg-white/5 border-white/10 text-white text-sm h-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-white/10">
                  <SelectItem value="ecommerce">E-commerce</SelectItem>
                  <SelectItem value="retail">Comercio</SelectItem>
                  <SelectItem value="realestate">Inmobiliaria</SelectItem>
                  <SelectItem value="hospitality">Hosteleria</SelectItem>
                  <SelectItem value="healthcare">Sanidad</SelectItem>
                  <SelectItem value="automotive">Automocion</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Monthly Visitors */}
            <div>
              <label className="block text-xs font-medium text-white/60 mb-2">
                Visitantes/mes: <span className="text-white">{inputs.monthlyVisitors.toLocaleString("es-ES")}</span>
              </label>
              <Slider
                value={[inputs.monthlyVisitors]}
                onValueChange={([value]) => setInputs((prev) => ({ ...prev, monthlyVisitors: value }))}
                max={100000}
                min={1000}
                step={1000}
                className="w-full mt-3"
              />
            </div>

            {/* Conversion Rate */}
            <div>
              <label className="block text-xs font-medium text-white/60 mb-2">
                Conversion actual: <span className="text-white">{inputs.currentConversionRate}%</span>
              </label>
              <Slider
                value={[inputs.currentConversionRate]}
                onValueChange={([value]) => setInputs((prev) => ({ ...prev, currentConversionRate: value }))}
                max={10}
                min={0.5}
                step={0.1}
                className="w-full mt-3"
              />
            </div>

            {/* Average Order Value */}
            <div>
              <label className="block text-xs font-medium text-white/60 mb-2">
                Valor medio: <span className="text-white">{inputs.averageOrderValue.toLocaleString("es-ES")}€</span>
              </label>
              <Slider
                value={[inputs.averageOrderValue]}
                onValueChange={([value]) => setInputs((prev) => ({ ...prev, averageOrderValue: value }))}
                max={businessConfig.maxOrder}
                min={25}
                step={inputs.businessType === "automotive" || inputs.businessType === "realestate" ? 1000 : 25}
                className="w-full mt-3"
              />
            </div>
          </div>

          {/* Results Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/5 rounded-xl p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Users className="w-4 h-4 text-white/50" />
                <span className="text-xs text-white/50">Leads actuales</span>
              </div>
              <div className="text-xl md:text-2xl font-bold text-white">{currentLeads}</div>
            </div>

            <div className="bg-white/5 rounded-xl p-4 text-center border border-orange-500/20">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Users className="w-4 h-4 text-orange-400" />
                <span className="text-xs text-orange-400">Leads con IA</span>
              </div>
              <div className="text-xl md:text-2xl font-bold text-white">{newLeads}</div>
            </div>

            <div className="bg-white/5 rounded-xl p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <DollarSign className="w-4 h-4 text-white/50" />
                <span className="text-xs text-white/50">Leads extra/mes</span>
              </div>
              <div className="text-xl md:text-2xl font-bold text-emerald-400">+{additionalLeads}</div>
            </div>

            <div className="bg-gradient-to-br from-orange-500/20 to-amber-500/20 rounded-xl p-4 text-center border border-orange-500/30">
              <div className="flex items-center justify-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-orange-400" />
                <span className="text-xs text-orange-400">Ingresos extra/ano</span>
              </div>
              <div className="text-xl md:text-2xl font-bold text-white">
                {(additionalRevenue * 12).toLocaleString("es-ES")}€
              </div>
            </div>
          </div>

          <p className="text-xs text-white/40 text-center mt-4">
            * Basado en medias del sector. Los resultados pueden variar.
          </p>
        </div>
      </div>
    </section>
  )
}
