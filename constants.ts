
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
        tag: "Exclusivo",
        descripcion: "Una joya arquitectónica en el corazón de Polanco. Techos de doble altura, acabados en mármol y un jardín privado de ensueño.",
        caracteristicas: ["Seguridad Privada", "Cava", "Jardín Zen", "Paneles Solares"],
        img: "https://images.unsplash.com/photo-1600585154340-be6191dae10c?auto=format&fit=crop&q=80&w=800"
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
        tag: "Luxury",
        descripcion: "Vistas panorámicas inigualables. Elevador directo al piso y amenidades de clase mundial en el edificio.",
        caracteristicas: ["Alberca", "Gimnasio", "Roof Garden Privado", "Helipuerto"],
        img: "https://images.unsplash.com/photo-1600607687940-47a04b629733?auto=format&fit=crop&q=80&w=800"
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
        tag: "Modern",
        descripcion: "Vivir en las nubes. Departamento con terraza privada y acceso directo al Parque La Mexicana.",
        caracteristicas: ["Acceso Parque", "Cine Privado", "Vigilancia"],
        img: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80&w=800"
    }
];

export const TESTIMONIOS: Testimonial[] = [
  {
    id: 1,
    nombre: "Familia Rodríguez",
    rol: "Inversionistas",
    foto: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&q=80&w=200",
    comentario: "Miguel Angel nos ayudó a encontrar la casa de nuestros sueños en tiempo récord. El servicio fue impecable."
  },
  {
    id: 2,
    nombre: "Roberto Silva",
    rol: "CEO Tech Global",
    foto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200",
    comentario: "La discreción y profesionalismo de HG Hola Group es inigualable en el mercado inmobiliario de lujo."
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
    nav_about: "Nosotros",
    nav_contact: "Contacto",
    nav_cta: "WHATSAPP",
    hero_title: "Tu Nuevo Comienzo Está Aquí",
    hero_subtitle: "Asesoría de ultra-lujo por Miguel Angel Pérez",
    hero_cta: "Conoce el desarrollo",
    filter_op: "Operación",
    filter_type: "Tipo",
    filter_loc: "Ubicación",
    filter_price: "Precio Máx",
    filter_rooms: "Recámaras",
    filter_search_btn: "BUSCAR",
    section_testimonials: "Del Quiero a la Realidad",
    section_services: "Servicios Exclusivos",
    section_properties: "Nuevos Desarrollos",
    card_rooms: "Hab.",
    card_baths: "Baños",
    card_details: "Ver Detalles",
    footer_offices: "Oficinas",
    footer_care: "Atención a Clientes",
    footer_social: "Redes Sociales",
    footer_legal: "Aviso de Privacidad",
    // Fix: Added missing translation keys for AI search and property modal
    filter_ai_placeholder: "Describe lo que buscas (ej: Casa en Polanco con 3 recámaras)...",
    modal_request_btn: "SOLICITAR INFORMACIÓN",
    modal_whatsapp_btn: "CONTACTAR POR WHATSAPP"
  },
  en: {
    nav_home: "Home",
    nav_properties: "Developments",
    nav_sell: "Sell Property",
    nav_about: "About Us",
    nav_contact: "Contact",
    nav_cta: "WHATSAPP",
    hero_title: "Your New Beginning is Here",
    hero_subtitle: "Ultra-luxury advice by Miguel Angel Pérez",
    hero_cta: "View development",
    filter_op: "Operation",
    filter_type: "Type",
    filter_loc: "Location",
    filter_price: "Max Price",
    filter_rooms: "Bedrooms",
    filter_search_btn: "SEARCH",
    section_testimonials: "From Dream to Reality",
    section_services: "Exclusive Services",
    section_properties: "New Developments",
    card_rooms: "Beds",
    card_baths: "Baths",
    card_details: "View Details",
    footer_offices: "Offices",
    footer_care: "Customer Care",
    footer_social: "Social Media",
    footer_legal: "Privacy Policy",
    // Fix: Added missing translation keys for AI search and property modal
    filter_ai_placeholder: "Describe what you're looking for (e.g., House in Polanco with 3 bedrooms)...",
    modal_request_btn: "REQUEST INFORMATION",
    modal_whatsapp_btn: "CONTACT VIA WHATSAPP"
  }
};

export const FORMAT_PRICE = (price: number) => {
    return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(price);
};
