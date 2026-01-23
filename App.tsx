
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
      {/* HEADER */}
      <header className="fixed top-0 w-full z-[100] bg-[#022c22]/90 backdrop-blur-md border-b border-white/5 h-20 md:h-24 flex items-center">
        <div className="container mx-auto px-6 max-w-6xl flex justify-between items-center">
          <div className="cursor-pointer group flex flex-col" onClick={() => setCurrentView('home')}>
            <h1 className="text-white text-lg md:text-xl font-serif font-bold tracking-tighter group-hover:text-[#D4AF37] transition-colors leading-none">MIGUEL ANGEL PÉREZ</h1>
            <span className="text-[#D4AF37] text-[7px] md:text-[8px] uppercase tracking-[0.5em] font-black mt-1">El Chef Inmobiliario</span>
          </div>
          
          <nav className="hidden lg:flex gap-8 xl:gap-10 text-[9px] font-black uppercase tracking-[0.2em]">
            <button onClick={() => setCurrentView('home')} className={`nav-link ${currentView === 'home' ? 'text-[#D4AF37]' : 'text-white/70'}`}>{t.nav_home}</button>
            <button onClick={() => setCurrentView('catalog')} className={`nav-link ${currentView === 'catalog' ? 'text-[#D4AF37]' : 'text-white/70'}`}>{t.nav_properties}</button>
            <button onClick={() => setCurrentView('sell')} className={`nav-link ${currentView === 'sell' ? 'text-[#D4AF37]' : 'text-white/70'}`}>{t.nav_sell}</button>
          </nav>

          <div className="flex items-center gap-4">
            <button onClick={() => setLanguage(l => l === 'es' ? 'en' : 'es')} className="text-white/40 hover:text-[#D4AF37] text-[10px] font-black uppercase transition-colors px-2">{language.toUpperCase()}</button>
            <a href="https://wa.me/14377768395" className="btn-luxury-gold px-5 py-2.5 text-[9px] font-black uppercase tracking-widest hidden sm:flex gap-2 items-center rounded-sm"><MessageCircle size={14}/>WHATSAPP</a>
            <button className="lg:hidden text-white p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>{isMenuOpen ? <X size={24}/> : <Menu size={24}/>}</button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }} 
            animate={{ opacity: 1, x: 0 }} 
            exit={{ opacity: 0, x: '100%' }} 
            className="fixed inset-0 z-[150] bg-[#011c16] pt-24 px-10 flex flex-col items-center gap-10 overflow-y-auto custom-scrollbar"
          >
             <button onClick={() => setIsMenuOpen(false)} className="absolute top-8 right-8 text-white"><X size={32}/></button>
             <div className="flex flex-col items-center gap-12 py-10 w-full max-w-sm text-center">
                <button onClick={() => { setCurrentView('home'); setIsMenuOpen(false); }} className="text-3xl font-serif text-white uppercase tracking-tighter">Inicio</button>
                <button onClick={() => { setCurrentView('catalog'); setIsMenuOpen(false); }} className="text-3xl font-serif text-white uppercase tracking-tighter">Desarrollos</button>
                <button onClick={() => { setCurrentView('sell'); setIsMenuOpen(false); }} className="text-3xl font-serif text-white uppercase tracking-tighter">Vender</button>
                <div className="w-full h-px bg-white/10" />
                <a href="https://wa.me/14377768395" className="btn-luxury-gold w-full py-5 text-xs font-black uppercase tracking-widest text-center">Contactar Concierge</a>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.main key={currentView} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-grow pt-20 md:pt-24">
          {currentView === 'home' && (
            <>
              {/* HERO */}
              <section className="h-[70vh] md:h-[85vh] relative flex items-center justify-center text-center px-6 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=90&w=2000" className="absolute inset-0 w-full h-full object-cover scale-105 opacity-40" alt="Hero" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#011c16] to-transparent" />
                <div className="relative z-10 max-w-4xl">
                  <motion.h2 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-4xl md:text-7xl lg:text-8xl font-serif font-bold mb-4 tracking-tighter text-white uppercase leading-tight">{t.hero_title}</motion.h2>
                  <motion.p initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="text-[#D4AF37] tracking-[0.4em] md:tracking-[0.8em] uppercase text-[9px] md:text-base mb-10 font-medium">{t.hero_subtitle}</motion.p>
                  <button onClick={() => setCurrentView('catalog')} className="btn-luxury-gold px-10 md:px-14 py-4 md:py-5 text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] rounded-sm shadow-2xl">{t.hero_cta}</button>
                </div>
              </section>

              {/* STATS */}
              <section className="py-12 md:py-16 bg-[#022c22]/10 border-y border-white/5">
                <div className="container mx-auto px-6 max-w-6xl grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                  {[
                    { label: 'Transacciones', val: '500+', icon: <ShieldCheck size={20} className="mx-auto mb-3 text-[#D4AF37]"/> },
                    { label: 'Años Exp', val: '15+', icon: <Star size={20} className="mx-auto mb-3 text-[#D4AF37]"/> },
                    { label: 'Clientes VIP', val: '120+', icon: <Users size={20} className="mx-auto mb-3 text-[#D4AF37]"/> },
                    { label: 'Ubicaciones', val: '12', icon: <MapPin size={20} className="mx-auto mb-3 text-[#D4AF37]"/> }
                  ].map((s, i) => (
                    <div key={i}>
                      {s.icon}
                      <div className="text-xl md:text-2xl font-bold text-white tracking-tight">{s.val}</div>
                      <div className="text-[7px] md:text-[9px] uppercase tracking-widest text-white/30 font-bold">{s.label}</div>
                    </div>
                  ))}
                </div>
              </section>

              {/* SERVICES */}
              <section className="py-20 md:py-32 container mx-auto px-6 max-w-6xl">
                <div className="text-center mb-16 md:mb-24">
                    <span className="text-[#D4AF37] text-[10px] font-black tracking-[0.6em] uppercase block mb-4 italic">Alta Cocina Inmobiliaria</span>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold tracking-tighter uppercase text-white">{t.section_services}</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
                  {SERVICIOS.map((s, i) => (
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} key={s.id} onClick={() => setLeadContext(s.titulo)} className="luxury-card p-8 md:p-12 text-center cursor-pointer group rounded-sm bg-[#022c22]/20 border border-white/5 hover:border-[#D4AF37]/40">
                      <div className="text-4xl md:text-5xl mb-6 group-hover:scale-110 transition-transform">{s.icono}</div>
                      <h3 className="text-lg md:text-xl font-serif text-[#D4AF37] mb-3 uppercase tracking-tighter font-bold">{s.titulo}</h3>
                      <p className="text-white/40 text-[9px] md:text-[10px] uppercase tracking-[0.1em] leading-relaxed mb-6">{s.descripcion}</p>
                      <button className="text-[#D4AF37] text-[8px] font-black uppercase tracking-[0.3em] border-b border-[#D4AF37]/20 pb-1">Solicitar servicio</button>
                    </motion.div>
                  ))}
                </div>
              </section>
            </>
          )}

          {currentView === 'catalog' && (
            <section className="py-12 md:py-24 container mx-auto px-6 max-w-6xl">
              <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-16 gap-6">
                <div>
                  <span className="text-[#D4AF37] text-[10px] font-black tracking-[0.6em] uppercase block mb-2">Curaduría</span>
                  <h2 className="text-4xl md:text-6xl font-serif font-bold tracking-tighter uppercase text-white leading-none">{t.section_properties}</h2>
                </div>
                <div className="flex gap-3">
                  {['operacion', 'tipo'].map(f => (
                    <select key={f} value={(filters as any)[f]} onChange={e => setFilters({...filters, [f]: e.target.value})} className="bg-[#022c22] border border-white/10 px-4 py-3 text-[9px] font-black uppercase text-white outline-none focus:border-[#D4AF37] cursor-pointer transition-colors rounded-sm">
                      <option value="todos">{f === 'operacion' ? t.filter_op : t.filter_type}</option>
                      {f === 'operacion' ? <><option value="Venta">VENTA</option><option value="Renta">RENTA</option></> : <><option value="Casa">RESIDENCIAS</option><option value="Departamento">DEPARTAMENTOS</option></>}
                    </select>
                  ))}
                </div>
              </div>
              
              <div className="mb-16 p-6 md:p-10 bg-white/[0.02] border border-white/5 rounded-sm">
                <form onSubmit={handleAISearch} className="flex flex-col md:flex-row gap-4 items-center">
                  <div className="flex-1 w-full relative">
                    <input value={filters.query} onChange={e => setFilters({...filters, query: e.target.value})} placeholder={t.filter_ai_placeholder} className="w-full bg-transparent border-b border-white/10 py-3 text-xs md:text-sm uppercase outline-none focus:border-[#D4AF37] text-white tracking-widest transition-all" />
                    <Sparkles className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4AF37] opacity-40" />
                  </div>
                  <button type="submit" className="w-full md:w-auto btn-luxury-gold px-8 py-4 text-[9px] font-black uppercase tracking-widest whitespace-nowrap">
                    {isAIProcessing ? 'BUSCANDO...' : 'CONSULTAR AI'}
                  </button>
                </form>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
                {filteredProperties.map(p => <PropertyCard key={p.id} property={p} onViewDetails={setSelectedProperty} labels={{ rooms: t.card_rooms, baths: t.card_baths, details: t.card_details }} isComparing={false} onToggleCompare={() => {}} />)}
              </div>
            </section>
          )}

          {currentView === 'sell' && (
            <section className="py-20 md:py-32 container mx-auto px-6 max-w-6xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative group overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?auto=format&fit=crop&q=80&w=1000" className="w-full shadow-2xl relative z-10 grayscale hover:grayscale-0 transition-all duration-700" alt="Sell" />
                    <div className="absolute -inset-4 border-2 border-[#D4AF37]/10 pointer-events-none group-hover:border-[#D4AF37]/20 transition-all duration-500" />
                </motion.div>
                <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                  <span className="text-[#D4AF37] tracking-[0.6em] text-[11px] font-black uppercase mb-6 block">Mercado Global</span>
                  <h2 className="text-5xl md:text-7xl font-serif font-bold mb-8 leading-none uppercase text-white tracking-tighter">Venta de Alta Gama.</h2>
                  <p className="text-white/60 text-lg md:text-xl font-light mb-10 leading-relaxed italic">"Transformamos su propiedad en un objeto de deseo para el inversor más exigente."</p>
                  <p className="text-white/40 text-[10px] uppercase tracking-[0.2em] mb-10 leading-loose max-w-md">Estrategias de marketing disruptivo, pauta digital premium y una red de contactos exclusivas en CDMX y el extranjero.</p>
                  <button onClick={() => setLeadContext('Venta Premium')} className="btn-luxury-gold px-12 py-5 text-[11px] font-black uppercase tracking-[0.4em]">VALORAR MI PROPIEDAD</button>
                </motion.div>
              </div>
            </section>
          )}
        </motion.main>
      </AnimatePresence>

      <footer className="bg-[#011c16] border-t border-white/5 pt-20 pb-12 mt-auto">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="flex flex-col">
              <h3 className="text-white font-serif font-bold text-xl mb-6 tracking-tighter uppercase">MIGUEL ANGEL PÉREZ</h3>
              <p className="text-white/30 text-[8px] uppercase tracking-[0.3em] leading-loose mb-8">
                El Chef Inmobiliario. Curador de experiencias residenciales de ultra-lujo.
              </p>
              <div className="flex gap-5">
                 <a href="#" className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all"><Instagram size={14} /></a>
                 <a href="#" className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all"><Linkedin size={14} /></a>
                 <a href="#" className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all"><Facebook size={14} /></a>
              </div>
            </div>
            
            <div>
              <h4 className="text-[#D4AF37] text-[9px] font-black tracking-widest uppercase mb-8">Directorio</h4>
              <ul className="space-y-4 text-[9px] font-bold uppercase tracking-[0.2em] text-white/40">
                <li><button onClick={() => setCurrentView('home')} className="hover:text-white transition-colors">Inicio</button></li>
                <li><button onClick={() => setCurrentView('catalog')} className="hover:text-white transition-colors">Desarrollos</button></li>
                <li><button onClick={() => setCurrentView('sell')} className="hover:text-white transition-colors">Venta VIP</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-[#D4AF37] text-[9px] font-black tracking-widest uppercase mb-8">Ubicaciones</h4>
              <div className="space-y-4 text-white/40 text-[8px] uppercase tracking-[0.2em] leading-loose">
                  <p>Paseo de la Reforma 250, CDMX</p>
                  <p>Polanco, CDMX, 11560</p>
              </div>
            </div>
            
            <div className="flex flex-col">
              <h4 className="text-[#D4AF37] text-[9px] font-black tracking-widest uppercase mb-8">Contacto</h4>
              <div className="space-y-3">
                <a href="tel:+525512345678" className="flex items-center gap-4 text-white/40 hover:text-white transition-colors">
                  <Phone size={14} className="text-[#D4AF37]"/>
                  <span className="text-[9px] font-bold uppercase tracking-widest">+52 55 1234 5678</span>
                </a>
                <a href="mailto:info@hola-group.mx" className="flex items-center gap-4 text-white/40 hover:text-white transition-colors">
                  <Mail size={14} className="text-[#D4AF37]"/>
                  <span className="text-[9px] font-bold uppercase tracking-widest">info@hola-group.mx</span>
                </a>
              </div>
            </div>
          </div>
          
          <div className="text-center pt-12 border-t border-white/5 space-y-3">
            <p className="text-white/20 text-[8px] md:text-[9px] uppercase tracking-[0.8em]">© 2027 Miguel Angel Pérez | El Chef Inmobiliario. All Rights Reserved.</p>
            <p className="text-[#D4AF37]/40 text-[7px] md:text-[8px] uppercase tracking-[0.5em] font-black">DESIGN & DEVELOPMENT BY INTECNIA</p>
          </div>
        </div>
      </footer>

      {/* MODALS */}
      <AnimatePresence>
        {leadContext && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl">
            <div className="absolute inset-0" onClick={() => setLeadContext(null)} />
            <motion.div 
              initial={{ y: 20, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              className="bg-[#022c22] border border-[#D4AF37]/20 p-8 md:p-12 max-w-lg w-full relative z-10 shadow-2xl rounded-sm max-h-[90vh] overflow-y-auto custom-scrollbar"
            >
              <button onClick={() => setLeadContext(null)} className="absolute top-6 right-6 text-white/20 hover:text-white transition-colors"><X size={24}/></button>
              <h2 className="text-2xl font-serif text-white mb-8 uppercase tracking-tighter leading-tight">{leadStatus === 'success' ? 'Enviado' : leadContext}</h2>
              {leadStatus === 'success' ? (
                <div className="text-center py-6">
                  <Sparkles size={36} className="text-[#D4AF37] mx-auto mb-4" />
                  <p className="text-white/50 text-[10px] tracking-widest uppercase leading-relaxed font-bold">Un concierge asignado le contactará para dar seguimiento a su requerimiento.</p>
                </div>
              ) : (
                <form onSubmit={handleLeadSubmit} className="space-y-6">
                  {['Nombre', 'Email', 'Teléfono'].map(f => (
                    <input key={f} required placeholder={f} className="w-full bg-transparent border-b border-white/10 py-3 text-white outline-none focus:border-[#D4AF37] text-sm font-light transition-all" />
                  ))}
                  <button type="submit" className="w-full btn-luxury-gold py-5 text-[10px] font-black uppercase tracking-[0.3em] mt-6">{leadStatus === 'sending' ? 'PROCESANDO...' : 'ENVIAR SOLICITUD'}</button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}

        {selectedProperty && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-12 glass-emerald">
            <div className="absolute inset-0" onClick={() => setSelectedProperty(null)} />
            <motion.div 
              initial={{ y: 50, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              className="bg-[#022c22] max-w-6xl w-full h-full lg:h-[80vh] overflow-hidden relative grid grid-cols-1 lg:grid-cols-12 border border-white/5 shadow-2xl rounded-sm"
            >
              <button onClick={() => setSelectedProperty(null)} className="absolute top-6 right-6 z-[320] bg-black/40 p-3 rounded-full text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all"><X size={18}/></button>
              <div className="lg:col-span-5 h-[220px] sm:h-[300px] lg:h-full relative overflow-hidden bg-black/20">
                <img src={selectedProperty.img} className="w-full h-full object-cover" alt="Detail" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#022c22] to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <span className="bg-[#D4AF37] text-black px-4 py-1 text-[9px] font-black uppercase tracking-widest inline-block shadow-2xl">{selectedProperty.operacion}</span>
                </div>
              </div>
              <div className="lg:col-span-7 flex flex-col h-full bg-[#022c22] overflow-hidden relative">
                <div className="p-6 md:p-12 overflow-y-auto flex-1 custom-scrollbar">
                  <span className="text-[#D4AF37] text-[9px] font-black uppercase mb-4 tracking-[0.6em] block">{selectedProperty.zona}</span>
                  <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6 tracking-tighter uppercase leading-tight text-white border-l-4 border-[#D4AF37] pl-6 md:pl-8">{selectedProperty.titulo}</h2>
                  <p className="text-2xl md:text-4xl font-bold text-[#D4AF37] mb-8 md:mb-10 tracking-tighter">{FORMAT_PRICE(selectedProperty.precio)}</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4 mb-10">
                    {[{l: 'Hab.', v: selectedProperty.recamaras, i: <Bed size={16}/>}, {l: 'Baños', v: selectedProperty.banos, i: <Bath size={16}/>}, {l: 'M²', v: selectedProperty.metros, i: <Maximize2 size={16}/>}, {l: 'Ref', v: 'A+', i: <Info size={16}/>}].map((a,idx) => (
                      <div key={idx} className="bg-white/5 p-4 text-center border border-white/5 flex flex-col items-center justify-center group">
                        <div className="text-[#D4AF37] mb-2 opacity-60">{a.i}</div>
                        <div className="text-white text-xl font-serif">{a.v}</div>
                        <div className="text-[7px] uppercase tracking-widest text-white/30 font-bold mt-1">{a.l}</div>
                      </div>
                    ))}
                  </div>
                  <div className="bg-white/[0.02] p-6 md:p-10 border-l-2 border-[#D4AF37] mb-8 shadow-inner">
                    <p className="text-white/70 font-serif leading-relaxed italic text-sm md:text-lg">{selectedProperty.descripcion}</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pb-8">
                    {selectedProperty.caracteristicas.map((c, i) => (
                      <div key={i} className="flex items-center gap-3 text-white/50">
                        <ChevronRight size={12} className="text-[#D4AF37]" />
                        <span className="text-[9px] font-bold uppercase tracking-widest">{c}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-6 md:p-10 border-t border-white/5 flex flex-col sm:flex-row gap-4 bg-[#022c22]/95 sticky bottom-0 z-20">
                  <button onClick={() => { setLeadContext(selectedProperty.titulo); setSelectedProperty(null); }} className="flex-1 btn-luxury-gold py-5 text-[10px] font-black uppercase tracking-[0.3em] rounded-sm shadow-xl">CONTACTAR AHORA</button>
                  <a href={`https://wa.me/14377768395?text=Dossier de: ${selectedProperty.titulo}`} target="_blank" className="flex-1 border border-[#D4AF37]/40 text-white flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#D4AF37] hover:text-black transition-all rounded-sm">
                    <MessageCircle size={16}/>WHATSAPP
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed bottom-10 right-10 z-[150] group">
        <a href="https://wa.me/14377768395" target="_blank" className="w-14 h-14 md:w-16 md:h-16 bg-[#D4AF37] rounded-full flex items-center justify-center text-black shadow-2xl hover:scale-110 transition-transform relative">
          <Headphones size={22} className="md:size-[26px]" />
          <span className="absolute -top-10 right-0 bg-white text-black text-[7px] font-black uppercase tracking-widest px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl border-b-2 border-[#D4AF37]">Concierge</span>
        </a>
      </div>
    </div>
  );
};

export default App;
