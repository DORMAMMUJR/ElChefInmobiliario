
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
    <div className="min-h-screen bg-[#011c16] flex flex-col">
      {/* HEADER */}
      <header className="fixed top-0 w-full z-[100] bg-[#022c22]/90 backdrop-blur-md border-b border-white/5 h-20 md:h-24 flex items-center">
        <div className="container mx-auto px-6 max-w-7xl flex justify-between items-center">
          <div className="cursor-pointer group flex flex-col" onClick={() => setCurrentView('home')}>
            <h1 className="text-white text-lg md:text-xl font-serif font-bold tracking-tighter group-hover:text-[#D4AF37] transition-colors leading-none">MIGUEL ANGEL PÉREZ</h1>
            <span className="text-[#D4AF37] text-[7px] md:text-[8px] uppercase tracking-[0.5em] font-black mt-1">El Chef Inmobiliario</span>
          </div>
          
          <nav className="hidden lg:flex gap-8 xl:gap-12 text-[9px] font-black uppercase tracking-[0.2em]">
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
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="fixed inset-0 z-[150] bg-[#011c16] pt-32 px-10 flex flex-col items-center gap-10">
             <button onClick={() => setIsMenuOpen(false)} className="absolute top-8 right-8 text-white"><X size={32}/></button>
             <button onClick={() => { setCurrentView('home'); setIsMenuOpen(false); }} className="text-3xl font-serif text-white uppercase tracking-tighter">Inicio</button>
             <button onClick={() => { setCurrentView('catalog'); setIsMenuOpen(false); }} className="text-3xl font-serif text-white uppercase tracking-tighter">Desarrollos</button>
             <button onClick={() => { setCurrentView('sell'); setIsMenuOpen(false); }} className="text-3xl font-serif text-white uppercase tracking-tighter">Vender</button>
             <a href="https://wa.me/14377768395" className="btn-luxury-gold w-full py-5 text-xs font-black uppercase tracking-widest text-center mt-10">Contactar Concierge</a>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.main key={currentView} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-grow pt-24 md:pt-32">
          {currentView === 'home' && (
            <>
              {/* HERO */}
              <section className="h-[75vh] md:h-[85vh] relative flex items-center justify-center text-center px-6 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=90&w=2000" className="absolute inset-0 w-full h-full object-cover scale-105 opacity-50" alt="Hero" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#011c16] via-[#011c16]/30 to-transparent" />
                <div className="relative z-10 max-w-4xl">
                  <motion.h2 initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="text-4xl md:text-7xl lg:text-8xl font-serif font-bold mb-6 tracking-tighter text-white leading-tight uppercase">{t.hero_title}</motion.h2>
                  <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="text-[#D4AF37] tracking-[0.4em] md:tracking-[0.8em] uppercase text-[10px] md:text-base mb-12 font-medium">{t.hero_subtitle}</motion.p>
                  <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6 }}>
                    <button onClick={() => setCurrentView('catalog')} className="btn-luxury-gold px-10 md:px-14 py-4 md:py-5 text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] rounded-sm">{t.hero_cta}</button>
                  </motion.div>
                </div>
              </section>

              {/* STATS - LLENADO DE ESPACIO */}
              <section className="py-12 md:py-20 bg-[#022c22]/20 border-y border-white/5 relative">
                <div className="container mx-auto px-6 max-w-7xl grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                  {[
                    { label: 'Transacciones', val: '500+', icon: <ShieldCheck size={24} className="mx-auto mb-4 text-[#D4AF37]"/> },
                    { label: 'Años Exp', val: '15+', icon: <Star size={24} className="mx-auto mb-4 text-[#D4AF37]"/> },
                    { label: 'Clientes VIP', val: '120+', icon: <Users size={24} className="mx-auto mb-4 text-[#D4AF37]"/> },
                    { label: 'Ubicaciones', val: '12', icon: <MapPin size={24} className="mx-auto mb-4 text-[#D4AF37]"/> }
                  ].map((s, i) => (
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} key={i}>
                      {s.icon}
                      <div className="text-2xl md:text-3xl font-bold text-white tracking-tighter">{s.val}</div>
                      <div className="text-[8px] md:text-[10px] uppercase tracking-widest text-white/40 mt-1 font-bold">{s.label}</div>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* SERVICES - AJUSTE DE TAMAÑO EN PC */}
              <section className="py-24 md:py-32 container mx-auto px-6 max-w-7xl">
                <div className="text-center mb-20">
                    <span className="text-[#D4AF37] text-[10px] font-black tracking-[0.6em] uppercase block mb-4">Servicios Concierge</span>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold tracking-tighter uppercase text-white">{t.section_services}</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 xl:gap-12">
                  {SERVICIOS.map((s, i) => (
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} key={s.id} onClick={() => setLeadContext(s.titulo)} className="luxury-card p-10 md:p-12 text-center cursor-pointer group rounded-sm">
                      <div className="text-5xl mb-8 group-hover:scale-110 transition-transform duration-500">{s.icono}</div>
                      <h3 className="text-xl md:text-2xl font-serif text-[#D4AF37] mb-4 uppercase tracking-tighter">{s.titulo}</h3>
                      <p className="text-white/60 text-[10px] md:text-[11px] uppercase tracking-[0.15em] leading-relaxed mb-8">{s.descripcion}</p>
                      <button className="text-[#D4AF37] text-[9px] font-black uppercase tracking-widest border-b border-[#D4AF37]/30 pb-1 group-hover:border-[#D4AF37] transition-all">Saber más</button>
                    </motion.div>
                  ))}
                </div>
              </section>
            </>
          )}

          {currentView === 'catalog' && (
            <section className="py-16 md:py-24 container mx-auto px-6 max-w-7xl">
              <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                <div>
                  <span className="text-[#D4AF37] text-[11px] font-black tracking-[0.6em] uppercase block mb-3">Curaduría</span>
                  <h2 className="text-5xl md:text-6xl font-serif font-bold tracking-tighter uppercase text-white leading-none">{t.section_properties}</h2>
                </div>
                <div className="flex gap-4">
                  {['operacion', 'tipo'].map(f => (
                    <select key={f} value={(filters as any)[f]} onChange={e => setFilters({...filters, [f]: e.target.value})} className="bg-[#022c22] border border-white/10 px-6 py-4 text-[10px] font-black uppercase text-white outline-none focus:border-[#D4AF37] cursor-pointer transition-colors rounded-sm">
                      <option value="todos">{f === 'operacion' ? t.filter_op : t.filter_type}</option>
                      {f === 'operacion' ? <><option value="Venta">VENTA</option><option value="Renta">RENTA</option></> : <><option value="Casa">RESIDENCIAS</option><option value="Departamento">DEPARTAMENTOS</option></>}
                    </select>
                  ))}
                </div>
              </div>
              
              {/* BUSCADOR AI - AJUSTE ESTÉTICO */}
              <div className="mb-20 p-8 md:p-12 bg-white/[0.03] border border-white/5 rounded-sm backdrop-blur-sm">
                <form onSubmit={handleAISearch} className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="flex-1 w-full relative">
                    <input value={filters.query} onChange={e => setFilters({...filters, query: e.target.value})} placeholder={t.filter_ai_placeholder} className="w-full bg-transparent border-b border-white/20 py-4 text-[13px] md:text-[14px] uppercase outline-none focus:border-[#D4AF37] text-white tracking-widest transition-all" />
                    <Sparkles className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4AF37] opacity-40" />
                  </div>
                  <button type="submit" className="w-full md:w-auto btn-luxury-gold px-10 py-4 text-[10px] font-black uppercase tracking-widest whitespace-nowrap">
                    {isAIProcessing ? 'BUSCANDO...' : 'CONSULTAR AI'}
                  </button>
                </form>
              </div>

              {/* GRID DE PROPIEDADES - OPTIMIZADO PARA PC (3 Columnas) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 xl:gap-14">
                {filteredProperties.map(p => <PropertyCard key={p.id} property={p} onViewDetails={setSelectedProperty} labels={{ rooms: t.card_rooms, baths: t.card_baths, details: t.card_details }} isComparing={false} onToggleCompare={() => {}} />)}
              </div>
            </section>
          )}

          {currentView === 'sell' && (
            <section className="py-24 container mx-auto px-6 max-w-7xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} className="relative group">
                    <img src="https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?auto=format&fit=crop&q=80&w=1000" className="w-full shadow-2xl relative z-10 grayscale hover:grayscale-0 transition-all duration-1000" alt="Sell" />
                    <div className="absolute -inset-4 border-2 border-[#D4AF37]/10 pointer-events-none group-hover:border-[#D4AF37]/30 transition-all duration-700" />
                </motion.div>
                <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                  <span className="text-[#D4AF37] tracking-[0.8em] text-[12px] font-black uppercase mb-8 block">Exclusividad Garantizada</span>
                  <h2 className="text-5xl md:text-7xl font-serif font-bold mb-8 leading-none uppercase text-white tracking-tighter">Marketing de Alta Cocina.</h2>
                  <p className="text-white/70 text-lg md:text-xl font-light mb-12 leading-relaxed italic">"Vender una propiedad de lujo no es solo un trámite, es una curaduría de detalles donde cada prospecto es un invitado a una experiencia inigualable."</p>
                  <p className="text-white/50 text-[11px] uppercase tracking-[0.2em] mb-12 leading-loose max-w-lg">Nuestra metodología une la precisión del marketing digital avanzado con la discreción absoluta y el trato personal de un servicio Concierge.</p>
                  <button onClick={() => setLeadContext('Venta Premium')} className="btn-luxury-gold px-12 py-5 text-[11px] font-black uppercase tracking-[0.4em]">VALORAR MI PROPIEDAD</button>
                </motion.div>
              </div>
            </section>
          )}
        </motion.main>
      </AnimatePresence>

      {/* FOOTER COMPLETO - REGRESADO SEGÚN SOLICITUD */}
      <footer className="bg-[#011c16] border-t border-white/5 pt-24 pb-12 mt-10">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 xl:gap-20 mb-20">
            {/* Branding & Redes */}
            <div className="flex flex-col">
              <h3 className="text-white font-serif font-bold text-2xl mb-6 tracking-tighter uppercase">MIGUEL ANGEL PÉREZ</h3>
              <p className="text-white/40 text-[9px] uppercase tracking-[0.4em] leading-loose mb-10">
                Liderazgo y visión estratégica en Real Estate de lujo. HG Hola Group Property Advisors.
              </p>
              <div className="flex gap-6 mt-auto">
                 <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all"><Instagram size={18} /></a>
                 <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all"><Linkedin size={18} /></a>
                 <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all"><Facebook size={18} /></a>
              </div>
            </div>
            
            {/* Navegación */}
            <div>
              <h4 className="text-[#D4AF37] text-[10px] font-black tracking-widest uppercase mb-8">Navegación</h4>
              <ul className="space-y-4 text-[9px] font-bold uppercase tracking-[0.3em] text-white/50">
                <li><button onClick={() => setCurrentView('home')} className="hover:text-white transition-colors flex items-center gap-2 group"><ChevronRight size={10} className="text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-all"/> {t.nav_home}</button></li>
                <li><button onClick={() => setCurrentView('catalog')} className="hover:text-white transition-colors flex items-center gap-2 group"><ChevronRight size={10} className="text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-all"/> {t.nav_properties}</button></li>
                <li><button onClick={() => setCurrentView('sell')} className="hover:text-white transition-colors flex items-center gap-2 group"><ChevronRight size={10} className="text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-all"/> {t.nav_sell}</button></li>
              </ul>
            </div>
            
            {/* Ubicaciones */}
            <div>
              <h4 className="text-[#D4AF37] text-[10px] font-black tracking-widest uppercase mb-8">Ubicaciones</h4>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <MapPin size={16} className="text-[#D4AF37] shrink-0 mt-1"/>
                  <p className="text-white/50 text-[9px] uppercase tracking-widest leading-relaxed">Paseo de la Reforma 250,<br/>CDMX, 06600</p>
                </div>
                <div className="flex gap-4">
                  <MapPin size={16} className="text-[#D4AF37] shrink-0 mt-1"/>
                  <p className="text-white/50 text-[9px] uppercase tracking-widest leading-relaxed">Presidente Masaryk 120,<br/>Polanco, 11560</p>
                </div>
              </div>
            </div>
            
            {/* Contacto Directo */}
            <div className="flex flex-col">
              <h4 className="text-[#D4AF37] text-[10px] font-black tracking-widest uppercase mb-8">Contacto</h4>
              <div className="space-y-4">
                <a href="tel:+525512345678" className="flex items-center gap-4 text-white/50 hover:text-white transition-colors group">
                  <Phone size={16} className="text-[#D4AF37] group-hover:scale-110 transition-transform"/>
                  <span className="text-[9px] font-bold uppercase tracking-widest">+52 55 1234 5678</span>
                </a>
                <a href="mailto:concierge@hola-group.mx" className="flex items-center gap-4 text-white/50 hover:text-white transition-colors group">
                  <Mail size={16} className="text-[#D4AF37] group-hover:scale-110 transition-transform"/>
                  <span className="text-[9px] font-bold uppercase tracking-widest">concierge@hola-group.mx</span>
                </a>
              </div>
              <button onClick={() => setLeadContext('Newsletter Privado')} className="mt-10 bg-white/5 border border-white/10 px-6 py-3 text-[8px] font-black uppercase tracking-[0.3em] hover:border-[#D4AF37] transition-all text-white/60">Suscripción VIP</button>
            </div>
          </div>
          
          <div className="text-center pt-16 border-t border-white/5">
            <p className="text-white/20 text-[8px] md:text-[9px] uppercase tracking-[0.8em]">© 2024 Miguel Angel Pérez | El Chef Inmobiliario. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      {/* MODALS (Sin cambios estructurales, solo pulido estético) */}
      <AnimatePresence>
        {leadContext && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl">
            <div className="absolute inset-0" onClick={() => setLeadContext(null)} />
            <motion.div initial={{ y: 30, scale: 0.98 }} animate={{ y: 0, scale: 1 }} className="bg-[#022c22] border border-[#D4AF37]/30 p-10 md:p-16 max-w-lg w-full relative z-10 shadow-2xl rounded-sm">
              <button onClick={() => setLeadContext(null)} className="absolute top-6 right-6 text-white/30 hover:text-white transition-colors"><X size={24}/></button>
              <h2 className="text-3xl font-serif text-white mb-8 uppercase tracking-tighter leading-tight">{leadStatus === 'success' ? 'Solicitud Recibida' : leadContext}</h2>
              {leadStatus === 'success' ? (
                <div className="text-center py-6">
                  <Sparkles size={40} className="text-[#D4AF37] mx-auto mb-6" />
                  <p className="text-white/60 text-[11px] tracking-widest uppercase leading-relaxed font-bold">Un asesor concierge se pondrá en contacto con usted en breve para una atención personalizada.</p>
                </div>
              ) : (
                <form onSubmit={handleLeadSubmit} className="space-y-6">
                  {['Nombre Completo', 'Email Corporativo', 'WhatsApp'].map(f => (
                    <div key={f}>
                      <input required placeholder={f} className="w-full bg-transparent border-b border-white/10 py-3 text-white outline-none focus:border-[#D4AF37] text-sm md:text-base font-light transition-all placeholder:text-white/20" />
                    </div>
                  ))}
                  <button type="submit" className="w-full btn-luxury-gold py-5 text-[11px] font-black uppercase tracking-[0.3em] mt-6">{leadStatus === 'sending' ? 'ENVIANDO...' : 'SOLICITAR INFORMACIÓN'}</button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}

        {selectedProperty && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-8 lg:p-12 glass-emerald">
            <div className="absolute inset-0" onClick={() => setSelectedProperty(null)} />
            <motion.div initial={{ y: 50, scale: 0.95 }} animate={{ y: 0, scale: 1 }} className="bg-[#022c22] max-w-7xl w-full h-full lg:h-[85vh] overflow-hidden relative grid grid-cols-1 lg:grid-cols-12 border border-[#D4AF37]/20 shadow-2xl rounded-sm">
              <button onClick={() => setSelectedProperty(null)} className="absolute top-6 right-6 z-[320] bg-black/50 p-3 rounded-full text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all shadow-xl"><X size={20}/></button>
              <div className="lg:col-span-5 h-[300px] lg:h-full relative overflow-hidden bg-black/20">
                <img src={selectedProperty.img} className="w-full h-full object-cover" alt="Detail" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#022c22] to-transparent" />
                <div className="absolute bottom-10 left-10">
                  <span className="bg-[#D4AF37] text-black px-6 py-2 text-[10px] font-black uppercase tracking-widest inline-block shadow-2xl">{selectedProperty.operacion}</span>
                </div>
              </div>
              <div className="lg:col-span-7 flex flex-col h-full bg-[#022c22] overflow-hidden relative">
                <div className="p-8 md:p-16 overflow-y-auto flex-1 custom-scrollbar">
                  <span className="text-[#D4AF37] text-[10px] font-black uppercase mb-4 tracking-[0.6em] block">{selectedProperty.zona}</span>
                  <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8 tracking-tighter uppercase leading-tight text-white border-l-4 border-[#D4AF37] pl-8">{selectedProperty.titulo}</h2>
                  <p className="text-3xl md:text-5xl font-bold text-[#D4AF37] mb-12 tracking-tighter">{FORMAT_PRICE(selectedProperty.precio)}</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
                    {[{l: 'Hab.', v: selectedProperty.recamaras, i: <Bed size={18}/>}, {l: 'Baños', v: selectedProperty.banos, i: <Bath size={18}/>}, {l: 'M²', v: selectedProperty.metros, i: <Maximize2 size={18}/>}, {l: 'Ref', v: 'A+', i: <Info size={18}/>}].map((a,idx) => (
                      <div key={idx} className="bg-white/5 p-5 text-center border border-white/5 flex flex-col items-center justify-center group hover:border-[#D4AF37]/30 transition-all">
                        <div className="text-[#D4AF37] mb-3 opacity-60 group-hover:opacity-100 transition-opacity">{a.i}</div>
                        <div className="text-white text-2xl font-serif">{a.v}</div>
                        <div className="text-[8px] uppercase tracking-widest text-white/30 font-bold mt-1">{a.l}</div>
                      </div>
                    ))}
                  </div>
                  <div className="bg-white/[0.03] p-10 md:p-12 border-l-2 border-[#D4AF37] mb-10 shadow-inner">
                    <p className="text-white/80 font-serif leading-relaxed italic text-lg md:text-2xl">{selectedProperty.descripcion}</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-10 pb-10">
                    {selectedProperty.caracteristicas.map((c, i) => (
                      <div key={i} className="flex items-center gap-3 text-white/70">
                        <ChevronRight size={14} className="text-[#D4AF37]" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">{c}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-8 md:p-12 border-t border-white/5 flex flex-col sm:flex-row gap-6 bg-[#022c22]/90 sticky bottom-0 z-20">
                  <button onClick={() => { setLeadContext(selectedProperty.titulo); setSelectedProperty(null); }} className="flex-1 btn-luxury-gold py-6 text-[11px] font-black uppercase tracking-[0.4em] rounded-sm">ME INTERESA ESTA PROPIEDAD</button>
                  <a href={`https://wa.me/14377768395?text=Hola Miguel, solicito dossier privado de: ${selectedProperty.titulo}`} target="_blank" className="flex-1 border-2 border-[#D4AF37]/50 text-white flex items-center justify-center gap-4 text-[11px] font-black uppercase tracking-[0.4em] hover:bg-[#D4AF37] hover:text-black transition-all duration-500 rounded-sm">
                    <MessageCircle size={18}/>WHATSAPP DIRECTO
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
          <span className="absolute -top-12 right-0 bg-white text-black text-[8px] font-black uppercase tracking-widest px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl border-b-2 border-[#D4AF37]">Concierge Online</span>
        </a>
      </div>
    </div>
  );
};

export default App;
