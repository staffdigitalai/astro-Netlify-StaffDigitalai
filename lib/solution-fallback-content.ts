/**
 * Curated fallback content for each of the 13 /soluciones/[slug] pages.
 *
 * Pattern mirror of `lib/sector-fallback-content.ts` (shipped in PR #68):
 * the data-driven template reads ACF fields first and falls back to this
 * library when ACF is empty. Once WordPress editors populate ACF the
 * template auto-switches — no code change needed.
 *
 * All copy is in Spanish (the WPML master language). WPML-translated
 * ACF content takes over per-locale once populated; until then, every
 * locale renders this ES baseline (the UI chrome around it is localized
 * via the `solution_ui` i18n namespace).
 */

export type SolutionCategory = "agente" | "canal" | "automatizacion"

export interface SolutionFeature {
  icon: string          // lucide-react name
  title: string
  description: string
}

export interface SolutionHowStep {
  step: number
  title: string
  description: string
}

export interface SolutionModule {
  title: string
  description: string
  mockupSlug?: string   // matches SolutionMockup key in components/solution-mockups.tsx
}

export interface SolutionUseCase {
  sectorSlug: string    // ES master slug — mapped to the active locale via SECTOR_SLUGS
  title: string
  description: string
}

export interface SolutionMetric {
  value: string
  label: string
  context: string
}

export interface SolutionFaqItem {
  q: string
  a: string
}

export interface SolutionFallback {
  slug: string
  category: SolutionCategory
  hero: {
    badge: string
    title: string
    subtitle: string
    mockupSlug?: string
    /**
     * Optional path (under /public) of a hero illustration to render
     * INSTEAD of the animated `SolutionMockup`. When present, the
     * solution template renders an `<Image>` for the right column;
     * when absent, the existing mockup factory takes over. Used for
     * solutions whose product surface is better communicated by a
     * curated image than a generic animated demo.
     */
    heroImage?: string
  }
  features: SolutionFeature[]
  howItWorks: SolutionHowStep[]
  modules: SolutionModule[]
  useCases: SolutionUseCase[]
  metrics: SolutionMetric[]
  integrations: string[]  // partner slugs from /public/images/partners/
  faq: SolutionFaqItem[]
}

/* ─── Small helpers to keep the 13 entries compact ─────────────────── */

const RECEIVE_UNDERSTAND_DECIDE_EXECUTE: SolutionHowStep[] = [
  { step: 1, title: "Recibe",     description: "Captura el input del canal — texto, voz, formulario, API." },
  { step: 2, title: "Comprende",  description: "Entiende intención, contexto y datos relevantes del CRM." },
  { step: 3, title: "Decide",     description: "Aplica reglas de negocio y lógica condicional." },
  { step: 4, title: "Ejecuta",    description: "Responde, agenda, actualiza el sistema o escala a un humano." },
]

const COMMON_INTEGRATIONS_CORE = ["openai", "anthropic", "twilio", "google-cloud", "salesforce", "openclaw"]

const FAQ_CORE: SolutionFaqItem[] = [
  { q: "¿Cuánto tarda la implementación?",     a: "Entre 2 y 6 semanas para setup estándar. Enterprise con integraciones custom puede llegar a 2–4 meses." },
  { q: "¿Necesito tener CRM o ERP existentes?", a: "No es obligatorio, pero si los tienes, los integramos. Soportamos HubSpot, Salesforce, Pipedrive, SAP, Odoo y otros." },
  { q: "¿Hay permanencia?",                     a: "No. El contrato es mensual y cancelable sin permanencia." },
  { q: "¿Cómo se mide el ROI?",                 a: "Medimos conversión, tiempo de respuesta, costes de soporte y automatización alcanzada. Te entregamos un dashboard operativo." },
  { q: "¿Mi equipo puede supervisar las conversaciones?", a: "Sí. Todas las interacciones son visibles, auditables y escalables a un humano cuando el agente no resuelve." },
]

/* ─── The 13 solutions ─────────────────────────────────────────────── */

