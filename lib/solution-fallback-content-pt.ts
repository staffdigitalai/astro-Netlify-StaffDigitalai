/**
 * Portuguese (pt-PT) locale overrides for the /soluciones/[slug]
 * fallback content.
 *
 * Structure mirrors `solution-fallback-content.ts` exactly — same keys,
 * same arrays, same order — just translated to PT. When a slug is
 * missing from this map, `getSolutionFallback(slug, "pt")` falls back
 * to the ES master content.
 *
 * Populated in PR #90 with curated PT-PT copy for all 13 solution slugs.
 * European Portuguese — not Brazilian. Formal B2B register ("o seu",
 * "está"), PT-PT vocabulary (telemóvel, utilizador, ficheiro, equipa,
 * ecrã), and Portuguese-market references where relevant (Autoridade
 * Tributária, IPO, idealista.pt, Imovirtual).
 *
 * Partner slugs in `integrations` and cross-sell `sectorSlug` /
 * `mockupSlug` keep the ES master value — they are internal keys
 * mapped to localized URLs at render time via `cptPath()`.
 */

import type { SolutionFallback, SolutionHowStep, SolutionFaqItem } from "./solution-fallback-content"

/* ─── Shared helpers (PT) ──────────────────────────────────────── */

const RECEIVE_UNDERSTAND_DECIDE_EXECUTE_PT: SolutionHowStep[] = [
  { step: 1, title: "Recebe",    description: "Captura o input do canal — texto, voz, formulário, API." },
  { step: 2, title: "Compreende", description: "Entende a intenção, o contexto e os dados relevantes do CRM." },
  { step: 3, title: "Decide",     description: "Aplica regras de negócio e lógica condicional." },
  { step: 4, title: "Executa",    description: "Responde, agenda, atualiza o sistema ou escala para um humano." },
]

const FAQ_CORE_PT: SolutionFaqItem[] = [
  { q: "Quanto tempo demora a implementação?",              a: "Entre 2 e 6 semanas para um setup standard. Implementações enterprise com integrações personalizadas podem chegar aos 2–4 meses." },
  { q: "Preciso de ter um CRM ou ERP já instalado?",        a: "Não é obrigatório, mas se já tiver integramos. Suportamos HubSpot, Salesforce, Pipedrive, SAP, Odoo e outros." },
  { q: "Existe permanência no contrato?",                   a: "Não. O contrato é mensal e cancelável sem fidelização." },
  { q: "Como é que se mede o ROI?",                         a: "Medimos conversão, tempo de resposta, custos de suporte e automatização alcançada. Entregamos um dashboard operacional." },
  { q: "A minha equipa pode supervisionar as conversas?",   a: "Sim. Todas as interações são visíveis, auditáveis e escaláveis para um humano sempre que o agente não resolver." },
]

/* ─── The 13 solutions (PT) ────────────────────────────────────── */

