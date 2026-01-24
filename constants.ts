
import { Property, Testimonial, Service } from './types';

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
        // Added to fix App.tsx error
        estacionamientos: 3,
        tag: "Exclusivo",
        descripcion: "Una joya arquitectónica en el corazón de Polanco. Techos de doble altura, acabados en mármol y un jardín privado de ensueño.",
        caracteristicas: ["Seguridad Privada", "Cava", "Jardín Zen", "Paneles Solares"],
        img: "https://github.com/DORMAMMUJR/ElChefInmobiliario/blob/main/WhatsApp%20Image%202026-01-23%20at%204.22.16%20PM.jpeg?raw=true"
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
        // Added to fix App.tsx error
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
        // Added to fix App.tsx error
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
    nombre: "Familia Rodríguez",
    rol: "Inversionistas",
    foto: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=90&w=400",
    // Changed to cita and added estrellas for App.tsx compatibility
    cita: "Miguel Angel nos ayudó a encontrar la casa de nuestros sueños en tiempo récord. El servicio fue impecable.",
    estrellas: 5
  },
  {
    id: 2,
    nombre: "Roberto Silva",
    rol: "CEO Tech Global",
    foto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=90&w=400",
    // Changed to cita and added estrellas for App.tsx compatibility
    cita: "La discreción y profesionalismo de HG Hola Group es inigualable en el mercado inmobiliario de lujo.",
    estrellas: 5
  }
];

export const SERVICIOS: Service[] = [
  {
    id: 1,
    titulo: "Créditos Hipotecarios",
    icono: "💰",
    descripcion: "Asesoría personalizada para obtener las mejores tasas del mercado."
  },
  {
    id: 2,
    titulo: "Asesoría Legal",
    icono: "⚖️",
    descripcion: "Garantizamos la seguridad jurídica de cada una de tus transacciones."
  },
  {
    id: 3,
    titulo: "Property Management",
    icono: "🔑",
    descripcion: "Cuidamos tu patrimonio como si fuera nuestro."
  }
];

export const TRANSLATIONS = {
  es: {
    nav_home: "Inicio",
    nav_properties: "Desarrollos",
    nav_sell: "Vender mi propiedad",
    nav_contact: "Contacto",
    nav_cta: "WHATSAPP",
    lang_toggle: "EN",
    hero_title: "Tu Nuevo Comienzo",
    hero_subtitle: "Asesoría de ultra-lujo por Miguel Angel Pérez",
    hero_cta: "Conoce el desarrollo",
    hero_cta_primary: "Conoce el desarrollo",
    hero_cta_secondary: "WhatsApp",
    filter_op: "Operación",
    filter_type: "Tipo",
    section_services: "Servicios Concierge",
    section_properties: "Nuevos Desarrollos",
    catalog_title: "Portafolio",
    search_placeholder: "Busca tu propiedad ideal...",
    card_rooms: "Habitaciones",
    card_baths: "Baños",
    card_details: "Dossier Completo",
    footer_offices: "Nuestras Oficinas",
    footer_care: "Concierge VIP",
    footer_privacy: "Aviso de Privacidad",
    footer_terms: "Términos y Condiciones",
    footer_rights: "Todos los derechos reservados",
    footer_dev: "Desarrollado por",
    stat_transactions: "Transacciones",
    stat_experience: "Años Exp",
    stat_clients: "Clientes VIP",
    stat_locations: "Ubicaciones",
    filter_ai_placeholder: "Describe tu propiedad ideal (ej: Penthouse en Polanco)...",
    modal_request_btn: "SOLICITAR ACCESO PRIVADO",
    specs_meters: "Metros",
    specs_rooms: "Habitaciones",
    specs_baths: "Baños",
    specs_parking: "Estacionamiento"
  },
  en: {
    nav_home: "Home",
    nav_properties: "Developments",
    nav_sell: "Sell Property",
    nav_contact: "Contact",
    nav_cta: "CONNECT",
    lang_toggle: "ES",
    hero_title: "The Zenith of Living",
    hero_subtitle: "Ultra-luxury consulting by Miguel Angel Pérez",
    hero_cta: "Discover the Portfolio",
    hero_cta_primary: "View Development",
    hero_cta_secondary: "Connect",
    filter_op: "Investment Type",
    filter_type: "Category",
    section_services: "Concierge Services",
    section_properties: "Global Developments",
    catalog_title: "Portfolio",
    search_placeholder: "Search dream home...",
    card_rooms: "Bedrooms",
    card_baths: "Bathrooms",
    card_details: "Private Dossier",
    footer_offices: "Strategic Hubs",
    footer_care: "Elite Concierge",
    footer_privacy: "Privacy Policy",
    footer_terms: "Terms of Service",
    footer_rights: "All rights reserved",
    footer_dev: "Developed by",
    stat_transactions: "Transactions",
    stat_experience: "Years Exp",
    stat_clients: "Elite Clients",
    stat_locations: "Strategic Spots",
    filter_ai_placeholder: "Describe your dream asset (e.g., Modern Villa in Polanco)...",
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
