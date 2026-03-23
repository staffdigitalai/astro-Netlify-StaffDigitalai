"use client"

import { useState, useEffect, useRef } from "react"
import { Menu, X, ArrowRight, ChevronDown, Stethoscope, Scissors, UtensilsCrossed, Car, ShoppingBag, Building2, Warehouse, Wrench, BriefcaseMedical, Globe, MessageSquare, Layers, Shield, Home, GraduationCap, Dumbbell } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { StaffDigitalLogo } from "@/components/staffdigital-logo"

const services = [
  { name: "Atencion Telefonica IA", href: "/soluciones/atencion-telefonica-ia", icon: MessageSquare, description: "Agentes de voz inteligentes 24/7", featured: true },
  { name: "WhatsApp IA Empresas", href: "/soluciones/whatsapp-ia-empresas", icon: MessageSquare, description: "Automatiza WhatsApp Business", featured: true },
  { name: "IA Conversacional", href: "/soluciones/ia-conversacional", icon: MessageSquare, description: "Chatbots y cualificacion de leads" },
  { name: "Automatizacion Omnicanal", href: "/soluciones/automatizacion-omnicanal", icon: Layers, description: "Bandeja unificada y workflows" },
  { name: "Gestion de Citas IA", href: "/soluciones/gestion-citas-ia", icon: GraduationCap, description: "Reservas automatizadas" },
  { name: "Cualificacion de Leads", href: "/soluciones/cualificacion-leads", icon: BriefcaseMedical, description: "Scoring y nurturing automatico" },
  { name: "Seguridad IA", href: "/soluciones/seguridad-ia", icon: Shield, description: "Videovigilancia inteligente" },
  { name: "Home Staging IA", href: "/soluciones/home-staging-ia", icon: Home, description: "Marketing inmobiliario con IA" },
  { name: "Analisis Documental IA", href: "/soluciones/analisis-documental-ia", icon: Layers, description: "Procesamiento de documentos" },
]

const sectors = [
  { name: "Concesionarios", href: "/sectores/concesionarios", icon: Car, description: "Venta y posventa de vehiculos" },
  { name: "Clinicas", href: "/sectores/clinicas", icon: BriefcaseMedical, description: "Clinicas y centros medicos" },
  { name: "Hospitales", href: "/sectores/hospitales", icon: Stethoscope, description: "Centros hospitalarios" },
  { name: "Veterinarias", href: "/sectores/veterinarias", icon: BriefcaseMedical, description: "Clinicas veterinarias" },
  { name: "Centros de Belleza", href: "/sectores/peluquerias", icon: Scissors, description: "Belleza y estetica" },
  { name: "Restaurantes", href: "/sectores/restaurantes", icon: UtensilsCrossed, description: "Hosteleria y restauracion" },
  { name: "Turismo", href: "/sectores/turismo", icon: Globe, description: "Hoteles y agencias de viajes" },
  { name: "Retail", href: "/sectores/retail", icon: ShoppingBag, description: "Comercio minorista" },
  { name: "Oficinas", href: "/sectores/oficinas", icon: Building2, description: "Espacios corporativos" },
  { name: "Logistica", href: "/sectores/almacenes", icon: Warehouse, description: "Almacenes y distribucion" },
  { name: "Servicios Tecnicos", href: "/sectores/servicios-tecnicos", icon: Wrench, description: "Asistencia tecnica y SAT" },
  { name: "Inmobiliarias", href: "/sectores/inmobiliarias", icon: Home, description: "Agencias inmobiliarias" },
  { name: "Educacion", href: "/sectores/educacion", icon: GraduationCap, description: "Colegios y academias" },
  { name: "Gimnasios", href: "/sectores/gimnasios", icon: Dumbbell, description: "Centros deportivos" },
]

const languages = [
  { code: "es", label: "Espanol" },
  { code: "en", label: "English" },
  { code: "pt", label: "Portugues" },
]

