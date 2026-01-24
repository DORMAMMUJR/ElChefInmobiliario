
import { Property, Testimonial, Service } from './types';

export const CONTACT_INFO = {
  phone: "+1 437 776 8395",
  whatsapp: "14377768395",
  email: "contacto@miguelangelperez.mx",
  brand: "HOLA GROUP PROPERTY ADVISORS"
};

export const VENTAJAS = [
  {
    titulo: "Curaduría de Activos",
    desc: "No listamos propiedades; seleccionamos piezas arquitectónicas que cumplen con estándares de inversión y estética excepcionales.",
    icono: "Award"
  },
  {
    titulo: "Inteligencia de Mercado",
    desc: "Análisis predictivo de plusvalía y proyecciones financieras para asegurar que su patrimonio crezca con solidez.",
    icono: "BarChart"
  },
  {
    titulo: "Marketing de Alta Cocina",
    desc: "Producción cinematográfica y narrativa emocional para que cada propiedad cuente una historia que atraiga al comprador ideal.",
    icono: "Camera"
  },
  {
    titulo: "Red de Contactos Elite",
    desc: "Acceso exclusivo a preventas 'off-market' y oportunidades de inversión restringidas al círculo más alto de la industria.",
    icono: "Globe"
  }
];

export const PROPIEDADES: Property[] = [
    {
        id: 1,
        titulo: "Residencia Colonial Polanco",
        operacion: "Venta",
        tipo: "Casa",
        zona: "Polanco, CDMX",
        precio: 24500000,
        recamaras: 4,
        banos: 4.5,
        metros: 420,
        estacionamientos: 3,
        tag: "Exclusivo",
        descripcion: "Una joya arquitectónica en el corazón de Polanco. Techos de doble altura, acabados en mármol y un jardín privado de ensueño.",
        caracteristicas: ["Seguridad Privada", "Cava", "Jardín Zen", "Paneles Solares"],
        img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=90&w=1200"
    },
    {
        id: 2,
        titulo: "Penthouse Vista Arcos",
        operacion: "Renta",
        tipo: "Departamento",
        zona: "Bosques de las Lomas, CDMX",
        precio: 85000,
        recamaras: 3,
        banos: 3,
        metros: 310,
        estacionamientos: 4,
        tag: "Luxury",
        descripcion: "Vistas panorámicas inigualables. Elevador directo al piso y amenidades de clase mundial en el edificio.",
        caracteristicas: ["Alberca", "Gimnasio", "Roof Garden Privado", "Helipuerto"],
        img: "https://images.unsplash.com/photo-1600607687940-47a04b629733?auto=format&fit=crop&q=90&w=1200"
    },
    {
        id: 3,
        titulo: "Sky Garden Santa Fe",
        operacion: "Venta",
        tipo: "Departamento",
        zona: "Santa Fe, CDMX",
        precio: 8900000,
        recamaras: 2,
        banos: 2,
        metros: 145,
        estacionamientos: 2,
        tag: "Modern",
        descripcion: "Vivir en las nubes. Departamento con terraza privada y acceso directo al Parque La Mexicana.",
        caracteristicas: ["Acceso Parque", "Cine Privado", "Vigilancia"],
        img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=90&w=1200"
    }
];

export const TESTIMONIOS: Testimonial[] = [
  {
    id: 1,
    nombre: "Sr. Alexander Von Bürg",
    rol: "Inversionista Privado",
    foto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=90&w=400",
    cita: "La metodología de El Chef Inmobiliario transformó mi visión sobre las inversiones. Su precisión para detectar plusvalía es quirúrgica.",
    estrellas: 5
  },
  {
    id: 2,
    nombre: "Claudia Mendizábal",
    rol: "CEO Desarrolladora Lúmina",
    foto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=90&w=400",
    cita: "En Hola Group no solo venden m2, venden un estilo de vida aspiracional. Son el aliado estratégico que toda constructora de lujo necesita.",
    estrellas: 5
  },
  {
    id: 3,
    nombre: "Mauricio Echeverría",
    rol: "Comprador Residencial",
    foto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=90&w=400",
    cita: "El servicio de concierge superó mis expectativas. Desde la primera cita hasta la firma, el acompañamiento fue impecable.",
    estrellas: 5
  }
];

