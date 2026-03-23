// Conversation simulation data for all sectors and services
// Each conversation has a type (whatsapp, chat, phone), messages, and optional stats

export interface ConversationMessage {
  text: string
  isUser: boolean
  time: string
}

export interface ConversationSimulation {
  id: string
  type: "whatsapp" | "chat" | "phone"
  title: string
  description: string
  headerName?: string
  headerStatus?: string
  messages: ConversationMessage[]
  stats?: { value: string; label: string }[]
}

export interface SectorConversations {
  sectorId: string
  sectorName: string
  simulations: ConversationSimulation[]
}

export interface ServiceConversations {
  serviceId: string
  serviceName: string
  simulations: ConversationSimulation[]
}

// ============================================
// SECTOR CONVERSATIONS
// ============================================

export const sectorConversations: Record<string, ConversationSimulation[]> = {
  // CONCESIONARIOS
  concesionarios: [
    {
      id: "concesionarios-whatsapp",
      type: "whatsapp",
      title: "Consulta de Stock",
      description: "Cliente preguntando por disponibilidad de vehiculo",
      headerName: "Concesionario IA",
      headerStatus: "en linea",
      messages: [
        { text: "Hola! Tienen el nuevo Audi Q5 en stock?", isUser: true, time: "10:30" },
        { text: "Hola! Si, tenemos 3 unidades del Audi Q5 2024 disponibles. Tenemos en negro, blanco y gris. Le gustaria agendar un test drive?", isUser: false, time: "10:30" },
        { text: "Genial! El blanco me interesa. Pueden este sabado?", isUser: true, time: "10:31" },
        { text: "Perfecto! Tenemos hueco el sabado a las 10:00, 12:00 y 16:00. Cual le viene mejor?", isUser: false, time: "10:31" },
        { text: "A las 12:00 por favor", isUser: true, time: "10:32" },
        { text: "Reservado! Sabado a las 12:00 para test drive del Audi Q5 blanco. Le envio confirmacion por email. Necesita indicaciones para llegar?", isUser: false, time: "10:32" },
      ],
      stats: [
        { value: "<1s", label: "Respuesta" },
        { value: "24/7", label: "Disponible" },
        { value: "98%", label: "Satisfaccion" },
      ],
    },
    {
      id: "concesionarios-phone",
      type: "phone",
      title: "Llamada de Posventa",
      description: "Cliente llamando para revision",
      headerName: "Recepcion IA",
      messages: [
        { text: "Buenos dias, llamo para pedir cita para la revision de mi coche", isUser: true, time: "09:15" },
        { text: "Buenos dias! Por supuesto. Me puede indicar su matricula o nombre?", isUser: false, time: "09:15" },
        { text: "Si, es Juan Garcia, matricula 1234 ABC", isUser: true, time: "09:16" },
        { text: "Perfecto Sr. Garcia. Veo que su BMW X3 tiene la revision de los 30.000km pendiente. Tenemos hueco el martes a las 9:00. Le viene bien?", isUser: false, time: "09:16" },
        { text: "Si, perfecto", isUser: true, time: "09:17" },
        { text: "Reservado para el martes a las 9:00. Le enviamos recordatorio el dia antes. Algo mas en que pueda ayudarle?", isUser: false, time: "09:17" },
      ],
    },
  ],

  // CLINICAS
  clinicas: [
    {
      id: "clinicas-whatsapp",
      type: "whatsapp",
      title: "Reserva de Cita",
      description: "Paciente solicitando cita medica",
      headerName: "Clinica Dental IA",
      headerStatus: "en linea",
      messages: [
        { text: "Hola, necesito una cita con el dentista", isUser: true, time: "11:20" },
        { text: "Hola! Por supuesto. Es para revision, limpieza o tiene alguna urgencia?", isUser: false, time: "11:20" },
        { text: "Me duele una muela desde ayer", isUser: true, time: "11:21" },
        { text: "Entiendo, le damos prioridad. Tenemos hueco hoy a las 17:00 o manana a las 9:00. Cual prefiere?", isUser: false, time: "11:21" },
        { text: "Hoy a las 17:00 mejor", isUser: true, time: "11:22" },
        { text: "Perfecto! Cita confirmada hoy a las 17:00 con el Dr. Martinez. Traiga su tarjeta sanitaria. Le enviamos recordatorio 1 hora antes.", isUser: false, time: "11:22" },
      ],
      stats: [
        { value: "<30s", label: "Respuesta" },
        { value: "24/7", label: "Reservas" },
        { value: "95%", label: "Asistencia" },
      ],
    },
  ],

  // HOSPITALES
  hospitales: [
    {
      id: "hospitales-whatsapp",
      type: "whatsapp",
      title: "Consulta de Resultados",
      description: "Paciente preguntando por resultados",
      headerName: "Hospital IA",
      headerStatus: "en linea",
      messages: [
        { text: "Buenos dias, queria saber si ya estan mis resultados de analitica", isUser: true, time: "09:30" },
        { text: "Buenos dias! Para consultar sus resultados necesito verificar su identidad. Me indica su DNI?", isUser: false, time: "09:30" },
        { text: "Si, 12345678A", isUser: true, time: "09:31" },
        { text: "Gracias. Sus resultados de la analitica del dia 15 ya estan disponibles. Puede verlos en el portal del paciente o desea que le enviemos cita con su medico para comentarlos?", isUser: false, time: "09:31" },
        { text: "Prefiero cita con el medico", isUser: true, time: "09:32" },
        { text: "Perfecto. Tenemos hueco con el Dr. Fernandez el jueves a las 10:30 o viernes a las 16:00. Cual prefiere?", isUser: false, time: "09:32" },
      ],
    },
  ],

  // VETERINARIAS
  veterinarias: [
    {
      id: "veterinarias-whatsapp",
      type: "whatsapp",
      title: "Cita para Mascota",
      description: "Cliente pidiendo cita para su mascota",
      headerName: "Veterinaria IA",
      headerStatus: "en linea",
      messages: [
        { text: "Hola, necesito cita para vacunar a mi perro", isUser: true, time: "10:00" },
        { text: "Hola! Claro. Me indica el nombre de su mascota y que vacuna necesita?", isUser: false, time: "10:00" },
        { text: "Es Max, un labrador. Le toca la vacuna anual", isUser: true, time: "10:01" },
        { text: "Perfecto! Veo que Max tiene la polivalente pendiente. Tenemos hueco manana a las 11:00 o el jueves a las 17:30. Cual le viene mejor?", isUser: false, time: "10:01" },
        { text: "Manana a las 11:00", isUser: true, time: "10:02" },
        { text: "Reservado! Manana a las 11:00 vacunacion de Max. Traiga su cartilla de vacunacion. Le esperamos!", isUser: false, time: "10:02" },
      ],
    },
  ],

  // RESTAURANTES
  restaurantes: [
    {
      id: "restaurantes-whatsapp",
      type: "whatsapp",
      title: "Reserva de Mesa",
      description: "Cliente reservando para fin de semana",
      headerName: "Restaurante IA",
      headerStatus: "en linea",
      messages: [
        { text: "Hola! Tienen mesa para 4 el sabado?", isUser: true, time: "14:30" },
        { text: "Hola! Si, tenemos disponibilidad a las 14:00, 20:30 y 21:00. Cual prefiere?", isUser: false, time: "14:30" },
        { text: "A las 21:00 perfecto. Es posible terraza?", isUser: true, time: "14:31" },
        { text: "Si, tenemos mesa en terraza disponible a las 21:00. A nombre de quien hago la reserva?", isUser: false, time: "14:31" },
        { text: "Maria Lopez", isUser: true, time: "14:32" },
        { text: "Perfecto Sra. Lopez! Reserva confirmada: sabado 21:00, 4 personas, terraza. Le esperamos! Si tiene alguna intolerancia alimentaria, avisenos.", isUser: false, time: "14:32" },
      ],
      stats: [
        { value: "100%", label: "Confirmacion" },
        { value: "-80%", label: "No-shows" },
        { value: "24/7", label: "Reservas" },
      ],
    },
  ],

  // TURISMO (Hoteles)
  turismo: [
    {
      id: "turismo-whatsapp",
      type: "whatsapp",
      title: "Reserva de Hotel",
      description: "Cliente consultando disponibilidad",
      headerName: "Hotel IA",
      headerStatus: "en linea",
      messages: [
        { text: "Hola, tienen habitacion doble del 15 al 18 agosto?", isUser: true, time: "16:00" },
        { text: "Hola! Si, tenemos disponibilidad. Tenemos habitacion estandar (89eur/noche) y con vista al mar (119eur/noche). Cual prefiere?", isUser: false, time: "16:00" },
        { text: "La de vista al mar. Incluye desayuno?", isUser: true, time: "16:01" },
        { text: "El desayuno buffet es opcional por 15eur/persona/dia. Desea anadirlo a la reserva?", isUser: false, time: "16:01" },
        { text: "Si, con desayuno para 2 personas", isUser: true, time: "16:02" },
        { text: "Perfecto! Reserva confirmada: 15-18 agosto, hab. doble vista mar con desayuno x2. Total: 447eur. Le enviamos confirmacion por email. Alguna peticion especial?", isUser: false, time: "16:02" },
      ],
    },
  ],

  // RETAIL
  retail: [
    {
      id: "retail-whatsapp",
      type: "whatsapp",
      title: "Consulta de Producto",
      description: "Cliente preguntando por disponibilidad",
      headerName: "Tienda IA",
      headerStatus: "en linea",
      messages: [
        { text: "Hola, este vestido esta disponible en talla M?", isUser: true, time: "12:15" },
        { text: "Hola! Si, tenemos el vestido disponible en talla M y L. Lo tenemos en tienda fisica y online. Se lo anadimos al carrito?", isUser: false, time: "12:15" },
        { text: "Si, la M. Cuanto tarda el envio?", isUser: true, time: "12:16" },
        { text: "El envio estandar tarda 2-3 dias (gratis en pedidos +50eur). El express llega manana por 4.99eur. Cual prefiere?", isUser: false, time: "12:16" },
        { text: "Express por favor", isUser: true, time: "12:17" },
        { text: "Perfecto! Vestido talla M con envio express anadido al carrito. Total: 44.99eur. Le envio link para finalizar la compra?", isUser: false, time: "12:17" },
      ],
    },
  ],

  // OFICINAS
  oficinas: [
    {
      id: "oficinas-whatsapp",
      type: "whatsapp",
      title: "Reserva de Sala",
      description: "Cliente reservando sala de reuniones",
      headerName: "Coworking IA",
      headerStatus: "en linea",
      messages: [
        { text: "Buenos dias, tienen sala de reuniones disponible para 8 personas?", isUser: true, time: "09:00" },
        { text: "Buenos dias! Si, la Sala A tiene capacidad para 10 personas. Para que fecha y horario la necesita?", isUser: false, time: "09:00" },
        { text: "Hoy de 14:00 a 17:00", isUser: true, time: "09:01" },
        { text: "Perfecto, la Sala A esta libre de 14:00 a 17:00. Incluye pantalla, videoconferencia y pizarra. Son 45eur/hora. La reservo?", isUser: false, time: "09:01" },
        { text: "Si, por favor. A nombre de Empresa ABC", isUser: true, time: "09:02" },
        { text: "Reservado! Sala A, hoy 14:00-17:00, Empresa ABC. Total: 135eur. Le envio acceso al edificio y codigo WiFi por email.", isUser: false, time: "09:02" },
      ],
    },
  ],

  // ALMACENES / LOGISTICA
  almacenes: [
    {
      id: "almacenes-whatsapp",
      type: "whatsapp",
      title: "Seguimiento de Envio",
      description: "Cliente consultando estado de pedido",
      headerName: "Logistica IA",
      headerStatus: "en linea",
      messages: [
        { text: "Hola, donde esta mi envio REF-8832?", isUser: true, time: "11:00" },
        { text: "Hola! Deje que consulte... Su envio REF-8832 esta actualmente en el centro de distribucion de Madrid. Salio del almacen esta manana.", isUser: false, time: "11:00" },
        { text: "Cuando me llega?", isUser: true, time: "11:01" },
        { text: "La entrega estimada es manana entre las 9:00 y 14:00. Le enviare notificacion cuando el repartidor este de camino. Estara alguien para recibirlo?", isUser: false, time: "11:01" },
        { text: "Si, perfecto. Gracias!", isUser: true, time: "11:02" },
        { text: "De nada! Si necesita modificar la direccion o franja horaria, aviseme. Buen dia!", isUser: false, time: "11:02" },
      ],
    },
  ],

  // SERVICIOS TECNICOS
  "servicios-tecnicos": [
    {
      id: "servicios-tecnicos-whatsapp",
      type: "whatsapp",
      title: "Averia Urgente",
      description: "Cliente reportando problema tecnico",
      headerName: "SAT IA",
      headerStatus: "en linea",
      messages: [
        { text: "Hola, mi caldera no enciende!", isUser: true, time: "08:30" },
        { text: "Buenos dias! Entiendo, es una urgencia. Me puede confirmar: tiene luz en el display de la caldera? Y su direccion?", isUser: false, time: "08:30" },
        { text: "No tiene luz ninguna. Estoy en Calle Mayor 15, Madrid", isUser: true, time: "08:31" },
        { text: "Gracias. Puede ser el fusible o la placa. Tenemos un tecnico disponible para hoy entre 12:00 y 14:00. El desplazamiento son 35eur. Lo confirmo?", isUser: false, time: "08:31" },
        { text: "Si, confirmo. Gracias!", isUser: true, time: "08:32" },
        { text: "Perfecto! Tecnico confirmado para hoy 12:00-14:00 en Calle Mayor 15. Le llamara 30 min antes de llegar. Algo mas?", isUser: false, time: "08:32" },
      ],
    },
  ],

  // PELUQUERIAS / CENTROS DE BELLEZA
  peluquerias: [
    {
      id: "peluquerias-whatsapp",
      type: "whatsapp",
      title: "Cita de Belleza",
      description: "Cliente reservando servicios",
      headerName: "Salon IA",
      headerStatus: "en linea",
      messages: [
        { text: "Hola! Tienen hueco para tinte y corte el viernes?", isUser: true, time: "15:00" },
        { text: "Hola! Si, tenemos hueco el viernes a las 10:00 con Maria o a las 16:30 con Ana. Cual prefiere?", isUser: false, time: "15:00" },
        { text: "A las 10:00 con Maria", isUser: true, time: "15:01" },
        { text: "Perfecto! Es primera vez o ya ha venido antes? Necesito saber para preparar el tinte.", isUser: false, time: "15:01" },
        { text: "Ya he ido, soy Laura Martinez", isUser: true, time: "15:02" },
        { text: "Laura! Ya veo su ficha. Tinte castano medio como siempre? Reservado viernes 10:00 con Maria: tinte + corte. Duracion aprox: 2h. La esperamos!", isUser: false, time: "15:02" },
      ],
    },
  ],

  // GIMNASIOS
  gimnasios: [
    {
      id: "gimnasios-whatsapp",
      type: "whatsapp",
      title: "Reserva de Clase",
      description: "Socio reservando actividad",
      headerName: "Gimnasio IA",
      headerStatus: "en linea",
      messages: [
        { text: "A que hora es la clase de yoga manana?", isUser: true, time: "20:00" },
        { text: "Hola! Manana hay yoga a las 8:00 (sala 1) y a las 19:00 (sala 2). Quedan 3 plazas en la de las 8:00 y 5 en la de las 19:00. Le reservo plaza?", isUser: false, time: "20:00" },
        { text: "Si, a las 19:00 por favor", isUser: true, time: "20:01" },
        { text: "Perfecto! Me indica su numero de socio o nombre?", isUser: false, time: "20:01" },
        { text: "Carlos Ruiz, socio 4521", isUser: true, time: "20:02" },
        { text: "Reservado Carlos! Yoga manana a las 19:00, sala 2. Recuerde traer su esterilla. Le envio recordatorio 1h antes. Namaste!", isUser: false, time: "20:02" },
      ],
    },
  ],

  // EDUCACION
  educacion: [
    {
      id: "educacion-whatsapp",
      type: "whatsapp",
      title: "Consulta de Inscripcion",
      description: "Padre preguntando por matricula",
      headerName: "Colegio IA",
      headerStatus: "en linea",
      messages: [
        { text: "Hola, cuando empiezan las inscripciones para el proximo curso?", isUser: true, time: "10:30" },
        { text: "Buenos dias! El periodo de inscripcion para el curso 2025-2026 abre el 1 de marzo. Desea que le reserve plaza o le enviemos informacion?", isUser: false, time: "10:30" },
        { text: "Me gustaria reservar plaza para mi hijo de 6 anos", isUser: true, time: "10:31" },
        { text: "Perfecto! Para 1o de Primaria. Necesitamos: formulario de preinscripcion + fotocopia DNI + certificado empadronamiento. Desea agendar visita al centro?", isUser: false, time: "10:31" },
        { text: "Si, cuando podria ser?", isUser: true, time: "10:32" },
        { text: "Tenemos jornada de puertas abiertas el sabado 15 a las 10:00, o visita privada entre semana. Cual prefiere?", isUser: false, time: "10:32" },
      ],
    },
  ],

  // DENTISTAS (use same as clinicas)
  dentistas: [
    {
      id: "dentistas-whatsapp",
      type: "whatsapp",
      title: "Urgencia Dental",
      description: "Paciente con dolor de muelas",
      headerName: "Clinica Dental IA",
      headerStatus: "en linea",
      messages: [
        { text: "Hola, me duele mucho una muela, tienen hueco urgente?", isUser: true, time: "09:00" },
        { text: "Buenos dias! Lamento que tenga dolor. Tenemos hueco de urgencia hoy a las 11:30. Le viene bien?", isUser: false, time: "09:00" },
        { text: "Si, perfecto!", isUser: true, time: "09:01" },
        { text: "Reservado! Cita urgente hoy a las 11:30 con el Dr. Garcia. Traiga su tarjeta sanitaria si es asegurado. Le enviamos ubicacion.", isUser: false, time: "09:01" },
        { text: "Gracias! Alli estare", isUser: true, time: "09:02" },
        { text: "De nada! Si el dolor es muy intenso, puede tomar paracetamol hasta la cita. Animo y nos vemos en 2 horas!", isUser: false, time: "09:02" },
      ],
      stats: [
        { value: "<1min", label: "Respuesta" },
        { value: "24/7", label: "Urgencias" },
        { value: "-80%", label: "No-shows" },
      ],
    },
  ],

  // INMOBILIARIAS
  inmobiliarias: [
    {
      id: "inmobiliarias-whatsapp",
      type: "whatsapp",
      title: "Busqueda de Piso",
      description: "Cliente buscando vivienda",
      headerName: "Inmobiliaria IA",
      headerStatus: "en linea",
      messages: [
        { text: "Hola, busco un piso de 3 habitaciones en Valencia", isUser: true, time: "11:00" },
        { text: "Hola! Perfecto. Me indica su presupuesto maximo y si prefiere alquiler o compra?", isUser: false, time: "11:00" },
        { text: "Compra, hasta 250.000eur", isUser: true, time: "11:01" },
        { text: "Tenemos 5 opciones que encajan en su busqueda. Zona centro, Ruzafa o Benimaclet? Y parking es imprescindible?", isUser: false, time: "11:01" },
        { text: "Ruzafa si es posible, con parking", isUser: true, time: "11:02" },
        { text: "Tenemos 2 pisos en Ruzafa con parking: uno de 95m2 (235.000eur) y otro de 110m2 (248.000eur). Cuando podria hacer una visita? Tenemos hueco manana a las 17:00.", isUser: false, time: "11:02" },
      ],
    },
  ],
}

