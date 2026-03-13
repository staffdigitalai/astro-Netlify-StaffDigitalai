"use client"
import type { ComponentProps, ReactNode } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { FacebookIcon, InstagramIcon, LinkedinIcon, YoutubeIcon, MapPin, Phone } from "lucide-react"
import { StaffDigitalLogoDark } from "@/components/staffdigital-logo"

const socialLinks = [
  { icon: FacebookIcon, href: "#", label: "Facebook" },
  { icon: InstagramIcon, href: "#", label: "Instagram" },
  { icon: YoutubeIcon, href: "#", label: "Youtube" },
  { icon: LinkedinIcon, href: "#", label: "LinkedIn" },
]

export function Footer() {
  return (
    <footer className="relative w-full border-t border-white/10 bg-[radial-gradient(35%_128px_at_50%_0%,theme(backgroundColor.white/8%),transparent)]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10 mb-12">
          <AnimatedContainer className="space-y-5">
            <StaffDigitalLogoDark variant="full" size="lg" />
            <p className="text-white/50 text-sm leading-relaxed">Automatizacion IA para empresas. Chat inteligente, flujos de trabajo y automatizaciones.</p>
            <div className="space-y-3 pt-1">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-white/30 mt-0.5 shrink-0" />
                <p className="text-white/40 text-xs leading-relaxed"><span className="text-white/60 font-medium">Barcelona</span><br />Carrer d&apos;Arago, 308, 1o 2a<br />08009 Barcelona</p>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-white/30 mt-0.5 shrink-0" />
                <p className="text-white/40 text-xs leading-relaxed"><span className="text-white/60 font-medium">Lisboa</span><br />Av. Afonso Costa 22 B<br />Lisbon Business Center<br />1900-036 Lisboa</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5 pt-2">
              {socialLinks.map((social) => (<a key={social.label} href={social.href} aria-label={social.label} className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all duration-300"><social.icon className="w-3.5 h-3.5 text-white/50" /></a>))}
            </div>
          </AnimatedContainer>
          <AnimatedContainer delay={0.15}>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/80 mb-5">Producto</h3>
            <ul className="space-y-3">
              {[{title:"Funcionalidades",href:"/#servicos"},{title:"Equipo IA",href:"/#servicos"},{title:"Calculadora ROI",href:"/#testemunhos"},{title:"Testimonios",href:"/#testemunhos"}].map((link) => (<li key={link.title}><a href={link.href} className="text-white/50 hover:text-white text-sm transition-all duration-300">{link.title}</a></li>))}
            </ul>
          </AnimatedContainer>
          <AnimatedContainer delay={0.25}>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/80 mb-5">Sectores</h3>
            <ul className="space-y-3">
              {[{title:"Concesionarios",href:"/sectores/concesionarios"},{title:"Clinicas",href:"/sectores/clinicas"},{title:"Dentistas",href:"/sectores/dentistas"},{title:"Peluquerias",href:"/sectores/peluquerias"},{title:"Restaurantes",href:"/sectores/restaurantes"},{title:"Retail",href:"/sectores/retail"},{title:"Oficinas",href:"/sectores/oficinas"},{title:"Serv. Tecnicos",href:"/sectores/servicios-tecnicos"}].map((link) => (<li key={link.title}><a href={link.href} className="text-white/50 hover:text-white text-sm transition-all duration-300">{link.title}</a></li>))}
            </ul>
          </AnimatedContainer>
          <AnimatedContainer delay={0.35}>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 space-y-4 h-fit">
              <h3 className="text-white font-semibold text-base leading-snug">Habla con un Especialista</h3>
              <p className="text-white/50 text-sm leading-relaxed">Descubre como la IA puede transformar tu negocio. Solicita una llamada personalizada sin compromiso.</p>
              <a href="https://wa.me/34600000000?text=Hola%2C%20me%20gustaria%20solicitar%20una%20llamada%20comercial" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 w-full justify-center bg-white text-black font-medium text-sm py-3 px-6 rounded-full hover:bg-gray-100 hover:scale-[1.02] transition-all duration-300"><Phone className="w-4 h-4" />Solicitar Chamada</a>
              <p className="text-white/30 text-xs text-center">Respuesta en 24h</p>
            </div>
          </AnimatedContainer>
        </div>
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs">&copy; {new Date().getFullYear()} StaffDigital AI. Todos los derechos reservados.</p>
          <p className="text-white/30 text-xs">Desarrollo Web por{" "}<a href="https://www.webdesignvip.pt" target="_blank" rel="noopener noreferrer" className="hover:text-white/60 transition-colors">Web Design VIP</a></p>
        </div>
      </div>
    </footer>
  )
}

type ViewAnimationProps = { delay?: number; className?: ComponentProps<typeof motion.div>["className"]; children: ReactNode }

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
  const shouldReduceMotion = useReducedMotion()
  if (shouldReduceMotion) { return children }
  return (<motion.div initial={{ filter: "blur(4px)", translateY: -8, opacity: 0 }} whileInView={{ filter: "blur(0px)", translateY: 0, opacity: 1 }} viewport={{ once: true }} transition={{ delay, duration: 0.8 }} className={className}>{children}</motion.div>)
}
