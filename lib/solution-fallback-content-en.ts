/**
 * English locale overrides for the /soluciones/[slug] fallback content.
 *
 * Structure mirrors `solution-fallback-content.ts` exactly — same keys,
 * same arrays, same order — just translated to EN. When a slug is
 * missing from this map, `getSolutionFallback(slug, "en")` falls back
 * to the ES master content.
 *
 * Populated in PR #89 with curated EN copy for all 13 solution slugs.
 * Local-market references (ES-specific tools like Doctoralia, ITV,
 * Idealista) are replaced with UK/international equivalents where
 * meaningful; generic B2B tools (HubSpot, Salesforce, Twilio, OpenAI)
 * are kept verbatim.
 *
 * Partner slugs in `integrations` and cross-sell `sectorSlug` / `mockupSlug`
 * keep the ES master value — they are internal keys mapped to localized
 * URLs at render time via `cptPath()`.
 */

import type { SolutionFallback, SolutionHowStep, SolutionFaqItem } from "./solution-fallback-content"

/* ─── Shared helpers (EN) ──────────────────────────────────────────── */

const RECEIVE_UNDERSTAND_DECIDE_EXECUTE_EN: SolutionHowStep[] = [
  { step: 1, title: "Receive",    description: "Captures the channel input — text, voice, form, API." },
  { step: 2, title: "Understand", description: "Parses intent, context and relevant CRM data." },
  { step: 3, title: "Decide",     description: "Applies business rules and conditional logic." },
  { step: 4, title: "Execute",    description: "Replies, books, updates the system or hands off to a human." },
]

const FAQ_CORE_EN: SolutionFaqItem[] = [
  { q: "How long does implementation take?",             a: "Between 2 and 6 weeks for a standard setup. Enterprise deployments with custom integrations can stretch to 2–4 months." },
  { q: "Do I need an existing CRM or ERP?",              a: "Not mandatory, but if you have one we integrate with it. We support HubSpot, Salesforce, Pipedrive, SAP, Odoo and others." },
  { q: "Is there a minimum contract?",                   a: "No. Contracts are month-to-month and cancellable with no lock-in." },
  { q: "How do you measure ROI?",                        a: "We track conversion, response time, support cost and automation coverage. You get an operational dashboard out of the box." },
  { q: "Can my team supervise the conversations?",       a: "Yes. Every interaction is visible, auditable and escalable to a human when the agent can't resolve it." },
]

/* ─── The 13 solutions (EN) ────────────────────────────────────────── */

