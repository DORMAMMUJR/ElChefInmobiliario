
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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="luxury-card flex flex-col group relative rounded-none h-full max-w-sm mx-auto w-full md:max-w-none"
    >
      <div 
        className="relative aspect-[4/3] overflow-hidden cursor-pointer bg-black/20"
        onClick={() => onViewDetails(property)}
      >
        <motion.img 
          src={property.img} 
          alt={property.titulo} 
          className="w-full h-full object-cover transition-transform duration-[1.5s] ease-in-out group-hover:scale-105"
        />
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-[#D4AF37] flex items-center justify-center text-black transform scale-0 group-hover:scale-100 transition-transform duration-500 shadow-2xl">
                <Maximize2 size={20} />
            </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#011c16] to-transparent opacity-80"></div>
        
        <div className="absolute top-4 right-4 z-10">
            <span className="text-[8px] font-black text-black uppercase bg-[#D4AF37] px-3 py-1.5 tracking-widest shadow-xl">
                {property.operacion}
            </span>
        </div>
      </div>
      
      <div className="p-6 md:p-8 flex flex-col flex-grow relative z-10">
        <div className="mb-4 md:mb-6">
          <span className="text-[7px] font-black text-[#D4AF37] uppercase tracking-[0.5em] mb-2 block">{property.zona}</span>
          <h3 className="text-xl md:text-2xl font-serif text-white tracking-tighter leading-tight group-hover:text-[#D4AF37] transition-colors duration-300 uppercase font-bold">
            {property.titulo}
          </h3>
        </div>
        
        <div className="flex gap-6 mb-6 pb-6 border-b border-white/5">
          <div className="flex flex-col">
            <span className="text-[7px] font-black text-white/30 uppercase tracking-widest mb-1">{labels.rooms}</span>
            <span className="text-xs md:text-sm font-bold text-white/90">{property.recamaras}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[7px] font-black text-white/30 uppercase tracking-widest mb-1">{labels.baths}</span>
            <span className="text-xs md:text-sm font-bold text-white/90">{property.banos}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[7px] font-black text-white/30 uppercase tracking-widest mb-1">M²</span>
            <span className="text-xs md:text-sm font-bold text-white/90">{property.metros}</span>
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[8px] text-white/20 font-bold uppercase tracking-widest mb-0.5">Inversión</span>
            <span className="text-lg md:text-xl font-bold text-white group-hover:text-[#D4AF37] transition-colors tracking-tighter duration-300">
                {FORMAT_PRICE(property.precio)}
            </span>
          </div>
          <button 
            onClick={() => onViewDetails(property)}
            className="group/btn text-[8px] font-black text-white/40 uppercase tracking-[0.3em] hover:text-[#D4AF37] transition-all flex items-center gap-2"
          >
            {labels.details}
            <ArrowRight size={12} className="group-hover/btn:translate-x-1.5 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