export const SERVICIOS: Service[] = [
  {
    id: 1,
    titulo: "Brokerage de Lujo",
    icono: "🏠",
    descripcion: "Representación exclusiva para la compra y venta de activos premium."
  },
  {
    id: 2,
    titulo: "Consultoría de Capital",
    icono: "📈",
    descripcion: "Estructuración financiera y fiscal para inversiones inmobiliarias."
  },
  {
    id: 3,
    titulo: "Marketing Inmobiliario",
    icono: "🎬",
    descripcion: "Estrategias digitales y de contenido de alto impacto visual."
  }
];

export const TRANSLATIONS = {
  es: {
    nav_home: "Inicio",
    nav_properties: "Portafolio",
    nav_sell: "Vender Activo",
    nav_contact: "Contacto",
    nav_cta: "WHATSAPP",
    lang_toggle: "EN",
    hero_title: "Miguel Angel Pérez",
    hero_subtitle: "El Chef Inmobiliario",
    hero_cta: "Conoce el desarrollo",
    hero_cta_primary: "Ver Portafolio",
    hero_cta_secondary: "WhatsApp",
    filter_op: "Operación",
    filter_type: "Tipo",
    section_services: "Servicios Concierge",
    section_properties: "Nuevos Desarrollos",
    catalog_title: "Explora el",
    search_placeholder: "Busca tu propiedad ideal...",
    card_rooms: "Habitaciones",
    card_baths: "Baños",
    card_details: "Ver Detalles",
    footer_offices: "Nuestras Oficinas",
    footer_care: "Concierge VIP",
    footer_privacy: "Privacidad",
    footer_terms: "Términos",
    footer_rights: "Todos los derechos reservados",
    footer_dev: "Desarrollado por",
    stat_transactions: "Transacciones",
    stat_experience: "Años Exp",
    stat_clients: "Clientes VIP",
    stat_locations: "Ubicaciones",
    filter_ai_placeholder: "Describe tu propiedad ideal...",
    modal_request_btn: "SOLICITAR ACCESO PRIVADO",
    specs_meters: "Metros",
    specs_rooms: "Habitaciones",
    specs_baths: "Baños",
    specs_parking: "Estacionamiento"
  },
  en: {
    nav_home: "Home",
    nav_properties: "Portfolio",
    nav_sell: "Sell Asset",
    nav_contact: "Contact",
    nav_cta: "CONNECT",
    lang_toggle: "ES",
    hero_title: "Miguel Angel Pérez",
    hero_subtitle: "The Real Estate Chef",
    hero_cta: "Discover Portfolio",
    hero_cta_primary: "View Portfolio",
    hero_cta_secondary: "Connect",
    filter_op: "Investment Type",
    filter_type: "Category",
    section_services: "Concierge Services",
    section_properties: "Developments",
    catalog_title: "Portfolio",
    search_placeholder: "Search dream home...",
    card_rooms: "Bedrooms",
    card_baths: "Bathrooms",
    card_details: "Private Dossier",
    footer_offices: "Offices",
    footer_care: "Elite Concierge",
    footer_privacy: "Privacy",
    footer_terms: "Terms",
    footer_rights: "All rights reserved",
    footer_dev: "Developed by",
    stat_transactions: "Transactions",
    stat_experience: "Years Exp",
    stat_clients: "Elite Clients",
    stat_locations: "Strategic Spots",
    filter_ai_placeholder: "Describe your dream asset...",
    modal_request_btn: "REQUEST PRIVATE ACCESS",
    specs_meters: "Sqm",
    specs_rooms: "Bedrooms",
    specs_baths: "Bathrooms",
    specs_parking: "Parking"
  }
};

export const FORMAT_PRICE = (price: number) => {
    return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(price);
};
