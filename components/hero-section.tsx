"use client"

import { Button } from "@/components/ui/button"
import RotatingText from "./RotatingText"
import { useFormModals } from "@/components/contact-form-modals"

const ArrowRight = () => (
  <svg
    className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
)

const Play = () => (
  <svg
    className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m-6-8h8a2 2 0 012 2v8a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2z"
    />
  </svg>
)

export function HeroSection() {
  const { openContactForm, openBudgetForm } = useFormModals()
  
  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20 relative">
      <div className="max-w-4xl mx-auto text-center relative z-10 animate-fade-in-hero">
        {/* Badge */}
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-8 mt-12 animate-fade-in-badge">
          <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse"></span>
          Agentes IA con Voz Humana
        </div>

        {/* Main Heading — fixed text for SEO, no animation on H1 */}
        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-balance mb-6 animate-fade-in-heading">
          <span className="text-foreground">Tus Clientes Hablan con</span>
          <br />
          <span className="bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent mt-2 inline-block">
            una Voz Humana, no un Robot
          </span>
        </h1>

        {/* Rotating words — decorative, outside H1 */}
        <div className="flex items-center justify-center gap-2 mb-6 animate-fade-in-heading">
          <span className="text-lg sm:text-xl md:text-2xl text-white/70 font-light">Atención</span>
          <RotatingText
            texts={["Telefónica", "por WhatsApp", "en tu Web", "Omnicanal", "24/7"]}
            mainClassName="px-2 sm:px-3 bg-white text-black overflow-hidden py-1 sm:py-2 justify-center rounded-lg shadow-lg text-lg sm:text-xl md:text-2xl font-semibold"
            staggerFrom={"last"}
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

        {/* Subheading */}
        <p className="text-base sm:text-xl md:text-2xl text-white/90 text-balance max-w-sm sm:max-w-3xl mx-auto mb-8 sm:mb-12 leading-relaxed px-4 sm:px-0 animate-fade-in-subheading font-light">
          Agentes IA con voces indistinguibles de personas reales. Atienden llamadas, WhatsApp y chat web con el trato humano que tus clientes merecen. Tú decides si voz masculina o femenina.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 sm:mb-16 animate-fade-in-buttons">
          <Button
            size="lg"
            onClick={openContactForm}
            className="bg-white text-black rounded-full px-8 py-4 text-lg font-medium transition-all duration-300 hover:bg-gray-50 hover:scale-105 hover:shadow-lg group cursor-pointer relative overflow-hidden"
          >
            Habla con un Experto
            <ArrowRight />
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={openBudgetForm}
            className="rounded-full px-8 py-4 text-lg font-medium border-border hover:bg-accent transition-all duration-200 hover:scale-105 group bg-transparent cursor-pointer"
          >
            Pedir Presupuesto
          </Button>
        </div>

        {/* Technology Partners */}
        <div className="text-center px-4 hidden sm:block overflow-hidden animate-fade-in-trust">
          <p className="text-sm text-white/70 mb-6">Nuestros Socios Tecnológicos</p>
          <div className="relative overflow-hidden w-full max-w-5xl mx-auto">
            {/* Left blur fade */}
            <div className="absolute left-0 top-0 w-16 h-full bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
            {/* Right blur fade */}
            <div className="absolute right-0 top-0 w-16 h-full bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>
            <div className="flex items-center gap-10 opacity-60 hover:opacity-80 transition-all duration-500 animate-slide-left">
              <div className="flex items-center gap-10 whitespace-nowrap">
                <div className="text-sm font-medium">Ringover</div>
                <div className="text-sm font-medium">Aircall</div>
                <div className="text-sm font-medium">Twilio</div>
                <div className="text-sm font-medium">Telnyx</div>
                <div className="text-sm font-medium">DIDWW</div>
                <div className="text-sm font-medium">ChatGPT</div>
                <div className="text-sm font-medium">Claude</div>
                <div className="text-sm font-medium">Notion AI</div>
                <div className="text-sm font-medium">Asana</div>
                <div className="text-sm font-medium">Airtable</div>
                <div className="text-sm font-medium">ClickUp</div>
                <div className="text-sm font-medium">Trello</div>
                <div className="text-sm font-medium">Monday.com</div>
                <div className="text-sm font-medium">Google Workspace</div>
                <div className="text-sm font-medium">Microsoft 365</div>
                <div className="text-sm font-medium">Zapier</div>
                <div className="text-sm font-medium">Typeform</div>
                <div className="text-sm font-medium">WordPress</div>
                <div className="text-sm font-medium">Elementor AI</div>
                <div className="text-sm font-medium">Webflow</div>
                <div className="text-sm font-medium">Framer</div>
                <div className="text-sm font-medium">Wix Studio</div>
              </div>
              {/* Duplicate for seamless loop */}
              <div className="flex items-center gap-10 whitespace-nowrap">
                <div className="text-sm font-medium">Ringover</div>
                <div className="text-sm font-medium">Aircall</div>
                <div className="text-sm font-medium">Twilio</div>
                <div className="text-sm font-medium">Telnyx</div>
                <div className="text-sm font-medium">DIDWW</div>
                <div className="text-sm font-medium">ChatGPT</div>
                <div className="text-sm font-medium">Claude</div>
                <div className="text-sm font-medium">Notion AI</div>
                <div className="text-sm font-medium">Asana</div>
                <div className="text-sm font-medium">Airtable</div>
                <div className="text-sm font-medium">ClickUp</div>
                <div className="text-sm font-medium">Trello</div>
                <div className="text-sm font-medium">Monday.com</div>
                <div className="text-sm font-medium">Google Workspace</div>
                <div className="text-sm font-medium">Microsoft 365</div>
                <div className="text-sm font-medium">Zapier</div>
                <div className="text-sm font-medium">Typeform</div>
                <div className="text-sm font-medium">WordPress</div>
                <div className="text-sm font-medium">Elementor AI</div>
                <div className="text-sm font-medium">Webflow</div>
                <div className="text-sm font-medium">Framer</div>
                <div className="text-sm font-medium">Wix Studio</div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Technology Partners */}
        <div className="text-center px-4 mb-8 sm:hidden overflow-hidden animate-fade-in-trust">
          <p className="text-sm text-white/70 mb-6">Nuestros Socios Tecnológicos</p>
          <div className="relative overflow-hidden w-full max-w-sm mx-auto">
            {/* Left blur fade */}
            <div className="absolute left-0 top-0 w-8 h-full bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
            {/* Right blur fade */}
            <div className="absolute right-0 top-0 w-8 h-full bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>
            <div className="flex items-center gap-6 opacity-60 animate-slide-left-mobile">
              <div className="flex items-center gap-6 whitespace-nowrap">
                <div className="text-xs font-medium">Ringover</div>
                <div className="text-xs font-medium">Aircall</div>
                <div className="text-xs font-medium">Twilio</div>
                <div className="text-xs font-medium">ChatGPT</div>
                <div className="text-xs font-medium">Claude</div>
                <div className="text-xs font-medium">Zapier</div>
                <div className="text-xs font-medium">Airtable</div>
                <div className="text-xs font-medium">Notion AI</div>
                <div className="text-xs font-medium">Google Workspace</div>
                <div className="text-xs font-medium">Microsoft 365</div>
                <div className="text-xs font-medium">WordPress</div>
                <div className="text-xs font-medium">Webflow</div>
              </div>
              {/* Duplicate for seamless loop */}
              <div className="flex items-center gap-6 whitespace-nowrap">
                <div className="text-xs font-medium">Ringover</div>
                <div className="text-xs font-medium">Aircall</div>
                <div className="text-xs font-medium">Twilio</div>
                <div className="text-xs font-medium">ChatGPT</div>
                <div className="text-xs font-medium">Claude</div>
                <div className="text-xs font-medium">Zapier</div>
                <div className="text-xs font-medium">Airtable</div>
                <div className="text-xs font-medium">Notion AI</div>
                <div className="text-xs font-medium">Google Workspace</div>
                <div className="text-xs font-medium">Microsoft 365</div>
                <div className="text-xs font-medium">WordPress</div>
                <div className="text-xs font-medium">Webflow</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
