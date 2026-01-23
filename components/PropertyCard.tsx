
import React from 'react';
import { Property } from '../types';
import { FORMAT_PRICE } from '../constants';

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
  onToggleCompare, 
  isComparing,
  labels
}) => {
  return (
    <div className="luxury-card rounded-none overflow-hidden flex flex-col group h-full">
      <div className="relative aspect-[16/10] overflow-hidden cursor-pointer">
        <img 
          src={property.img} 
          alt={property.titulo} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s] ease-out"
          onClick={() => onViewDetails(property)}
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
        <div className="absolute top-6 left-6">
            <span className="text-[10px] font-bold text-black uppercase bg-[#D4AF37] px-4 py-1 tracking-widest shadow-lg">
                {property.operacion}
            </span>
        </div>
        <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
             <span className="text-[9px] text-white font-bold uppercase tracking-[0.3em] bg-black/60 backdrop-blur-md px-3 py-1">
                Luxury Edition
             </span>
        </div>
      </div>
      
      <div className="p-8 flex flex-col flex-grow">
        <h3 className="text-2xl font-serif text-white mb-2 group-hover:text-[#D4AF37] transition-colors duration-500">{property.titulo}</h3>
        <p className="text-[10px] text-[#A0A0A0] mb-6 tracking-widest uppercase font-bold">{property.zona}</p>
        
        <div className="flex gap-8 mb-8">
          <div className="flex items-center gap-3">
            <span className="text-[#D4AF37] text-xs opacity-80">🛏️</span>
            <span className="text-[10px] font-bold text-[#A0A0A0] tracking-widest uppercase">{property.recamaras} {labels.rooms}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[#D4AF37] text-xs opacity-80">🚿</span>
            <span className="text-[10px] font-bold text-[#A0A0A0] tracking-widest uppercase">{property.banos} {labels.baths}</span>
          </div>
        </div>

        <div className="mt-auto pt-8 border-t border-white/5 flex items-center justify-between">
          <div className="flex flex-col">
              <span className="text-[8px] text-[#A0A0A0] uppercase tracking-widest mb-1">Precio</span>
              <span className="text-xl font-bold text-[#D4AF37]">{FORMAT_PRICE(property.precio)}</span>
          </div>
          <button 
            onClick={() => onViewDetails(property)}
            className="text-[10px] font-bold text-white uppercase tracking-[0.3em] border-b border-transparent hover:border-[#D4AF37] pb-1 hover:text-[#D4AF37] transition-all duration-300"
          >
            {labels.details}
          </button>
        </div>
      </div>
    </div>
  );
};
