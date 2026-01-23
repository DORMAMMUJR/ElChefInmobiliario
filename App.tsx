
import React, { useState, useMemo, useEffect } from 'react';
import { Property, FilterState } from './types';
import { PROPIEDADES, TESTIMONIOS, SERVICIOS, FORMAT_PRICE, TRANSLATIONS } from './constants';
import { PropertyCard } from './components/PropertyCard';
import { parseUserSearchIntent } from './services/geminiService';
import { 
  Instagram, Linkedin, Facebook, Menu, X, MessageCircle, 
  MapPin, Sparkles, Headphones, Bed, Bath, 
  Maximize2, Info, ShieldCheck, Star, Users, Phone, Mail, ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  const [language, setLanguage] = useState<'es' | 'en'>('es');
  const [currentView, setCurrentView] = useState<'home' | 'catalog' | 'sell'>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [leadContext, setLeadContext] = useState<string | null>(null);
  const [isAIProcessing, setIsAIProcessing] = useState(false);
  const [leadStatus, setLeadStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const [filters, setFilters] = useState<FilterState>({ operacion: 'todos', tipo: 'todos', zona: 'todos', precioMax: '', query: '' });

  const t = TRANSLATIONS[language];

  // Branding constants
  const BRAND_NAME = "MIGUEL ANGEL PÉREZ";
  const BRAND_SUBTITLE = "El Chef Inmobiliario";

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  useEffect(() => {
    document.body.style.overflow = (selectedProperty || leadContext || isMenuOpen) ? 'hidden' : 'unset';
  }, [selectedProperty, leadContext, isMenuOpen]);

  const filteredProperties = useMemo(() => 
    PROPIEDADES.filter(p => (filters.operacion === 'todos' || p.operacion === filters.operacion) && 
                            (filters.tipo === 'todos' || p.tipo === filters.tipo)),
  [filters]);

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

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLeadStatus('sending');
    setTimeout(() => setLeadStatus('success'), 1500);
  };

  return (
    <div className="min-h-screen bg-[#011c16] flex flex-col selection:bg-[#D4AF37] selection:text-black">
      {/* HEADER - Compact for 1080p */}
      <header className="fixed top-0 w-full z-[100] bg-[#022c22]/98 backdrop-blur-2xl border-b border-white/5 h-20 md:h-24 flex items-center">
        <div className="container mx-auto px-6 max-w-7xl flex justify-between items-center">
          <div className="cursor-pointer group flex flex-col" onClick={() => setCurrentView('home')}>
            <h1 className="text-white text-lg md:text-xl font-serif font-bold tracking-tighter group-hover:text-[#D4AF37] transition-colors leading-none">{BRAND_NAME}</h1>
            <span className="text-[#D4AF37] text-[8px] md:text-[10px] uppercase tracking-[0.6em] font-black mt-1.5">{BRAND_SUBTITLE}</span>
          </div>
          
          <nav className="hidden lg:flex gap-10 xl:gap-14 text-[11px] xl:text-[13px] font-black uppercase tracking-[0.2em]">
            <button onClick={() => setCurrentView('home')} className={`nav-link ${currentView === 'home' ? 'text-[#D4AF37]' : 'text-white/70'}`}>{t.nav_home}</button>
            <button onClick={() => setCurrentView('catalog')} className={`nav-link ${currentView === 'catalog' ? 'text-[#D4AF37]' : 'text-white/70'}`}>{t.nav_properties}</button>
            <button onClick={() => setCurrentView('sell')} className={`nav-link ${currentView === 'sell' ? 'text-[#D4AF37]' : 'text-white/70'}`}>{t.nav_sell}</button>
          </nav>

          <div className="flex items-center gap-6">
            <button onClick={() => setLanguage(l => l === 'es' ? 'en' : 'es')} className="text-white/50 hover:text-[#D4AF37] text-[11px] font-black uppercase transition-all px-2 hover:scale-110">
              {language === 'es' ? 'EN' : 'ES'}
            </button>
            <a href="https://wa.me/14377768395" className="btn-luxury-gold px-6 py-3 text-[10px] xl:text-[12px] font-black uppercase tracking-widest hidden sm:flex gap-2 items-center rounded-sm">
              <MessageCircle size={16}/>{t.nav_cta}
            </a>
            <button className="lg:hidden text-white p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={28}/> : <Menu size={28}/>}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 1.1 }} 
            animate={{ opacity: 1, scale: 1 }} 
            exit={{ opacity: 0, scale: 1.1 }} 
            className="fixed inset-0 z-[150] bg-[#011c16] pt-24 px-10 flex flex-col items-center gap-12 overflow-y-auto custom-scrollbar"
          >
             <button onClick={() => setIsMenuOpen(false)} className="absolute top-8 right-8 text-white"><X size={32}/></button>
             <div className="flex flex-col items-center gap-12 py-10 w-full max-w-sm text-center">
                <button onClick={() => { setCurrentView('home'); setIsMenuOpen(false); }} className="text-3xl font-serif text-white uppercase tracking-tighter hover:text-[#D4AF37] transition-all">{t.nav_home}</button>
                <button onClick={() => { setCurrentView('catalog'); setIsMenuOpen(false); }} className="text-3xl font-serif text-white uppercase tracking-tighter hover:text-[#D4AF37] transition-all">{t.nav_properties}</button>
                <button onClick={() => { setCurrentView('sell'); setIsMenuOpen(false); }} className="text-3xl font-serif text-white uppercase tracking-tighter hover:text-[#D4AF37] transition-all">{t.nav_sell}</button>
                <div className="w-full h-px bg-white/10" />
                <a href="https://wa.me/14377768395" className="btn-luxury-gold w-full py-5 text-sm font-black uppercase tracking-widest text-center">Connect Concierge</a>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.main key={currentView} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-grow pt-20 md:pt-24">
          {currentView === 'home' && (
            <>
              {/* HERO - Above the fold optimized */}
              <section className="h-[calc(100vh-6rem)] md:h-[calc(100vh-6rem)] relative flex items-center justify-center text-center px-6 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=90&w=2000" className="absolute inset-0 w-full h-full object-cover scale-105 opacity-30" alt="Hero" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#011c16] via-[#011c16]/10 to-transparent" />
                <div className="relative z-10 max-w-5xl">
                  {/* Reduced scale title for 20% whitespace */}
                  <motion.h2 initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-6 tracking-tighter text-white uppercase leading-[0.9] mt-[-5vh]">
                    {t.hero_title}
                  </motion.h2>
                  <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="text-[#D4AF37] tracking-[0.4em] md:tracking-[0.6em] uppercase text-[10px] md:text-lg mb-10 font-medium">
                    {t.hero_subtitle}
                  </motion.p>
                  <button onClick={() => setCurrentView('catalog')} className="btn-luxury-gold px-12 md:px-14 py-4 md:py-5 text-[11px] font-black uppercase tracking-[0.4em] rounded-sm shadow-2xl">
                    {t.hero_cta}
                  </button>
                </div>
              </section>

              {/* STATS - Subtle and horizontal */}
              <section className="py-12 bg-[#022c22]/10 border-y border-white/5">
                <div className="container mx-auto px-6 max-w-7xl grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                  {[
                    { label: t.stat_transactions, val: '500+', icon: <ShieldCheck size={24} className="mx-auto mb-3 text-[#D4AF37]"/> },
                    { label: t.stat_experience, val: '15+', icon: <Star size={24} className="mx-auto mb-3 text-[#D4AF37]"/> },
                    { label: t.stat_clients, val: '120+', icon: <Users size={24} className="mx-auto mb-3 text-[#D4AF37]"/> },
                    { label: t.stat_locations, val: '12', icon: <MapPin size={24} className="mx-auto mb-3 text-[#D4AF37]"/> }
                  ].map((s, i) => (
                    <div key={i}>
                      {s.icon}
                      <div className="text-2xl md:text-3xl font-bold text-white tracking-tight leading-none mb-1">{s.val}</div>
                      <div className="text-[9px] md:text-[11px] uppercase tracking-widest text-white/40 font-black">{s.label}</div>
                    </div>
                  ))}
                </div>
              </section>

              {/* SERVICES - Curated Grid */}
              <section className="py-20 container mx-auto px-6 max-w-7xl">
                <div className="text-center mb-16">
                    <span className="text-[#D4AF37] text-[11px] font-black tracking-[0.6em] uppercase block mb-3 italic">Concierge excellence</span>
                    <h2 className="text-4xl md:text-6xl font-serif font-bold tracking-tighter uppercase text-white leading-none">{t.section_services}</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {SERVICIOS.map((s, i) => (
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} key={s.id} onClick={() => setLeadContext(s.titulo)} className="luxury-card p-10 text-center cursor-pointer group rounded-sm bg-[#022c22]/20 border border-white/5">
                      <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-500">{s.icono}</div>
                      <h3 className="text-xl md:text-2xl font-serif text-[#D4AF37] mb-4 uppercase tracking-tighter font-bold">{s.titulo}</h3>
                      <p className="text-white/50 text-[12px] md:text-[14px] uppercase tracking-[0.1em] leading-relaxed mb-8">{s.descripcion}</p>
                      <button className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.3em] border-b border-[#D4AF37]/30 pb-1">Details</button>
                    </motion.div>
                  ))}
                </div>
              </section>
            </>
          )}

          {currentView === 'catalog' && (
            <section className="py-16 container mx-auto px-6 max-w-7xl">
              <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
                <div>
                  <span className="text-[#D4AF37] text-[12px] font-black tracking-[0.6em] uppercase block mb-3">Elite Portfolio</span>
                  <h2 className="text-4xl md:text-7xl font-serif font-bold tracking-tighter uppercase text-white leading-none">{t.section_properties}</h2>
                </div>
                <div className="flex gap-4">
                  {['operacion', 'tipo'].map(f => (
                    <select key={f} value={(filters as any)[f]} onChange={e => setFilters({...filters, [f]: e.target.value})} className="bg-[#022c22] border border-white/10 px-6 py-3 text-[11px] font-black uppercase text-white outline-none focus:border-[#D4AF37] cursor-pointer transition-all rounded-sm">
                      <option value="todos">{f === 'operacion' ? t.filter_op : t.filter_type}</option>
                      {f === 'operacion' ? <><option value="Venta">VENTA</option><option value="Renta">RENTA</option></> : <><option value="Casa">RESIDENCIAS</option><option value="Departamento">DEPARTAMENTOS</option></>}
                    </select>
                  ))}
                </div>
              </div>
              
              <div className="mb-16 p-8 bg-white/[0.03] border border-white/5 rounded-sm">
                <form onSubmit={handleAISearch} className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="flex-1 w-full relative">
                    <input value={filters.query} onChange={e => setFilters({...filters, query: e.target.value})} placeholder={t.filter_ai_placeholder} className="w-full bg-transparent border-b border-white/10 py-4 text-sm md:text-xl uppercase outline-none focus:border-[#D4AF37] text-white tracking-widest transition-all" />
                    <Sparkles className="absolute right-0 top-1/2 -translate-y-1/2 w-6 h-6 text-[#D4AF37] opacity-40" />
                  </div>
                  <button type="submit" className="w-full md:w-auto btn-luxury-gold px-10 py-4 text-[11px] font-black uppercase tracking-widest whitespace-nowrap">
                    {isAIProcessing ? 'ANALYZING...' : 'CONSULT AI'}
                  </button>
                </form>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {filteredProperties.map(p => <PropertyCard key={p.id} property={p} onViewDetails={setSelectedProperty} labels={{ rooms: t.card_rooms, baths: t.card_baths, details: t.card_details }} isComparing={false} onToggleCompare={() => {}} />)}
              </div>
            </section>
          )}

          {currentView === 'sell' && (
            <section className="h-[calc(100vh-6rem)] md:h-[calc(100vh-6rem)] container mx-auto px-6 max-w-7xl flex items-center">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center w-full">
                {/* Balanced Image Block */}
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative group overflow-hidden max-h-[70vh] rounded-sm shadow-2xl">
                    <img src="https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-[2s]" alt="Sell" />
                    <div className="absolute -inset-4 border-2 border-[#D4AF37]/10 pointer-events-none group-hover:border-[#D4AF37]/30 transition-all duration-700" />
                </motion.div>
                
                {/* Balanced Text Block - Optimized for 1080p */}
                <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="flex flex-col justify-center">
                  <span className="text-[#D4AF37] tracking-[0.8em] text-[12px] font-black uppercase mb-6 block italic">Haute Couture Real Estate</span>
                  {/* Reduced Font Size for 20% negative space */}
                  <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 leading-[0.9] uppercase text-white tracking-tighter">Sell Luxury.</h2>
                  <p className="text-white/80 text-lg md:text-2xl font-light mb-8 leading-relaxed italic border-l-4 border-[#D4AF37] pl-8">
                    "Elevating your heritage into a legacy of desire for the global elite."
                  </p>
                  <p className="text-white/40 text-[12px] md:text-[14px] uppercase tracking-[0.2em] mb-10 leading-loose max-w-lg">
                    Our approach combines strategic digital targeting and absolute discretion for the world's most discerning investors.
                  </p>
                  {/* Compact CTA Group */}
                  <div className="flex gap-4">
                    <button onClick={() => setLeadContext('Elite Listing Appraisal')} className="btn-luxury-gold px-10 py-4 text-[11px] font-black uppercase tracking-[0.4em] rounded-sm">
                      APPRAISE PROPERTY
                    </button>
                  </div>
                </motion.div>
              </div>
            </section>
          )}
        </motion.main>
      </AnimatePresence>

      <footer className="bg-[#011c16] border-t border-white/5 pt-20 pb-12 mt-auto">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="flex flex-col">
              <h3 className="text-white font-serif font-bold text-xl mb-6 tracking-tighter uppercase leading-none">{BRAND_NAME}</h3>
              <p className="text-white/30 text-[10px] uppercase tracking-[0.4em] leading-loose mb-8">
                {BRAND_SUBTITLE}. Curating exclusive residential landscapes.
              </p>
              <div className="flex gap-6">
                 <a href="#" className="text-white/40 hover:text-[#D4AF37] transition-all"><Instagram size={20} /></a>
                 <a href="#" className="text-white/40 hover:text-[#D4AF37] transition-all"><Linkedin size={20} /></a>
                 <a href="#" className="text-white/40 hover:text-[#D4AF37] transition-all"><Facebook size={20} /></a>
              </div>
            </div>
            
            <div>
              <h4 className="text-[#D4AF37] text-[11px] font-black tracking-widest uppercase mb-8">{t.footer_offices}</h4>
              <ul className="space-y-4 text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">
                <li><button onClick={() => setCurrentView('home')} className="hover:text-white transition-colors">{t.nav_home}</button></li>
                <li><button onClick={() => setCurrentView('catalog')} className="hover:text-white transition-colors">{t.nav_properties}</button></li>
                <li><button onClick={() => setCurrentView('sell')} className="hover:text-white transition-colors">{t.nav_sell}</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-[#D4AF37] text-[11px] font-black tracking-widest uppercase mb-8">Hubs</h4>
              <div className="space-y-4 text-white/40 text-[10px] uppercase tracking-[0.2em] leading-loose">
                  <p>Reforma 250, CDMX</p>
                  <p>Masaryk, Polanco</p>
              </div>
            </div>
            
            <div className="flex flex-col">
              <h4 className="text-[#D4AF37] text-[11px] font-black tracking-widest uppercase mb-8">{t.footer_care}</h4>
              <div className="space-y-4">
                <a href="tel:+525512345678" className="flex items-center gap-4 text-white/40 hover:text-white transition-colors group">
                  <Phone size={18} className="text-[#D4AF37]"/>
                  <span className="text-[11px] font-bold uppercase tracking-widest">+52 55 1234 5678</span>
                </a>
                <a href="mailto:info@hola-group.mx" className="flex items-center gap-4 text-white/40 hover:text-white transition-colors group">
                  <Mail size={18} className="text-[#D4AF37]"/>
                  <span className="text-[11px] font-bold uppercase tracking-widest">concierge@hola-group.mx</span>
                </a>
              </div>
            </div>
          </div>
          
          <div className="text-center pt-12 border-t border-white/5 space-y-4">
            <p className="text-white/20 text-[10px] md:text-[12px] uppercase tracking-[0.8em]">© 2027 {BRAND_NAME} | {BRAND_SUBTITLE}. All Rights Reserved.</p>
            <p className="text-[#D4AF37]/30 text-[9px] uppercase tracking-[0.6em] font-black hover:text-[#D4AF37]/60 cursor-default transition-all">DESIGN & DEVELOPMENT BY INTECNIA</p>
          </div>
        </div>
      </footer>

      {/* MODALS - Strictly restricted height */}
      <AnimatePresence>
        {leadContext && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[300] flex items-center justify-center p-6 bg-black/98 backdrop-blur-3xl">
            <div className="absolute inset-0" onClick={() => setLeadContext(null)} />
            <motion.div 
              initial={{ y: 50, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              className="bg-[#022c22] border border-[#D4AF37]/30 p-10 md:p-16 max-w-2xl w-full relative z-10 shadow-2xl rounded-sm max-h-[85vh] overflow-y-auto custom-scrollbar"
            >
              <button onClick={() => setLeadContext(null)} className="absolute top-8 right-8 text-white/30 hover:text-white transition-colors"><X size={32}/></button>
              <h2 className="text-3xl md:text-5xl font-serif text-white mb-10 uppercase tracking-tighter leading-tight border-b border-white/10 pb-6">{leadStatus === 'success' ? (language === 'es' ? 'Recibido' : 'Success') : leadContext}</h2>
              {leadStatus === 'success' ? (
                <div className="text-center py-10">
                  <Sparkles size={60} className="text-[#D4AF37] mx-auto mb-8" />
                  <p className="text-white/60 text-[14px] md:text-[18px] tracking-[0.2em] uppercase leading-relaxed font-bold italic">"Your digital footprint is noted. Expect excellence in our response."</p>
                </div>
              ) : (
                <form onSubmit={handleLeadSubmit} className="space-y-8">
                  {['Full Name', 'Corporate Email', 'WhatsApp ID'].map(f => (
                    <input key={f} required placeholder={f} className="w-full bg-transparent border-b-2 border-white/20 py-4 text-xl font-light transition-all placeholder:text-white/5 outline-none focus:border-[#D4AF37] text-white" />
                  ))}
                  <button type="submit" className="w-full btn-luxury-gold py-6 text-[13px] md:text-[15px] font-black uppercase tracking-[0.5em] mt-8 rounded-sm shadow-2xl">{leadStatus === 'sending' ? 'CURATING...' : t.modal_request_btn}</button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}

        {selectedProperty && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-8 lg:p-12 glass-emerald">
            <div className="absolute inset-0" onClick={() => setSelectedProperty(null)} />
            <motion.div 
              initial={{ y: 80, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              className="bg-[#022c22] max-w-7xl w-full h-full lg:h-[85vh] overflow-hidden relative grid grid-cols-1 lg:grid-cols-12 border border-white/10 shadow-2xl rounded-sm"
            >
              <button onClick={() => setSelectedProperty(null)} className="absolute top-6 right-6 z-[320] bg-black/70 p-4 rounded-full text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all shadow-xl"><X size={24}/></button>
              <div className="lg:col-span-5 h-[250px] md:h-[400px] lg:h-full relative overflow-hidden bg-black/30">
                <img src={selectedProperty.img} className="w-full h-full object-cover" alt="Detail" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#022c22] to-transparent opacity-90" />
                <div className="absolute bottom-8 left-8">
                  <span className="bg-[#D4AF37] text-black px-8 py-3 text-[11px] font-black uppercase tracking-widest inline-block shadow-2xl rounded-sm">{selectedProperty.operacion.toUpperCase()}</span>
                </div>
              </div>
              <div className="lg:col-span-7 flex flex-col h-full bg-[#022c22] overflow-hidden relative">
                <div className="p-8 md:p-16 overflow-y-auto flex-1 custom-scrollbar">
                  <span className="text-[#D4AF37] text-[11px] font-black uppercase mb-6 block tracking-[0.8em] italic">{selectedProperty.zona}</span>
                  <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-8 tracking-tighter uppercase leading-[0.85] text-white border-l-8 border-[#D4AF37] pl-8">{selectedProperty.titulo}</h2>
                  <p className="text-3xl md:text-5xl font-bold text-[#D4AF37] mb-12 tracking-tighter">{FORMAT_PRICE(selectedProperty.precio)}</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-12">
                    {[{l: t.card_rooms, v: selectedProperty.recamaras, i: <Bed size={24}/>}, {l: t.card_baths, v: selectedProperty.banos, i: <Bath size={24}/>}, {l: 'Surface M²', v: selectedProperty.metros, i: <Maximize2 size={24}/>}, {l: 'Elite Ref.', v: 'VIP', i: <Info size={24}/>}].map((a,idx) => (
                      <div key={idx} className="bg-white/5 p-6 text-center border border-white/5 flex flex-col items-center justify-center group hover:bg-[#D4AF37]/10 transition-all cursor-default">
                        <div className="text-[#D4AF37] mb-3 opacity-100">{a.i}</div>
                        <div className="text-white text-2xl font-serif mb-1 leading-none">{a.v}</div>
                        <div className="text-[10px] uppercase tracking-widest text-white/30 font-black">{a.l}</div>
                      </div>
                    ))}
                  </div>
                  <div className="bg-white/[0.04] p-8 md:p-12 border-l-4 border-[#D4AF37] mb-12 shadow-inner">
                    <p className="text-white/80 font-serif leading-relaxed italic text-lg md:text-2xl lg:text-3xl">{selectedProperty.descripcion}</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
                    {selectedProperty.caracteristicas.map((c, i) => (
                      <div key={i} className="flex items-center gap-4 text-white/60">
                        <ChevronRight size={18} className="text-[#D4AF37]" />
                        <span className="text-[12px] md:text-[15px] font-bold uppercase tracking-[0.2em]">{c}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-8 md:p-12 border-t border-white/5 flex flex-col sm:flex-row gap-6 bg-[#022c22]/98 sticky bottom-0 z-20">
                  <button onClick={() => { setLeadContext(selectedProperty.titulo); setSelectedProperty(null); }} className="flex-1 btn-luxury-gold py-6 text-[13px] font-black uppercase tracking-[0.4em] rounded-sm shadow-2xl">REQUEST DOSSIER</button>
                  <a href={`https://wa.me/14377768395?text=Concierge Request: ${selectedProperty.titulo}`} target="_blank" className="flex-1 border-2 border-[#D4AF37]/50 text-white flex items-center justify-center gap-4 text-[13px] font-black uppercase tracking-[0.4em] hover:bg-[#D4AF37] hover:text-black transition-all rounded-sm">
                    <MessageCircle size={22}/>CONCIERGE
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed bottom-10 right-10 z-[150] group">
        <a href="https://wa.me/14377768395" target="_blank" className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center text-black shadow-2xl hover:scale-110 transition-transform relative">
          <Headphones size={28} />
          <span className="absolute -top-12 right-0 bg-white text-black text-[10px] font-black uppercase tracking-widest px-4 py-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-2xl border-b-4 border-[#D4AF37] rounded-sm italic">Concierge</span>
        </a>
      </div>
    </div>
  );
};

export default App;
