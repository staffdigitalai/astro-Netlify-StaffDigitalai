"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Phone } from "lucide-react"
import { useFormModals } from "@/components/contact-form-modals"
import RotatingText from "@/components/RotatingText"

export function HeroBlock() {
  const { openContactForm } = useFormModals()

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20 relative">
      <div className="max-w-4xl mx-auto text-center relative z-10 animate-fade-in-hero">
        {/* Badge */}
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-8 mt-12 animate-fade-in-badge">
          <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse" />
          Solución completa — no software DIY
        </div>

        {/* H1 */}
        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-balance mb-2 animate-fade-in-heading">
          <span className="text-foreground">No vendemos software.</span>
          <br />
          <span className="bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent mt-2 inline-block">
            Somos tu equipo digital.
          </span>
        </h1>

        {/* Tagline */}
        <p className="text-sm sm:text-base text-white/40 mb-6 animate-fade-in-heading tracking-widest uppercase font-light">
          The AI Company Builder
        </p>

        {/* Rotating context */}
        <div className="flex items-center justify-center gap-2 mb-6 animate-fade-in-heading">
          <span className="text-lg sm:text-xl md:text-2xl text-white/70 font-light">Atendemos</span>
          <RotatingText
            texts={["llamadas", "WhatsApp", "tu web", "citas", "leads"]}
            mainClassName="px-2 sm:px-3 bg-white text-black overflow-hidden py-1 sm:py-2 justify-center rounded-lg shadow-lg text-lg sm:text-xl md:text-2xl font-semibold"
            staggerFrom="last"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-120%" }}
            staggerDuration={0.025}
            splitLevelClassName="overflow-hidden pb-1"
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            rotationInterval={2500}
          />
          <span className="text-lg sm:text-xl md:text-2xl text-white/70 font-light">con IA</span>
        </div>

        {/* Subtitle */}
        <p className="text-base sm:text-xl md:text-2xl text-white/80 text-balance max-w-2xl mx-auto mb-3 leading-relaxed px-4 sm:px-0 animate-fade-in-subheading font-light">
          Vendemos, agendamos, cualificamos y damos soporte 24/7 con voz humana real. Tú solo cierras ventas.
        </p>

        {/* Unified inbox */}
        <p className="text-sm sm:text-base text-white/50 mb-8 sm:mb-12 animate-fade-in-subheading">
          Todos tus canales y CRMs en una sola bandeja de entrada inteligente.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 sm:mb-16 animate-fade-in-buttons">
          <Button
            size="lg"
            onClick={openContactForm}
            className="bg-white text-black rounded-full px-8 py-4 text-lg font-medium transition-all duration-300 hover:bg-gray-50 hover:scale-105 hover:shadow-lg group cursor-pointer"
          >
            Habla con un experto
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-full px-8 py-4 text-lg font-medium border-white/20 hover:bg-white/10 transition-all duration-200 hover:scale-105 group bg-transparent cursor-pointer"
          >
            <a href="tel:+34931229129">
              <Phone className="mr-2 h-5 w-5" />
              Prueba la voz IA ahora
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
