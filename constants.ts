
import { Property, Testimonial, Service } from './types';

export const CONTACT_INFO = {
  phone: "+1 437 776 8395",
  whatsapp: "14377768395",
  email: "contacto@chefinmobiliario.mx",
  brand: "EL CHEF INMOBILIARIO",
  instagram: "https://instagram.com/elchefinmobiliario",
  linkedin: "https://linkedin.com/in/miguelangelperezcook",
  calendly: ""
};

// ─── HISTORIA DE MIGUEL ──────────────────────────────────────────────────────
export const HISTORIA_MIGUEL = {
  es: {
    supertitle: "De la Cocina al Capital",
    title: "Por qué confiar en el Chef Inmobiliario",
    body: "Soy Miguel Angel Pérez. Nací en México, construí mi carrera en Toronto, y llevo más de 15 años ayudando a personas a tomar decisiones financieras que cambian su vida.",
    body2: "Pasé por la cocina profesional, los seguros, Tecnocasa, y hoy estoy en el mundo que más me apasiona: el inmobiliario. Sé lo que es trabajar duro en Canadá y querer que ese dinero trabaje aún más duro en México.",
    body3: "Entiendo ambos mundos, ambas culturas y ambos mercados. Eso me convierte en tu mejor aliado.",
    credenciales: [
      { icon: "🍳", text: "Chef profesional graduado — disciplina, precisión y pasión" },
      { icon: "🏙️", text: "Vivo en Toronto — entiendo el mercado canadiense desde adentro" },
      { icon: "🏠", text: "15+ años en ventas inmobiliarias y seguros en Canadá y México" },
      { icon: "🤝", text: "Ex-asesor Tecnocasa — formado con los mejores del sector" },
      { icon: "🌎", text: "Red activa de desarrolladores en Mérida, Riviera Maya y Yucalpetén" },
      { icon: "💬", text: "Asesoría completa en español e inglés, sin intermediarios" },
    ]
  },
  en: {
    supertitle: "From Kitchen to Capital",
    title: "Why Trust The Real Estate Chef",
    body: "I'm Miguel Angel Pérez. Born in Mexico, built my career in Toronto, and for over 15 years I've been helping people make financial decisions that change their lives.",
    body2: "I went through professional cooking, insurance, Tecnocasa, and now I'm in the world that truly drives me: real estate. I know what it means to work hard in Canada and want that money to work even harder back in Mexico.",
    body3: "I understand both worlds, both cultures, both markets. That makes me your best ally.",
    credenciales: [
      { icon: "🍳", text: "Professional chef graduate — discipline, precision and passion" },
      { icon: "🏙️", text: "Based in Toronto — I understand the Canadian market from the inside" },
      { icon: "🏠", text: "15+ years in real estate sales and insurance in Canada and Mexico" },
      { icon: "🤝", text: "Former Tecnocasa advisor — trained with the best in the industry" },
      { icon: "🌎", text: "Active network of developers in Mérida, Riviera Maya and Yucalpetén" },
      { icon: "💬", text: "Full advisory in Spanish and English, no intermediaries" },
    ]
  }
};

// ─── VENTAJAS / BENEFICIOS ────────────────────────────────────────────────────
export const VENTAJAS = [
  {
    titulo: "Modelo Fractional",
    desc: "Invierte en lujo sin comprar el 100%. Adquieres una fracción de una propiedad premium con menor inversión inicial, administración profesional incluida y diversificación inteligente.",
    icono: "Award"
  },
  {
    titulo: "Binacional por Naturaleza",
    desc: "Entiendo el dinero canadiense y el mercado mexicano. Te asesoro en ambos idiomas con una sola persona de confianza.",
    icono: "Globe"
  },
  {
    titulo: "Mercados de Alto Potencial",
    desc: "Mérida, Riviera Maya y el Puerto de Progreso son las zonas con mayor plusvalía de México. Llegamos antes que todos.",
    icono: "BarChart"
  },
  {
    titulo: "Acompañamiento Total",
    desc: "Desde la selección con análisis de rentabilidad real hasta la escritura firmada, con estrategias para renta vacacional.",
    icono: "ShieldCheck"
  }
];