export const solutionFallbacks: Record<string, SolutionFallback> = {
  "ia-omnicanal": {
    slug: "ia-omnicanal",
    category: "canal",
    hero: {
      badge: "Plataforma IA Omnicanal",
      title: "Una bandeja única para WhatsApp, web, teléfono y email.",
      subtitle: "Un cliente pregunta en Instagram, continúa en WhatsApp y cierra en la web sin repetir información. Un solo agente, historial completo.",
      mockupSlug: "omnicanal",
    },
    features: [
      { icon: "inbox",       title: "Bandeja unificada",       description: "Todos los canales — WhatsApp, web chat, teléfono, email, redes — en la misma vista." },
      { icon: "user",        title: "Historial único",         description: "El cliente no repite. El agente ve toda la conversación anterior sin importar el canal." },
      { icon: "zap",         title: "Respuesta 24/7",          description: "Sin horarios ni pausas. Resuelve fuera de oficina y fines de semana." },
      { icon: "git-branch",  title: "Escalamiento inteligente",description: "Deriva a un humano con contexto cuando la consulta lo requiere." },
      { icon: "shield",      title: "Auditable",               description: "Cada interacción queda registrada y es exportable para compliance." },
      { icon: "trending-up", title: "Analítica operativa",     description: "Tasa de resolución, tiempos, sentiment y carga por canal en tiempo real." },
    ],
    howItWorks: RECEIVE_UNDERSTAND_DECIDE_EXECUTE,
    modules: [
      { title: "Inbox unificada",     description: "WhatsApp Business, web chat, email y llamadas en una sola vista con hilo único por cliente.", mockupSlug: "inbox" },
      { title: "Enrutamiento",        description: "Reglas por canal, sector, idioma o urgencia. Override manual disponible." },
      { title: "Escalamiento humano", description: "Botón único para derivar con contexto completo al agente humano." },
      { title: "Reporting",           description: "Métricas operativas exportables a dashboard interno o Data Studio." },
    ],
    useCases: [
      { sectorSlug: "clinicas",       title: "Clínicas",      description: "Agenda citas, confirma pacientes y responde dudas en el canal que prefieran." },
      { sectorSlug: "ecommerce",      title: "E-commerce",    description: "Pregunta de producto, tracking de pedido o devolución — una sola conversación." },
      { sectorSlug: "restaurantes",   title: "Restaurantes",  description: "Reservas por WhatsApp o web, confirmación automática, modificaciones sin llamadas." },
    ],
    metrics: [
      { value: "87%",  label: "Reducción en tiempo de respuesta", context: "Clínicas, ~500 interacciones/día, 3 meses de implementación" },
      { value: "+40%", label: "Conversión de leads",              context: "E-commerce, WhatsApp + web vs atención manual" },
      { value: "24/7", label: "Disponibilidad",                   context: "Sin turnos, sin horarios, sin colas" },
      { value: "2–6",  label: "Semanas de implementación",        context: "Setup estándar sin integraciones custom" },
    ],
    integrations: COMMON_INTEGRATIONS_CORE,
    faq: FAQ_CORE,
  },

  "whatsapp-ia-empresas": {
    slug: "whatsapp-ia-empresas",
    category: "canal",
    hero: {
      badge: "Agente IA para WhatsApp Business",
      title: "Convierte WhatsApp en tu canal de venta y soporte principal.",
      subtitle: "Responde, califica, agenda y actualiza tu CRM desde WhatsApp. Sin intervención manual, con voz de marca consistente.",
      mockupSlug: "whatsapp",
    },
    features: [
      { icon: "message-square", title: "Respuesta instantánea",  description: "Contesta en segundos, 24/7, con contexto del cliente." },
      { icon: "target",         title: "Calificación de leads",  description: "Pregunta por presupuesto, timing y fit — crea la ficha en CRM." },
      { icon: "calendar",       title: "Agenda automática",      description: "Confirma la hora, envía recordatorio y sincroniza con calendario." },
      { icon: "bot",            title: "Plantillas + IA",        description: "Campañas WhatsApp Business con respuestas personalizadas por IA." },
      { icon: "bar-chart",      title: "Analítica de canal",     description: "Tasa de respuesta, conversión por plantilla, hora pico." },
      { icon: "shield",         title: "Compliance",             description: "Integración oficial con WhatsApp Business API y consentimiento de opt-in." },
    ],
    howItWorks: RECEIVE_UNDERSTAND_DECIDE_EXECUTE,
    modules: [
      { title: "Conexión oficial API",  description: "WhatsApp Business API vía Twilio o 360dialog, con número verificado." },
      { title: "Intent + extracción",   description: "Detecta la intención y extrae entidades (fecha, hora, producto, precio)." },
      { title: "Sync CRM",              description: "Crea o actualiza leads en HubSpot/Salesforce/Pipedrive automáticamente." },
      { title: "Handoff a humano",      description: "Escalada al equipo de ventas con contexto, sin perder hilo." },
    ],
    useCases: [
      { sectorSlug: "restaurantes",   title: "Restaurantes",  description: "Reservas, cancelaciones y cambios 100% por WhatsApp." },
      { sectorSlug: "inmobiliarias",  title: "Inmobiliarias", description: "Califica leads, agenda visitas y responde de inmuebles en el canal preferido." },
      { sectorSlug: "clinicas",       title: "Clínicas",      description: "Recordatorios de cita y re-agendamiento automático por WhatsApp." },
    ],
    metrics: [
      { value: "+40%", label: "Conversión de leads",       context: "E-commerce comparado con atención manual" },
      { value: "2s",   label: "Tiempo medio de respuesta", context: "Frente a 4h del canal atendido por persona" },
      { value: "70%",  label: "Consultas resueltas en primer mensaje", context: "Sin handoff a humano en 7 de cada 10 casos" },
      { value: "2–4",  label: "Semanas de integración",    context: "Número verificado + templates aprobados" },
    ],
    integrations: ["twilio", "openai", "anthropic", "salesforce", "openclaw", "google-cloud"],
    faq: FAQ_CORE,
  },

  "atencion-telefonica-ia": {
    slug: "atencion-telefonica-ia",
    category: "canal",
    hero: {
      badge: "Atención Telefónica IA",
      title: "Voces realistas que atienden llamadas sin IVR, sin colas.",
      subtitle: "Tu número principal contesta al primer tono, entiende al cliente y resuelve o deriva — igual que una recepcionista entrenada, pero 24/7.",
      mockupSlug: "telefonica",
    },
    features: [
      { icon: "phone",        title: "Voces humanas HD",       description: "Indistinguibles de una persona real, en 3 idiomas." },
      { icon: "zap",          title: "Sin IVR",                description: "El cliente habla — el agente entiende. No hay menús." },
      { icon: "calendar",     title: "Agenda en llamada",      description: "Confirma cita verbalmente, la crea en el calendario en tiempo real." },
      { icon: "headphones",   title: "Transferencia contextual", description: "Si escala, pasa al humano con la conversación transcrita." },
      { icon: "bar-chart",    title: "Transcripción automática", description: "Cada llamada queda registrada, buscable y analítica." },
      { icon: "globe",        title: "Multi-idioma",           description: "Detecta idioma del cliente y cambia en tiempo real." },
    ],
    howItWorks: RECEIVE_UNDERSTAND_DECIDE_EXECUTE,
    modules: [
      { title: "Motor de voz",        description: "Síntesis y reconocimiento en <500ms. Voces premium de ElevenLabs." },
      { title: "Telefonía",           description: "Integración con Twilio, Aircall, Ringover. Número propio o portado." },
      { title: "Agenda",              description: "Google Calendar, Outlook, Calendly. Confirma huecos libres en vivo." },
      { title: "CRM sync",            description: "Crea ficha de contacto y registra la llamada automáticamente." },
    ],
    useCases: [
      { sectorSlug: "clinicas",       title: "Clínicas",      description: "Citas, confirmaciones y consultas administrativas sin personal en línea." },
      { sectorSlug: "restaurantes",   title: "Restaurantes",  description: "Reservas telefónicas 24/7 incluso cuando el local está lleno." },
      { sectorSlug: "concesionarios", title: "Concesionarios",description: "Consultas de stock, reserva de prueba y financiación inicial." },
    ],
    metrics: [
      { value: "0s",   label: "Tiempo de espera",         context: "Contesta al primer tono, siempre" },
      { value: "500ms", label: "Latencia voz-a-voz",       context: "Conversación natural, sin cortes" },
      { value: "92%",  label: "Resolución sin humano",     context: "Casos que el agente completa end-to-end" },
      { value: "2–3",  label: "Semanas de go-live",        context: "Con número verificado + integración CRM" },
    ],
    integrations: ["twilio", "openai", "anthropic", "google-cloud", "openclaw", "salesforce"],
    faq: FAQ_CORE,
  },

  "ia-call-center": {
    slug: "ia-call-center",
    category: "canal",
    hero: {
      badge: "IA Call Center",
      title: "Call center automatizado que escala sin contratar.",
      subtitle: "Cientos de llamadas simultáneas, el mismo tono de marca, zero colas. Para operaciones inbound y outbound.",
      mockupSlug: "call-center",
      heroImage: "/images/solutions/hero-ia-call-center.png",
    },
    features: [
      { icon: "phone",      title: "Inbound ilimitado",       description: "Atiende picos de llamadas sin saturar líneas." },
      { icon: "trending-up", title: "Outbound proactivo",     description: "Llama a listas de leads o clientes con guión personalizado." },
      { icon: "users",      title: "Handoff a equipo",        description: "Deriva con contexto a comercial o soporte humano." },
      { icon: "bar-chart",  title: "Dashboard operativo",     description: "Volumen, resolución, sentiment y coste por llamada." },
      { icon: "shield",     title: "Compliance y grabación",  description: "Cumple con requisitos de grabación y consentimiento." },
      { icon: "zap",        title: "Escalabilidad instantánea", description: "De 10 a 1.000 llamadas simultáneas sin cambios." },
    ],
    howItWorks: RECEIVE_UNDERSTAND_DECIDE_EXECUTE,
    modules: [
      { title: "Inbound IVR-free",   description: "Cada llamada es atendida con IA en primera línea." },
      { title: "Outbound campaigns", description: "Dialer con listas segmentadas y guión por campaña." },
      { title: "Scripts dinámicos",  description: "Ramas de conversación por respuesta del cliente." },
      { title: "Reporting",          description: "KPIs de call center (AHT, FCR, CSAT) y exportables." },
    ],
    useCases: [
      { sectorSlug: "ecommerce",    title: "E-commerce",  description: "Consultas de pedido, devoluciones y soporte en picos de temporada." },
      { sectorSlug: "clinicas",     title: "Clínicas",    description: "Agendar citas y responder dudas administrativas a gran escala." },
      { sectorSlug: "concesionarios", title: "Concesionarios", description: "Campañas outbound de taller y alerta de ITV." },
    ],
    metrics: [
      { value: "∞",    label: "Llamadas simultáneas",      context: "Sin contratar agentes ni ampliar centralita" },
      { value: "–65%", label: "Coste por contacto",        context: "Frente a call center humano tradicional" },
      { value: "92%",  label: "Resolución en primera llamada", context: "Sin transferencias ni reintentos" },
      { value: "4",    label: "Semanas de implementación", context: "Setup estándar con guiones y dialer" },
    ],
    integrations: ["twilio", "openai", "anthropic", "openclaw", "salesforce", "google-cloud"],
    faq: FAQ_CORE,
  },

  "agente-chat-web-ia": {
    slug: "agente-chat-web-ia",
    category: "canal",
    hero: {
      badge: "Chatbot Web",
      title: "Un agente en tu web que convierte visitantes en leads.",
      subtitle: "Responde preguntas, captura leads y agenda demos directamente desde el widget de tu sitio.",
      mockupSlug: "web-chat",
    },
    features: [
      { icon: "globe",       title: "Widget embebible",       description: "Un script y funciona en WordPress, Webflow, Framer, Shopify." },
      { icon: "target",      title: "Captura inteligente",    description: "Pregunta email/teléfono en el momento óptimo de la conversación." },
      { icon: "calendar",    title: "Agenda demo",            description: "Selecciona hora con tu calendario y confirma en el chat." },
      { icon: "message-square", title: "Base de conocimiento", description: "Entrenado con tu documentación, producto y FAQ." },
      { icon: "zap",         title: "Respuesta instantánea",  description: "<2s en el 95% de preguntas." },
      { icon: "bar-chart",   title: "Analítica de conversión", description: "Ratio pregunta → captura → lead cualificado." },
    ],
    howItWorks: RECEIVE_UNDERSTAND_DECIDE_EXECUTE,
    modules: [
      { title: "Widget",              description: "Chat integrado en desktop y mobile con UX responsive." },
      { title: "Base de conocimiento", description: "Entrenamiento sobre tus páginas, PDFs y FAQs actuales." },
      { title: "Form capture",        description: "Generador de leads con campos dinámicos." },
      { title: "Integración CRM",     description: "Cada lead entra directo en HubSpot/Pipedrive/Salesforce." },
    ],
    useCases: [
      { sectorSlug: "saas-startups", title: "SaaS / Startups", description: "Califica visitantes y agenda demos en tu pipeline." },
      { sectorSlug: "inmobiliarias", title: "Inmobiliarias",  description: "Filtra leads por presupuesto, zona y tipo de inmueble." },
      { sectorSlug: "clinicas",      title: "Clínicas",       description: "Resuelve dudas antes de la primera cita." },
    ],
    metrics: [
      { value: "+55%", label: "Conversión visitante → lead", context: "E-commerce y SaaS, comparado con formulario estático" },
      { value: "<2s",  label: "Tiempo de respuesta",         context: "95% de preguntas resueltas sin esperar" },
      { value: "80%",  label: "FAQs auto-resueltas",         context: "Sin abrir ticket, sin escalar" },
      { value: "1–2",  label: "Semanas de go-live",          context: "Setup estándar con entrenamiento base" },
    ],
    integrations: ["openai", "anthropic", "openclaw", "salesforce", "google-cloud", "twilio"],
    faq: FAQ_CORE,
  },

  "agente-ventas-ia": {
    slug: "agente-ventas-ia",
    category: "agente",
    hero: {
      badge: "Agente de Ventas IA",
      title: "Cierra ventas sin que pierdas el hilo entre leads y follow-ups.",
      subtitle: "Califica, contacta, nutre y agenda — el agente lleva cada lead desde formulario hasta reunión cerrada.",
      mockupSlug: "ventas",
    },
    features: [
      { icon: "target",      title: "Calificación BANT",       description: "Presupuesto, autoridad, necesidad y timing — preguntados en contexto." },
      { icon: "zap",         title: "Follow-up automático",    description: "Email + WhatsApp en cadencia, sin olvidos." },
      { icon: "calendar",    title: "Agenda reunión",          description: "Directamente en el calendario del comercial con el hueco libre." },
      { icon: "trending-up", title: "Scoring dinámico",        description: "Prioriza los leads más calientes automáticamente." },
      { icon: "bot",         title: "Respuestas personalizadas", description: "Aprende del tono y lenguaje de tu equipo de ventas." },
      { icon: "bar-chart",   title: "Pipeline visible",        description: "Dashboard con etapas, conversión y tiempos." },
    ],
    howItWorks: RECEIVE_UNDERSTAND_DECIDE_EXECUTE,
    modules: [
      { title: "Lead intake",       description: "Recibe formularios web, WhatsApp o llamada y crea ficha completa." },
      { title: "Nurture secuencial", description: "Cadencias multi-canal configurables por buyer persona." },
      { title: "Meeting scheduler", description: "Reuniones en Calendly, Google Calendar o Outlook." },
      { title: "Handoff al comercial", description: "Pasa al humano con toda la conversación resumida." },
    ],
    useCases: [
      { sectorSlug: "inmobiliarias", title: "Inmobiliarias", description: "De visita web a cita agendada en menos de 3 minutos." },
      { sectorSlug: "saas-startups", title: "SaaS",          description: "Demo booking automático con calificación fit." },
      { sectorSlug: "concesionarios", title: "Concesionarios", description: "Prospección outbound y reserva de prueba." },
    ],
    metrics: [
      { value: "+47%", label: "Reuniones agendadas",      context: "Vs. SDR humano, mismo volumen de leads" },
      { value: "3min", label: "De lead a cita",           context: "Tiempo medio de captura y agendamiento" },
      { value: "100%", label: "Seguimiento",              context: "Zero leads perdidos en follow-up" },
      { value: "2–4",  label: "Semanas de go-live",       context: "Con playbooks y tono de marca aprobados" },
    ],
    integrations: ["openai", "anthropic", "salesforce", "openclaw", "twilio", "google-cloud"],
    faq: FAQ_CORE,
  },

  "agente-soporte-ia": {
    slug: "agente-soporte-ia",
    category: "agente",
    hero: {
      badge: "Agente de Soporte IA",
      title: "Resuelve tickets 24/7 sin que nadie espere.",
      subtitle: "Recibe la incidencia, la clasifica, resuelve o deriva con contexto — como un técnico L1 que no duerme.",
      mockupSlug: "soporte",
    },
    features: [
      { icon: "headphones",  title: "Resolución L1",          description: "Problemas conocidos se resuelven sin ticket ni humano." },
      { icon: "git-branch",  title: "Enrutamiento L2/L3",     description: "Lo que no resuelve pasa al equipo correcto con contexto." },
      { icon: "zap",         title: "24/7",                   description: "Sin turnos ni horarios. Fuera de oficina también se atiende." },
      { icon: "shield",      title: "SLA tracking",           description: "Escalada automática si se acerca al límite de SLA." },
      { icon: "bar-chart",   title: "KB operativa",           description: "La base de conocimiento crece sola con cada caso resuelto." },
      { icon: "message-square", title: "Multi-canal",         description: "WhatsApp, email, portal, chat — mismo agente." },
    ],
    howItWorks: RECEIVE_UNDERSTAND_DECIDE_EXECUTE,
    modules: [
      { title: "Clasificación IA",    description: "Categoría, prioridad y producto identificados automáticamente." },
      { title: "Motor de resolución", description: "Consulta KB + product docs + histórico para responder." },
      { title: "Escalamiento",        description: "Integrado con Zendesk, Freshdesk, HubSpot Service Hub." },
      { title: "Reporting",           description: "Tiempo de resolución, FCR, CSAT y backlog por categoría." },
    ],
    useCases: [
      { sectorSlug: "saas-startups", title: "SaaS", description: "Soporte técnico L1 con escalada ingenieril para casos complejos." },
      { sectorSlug: "ecommerce",     title: "E-commerce", description: "Tracking de pedido, devoluciones y dudas de producto." },
      { sectorSlug: "servicios-tecnicos", title: "Servicios técnicos", description: "Diagnóstico inicial y agendamiento de visita técnica." },
    ],
    metrics: [
      { value: "65%",  label: "Resolución sin humano",   context: "Tickets cerrados completamente por el agente" },
      { value: "–70%", label: "Tiempo de primera respuesta", context: "Frente a cola tradicional" },
      { value: "24/7", label: "Cobertura",               context: "Fuera de horario, fines de semana, festivos" },
      { value: "3–5",  label: "Semanas de go-live",      context: "Con integración helpdesk + KB existente" },
    ],
    integrations: ["openai", "anthropic", "openclaw", "salesforce", "google-cloud", "twilio"],
    faq: FAQ_CORE,
  },

  "agente-agendamientos-ia": {
    slug: "agente-agendamientos-ia",
    category: "agente",
    hero: {
      badge: "Agente de Agendamientos IA",
      title: "Reservas, citas y visitas gestionadas solas.",
      subtitle: "Agenda en calendario real, envía recordatorios, gestiona cancelaciones y re-agenda — sin tocar el teléfono.",
      mockupSlug: "agendamiento",
    },
    features: [
      { icon: "calendar",    title: "Agenda en tiempo real",   description: "Confirma huecos libres en Google Calendar, Outlook o Calendly." },
      { icon: "bell",        title: "Recordatorios",           description: "SMS o WhatsApp 24h y 1h antes de la cita." },
      { icon: "zap",         title: "Re-agendamiento",         description: "El cliente cancela o cambia sin llamar a nadie." },
      { icon: "users",       title: "Multi-recurso",           description: "Asigna a la persona o sala correcta según regla." },
      { icon: "shield",      title: "No-show prevention",      description: "Confirmación activa antes de la cita reduce faltas." },
      { icon: "bar-chart",   title: "Ocupación visible",       description: "Dashboard de carga horaria por recurso." },
    ],
    howItWorks: RECEIVE_UNDERSTAND_DECIDE_EXECUTE,
    modules: [
      { title: "Calendar sync",        description: "Bidireccional con Google, Outlook y sistemas propietarios." },
      { title: "Reminder engine",      description: "Flujos de recordatorio por canal y timing configurables." },
      { title: "Confirmación activa",  description: "El cliente confirma asistencia — reduce no-shows en ~60%." },
      { title: "Reasignación",         description: "Si un recurso se cancela, reagenda con otro automáticamente." },
    ],
    useCases: [
      { sectorSlug: "clinicas",      title: "Clínicas",      description: "Primera cita, revisión y re-agendamiento. Integra con Doctoralia." },
      { sectorSlug: "centros-belleza", title: "Centros de belleza", description: "Reservas con profesional + tratamiento elegido." },
      { sectorSlug: "gimnasios",     title: "Gimnasios",     description: "Clases grupales, entrenador personal, reserva de pista." },
    ],
    metrics: [
      { value: "–60%", label: "Tasa de no-show",          context: "Con confirmación activa + recordatorios dobles" },
      { value: "0",    label: "Llamadas a recepción",     context: "Todas las reservas entran sin intervención humana" },
      { value: "+47%", label: "Reservas confirmadas",     context: "Vs. formulario web tradicional" },
      { value: "2–3",  label: "Semanas de go-live",       context: "Con calendarios + reglas de asignación" },
    ],
    integrations: ["openai", "google-cloud", "anthropic", "twilio", "openclaw", "salesforce"],
    faq: FAQ_CORE,
  },

  "lead-generation-ia": {
    slug: "lead-generation-ia",
    category: "automatizacion",
    hero: {
      badge: "Lead Generation IA",
      title: "Encuentra, enriquece y contacta leads en piloto automático.",
      subtitle: "Prospección outbound que identifica empresas objetivo, enriquece datos y abre conversación sin intervención humana.",
      mockupSlug: "leadgen",
    },
    features: [
      { icon: "target",      title: "ICP automatizado",         description: "Define tu buyer y el agente encuentra empresas que encajan." },
      { icon: "trending-up", title: "Enriquecimiento",          description: "Datos de contacto, tecnografía y señales de intención." },
      { icon: "message-square", title: "Outreach multi-canal", description: "Email + LinkedIn + WhatsApp en cadencia." },
      { icon: "zap",         title: "Respuesta automática",     description: "Responde a los leads que contestan y los agenda." },
      { icon: "shield",      title: "Compliance",               description: "Opt-out gestionado y GDPR nativo." },
      { icon: "bar-chart",   title: "Analítica de campañas",    description: "Open rate, reply rate, conversión → meeting." },
    ],
    howItWorks: RECEIVE_UNDERSTAND_DECIDE_EXECUTE,
    modules: [
      { title: "Prospect sourcing",  description: "Scraping + bases públicas + Apollo/ZoomInfo si ya tienes licencia." },
      { title: "Enrichment",         description: "Completa email, teléfono, cargo y señales con fuentes múltiples." },
      { title: "Outreach engine",    description: "Secuencias A/B-testeadas con variantes por segmento." },
      { title: "Reply handling",     description: "IA responde objeciones comunes y agenda demo si hay interés." },
    ],
    useCases: [
      { sectorSlug: "saas-startups",  title: "SaaS B2B", description: "Top-of-funnel predecible con volumen de demos escalable." },
      { sectorSlug: "servicios-tecnicos", title: "Servicios B2B", description: "Acerca consultoras y servicios técnicos a clientes enterprise." },
      { sectorSlug: "inmobiliarias",  title: "Inmobiliarias comerciales", description: "Prospección de inversores y promotores." },
    ],
    metrics: [
      { value: "×10",  label: "Volumen de prospección", context: "Vs. SDR humano dedicado" },
      { value: "5%",   label: "Reply rate medio",       context: "Dentro del benchmark top-quartile de outbound" },
      { value: "48h",  label: "Lead → demo agendada",   context: "Tiempo medio desde primera respuesta" },
      { value: "3–5",  label: "Semanas de go-live",     context: "Con ICP + mensajería + integración CRM" },
    ],
    integrations: ["openai", "anthropic", "salesforce", "openclaw", "google-cloud", "twilio"],
    faq: FAQ_CORE,
  },

  "agentes-ia-voz-humana": {
    slug: "agentes-ia-voz-humana",
    category: "agente",
    hero: {
      badge: "Voz Humana IA",
      title: "Voces que tus clientes no distinguen de una persona real.",
      subtitle: "Síntesis premium + reconocimiento en tiempo real + contexto conversacional. En 3 idiomas.",
      mockupSlug: "voz-humana",
    },
    features: [
      { icon: "phone",       title: "Voz HD natural",         description: "ElevenLabs premium con tono y cadencia humanos." },
      { icon: "zap",         title: "<500ms de latencia",     description: "Conversación fluida, sin pausas raras." },
      { icon: "globe",       title: "Multi-idioma",           description: "ES, EN y PT con detección automática." },
      { icon: "users",       title: "Voz de marca",           description: "Elige una voz o clona la de tu equipo." },
      { icon: "shield",      title: "Transcripción segura",   description: "Cada llamada grabada, transcrita, buscable." },
      { icon: "bot",         title: "Emoción y pausa",        description: "No robótico — respira, enfatiza, ajusta tono." },
    ],
    howItWorks: RECEIVE_UNDERSTAND_DECIDE_EXECUTE,
    modules: [
      { title: "TTS premium",       description: "Síntesis neural con voces entrenadas para tu mercado." },
      { title: "STT en tiempo real", description: "Reconocimiento con detección de idioma y contexto." },
      { title: "Interrupción",       description: "El cliente interrumpe — el agente escucha y ajusta." },
      { title: "Clonación opcional", description: "Reproduce la voz de tu responsable comercial o recepcionista." },
    ],
    useCases: [
      { sectorSlug: "clinicas",     title: "Clínicas",      description: "Voz cálida y empática para gestión de citas." },
      { sectorSlug: "restaurantes", title: "Restaurantes",  description: "Voz amable para reservas nocturnas y fines de semana." },
      { sectorSlug: "concesionarios", title: "Concesionarios", description: "Voz profesional para campañas de taller." },
    ],
    metrics: [
      { value: "<500ms", label: "Latencia voz-a-voz",      context: "Conversación natural, sin cortes perceptibles" },
      { value: "96%",    label: "Fidelidad al hablante",   context: "Test A/B ciego vs. humano" },
      { value: "3",      label: "Idiomas nativos",         context: "ES · EN · PT con cambio en caliente" },
      { value: "2–4",    label: "Semanas de go-live",      context: "Incluye selección y fine-tuning de voz" },
    ],
    integrations: ["openai", "anthropic", "twilio", "google-cloud", "openclaw", "salesforce"],
    faq: FAQ_CORE,
  },

  "automacion-ventas-ia": {
    slug: "automacion-ventas-ia",
    category: "automatizacion",
    hero: {
      badge: "Automatización de Ventas",
      title: "Tu pipeline operado por agentes, no por hojas de cálculo.",
      subtitle: "El lead entra, se califica, se nutre, se agenda — y el equipo solo interviene cuando añade valor real.",
      mockupSlug: "automacion-ventas",
    },
    features: [
      { icon: "zap",         title: "Pipeline auto-run",      description: "Cada etapa ejecuta sus acciones sin esperar a que alguien recuerde." },
      { icon: "trending-up", title: "Scoring continuo",       description: "Prioridad de leads recalculada con cada interacción." },
      { icon: "message-square", title: "Multi-canal coord.",   description: "Email, WhatsApp, LinkedIn y llamada coordinados." },
      { icon: "target",      title: "Segmentación fina",      description: "Playbooks distintos por buyer, tamaño y sector." },
      { icon: "bar-chart",   title: "Forecast",               description: "Predicción de cierre en tiempo real." },
      { icon: "shield",      title: "Auditable",              description: "Cada acción registrada y revertible." },
    ],
    howItWorks: RECEIVE_UNDERSTAND_DECIDE_EXECUTE,
    modules: [
      { title: "Pipeline engine",   description: "Reglas de paso de etapa, SLAs y acciones automáticas." },
      { title: "Playbooks",         description: "Plantillas de cadencia por buyer y sector." },
      { title: "Forecasting",       description: "Predicción con IA basada en comportamiento histórico." },
      { title: "CRM sync",          description: "Bidireccional con HubSpot, Salesforce, Pipedrive." },
    ],
    useCases: [
      { sectorSlug: "saas-startups",   title: "SaaS B2B",        description: "Fuentes inbound y outbound en un solo pipeline operativo." },
      { sectorSlug: "inmobiliarias",   title: "Inmobiliarias",   description: "De lead a visita a oferta con cadencia optimizada." },
      { sectorSlug: "concesionarios",  title: "Concesionarios",  description: "De interés web a prueba a financiación." },
    ],
    metrics: [
      { value: "+35%", label: "Velocidad de pipeline",  context: "Tiempo medio de etapa a etapa reducido" },
      { value: "–50%", label: "Tareas manuales",        context: "Hojas de cálculo y follow-ups automáticos" },
      { value: "100%", label: "Cobertura de leads",     context: "Zero leads sin follow-up" },
      { value: "4–6",  label: "Semanas de go-live",     context: "Con mapeo de pipeline + integración CRM" },
    ],
    integrations: ["openai", "anthropic", "salesforce", "openclaw", "google-cloud", "twilio"],
    faq: FAQ_CORE,
  },

  "onboarding-automatico": {
    slug: "onboarding-automatico",
    category: "automatizacion",
    hero: {
      badge: "Onboarding Automático",
      title: "Activa a tus nuevos clientes sin fricción.",
      subtitle: "Desde la firma del contrato hasta el primer uso exitoso — el agente guía, responde y desbloquea.",
      mockupSlug: "onboarding",
    },
    features: [
      { icon: "zap",          title: "Activación guiada",     description: "Flujo paso a paso por email + WhatsApp + chat in-app." },
      { icon: "users",        title: "Multi-perfil",          description: "Onboarding distinto para admin, usuario estándar y técnico." },
      { icon: "message-square", title: "Respuestas 24/7",     description: "Preguntas frecuentes resueltas antes de escalar." },
      { icon: "calendar",     title: "Kick-off automático",   description: "Agenda la llamada de arranque con el CSM correcto." },
      { icon: "bar-chart",    title: "Salud del cliente",     description: "Detecta riesgo de abandono antes de que suceda." },
      { icon: "shield",       title: "SLA de time-to-value",  description: "Alerta al equipo si un cliente no activa en N días." },
    ],
    howItWorks: RECEIVE_UNDERSTAND_DECIDE_EXECUTE,
    modules: [
      { title: "Welcome flow",       description: "Secuencia multi-canal con checkpoints medibles." },
      { title: "KB integrada",       description: "Respuestas basadas en tu documentación real." },
      { title: "Health scoring",     description: "Señales de uso, engagement y riesgo." },
      { title: "Escalation",         description: "Handoff a CSM con contexto completo si el cliente se atasca." },
    ],
    useCases: [
      { sectorSlug: "saas-startups",  title: "SaaS",   description: "Time-to-value acortado, churn temprano reducido." },
      { sectorSlug: "centros-belleza", title: "Centros de belleza", description: "Primera cita + plan de tratamiento en un flujo continuo." },
      { sectorSlug: "gimnasios",       title: "Gimnasios",           description: "Primeros 7 días: clase prueba, app instalada, primer pago OK." },
    ],
    metrics: [
      { value: "+48%", label: "Activación en 7 días",     context: "Vs. onboarding humano tradicional" },
      { value: "–30%", label: "Churn en primer mes",      context: "Clientes guiados se quedan más" },
      { value: "24/7", label: "Cobertura de dudas",       context: "Sin esperar a que abra el CSM" },
      { value: "3–5",  label: "Semanas de go-live",       context: "Con playbooks de welcome + integración producto" },
    ],
    integrations: ["openai", "anthropic", "openclaw", "salesforce", "google-cloud", "twilio"],
    faq: FAQ_CORE,
  },

  "agente-chat-productos-ia": {
    slug: "agente-chat-productos-ia",
    category: "agente",
    hero: {
      badge: "Chat Productos IA",
      title: "Tu catálogo, explicado como si hubiera un vendedor en la tienda.",
      subtitle: "Responde preguntas de producto, recomienda alternativas, maneja comparativas y cierra la venta.",
      mockupSlug: "chat-productos",
    },
    features: [
      { icon: "message-square", title: "Preguntas de producto", description: "Especificaciones, compatibilidad, disponibilidad — al momento." },
      { icon: "trending-up",    title: "Recomendaciones",       description: "Sugiere alternativas y complementos basados en comportamiento." },
      { icon: "target",         title: "Comparativas",          description: "Compara productos lado a lado con la info del catálogo." },
      { icon: "zap",            title: "Stock en vivo",         description: "Consulta inventario antes de prometer." },
      { icon: "bot",            title: "Idioma de marca",       description: "Tono editorial y vocabulario propios del catálogo." },
      { icon: "bar-chart",      title: "Analítica de consulta", description: "Qué preguntan los clientes y qué respuestas convierten mejor." },
    ],
    howItWorks: RECEIVE_UNDERSTAND_DECIDE_EXECUTE,
    modules: [
      { title: "Catálogo ingesta",    description: "Sincronización con Shopify, Prestashop, WooCommerce, custom." },
      { title: "Knowledge graph",     description: "Relaciones producto ↔ uso ↔ sector para recomendación fina." },
      { title: "Stock live",          description: "Consulta ERP en tiempo real antes de confirmar disponibilidad." },
      { title: "Handoff a venta",     description: "Deriva a asesor humano cuando la compra justifica alto-valor." },
    ],
    useCases: [
      { sectorSlug: "ecommerce",         title: "E-commerce",      description: "Catálogos grandes con muchas variantes y compatibilidades." },
      { sectorSlug: "retail",            title: "Retail",          description: "Tienda online y física: stock y disponibilidad unificados." },
      { sectorSlug: "concesionarios",    title: "Concesionarios",  description: "Configurador de vehículo con opciones, motor y financiación." },
    ],
    metrics: [
      { value: "+32%", label: "Conversión PDP → checkout",  context: "Páginas de producto con chat activo" },
      { value: "×3",   label: "Tasa de up-sell",            context: "Recomendaciones contextuales vs. estáticas" },
      { value: "80%",  label: "Preguntas auto-resueltas",   context: "Sin escalar a asesor humano" },
      { value: "2–4",  label: "Semanas de go-live",         context: "Con catálogo estructurado + integración ERP" },
    ],
    integrations: ["openai", "anthropic", "openclaw", "salesforce", "google-cloud", "twilio"],
    faq: FAQ_CORE,
  },
}

