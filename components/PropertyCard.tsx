
import React from 'react';
import { Property } from '../types';
import { FORMAT_PRICE } from '../constants';
import { motion } from 'framer-motion';
// Import missing ArrowRight icon from lucide-react
import { ArrowRight } from 'lucide-react';

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
      whileHover={{ y: -10 }}
      className="luxury-card rounded-none overflow-hidden flex flex-col group bg-black border border-white/5 shadow-2xl"
    >
      <div 
        className="relative aspect-[4/3] overflow-hidden cursor-pointer"
        onClick={() => onViewDetails(property)}
      >
        <img 
          src={property.img} 
          alt={property.titulo} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s] ease-out"
        />
        {/* Subtle gradient at the bottom for readability, but keeping the image clear */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent"></div>
        
        <div className="absolute top-6 right-6">
            <span className="text-[9px] font-black text-black uppercase bg-[#D4AF37] px-4 py-1.5 tracking-widest shadow-2xl">
                {property.operacion}
            </span>
        </div>
      </div>
      
      <div className="p-8 flex flex-col flex-grow">
        <div className="mb-6">
          <span className="text-[8px] font-black text-[#D4AF37] uppercase tracking-[0.4em] mb-2 block">{property.zona}</span>
          <h3 className="text-2xl font-serif text-white tracking-tighter leading-tight group-hover:text-[#D4AF37] transition-colors">{property.titulo}</h3>
        </div>
        
        <div className="flex gap-10 mb-8 pb-8 border-b border-white/5">
          <div className="flex flex-col">
            <span className="text-[7px] font-black text-[#444] uppercase tracking-widest mb-1">{labels.rooms}</span>
            <span className="text-sm font-bold text-white">{property.recamaras}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[7px] font-black text-[#444] uppercase tracking-widest mb-1">{labels.baths}</span>
            <span className="text-sm font-bold text-white">{property.banos}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[7px] font-black text-[#444] uppercase tracking-widest mb-1">M²</span>
            <span className="text-sm font-bold text-white">{property.metros}</span>
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between">
          <span className="text-xl font-bold text-white group-hover:text-[#D4AF37] transition-colors tracking-tighter">{FORMAT_PRICE(property.precio)}</span>
          <button 
            onClick={() => onViewDetails(property)}
            className="text-[9px] font-black text-white/40 uppercase tracking-[0.3em] hover:text-[#D4AF37] transition-all flex items-center gap-2"
          >
            {labels.details}
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
