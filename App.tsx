
import React, { useState, useMemo, useEffect } from 'react';
import { Property, FilterState } from './types';
// Fix: Use the correct export name TESTIMONIOS from constants
import { PROPIEDADES, TESTIMONIOS, SERVICIOS, TRANSLATIONS, FORMAT_PRICE } from './constants';
import { PropertyCard } from './components/PropertyCard';
import { parseUserSearchIntent } from './services/geminiService';
import { 
  X, MessageCircle, Maximize2, Bed, Bath, Car, Star, ChevronRight, Menu, Globe, Instagram, Linkedin, ShieldCheck, Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  const [lang, setLang] = useState<'es' | 'en'>('es');
  const [currentView, setCurrentView] = useState<'home' | 'catalog' | 'sell' | 'contact'>('home');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isAIProcessing, setIsAIProcessing] = useState(false);
  const [filters, setFilters] = useState<FilterState>({ operacion: 'todos', tipo: 'todos', zona: 'todos', precioMax: '', query: '' });

  const t = TRANSLATIONS[lang];
  const featured = PROPIEDADES[0];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  const handleAISearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!filters.query?.trim()) return;
    setIsAIProcessing(true);
    const result = await parseUserSearchIntent(filters.query);
    if (result) {
      setFilters(prev => ({ ...prev, operacion: result.operacion || 'todos', tipo: result.tipo || 'todos' }));
      setCurrentView('catalog');
    }
    setIsAIProcessing(false);
  };

  return (
    <div className="min-h-screen w-screen bg-[#011c16] text-white flex flex-col font-sans selection:bg-[#D4AF37] selection:text-black">
      {/* HEADER MINIMALISTA PERSISTENTE */}
      <header className="fixed top-0 w-full z-[100] h-20 flex items-center border-b border-white/5 backdrop-blur-xl bg-[#011c16]/80">
        <div className="container mx-auto px-6 lg:px-12 flex justify-between items-center">
          <div className="flex items-center gap-4 cursor-pointer group" onClick={() => setCurrentView('home')}>
            {/* AVATAR DE DAVID - BORDE CIRCULAR DORADO */}
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-[#D4AF37] overflow-hidden flex-shrink-0 shadow-lg group-hover:scale-105 transition-transform duration-300">
               <img 
                 src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=90&w=200" 
                 className="w-full h-full object-cover" 
                 alt="David" 
               />
            </div>
            <div className="flex flex-col">
              <h1 className="text-sm md:text-lg font-serif font-bold tracking-tighter group-hover:text-[#D4AF37] transition-colors leading-none uppercase flex items-center gap-2">
                <span>MIGUEL ANGEL PÉREZ</span>
                <span className="hidden md:inline text-white/20 font-light">|</span>
                <span className="text-[#D4AF37] md:text-white group-hover:text-[#D4AF37] font-medium tracking-tight">EL CHEF INMOBILIARIO</span>
              </h1>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-8">
            {[
              { id: 'home', label: t.nav_home },
              { id: 'catalog', label: t.nav_properties },
              { id: 'sell', label: t.nav_sell },
              { id: 'contact', label: t.nav_contact }
            ].map(item => (
              <button 
                key={item.id}
                onClick={() => setCurrentView(item.id as any)}
                className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:text-[#D4AF37] ${currentView === item.id ? 'text-[#D4AF37]' : 'text-white/60'}`}
              >
                {item.label}
              </button>
            ))}
            <button 
              onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
              className="ml-4 text-[10px] font-black text-[#D4AF37] border border-[#D4AF37]/30 px-3 py-1 rounded-sm hover:bg-[#D4AF37] hover:text-black transition-all"
            >
              {t.lang_toggle}
            </button>
          </nav>
          
          <button className="lg:hidden text-white/60"><Menu size={24}/></button>
        </div>
      </header>

      {/* MAIN VIEW */}
      <main className="flex-grow pt-20">
        <AnimatePresence mode="wait">
          {currentView === 'home' && (
            <motion.div 
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full"
            >
              {/* HERO SECTION - ABOVE THE FOLD IMPACT */}
              <section className="h-[calc(100vh-80px)] grid grid-cols-12 w-full border-b border-white/5 overflow-hidden">
                <div className="col-span-12 lg:col-span-7 relative overflow-hidden h-[40vh] lg:h-full">
                  <img src={featured.img} className="w-full h-full object-cover grayscale opacity-50 transition-transform duration-[30s] hover:scale-110" alt="Hero" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#011c16]" />
                </div>
                <div className="col-span-12 lg:col-span-5 flex flex-col justify-center px-8 lg:px-20 py-12 bg-[#011c16] relative">
                   <span className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.6em] mb-4 block italic opacity-70">{featured.zona}</span>
                   <h2 className="text-4xl lg:text-7xl font-serif font-bold mb-6 tracking-tighter uppercase leading-[0.85] text-white">
                     {featured.titulo}
                   </h2>
                   
                   {/* ROW OF TECHNICAL AMENITIES */}
                   <div className="flex gap-10 mb-8 border-y border-white/5 py-6 overflow-x-auto no-scrollbar">
                      <div className="flex flex-col gap-1 min-w-fit">
                        <div className="flex items-center gap-2 text-[#D4AF37]">
                          <Maximize2 size={14} strokeWidth={1.5} />
                          <span className="text-xl font-serif">{featured.metros}</span>
                        </div>
                        <span className="text-[8px] uppercase tracking-widest text-white/40 font-black">{t.specs_meters}</span>
                      </div>
                      <div className="flex flex-col gap-1 min-w-fit">
                        <div className="flex items-center gap-2 text-[#D4AF37]">
                          <Bed size={14} strokeWidth={1.5} />
                          <span className="text-xl font-serif">{featured.recamaras}</span>
                        </div>
                        <span className="text-[8px] uppercase tracking-widest text-white/40 font-black">{t.specs_rooms}</span>
                      </div>
                      <div className="flex flex-col gap-1 min-w-fit">
                        <div className="flex items-center gap-2 text-[#D4AF37]">
                          <Bath size={14} strokeWidth={1.5} />
                          <span className="text-xl font-serif">{featured.banos}</span>
                        </div>
                        <span className="text-[8px] uppercase tracking-widest text-white/40 font-black">{t.specs_baths}</span>
                      </div>
                      <div className="flex flex-col gap-1 min-w-fit">
                        <div className="flex items-center gap-2 text-[#D4AF37]">
                          <Car size={14} strokeWidth={1.5} />
                          <span className="text-xl font-serif">{featured.estacionamientos}</span>
                        </div>
                        <span className="text-[8px] uppercase tracking-widest text-white/40 font-black">{t.specs_parking}</span>
                      </div>
                   </div>

                   <div className="flex items-center gap-5">
                      <button onClick={() => setSelectedProperty(featured)} className="btn-luxury-gold px-10 py-3 text-[10px] font-black uppercase tracking-[0.3em] rounded-sm flex-1 lg:flex-none">
                        {t.hero_cta_primary}
                      </button>
                      <button className="px-10 py-3 text-[10px] font-black uppercase tracking-[0.3em] border border-white/10 hover:border-[#D4AF37] rounded-sm transition-all flex-1 lg:flex-none flex items-center justify-center gap-2">
                        <MessageCircle size={14} />
                        {t.hero_cta_secondary}
                      </button>
                   </div>

                   {/* SOCIAL PROOF ANCHOR - RIGHT BALANCE */}
                   <div className="mt-12 pt-8 border-t border-white/5">
                      <div className="flex gap-1 mb-3">
                        {[...Array(5)].map((_, i) => <Star key={i} size={8} fill="#D4AF37" color="#D4AF37" />)}
                      </div>
                      <p className="text-[10px] text-white/40 italic mb-2 leading-tight max-w-xs">"{TESTIMONIOS[0].cita}"</p>
                      <span className="text-[9px] font-black text-[#D4AF37] uppercase tracking-widest">— {TESTIMONIOS[0].nombre}</span>
                   </div>
                </div>
              </section>

              {/* STATS SECTION */}
              <section className="py-24 bg-[#011c16]">
                <div className="container mx-auto px-6 lg:px-12 grid grid-cols-2 lg:grid-cols-4 gap-12">
                   {[
                     { label: lang === 'es' ? 'Transacciones' : 'Transactions', val: '500+', icon: <ShieldCheck size={20}/> },
                     { label: lang === 'es' ? 'Años Exp' : 'Years Exp', val: '15+', icon: <Award size={20}/> },
                     { label: lang === 'es' ? 'Clientes VIP' : 'VIP Clients', val: '120+', icon: <Star size={20}/> },
                     { label: lang === 'es' ? 'Zonas Elite' : 'Elite Zones', val: '12', icon: <Globe size={20}/> }
                   ].map((s, i) => (
                     <div key={i} className="text-center group">
                        <div className="text-[#D4AF37] mb-4 flex justify-center group-hover:scale-110 transition-transform">{s.icon}</div>
                        <div className="text-4xl font-serif font-bold mb-2 tracking-tighter">{s.val}</div>
                        <div className="text-[9px] font-black uppercase tracking-[0.4em] text-white/30">{s.label}</div>
                     </div>
                   ))}
                </div>
              </section>

              {/* SERVICES SECTION */}
              <section className="py-24 border-y border-white/5">
                <div className="container mx-auto px-6 lg:px-12">
                  <div className="text-center mb-16">
                    <span className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.8em] mb-4 block italic">Cuisine Immobilière</span>
                    <h2 className="text-4xl lg:text-6xl font-serif font-bold uppercase tracking-tighter">{t.section_services}</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {SERVICIOS.map(s => (
                      <div key={s.id} className="luxury-card p-12 text-center group cursor-pointer hover:border-[#D4AF37]/40">
                        <div className="text-4xl mb-6">{s.icono}</div>
                        <h3 className="text-lg font-serif font-bold mb-4 tracking-tight uppercase text-[#D4AF37]">{s.titulo}</h3>
                        <p className="text-white/40 text-[11px] leading-relaxed uppercase tracking-widest">{s.descripcion}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* TESTIMONIALS SECTION */}
              <section className="py-24">
                <div className="container mx-auto px-6 lg:px-12">
                   <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                      <div className="space-y-12">
                        {TESTIMONIOS.map(test => (
                          <div key={test.id} className="border-l-2 border-[#D4AF37] pl-8">
                            <div className="flex gap-1 mb-4">
                              {[...Array(test.estrellas)].map((_, i) => <Star key={i} size={10} fill="#D4AF37" color="#D4AF37" />)}
                            </div>
                            <p className="text-xl lg:text-2xl font-serif italic text-white/80 mb-6 leading-relaxed">"{test.cita}"</p>
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#D4AF37]">{test.nombre}</span>
                          </div>
                        ))}
                      </div>
                      <div className="relative aspect-square lg:aspect-video rounded-sm overflow-hidden grayscale opacity-40">
                         <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover" alt="Elite Office" />
                      </div>
                   </div>
                </div>
              </section>
            </motion.div>
          )}

          {currentView === 'catalog' && (
            <motion.div 
              key="catalog"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="container mx-auto px-6 lg:px-12 py-12"
            >
              <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-8">
                <div>
                  <span className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.8em] mb-4 block italic">{t.catalog_title}</span>
                  <h2 className="text-4xl lg:text-7xl font-serif font-bold uppercase tracking-tighter">Portafolio</h2>
                </div>
                <form onSubmit={handleAISearch} className="flex gap-4 border-b border-white/10 pb-2 w-full lg:w-96">
                  <input value={filters.query} onChange={e => setFilters({...filters, query: e.target.value})} placeholder={t.search_placeholder} className="bg-transparent text-[11px] uppercase tracking-widest outline-none flex-grow" />
                  <button type="submit" className="text-[#D4AF37]">{isAIProcessing ? '...' : <ChevronRight size={18}/>}</button>
                </form>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {PROPIEDADES.map(p => <PropertyCard key={p.id} property={p} onViewDetails={setSelectedProperty} onToggleCompare={() => {}} isComparing={false} labels={{ rooms: t.specs_rooms, baths: t.specs_baths, details: t.hero_cta_primary }} />)}
              </div>
            </motion.div>
          )}

          {currentView === 'sell' && (
            <motion.div 
              key="sell"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="container mx-auto px-6 lg:px-12 py-24 flex flex-col items-center"
            >
              <span className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[1em] mb-4 block italic">Marketing Strategy</span>
              <h2 className="text-4xl lg:text-7xl font-serif font-bold uppercase tracking-tighter text-center mb-16">Vende con Distinción</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl">
                <div className="luxury-card p-12 space-y-8">
                  <h3 className="text-2xl font-serif font-bold uppercase text-[#D4AF37]">Capta el Mercado Premium</h3>
                  <p className="text-white/60 text-sm leading-loose">
                    Combinamos precisión algorítmica y producción cinematográfica para posicionar su activo ante inversores globales calificados.
                  </p>
                  <form className="space-y-6">
                    <input type="text" placeholder="NOMBRE COMPLETO" className="w-full bg-transparent border-b border-white/10 py-3 text-[10px] tracking-[0.2em] outline-none focus:border-[#D4AF37] transition-colors" />
                    <input type="text" placeholder="TIPO DE PROPIEDAD" className="w-full bg-transparent border-b border-white/10 py-3 text-[10px] tracking-[0.2em] outline-none focus:border-[#D4AF37] transition-colors" />
                    <button type="button" className="btn-luxury-gold w-full py-4 text-[10px] font-black uppercase tracking-[0.4em] mt-4">Solicitar Valuación</button>
                  </form>
                </div>
                <div className="aspect-[4/5] relative rounded-sm overflow-hidden grayscale">
                   <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover" alt="Luxury Real Estate" />
                </div>
              </div>
            </motion.div>
          )}

          {currentView === 'contact' && (
            <motion.div 
              key="contact"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="container mx-auto px-6 lg:px-12 py-24 min-h-[60vh] flex items-center justify-center"
            >
              <div className="text-center max-w-2xl">
                <span className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[1em] mb-4 block italic">Personal Concierge</span>
                <h2 className="text-4xl lg:text-7xl font-serif font-bold uppercase tracking-tighter mb-8">Conecta Ahora</h2>
                <p className="text-white/40 text-sm leading-loose mb-12">
                  Agende una consulta privada para discutir sus objetivos de inversión o la comercialización de su patrimonio bajo estándares de ultra-lujo.
                </p>
                <div className="flex flex-col md:flex-row gap-6 justify-center">
                   <a href="https://wa.me/14377768395" className="btn-luxury-gold px-12 py-5 text-[10px] font-black uppercase tracking-[0.4em] flex items-center justify-center gap-3">
                     <MessageCircle size={18} /> WhatsApp Directo
                   </a>
                   <a href="mailto:contacto@miguelangelperez.mx" className="px-12 py-5 text-[10px] font-black uppercase tracking-[0.4em] border border-white/10 hover:border-[#D4AF37] transition-all flex items-center justify-center gap-3">
                     Canal Oficial
                   </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* FOOTER GLOBAL PERSISTENTE REFORZADO */}
      <footer className="bg-[#011c16] border-t border-white/5 pt-20 pb-12">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
            <div className="md:col-span-5">
              <h4 className="text-white font-serif font-bold text-xl mb-6 uppercase tracking-tighter">MIGUEL ANGEL PÉREZ <span className="text-[#D4AF37]">|</span> EL CHEF INMOBILIARIO</h4>
              <p className="text-white/30 text-[10px] uppercase tracking-[0.4em] leading-loose max-w-xs">
                Curaduría de activos de alta gama y asesoría estratégica para inversores institucionales y privados.
              </p>
              <div className="flex gap-8 mt-10">
                 <a href="#" className="text-white/30 hover:text-[#D4AF37] transition-all flex items-center gap-2">
                    <Instagram size={18} />
                    <span className="text-[9px] font-black uppercase tracking-widest">Instagram</span>
                 </a>
                 <a href="#" className="text-white/30 hover:text-[#D4AF37] transition-all flex items-center gap-2">
                    <Linkedin size={18} />
                    <span className="text-[9px] font-black uppercase tracking-widest">LinkedIn</span>
                 </a>
              </div>
            </div>
            <div className="md:col-span-3">
              <h5 className="text-[#D4AF37] text-[10px] font-black uppercase tracking-widest mb-8">Explorar</h5>
              <div className="flex flex-col gap-4">
                {['home', 'catalog', 'sell', 'contact'].map(view => (
                  <button key={view} onClick={() => setCurrentView(view as any)} className="text-[10px] text-white/40 hover:text-white uppercase tracking-widest text-left transition-colors">
                    {TRANSLATIONS[lang][`nav_${view}` as keyof typeof t]}
                  </button>
                ))}
              </div>
            </div>
            <div className="md:col-span-4 flex flex-col items-start md:items-end">
              <h5 className="text-[#D4AF37] text-[10px] font-black uppercase tracking-widest mb-8">Información Legal</h5>
              <div className="flex flex-col items-start md:items-end gap-4">
                <button className="text-[10px] text-white/40 hover:text-white uppercase tracking-widest text-left md:text-right transition-colors">{t.footer_privacy}</button>
                <button className="text-[10px] text-white/40 hover:text-white uppercase tracking-widest text-left md:text-right transition-colors">{t.footer_terms}</button>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <span className="text-[9px] font-black text-white/10 uppercase tracking-[0.5em]">
              © 2027 MIGUEL ANGEL PÉREZ • {t.footer_rights}
            </span>
            <div className="flex items-center gap-4">
              <span className="text-[8px] font-bold text-white/10 uppercase tracking-[0.3em]">{t.footer_dev}</span>
              <div className="h-4 w-[1px] bg-white/5" />
              <span className="text-[8px] font-black text-[#D4AF37]/40 uppercase tracking-[0.2em] italic">Intecniam Agency</span>
            </div>
          </div>
        </div>
      </footer>

      {/* MODAL DE DETALLE REFINADO */}
      <AnimatePresence>
        {selectedProperty && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] flex items-center justify-center p-4 lg:p-12 bg-black/98 backdrop-blur-xl overflow-y-auto">
            <div className="absolute inset-0" onClick={() => setSelectedProperty(null)} />
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="bg-[#022c22] w-full max-w-6xl relative overflow-hidden border border-white/10 rounded-sm grid grid-cols-1 lg:grid-cols-12 shadow-2xl">
              <button onClick={() => setSelectedProperty(null)} className="absolute top-6 right-6 z-[210] text-white/40 hover:text-white p-2 hover:bg-white/5 rounded-full transition-all"><X size={24}/></button>
              <div className="lg:col-span-5 h-[40vh] lg:h-auto overflow-hidden">
                <img src={selectedProperty.img} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="Detail" />
              </div>
              <div className="lg:col-span-7 p-8 lg:p-16 flex flex-col">
                 <span className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.8em] mb-4 block italic opacity-60">{selectedProperty.zona}</span>
                 <h2 className="text-4xl lg:text-6xl font-serif font-bold mb-8 uppercase tracking-tighter leading-none">{selectedProperty.titulo}</h2>
                 {/* Fix: FORMAT_PRICE only takes one argument */}
                 <p className="text-3xl font-bold text-[#D4AF37] mb-10 tracking-tighter">{FORMAT_PRICE(selectedProperty.precio)}</p>
                 
                 <div className="grid grid-cols-4 gap-4 mb-10">
                    <div className="flex flex-col items-center bg-white/5 p-4 border border-white/5">
                      <Maximize2 size={16} strokeWidth={1.5} className="text-[#D4AF37] mb-2" />
                      <span className="text-xl font-serif">{selectedProperty.metros}</span>
                      <span className="text-[7px] uppercase tracking-widest text-white/30 mt-1">M²</span>
                    </div>
                    <div className="flex flex-col items-center bg-white/5 p-4 border border-white/5">
                      <Bed size={16} strokeWidth={1.5} className="text-[#D4AF37] mb-2" />
                      <span className="text-xl font-serif">{selectedProperty.recamaras}</span>
                      <span className="text-[7px] uppercase tracking-widest text-white/30 mt-1">{t.specs_rooms}</span>
                    </div>
                    <div className="flex flex-col items-center bg-white/5 p-4 border border-white/5">
                      <Bath size={16} strokeWidth={1.5} className="text-[#D4AF37] mb-2" />
                      <span className="text-xl font-serif">{selectedProperty.banos}</span>
                      <span className="text-[7px] uppercase tracking-widest text-white/30 mt-1">{t.specs_baths}</span>
                    </div>
                    <div className="flex flex-col items-center bg-white/5 p-4 border border-white/5">
                      <Car size={16} strokeWidth={1.5} className="text-[#D4AF37] mb-2" />
                      <span className="text-xl font-serif">{selectedProperty.estacionamientos}</span>
                      <span className="text-[7px] uppercase tracking-widest text-white/30 mt-1">{t.specs_parking}</span>
                    </div>
                 </div>

                 <p className="text-white/60 text-sm leading-loose mb-12 italic border-l-2 border-[#D4AF37] pl-8 py-2">"{selectedProperty.descripcion}"</p>
                 
                 <div className="mt-auto flex gap-4">
                    <button onClick={() => setSelectedProperty(null)} className="btn-luxury-gold flex-1 py-4 text-[10px] font-black uppercase tracking-[0.4em] rounded-sm">
                      {t.hero_cta_primary}
                    </button>
                    <a href="https://wa.me/14377768395" className="px-10 border border-[#D4AF37]/50 text-[#D4AF37] flex items-center justify-center text-[10px] font-black uppercase tracking-[0.4em] hover:bg-[#D4AF37] hover:text-black transition-all">
                      {t.hero_cta_secondary}
                    </a>
                 </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;