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
      { title: "Servicios Tecnicos", href: "/sectores/servicios-tecnicos" },
    ],
  },
  {
    label: "Empresa",
    links: [
      { title: "Sobre Nosotros", href: "/#sobre" },
      { title: "Inicio", href: "/#inicio" },
      { title: "Politica de Privacidad", href: "/privacy" },
      { title: "Terminos de Servicio", href: "/terms" },
    ],
  },
  {
    label: "Redes Sociales",
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
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
        {/* Top: Logo + Columns */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Logo + Addresses */}
          <AnimatedContainer className="lg:w-1/3 space-y-6">
            <StaffDigitalLogoDark variant="full" size="lg" />
            <p className="text-muted-foreground text-sm max-w-xs">
              Automatizacion IA para empresas. Chat inteligente, flujos de trabajo y automatizaciones, totalmente gestionados.
            </p>

            {/* Office Addresses */}
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                <div className="text-muted-foreground text-xs leading-relaxed">
                  <span className="text-foreground/80 font-medium">Barcelona</span><br />
                  Carrer d&apos;Arago, 308, 1o 2a<br />
                  08009 Barcelona, Espana
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                <div className="text-muted-foreground text-xs leading-relaxed">
                  <span className="text-foreground/80 font-medium">Lisboa</span><br />
                  Av. Afonso Costa 22 B<br />
                  Lisbon Business Center<br />
                  1900-036 Lisboa, Portugal
                </div>
              </div>
            </div>
          </AnimatedContainer>

          {/* 4 Link Columns */}
          <div className="lg:w-2/3 grid grid-cols-2 md:grid-cols-4 gap-8">
            {footerLinks.map((section, index) => (
              <AnimatedContainer key={section.label} delay={0.1 + index * 0.1}>
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground/80 mb-4">{section.label}</h3>
                  <ul className="text-muted-foreground space-y-2.5 text-sm">
                    {section.links.map((link) => (
                      <li key={link.title}>
                        <a
                          href={link.href}
                          className="hover:text-foreground inline-flex items-center transition-all duration-300"
                        >
                          {link.icon && <link.icon className="me-1 size-4" />}
                          {link.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedContainer>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-foreground/10 flex flex-col sm:flex-row items-center justify-between gap-4">
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
