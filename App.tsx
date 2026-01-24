import React, { useState, useEffect } from 'react';
import { Property, FilterState } from './types';
import { PROPIEDADES, TRANSLATIONS, FORMAT_PRICE } from './constants';
import { PropertyCard } from './components/PropertyCard';
import { parseUserSearchIntent } from './services/geminiService';
import { 
  X, MessageCircle, Maximize2, Bed, Bath, Car, Star, ChevronRight, Menu, Globe, Instagram, Linkedin, ShieldCheck, Award, Lock, ShoppingBag, CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  const [lang, setLang] = useState<'es' | 'en'>('es');
  const [currentView, setCurrentView] = useState<'home' | 'catalog' | 'sell' | 'contact' | 'concierge'>('home');
  const [conciergeStep, setConciergeStep] = useState<'intro' | 'register' | 'store'>('intro');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isAIProcessing, setIsAIProcessing] = useState(false);
  const [filters, setFilters] = useState<FilterState>({ operacion: 'todos', tipo: 'todos', zona: 'todos', precioMax: '', query: '' });

  const t = TRANSLATIONS[lang];
  const featured = PROPIEDADES[0];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView, conciergeStep]);

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

  const PANTRY_ITEMS = [
    { id: 1, name: lang === 'es' ? 'Leche de Reserva Alpina' : 'Alpine Reserve Milk', desc: 'Pureza destilada de los picos más altos.', price: '$12.00', img: 'https://images.unsplash.com/photo-155058[...]'},
    { id: 2, name: lang === 'es' ? 'Huevos de Cosecha Dorada' : 'Golden Harvest Eggs', desc: 'Producción orgánica de libre pastoreo.', price: '$24.00', img: 'https://images.unsplash.com/photo-158272[...]'},
    { id: 3, name: lang === 'es' ? 'Pan de Masa Madre Artesanal' : 'Artisan Sourdough Bread', desc: 'Fermentación de 48 horas en horno de piedra.', price: '$18.00', img: 'https://images.unsplash.com/[...]'},
    { id: 4, name: lang === 'es' ? 'Queso de Trufa Envejecido' : 'Aged Truffle Cheese', desc: 'Curación premium con notas de bosque.', price: '$45.00', img: 'https://images.unsplash.com/photo-1486297[...]'},
  ];

  return (
    <div className="min-h-screen bg-[#011c16] text-white flex flex-col font-sans selection:bg-[#D4AF37] selection:text-black">
      {/* HEADER - CLEAN ALIGNMENT, NO GAPS */}
      <header className="fixed top-0 w-full z-[100] h-20 border-b border-white/5 backdrop-blur-2xl bg-[#011c16]/90">
        <div className="container mx-auto h-full px-6 lg:px-12 flex justify-between items-center">
          <div className="flex items-center gap-4 cursor-pointer group" onClick={() => setCurrentView('home')}>  
            <img 
              src="WhatsApp Image 2026-01-23 at 4.22.16 PM.jpeg" 
              className="w-12 h-12 rounded-full object-cover border border-[#D4AF37]/40 shadow-xl" 
              alt="" 
            />
            <div className="flex flex-col justify-center select-none">
              <h1 className="text-sm md:text-lg font-serif font-black tracking-tight group-hover:text-[#D4AF37] transition-colors leading-none uppercase whitespace-nowrap">
                MIGUEL ANGEL PÉREZ
              </h1>
              <span className="text-[10px] text-[#D4AF37] font-bold tracking-[0.25em] uppercase leading-tight mt-1 whitespace-nowrap opacity-80">
                EL CHEF INMOBILIARIO
              </span>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-10">
            {[
              { id: 'home', label: t.nav_home },
              { id: 'catalog', label: t.nav_properties },
              { id: 'sell', label: t.nav_sell },
              { id: 'concierge', label: lang === 'es' ? 'DESPENSA ÉLITE' : 'ELITE PANTRY' },
              { id: 'contact', label: t.nav_contact }
            ].map(item => (
              <button 
                key={item.id}
                onClick={() => {
                    setCurrentView(item.id as any);
                    if(item.id === 'concierge') setConciergeStep('intro');
                }}
                className={`text-[11px] font-black uppercase tracking-[0.2em] transition-all hover:text-[#D4AF37] relative ${currentView === item.id ? 'text-[#D4AF37]' : 'text-white/50'}`}
              >
                {item.label}
              </button>
            ))}
            <button 
              onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
              className="ml-4 text-[10px] font-black text-[#D4AF37] border border-[#D4AF37]/30 px-3 py-1 rounded-none hover:bg-[#D4AF37] hover:text-black transition-all"
            >
              {t.lang_toggle}
            </button>
          </nav>
          
          <button className="lg:hidden text-[#D4AF37]"><Menu size={24}/></button>
        </div>
      </header>

      {/* MAIN CONTENT - NO NESTED SCROLL */}
      <main className="flex-grow pt-20">
        <AnimatePresence mode="wait">
          {currentView === 'home' && (
            <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full">
              <section className="min-h-[calc(100vh-80px)] flex flex-col lg:flex-row w-full bg-[#011c16]">
                <div className="w-full lg:w-3/5 relative h-[50vh] lg:h-auto overflow-hidden bg-black">
                  <img src={featured.img} className="w-full h-full object-cover grayscale opacity-50 scale-100" alt="" />
                </div>
                <div className="w-full lg:w-2/5 flex flex-col justify-center px-8 lg:px-24 py-20 border-l border-white/5 bg-[#011c16]">
                   <div className="max-w-xl select-none">
                      <span className="text-[#D4AF37] text-[11px] font-black uppercase tracking-[0.7em] mb-6 block italic opacity-70 leading-none">{featured.zona}</span>
                      <h2 className="text-5xl lg:text-7xl font-serif font-black mb-10 tracking-tighter uppercase leading-[0.85] text-white">
                        {featured.titulo}
                      </h2>
                      <p className="text-white/60 text-sm leading-loose mb-14 font-medium tracking-wide uppercase max-w-sm">
                        La curaduría inmobiliaria más sofisticada de México. No solo buscamos espacios, diseñamos el menú de su próximo patrimonio con precisión de alta cocina.
                      </p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 border-y border-white/10 py-10">
                          {[
                            { icon: <Maximize2 size={16} strokeWidth={1} />, val: featured.metros, label: t.specs_meters },
                            { icon: <Bed size={16} strokeWidth={1} />, val: featured.recamaras, label: t.specs_rooms },
                            { icon: <Bath size={16} strokeWidth={1} />, val: featured.banos, label: t.specs_baths },
                            { icon: <Car size={16} strokeWidth={1} />, val: featured.estacionamientos, label: t.specs_parking }
                          ].map((item, idx) => (
                            <div key={idx} className="flex flex-col gap-1">
                                <div className="flex items-center gap-2 text-[#D4AF37]">{item.icon} <span className="text-xl font-serif font-bold">{item.val}</span></div>
                                <span className="text-[9px] uppercase tracking-[0.2em] text-white/30 font-black">{item.label}</span>
                            </div>
                          ))}
                      </div>

                      <button onClick={() => setSelectedProperty(featured)} className="btn-luxury-gold w-full lg:w-fit px-16 py-5 text-[11px]">
                        {t.hero_cta_primary}
                      </button>
                   </div>
                   
                   <div className="mt-20 pt-10 border-t border-white/5">
                      <p className="text-[12px] text-white/40 italic mb-3">"La visión de Miguel Angel Pérez redefine la excelencia inmobiliaria."</p>
                      <span className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.5em]">— LEYENDA DEL SECTOR</span>
                   </div>
                </div>
              </section>

              {/* STATS SECTION */}
              <section className="py-24 bg-[#011c16] border-y border-white/5">
                <div className="container mx-auto px-6 lg:px-12 grid grid-cols-2 lg:grid-cols-4 gap-12">
                   {[
                     { label: t.stat_transactions, val: '500+', icon: <ShieldCheck size={24}/> },
                     { label: t.stat_experience, val: '15+', icon: <Award size={24}/> },
                     { label: t.stat_clients, val: '120+', icon: <Star size={24}/> },
                     { label: 'Ubicaciones', val: '12', icon: <Globe size={24}/> }
                   ].map((s, i) => (
                     <div key={i} className="text-center group">
                        <div className="text-[#D4AF37] mb-6 flex justify-center">{s.icon}</div>
                        <div className="text-4xl font-serif font-black mb-2 tracking-tighter text-white">{s.val}</div>
                        <div className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 group-hover:text-white/60 transition-colors">{s.label}</div>
                     </div>
                   ))}
                </div>
              </section>
            </motion.div>
          )}

          {currentView === 'concierge' && (
            <motion.div key="concierge" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full">
              {conciergeStep === 'intro' && (
                <section className="min-h-[calc(100vh-80px)] flex flex-col lg:flex-row bg-[#011c16]">
                  <div className="w-full lg:w-1/2 grayscale relative overflow-hidden h-[40vh] lg:h-auto">
                    <img src="https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover opacity-30" alt="" />
                  </div>
                  <div className="w-full lg:w-1/2 p-10 lg:p-24 flex flex-col justify-center">
                    <span className="text-[#D4AF37] text-[11px] font-black uppercase tracking-[0.8em] mb-8 block italic">Personal Curatorship</span>
                    <h2 className="text-5xl lg:text-7xl font-serif font-black mb-8 uppercase tracking-tighter leading-none">LA DESPENSA <br/><span className="text-[#D4AF37]">ÉLITE</span></h2>
                    <p className="text-white/40 text-lg leading-loose mb-12 italic border-l-2 border-[#D4AF37] pl-10 max-w-lg">
                      "Para construir un imperio, uno debe primero cuidar los ingredientes básicos de su existencia. No es solo comida; es el combustible de las leyendas."
                    </p>
                    <button onClick={() => setConciergeStep('register')} className="btn-luxury-gold px-16 py-5 w-fit text-[11px]">
                      SOLICITAR ACCESO VIP
                    </button>
                  </div>
                </section>
              )}

              {conciergeStep === 'register' && (
                <section className="min-h-[calc(100vh-80px)] flex items-center justify-center p-8 lg:p-24 bg-[#011c16]">
                   <div className="max-w-xl w-full luxury-card p-12 lg:p-20 text-center relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-1 bg-[#D4AF37]" />
                      <Lock size={32} className="text-[#D4AF37] mx-auto mb-10 opacity-60" />
                      <h3 className="text-3xl font-serif font-black mb-6 uppercase tracking-tight">REGISTRO PRIVADO</h3>
                      <p className="text-white/30 text-[11px] uppercase tracking-[0.4em] mb-12 leading-loose">ACCESO RESTRINGIDO A CLIENTES PREMIUM.</p>
                      
                      <div className="space-y-10 text-left">
                        <div className="group">
                          <label className="text-[10px] font-black text-[#D4AF37] uppercase tracking-widest block mb-4 opacity-40 group-focus-within:opacity-100 transition-opacity">Nombre Titular</label>
                          <input type="text" className="w-full bg-transparent border-b border-white/10 py-3 outline-none focus:border-[#D4AF37] transition-all text-sm tracking-widest uppercase font-bold" />
                        </div>
                        <div className="group">
                          <label className="text-[10px] font-black text-[#D4AF37] uppercase tracking-widest block mb-4 opacity-40 group-focus-within:opacity-100 transition-opacity">Canal Directo</label>
                          <input type="email" className="w-full bg-transparent border-b border-white/10 py-3 outline-none focus:border-[#D4AF37] transition-all text-sm tracking-widest uppercase font-bold" />
                        </div>
                        <button onClick={() => setConciergeStep('store')} className="w-full btn-luxury-gold py-5 text-[11px]">
                          VALIDAR Y DESBLOQUEAR
                        </button>
                      </div>
                   </div>
                </section>
              )}

              {conciergeStep === 'store' && (
                <section className="container mx-auto px-6 lg:px-12 py-24 min-h-screen">
                  <div className="flex flex-col lg:flex-row justify-between items-end mb-20 gap-8 border-b border-white/10 pb-12">
                    <div>
                      <span className="text-[#D4AF37] text-[11px] font-black uppercase tracking-[1em] mb-4 block italic">Curated Assets</span>
                      <h2 className="text-5xl lg:text-8xl font-serif font-black uppercase tracking-tighter">ESENCIALES</h2>
                    </div>
                    <div className="flex items-center gap-4 text-[#D4AF37] text-[11px] font-black uppercase tracking-[0.3em] opacity-60">
                       <CheckCircle2 size={18} /> VERIFICADO POR EL CHEF
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {PANTRY_ITEMS.map(item => (
                      <div key={item.id} className="luxury-card group overflow-hidden border border-white/5 flex flex-col">
                        <div className="h-64 overflow-hidden relative">
                           <img src={item.img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" alt="" />
                           <div className="absolute inset-0 bg-black/50 group-hover:bg-transparent transition-all duration-700" />
                        </div>
                        <div className="p-10 flex flex-col flex-grow">
                          <h4 className="text-xl font-serif font-black text-white mb-3 uppercase tracking-tight">{item.name}</h4>
                          <p className="text-white/30 text-[11px] uppercase tracking-widest mb-10 leading-loose italic">{item.desc}</p>
                          <div className="mt-auto flex justify-between items-center pt-8 border-t border-white/10">
                            <span className="text-2xl font-black font-serif text-[#D4AF37]">{item.price}</span>
                            <button className="text-[10px] font-black text-white/40 hover:text-[#D4AF37] transition-all uppercase tracking-[0.5em] flex items-center gap-2">
                              ADQUIRIR <ShoppingBag size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </motion.div>
          )}

          {currentView === 'catalog' && (
            <motion.div key="catalog" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="container mx-auto px-6 lg:px-12 py-24">
              <div className="flex flex-col lg:flex-row justify-between items-end mb-20 gap-10">
                <div>
                  <span className="text-[#D4AF37] text-[11px] font-black uppercase tracking-[1em] mb-6 block italic">{t.catalog_title}</span>
                  <h2 className="text-5xl lg:text-7xl font-serif font-black uppercase tracking-tighter">PORTAFOLIO</h2>
                </div>
                <form onSubmit={handleAISearch} className="flex gap-4 border-b border-white/10 pb-2 w-full lg:w-96">
                  <input value={filters.query} onChange={e => setFilters({...filters, query: e.target.value})} placeholder={t.search_placeholder} className="bg-transparent text-[11px] uppercase tracking-widest border border-white/10 py-3 outline-none focus:border-[#D4AF37] transition-all" />
                  <button type="submit" className="text-[#D4AF37]">{isAIProcessing ? '...' : <ChevronRight size={20}/>}</button>
                </form>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {PROPIEDADES.map(p => <PropertyCard key={p.id} property={p} onViewDetails={setSelectedProperty} onToggleCompare={() => {}} isComparing={false} labels={{ rooms: t.specs_rooms, baths: t.specs_baths }} />)}
              </div>
            </motion.div>
          )}

          {currentView === 'sell' && (
            <motion.div key="sell" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="container mx-auto px-6 lg:px-12 py-32 flex flex-col items-center">
              <span className="text-[#D4AF37] text-[11px] font-black uppercase tracking-[1em] mb-8 block italic">Marketing Strategic</span>
              <h2 className="text-5xl lg:text-8xl font-serif font-black uppercase tracking-tighter text-center mb-20">VENDE CON DISTINCIÓN</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl">
                <div className="luxury-card p-12 lg:p-20 space-y-12">
                  <h3 className="text-2xl font-serif font-black uppercase text-[#D4AF37]">POSICIONAMIENTO GLOBAL</h3>
                  <p className="text-white/50 text-[12px] leading-loose uppercase tracking-widest font-medium">Combinamos precisión algorítmica y producción cinematográfica para posicionar su activo.
                  </p>
                  <button className="btn-luxury-gold w-full py-6 text-[12px]">SOLICITAR VALUACIÓN</button>
                </div>
                <div className="relative overflow-hidden grayscale aspect-[4/5] rounded-none shadow-2xl bg-black">
                   <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover" alt="" />
                </div>
              </div>
            </motion.div>
          )}

          {currentView === 'contact' && (
            <motion.div key="contact" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="container mx-auto px-6 lg:px-12 py-32 min-h-[60vh] flex items-center justify-center">
              <div className="text-center max-w-2xl">
                <span className="text-[#D4AF37] text-[11px] font-black uppercase tracking-[1em] mb-10 block italic">Concierge Channel</span>
                <h2 className="text-5xl lg:text-8xl font-serif font-black uppercase tracking-tighter mb-16">CONECTA AHORA</h2>
                <div className="flex flex-col md:flex-row gap-6 justify-center">
                   <a href="https://wa.me/14377768395" className="btn-luxury-gold px-16 py-6 text-[12px] flex items-center justify-center gap-4">
                     <MessageCircle size={20} /> WHATSAPP VIP
                   </a>
                   <a href="mailto:contacto@miguelangelperez.mx" className="px-16 py-6 text-[12px] font-black uppercase tracking-[0.5em] border border-white/10 hover:border-[#D4AF37] transition-all flex items-center justify-center">
                     CANAL OFICIAL
                   </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* FOOTER */}
      <footer className="bg-[#011c16] border-t border-white/5 pt-24 pb-12 mt-auto">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">
            <div className="md:col-span-6">
              <h4 className="text-white font-serif font-black text-xl mb-6 uppercase tracking-tighter">MIGUEL ANGEL PÉREZ <span className="text-[#D4AF37]">|</span> EL CHEF INMOBILIARIO</h4>
              <p className="text-white/30 text-[10px] uppercase tracking-[0.5em] leading-loose max-w-md">
                Curaduría de activos de alta gama y asesoría estratégica para inversores institucionales y privados de élite.
              </p>
              <div className="flex gap-8 mt-12">
                 <a href="#" className="text-white/20 hover:text-[#D4AF37] transition-colors"><Instagram size={24} /></a>
                 <a href="#" className="text-white/20 hover:text-[#D4AF37] transition-colors"><Linkedin size={24} /></a>
              </div>
            </div>
            <div className="md:col-span-3">
              <h5 className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.3em] mb-10 opacity-40">MENÚ</h5>
              <div className="flex flex-col gap-5">
                {['home', 'catalog', 'sell', 'concierge', 'contact'].map(view => (
                  <button key={view} onClick={() => setCurrentView(view as any)} className="text-[10px] text-white/30 hover:text-white uppercase tracking-widest text-left transition-colors font-bold">
                    {view.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
            <div className="md:col-span-3">
              <h5 className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.3em] mb-10 opacity-40">LEGAL</h5>
              <div className="flex flex-col gap-5">
                <button className="text-[10px] text-white/30 hover:text-white uppercase tracking-widest text-left font-bold">{t.footer_privacy}</button>
                <button className="text-[10px] text-white/30 hover:text-white uppercase tracking-widest text-left font-bold">{t.footer_terms}</button>
              </div>
            </div>
          </div>
          <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
            <span className="text-[10px] font-black text-white/10 uppercase tracking-[0.6em]">© 2027 MIGUEL ANGEL PÉREZ • {t.footer_rights}</span>
            <span className="text-[8px] font-black text-white/5 uppercase tracking-[0.4em]">ELITE ESTATE BY INTECNIAM</span>
          </div>
        </div>
      </footer>

      {/* DETAIL MODAL */}
      <AnimatePresence>
        {selectedProperty && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] flex items-center justify-center p-6 lg:p-16 bg-black/95 backdrop-blur-2xl">
            <div className="absolute inset-0" onClick={() => setSelectedProperty(null)} />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-[#011c16] w-full max-w-7xl relative overflow-hidden border border-white/10 grid grid-cols-[...]">
              <button onClick={() => setSelectedProperty(null)} className="absolute top-8 right-8 z-[210] text-white/20 hover:text-white p-4 transition-all"><X size={32}/></button>
              <div className="lg:col-span-5 h-[40vh] lg:h-auto overflow-hidden bg-black">
                <img src={selectedProperty.img} className="w-full h-full object-cover grayscale" alt="" />
              </div>
              <div className="lg:col-span-7 p-10 lg:p-20 flex flex-col">
                 <span className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[1em] mb-6 block italic">{selectedProperty.zona}</span>
                 <h2 className="text-4xl lg:text-7xl font-serif font-black mb-8 uppercase tracking-tighter leading-none">{selectedProperty.titulo}</h2>
                 <p className="text-4xl font-black text-[#D4AF37] mb-12 tracking-tighter">{FORMAT_PRICE(selectedProperty.precio)}</p>
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                    <div className="flex flex-col items-center bg-white/5 p-6 border border-white/10">
                      <Maximize2 size={20} className="text-[#D4AF37] mb-3" />
                      <span className="text-2xl font-serif font-black">{selectedProperty.metros}</span>
                      <span className="text-[9px] uppercase tracking-widest text-white/20 mt-2 font-black">M²</span>
                    </div>
                 </div>
                 <p className="text-white/50 text-xl leading-loose mb-16 italic border-l-4 border-[#D4AF37] pl-10">"{selectedProperty.descripcion}"</p>
                 <div className="mt-auto flex flex-col md:flex-row gap-6">
                    <button onClick={() => setSelectedProperty(null)} className="btn-luxury-gold flex-1 py-5 text-[11px]">{t.hero_cta_primary}</button>
                    <a href="https://wa.me/14377768395" className="px-12 border border-[#D4AF37]/30 text-[#D4AF37] flex items-center justify-center text-[11px] font-black uppercase tracking-[0.5em] hover:text-[#D4AF37] transition-all">CONTÁCTENOS</a>
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