// Locale-override maps. The override files only type-import from here
// (erased at compile time), so there's no runtime circular import.
import { solutionFallbacksEn } from "./solution-fallback-content-en"
import { solutionFallbacksPt } from "./solution-fallback-content-pt"

/**
 * Resolve fallback content for a given ES master slug + locale.
 *
 * Lookup order (locale override → ES master):
 *   1. `locale === "en"` → `solutionFallbacksEn[esSlug]` if present
 *   2. `locale === "pt"` → `solutionFallbacksPt[esSlug]` if present
 *   3. `solutionFallbacks[esSlug]` (ES master — always present for the 13 curated slugs)
 *
 * Returns `null` only when the slug is unknown (not in the ES master map).
 * The page then renders whatever ACF data is present (or its 404 state).
 *
 * Until PR #89 / #90 populate the EN and PT override maps, every locale
 * falls back to ES content — same behaviour as before this refactor.
 */
export function getSolutionFallback(
  esSlug: string,
  locale: string = "es",
): SolutionFallback | null {
  if (locale === "en") {
    const override = solutionFallbacksEn[esSlug]
    if (override) return override
  } else if (locale === "pt") {
    const override = solutionFallbacksPt[esSlug]
    if (override) return override
  }
  return solutionFallbacks[esSlug] ?? null
}
