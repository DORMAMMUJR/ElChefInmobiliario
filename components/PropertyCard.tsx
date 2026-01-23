
import React from 'react';
import { Property } from '../types';
import { FORMAT_PRICE } from '../constants';
import { motion } from 'framer-motion';
import { ArrowRight, Maximize2 } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  onViewDetails: (p: Property) => void;
  onToggleCompare: (p: Property) => void;
  isComparing: boolean;
  labels: {
    rooms: string;
    baths: string;
    details: string;
  };
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ 
  property, 
  onViewDetails, 
  labels
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="luxury-card flex flex-col group relative rounded-none h-full"
    >
      <div 
        className="relative aspect-[16/11] overflow-hidden cursor-pointer bg-black/20"
        onClick={() => onViewDetails(property)}
      >
        <motion.img 
          src={property.img} 
          alt={property.titulo} 
          className="w-full h-full object-cover transition-transform duration-[2s] ease-in-out group-hover:scale-110"
        />
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-[#D4AF37] flex items-center justify-center text-black transform scale-0 group-hover:scale-100 transition-transform duration-500 shadow-2xl">
                <Maximize2 size={24} />
            </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#011c16] to-transparent"></div>
        
        <div className="absolute top-5 right-5 z-10">
            <span className="text-[9px] font-black text-black uppercase bg-[#D4AF37] px-4 py-1.5 tracking-widest shadow-xl">
                {property.operacion}
            </span>
        </div>
      </div>
      
      <div className="p-8 md:p-10 flex flex-col flex-grow relative z-10 bg-gradient-to-b from-transparent to-[#022c22]/30">
        <div className="mb-6">
          <span className="text-[8px] font-black text-[#D4AF37] uppercase tracking-[0.6em] mb-2 block">{property.zona}</span>
          <h3 className="text-2xl md:text-3xl font-serif text-white tracking-tighter leading-tight group-hover:text-[#D4AF37] transition-colors duration-300 uppercase">
            {property.titulo}
          </h3>
        </div>
        
        <div className="flex gap-8 mb-8 pb-8 border-b border-white/5">
          <div className="flex flex-col">
            <span className="text-[7px] font-black text-white/30 uppercase tracking-widest mb-1">{labels.rooms}</span>
            <span className="text-sm font-bold text-white/90">{property.recamaras}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[7px] font-black text-white/30 uppercase tracking-widest mb-1">{labels.baths}</span>
            <span className="text-sm font-bold text-white/90">{property.banos}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[7px] font-black text-white/30 uppercase tracking-widest mb-1">M²</span>
            <span className="text-sm font-bold text-white/90">{property.metros}</span>
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[9px] text-white/20 font-bold uppercase tracking-widest mb-0.5">Inversión Estimada</span>
            <span className="text-xl md:text-2xl font-bold text-white group-hover:text-[#D4AF37] transition-colors tracking-tighter duration-300">
                {FORMAT_PRICE(property.precio)}
            </span>
          </div>
          <button 
            onClick={() => onViewDetails(property)}
            className="group/btn text-[9px] font-black text-white/40 uppercase tracking-[0.3em] hover:text-[#D4AF37] transition-all flex items-center gap-2"
          >
            {labels.details}
            <ArrowRight size={14} className="group-hover/btn:translate-x-1.5 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
