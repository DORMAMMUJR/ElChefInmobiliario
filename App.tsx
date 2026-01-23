
import React, { useState, useMemo, useEffect } from 'react';
import { Property, FilterState } from './types';
import { PROPIEDADES, TESTIMONIOS, SERVICIOS, FORMAT_PRICE, TRANSLATIONS } from './constants';
import { PropertyCard } from './components/PropertyCard';
import { parseUserSearchIntent } from './services/geminiService';
import { 
  Instagram, Linkedin, Facebook, Menu, X, MessageCircle, 
  MapPin, Sparkles, Headphones, Maximize2, Bed, Bath, 
  CheckCircle2, FileText, Info, ArrowRight, ShieldCheck, Star, Users
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

  const NavContent = () => (
    <>
      <button onClick={() => setCurrentView('home')} className={`nav-link ${currentView === 'home' ? 'text-[#D4AF37]' : ''}`}>{t.nav_home}</button>
      <button onClick={() => setCurrentView('catalog')} className={`nav-link ${currentView === 'catalog' ? 'text-[#D4AF37]' : ''}`}>{t.nav_properties}</button>
      <button onClick={() => setCurrentView('sell')} className={`nav-link ${currentView === 'sell' ? 'text-[#D4AF37]' : ''}`}>{t.nav_sell}</button>
    </>
  );

  return (
    <div className="min-h-screen bg-[#011c16] selection:bg-[#D4AF37] selection:text-black">
      {/* HEADER */}
      <header className="fixed top-0 w-full z-[100] bg-[#022c22]/95 backdrop-blur-xl border-b border-white/10 h-24 flex items-center">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="cursor-pointer group" onClick={() => setCurrentView('home')}>
            <h1 className="text-white text-xl font-serif font-bold tracking-tighter group-hover:text-[#D4AF37] transition-colors">MIGUEL ANGEL PÉREZ</h1>
            <span className="text-[#D4AF37] text-[8px] uppercase tracking-[0.6em] font-black block">El Chef Inmobiliario</span>
          </div>
          <nav className="hidden lg:flex gap-10 text-[10px] font-black uppercase tracking-[0.2em]">
            <NavContent />
          </nav>
          <div className="flex items-center gap-4">
            <button onClick={() => setLanguage(l => l === 'es' ? 'en' : 'es')} className="text-white/40 hover:text-[#D4AF37] text-[10px] font-black uppercase transition-colors">{language.toUpperCase()}</button>
            <a href="https://wa.me/14377768395" className="btn-luxury-gold px-6 py-3 text-[10px] font-black uppercase tracking-widest hidden sm:flex gap-2 items-center"><MessageCircle size={16}/>WHATSAPP</a>
            <button className="lg:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>{isMenuOpen ? <X size={28}/> : <Menu size={28}/>}</button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed inset-0 z-[150] bg-[#011c16] p-10 flex flex-col items-center justify-center gap-8">
             <button onClick={() => setIsMenuOpen(false)} className="absolute top-10 right-10 text-white"><X size={32}/></button>
             <button onClick={() => { setCurrentView('home'); setIsMenuOpen(false); }} className="text-3xl font-serif">Inicio</button>
             <button onClick={() => { setCurrentView('catalog'); setIsMenuOpen(false); }} className="text-3xl font-serif">Catálogo</button>
             <button onClick={() => { setCurrentView('sell'); setIsMenuOpen(false); }} className="text-3xl font-serif">Vender</button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.main key={currentView} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-24 min-h-screen">
          {currentView === 'home' && (
            <>
              {/* HERO */}
              <section className="h-[80vh] relative flex items-center justify-center text-center px-6 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=90&w=2000" className="absolute inset-0 w-full h-full object-cover opacity-60" alt="Hero" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#011c16] to-transparent" />
                <div className="relative z-10">
                  <h2 className="text-5xl md:text-8xl font-serif font-bold mb-6 tracking-tighter text-white">{t.hero_title}</h2>
                  <p className="text-[#D4AF37] tracking-[0.6em] uppercase text-xs md:text-xl mb-12 font-medium">{t.hero_subtitle}</p>
                  <button onClick={() => setCurrentView('catalog')} className="btn-luxury-gold px-12 py-5 text-[11px] font-black uppercase tracking-[0.4em]">{t.hero_cta}</button>
                </div>
              </section>

              {/* STATS SECTION (PARA LLENAR ESPACIO) */}
              <section className="py-16 bg-[#022c22]/30 border-y border-white/5">
                <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                  {[
                    { label: 'Transacciones', val: '500+', icon: <ShieldCheck className="mx-auto mb-2 text-[#D4AF37]"/> },
                    { label: 'Años Exp', val: '15+', icon: <Star className="mx-auto mb-2 text-[#D4AF37]"/> },
                    { label: 'Clientes VIP', val: '120+', icon: <Users className="mx-auto mb-2 text-[#D4AF37]"/> },
                    { label: 'Ubicaciones', val: '12', icon: <MapPin className="mx-auto mb-2 text-[#D4AF37]"/> }
                  ].map((s, i) => (
                    <div key={i}>
                      {s.icon}
                      <div className="text-2xl font-bold text-white">{s.val}</div>
                      <div className="text-[10px] uppercase tracking-widest text-white/40">{s.label}</div>
                    </div>
                  ))}
                </div>
              </section>

              {/* SERVICES */}
              <section className="py-32 container mx-auto px-6">
                <div className="text-center mb-20">
                    <span className="text-[#D4AF37] text-[10px] font-black tracking-[0.8em] uppercase block mb-4">Excelencia</span>
                    <h2 className="text-5xl font-serif font-bold tracking-tighter uppercase">{t.section_services}</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                  {SERVICIOS.map((s) => (
                    <div key={s.id} onClick={() => setLeadContext(s.titulo)} className="p-12 bg-[#022c22]/60 border border-white/5 text-center cursor-pointer hover:border-[#D4AF37]/50 transition-all group">
                      <div className="text-6xl mb-8 group-hover:scale-110 transition-transform">{s.icono}</div>
                      <h3 className="text-2xl font-serif text-[#D4AF37] mb-4 uppercase tracking-tighter">{s.titulo}</h3>
                      <p className="text-white/60 text-[10px] uppercase tracking-[0.2em] leading-relaxed mb-6">{s.descripcion}</p>
                      <button className="text-[#D4AF37] text-[9px] font-black uppercase tracking-widest border-b border-[#D4AF37]/30 pb-1">Más Información</button>
                    </div>
                  ))}
                </div>
              </section>
            </>
          )}

          {currentView === 'catalog' && (
            <section className="py-20 container mx-auto px-6">
              <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                <div>
                  <span className="text-[#D4AF37] text-[10px] font-black tracking-[0.8em] uppercase block mb-2">Portfolio</span>
                  <h2 className="text-6xl font-serif font-bold tracking-tighter uppercase">{t.section_properties}</h2>
                </div>
                <div className="flex gap-4">
                  {['operacion', 'tipo'].map(f => (
                    <select key={f} value={(filters as any)[f]} onChange={e => setFilters({...filters, [f]: e.target.value})} className="bg-[#022c22] border border-white/10 px-6 py-4 text-[10px] font-black uppercase text-white outline-none focus:border-[#D4AF37] cursor-pointer">
                      <option value="todos">{f.toUpperCase()}</option>
                      {f === 'operacion' ? <><option value="Venta">VENTA</option><option value="Renta">RENTA</option></> : <><option value="Casa">RESIDENCIAS</option><option value="Departamento">DEPARTAMENTOS</option></>}
                    </select>
                  ))}
                </div>
              </div>
              <form onSubmit={handleAISearch} className="mb-20 p-10 bg-white/[0.04] border border-white/10 flex flex-col md:flex-row gap-6 backdrop-blur-md">
                <input value={filters.query} onChange={e => setFilters({...filters, query: e.target.value})} placeholder={t.filter_ai_placeholder} className="flex-1 bg-transparent border-b border-white/20 py-4 text-[13px] uppercase outline-none focus:border-[#D4AF37] text-white tracking-widest" />
                <button type="submit" className="btn-luxury-gold px-12 py-4 text-[10px] font-black uppercase tracking-widest">{isAIProcessing ? 'PROCESANDO...' : 'INTELIGENCIA ARTIFICIAL'}</button>
              </form>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
                {filteredProperties.map(p => <PropertyCard key={p.id} property={p} onViewDetails={setSelectedProperty} labels={{ rooms: t.card_rooms, baths: t.card_baths, details: t.card_details }} isComparing={false} onToggleCompare={() => {}} />)}
              </div>
            </section>
          )}

          {currentView === 'sell' && (
            <section className="py-24 container mx-auto px-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                <div className="relative">
                    <img src="https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?auto=format&fit=crop&q=80&w=1000" className="w-full shadow-2xl relative z-10" alt="Sell" />
                    <div className="absolute -inset-6 border-2 border-[#D4AF37]/20 pointer-events-none" />
                </div>
                <div>
                  <span className="text-[#D4AF37] tracking-[1em] text-[13px] font-black uppercase mb-8 block">Venda su Propiedad</span>
                  <h2 className="text-7xl font-serif font-bold mb-10 leading-none uppercase text-white tracking-tighter">Marketing de Ultra Lujo.</h2>
                  <p className="text-white/80 text-xl font-light mb-14 leading-relaxed">No solo listamos propiedades; creamos el escenario perfecto para atraer a los compradores más exclusivos del mundo. Unimos estrategia digital con discreción absoluta y curaduría de marketing.</p>
                  <button onClick={() => setLeadContext('Venta Premium')} className="btn-luxury-gold px-14 py-6 text-[12px] font-black uppercase tracking-[0.5em]">SOLICITAR AUDITORÍA DE VALOR</button>
                </div>
              </div>
            </section>
          )}
        </motion.main>
      </AnimatePresence>

      {/* FOOTER - LA PARTE DE HASTA ABAJO RE-IMPLEMENTADA Y MEJORADA */}
      <footer className="bg-[#011c16] border-t border-white/10 pt-32 pb-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
            {/* Col 1 */}
            <div>
              <h3 className="text-white font-serif font-bold text-2xl mb-8 tracking-tighter">MIGUEL ANGEL PÉREZ</h3>
              <p className="text-white/40 text-[10px] uppercase tracking-[0.4em] leading-loose mb-10">
                HG Hola Group Property Advisors.<br/>Liderazgo, visión y exclusividad en el mercado inmobiliario de lujo internacional.
              </p>
              <div className="flex gap-6">
                 <Instagram className="text-white/20 hover:text-[#D4AF37] cursor-pointer transition-all" />
                 <Linkedin className="text-white/20 hover:text-[#D4AF37] cursor-pointer transition-all" />
                 <Facebook className="text-white/20 hover:text-[#D4AF37] cursor-pointer transition-all" />
              </div>
            </div>
            {/* Col 2 */}
            <div>
              <h4 className="text-[#D4AF37] text-[11px] font-black tracking-widest uppercase mb-10">Explorar</h4>
              <ul className="space-y-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">
                <li><button onClick={() => setCurrentView('home')} className="hover:text-white transition-colors">Inicio</button></li>
                <li><button onClick={() => setCurrentView('catalog')} className="hover:text-white transition-colors">Propiedades</button></li>
                <li><button onClick={() => setCurrentView('sell')} className="hover:text-white transition-colors">Vender Propiedad</button></li>
                <li><button className="hover:text-white transition-colors">Inversiones</button></li>
              </ul>
            </div>
            {/* Col 3 */}
            <div>
              <h4 className="text-[#D4AF37] text-[11px] font-black tracking-widest uppercase mb-10">Ubicaciones</h4>
              <p className="text-white/60 text-[10px] uppercase tracking-widest leading-loose">
                Presidente Masaryk 120, Polanco<br/>CDMX, 11560<br/><br/>Paseo de la Reforma 250<br/>Juárez, 06600
              </p>
            </div>
            {/* Col 4 */}
            <div>
              <h4 className="text-[#D4AF37] text-[11px] font-black tracking-widest uppercase mb-10">Atención Directa</h4>
              <p className="text-white/60 text-[10px] uppercase tracking-widest leading-loose mb-8">
                +52 55 1234 5678<br/>contacto@hola-group.mx
              </p>
              <button onClick={() => setLeadContext('Newsletter VIP')} className="text-[9px] font-black uppercase tracking-[0.3em] bg-white/5 border border-white/10 px-6 py-3 hover:border-[#D4AF37] transition-all">Suscripción Exclusiva</button>
            </div>
          </div>
          <div className="text-center pt-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-white/20 text-[9px] uppercase tracking-[0.6em]">© 2024 Miguel Angel Pérez | El Chef Inmobiliario. All Rights Reserved.</p>
            <div className="flex gap-10 text-[8px] font-black uppercase tracking-widest text-white/20">
                <a href="#" className="hover:text-white">Aviso de Privacidad</a>
                <a href="#" className="hover:text-white">Términos y Condiciones</a>
            </div>
          </div>
        </div>
      </footer>

      {/* LEAD MODAL */}
      <AnimatePresence>
        {leadContext && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl">
            <div className="absolute inset-0" onClick={() => setLeadContext(null)} />
            <motion.div initial={{ y: 50, scale: 0.95 }} animate={{ y: 0, scale: 1 }} className="bg-[#022c22] border border-[#D4AF37]/30 p-12 md:p-20 max-w-xl w-full relative z-10 shadow-2xl">
              <button onClick={() => setLeadContext(null)} className="absolute top-8 right-8 text-white/40 hover:text-white transition-all"><X size={28}/></button>
              <h2 className="text-4xl font-serif text-white mb-10 uppercase tracking-tighter leading-tight">{leadStatus === 'success' ? 'Recibido' : leadContext}</h2>
              {leadStatus === 'success' ? (
                <div className="text-center py-10">
                  <Sparkles size={48} className="text-[#D4AF37] mx-auto mb-6" />
                  <p className="text-white text-[12px] tracking-widest uppercase">Un asesor concierge le contactará pronto.</p>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setLeadStatus('sending'); setTimeout(() => setLeadStatus('success'), 1500); }} className="space-y-8">
                  {['Nombre', 'Email', 'Teléfono'].map(f => <input key={f} required placeholder={f} className="w-full bg-transparent border-b border-white/20 py-4 text-white outline-none focus:border-[#D4AF37] text-lg font-light transition-all" />)}
                  <button type="submit" className="w-full btn-luxury-gold py-6 text-[12px] font-black uppercase tracking-[0.4em]">ENVIAR SOLICITUD</button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}

        {/* PROPERTY DETAIL MODAL */}
        {selectedProperty && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-10 glass-emerald">
            <div className="absolute inset-0" onClick={() => setSelectedProperty(null)} />
            <motion.div initial={{ y: 100, scale: 0.9, opacity: 0 }} animate={{ y: 0, scale: 1, opacity: 1 }} className="bg-[#022c22] max-w-7xl w-full h-[88vh] overflow-hidden relative grid grid-cols-1 lg:grid-cols-12 border border-[#D4AF37]/40 shadow-2xl">
              <button onClick={() => setSelectedProperty(null)} className="absolute top-8 right-8 z-[320] bg-black/60 p-4 rounded-full text-[#D4AF37] transition-all"><X size={24}/></button>
              <div className="lg:col-span-5 h-[350px] lg:h-full relative overflow-hidden">
                <img src={selectedProperty.img} className="w-full h-full object-cover" alt="Detail" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#022c22] to-transparent" />
              </div>
              <div className="lg:col-span-7 flex flex-col h-full bg-[#022c22]">
                <div className="p-10 md:p-20 overflow-y-auto flex-1 custom-scrollbar">
                  <span className="text-[#D4AF37] text-[11px] font-black uppercase mb-6 tracking-[0.6em] block">{selectedProperty.zona}</span>
                  <h2 className="text-4xl md:text-6xl font-serif font-bold mb-10 tracking-tighter uppercase leading-tight text-white">{selectedProperty.titulo}</h2>
                  <p className="text-4xl md:text-6xl font-bold text-[#D4AF37] mb-14 tracking-tighter">{FORMAT_PRICE(selectedProperty.precio)}</p>
                  <div className="grid grid-cols-4 gap-6 mb-16">
                    {[{l: 'Hab', v: selectedProperty.recamaras, i: <Bed/>}, {l: 'Baños', v: selectedProperty.banos, i: <Bath/>}, {l: 'M²', v: selectedProperty.metros, i: <Maximize2/>}, {l: 'Ref', v: 'A+', i: <Info/>}].map((a,idx) => (
                      <div key={idx} className="bg-white/5 p-6 text-center border border-white/10 group hover:border-[#D4AF37]/50 transition-all">
                        <div className="text-[#D4AF37] flex justify-center mb-4">{a.i}</div>
                        <div className="text-white text-3xl font-serif mb-1">{a.v}</div>
                        <div className="text-[9px] uppercase tracking-widest text-white/30">{a.l}</div>
                      </div>
                    ))}
                  </div>
                  <div className="bg-white/[0.03] p-12 border-l-4 border-[#D4AF37]">
                        <p className="text-white/80 font-serif leading-relaxed italic text-xl md:text-2xl">{selectedProperty.descripcion}</p>
                  </div>
                </div>
                <div className="p-10 md:p-14 border-t border-white/10 flex flex-col sm:flex-row gap-6 bg-[#022c22]/90">
                  <button onClick={() => { setLeadContext(selectedProperty.titulo); setSelectedProperty(null); }} className="flex-1 btn-luxury-gold py-7 text-[12px] font-black uppercase tracking-[0.4em]">ME INTERESA ESTA PROPIEDAD</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed bottom-12 right-12 z-[150]">
        <a href="https://wa.me/14377768395" target="_blank" className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center text-black shadow-2xl hover:scale-110 transition-transform">
          <Headphones size={28} />
        </a>
      </div>
    </div>
  );
};

export default App;
