"use client"

import { FacebookIcon, InstagramIcon, LinkedinIcon, YoutubeIcon, MapPin } from "lucide-react"
import { StaffDigitalLogoDark } from "@/components/staffdigital-logo"

const solucionesLinks = [
  { title: "Agentes IA con Voz Humana ★", href: "/soluciones/agentes-ia-voz-humana" },
  { title: "Atención Telefónica IA", href: "/soluciones/atencion-telefonica-ia" },
  { title: "WhatsApp IA Empresas", href: "/soluciones/whatsapp-ia-empresas" },
  { title: "Lead Generation IA", href: "/soluciones/lead-generation-ia" },
  { title: "Agente de Soporte IA", href: "/soluciones/agente-soporte-ia" },
  { title: "Ver todas las soluciones", href: "/soluciones" },
]

const productLinks = [
  { title: "Precios", href: "/precios" },
  { title: "Tecnología", href: "/tecnologia" },
  { title: "Integraciones", href: "/integraciones" },
  { title: "Seguridad", href: "/seguridad-compliance" },
  { title: "Sectores", href: "/sectores" },
]

const empresaLinks = [
  { title: "Sobre Nosotros", href: "/nosotros" },
  { title: "Solicitar Demo", href: "/demo" },
  { title: "FAQ", href: "/faq" },
  { title: "Metodología", href: "/metodologia" },
]

const recursosLinks = [
  { title: "Blog", href: "/blog" },
  { title: "Casos de Éxito", href: "/casos" },
  { title: "Guías y Recursos", href: "/blog" },
  { title: "Sectores", href: "/sectores" },
]

const socialLinks = [
  { icon: FacebookIcon, href: "https://www.facebook.com/staffdigitalai", label: "Facebook" },
  { icon: InstagramIcon, href: "https://www.instagram.com/staffdigitalai", label: "Instagram" },
  { icon: YoutubeIcon, href: "https://www.youtube.com/@staffdigitalai", label: "Youtube" },
  { icon: LinkedinIcon, href: "https://www.linkedin.com/company/staffdigitalai", label: "LinkedIn" },
]

export function Footer() {
  return (
    <footer className="relative w-full border-t border-white/10 bg-[radial-gradient(35%_128px_at_50%_0%,theme(backgroundColor.white/8%),transparent)]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 py-16 lg:py-20">
        {/* 5 Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-12">
          {/* Column 1: Logo + Slogan + Addresses + Social Icons */}
          <div className="space-y-5 lg:col-span-1">
            <StaffDigitalLogoDark variant="full" size="md" />
            <p className="text-white/50 text-sm leading-relaxed">
              Agentes IA con Voz Humana para empresas. Chat inteligente, flujos de trabajo y automatizaciónes.
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-white/40 mt-0.5 shrink-0" />
                <p className="text-white/50 text-sm leading-relaxed">
                  Carrer d&apos;Aragó, 308, 1o 2a<br />
                  08009 Barcelona
                </p>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-white/40 mt-0.5 shrink-0" />
                <p className="text-white/50 text-sm leading-relaxed">
                  Av. Afonso Costa 22 B<br />
                  Lisbon Business Center<br />
                  1900-036 Lisboa
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all duration-200"
                >
                  <social.icon className="w-4 h-4 text-white/60" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Soluciones */}
          <div>
            <h3 className="text-sm font-medium text-white/80 mb-4">Soluciones</h3>
            <ul className="space-y-3">
              {solucionesLinks.map((link) => (
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

          {/* Column 3: Producto */}
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

          {/* Column 4: Empresa */}
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

          {/* Column 5: Recursos */}
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
        </div>

        {/* Legal Links */}
        <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mb-4">
          <a href="/privacidad" className="text-white/40 hover:text-white/70 text-xs transition-colors">
            Política de Privacidad
          </a>
          <a href="/aviso-legal" className="text-white/40 hover:text-white/70 text-xs transition-colors">
            Aviso Legal
          </a>
          <a href="/cookies" className="text-white/40 hover:text-white/70 text-xs transition-colors">
            Política de Cookies
          </a>
          <a href="/terminos" className="text-white/40 hover:text-white/70 text-xs transition-colors">
            Términos y Condiciones
          </a>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            &copy; {new Date().getFullYear()} StaffDigital AI. Todos los derechos reservados.
          </p>
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