// ─── POR QUÉ INVERTIR EN MÉXICO ──────────────────────────────────────────────
export const RAZONES_MEXICO = {
  es: {
    supertitle: "Por qué México",
    title: "El mejor momento para invertir ya llegó",
    subtitle: "Mientras otros esperan, los inversionistas inteligentes ya están dentro.",
    razones: [
      {
        zona: "Mérida, Yucatán",
        icon: "🏛️",
        titulo: "La ciudad más segura de México",
        desc: "Crecimiento sostenido, inversión extranjera récord y calidad de vida sin igual. Mérida es el secreto mejor guardado del mercado inmobiliario latinoamericano.",
        stat: "+12% plusvalía anual"
      },
      {
        zona: "Yucalpetén, Progreso",
        icon: "⚓",
        titulo: "El nuevo polo náutico de México",
        desc: "El puerto de aguas profundas más cercano a Miami. Con la expansión del Puerto de Progreso y el Marina Yucalpetén, esta zona está a punto de explotar en valor.",
        stat: "Puerto en expansión masiva"
      },
      {
        zona: "Riviera Maya",
        icon: "🌊",
        titulo: "Turismo de clase mundial",
        desc: "Cancún, Tulum y Playa del Carmen generan millones de visitantes al año. Propiedades frente al mar con retorno de renta vacacional del 8-12% anual.",
        stat: "8-12% ROI en renta vacacional"
      }
    ]
  },
  en: {
    supertitle: "Why Mexico",
    title: "The best time to invest is now",
    subtitle: "While others wait, smart investors are already in.",
    razones: [
      {
        zona: "Mérida, Yucatán",
        icon: "🏛️",
        titulo: "Mexico's Safest City",
        desc: "Sustained growth, record foreign investment and unmatched quality of life. Mérida is the best-kept secret of the Latin American real estate market.",
        stat: "+12% annual appreciation"
      },
      {
        zona: "Yucalpetén, Progreso",
        icon: "⚓",
        titulo: "Mexico's New Nautical Hub",
        desc: "The deepwater port closest to Miami. With the expansion of Puerto Progreso and Marina Yucalpetén, this area is about to explode in value.",
        stat: "Major port expansion underway"
      },
      {
        zona: "Riviera Maya",
        icon: "🌊",
        titulo: "World-Class Tourism",
        desc: "Cancún, Tulum and Playa del Carmen attract millions of visitors per year. Beachfront properties with vacation rental returns of 8-12% annually.",
        stat: "8-12% vacation rental ROI"
      }
    ]
  }
};

// ─── PROPIEDADES (Catálogo de Inversión) ──────────────────────────────────────
export const PROPIEDADES: Property[] = [
  {
    id: 1,
    titulo: "Yucalpetén Resort Marina",
    operacion: "Venta",
    tipo: "Departamento",
    zona: "Yucalpetén, Progreso",
    precio: 2850000,
    recamaras: 2,
    banos: 2,
    metros: 98,
    estacionamientos: 1,
    tag: "Fractional Disponible",
    descripcion: "El nuevo epicentro de lujo frente al mar en Yucatán. Marina privada, amenidades nivel resort y alta plusvalía.",
    caracteristicas: ["Marina Privada", "Nivel Resort", "Modelo Fractional", "Alta Plusvalía"],
    img: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&q=90&w=1200"
  },
  {
    id: 2,
    titulo: "Acceso a Oportunidades",
    operacion: "Venta",
    tipo: "Departamento",
    zona: "Riviera Maya / Mérida",
    precio: 3200000,
    recamaras: 1,
    banos: 1,
    metros: 72,
    estacionamientos: 1,
    tag: "Preventas Exclusivas",
    descripcion: "Proyectos internacionales y opciones exclusivas fuera de mercado. Diversifica tu capital en moneda fuerte.",
    caracteristicas: ["Opciones Exclusivas", "Ticket en Dólares", "Plusvalía", "Acompañamiento Legal"],
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=90&w=1200"
  },
  {
    id: 3,
    titulo: "Playa del Carmen Luxury",
    operacion: "Venta",
    tipo: "Estudio",
    zona: "Playa del Carmen, Centro",
    precio: 1950000,
    recamaras: 1,
    banos: 1,
    metros: 45,
    estacionamientos: 1,
    tag: "Fractional / ROI Elevado",
    descripcion: "Estudios y departamentos en el corazón de Playa. Perfectos para renta vacacional y flujo de efectivo.",
    caracteristicas: ["Cerca de 5a Av.", "Rooftop Pool", "Flujo de Efectivo", "Administración Pro"],
    img: "https://images.unsplash.com/photo-1613553507447-557ff688f8ca?auto=format&fit=crop&q=90&w=1200"
  },
  {
    id: 4,
    titulo: "Tulum Selva Maya",
    operacion: "Venta",
    tipo: "Penthouse",
    zona: "Tulum, Aldea Zama",
    precio: 4100000,
    recamaras: 3,
    banos: 3,
    metros: 160,
    estacionamientos: 2,
    tag: "Entrega Inmediata",
    descripcion: "Penthouse con alberca privada inmerso en la selva. Diseño biofílico y alta demanda turística.",
    caracteristicas: ["Alberca Privada", "Diseño Biofílico", "Zona Premium", "Seguridad 24/7"],
    img: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&q=90&w=1200"
  },
  {
    id: 5,
    titulo: "Residencial en Mérida",
    operacion: "Venta",
    tipo: "Casa",
    zona: "Mérida, Norte",
    precio: 5500000,
    recamaras: 4,
    banos: 4,
    metros: 280,
    estacionamientos: 3,
    tag: "Plusvalía Garantizada",
    descripcion: "Casas residenciales en la zona de mayor crecimiento de Mérida. Seguridad, paz y patrimonio sólido.",
    caracteristicas: ["Zona Norte", "Club House", "Seguridad 24/7", "Alta Plusvalía"],
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=90&w=1200"
  },
  {
    id: 6,
    titulo: "Puerto Progreso Mar",
    operacion: "Venta",
    tipo: "Departamento",
    zona: "Progreso, Malecón",
    precio: 2900000,
    recamaras: 3,
    banos: 2,
    metros: 110,
    estacionamientos: 2,
    tag: "Frente al Mar",
    descripcion: "Departamentos con vista espectacular al Golfo de México. Cerca del nuevo puerto y amenidades.",
    caracteristicas: ["Vista al Mar", "Malecón", "Inversión Segura", "Terraza"],
    img: "https://images.unsplash.com/photo-1520454125516-134a66d6bd78?auto=format&fit=crop&q=90&w=1200"
  }
];

