
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
    <div className="luxury-card rounded-none overflow-hidden flex flex-col group">
      <div className="relative aspect-[16/10] overflow-hidden cursor-pointer">
        <img 
          src={property.img} 
          alt={property.titulo} 
          className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
          onClick={() => onViewDetails(property)}
        />
        <div className="absolute top-4 left-4">
            <span className="text-[10px] font-bold text-black uppercase bg-[#D4AF37] px-3 py-1 tracking-widest">
                {property.operacion}
            </span>
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-serif text-white mb-1 group-hover:text-[#D4AF37] transition-colors">{property.titulo}</h3>
        <p className="text-xs text-[#A0A0A0] mb-4 tracking-widest uppercase">{property.zona}</p>
        
        <div className="flex gap-6 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-[#D4AF37] text-xs">🛏️</span>
            <span className="text-[10px] font-medium text-[#A0A0A0] tracking-widest uppercase">{property.recamaras} {labels.rooms}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#D4AF37] text-xs">🚿</span>
            <span className="text-[10px] font-medium text-[#A0A0A0] tracking-widest uppercase">{property.banos} {labels.baths}</span>
          </div>
        </div>

        <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
          <span className="text-lg font-bold text-[#D4AF37]">{FORMAT_PRICE(property.precio)}</span>
          <button 
            onClick={() => onViewDetails(property)}
            className="text-[10px] font-bold text-white uppercase tracking-[0.2em] border-b border-[#D4AF37] pb-1 hover:text-[#D4AF37] transition-all"
          >
            {labels.details}
          </button>
        </div>
      </div>
    </div>
  );
};