export const solutionFallbacksPt: Record<string, SolutionFallback> = {
  "ia-omnicanal": {
    slug: "ia-omnicanal",
    category: "canal",
    hero: {
      badge: "Plataforma IA Omnicanal",
      title: "Uma caixa única para WhatsApp, web, telefone e email.",
      subtitle: "Um cliente pergunta no Instagram, continua no WhatsApp e fecha na web sem repetir uma palavra. Um único agente, histórico completo.",
      mockupSlug: "omnicanal",
    },
    features: [
      { icon: "inbox",       title: "Caixa unificada",          description: "Todos os canais — WhatsApp, web chat, telefone, email, redes — na mesma vista." },
      { icon: "user",        title: "Histórico único",           description: "O cliente não repete. O agente vê toda a conversa anterior, independentemente do canal." },
      { icon: "zap",         title: "Resposta 24/7",             description: "Sem horários, sem pausas. Resolve fora de horas e fins de semana." },
      { icon: "git-branch",  title: "Escalada inteligente",      description: "Passa para um humano com contexto sempre que a consulta o exija." },
      { icon: "shield",      title: "Auditável",                 description: "Cada interação fica registada e é exportável para compliance." },
      { icon: "trending-up", title: "Analítica operacional",     description: "Taxa de resolução, tempos, sentiment e carga por canal em tempo real." },
    ],
    howItWorks: RECEIVE_UNDERSTAND_DECIDE_EXECUTE_PT,
    modules: [
      { title: "Caixa unificada",       description: "WhatsApp Business, web chat, email e chamadas numa só vista, com thread único por cliente.", mockupSlug: "inbox" },
      { title: "Encaminhamento",        description: "Regras por canal, setor, idioma ou urgência. Override manual disponível." },
      { title: "Escalada humana",       description: "Um clique para passar ao agente humano com contexto completo." },
      { title: "Reporting",             description: "Métricas operacionais exportáveis para dashboard interno ou Looker Studio." },
    ],
    useCases: [
      { sectorSlug: "clinicas",     title: "Clínicas",        description: "Marca consultas, confirma pacientes e responde a dúvidas no canal preferido do doente." },
      { sectorSlug: "ecommerce",    title: "E-commerce",      description: "Dúvida de produto, tracking de encomenda ou devolução — tudo numa só conversa." },
      { sectorSlug: "restaurantes", title: "Restaurantes",    description: "Reservas por WhatsApp ou web, confirmação automática, alterações sem chamadas telefónicas." },
    ],
    metrics: [
      { value: "87%",  label: "Redução no tempo de resposta",  context: "Clínicas, ~500 interações/dia, 3 meses após implementação" },
      { value: "+40%", label: "Conversão de leads",            context: "E-commerce, WhatsApp + web vs. atendimento manual" },
      { value: "24/7", label: "Disponibilidade",               context: "Sem turnos, sem horários, sem filas" },
      { value: "2–6",  label: "Semanas para entrar em produção",context: "Setup standard sem integrações personalizadas" },
    ],
    integrations: ["openai", "anthropic", "twilio", "google-cloud", "salesforce", "openclaw"],
    faq: FAQ_CORE_PT,
  },

  "whatsapp-ia-empresas": {
    slug: "whatsapp-ia-empresas",
    category: "canal",
    hero: {
      badge: "Agente IA para WhatsApp Business",
      title: "Transforme o WhatsApp no seu principal canal de vendas e apoio.",
      subtitle: "Responde, qualifica, agenda e atualiza o seu CRM a partir do WhatsApp. Sem intervenção manual, com voz de marca consistente.",
      mockupSlug: "whatsapp",
    },
    features: [
      { icon: "message-square", title: "Resposta instantânea",    description: "Responde em segundos, 24/7, com contexto completo do cliente." },
      { icon: "target",         title: "Qualificação de leads",   description: "Pergunta orçamento, timing e fit — cria o registo no CRM." },
      { icon: "calendar",       title: "Agenda automática",       description: "Confirma o horário, envia o lembrete e sincroniza com o calendário." },
      { icon: "bot",            title: "Templates + IA",          description: "Campanhas WhatsApp Business com respostas personalizadas por IA." },
      { icon: "bar-chart",      title: "Analítica de canal",      description: "Taxa de resposta, conversão por template, horas de pico." },
      { icon: "shield",         title: "Compliance",              description: "Integração oficial com a API do WhatsApp Business e consentimento de opt-in." },
    ],
    howItWorks: RECEIVE_UNDERSTAND_DECIDE_EXECUTE_PT,
    modules: [
      { title: "Ligação à API oficial",    description: "WhatsApp Business API via Twilio ou 360dialog, com número verificado." },
      { title: "Intent + extração",        description: "Deteta a intenção e extrai entidades (data, hora, produto, preço)." },
      { title: "Sincronização com CRM",    description: "Cria ou atualiza leads no HubSpot/Salesforce/Pipedrive automaticamente." },
      { title: "Handoff para humano",      description: "Escala para a equipa comercial com contexto — sem perder o fio." },
    ],
    useCases: [
      { sectorSlug: "restaurantes",  title: "Restaurantes",  description: "Reservas, cancelamentos e alterações 100% por WhatsApp." },
      { sectorSlug: "inmobiliarias", title: "Imobiliárias",  description: "Qualifica leads, agenda visitas e responde sobre imóveis no canal preferido." },
      { sectorSlug: "clinicas",      title: "Clínicas",      description: "Lembretes de marcação e remarcação automática via WhatsApp." },
    ],
    metrics: [
      { value: "+40%", label: "Conversão de leads",                context: "E-commerce vs. atendimento por pessoa" },
      { value: "2s",   label: "Tempo médio de resposta",           context: "Comparado com 4h no canal atendido manualmente" },
      { value: "70%",  label: "Consultas resolvidas ao primeiro contacto", context: "Sem handoff para humano em 7 de cada 10 casos" },
      { value: "2–4",  label: "Semanas de integração",             context: "Número verificado + templates aprovados" },
    ],
    integrations: ["twilio", "openai", "anthropic", "salesforce", "openclaw", "google-cloud"],
    faq: FAQ_CORE_PT,
  },

  "atencion-telefonica-ia": {
    slug: "atencion-telefonica-ia",
    category: "canal",
    hero: {
      badge: "Atendimento Telefónico IA",
      title: "Vozes realistas que atendem chamadas sem IVR, sem filas.",
      subtitle: "O seu número principal atende ao primeiro toque, entende o cliente e resolve ou encaminha — como uma rececionista treinada, mas 24/7.",
      mockupSlug: "telefonica",
    },
    features: [
      { icon: "phone",        title: "Vozes humanas HD",         description: "Indistinguíveis de uma pessoa real, em 3 idiomas." },
      { icon: "zap",          title: "Sem IVR",                  description: "O cliente fala — o agente compreende. Sem menus." },
      { icon: "calendar",     title: "Agenda em chamada",        description: "Confirma a marcação verbalmente e cria-a no calendário em tempo real." },
      { icon: "headphones",   title: "Transferência contextual", description: "Se escala, passa ao humano com a conversa transcrita." },
      { icon: "bar-chart",    title: "Transcrição automática",   description: "Cada chamada fica registada, pesquisável e analítica." },
      { icon: "globe",        title: "Multilingue",              description: "Deteta o idioma do cliente e muda em tempo real." },
    ],
    howItWorks: RECEIVE_UNDERSTAND_DECIDE_EXECUTE_PT,
    modules: [
      { title: "Motor de voz",       description: "Síntese e reconhecimento abaixo dos 500ms. Vozes premium da ElevenLabs." },
      { title: "Telefonia",          description: "Integração com Twilio, Aircall, Ringover. Número próprio ou portado." },
      { title: "Agenda",             description: "Google Calendar, Outlook, Calendly. Confirma horários livres em direto." },
      { title: "Sync com CRM",       description: "Cria o registo de contacto e regista a chamada automaticamente." },
    ],
    useCases: [
      { sectorSlug: "clinicas",       title: "Clínicas",         description: "Marcações, confirmações e consultas administrativas sem ninguém ao telefone." },
      { sectorSlug: "restaurantes",   title: "Restaurantes",     description: "Reservas telefónicas 24/7, mesmo com o espaço cheio." },
      { sectorSlug: "concesionarios", title: "Concessionários",  description: "Consultas de stock, marcação de test drive e pré-qualificação de financiamento." },
    ],
    metrics: [
      { value: "0s",    label: "Tempo de espera",          context: "Atende ao primeiro toque, sempre" },
      { value: "500ms", label: "Latência voz-a-voz",       context: "Conversa natural, sem cortes" },
      { value: "92%",   label: "Resolução sem humano",     context: "Casos que o agente conclui end-to-end" },
      { value: "2–3",   label: "Semanas até go-live",      context: "Com número verificado + integração CRM" },
    ],
    integrations: ["twilio", "openai", "anthropic", "google-cloud", "openclaw", "salesforce"],
    faq: FAQ_CORE_PT,
  },

  "ia-call-center": {
    slug: "ia-call-center",
    category: "canal",
    hero: {
      badge: "IA Call Center",
      title: "Um call center que escala sem contratar.",
      subtitle: "Centenas de chamadas em simultâneo, o mesmo tom de marca, zero filas. Para operações inbound e outbound.",
      mockupSlug: "call-center",
      heroImage: "/images/solutions/hero-ia-call-center.png",
    },
    features: [
      { icon: "phone",       title: "Inbound ilimitado",        description: "Atende picos de chamadas sem saturar linhas." },
      { icon: "trending-up", title: "Outbound proativo",        description: "Liga para listas de leads ou clientes com guião personalizado." },
      { icon: "users",       title: "Handoff para equipa",      description: "Escala com contexto para comercial ou suporte humano." },
      { icon: "bar-chart",   title: "Dashboard operacional",    description: "Volume, resolução, sentiment e custo por chamada." },
      { icon: "shield",      title: "Compliance e gravação",    description: "Cumpre requisitos de gravação e consentimento." },
      { icon: "zap",         title: "Escalabilidade instantânea",description: "De 10 para 1.000 chamadas em simultâneo sem reconfigurar." },
    ],
    howItWorks: RECEIVE_UNDERSTAND_DECIDE_EXECUTE_PT,
    modules: [
      { title: "Inbound sem IVR",    description: "Cada chamada atendida por IA como primeira linha." },
      { title: "Campanhas outbound", description: "Dialler com listas segmentadas e guião por campanha." },
      { title: "Guiões dinâmicos",   description: "Ramos de conversação consoante a resposta do cliente." },
      { title: "Reporting",          description: "KPIs de call center (AHT, FCR, CSAT) e exportáveis." },
    ],
    useCases: [
      { sectorSlug: "ecommerce",      title: "E-commerce",       description: "Consultas de encomenda, devoluções e suporte em picos sazonais." },
      { sectorSlug: "clinicas",       title: "Clínicas",         description: "Marcar consultas e responder a dúvidas administrativas em grande escala." },
      { sectorSlug: "concesionarios", title: "Concessionários",  description: "Campanhas outbound de oficina e alertas de IPO." },
    ],
    metrics: [
      { value: "∞",    label: "Chamadas em simultâneo",      context: "Sem contratar agentes nem ampliar central" },
      { value: "–65%", label: "Custo por contacto",          context: "Face a call center humano tradicional" },
      { value: "92%",  label: "Resolução à primeira chamada",context: "Sem transferências nem retomas" },
      { value: "4",    label: "Semanas até implementação",   context: "Setup standard com guiões e dialler" },
    ],
    integrations: ["twilio", "openai", "anthropic", "openclaw", "salesforce", "google-cloud"],
    faq: FAQ_CORE_PT,
  },

  "agente-chat-web-ia": {
    slug: "agente-chat-web-ia",
    category: "canal",
    hero: {
      badge: "Chatbot Web",
      title: "Um agente no seu site que converte visitantes em leads.",
      subtitle: "Responde a perguntas, capta leads e agenda demos diretamente a partir do widget no seu site.",
      mockupSlug: "web-chat",
    },
    features: [
      { icon: "globe",          title: "Widget incorporável",     description: "Um script, funciona em WordPress, Webflow, Framer, Shopify." },
      { icon: "target",         title: "Captura inteligente",     description: "Pede email/telemóvel no momento ótimo da conversa." },
      { icon: "calendar",       title: "Agenda demo",             description: "Seleciona horário no seu calendário e confirma no chat." },
      { icon: "message-square", title: "Base de conhecimento",    description: "Treinado com a sua documentação, produto e FAQ." },
      { icon: "zap",            title: "Resposta instantânea",    description: "<2s em 95% das perguntas." },
      { icon: "bar-chart",      title: "Analítica de conversão",  description: "Rácio pergunta → captura → lead qualificado." },
    ],
    howItWorks: RECEIVE_UNDERSTAND_DECIDE_EXECUTE_PT,
    modules: [
      { title: "Widget",               description: "Chat integrado em desktop e mobile com UX responsive." },
      { title: "Base de conhecimento", description: "Treino sobre as suas páginas, PDFs e FAQs atuais." },
      { title: "Captura de formulário", description: "Gerador de leads com campos dinâmicos." },
      { title: "Integração com CRM",   description: "Cada lead entra direto no HubSpot/Pipedrive/Salesforce." },
    ],
    useCases: [
      { sectorSlug: "saas-startups", title: "SaaS / Startups", description: "Qualifica visitantes e agenda demos no seu pipeline." },
      { sectorSlug: "inmobiliarias", title: "Imobiliárias",    description: "Filtra leads por orçamento, zona e tipo de imóvel." },
      { sectorSlug: "clinicas",      title: "Clínicas",        description: "Resolve dúvidas antes da primeira consulta." },
    ],
    metrics: [
      { value: "+55%", label: "Conversão visitante → lead",  context: "E-commerce e SaaS face a formulário estático" },
      { value: "<2s",  label: "Tempo de resposta",           context: "95% das perguntas resolvidas sem espera" },
      { value: "80%",  label: "FAQs auto-resolvidas",        context: "Sem abrir ticket, sem escalar" },
      { value: "1–2",  label: "Semanas até go-live",         context: "Setup standard com treino base" },
    ],
    integrations: ["openai", "anthropic", "openclaw", "salesforce", "google-cloud", "twilio"],
    faq: FAQ_CORE_PT,
  },

  "agente-ventas-ia": {
    slug: "agente-ventas-ia",
    category: "agente",
    hero: {
      badge: "Agente de Vendas IA",
      title: "Feche vendas sem perder o fio entre leads e follow-ups.",
      subtitle: "Qualifica, contacta, nutre e agenda — o agente leva cada lead do formulário até à reunião marcada.",
      mockupSlug: "ventas",
    },
    features: [
      { icon: "target",         title: "Qualificação BANT",       description: "Orçamento, autoridade, necessidade e timing — perguntados em contexto." },
      { icon: "zap",            title: "Follow-up automático",    description: "Email + WhatsApp numa cadência, sem esquecimentos." },
      { icon: "calendar",       title: "Agenda reunião",          description: "Direto no calendário do comercial com o horário livre." },
      { icon: "trending-up",    title: "Scoring dinâmico",        description: "Prioriza os leads mais quentes automaticamente." },
      { icon: "bot",            title: "Respostas personalizadas",description: "Aprende o tom e a linguagem da sua equipa de vendas." },
      { icon: "bar-chart",      title: "Pipeline visível",        description: "Dashboard com fases, conversão e tempos." },
    ],
    howItWorks: RECEIVE_UNDERSTAND_DECIDE_EXECUTE_PT,
    modules: [
      { title: "Entrada de leads",     description: "Recebe formulários web, WhatsApp ou chamada e cria o registo completo." },
      { title: "Nutrição sequencial",  description: "Cadências multicanal configuráveis por buyer persona." },
      { title: "Agendador de reuniões",description: "Reuniões em Calendly, Google Calendar ou Outlook." },
      { title: "Handoff ao comercial", description: "Passa ao humano com toda a conversa resumida." },
    ],
    useCases: [
      { sectorSlug: "inmobiliarias",  title: "Imobiliárias",     description: "Da visita web à marcação em menos de 3 minutos." },
      { sectorSlug: "saas-startups",  title: "SaaS",             description: "Demo booking automático com qualificação de fit." },
      { sectorSlug: "concesionarios", title: "Concessionários",  description: "Prospeção outbound e marcação de test drive." },
    ],
    metrics: [
      { value: "+47%", label: "Reuniões agendadas",      context: "Vs. SDR humano com o mesmo volume de leads" },
      { value: "3min", label: "De lead a marcação",      context: "Tempo médio entre captura e agendamento" },
      { value: "100%", label: "Follow-through",          context: "Zero leads perdidos em follow-up" },
      { value: "2–4",  label: "Semanas até go-live",     context: "Com playbooks e tom de marca aprovados" },
    ],
    integrations: ["openai", "anthropic", "salesforce", "openclaw", "twilio", "google-cloud"],
    faq: FAQ_CORE_PT,
  },

  "agente-soporte-ia": {
    slug: "agente-soporte-ia",
    category: "agente",
    hero: {
      badge: "Agente de Suporte IA",
      title: "Resolve tickets 24/7 — ninguém fica à espera.",
      subtitle: "Recebe a incidência, classifica, resolve ou encaminha com contexto — como um técnico de L1 que não dorme.",
      mockupSlug: "soporte",
    },
    features: [
      { icon: "headphones",     title: "Resolução L1",            description: "Problemas conhecidos resolvidos sem ticket nem humano." },
      { icon: "git-branch",     title: "Encaminhamento L2/L3",    description: "O que não resolve passa à equipa certa com contexto." },
      { icon: "zap",            title: "24/7",                    description: "Sem turnos nem horários. Fora de horas também atende." },
      { icon: "shield",         title: "SLA tracking",            description: "Escalada automática à medida que se aproxima do limite de SLA." },
      { icon: "bar-chart",      title: "KB operacional",          description: "A base de conhecimento cresce sozinha com cada caso resolvido." },
      { icon: "message-square", title: "Multicanal",              description: "WhatsApp, email, portal, chat — o mesmo agente." },
    ],
    howItWorks: RECEIVE_UNDERSTAND_DECIDE_EXECUTE_PT,
    modules: [
      { title: "Classificação IA",     description: "Categoria, prioridade e produto identificados automaticamente." },
      { title: "Motor de resolução",   description: "Consulta KB + docs de produto + histórico para responder." },
      { title: "Escalada",             description: "Integrado com Zendesk, Freshdesk, HubSpot Service Hub." },
      { title: "Reporting",            description: "Tempo de resolução, FCR, CSAT e backlog por categoria." },
    ],
    useCases: [
      { sectorSlug: "saas-startups",      title: "SaaS",               description: "Suporte técnico L1 com escalada para engenharia em casos complexos." },
      { sectorSlug: "ecommerce",          title: "E-commerce",         description: "Tracking de encomenda, devoluções e dúvidas de produto." },
      { sectorSlug: "servicios-tecnicos", title: "Serviços técnicos", description: "Diagnóstico inicial e agendamento de visita técnica." },
    ],
    metrics: [
      { value: "65%",  label: "Resolução sem humano",        context: "Tickets fechados completamente pelo agente" },
      { value: "–70%", label: "Tempo até primeira resposta", context: "Face a uma fila tradicional" },
      { value: "24/7", label: "Cobertura",                   context: "Fora de horas, fins de semana, feriados" },
      { value: "3–5",  label: "Semanas até go-live",         context: "Com integração helpdesk + KB existente" },
    ],
    integrations: ["openai", "anthropic", "openclaw", "salesforce", "google-cloud", "twilio"],
    faq: FAQ_CORE_PT,
  },

  "agente-agendamientos-ia": {
    slug: "agente-agendamientos-ia",
    category: "agente",
    hero: {
      badge: "Agente de Agendamentos IA",
      title: "Reservas, marcações e visitas geridas sozinhas.",
      subtitle: "Agenda em calendário real, envia lembretes, gere cancelamentos e remarcações — sem tocar no telefone.",
      mockupSlug: "agendamiento",
    },
    features: [
      { icon: "calendar",       title: "Agenda em tempo real",     description: "Confirma horários livres em Google Calendar, Outlook ou Calendly." },
      { icon: "bell",           title: "Lembretes",                description: "SMS ou WhatsApp 24h e 1h antes da marcação." },
      { icon: "zap",            title: "Remarcação",               description: "O cliente cancela ou altera sem ligar a ninguém." },
      { icon: "users",          title: "Multi-recurso",            description: "Atribui à pessoa ou sala certa conforme a regra." },
      { icon: "shield",         title: "Prevenção de no-show",     description: "Confirmação ativa antes da marcação reduz faltas." },
      { icon: "bar-chart",      title: "Ocupação visível",         description: "Dashboard de carga horária por recurso." },
    ],
    howItWorks: RECEIVE_UNDERSTAND_DECIDE_EXECUTE_PT,
    modules: [
      { title: "Calendar sync",         description: "Bidirecional com Google, Outlook e sistemas proprietários." },
      { title: "Motor de lembretes",    description: "Fluxos de lembrete por canal e timing configuráveis." },
      { title: "Confirmação ativa",     description: "O cliente confirma presença — reduz no-shows em ~60%." },
      { title: "Reatribuição",          description: "Se um recurso cancela, reagenda com outro automaticamente." },
    ],
    useCases: [
      { sectorSlug: "clinicas",        title: "Clínicas",          description: "Primeira consulta, revisão e remarcação. Integra com software clínico." },
      { sectorSlug: "centros-belleza", title: "Centros de beleza", description: "Reservas com profissional + tratamento escolhido." },
      { sectorSlug: "gimnasios",       title: "Ginásios",          description: "Aulas de grupo, personal trainer, reserva de campo." },
    ],
    metrics: [
      { value: "–60%", label: "Taxa de no-show",         context: "Com confirmação ativa + lembretes duplos" },
      { value: "0",    label: "Chamadas à receção",      context: "Todas as reservas entram sem intervenção humana" },
      { value: "+47%", label: "Reservas confirmadas",    context: "Vs. formulário web tradicional" },
      { value: "2–3",  label: "Semanas até go-live",     context: "Com calendários + regras de atribuição" },
    ],
    integrations: ["openai", "google-cloud", "anthropic", "twilio", "openclaw", "salesforce"],
    faq: FAQ_CORE_PT,
  },

  "lead-generation-ia": {
    slug: "lead-generation-ia",
    category: "automatizacion",
    hero: {
      badge: "Lead Generation IA",
      title: "Encontra, enriquece e contacta leads em piloto automático.",
      subtitle: "Prospeção outbound que identifica empresas-alvo, enriquece dados e abre conversa sem intervenção humana.",
      mockupSlug: "leadgen",
    },
    features: [
      { icon: "target",         title: "ICP automatizado",         description: "Define o seu buyer e o agente encontra empresas que encaixam." },
      { icon: "trending-up",    title: "Enriquecimento",           description: "Dados de contacto, tecnografia e sinais de intenção." },
      { icon: "message-square", title: "Outreach multicanal",      description: "Email + LinkedIn + WhatsApp em cadência." },
      { icon: "zap",            title: "Resposta automática",      description: "Responde aos leads que reagem e marca reunião." },
      { icon: "shield",         title: "Compliance",               description: "Opt-out gerido automaticamente e RGPD nativo." },
      { icon: "bar-chart",      title: "Analítica de campanhas",   description: "Open rate, reply rate, conversão → reunião." },
    ],
    howItWorks: RECEIVE_UNDERSTAND_DECIDE_EXECUTE_PT,
    modules: [
      { title: "Prospect sourcing",  description: "Scraping + bases públicas + Apollo/ZoomInfo se já tiver licença." },
      { title: "Enrichment",         description: "Completa email, telemóvel, cargo e sinais a partir de múltiplas fontes." },
      { title: "Motor de outreach",  description: "Sequências A/B-testadas com variantes por segmento." },
      { title: "Gestão de respostas",description: "A IA responde a objeções comuns e marca demo quando há interesse." },
    ],
    useCases: [
      { sectorSlug: "saas-startups",      title: "SaaS B2B",          description: "Top-of-funnel previsível com volume de demos escalável." },
      { sectorSlug: "servicios-tecnicos", title: "Serviços B2B",      description: "Leva consultoras e serviços técnicos a clientes enterprise." },
      { sectorSlug: "inmobiliarias",      title: "Imobiliárias comerciais", description: "Prospeção de investidores e promotores." },
    ],
    metrics: [
      { value: "×10",  label: "Volume de prospeção",     context: "Vs. SDR humano dedicado" },
      { value: "5%",   label: "Reply rate médio",        context: "Dentro do benchmark top-quartile de outbound" },
      { value: "48h",  label: "Lead → demo marcada",     context: "Tempo médio desde primeira resposta" },
      { value: "3–5",  label: "Semanas até go-live",     context: "Com ICP + mensagens + integração CRM" },
    ],
    integrations: ["openai", "anthropic", "salesforce", "openclaw", "google-cloud", "twilio"],
    faq: FAQ_CORE_PT,
  },

  "agentes-ia-voz-humana": {
    slug: "agentes-ia-voz-humana",
    category: "agente",
    hero: {
      badge: "Voz Humana IA",
      title: "Vozes que os seus clientes não distinguem de uma pessoa real.",
      subtitle: "Síntese premium + reconhecimento em tempo real + contexto conversacional. Em 3 idiomas.",
      mockupSlug: "voz-humana",
    },
    features: [
      { icon: "phone",       title: "Voz HD natural",           description: "ElevenLabs premium com tom e cadência humanos." },
      { icon: "zap",         title: "<500ms de latência",        description: "Conversa fluida, sem pausas estranhas." },
      { icon: "globe",       title: "Multilingue",               description: "ES, EN e PT com deteção automática." },
      { icon: "users",       title: "Voz de marca",              description: "Escolha uma voz ou clone a da sua equipa." },
      { icon: "shield",      title: "Transcrição segura",        description: "Cada chamada gravada, transcrita, pesquisável." },
      { icon: "bot",         title: "Emoção e pausa",            description: "Não é robótico — respira, enfatiza, ajusta o tom." },
    ],
    howItWorks: RECEIVE_UNDERSTAND_DECIDE_EXECUTE_PT,
    modules: [
      { title: "TTS premium",        description: "Síntese neural com vozes treinadas para o seu mercado." },
      { title: "STT em tempo real",  description: "Reconhecimento com deteção de idioma e contexto." },
      { title: "Interrupção",        description: "O cliente interrompe — o agente escuta e ajusta." },
      { title: "Clonagem opcional",  description: "Reproduz a voz do seu responsável comercial ou rececionista." },
    ],
    useCases: [
      { sectorSlug: "clinicas",       title: "Clínicas",         description: "Voz calorosa e empática para gestão de marcações." },
      { sectorSlug: "restaurantes",   title: "Restaurantes",     description: "Voz amável para reservas noturnas e fins de semana." },
      { sectorSlug: "concesionarios", title: "Concessionários",  description: "Voz profissional para campanhas de oficina." },
    ],
    metrics: [
      { value: "<500ms", label: "Latência voz-a-voz",     context: "Conversa natural, sem cortes percetíveis" },
      { value: "96%",    label: "Fidelidade ao orador",   context: "Teste A/B cego vs. humano" },
      { value: "3",      label: "Idiomas nativos",        context: "ES · EN · PT com troca em tempo real" },
      { value: "2–4",    label: "Semanas até go-live",    context: "Inclui seleção e fine-tuning da voz" },
    ],
    integrations: ["openai", "anthropic", "twilio", "google-cloud", "openclaw", "salesforce"],
    faq: FAQ_CORE_PT,
  },

  "automacion-ventas-ia": {
    slug: "automacion-ventas-ia",
    category: "automatizacion",
    hero: {
      badge: "Automatização de Vendas",
      title: "O seu pipeline operado por agentes, não por folhas de cálculo.",
      subtitle: "O lead entra, é qualificado, nutrido, marcado — e a equipa só intervém quando acrescenta valor real.",
      mockupSlug: "automacion-ventas",
    },
    features: [
      { icon: "zap",            title: "Pipeline auto-run",       description: "Cada fase executa as suas ações sem esperar que alguém se lembre." },
      { icon: "trending-up",    title: "Scoring contínuo",        description: "Prioridade de leads recalculada a cada interação." },
      { icon: "message-square", title: "Coord. multicanal",       description: "Email, WhatsApp, LinkedIn e chamada em sincronia." },
      { icon: "target",         title: "Segmentação fina",        description: "Playbooks diferentes por buyer, dimensão e setor." },
      { icon: "bar-chart",      title: "Forecast",                description: "Previsão de fecho em tempo real." },
      { icon: "shield",         title: "Auditável",               description: "Cada ação registada e reversível." },
    ],
    howItWorks: RECEIVE_UNDERSTAND_DECIDE_EXECUTE_PT,
    modules: [
      { title: "Motor de pipeline",  description: "Regras de transição de fase, SLAs e ações automáticas." },
      { title: "Playbooks",          description: "Modelos de cadência por buyer e setor." },
      { title: "Forecasting",        description: "Previsão por IA baseada em comportamento histórico." },
      { title: "Sync com CRM",       description: "Bidirecional com HubSpot, Salesforce, Pipedrive." },
    ],
    useCases: [
      { sectorSlug: "saas-startups",   title: "SaaS B2B",          description: "Fontes inbound e outbound num só pipeline operacional." },
      { sectorSlug: "inmobiliarias",   title: "Imobiliárias",      description: "De lead a visita a oferta com cadência otimizada." },
      { sectorSlug: "concesionarios",  title: "Concessionários",   description: "De interesse web a test drive a financiamento." },
    ],
    metrics: [
      { value: "+35%", label: "Velocidade de pipeline",   context: "Tempo médio entre fases reduzido" },
      { value: "–50%", label: "Tarefas manuais",          context: "Folhas de cálculo e follow-ups automatizados" },
      { value: "100%", label: "Cobertura de leads",       context: "Zero leads sem follow-up" },
      { value: "4–6",  label: "Semanas até go-live",      context: "Com mapeamento de pipeline + integração CRM" },
    ],
    integrations: ["openai", "anthropic", "salesforce", "openclaw", "google-cloud", "twilio"],
    faq: FAQ_CORE_PT,
  },

  "onboarding-automatico": {
    slug: "onboarding-automatico",
    category: "automatizacion",
    hero: {
      badge: "Onboarding Automático",
      title: "Ative os seus novos clientes sem fricção.",
      subtitle: "Da assinatura do contrato ao primeiro uso com sucesso — o agente guia, responde e desbloqueia.",
      mockupSlug: "onboarding",
    },
    features: [
      { icon: "zap",            title: "Ativação guiada",         description: "Fluxo passo a passo por email + WhatsApp + chat in-app." },
      { icon: "users",          title: "Multi-perfil",            description: "Onboarding diferente para admin, utilizador standard e técnico." },
      { icon: "message-square", title: "Respostas 24/7",          description: "Perguntas frequentes resolvidas antes de escalar." },
      { icon: "calendar",       title: "Kick-off automático",     description: "Marca a reunião de arranque com o CSM certo." },
      { icon: "bar-chart",      title: "Saúde do cliente",        description: "Deteta risco de abandono antes de acontecer." },
      { icon: "shield",         title: "SLA de time-to-value",    description: "Alerta a equipa se um cliente não ativar em N dias." },
    ],
    howItWorks: RECEIVE_UNDERSTAND_DECIDE_EXECUTE_PT,
    modules: [
      { title: "Fluxo de boas-vindas",description: "Sequência multicanal com checkpoints mensuráveis." },
      { title: "KB integrada",        description: "Respostas ancoradas na sua documentação real." },
      { title: "Health scoring",      description: "Sinais de uso, engagement e risco." },
      { title: "Escalada",            description: "Handoff para CSM com contexto completo se o cliente ficar bloqueado." },
    ],
    useCases: [
      { sectorSlug: "saas-startups",   title: "SaaS",               description: "Time-to-value encurtado, churn inicial reduzido." },
      { sectorSlug: "centros-belleza", title: "Centros de beleza",  description: "Primeira consulta + plano de tratamento num fluxo contínuo." },
      { sectorSlug: "gimnasios",       title: "Ginásios",           description: "Primeiros 7 dias: aula experimental, app instalada, primeiro pagamento OK." },
    ],
    metrics: [
      { value: "+48%", label: "Ativação em 7 dias",         context: "Vs. onboarding humano tradicional" },
      { value: "–30%", label: "Churn no primeiro mês",      context: "Clientes guiados ficam mais tempo" },
      { value: "24/7", label: "Cobertura de dúvidas",       context: "Sem esperar que o CSM fique disponível" },
      { value: "3–5",  label: "Semanas até go-live",        context: "Com playbooks de welcome + integração de produto" },
    ],
    integrations: ["openai", "anthropic", "openclaw", "salesforce", "google-cloud", "twilio"],
    faq: FAQ_CORE_PT,
  },

  "agente-chat-productos-ia": {
    slug: "agente-chat-productos-ia",
    category: "agente",
    hero: {
      badge: "Chat Produtos IA",
      title: "O seu catálogo, explicado como se houvesse um vendedor na loja.",
      subtitle: "Responde a perguntas de produto, recomenda alternativas, faz comparativos e fecha a venda.",
      mockupSlug: "chat-productos",
    },
    features: [
      { icon: "message-square", title: "Perguntas de produto",    description: "Especificações, compatibilidade, disponibilidade — ao momento." },
      { icon: "trending-up",    title: "Recomendações",           description: "Sugere alternativas e complementos com base em comportamento." },
      { icon: "target",         title: "Comparativos",            description: "Compara produtos lado a lado com os dados do catálogo." },
      { icon: "zap",            title: "Stock em direto",         description: "Consulta inventário antes de prometer." },
      { icon: "bot",            title: "Idioma de marca",         description: "Tom editorial e vocabulário próprios do catálogo." },
      { icon: "bar-chart",      title: "Analítica de consulta",   description: "O que os clientes perguntam e que respostas convertem melhor." },
    ],
    howItWorks: RECEIVE_UNDERSTAND_DECIDE_EXECUTE_PT,
    modules: [
      { title: "Ingestão de catálogo", description: "Sincronização com Shopify, WooCommerce, Magento, plataformas custom." },
      { title: "Knowledge graph",      description: "Relações produto ↔ uso ↔ setor para recomendação fina." },
      { title: "Stock live",           description: "Consulta ERP em tempo real antes de confirmar disponibilidade." },
      { title: "Handoff para venda",   description: "Passa a um assessor humano quando a compra justifica alto valor." },
    ],
    useCases: [
      { sectorSlug: "ecommerce",      title: "E-commerce",       description: "Catálogos grandes com muitas variantes e compatibilidades." },
      { sectorSlug: "retail",         title: "Retalho",          description: "Loja online e física: stock e disponibilidade unificados." },
      { sectorSlug: "concesionarios", title: "Concessionários",  description: "Configurador de viatura com opções, motor e financiamento." },
    ],
    metrics: [
      { value: "+32%", label: "Conversão PDP → checkout",     context: "Páginas de produto com chat ativo" },
      { value: "×3",   label: "Taxa de up-sell",              context: "Recomendações contextuais vs. estáticas" },
      { value: "80%",  label: "Perguntas auto-resolvidas",    context: "Sem escalar a assessor humano" },
      { value: "2–4",  label: "Semanas até go-live",          context: "Com catálogo estruturado + integração ERP" },
    ],
    integrations: ["openai", "anthropic", "openclaw", "salesforce", "google-cloud", "twilio"],
    faq: FAQ_CORE_PT,
  },
}