// ─── TESTIMONIOS ─────────────────────────────────────────────────────────────
export const TESTIMONIOS: Testimonial[] = [
  {
    id: 1,
    nombre: "Carlos Hernández",
    rol: "Inversionista • Toronto, Canadá",
    foto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=90&w=400",
    cita: "Miguel me explicó el modelo fractional en términos tan claros que me animé a invertir en Yucalpetén desde Toronto. Hoy tengo un activo que genera plusvalía mientras yo sigo trabajando en Canadá.",
    estrellas: 5
  },
  {
    id: 2,
    nombre: "Sandra Orozco",
    rol: "Empresaria • Guadalajara → Riviera Maya",
    foto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=90&w=400",
    cita: "No es un agente más. Miguel tiene calidez humana y un conocimiento real del mercado. La compra de nuestra casa en Playa del Carmen fue completamente transparente y sin estrés.",
    estrellas: 5
  },
  {
    id: 3,
    nombre: "Roberto Fuentes",
    rol: "Ingeniero • Monterrey → Mérida",
    foto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=90&w=400",
    cita: "Buscaba invertir en Mérida pero no conocía el mercado. Miguel me guió desde la primera ligada hasta la firma en notaría. Profesional, honesto y siempre disponible.",
    estrellas: 5
  }
];

// ─── SERVICIOS ────────────────────────────────────────────────────────────────
export const SERVICIOS: Service[] = [
  {
    id: 1,
    titulo: "Asesoría de Inversión",
    icono: "🏠",
    descripcion: "Te ayudo a encontrar la propiedad correcta para tu perfil y presupuesto."
  },
  {
    id: 2,
    titulo: "Modelo Fractional",
    icono: "📈",
    descripcion: "Inversión en propiedades de lujo con tickets accesibles desde Canadá."
  },
  {
    id: 3,
    titulo: "Acompañamiento Total",
    icono: "🤝",
    descripcion: "Desde la búsqueda hasta la escritura. En español e inglés."
  }
];

