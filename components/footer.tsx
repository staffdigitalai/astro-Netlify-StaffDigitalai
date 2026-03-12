"use client"
import type React from "react"
import type { ComponentProps, ReactNode } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { FacebookIcon, InstagramIcon, LinkedinIcon, YoutubeIcon, MapPin, Phone } from "lucide-react"
import { StaffDigitalLogoDark } from "@/components/staffdigital-logo"

interface FooterLink {
  title: string
  href: string
}

interface FooterSection {
  label: string
  links: FooterLink[]
}

const footerLinks: FooterSection[] = [
  {
    label: "Producto",
    links: [
      { title: "Funcionalidades", href: "/#servicos" },
      { title: "Equipo IA", href: "/#servicos" },
      { title: "Calculadora ROI", href: "/#testemunhos" },
      { title: "Testimonios", href: "/#testemunhos" },
    ],
  },
  {
    label: "Sectores",
    links: [
      { title: "Concesionarios", href: "/sectores/concesionarios" },
      { title: "Clinicas", href: "/sectores/clinicas" },
      { title: "Dentistas", href: "/sectores/dentistas" },
      { title: "Peluquerias", href: "/sectores/peluquerias" },
      { title: "Restaurantes", href: "/sectores/restaurantes" },
      { title: "Retail", href: "/sectores/retail" },
      { title: "Oficinas", href: "/sectores/oficinas" },
      { title: "Serv. Tecnicos", href: "/sectores/servicios-tecnicos" },
    ],
  },
  {
    label: "Empresa",
    links: [
      { title: "Sobre Nosotros", href: "/#sobre" },
      { title: "Inicio", href: "/#inicio" },
      { title: "Privacidad", href: "/privacy" },
      { title: "Terminos", href: "/terms" },
    ],
  },
]

const socialLinks = [
  { icon: FacebookIcon, href: "#", label: "Facebook" },
  { icon: InstagramIcon, href: "#", label: "Instagram" },
  { icon: YoutubeIcon, href: "#", label: "Youtube" },
  { icon: LinkedinIcon, href: "#", label: "LinkedIn" },
]

export function Footer() {
  return (
    <footer className="relative w-full border-t border-white/10 bg-[radial-gradient(35%_128px_at_50%_0%,theme(backgroundColor.white/8%),transparent)]">
      <div className="max-w-6xl mx-auto px-8 py-16 lg:py-20">

        {/* Top row: 3 link columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 md:gap-16 mb-14">
          {footerLinks.map((section, index) => (
            <AnimatedContainer key={section.label} delay={0.1 + index * 0.1}>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-white/80 mb-5">{section.label}</h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.title}>
                      <a
                        href={link.href}
                        className="text-white/50 hover:text-white text-sm transition-all duration-300 whitespace-nowrap"
                      >
                        {link.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedContainer>
          ))}
        </div>

        {/* CTA Banner — full width */}
        <AnimatedContainer delay={0.4} className="mb-14">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="md:max-w-md">
              <h3 className="text-white font-semibold text-lg mb-2">Habla con un Especialista</h3>
              <p className="text-white/50 text-sm leading-relaxed">
                Descubre como la IA puede transformar tu negocio. Solicita una llamada personalizada sin compromiso.
              </p>
            </div>
            <a
              href="https://wa.me/34600000000?text=Hola%2C%20me%20gustaria%20solicitar%20una%20llamada%20comercial"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 shrink-0 bg-white text-black font-medium text-sm py-3 px-8 rounded-full hover:bg-gray-100 hover:scale-[1.02] transition-all duration-300"
            >
              <Phone className="w-4 h-4" />
              Solicitar Llamada
            </a>
          </div>
        </AnimatedContainer>

        {/* Logo + social row */}
        <AnimatedContainer delay={0.5} className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-4">
            <StaffDigitalLogoDark variant="full" size="lg" />
          </div>
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all duration-300"
              >
                <social.icon className="w-4 h-4 text-white/60" />
              </a>
            ))}
          </div>
        </AnimatedContainer>

        {/* Addresses row */}
        <AnimatedContainer delay={0.5} className="mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16">
            <div className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-white/30 shrink-0" />
              <span className="text-white/40 text-xs">
                <span className="text-white/60 font-medium">Barcelona</span>{" · "}
                Carrer d&apos;Arago, 308, 1o 2a, 08009
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-white/30 shrink-0" />
              <span className="text-white/40 text-xs">
                <span className="text-white/60 font-medium">Lisboa</span>{" · "}
                Av. Afonso Costa 22 B, Lisbon Business Center, 1900-036
              </span>
            </div>
          </div>
        </AnimatedContainer>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs">
            &copy; {new Date().getFullYear()} StaffDigital AI. Todos los derechos reservados.
          </p>
          <p className="text-white/30 text-xs">
            Desarrollo Web por{" "}
            <a href="https://www.webdesignvip.pt" target="_blank" rel="noopener noreferrer" className="hover:text-white/60 transition-colors">
              Web Design VIP
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

type ViewAnimationProps = {
  delay?: number
  className?: ComponentProps<typeof motion.div>["className"]
  children: ReactNode
}

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return children
  }

  return (
    <motion.div
      initial={{ filter: "blur(4px)", translateY: -8, opacity: 0 }}
      whileInView={{ filter: "blur(0px)", translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
