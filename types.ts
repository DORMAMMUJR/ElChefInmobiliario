
export interface Property {
  id: number;
  titulo: string;
  operacion: 'Venta' | 'Renta';
  tipo: 'Casa' | 'Departamento' | 'Terreno' | 'Estudio' | 'Penthouse';
  zona: string;
  precio: number;
  recamaras: number;
  banos: number;
  metros: number;
  // Added to fix property not existing error
  estacionamientos: number;
  tag: string;
  descripcion: string;
  caracteristicas: string[];
  img: string;
}

export interface FilterState {
  operacion: string;
  tipo: string;
  zona: string;
  precioMax: string;
  query?: string;
}

export interface Testimonial {
  id: number;
  nombre: string;
  foto: string;
  // Changed from comentario to cita to match App.tsx usage
  cita: string;
  rol: string;
  // Added to match App.tsx usage
  estrellas: number;
}

export interface Service {
  id: number;
  titulo: string;
  icono: string;
  descripcion: string;
}