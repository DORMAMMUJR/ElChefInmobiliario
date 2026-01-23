
export interface Property {
  id: number;
  titulo: string;
  operacion: 'Venta' | 'Renta';
  tipo: 'Casa' | 'Departamento' | 'Terreno';
  zona: string;
  precio: number;
  recamaras: number;
  banos: number;
  metros: number;
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
  comentario: string;
  rol: string;
}

export interface Service {
  id: number;
  titulo: string;
  icono: string;
  descripcion: string;
}