const navItems = [
  { label: "Inicio", href: "/" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Soluciones", href: "/soluciones", dropdown: "services" },
  { label: "Sectores", href: "/sectores", dropdown: "sectors" },
  { label: "Precios", href: "/precios" },
  { label: "Blog", href: "/blog" },
  { label: "Casos", href: "/casos-exito" },
]

export function GlassmorphismNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [isSectorsOpen, setIsSectorsOpen] = useState(false)
  const [isLangOpen, setIsLangOpen] = useState(false)
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false)
  const [isMobileSectorsOpen, setIsMobileSectorsOpen] = useState(false)
  const [isMobileLangOpen, setIsMobileLangOpen] = useState(false)
  const [currentLang, setCurrentLang] = useState("es")
  const [isVisible, setIsVisible] = useState(true)
  const [hasLoaded, setHasLoaded] = useState(false)
  const [activeSection, setActiveSection] = useState<string>("#inicio")
  const lastScrollY = useRef(0)
  const servicesTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const sectorsTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const langTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasLoaded(true)
    }, 100)

    const controlNavbar = () => {
      if (typeof window !== "undefined") {
        const currentScrollY = window.scrollY
        if (currentScrollY > 50) {
          if (currentScrollY > lastScrollY.current && currentScrollY - lastScrollY.current > 5) {
            setIsVisible(false)
            setIsServicesOpen(false)
            setIsSectorsOpen(false)
            setIsLangOpen(false)
          } else if (lastScrollY.current - currentScrollY > 5) {
            setIsVisible(true)
          }
        } else {
          setIsVisible(true)
        }
        lastScrollY.current = currentScrollY
      }
    }

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar, { passive: true })
      return () => {
        window.removeEventListener("scroll", controlNavbar)
        clearTimeout(timer)
      }
    }

    return () => clearTimeout(timer)
  }, [])

  // Track active section on homepage using IntersectionObserver
  useEffect(() => {
    if (pathname !== "/") return

    const sectionIds = ["inicio", "sobre", "soluciones", "sectores", "testemunhos"]
    const observers: IntersectionObserver[] = []

    sectionIds.forEach((id) => {
      const element = document.getElementById(id)
      if (element) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setActiveSection(`#${id}`)
              }
            })
          },
          { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
        )
        observer.observe(element)
        observers.push(observer)
      }
    })

    return () => {
      observers.forEach((observer) => observer.disconnect())
    }
  }, [pathname])

  const handleServicesEnter = () => {
    if (servicesTimeoutRef.current) clearTimeout(servicesTimeoutRef.current)
    setIsSectorsOpen(false)
    setIsLangOpen(false)
    setIsServicesOpen(true)
  }

  const handleServicesLeave = () => {
    servicesTimeoutRef.current = setTimeout(() => setIsServicesOpen(false), 200)
  }

  const handleSectorsEnter = () => {
    if (sectorsTimeoutRef.current) clearTimeout(sectorsTimeoutRef.current)
    setIsServicesOpen(false)
    setIsLangOpen(false)
    setIsSectorsOpen(true)
  }

  const handleSectorsLeave = () => {
    sectorsTimeoutRef.current = setTimeout(() => setIsSectorsOpen(false), 200)
  }

  const handleLangEnter = () => {
    if (langTimeoutRef.current) clearTimeout(langTimeoutRef.current)
    setIsServicesOpen(false)
    setIsSectorsOpen(false)
    setIsLangOpen(true)
  }

  const handleLangLeave = () => {
    langTimeoutRef.current = setTimeout(() => setIsLangOpen(false), 200)
  }

  const scrollToSection = (href: string) => {
    if (href.startsWith("/")) return

    if (pathname !== "/") {
      window.location.href = "/" + href
      return
    }

    const element = document.querySelector(href)
    if (element) {
      const rect = element.getBoundingClientRect()
      const currentScrollY = window.pageYOffset || document.documentElement.scrollTop
      const elementAbsoluteTop = rect.top + currentScrollY
      const navbarHeight = 100
      const targetPosition = Math.max(0, elementAbsoluteTop - navbarHeight)
      window.scrollTo({ top: targetPosition, behavior: "smooth" })
    }
    setIsOpen(false)
    setIsServicesOpen(false)
    setIsSectorsOpen(false)
    setIsLangOpen(false)
  }

  const selectedLang = languages.find((l) => l.code === currentLang)

  // Check if nav item is active
  const isNavItemActive = (item: { label: string; href: string; dropdown?: string }) => {
    // On subpages, check if we're on a solutions or sectors page
    if (pathname.startsWith("/soluciones") && item.dropdown === "services") return true
    if (pathname.startsWith("/sectores") && item.dropdown === "sectors") return true
    
    // Check for blog and cases pages
    if (pathname.startsWith("/blog") && item.href === "/blog") return true
    if (pathname.startsWith("/casos-exito") && item.href === "/casos-exito") return true
    if (pathname.startsWith("/precios") && item.href === "/precios") return true
    if (pathname.startsWith("/nosotros") && item.href === "/nosotros") return true
    
    // Homepage active
    if (pathname === "/" && item.href === "/") return true
    
    return false
  }

  return (
    <>
      <nav
        className={`fixed top-4 md:top-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
          isVisible ? "translate-y-0 opacity-100" : "-translate-y-20 md:-translate-y-24 opacity-0"
        } ${hasLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        style={{
          transition: hasLoaded ? "all 0.5s ease-out" : "opacity 0.8s ease-out, transform 0.8s ease-out",
        }}
      >
        <div className="w-[92vw] max-w-xs md:max-w-5xl mx-auto">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-3 md:px-5 md:py-2">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link
                href="/"
                className="flex items-center hover:scale-105 transition-transform duration-200 cursor-pointer flex-shrink-0"
              >
                <StaffDigitalLogo variant="full" size="sm" />
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-1">
                {navItems.map((item) => {
                  if (item.dropdown === "services") {
                    const isActive = isNavItemActive(item)
                    return (
                      <div
                        key={item.label}
                        className="relative"
                        onMouseEnter={handleServicesEnter}
                        onMouseLeave={handleServicesLeave}
                      >
                        <button
                          className={`flex items-center gap-1 transition-all duration-200 text-sm font-medium cursor-pointer px-3 py-2 rounded-full ${
                            isActive 
                              ? "text-white bg-white/10" 
                              : "text-white/70 hover:text-white hover:bg-white/5"
                          }`}
                          onClick={() => setIsServicesOpen(!isServicesOpen)}
                        >
                          {item.label}
                          <ChevronDown
                            size={13}
                            className={`transition-transform duration-200 ${isServicesOpen ? "rotate-180" : ""}`}
                          />
                        </button>

                        {/* Services Dropdown */}
                        <div
                          className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-all duration-200 ${
                            isServicesOpen
                              ? "opacity-100 translate-y-0 pointer-events-auto"
                              : "opacity-0 -translate-y-2 pointer-events-none"
                          }`}
                        >
                          <div className="bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl p-3 shadow-2xl w-[480px]">
                            {/* Featured Service */}
                            {services.filter(s => s.featured).map((service) => {
                              const Icon = service.icon
                              return (
                                <Link
                                  key={service.name}
                                  href={service.href}
                                  className="flex items-center gap-3 px-3 py-3 rounded-xl bg-gradient-to-r from-primary/20 to-primary/5 border border-primary/30 hover:border-primary/50 transition-all duration-200 group mb-2"
                                  onClick={() => setIsServicesOpen(false)}
                                >
                                  <div className="w-10 h-10 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center group-hover:bg-primary/30 transition-all duration-200 flex-shrink-0">
                                    <Icon size={18} className="text-primary group-hover:text-primary transition-colors" />
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-2">
                                      <p className="text-sm font-semibold text-white group-hover:text-white transition-colors">
                                        {service.name}
                                      </p>
                                      <span className="text-[10px] font-medium bg-primary/30 text-primary px-1.5 py-0.5 rounded">ESTRELLA</span>
                                    </div>
                                    <p className="text-[11px] text-white/50 group-hover:text-white/70 transition-colors">
                                      {service.description}
                                    </p>
                                  </div>
                                  <ArrowRight size={14} className="text-primary/60 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                                </Link>
                              )
                            })}
                            {/* Other Services Grid */}
                            <div className="grid grid-cols-2 gap-0.5">
                              {services.filter(s => !s.featured).map((service) => {
                                const Icon = service.icon
                                return (
                                  <Link
                                    key={service.name}
                                    href={service.href}
                                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/10 transition-all duration-200 group"
                                    onClick={() => setIsServicesOpen(false)}
                                  >
                                    <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-200 flex-shrink-0">
                                      <Icon size={16} className="text-white/60 group-hover:text-white transition-colors" />
                                    </div>
                                    <div className="min-w-0">
                                      <p className="text-sm font-medium text-white/90 group-hover:text-white transition-colors truncate">
                                        {service.name}
                                      </p>
                                      <p className="text-[11px] text-white/35 group-hover:text-white/55 transition-colors truncate">
                                        {service.description}
                                      </p>
                                    </div>
                                  </Link>
                                )
                              })}
                            </div>
                            {/* View All Link */}
                            <Link
                              href="/soluciones"
                              className="flex items-center justify-center gap-2 mt-2 px-3 py-2 rounded-xl border border-white/10 hover:bg-white/5 hover:border-white/20 transition-all duration-200 group"
                              onClick={() => setIsServicesOpen(false)}
                            >
                              <span className="text-xs font-medium text-white/60 group-hover:text-white/80">Ver todas las soluciones</span>
                              <ArrowRight size={12} className="text-white/40 group-hover:text-white/60 group-hover:translate-x-0.5 transition-all" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    )
                  }

                  if (item.dropdown === "sectors") {
                    const isActive = isNavItemActive(item)
                    return (
                      <div
                        key={item.label}
                        className="relative"
                        onMouseEnter={handleSectorsEnter}
                        onMouseLeave={handleSectorsLeave}
                      >
                        <button
                          className={`flex items-center gap-1 transition-all duration-200 text-sm font-medium cursor-pointer px-3 py-2 rounded-full ${
                            isActive 
                              ? "text-white bg-white/10" 
                              : "text-white/70 hover:text-white hover:bg-white/5"
                          }`}
                          onClick={() => setIsSectorsOpen(!isSectorsOpen)}
                        >
                          {item.label}
                          <ChevronDown
                            size={13}
                            className={`transition-transform duration-200 ${isSectorsOpen ? "rotate-180" : ""}`}
                          />
                        </button>

                        {/* Sectors Dropdown */}
                        <div
                          className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-all duration-200 ${
                            isSectorsOpen
                              ? "opacity-100 translate-y-0 pointer-events-auto"
                              : "opacity-0 -translate-y-2 pointer-events-none"
                          }`}
                        >
                          <div className="bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl p-3 shadow-2xl w-[640px]">
                            <div className="grid grid-cols-3 gap-0.5">
                              {sectors.map((sector) => {
                                const Icon = sector.icon
                                return (
                                  <Link
                                    key={sector.name}
                                    href={sector.href}
                                    className="flex items-center gap-2 px-2.5 py-2 rounded-xl hover:bg-white/10 transition-all duration-200 group"
                                    onClick={() => setIsSectorsOpen(false)}
                                  >
                                    <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-200 flex-shrink-0">
                                      <Icon size={14} className="text-white/60 group-hover:text-white transition-colors" />
                                    </div>
                                    <div className="min-w-0">
                                      <p className="text-xs font-medium text-white/90 group-hover:text-white transition-colors truncate">
                                        {sector.name}
                                      </p>
                                    </div>
                                  </Link>
                                )
                              })}
                            </div>
                            {/* View All Link */}
                            <Link
                              href="/sectores"
                              className="flex items-center justify-center gap-2 mt-2 px-3 py-2 rounded-xl border border-white/10 hover:bg-white/5 hover:border-white/20 transition-all duration-200 group"
                              onClick={() => setIsSectorsOpen(false)}
                            >
                              <span className="text-xs font-medium text-white/60 group-hover:text-white/80">Ver todos los sectores</span>
                              <ArrowRight size={12} className="text-white/40 group-hover:text-white/60 group-hover:translate-x-0.5 transition-all" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    )
                  }

                  const isActive = isNavItemActive(item)
                  // Check if it's an internal page link (starts with /) vs anchor link (starts with #)
                  const isPageLink = item.href.startsWith("/")
                  
                  if (isPageLink) {
                    return (
                      <Link
                        key={item.label}
                        href={item.href}
                        className={`transition-all duration-200 text-sm font-medium cursor-pointer px-3 py-2 rounded-full ${
                          isActive 
                            ? "text-white bg-white/10" 
                            : "text-white/70 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        {item.label}
                      </Link>
                    )
                  }
                  
                  return (
                    <button
                      key={item.label}
                      onClick={() => scrollToSection(item.href)}
                      className={`transition-all duration-200 text-sm font-medium cursor-pointer px-3 py-2 rounded-full ${
                        isActive 
                          ? "text-white bg-white/10" 
                          : "text-white/70 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {item.label}
                    </button>
                  )
                })}
              </div>

              {/* Right side: Language + CTA */}
              <div className="hidden md:flex items-center gap-2 flex-shrink-0">
                {/* Language Selector */}
                <div
                  className="relative"
                  onMouseEnter={handleLangEnter}
                  onMouseLeave={handleLangLeave}
                >
                  <button
                    className="flex items-center gap-1.5 text-white/60 hover:text-white transition-all duration-200 text-sm cursor-pointer px-2.5 py-2 rounded-full hover:bg-white/5"
                    onClick={() => setIsLangOpen(!isLangOpen)}
                  >
                    <Globe size={14} className="flex-shrink-0" />
                    <span className="uppercase text-xs font-semibold tracking-wider">{currentLang}</span>
                    <ChevronDown
                      size={12}
                      className={`transition-transform duration-200 ${isLangOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  <div
                    className={`absolute top-full right-0 pt-3 transition-all duration-200 ${
                      isLangOpen
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 -translate-y-2 pointer-events-none"
                    }`}
                  >
                    <div className="bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-xl p-1.5 shadow-2xl min-w-[140px]">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setCurrentLang(lang.code)
                            setIsLangOpen(false)
                          }}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 cursor-pointer flex items-center justify-between ${
                            currentLang === lang.code
                              ? "bg-white/10 text-white font-medium"
                              : "text-white/60 hover:text-white hover:bg-white/5"
                          }`}
                        >
                          <span>{lang.label}</span>
                          {currentLang === lang.code && (
                            <div className="w-1.5 h-1.5 rounded-full bg-white" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <button
                  className="relative bg-white hover:bg-gray-50 text-black font-medium px-5 py-1.5 rounded-full flex items-center transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer group text-sm"
                  onClick={() => scrollToSection("#contact")}
                >
                  <span className="mr-1.5">Empezar</span>
                  <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => {
                  setIsOpen(!isOpen)
                  if (isOpen) {
                    setIsMobileServicesOpen(false)
                    setIsMobileSectorsOpen(false)
                    setIsMobileLangOpen(false)
                  }
                }}
                className="md:hidden text-white hover:scale-110 transition-transform duration-200 cursor-pointer"
              >
                <div className="relative w-6 h-6">
                  <Menu
                    size={24}
                    className={`absolute inset-0 transition-all duration-300 ${
                      isOpen ? "opacity-0 rotate-180 scale-75" : "opacity-100 rotate-0 scale-100"
                    }`}
                  />
                  <X
                    size={24}
                    className={`absolute inset-0 transition-all duration-300 ${
                      isOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-180 scale-75"
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden relative">
          <div
            className={`fixed inset-0 bg-black/20 backdrop-blur-sm transition-all duration-300 ${
              isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            onClick={() => {
              setIsOpen(false)
              setIsMobileServicesOpen(false)
              setIsMobileSectorsOpen(false)
              setIsMobileLangOpen(false)
            }}
            style={{ top: "0", left: "0", right: "0", bottom: "0", zIndex: -1 }}
          />

          <div
            className={`mt-2 w-[92vw] max-w-xs mx-auto transition-all duration-500 ease-out transform-gpu ${
              isOpen ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-8 scale-95 pointer-events-none"
            }`}
          >
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 shadow-2xl max-h-[75vh] overflow-y-auto">
              <div className="flex flex-col space-y-0.5">
                {navItems.map((item) => {
                  if (item.dropdown === "services") {
                    const isActive = isNavItemActive(item)
                    return (
                      <div key={item.label}>
                        <button
                          onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                          className={`w-full flex items-center justify-between rounded-lg px-3 py-3 text-left transition-all duration-300 font-medium cursor-pointer ${
                            isActive 
                              ? "text-white bg-white/10" 
                              : "text-white/80 hover:text-white hover:bg-white/10"
                          }`}
                        >
                          <span>{item.label}</span>
                          <ChevronDown
                            size={16}
                            className={`transition-transform duration-300 ${isMobileServicesOpen ? "rotate-180" : ""}`}
                          />
                        </button>

                        <div
                          className={`overflow-hidden transition-all duration-300 ${
                            isMobileServicesOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                          }`}
                        >
                          <div className="pl-2 space-y-0.5 pb-2">
                            {services.map((service) => {
                              const Icon = service.icon
                              return (
                                <Link
                                  key={service.name}
                                  href={service.href}
                                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/10 transition-all duration-200 group"
                                  onClick={() => {
                                    setIsOpen(false)
                                    setIsMobileServicesOpen(false)
                                  }}
                                >
                                  <Icon size={16} className="text-white/50 group-hover:text-white/80 transition-colors flex-shrink-0" />
                                  <span className="text-sm text-white/70 group-hover:text-white transition-colors">
                                    {service.name}
                                  </span>
                                </Link>
                              )
                            })}
                          </div>
                        </div>
                      </div>
                    )
                  }

                  if (item.dropdown === "sectors") {
                    const isActive = isNavItemActive(item)
                    return (
                      <div key={item.label}>
                        <button
                          onClick={() => setIsMobileSectorsOpen(!isMobileSectorsOpen)}
                          className={`w-full flex items-center justify-between rounded-lg px-3 py-3 text-left transition-all duration-300 font-medium cursor-pointer ${
                            isActive 
                              ? "text-white bg-white/10" 
                              : "text-white/80 hover:text-white hover:bg-white/10"
                          }`}
                        >
                          <span>{item.label}</span>
                          <ChevronDown
                            size={16}
                            className={`transition-transform duration-300 ${isMobileSectorsOpen ? "rotate-180" : ""}`}
                          />
                        </button>

                        <div
                          className={`overflow-hidden transition-all duration-300 ${
                            isMobileSectorsOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                          }`}
                        >
                          <div className="pl-2 space-y-0.5 pb-2">
                            {sectors.map((sector) => {
                              const Icon = sector.icon
                              return (
                                <Link
                                  key={sector.name}
                                  href={sector.href}
                                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/10 transition-all duration-200 group"
                                  onClick={() => {
                                    setIsOpen(false)
                                    setIsMobileSectorsOpen(false)
                                  }}
                                >
                                  <Icon size={16} className="text-white/50 group-hover:text-white/80 transition-colors flex-shrink-0" />
                                  <span className="text-sm text-white/70 group-hover:text-white transition-colors">
                                    {sector.name}
                                  </span>
                                </Link>
                              )
                            })}
                          </div>
                        </div>
                      </div>
                    )
                  }

                  const isActive = isNavItemActive(item)
                  // Check if it's an internal page link (starts with /) vs anchor link (starts with #)
                  const isPageLink = item.href.startsWith("/")
                  
                  if (isPageLink) {
                    return (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`rounded-lg px-3 py-3 text-left transition-all duration-300 font-medium cursor-pointer block ${
                          isActive 
                            ? "text-white bg-white/10" 
                            : "text-white/80 hover:text-white hover:bg-white/10"
                        }`}
                      >
                        {item.label}
                      </Link>
                    )
                  }
                  
                  return (
                    <button
                      key={item.label}
                      onClick={() => scrollToSection(item.href)}
                      className={`rounded-lg px-3 py-3 text-left transition-all duration-300 font-medium cursor-pointer ${
                        isActive 
                          ? "text-white bg-white/10" 
                          : "text-white/80 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      {item.label}
                    </button>
                  )
                })}

                {/* Mobile Language Selector */}
                <div className="h-px bg-white/10 my-1" />
                <button
                  onClick={() => setIsMobileLangOpen(!isMobileLangOpen)}
                  className="w-full flex items-center justify-between text-white/60 hover:text-white hover:bg-white/10 rounded-lg px-3 py-3 text-left transition-all duration-300 cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Globe size={15} />
                    <span className="text-sm">{selectedLang?.label}</span>
                  </span>
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-300 ${isMobileLangOpen ? "rotate-180" : ""}`}
                  />
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isMobileLangOpen ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="pl-2 space-y-0.5 pb-2">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setCurrentLang(lang.code)
                          setIsMobileLangOpen(false)
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 cursor-pointer flex items-center justify-between ${
                          currentLang === lang.code
                            ? "bg-white/10 text-white font-medium"
                            : "text-white/60 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        <span>{lang.label}</span>
                        {currentLang === lang.code && (
                          <div className="w-1.5 h-1.5 rounded-full bg-white" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="h-px bg-white/10 my-1" />
                <button
                  className="relative bg-white hover:bg-gray-50 text-black font-medium px-6 py-3 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer group"
                  onClick={() => scrollToSection("#contact")}
                >
                  <span className="mr-2">Empezar</span>
                  <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