// ============================================
// SERVICE CONVERSATIONS
// ============================================

export const serviceConversations: Record<string, ConversationSimulation[]> = {
  // ATENCION TELEFONICA IA
  "atencion-telefonica-ia": [
    {
      id: "telefonica-phone",
      type: "phone",
      title: "Recepcion IA 24/7",
      description: "Agente de voz atendiendo llamada fuera de horario",
      headerName: "Recepcionista IA",
      messages: [
        { text: "Hola, buenos dias. Llamaba para hacer una consulta", isUser: true, time: "22:30" },
        { text: "Buenas noches! Gracias por llamar a StaffDigital. Aunque estamos fuera de horario, puedo ayudarle. En que puedo asistirle?", isUser: false, time: "22:30" },
        { text: "Queria informacion sobre sus servicios de IA", isUser: true, time: "22:31" },
        { text: "Por supuesto! Ofrecemos chatbots, agentes de voz y automatizacion. Puedo enviarle informacion por email o agendar una llamada con un especialista para manana. Que prefiere?", isUser: false, time: "22:31" },
        { text: "Una llamada manana estaria bien", isUser: true, time: "22:32" },
        { text: "Perfecto! Tenemos hueco a las 10:00 o 16:00. Me indica su email y nombre para confirmar la cita?", isUser: false, time: "22:32" },
      ],
      stats: [
        { value: "24/7", label: "Disponible" },
        { value: "100%", label: "Llamadas" },
        { value: "0", label: "Perdidas" },
      ],
    },
    {
      id: "telefonica-whatsapp",
      type: "whatsapp",
      title: "WhatsApp con Voz",
      description: "Audio mensaje respondido con IA",
      headerName: "Asistente IA",
      headerStatus: "en linea",
      messages: [
        { text: "[Nota de voz: 0:15] Hola, queria preguntar por el precio de vuestros servicios...", isUser: true, time: "14:00" },
        { text: "Hola! He escuchado su mensaje. Nuestros planes empiezan desde 99eur/mes para PYMEs. Incluye chatbot web + WhatsApp. Quiere que le envie el catalogo completo?", isUser: false, time: "14:00" },
        { text: "[Nota de voz: 0:08] Si, por favor, y si tienen demo", isUser: true, time: "14:01" },
        { text: "Perfecto! Le envio el catalogo ahora. Para la demo, tenemos sesiones los martes y jueves a las 11:00. Le reservo plaza?", isUser: false, time: "14:01" },
      ],
    },
  ],

  // IA CONVERSACIONAL
  "ia-conversacional": [
    {
      id: "conversacional-chat",
      type: "chat",
      title: "Chat Web Inteligente",
      description: "Chatbot cualificando visitante",
      headerName: "Asistente Virtual",
      headerStatus: "Activo",
      messages: [
        { text: "Hola! Estoy buscando informacion sobre vuestros servicios", isUser: true, time: "15:20" },
        { text: "Hola! Encantado de ayudarte. Que tipo de servicio te interesa: automatizacion de atencion al cliente, cualificacion de leads o gestion de citas?", isUser: false, time: "15:20" },
        { text: "Atencion al cliente, tenemos muchas consultas repetitivas", isUser: true, time: "15:21" },
        { text: "Entiendo! Con nuestro chatbot IA puedes automatizar hasta el 80% de consultas frecuentes. Cuantas consultas recibis al mes aproximadamente?", isUser: false, time: "15:21" },
        { text: "Unas 500-600 al mes", isUser: true, time: "15:22" },
        { text: "Perfecto, con ese volumen el ROI es muy rapido. Puedo agendar una demo personalizada para mostrate casos similares. Te viene bien esta semana?", isUser: false, time: "15:22" },
      ],
      stats: [
        { value: "80%", label: "Automatizado" },
        { value: "3s", label: "Respuesta" },
        { value: "+40%", label: "Conversion" },
      ],
    },
  ],

  // AUTOMATIZACION OMNICANAL
  "automatizacion-omnicanal": [
    {
      id: "omnicanal-whatsapp",
      type: "whatsapp",
      title: "Bandeja Unificada",
      description: "Gestion de multiples canales",
      headerName: "Centro IA",
      headerStatus: "3 canales activos",
      messages: [
        { text: "[Via Instagram] Hola! Vi vuestro producto en stories, tienen disponible?", isUser: true, time: "10:00" },
        { text: "Hola! Si, tenemos stock. Te paso el link para comprar o prefieres reservarlo?", isUser: false, time: "10:00" },
        { text: "[Via Web Chat] Hola, hice un pedido ayer, cuando llega?", isUser: true, time: "10:01" },
        { text: "Hola! Me indicas tu numero de pedido para verificar el estado?", isUser: false, time: "10:01" },
        { text: "[Via WhatsApp] Necesito cambiar la direccion de entrega", isUser: true, time: "10:02" },
        { text: "Por supuesto! Me confirmas el numero de pedido y la nueva direccion?", isUser: false, time: "10:02" },
      ],
    },
  ],

  // GESTION DE CITAS
  "gestion-citas-ia": [
    {
      id: "citas-whatsapp",
      type: "whatsapp",
      title: "Reservas Automaticas",
      description: "Sistema de citas inteligente",
      headerName: "Agenda IA",
      headerStatus: "en linea",
      messages: [
        { text: "Hola, necesito cancelar mi cita de manana", isUser: true, time: "18:00" },
        { text: "Hola! Sin problema. Veo tu cita para manana a las 10:00. Quieres cancelarla completamente o reprogramarla?", isUser: false, time: "18:00" },
        { text: "Reprogramarla si puede ser", isUser: true, time: "18:01" },
        { text: "Claro! Tenemos hueco el jueves a las 11:00, 15:00 o viernes a las 9:00. Cual te viene mejor?", isUser: false, time: "18:01" },
        { text: "Jueves a las 15:00", isUser: true, time: "18:02" },
        { text: "Listo! Tu cita ha sido reprogramada para el jueves a las 15:00. Te enviare recordatorio el dia antes. Algo mas?", isUser: false, time: "18:02" },
      ],
      stats: [
        { value: "-60%", label: "No-shows" },
        { value: "24/7", label: "Reservas" },
        { value: "100%", label: "Sincronizado" },
      ],
    },
  ],

  // CUALIFICACION DE LEADS
  "cualificacion-leads": [
    {
      id: "leads-chat",
      type: "chat",
      title: "Scoring Automatico",
      description: "IA cualificando prospecto",
      headerName: "Sales IA",
      headerStatus: "Activo",
      messages: [
        { text: "Hola, me interesa vuestra solucion", isUser: true, time: "11:30" },
        { text: "Hola! Genial. Para recomendarte la mejor opcion, me cuentas a que se dedica tu empresa y cuantos empleados sois?", isUser: false, time: "11:30" },
        { text: "Somos una clinica dental con 15 empleados", isUser: true, time: "11:31" },
        { text: "Perfecto! Las clinicas son uno de nuestros casos de exito. Cuantas llamadas/consultas gestionais al dia aproximadamente?", isUser: false, time: "11:31" },
        { text: "Unas 50 llamadas y 30 WhatsApps", isUser: true, time: "11:32" },
        { text: "[Lead Score: 85/100 - Hot Lead] Excelente perfil! Con ese volumen, podemos automatizar el 70% y liberar a tu equipo. Te paso con un especialista en clinicas?", isUser: false, time: "11:32" },
      ],
    },
  ],

  // SEGURIDAD IA
  "seguridad-ia": [
    {
      id: "seguridad-phone",
      type: "phone",
      title: "Alerta de Seguridad",
      description: "Sistema detectando incidencia",
      headerName: "Central IA",
      messages: [
        { text: "[Sistema] Movimiento detectado en zona 3 - almacen trasero", isUser: false, time: "03:15" },
        { text: "[Sistema] Analizando grabacion... Persona no identificada detectada", isUser: false, time: "03:15" },
        { text: "[Llamada automatica al propietario]", isUser: false, time: "03:16" },
        { text: "Hola? Quien es?", isUser: true, time: "03:16" },
        { text: "Sr. Garcia, soy el sistema de seguridad IA de su negocio. Hemos detectado movimiento sospechoso en el almacen. Desea que contacte a la policia o es movimiento autorizado?", isUser: false, time: "03:16" },
        { text: "No es autorizado, llame a la policia!", isUser: true, time: "03:17" },
        { text: "Entendido. Contactando policia ahora. Le envio video por WhatsApp. Mantengase informado.", isUser: false, time: "03:17" },
      ],
    },
  ],

  // HOME STAGING IA
  "home-staging-ia": [
    {
      id: "homestaging-whatsapp",
      type: "whatsapp",
      title: "Consulta Inmobiliaria",
      description: "Agente virtual de inmobiliaria",
      headerName: "Home Staging IA",
      headerStatus: "en linea",
      messages: [
        { text: "Hola, vi el piso de la calle Mayor. Esta disponible?", isUser: true, time: "16:00" },
        { text: "Hola! Si, el piso de Calle Mayor 25 sigue disponible. Son 3 habitaciones, 95m2, reformado. Te interesa agendar visita?", isUser: false, time: "16:00" },
        { text: "Si, pero me gustaria ver mas fotos primero", isUser: true, time: "16:01" },
        { text: "Claro! Te envio tour virtual 360 y galeria completa con el home staging. [Link] Tambien tenemos video drone del edificio y zona.", isUser: false, time: "16:01" },
        { text: "Wow, se ve muy bien! Podemos ver el sabado?", isUser: true, time: "16:02" },
        { text: "Perfecto! El sabado tenemos hueco a las 10:00 y 12:00. Cual prefieres? Necesito tu nombre y telefono para confirmar.", isUser: false, time: "16:02" },
      ],
    },
  ],

  // ANALISIS DOCUMENTAL
  "analisis-documental-ia": [
    {
      id: "documental-chat",
      type: "chat",
      title: "Procesamiento de Documentos",
      description: "IA analizando contratos",
      headerName: "Doc IA",
      headerStatus: "Procesando",
      messages: [
        { text: "[Documento subido: Contrato_proveedor.pdf]", isUser: true, time: "09:00" },
        { text: "Documento recibido. Analizando contrato de 15 paginas... Listo! He encontrado: 3 clausulas de riesgo, fecha vencimiento 30/06/2025, penalizacion por incumplimiento 5%.", isUser: false, time: "09:00" },
        { text: "Cuales son las clausulas de riesgo?", isUser: true, time: "09:01" },
        { text: "1) Clausula 8.3: Renovacion automatica si no se notifica 60 dias antes. 2) Clausula 12.1: Exclusividad territorial limitada. 3) Clausula 15.2: Arbitraje obligatorio en Barcelona.", isUser: false, time: "09:01" },
        { text: "Comparalo con nuestro contrato estandar", isUser: true, time: "09:02" },
        { text: "Comparando... Tu contrato estandar tiene clausulas mas favorables en arbitraje (Madrid) y penalizacion (3%). Recomiendo renegociar clausulas 12.1 y 15.2.", isUser: false, time: "09:02" },
      ],
    },
  ],
}

// ============================================
// HELPER FUNCTIONS
// ============================================

export function getConversationsForSector(sectorSlug: string): ConversationSimulation[] {
  return sectorConversations[sectorSlug] || []
}

export function getConversationsForService(serviceSlug: string): ConversationSimulation[] {
  return serviceConversations[serviceSlug] || []
}

export function getDefaultConversations(): ConversationSimulation[] {
  return [
    sectorConversations.concesionarios[0],
    sectorConversations.clinicas[0],
    sectorConversations.restaurantes[0],
  ]
}