// ─── TRADUCCIONES ─────────────────────────────────────────────────────────────
export const TRANSLATIONS = {
  es: {
    nav_home: "Inicio",
    nav_properties: "Proyectos",
    nav_sell: "¿Por qué México?",
    nav_contact: "Contacto",
    nav_concierge: "Mi Historia",
    nav_cta: "WHATSAPP",
    lang_toggle: "EN",
    hero_supertitle: "ASESOR INMOBILIARIO BINACIONAL",
    hero_title: "Invierte en México",
    hero_subtitle: "mientras vives en Canadá",
    hero_desc: "Convierte tu ingreso en dólares en patrimonio en México. Sin complicaciones. Sin improvisaciones. Te acompaño en todo el proceso con selección de proyectos, análisis de rentabilidad real y asesoría legal en español.",
    hero_cta_primary: "Agenda tu asesoría gratuita",
    hero_cta_secondary: "Ver proyectos",
    hero_badge: "Flujo de Efectivo · Plusvalía · Seguridad Jurídica",
    section_why_title: "¿Qué ofrece el Chef Inmobiliario?",
    section_why_sub: "No vendo propiedades. Te ayudo a construir patrimonio desde Canadá.",
    catalog_supertitle: "Proyectos Seleccionados",
    catalog_title: "Portafolio de Inversión",
    search_placeholder: "Busca por zona o tipo de propiedad...",
    filter_ai_placeholder: "Describe tu inversión ideal...",
    specs_rooms: "Recámaras",
    specs_baths: "Baños",
    specs_meters: "Metros²",
    specs_parking: "Estacionamiento",
    card_details: "Ver Detalles",
    modal_request_btn: "Solicitar información",
    cta_final_supertitle: "¿Listo para invertir?",
    cta_final_title: "Agenda tu llamada estratégica",
    cta_final_sub: "Revisemos qué proyecto se adapta a tu perfil. 30 minutos, sin costo.",
    form_name: "Tu nombre",
    form_email: "Tu correo electrónico",
    form_zona: "¿Qué zona te interesa?",
    form_zona_merida: "Mérida, Yucatán",
    form_zona_riviera: "Riviera Maya",
    form_zona_progreso: "Puerto Progreso / Yucalpetén",
    form_zona_otro: "Ayúdame a decidir",
    form_submit: "Quiero mi asesoría gratuita",
    form_whatsapp: "O escríbeme por WhatsApp",
    footer_tagline: "El puente entre Canadá y las mejores inversiones en México.",
    footer_rights: "© 2027 Miguel Angel Pérez • El Chef Inmobiliario"
  },
  en: {
    nav_home: "Home",
    nav_properties: "Projects",
    nav_sell: "Why Mexico?",
    nav_contact: "Contact",
    nav_concierge: "My Story",
    nav_cta: "WHATSAPP",
    lang_toggle: "ES",
    hero_supertitle: "BINATIONAL REAL ESTATE ADVISOR",
    hero_title: "Invest in Mexico's best beaches and cities",
    hero_subtitle: "with personalized advisory from Canada.",
    hero_desc: "I'm Miguel Angel Pérez, the Real Estate Chef. I help Latinos and Canadians invest wisely in premium Mexican real estate.",
    hero_cta_primary: "Book your free consultation",
    hero_cta_secondary: "See projects",
    hero_badge: "🍳 Chef · 🏠 Real Estate · 🇨🇦 Toronto",
    section_why_title: "What does the Real Estate Chef offer?",
    section_why_sub: "We don't sell units. We sell access, trust and opportunity.",
    catalog_supertitle: "Curated Projects",
    catalog_title: "Investment Portfolio",
    search_placeholder: "Search by area or property type...",
    filter_ai_placeholder: "Describe your ideal investment...",
    specs_rooms: "Bedrooms",
    specs_baths: "Bathrooms",
    specs_meters: "Sqm",
    specs_parking: "Parking",
    card_details: "View Details",
    modal_request_btn: "Request information",
    cta_final_supertitle: "Ready to invest?",
    cta_final_title: "Book your strategy call",
    cta_final_sub: "30 minutes, no cost. We'll analyze your situation and show you the best options in Mexico.",
    form_name: "Your name",
    form_email: "Your email",
    form_zona: "Which area interests you?",
    form_zona_merida: "Mérida, Yucatán",
    form_zona_riviera: "Riviera Maya",
    form_zona_progreso: "Puerto Progreso / Yucalpetén",
    form_zona_otro: "Help me decide",
    form_submit: "I want my free consultation",
    form_whatsapp: "Or message me on WhatsApp",
    footer_tagline: "The bridge between Canada and Mexico's best investments.",
    footer_rights: "© 2025 Miguel Angel Pérez • The Real Estate Chef"
  }
};

export const FORMAT_PRICE = (price: number) => {
  return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(price);
};
