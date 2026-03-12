"use client"
import type React from "react"
import type { ComponentProps, ReactNode } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { FacebookIcon, InstagramIcon, LinkedinIcon, YoutubeIcon, MapPin } from "lucide-react"
import { StaffDigitalLogoDark } from "@/components/staffdigital-logo"

interface FooterLink {
  title: string
  href: string
  icon?: React.ComponentType<{ className?: string }>
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
  {
    label: "Siguenos",
    links: [
      { title: "Facebook", href: "#", icon: FacebookIcon },
      { title: "Instagram", href: "#", icon: InstagramIcon },
      { title: "Youtube", href: "#", icon: YoutubeIcon },
      { title: "LinkedIn", href: "#", icon: LinkedinIcon },
    ],
  },
]

export function Footer() {
  return (
    <footer className="relative w-full border-t border-white/10 bg-[radial-gradient(35%_128px_at_50%_0%,theme(backgroundColor.white/8%),transparent)]">
      <div className="max-w-6xl mx-auto px-8 py-16 lg:py-20">

        {/* Logo centered at top */}
        <AnimatedContainer className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <StaffDigitalLogoDark variant="full" size="lg" />
          </div>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            Automatizacion IA para empresas. Chat inteligente, flujos de trabajo y automatizaciones, totalmente gestionados.
          </p>
        </AnimatedContainer>

        {/* 4 Link Columns - centered */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-16 mb-12">
          {footerLinks.map((section, index) => (
            <AnimatedContainer key={section.label} delay={0.1 + index * 0.1}>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground/80 mb-4">{section.label}</h3>
                <ul className="text-muted-foreground space-y-2.5 text-sm">
                  {section.links.map((link) => (
                    <li key={link.title}>
                      <a
                        href={link.href}
                        className="hover:text-foreground inline-flex items-center transition-all duration-300 whitespace-nowrap"
                      >
                        {link.icon && <link.icon className="me-1.5 size-4" />}
                        {link.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedContainer>
          ))}
        </div>

        {/* Addresses row */}
        <AnimatedContainer delay={0.5} className="mb-12">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
              <div className="text-muted-foreground text-xs leading-relaxed">
                <span className="text-foreground/80 font-medium">Barcelona</span>{" · "}
                Carrer d&apos;Arago, 308, 1o 2a, 08009
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
              <div className="text-muted-foreground text-xs leading-relaxed">
                <span className="text-foreground/80 font-medium">Lisboa</span>{" · "}
                Av. Afonso Costa 22 B, Lisbon Business Center, 1900-036
              </div>
            </div>
          </div>
        </AnimatedContainer>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-foreground/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-xs">
            &copy; {new Date().getFullYear()} StaffDigital AI. Todos los derechos reservados.
          </p>
          <p className="text-muted-foreground text-xs">
            Desarrollo Web por{" "}
            <a href="https://www.webdesignvip.pt" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
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
