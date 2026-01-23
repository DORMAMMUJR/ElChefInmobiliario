
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
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="luxury-card flex flex-col group relative rounded-none h-full max-w-xl mx-auto w-full md:max-w-none shadow-2xl overflow-hidden"
    >
      <div 
        className="relative aspect-[4/3] overflow-hidden cursor-pointer bg-black/20"
        onClick={() => onViewDetails(property)}
      >
        <motion.img 
          src={property.img} 
          alt={property.titulo} 
          className="w-full h-full object-cover transition-transform duration-[3s] ease-in-out group-hover:scale-110"
        />
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-[#D4AF37] flex items-center justify-center text-black transform scale-0 group-hover:scale-100 transition-transform duration-500 shadow-2xl">
                <Maximize2 size={36} />
            </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#011c16] via-[#011c16]/60 to-transparent opacity-95"></div>
        
        <div className="absolute top-8 right-8 z-10">
            <span className="text-[11px] font-black text-black uppercase bg-[#D4AF37] px-6 py-2.5 tracking-[0.3em] shadow-2xl rounded-sm">
                {property.operacion.toUpperCase()}
            </span>
        </div>
      </div>
      
      <div className="p-10 md:p-14 flex flex-col flex-grow relative z-10">
        <div className="mb-8 md:mb-12">
          <span className="text-[10px] md:text-[12px] font-black text-[#D4AF37] uppercase tracking-[1em] mb-4 block italic leading-none">{property.zona}</span>
          <h3 className="text-3xl md:text-5xl font-serif text-white tracking-tighter leading-[0.9] group-hover:text-[#D4AF37] transition-colors duration-500 uppercase font-bold">
            {property.titulo}
          </h3>
        </div>
        
        <div className="grid grid-cols-3 gap-8 mb-12 pb-12 border-b border-white/5">
          <div className="flex flex-col">
            <span className="text-[9px] font-black text-white/20 uppercase tracking-widest mb-3">{labels.rooms}</span>
            <span className="text-xl md:text-2xl font-bold text-white leading-none">{property.recamaras}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] font-black text-white/20 uppercase tracking-widest mb-3">{labels.baths}</span>
            <span className="text-xl md:text-2xl font-bold text-white leading-none">{property.banos}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] font-black text-white/20 uppercase tracking-widest mb-3">SQ. M²</span>
            <span className="text-xl md:text-2xl font-bold text-white leading-none">{property.metros}</span>
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between gap-6">
          <div className="flex flex-col">
            <span className="text-[11px] text-white/20 font-black uppercase tracking-widest mb-2 italic">Valuation Portfolio</span>
            <span className="text-3xl md:text-4xl font-bold text-white group-hover:text-[#D4AF37] transition-colors tracking-tighter duration-500 leading-none">
                {FORMAT_PRICE(property.precio)}
            </span>
          </div>
          <button 
            onClick={() => onViewDetails(property)}
            className="group/btn text-[11px] md:text-[14px] font-black text-[#D4AF37]/60 uppercase tracking-[0.5em] hover:text-[#D4AF37] transition-all flex items-center gap-4 border-b-2 border-[#D4AF37]/10 pb-2 whitespace-nowrap"
          >
            {labels.details}
            <ArrowRight size={20} className="group-hover/btn:translate-x-3 transition-transform duration-500" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