export const solutionFallbacksEn: Record<string, SolutionFallback> = {
  "ia-omnicanal": {
    slug: "ia-omnicanal",
    category: "canal",
    hero: {
      badge: "Omnichannel AI Platform",
      title: "One unified inbox for WhatsApp, web, phone and email.",
      subtitle: "A customer asks on Instagram, continues on WhatsApp and closes on the web without repeating a word. One agent, full history.",
      mockupSlug: "omnicanal",
    },
    features: [
      { icon: "inbox",       title: "Unified inbox",          description: "Every channel — WhatsApp, web chat, phone, email, social — in a single view." },
      { icon: "user",        title: "Single customer history",description: "The customer never repeats. The agent sees the full prior thread regardless of channel." },
      { icon: "zap",         title: "24/7 response",          description: "No office hours, no gaps. Resolves out-of-hours and weekends." },
      { icon: "git-branch",  title: "Smart escalation",       description: "Hands off to a human with context when the enquiry demands it." },
      { icon: "shield",      title: "Auditable",              description: "Every interaction is logged and exportable for compliance." },
      { icon: "trending-up", title: "Operational analytics",  description: "Resolution rate, response time, sentiment and channel load in real time." },
    ],
    howItWorks: RECEIVE_UNDERSTAND_DECIDE_EXECUTE_EN,
    modules: [
      { title: "Unified inbox",      description: "WhatsApp Business, web chat, email and calls in a single view with one thread per customer.", mockupSlug: "inbox" },
      { title: "Routing",             description: "Rules by channel, industry, language or urgency. Manual override available." },
      { title: "Human escalation",    description: "One-click handoff to a human agent with full context attached." },
      { title: "Reporting",           description: "Operational metrics exportable to an internal dashboard or Looker Studio." },
    ],
    useCases: [
      { sectorSlug: "clinicas",     title: "Clinics",        description: "Book appointments, confirm patients and answer enquiries on their preferred channel." },
      { sectorSlug: "ecommerce",    title: "E-commerce",     description: "Product questions, order tracking or returns — all in one conversation." },
      { sectorSlug: "restaurantes", title: "Restaurants",    description: "Bookings via WhatsApp or web, automatic confirmation, changes without a phone call." },
    ],
    metrics: [
      { value: "87%",  label: "Reduction in response time", context: "Clinics, ~500 interactions/day, 3 months post-launch" },
      { value: "+40%", label: "Lead conversion",            context: "E-commerce, WhatsApp + web vs. manual handling" },
      { value: "24/7", label: "Availability",               context: "No shifts, no opening hours, no queues" },
      { value: "2–6",  label: "Weeks to go-live",           context: "Standard setup without custom integrations" },
    ],
    integrations: ["openai", "anthropic", "twilio", "google-cloud", "salesforce", "openclaw"],
    faq: FAQ_CORE_EN,
  },

  "whatsapp-ia-empresas": {
    slug: "whatsapp-ia-empresas",
    category: "canal",
    hero: {
      badge: "AI Agent for WhatsApp Business",
      title: "Turn WhatsApp into your primary sales and support channel.",
      subtitle: "Reply, qualify, book and update your CRM straight from WhatsApp. No manual handling, consistent brand voice.",
      mockupSlug: "whatsapp",
    },
    features: [
      { icon: "message-square", title: "Instant replies",         description: "Responds in seconds, 24/7, with full customer context." },
      { icon: "target",         title: "Lead qualification",      description: "Asks about budget, timing and fit — creates the CRM record." },
      { icon: "calendar",       title: "Automatic booking",       description: "Confirms the slot, sends the reminder and syncs with the calendar." },
      { icon: "bot",            title: "Templates + AI",          description: "WhatsApp Business campaigns with AI-personalised replies." },
      { icon: "bar-chart",      title: "Channel analytics",       description: "Response rate, template conversion, peak hours." },
      { icon: "shield",         title: "Compliance",              description: "Official WhatsApp Business API integration with opt-in consent." },
    ],
    howItWorks: RECEIVE_UNDERSTAND_DECIDE_EXECUTE_EN,
    modules: [
      { title: "Official API connection", description: "WhatsApp Business API via Twilio or 360dialog with a verified number." },
      { title: "Intent + extraction",     description: "Detects intent and pulls entities (date, time, product, price)." },
      { title: "CRM sync",                description: "Creates or updates leads in HubSpot / Salesforce / Pipedrive automatically." },
      { title: "Human handoff",           description: "Escalates to the sales team with context — no dropped threads." },
    ],
    useCases: [
      { sectorSlug: "restaurantes",  title: "Restaurants",  description: "Bookings, cancellations and changes 100% over WhatsApp." },
      { sectorSlug: "inmobiliarias", title: "Real estate",  description: "Qualify leads, schedule viewings and answer property questions on their preferred channel." },
      { sectorSlug: "clinicas",      title: "Clinics",      description: "Appointment reminders and automated rescheduling via WhatsApp." },
    ],
    metrics: [
      { value: "+40%", label: "Lead conversion",               context: "E-commerce vs. human-staffed channel" },
      { value: "2s",   label: "Average response time",         context: "Down from 4h on manually-staffed support" },
      { value: "70%",  label: "Enquiries resolved first-touch", context: "No human handoff in 7 out of 10 cases" },
      { value: "2–4",  label: "Weeks to integrate",            context: "Verified number + approved templates" },
    ],
    integrations: ["twilio", "openai", "anthropic", "salesforce", "openclaw", "google-cloud"],
    faq: FAQ_CORE_EN,
  },

  "atencion-telefonica-ia": {
    slug: "atencion-telefonica-ia",
    category: "canal",
    hero: {
      badge: "AI Phone Support",
      title: "Lifelike voices that answer calls — no IVR, no queues.",
      subtitle: "Your main line picks up on the first ring, understands the caller and either resolves or hands off — like a trained receptionist, only 24/7.",
      mockupSlug: "telefonica",
    },
    features: [
      { icon: "phone",        title: "HD human voices",        description: "Indistinguishable from a real person, in 3 languages." },
      { icon: "zap",          title: "No IVR",                 description: "Callers speak — the agent understands. No menus." },
      { icon: "calendar",     title: "Book in-call",           description: "Confirms the appointment verbally and writes it to the calendar live." },
      { icon: "headphones",   title: "Contextual transfer",    description: "When it escalates, the human gets the full transcript." },
      { icon: "bar-chart",    title: "Auto-transcription",     description: "Every call logged, searchable, analytics-ready." },
      { icon: "globe",        title: "Multilingual",           description: "Detects caller language and switches live." },
    ],
    howItWorks: RECEIVE_UNDERSTAND_DECIDE_EXECUTE_EN,
    modules: [
      { title: "Voice engine",       description: "Sub-500ms synthesis and recognition. Premium ElevenLabs voices." },
      { title: "Telephony",          description: "Integrates with Twilio, Aircall, Ringover. Own or ported number." },
      { title: "Scheduling",         description: "Google Calendar, Outlook, Calendly. Confirms free slots live." },
      { title: "CRM sync",           description: "Creates the contact record and logs the call automatically." },
    ],
    useCases: [
      { sectorSlug: "clinicas",       title: "Clinics",       description: "Appointments, confirmations and admin enquiries with no one on the phone." },
      { sectorSlug: "restaurantes",   title: "Restaurants",   description: "Phone bookings 24/7, even when the floor is packed." },
      { sectorSlug: "concesionarios", title: "Dealerships",   description: "Stock enquiries, test-drive bookings and finance pre-qualification." },
    ],
    metrics: [
      { value: "0s",    label: "Wait time",              context: "Picks up on the first ring, always" },
      { value: "500ms", label: "Voice-to-voice latency", context: "Natural conversation with no dropouts" },
      { value: "92%",   label: "Resolved without human", context: "Cases the agent completes end-to-end" },
      { value: "2–3",   label: "Weeks to go-live",       context: "Verified number + CRM integration included" },
    ],
    integrations: ["twilio", "openai", "anthropic", "google-cloud", "openclaw", "salesforce"],
    faq: FAQ_CORE_EN,
  },

  "ia-call-center": {
    slug: "ia-call-center",
    category: "canal",
    hero: {
      badge: "AI Call Centre",
      title: "A call centre that scales without hiring.",
      subtitle: "Hundreds of simultaneous calls, consistent brand tone, zero queues. Inbound and outbound, same platform.",
      mockupSlug: "call-center",
      heroImage: "/images/solutions/hero-ia-call-center.png",
    },
    features: [
      { icon: "phone",       title: "Unlimited inbound",       description: "Handles call-volume spikes without saturating lines." },
      { icon: "trending-up", title: "Proactive outbound",      description: "Dials lead or customer lists with a per-campaign script." },
      { icon: "users",       title: "Team handoff",            description: "Escalates to sales or support humans with full context." },
      { icon: "bar-chart",   title: "Operational dashboard",   description: "Volume, resolution, sentiment and cost per call." },
      { icon: "shield",      title: "Compliance + recording",  description: "Meets recording and consent requirements." },
      { icon: "zap",         title: "Instant scalability",     description: "From 10 to 1,000 simultaneous calls with no config change." },
    ],
    howItWorks: RECEIVE_UNDERSTAND_DECIDE_EXECUTE_EN,
    modules: [
      { title: "IVR-free inbound",   description: "Every call answered by AI as first line." },
      { title: "Outbound campaigns", description: "Dialler with segmented lists and per-campaign script." },
      { title: "Dynamic scripts",    description: "Conversation branches based on the caller's answers." },
      { title: "Reporting",          description: "Call-centre KPIs (AHT, FCR, CSAT) with CSV export." },
    ],
    useCases: [
      { sectorSlug: "ecommerce",      title: "E-commerce",   description: "Order enquiries, returns and peak-season support without hiring temps." },
      { sectorSlug: "clinicas",       title: "Clinics",      description: "Book appointments and handle admin enquiries at scale." },
      { sectorSlug: "concesionarios", title: "Dealerships",  description: "Outbound service campaigns and MOT reminders." },
    ],
    metrics: [
      { value: "∞",    label: "Simultaneous calls",        context: "Without hiring agents or upgrading your switchboard" },
      { value: "–65%", label: "Cost per contact",          context: "Vs. traditional human call centre" },
      { value: "92%",  label: "First-call resolution",     context: "No transfers, no callbacks" },
      { value: "4",    label: "Weeks to implement",        context: "Standard setup with scripts and dialler" },
    ],
    integrations: ["twilio", "openai", "anthropic", "openclaw", "salesforce", "google-cloud"],
    faq: FAQ_CORE_EN,
  },

  "agente-chat-web-ia": {
    slug: "agente-chat-web-ia",
    category: "canal",
    hero: {
      badge: "Web Chatbot",
      title: "An agent on your site that turns visitors into leads.",
      subtitle: "Answers questions, captures leads and books demos straight from the widget on your site.",
      mockupSlug: "web-chat",
    },
    features: [
      { icon: "globe",          title: "Embeddable widget",     description: "One script, works in WordPress, Webflow, Framer, Shopify." },
      { icon: "target",         title: "Smart capture",          description: "Asks for email/phone at the optimal moment in the conversation." },
      { icon: "calendar",       title: "Demo booking",           description: "Picks a slot from your calendar and confirms in-chat." },
      { icon: "message-square", title: "Knowledge base",         description: "Trained on your docs, product and FAQ." },
      { icon: "zap",            title: "Instant reply",          description: "<2s on 95% of questions." },
      { icon: "bar-chart",      title: "Conversion analytics",   description: "Question → capture → qualified-lead ratio." },
    ],
    howItWorks: RECEIVE_UNDERSTAND_DECIDE_EXECUTE_EN,
    modules: [
      { title: "Widget",            description: "Responsive chat on desktop and mobile." },
      { title: "Knowledge base",    description: "Training on your pages, PDFs and current FAQs." },
      { title: "Form capture",      description: "Lead generator with dynamic fields." },
      { title: "CRM integration",   description: "Every lead lands directly in HubSpot / Pipedrive / Salesforce." },
    ],
    useCases: [
      { sectorSlug: "saas-startups", title: "SaaS / Startups", description: "Qualify visitors and book demos straight into your pipeline." },
      { sectorSlug: "inmobiliarias", title: "Real estate",      description: "Filter leads by budget, area and property type." },
      { sectorSlug: "clinicas",      title: "Clinics",          description: "Answer pre-consultation questions before the first visit." },
    ],
    metrics: [
      { value: "+55%", label: "Visitor → lead conversion", context: "E-commerce and SaaS vs. static form" },
      { value: "<2s",  label: "Response time",             context: "95% of questions resolved without waiting" },
      { value: "80%",  label: "Self-resolved FAQs",        context: "No ticket, no escalation" },
      { value: "1–2",  label: "Weeks to go-live",          context: "Standard setup with baseline training" },
    ],
    integrations: ["openai", "anthropic", "openclaw", "salesforce", "google-cloud", "twilio"],
    faq: FAQ_CORE_EN,
  },

  "agente-ventas-ia": {
    slug: "agente-ventas-ia",
    category: "agente",
    hero: {
      badge: "AI Sales Agent",
      title: "Close deals without losing the thread between leads and follow-ups.",
      subtitle: "Qualifies, contacts, nurtures and schedules — the agent takes every lead from form to booked meeting.",
      mockupSlug: "ventas",
    },
    features: [
      { icon: "target",         title: "BANT qualification",    description: "Budget, authority, need and timeline — asked in context." },
      { icon: "zap",            title: "Automated follow-up",   description: "Email + WhatsApp cadence, nothing slips." },
      { icon: "calendar",       title: "Meeting booking",       description: "Straight into the rep's calendar on a free slot." },
      { icon: "trending-up",    title: "Dynamic scoring",       description: "Prioritises the hottest leads automatically." },
      { icon: "bot",            title: "Personalised replies",  description: "Learns your sales team's tone and vocabulary." },
      { icon: "bar-chart",      title: "Visible pipeline",      description: "Dashboard with stages, conversion and cycle time." },
    ],
    howItWorks: RECEIVE_UNDERSTAND_DECIDE_EXECUTE_EN,
    modules: [
      { title: "Lead intake",         description: "Handles web forms, WhatsApp or calls and builds the full record." },
      { title: "Sequenced nurture",   description: "Multi-channel cadences configurable by buyer persona." },
      { title: "Meeting scheduler",   description: "Meetings in Calendly, Google Calendar or Outlook." },
      { title: "Rep handoff",         description: "Hands off to the human with a full conversation summary." },
    ],
    useCases: [
      { sectorSlug: "inmobiliarias",  title: "Real estate",    description: "Web lead to scheduled viewing in under 3 minutes." },
      { sectorSlug: "saas-startups",  title: "SaaS",           description: "Auto demo booking with fit qualification." },
      { sectorSlug: "concesionarios", title: "Dealerships",    description: "Outbound prospecting and test-drive booking." },
    ],
    metrics: [
      { value: "+47%", label: "Meetings booked",      context: "Vs. a human SDR at the same lead volume" },
      { value: "3min", label: "Lead to appointment",  context: "Mean capture-to-booking time" },
      { value: "100%", label: "Follow-through",       context: "Zero leads lost in follow-up" },
      { value: "2–4",  label: "Weeks to go-live",     context: "With playbooks and brand voice approved" },
    ],
    integrations: ["openai", "anthropic", "salesforce", "openclaw", "twilio", "google-cloud"],
    faq: FAQ_CORE_EN,
  },

  "agente-soporte-ia": {
    slug: "agente-soporte-ia",
    category: "agente",
    hero: {
      badge: "AI Support Agent",
      title: "Resolve tickets 24/7 — nobody waits.",
      subtitle: "Takes the ticket, classifies it, resolves or routes with context — like an L1 engineer that doesn't sleep.",
      mockupSlug: "soporte",
    },
    features: [
      { icon: "headphones",     title: "L1 resolution",        description: "Known issues solved without ticket or human." },
      { icon: "git-branch",     title: "L2/L3 routing",        description: "What it can't solve goes to the right team with full context." },
      { icon: "zap",            title: "24/7",                 description: "No shifts, no office hours. Out-of-hours gets handled too." },
      { icon: "shield",         title: "SLA tracking",         description: "Auto-escalates as the SLA limit approaches." },
      { icon: "bar-chart",      title: "Living KB",            description: "The knowledge base grows with every resolved case." },
      { icon: "message-square", title: "Multichannel",         description: "WhatsApp, email, portal, chat — same agent." },
    ],
    howItWorks: RECEIVE_UNDERSTAND_DECIDE_EXECUTE_EN,
    modules: [
      { title: "AI classification",   description: "Category, priority and product identified automatically." },
      { title: "Resolution engine",   description: "Checks KB + product docs + history to reply." },
      { title: "Escalation",          description: "Integrated with Zendesk, Freshdesk, HubSpot Service Hub." },
      { title: "Reporting",           description: "Time-to-resolve, FCR, CSAT and backlog by category." },
    ],
    useCases: [
      { sectorSlug: "saas-startups",      title: "SaaS",              description: "L1 technical support with engineering escalation for complex cases." },
      { sectorSlug: "ecommerce",          title: "E-commerce",        description: "Order tracking, returns and product questions." },
      { sectorSlug: "servicios-tecnicos", title: "Technical services",description: "Initial diagnostics and on-site visit booking." },
    ],
    metrics: [
      { value: "65%",  label: "Resolved without human",     context: "Tickets fully closed by the agent" },
      { value: "–70%", label: "Time to first response",     context: "Vs. traditional ticket queue" },
      { value: "24/7", label: "Coverage",                   context: "Out-of-hours, weekends, bank holidays" },
      { value: "3–5",  label: "Weeks to go-live",           context: "With helpdesk integration + existing KB" },
    ],
    integrations: ["openai", "anthropic", "openclaw", "salesforce", "google-cloud", "twilio"],
    faq: FAQ_CORE_EN,
  },

  "agente-agendamientos-ia": {
    slug: "agente-agendamientos-ia",
    category: "agente",
    hero: {
      badge: "AI Scheduling Agent",
      title: "Bookings, appointments and visits running themselves.",
      subtitle: "Books against a live calendar, sends reminders, handles cancellations and reschedules — no phone needed.",
      mockupSlug: "agendamiento",
    },
    features: [
      { icon: "calendar",       title: "Live scheduling",        description: "Confirms free slots in Google Calendar, Outlook or Calendly." },
      { icon: "bell",           title: "Reminders",              description: "SMS or WhatsApp 24h and 1h before the appointment." },
      { icon: "zap",            title: "Rescheduling",           description: "Customers cancel or change without calling anyone." },
      { icon: "users",          title: "Multi-resource",         description: "Assigns to the right person or room by rule." },
      { icon: "shield",         title: "No-show prevention",     description: "Active confirmation before the appointment cuts no-shows." },
      { icon: "bar-chart",      title: "Visible occupancy",      description: "Hourly load dashboard by resource." },
    ],
    howItWorks: RECEIVE_UNDERSTAND_DECIDE_EXECUTE_EN,
    modules: [
      { title: "Calendar sync",         description: "Bidirectional with Google, Outlook and proprietary systems." },
      { title: "Reminder engine",       description: "Channel and timing flows configurable per use case." },
      { title: "Active confirmation",   description: "The customer confirms attendance — cuts no-shows by ~60%." },
      { title: "Reassignment",          description: "If a resource cancels, the agent rebooks automatically." },
    ],
    useCases: [
      { sectorSlug: "clinicas",        title: "Clinics",         description: "First visit, review and reschedule. Integrates with practice-management software." },
      { sectorSlug: "centros-belleza", title: "Beauty centres",  description: "Bookings by stylist + treatment chosen." },
      { sectorSlug: "gimnasios",       title: "Gyms",            description: "Group classes, personal trainer, court booking." },
    ],
    metrics: [
      { value: "–60%", label: "No-show rate",           context: "With active confirmation + double reminders" },
      { value: "0",    label: "Reception phone calls",  context: "Every booking captured without human touch" },
      { value: "+47%", label: "Bookings confirmed",     context: "Vs. a traditional web form" },
      { value: "2–3",  label: "Weeks to go-live",       context: "With calendars + assignment rules configured" },
    ],
    integrations: ["openai", "google-cloud", "anthropic", "twilio", "openclaw", "salesforce"],
    faq: FAQ_CORE_EN,
  },

  "lead-generation-ia": {
    slug: "lead-generation-ia",
    category: "automatizacion",
    hero: {
      badge: "AI Lead Generation",
      title: "Find, enrich and contact leads on autopilot.",
      subtitle: "Outbound prospecting that finds target accounts, enriches the data and opens the conversation without human touch.",
      mockupSlug: "leadgen",
    },
    features: [
      { icon: "target",         title: "Automated ICP",           description: "Define your buyer and the agent finds matching accounts." },
      { icon: "trending-up",    title: "Enrichment",              description: "Contact data, technographics and intent signals." },
      { icon: "message-square", title: "Multichannel outreach",   description: "Email + LinkedIn + WhatsApp on a cadence." },
      { icon: "zap",            title: "Auto-reply",              description: "Replies to lead responses and books meetings." },
      { icon: "shield",         title: "Compliance",              description: "Opt-out handled natively, GDPR-ready." },
      { icon: "bar-chart",      title: "Campaign analytics",      description: "Open rate, reply rate, conversion → meeting." },
    ],
    howItWorks: RECEIVE_UNDERSTAND_DECIDE_EXECUTE_EN,
    modules: [
      { title: "Prospect sourcing",  description: "Scraping + public datasets + Apollo/ZoomInfo if you're already licensed." },
      { title: "Enrichment",         description: "Fills in email, phone, role and signals from multiple sources." },
      { title: "Outreach engine",    description: "A/B-tested sequences with variants per segment." },
      { title: "Reply handling",     description: "AI handles common objections and books a demo when interest surfaces." },
    ],
    useCases: [
      { sectorSlug: "saas-startups",      title: "B2B SaaS",          description: "Predictable top-of-funnel with scalable demo volume." },
      { sectorSlug: "servicios-tecnicos", title: "B2B services",      description: "Brings consultancies and technical services to enterprise buyers." },
      { sectorSlug: "inmobiliarias",      title: "Commercial property",description: "Prospecting investors and developers." },
    ],
    metrics: [
      { value: "×10",  label: "Prospecting volume",    context: "Vs. a dedicated human SDR" },
      { value: "5%",   label: "Mean reply rate",       context: "Top-quartile outbound benchmark" },
      { value: "48h",  label: "Lead → demo booked",    context: "Mean time from first reply" },
      { value: "3–5",  label: "Weeks to go-live",      context: "With ICP + messaging + CRM integration" },
    ],
    integrations: ["openai", "anthropic", "salesforce", "openclaw", "google-cloud", "twilio"],
    faq: FAQ_CORE_EN,
  },

  "agentes-ia-voz-humana": {
    slug: "agentes-ia-voz-humana",
    category: "agente",
    hero: {
      badge: "Human-Voice AI",
      title: "Voices your customers can't tell from a real person.",
      subtitle: "Premium synthesis + real-time recognition + conversational context. In 3 languages.",
      mockupSlug: "voz-humana",
    },
    features: [
      { icon: "phone",       title: "Natural HD voice",         description: "ElevenLabs premium with human tone and cadence." },
      { icon: "zap",         title: "<500ms latency",           description: "Fluid conversation, no awkward pauses." },
      { icon: "globe",       title: "Multilingual",             description: "ES, EN and PT with automatic detection." },
      { icon: "users",       title: "Brand voice",              description: "Pick a voice or clone one from your team." },
      { icon: "shield",      title: "Secure transcription",     description: "Every call recorded, transcribed, searchable." },
      { icon: "bot",         title: "Emotion and pauses",       description: "Not robotic — breathes, emphasises, adjusts tone." },
    ],
    howItWorks: RECEIVE_UNDERSTAND_DECIDE_EXECUTE_EN,
    modules: [
      { title: "Premium TTS",       description: "Neural synthesis with voices trained for your market." },
      { title: "Real-time STT",     description: "Recognition with language detection and context." },
      { title: "Interruption",      description: "The caller interrupts — the agent listens and adapts." },
      { title: "Optional cloning",  description: "Reproduces the voice of your head of sales or receptionist." },
    ],
    useCases: [
      { sectorSlug: "clinicas",       title: "Clinics",       description: "Warm, empathetic voice for appointment management." },
      { sectorSlug: "restaurantes",   title: "Restaurants",   description: "Friendly voice for evening and weekend bookings." },
      { sectorSlug: "concesionarios", title: "Dealerships",   description: "Professional voice for service campaigns." },
    ],
    metrics: [
      { value: "<500ms", label: "Voice-to-voice latency", context: "Natural conversation with imperceptible gaps" },
      { value: "96%",    label: "Speaker fidelity",       context: "Blind A/B test vs. a human" },
      { value: "3",      label: "Native languages",       context: "ES · EN · PT with hot-swap" },
      { value: "2–4",    label: "Weeks to go-live",       context: "Voice selection and fine-tuning included" },
    ],
    integrations: ["openai", "anthropic", "twilio", "google-cloud", "openclaw", "salesforce"],
    faq: FAQ_CORE_EN,
  },

  "automacion-ventas-ia": {
    slug: "automacion-ventas-ia",
    category: "automatizacion",
    hero: {
      badge: "Sales Automation",
      title: "A pipeline run by agents, not spreadsheets.",
      subtitle: "The lead comes in, gets qualified, nurtured and booked — your team only steps in when they add real value.",
      mockupSlug: "automacion-ventas",
    },
    features: [
      { icon: "zap",            title: "Self-running pipeline",     description: "Every stage fires its actions without waiting on someone to remember." },
      { icon: "trending-up",    title: "Continuous scoring",        description: "Lead priority recalculated with every interaction." },
      { icon: "message-square", title: "Channel coordination",      description: "Email, WhatsApp, LinkedIn and phone in sync." },
      { icon: "target",         title: "Fine segmentation",         description: "Different playbooks per buyer, size and industry." },
      { icon: "bar-chart",      title: "Forecasting",               description: "Real-time close prediction." },
      { icon: "shield",         title: "Auditable",                 description: "Every action logged and reversible." },
    ],
    howItWorks: RECEIVE_UNDERSTAND_DECIDE_EXECUTE_EN,
    modules: [
      { title: "Pipeline engine",    description: "Stage-transition rules, SLAs and automatic actions." },
      { title: "Playbooks",          description: "Cadence templates by buyer and industry." },
      { title: "Forecasting",        description: "AI prediction based on historical behaviour." },
      { title: "CRM sync",           description: "Bidirectional with HubSpot, Salesforce, Pipedrive." },
    ],
    useCases: [
      { sectorSlug: "saas-startups",   title: "B2B SaaS",       description: "Inbound and outbound sources in one operational pipeline." },
      { sectorSlug: "inmobiliarias",   title: "Real estate",    description: "Lead → viewing → offer with an optimised cadence." },
      { sectorSlug: "concesionarios",  title: "Dealerships",    description: "Web interest → test drive → finance." },
    ],
    metrics: [
      { value: "+35%", label: "Pipeline velocity",       context: "Mean stage-to-stage time reduced" },
      { value: "–50%", label: "Manual tasks",            context: "Spreadsheets and follow-ups automated" },
      { value: "100%", label: "Lead coverage",           context: "Zero leads without follow-up" },
      { value: "4–6",  label: "Weeks to go-live",        context: "With pipeline mapping + CRM integration" },
    ],
    integrations: ["openai", "anthropic", "salesforce", "openclaw", "google-cloud", "twilio"],
    faq: FAQ_CORE_EN,
  },

  "onboarding-automatico": {
    slug: "onboarding-automatico",
    category: "automatizacion",
    hero: {
      badge: "Automated Onboarding",
      title: "Activate new customers without friction.",
      subtitle: "From contract signed to first successful use — the agent guides, answers and unblocks.",
      mockupSlug: "onboarding",
    },
    features: [
      { icon: "zap",            title: "Guided activation",     description: "Step-by-step flow via email + WhatsApp + in-app chat." },
      { icon: "users",          title: "Multi-persona",         description: "Different onboarding for admin, standard user and technical." },
      { icon: "message-square", title: "24/7 replies",          description: "FAQs resolved before they escalate." },
      { icon: "calendar",       title: "Auto kick-off",         description: "Books the kick-off call with the right CSM." },
      { icon: "bar-chart",      title: "Customer health",       description: "Detects churn risk before it happens." },
      { icon: "shield",         title: "Time-to-value SLA",     description: "Alerts the team when a customer hasn't activated in N days." },
    ],
    howItWorks: RECEIVE_UNDERSTAND_DECIDE_EXECUTE_EN,
    modules: [
      { title: "Welcome flow",     description: "Multi-channel sequence with measurable checkpoints." },
      { title: "Embedded KB",      description: "Answers rooted in your actual documentation." },
      { title: "Health scoring",   description: "Usage, engagement and risk signals." },
      { title: "Escalation",       description: "CSM handoff with full context when a customer gets stuck." },
    ],
    useCases: [
      { sectorSlug: "saas-startups",   title: "SaaS",             description: "Time-to-value shortened, early churn reduced." },
      { sectorSlug: "centros-belleza", title: "Beauty centres",   description: "First appointment + treatment plan in a continuous flow." },
      { sectorSlug: "gimnasios",       title: "Gyms",             description: "First 7 days: trial class, app installed, first payment OK." },
    ],
    metrics: [
      { value: "+48%", label: "7-day activation",         context: "Vs. traditional human onboarding" },
      { value: "–30%", label: "Month-one churn",          context: "Guided customers stick around longer" },
      { value: "24/7", label: "Question coverage",        context: "No waiting for the CSM to come online" },
      { value: "3–5",  label: "Weeks to go-live",         context: "With welcome playbooks + product integration" },
    ],
    integrations: ["openai", "anthropic", "openclaw", "salesforce", "google-cloud", "twilio"],
    faq: FAQ_CORE_EN,
  },

  "agente-chat-productos-ia": {
    slug: "agente-chat-productos-ia",
    category: "agente",
    hero: {
      badge: "Product Chat AI",
      title: "Your catalogue, explained like there's a sales rep in the shop.",
      subtitle: "Answers product questions, recommends alternatives, runs comparisons and closes the sale.",
      mockupSlug: "chat-productos",
    },
    features: [
      { icon: "message-square", title: "Product questions",      description: "Specs, compatibility, availability — live." },
      { icon: "trending-up",    title: "Recommendations",        description: "Suggests alternatives and complements based on behaviour." },
      { icon: "target",         title: "Comparisons",            description: "Compares products side by side with catalogue data." },
      { icon: "zap",            title: "Live stock",             description: "Checks inventory before promising anything." },
      { icon: "bot",            title: "Brand voice",            description: "Editorial tone and catalogue-native vocabulary." },
      { icon: "bar-chart",      title: "Query analytics",        description: "What customers ask and which answers convert." },
    ],
    howItWorks: RECEIVE_UNDERSTAND_DECIDE_EXECUTE_EN,
    modules: [
      { title: "Catalogue ingestion", description: "Syncs with Shopify, WooCommerce, Magento, custom platforms." },
      { title: "Knowledge graph",     description: "Product ↔ use ↔ industry relationships for fine-grained recommendation." },
      { title: "Live stock",          description: "Real-time ERP check before confirming availability." },
      { title: "Sales handoff",       description: "Hands off to a human rep when the purchase warrants high-touch." },
    ],
    useCases: [
      { sectorSlug: "ecommerce",      title: "E-commerce",   description: "Large catalogues with many variants and compatibilities." },
      { sectorSlug: "retail",         title: "Retail",       description: "Online and physical stores: unified stock and availability." },
      { sectorSlug: "concesionarios", title: "Dealerships",  description: "Vehicle configurator with options, engine and finance." },
    ],
    metrics: [
      { value: "+32%", label: "PDP → checkout conversion",    context: "Product pages with chat active" },
      { value: "×3",   label: "Up-sell rate",                 context: "Contextual vs. static recommendations" },
      { value: "80%",  label: "Self-resolved questions",      context: "Without escalating to a human rep" },
      { value: "2–4",  label: "Weeks to go-live",             context: "With structured catalogue + ERP integration" },
    ],
    integrations: ["openai", "anthropic", "openclaw", "salesforce", "google-cloud", "twilio"],
    faq: FAQ_CORE_EN,
  },
}
