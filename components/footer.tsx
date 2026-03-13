"use client"

import { FacebookIcon, InstagramIcon, LinkedinIcon, YoutubeIcon } from "lucide-react"
import { StaffDigitalLogoDark } from "@/components/staffdigital-logo"

const productLinks = [
  { title: "Funcionalidades", href: "/#funcionalidades" },
  { title: "Equipo IA", href: "/#equipo-ia" },
  { title: "Calculadora ROI", href: "/#calculadora" },
  { title: "Integracion", href: "/#integracion" },
]

const empresaLinks = [
  { title: "Sobre Nosotros", href: "/sobre-nosotros" },
  { title: "Contacto", href: "/contacto" },
  { title: "Politica de Privacidad", href: "/privacidad" },
  { title: "Terminos de Servicio", href: "/terminos" },
]

const recursosLinks = [
  { title: "Blog", href: "/blog" },
  { title: "Casos de Exito", href: "/casos" },
  { title: "Documentacion", href: "/docs" },
  { title: "Soporte", href: "/soporte" },
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
      <div className="max-w-6xl mx-auto px-6 sm:px-8 py-16 lg:py-20">
        {/* Top Section: Logo + Copyright */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-12">
          <StaffDigitalLogoDark variant="full" size="lg" />
          <p className="text-white/50 text-sm max-w-xs">
            &copy; {new Date().getFullYear()} StaffDigital AI. Todos los derechos reservados.
          </p>
        </div>

        {/* 4 Column Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Column 1: Producto */}
          <div>
            <h3 className="text-sm font-medium text-white/80 mb-4">Producto</h3>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.title}>
                  <a
                    href={link.href}
                    className="text-white/50 hover:text-white text-sm transition-colors duration-200"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Empresa */}
          <div>
            <h3 className="text-sm font-medium text-white/80 mb-4">Empresa</h3>
            <ul className="space-y-3">
              {empresaLinks.map((link) => (
                <li key={link.title}>
                  <a
                    href={link.href}
                    className="text-white/50 hover:text-white text-sm transition-colors duration-200"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Recursos */}
          <div>
            <h3 className="text-sm font-medium text-white/80 mb-4">Recursos</h3>
            <ul className="space-y-3">
              {recursosLinks.map((link) => (
                <li key={link.title}>
                  <a
                    href={link.href}
                    className="text-white/50 hover:text-white text-sm transition-colors duration-200"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Redes Sociales */}
          <div>
            <h3 className="text-sm font-medium text-white/80 mb-4">Redes Sociales</h3>
            <ul className="space-y-3">
              {socialLinks.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors duration-200"
                  >
                    <social.icon className="w-4 h-4" />
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/10 text-center">
          <p className="text-white/40 text-sm">
            Desarrollo Web por{" "}
            <a
              href="https://www.webdesignvip.pt"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/70 transition-colors"
            >
              Web Design VIP
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
