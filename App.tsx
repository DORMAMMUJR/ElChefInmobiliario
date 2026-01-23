
import React, { useState, useMemo, useEffect } from 'react';
import { Property, FilterState } from './types';
import { PROPIEDADES, TESTIMONIOS, SERVICIOS, FORMAT_PRICE, TRANSLATIONS } from './constants';
import { PropertyCard } from './components/PropertyCard';
import { parseUserSearchIntent } from './services/geminiService';
import { 
  Instagram, 
  Linkedin, 
  Facebook, 
  Menu, 
  X, 
  Globe, 
  MessageCircle, 
  Phone, 
  Mail, 
  MapPin, 
  Sparkles, 
  ChevronDown, 
  ArrowRight, 
  Headphones, 
  Maximize2,
  Bed,
  Bath,
  CheckCircle2,
  FileText,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type View = 'home' | 'catalog' | 'sell';

const App: React.FC = () => {
  const [language, setLanguage] = useState<'es' | 'en'>('es');
  const [currentView, setCurrentView] = useState<View>('home');
  const t = TRANSLATIONS[language];

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'es' ? 'en' : 'es'));
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    operacion: 'todos',
    tipo: 'todos',
    zona: 'todos',
    precioMax: '',
    query: ''
  });
  
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [leadContext, setLeadContext] = useState<string | null>(null);
  const [isAIProcessing, setIsAIProcessing] = useState(false);
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);
  const [leadStatus, setLeadStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  // Bloquear scroll del body cuando un modal está abierto
  useEffect(() => {
    if (selectedProperty || leadContext || isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedProperty, leadContext, isMenuOpen]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  const filteredProperties = useMemo(() => {
    return PROPIEDADES.filter(item => {
      const matchOp = filters.operacion === 'todos' || item.operacion === filters.operacion;
      const matchTipo = filters.tipo === 'todos' || item.tipo === filters.tipo;
      const matchZona = filters.zona === 'todos' || item.zona.toLowerCase().includes(filters.zona.toLowerCase());
      const matchPrecio = !filters.precioMax || item.precio <= parseInt(filters.precioMax);
      return matchOp && matchTipo && matchZona && matchPrecio;
    });
  }, [filters]);

  const handleAISearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!filters.query?.trim()) return;
    setIsAIProcessing(true);
    setAiExplanation(null);
    const result = await parseUserSearchIntent(filters.query);
    if (result) {
      setFilters(prev => ({
        ...prev,
        operacion: result.operacion === 'Venta' ? 'Venta' : result.operacion === 'Renta' ? 'Renta' : 'todos',
        tipo: result.tipo || 'todos',
        precioMax: result.precioMax ? result.precioMax.toString() : '',
      }));
      if (result.explanation) {
        setAiExplanation(result.explanation);
      }
      setCurrentView('catalog');
    }
    setIsAIProcessing(false);
  };

  const navigateTo = (view: View) => {
    setCurrentView(view);
    setIsMenuOpen(false);
  };

  const handleLeadSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLeadStatus('sending');
    setTimeout(() => {
      setLeadStatus('success');
      setTimeout(() => {
        setLeadStatus('idle');
        setLeadContext(null);
      }, 3000);
    }, 1200);
  };

  const renderHome = () => (
    <>
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=90&w=2000" 
            className="w-full h-full object-cover" 
            alt="Main Architecture"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-[#0A192F]/40 to-black/10"></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="relative z-10 text-center px-6"
        >
          <h1 className="text-6xl md:text-[100px] font-serif font-bold text-white mb-6 leading-none tracking-tighter">
            {t.hero_title.split(' ').map((word, i) => (
              <span key={i} className={i === 2 ? "text-[#D4AF37] italic" : ""}>{word} </span>
            ))}
          </h1>
          <p className="text-[#D4AF37] text-sm md:text-xl font-light tracking-[0.6em] uppercase mb-12">
            {t.hero_subtitle}
          </p>
          <button 
            onClick={() => navigateTo('catalog')}
            className="btn-luxury-gold text-black px-12 py-5 text-[10px] font-bold uppercase tracking-[0.5em] shadow-2xl"
          >
            {t.hero_cta}
          </button>
        </motion.div>
      </section>

      <section className="py-32 bg-[#050505]">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-20">
          {SERVICIOS.map((serv, index) => (
            <motion.div 
              key={serv.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="text-center group cursor-pointer"
              onClick={() => setLeadContext(serv.titulo)}
            >
              <div className="text-5xl mb-6 grayscale group-hover:grayscale-0 transition-all">{serv.icono}</div>
              <h3 className="text-xl font-serif text-[#D4AF37] mb-3">{serv.titulo}</h3>
              <p className="text-white/40 text-xs tracking-widest uppercase">{serv.descripcion}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );

  const renderCatalog = () => (
    <section className="pt-32 pb-32 min-h-screen bg-[#050505]">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div>
            <span className="text-[#D4AF37] text-[10px] font-black tracking-[0.6em] uppercase mb-4 block">Catálogo Exclusivo</span>
            <h2 className="text-5xl font-serif font-bold text-white tracking-tighter">{t.section_properties}</h2>
          </div>
          
          <div className="flex flex-wrap gap-4">
             <select 
              value={filters.operacion}
              onChange={(e) => setFilters({...filters, operacion: e.target.value})}
              className="bg-[#0A192F]/60 border border-white/10 px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-white outline-none focus:border-[#D4AF37]"
             >
                <option value="todos">Todas las Operaciones</option>
                <option value="Venta">Venta</option>
                <option value="Renta">Renta</option>
             </select>
             <select 
              value={filters.tipo}
              onChange={(e) => setFilters({...filters, tipo: e.target.value})}
              className="bg-[#0A192F]/60 border border-white/10 px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-white outline-none focus:border-[#D4AF37]"
             >
                <option value="todos">Todos los Tipos</option>
                <option value="Casa">Casa</option>
                <option value="Departamento">Departamento</option>
             </select>
          </div>
        </div>

        <div className="mb-16 p-8 bg-white/[0.02] border border-white/5">
           <form onSubmit={handleAISearch} className="flex gap-4">
             <input 
              type="text"
              value={filters.query}
              onChange={(e) => setFilters({...filters, query: e.target.value})}
              placeholder={t.filter_ai_placeholder}
              className="flex-grow bg-transparent border-b border-white/10 py-3 text-[11px] uppercase tracking-widest text-white outline-none focus:border-[#D4AF37]"
             />
             <button type="submit" className="text-[#D4AF37] text-[10px] font-black tracking-widest flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                {isAIProcessing ? '...' : 'AI ASSIST'}
             </button>
           </form>
           <AnimatePresence>
            {aiExplanation && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 text-[#666] text-[10px] italic">"{aiExplanation}"</motion.p>
            )}
           </AnimatePresence>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {filteredProperties.map((prop) => (
            <PropertyCard 
              key={prop.id} 
              property={prop} 
              onViewDetails={setSelectedProperty} 
              onToggleCompare={() => {}}
              isComparing={false}
              labels={{
                rooms: t.card_rooms,
                baths: t.card_baths,
                details: t.card_details
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );

  const renderSell = () => (
    <section className="pt-32 min-h-screen bg-[#050505]">
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative"
        >
          <img 
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1000" 
            className="w-full aspect-[4/5] object-cover" 
            alt="Luxury Office"
          />
          <div className="absolute -bottom-10 -right-10 bg-[#D4AF37] p-12 text-black hidden md:block">
            <h4 className="text-3xl font-serif font-bold mb-2">98%</h4>
            <p className="text-[10px] font-black tracking-widest uppercase">Éxito en Cierres</p>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <span className="text-[#D4AF37] text-[10px] font-black tracking-[0.8em] uppercase mb-6 block">Elite Advisory</span>
          <h2 className="text-6xl font-serif font-bold text-white mb-10 tracking-tighter leading-none">Su Propiedad Merece un Marketing de Clase Mundial.</h2>
          <p className="text-[#666] text-xl font-light mb-16 leading-relaxed">
            No solo vendemos casas; vendemos historias, inversión y exclusividad. Miguel Angel Pérez utiliza una red privada de compradores de ultra-lujo y estrategias digitales de vanguardia.
          </p>
          <button 
            onClick={() => setLeadContext('Venta de Propiedad Especializada')}
            className="btn-luxury-gold text-black px-16 py-6 text-[10px] font-black uppercase tracking-[0.4em] shadow-2xl"
          >
            Iniciar Valuación Premium
          </button>
        </motion.div>
      </div>
      
      <div className="bg-[#0a0a0a] mt-32 py-32">
        <div className="container mx-auto px-6">
          <h3 className="text-center text-white font-serif text-3xl mb-20 tracking-tighter">Resultados Comprobados</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {TESTIMONIOS.map(test => (
              <div key={test.id} className="bg-black p-12 border border-white/5 flex gap-8 items-center">
                <img src={test.foto} className="w-20 h-20 rounded-full object-cover grayscale" alt={test.nombre} />
                <div>
                  <p className="text-white italic text-lg mb-4">"{test.comentario}"</p>
                  <p className="text-[#D4AF37] font-bold text-xs tracking-widest">{test.nombre}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-[#050505] selection:bg-[#D4AF37] selection:text-black">
      <header className="fixed top-0 w-full z-[100] bg-[#0A192F]/90 backdrop-blur-xl border-b border-white/5 h-24 transition-all">
        <div className="container mx-auto px-6 h-full flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col cursor-pointer group"
            onClick={() => navigateTo('home')}
          >
            <span className="text-white text-xl font-serif font-bold tracking-tighter group-hover:text-[#D4AF37] transition-colors">MIGUEL ANGEL PÉREZ</span>
            <span className="text-[#D4AF37] text-[8px] uppercase tracking-[0.5em] font-bold">El Chef Inmobiliario</span>
          </motion.div>

          <nav className="hidden lg:flex items-center gap-10 text-[10px] font-bold text-white uppercase tracking-widest">
            <button onClick={() => navigateTo('home')} className={`nav-link ${currentView === 'home' ? 'text-[#D4AF37]' : ''}`}>{t.nav_home}</button>
            <button onClick={() => navigateTo('catalog')} className={`nav-link ${currentView === 'catalog' ? 'text-[#D4AF37]' : ''}`}>{t.nav_properties}</button>
            <button onClick={() => navigateTo('sell')} className={`nav-link ${currentView === 'sell' ? 'text-[#D4AF37]' : ''}`}>{t.nav_sell}</button>
          </nav>

          <div className="flex items-center gap-6">
            <button 
              onClick={toggleLanguage}
              className="text-white/40 hover:text-[#D4AF37] transition-colors text-[9px] font-bold uppercase tracking-widest border border-white/10 px-4 py-2"
            >
              {t.lang_btn}
            </button>

            <a 
              href="https://wa.me/14377768395"
              target="_blank"
              className="btn-luxury-gold text-black px-6 py-3 text-[10px] font-black uppercase tracking-widest flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline">{t.nav_cta}</span>
            </a>

            <button className="lg:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
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
            className="fixed inset-0 z-[200] bg-[#0A192F] p-10 flex flex-col items-center overflow-y-auto custom-scrollbar"
          >
            <div className="w-full flex justify-end mb-10">
              <button className="text-white p-2" onClick={() => setIsMenuOpen(false)}>
                <X className="w-8 h-8" />
              </button>
            </div>
            <div className="flex flex-col gap-12 items-center py-10">
              <button onClick={() => navigateTo('home')} className="text-3xl font-serif text-white uppercase tracking-tighter">Inicio</button>
              <button onClick={() => navigateTo('catalog')} className="text-3xl font-serif text-white uppercase tracking-tighter">Propiedades</button>
              <button onClick={() => navigateTo('sell')} className="text-3xl font-serif text-white uppercase tracking-tighter">Vender</button>
              <div className="flex gap-6 mt-10">
                <Instagram className="w-6 h-6 text-[#D4AF37]" />
                <Linkedin className="w-6 h-6 text-[#D4AF37]" />
                <Facebook className="w-6 h-6 text-[#D4AF37]" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentView}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {currentView === 'home' && renderHome()}
          {currentView === 'catalog' && renderCatalog()}
          {currentView === 'sell' && renderSell()}
        </motion.div>
      </AnimatePresence>

      <footer className="bg-[#050505] pt-32 pb-16 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
            <div>
              <h3 className="text-white font-serif font-bold text-xl mb-6 tracking-tighter">MIGUEL ANGEL PÉREZ</h3>
              <p className="text-[#444] text-[10px] uppercase tracking-widest leading-loose">HG Hola Group Property Advisors. Discreción y Liderazgo en el sector de lujo.</p>
            </div>
            <div>
              <h4 className="text-white text-[10px] font-black tracking-widest uppercase mb-6">{t.footer_offices}</h4>
              <p className="text-[#666] text-[10px] uppercase tracking-widest leading-loose">Presidente Masaryk 120, Polanco<br/>CDMX, 11560</p>
            </div>
            <div>
              <h4 className="text-white text-[10px] font-black tracking-widest uppercase mb-6">{t.footer_care}</h4>
              <p className="text-[#666] text-[10px] uppercase tracking-widest leading-loose">+52 55 1234 5678<br/>private@hola-group.mx</p>
            </div>
            <div className="flex gap-4">
               <Instagram className="w-5 h-5 text-[#444] hover:text-[#D4AF37] cursor-pointer transition-colors" />
               <Linkedin className="w-5 h-5 text-[#444] hover:text-[#D4AF37] cursor-pointer transition-colors" />
               <Facebook className="w-5 h-5 text-[#444] hover:text-[#D4AF37] cursor-pointer transition-colors" />
            </div>
          </div>
        </div>
      </footer>

      {/* LEAD MODAL */}
      <AnimatePresence>
        {leadContext && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-[#0A192F]/95 backdrop-blur-xl overflow-y-auto"
          >
            <div className="absolute inset-0" onClick={() => setLeadContext(null)}></div>
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-[#112240] max-w-lg w-full p-8 md:p-16 relative border border-[#D4AF37]/20 shadow-2xl my-8 overflow-hidden flex flex-col max-h-[90vh]"
            >
              <button onClick={() => setLeadContext(null)} className="absolute top-6 right-6 text-white/40 hover:text-white p-2 z-10"><X className="w-6 h-6" /></button>
              
              <div className="overflow-y-auto custom-scrollbar flex-1 pr-2">
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-2 tracking-tighter uppercase">{leadStatus === 'success' ? 'Solicitud Enviada' : leadContext}</h2>
                
                {leadStatus === 'success' ? (
                  <div className="text-center py-10">
                    <Sparkles className="w-12 h-12 text-[#D4AF37] mx-auto mb-6" />
                    <p className="text-[#888] text-[11px] uppercase tracking-widest leading-loose">Un asesor concierge se pondrá en contacto con usted en breve.</p>
                  </div>
                ) : (
                  <form onSubmit={handleLeadSubmit} className="space-y-8 mt-10">
                    <div className="space-y-2">
                      <label className="text-[9px] uppercase font-black text-[#444] tracking-widest">Nombre Completo</label>
                      <input required type="text" className="w-full bg-transparent border-b border-white/10 py-3 text-white outline-none focus:border-[#D4AF37] transition-colors" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] uppercase font-black text-[#444] tracking-widest">Email Corporativo</label>
                      <input required type="email" className="w-full bg-transparent border-b border-white/10 py-3 text-white outline-none focus:border-[#D4AF37] transition-colors" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] uppercase font-black text-[#444] tracking-widest">WhatsApp / Celular</label>
                      <input required type="tel" className="w-full bg-transparent border-b border-white/10 py-3 text-white outline-none focus:border-[#D4AF37] transition-colors" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] uppercase font-black text-[#444] tracking-widest">Mensaje (Opcional)</label>
                      <textarea className="w-full bg-transparent border-b border-white/10 py-3 text-white outline-none focus:border-[#D4AF37] transition-colors min-h-[100px]"></textarea>
                    </div>
                    <button type="submit" className="w-full btn-luxury-gold py-6 text-[10px] font-black uppercase tracking-[0.4em] text-black sticky bottom-0">
                      {leadStatus === 'sending' ? 'Enviando...' : 'Solicitar Acceso Privado'}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PROPERTY DETAIL MODAL - FINAL FIX FOR SCROLLING ISSUES */}
      <AnimatePresence>
        {selectedProperty && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-10 glass-navy overflow-y-auto backdrop-blur-md"
          >
            {/* Click on backdrop to close */}
            <div className="absolute inset-0" onClick={() => setSelectedProperty(null)}></div>
            
            <motion.div 
              initial={{ y: 50, scale: 0.95, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 50, scale: 0.95, opacity: 0 }}
              className="bg-[#0A192F] max-w-7xl w-full h-auto lg:h-[85vh] overflow-hidden relative grid grid-cols-1 lg:grid-cols-12 shadow-[0_0_80px_rgba(0,0,0,0.8)] border border-[#D4AF37]/40 rounded-sm my-auto"
            >
              {/* Floating Close Button */}
              <button 
                onClick={() => setSelectedProperty(null)} 
                className="absolute top-6 right-6 z-[320] bg-[#0A192F] border border-[#D4AF37]/50 p-3 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0A192F] transition-all rounded-full shadow-2xl"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Left Column: Image (Static Height on Mobile, Full on Desktop) */}
              <div className="lg:col-span-5 relative h-[300px] md:h-[450px] lg:h-full overflow-hidden bg-black/40">
                  <motion.img 
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5 }}
                    src={selectedProperty.img} 
                    className="w-full h-full object-cover" 
                    alt={selectedProperty.titulo} 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-transparent to-black/20"></div>
                  
                  <div className="absolute bottom-8 left-8 flex flex-col gap-3">
                    <span className="px-5 py-2 bg-[#D4AF37] text-[#0A192F] text-[10px] font-black uppercase tracking-[0.2em] shadow-lg inline-block w-fit">
                        {selectedProperty.operacion}
                    </span>
                    <span className="px-5 py-2 bg-white/10 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-[0.2em] border border-white/20 shadow-lg inline-block w-fit">
                        {selectedProperty.tipo}
                    </span>
                  </div>
              </div>

              {/* Right Column: Detailed Information Section (THE SCROLLABLE AREA) */}
              <div className="lg:col-span-7 flex flex-col h-full navy-gradient relative min-h-0">
                  <div className="p-8 md:p-14 overflow-y-auto flex-1 custom-scrollbar w-full">
                      {/* Header Info */}
                      <div className="mb-10">
                        <div className="flex items-center gap-3 text-[#D4AF37] font-black text-[10px] uppercase tracking-[0.6em] mb-4">
                            <MapPin className="w-3.5 h-3.5" />
                            {selectedProperty.zona}
                        </div>
                        <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6 tracking-tighter leading-tight border-l-4 border-[#D4AF37] pl-6 uppercase">
                            {selectedProperty.titulo}
                        </h2>
                        <div className="flex flex-wrap items-center gap-6">
                            <p className="text-3xl md:text-5xl font-bold text-[#D4AF37] tracking-tighter">
                                {FORMAT_PRICE(selectedProperty.precio)}
                            </p>
                            <div className="hidden md:block h-10 w-[1px] bg-white/10"></div>
                            <p className="text-[#666] text-[10px] font-black uppercase tracking-widest">Valor de Inversión</p>
                        </div>
                      </div>

                      {/* Attributes Comparison */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                          <div className="bg-[#112240] p-5 border border-white/5 flex flex-col items-center justify-center text-center transition-all hover:border-[#D4AF37]/20">
                              <Bed className="w-5 h-5 text-[#D4AF37] mb-2" />
                              <p className="text-white text-xl font-serif">{selectedProperty.recamaras}</p>
                              <p className="text-[#444] text-[8px] font-black uppercase tracking-[0.2em]">{t.card_rooms}</p>
                          </div>
                          <div className="bg-[#112240] p-5 border border-white/5 flex flex-col items-center justify-center text-center transition-all hover:border-[#D4AF37]/20">
                              <Bath className="w-5 h-5 text-[#D4AF37] mb-2" />
                              <p className="text-white text-xl font-serif">{selectedProperty.banos}</p>
                              <p className="text-[#444] text-[8px] font-black uppercase tracking-[0.2em]">{t.card_baths}</p>
                          </div>
                          <div className="bg-[#112240] p-5 border border-white/5 flex flex-col items-center justify-center text-center transition-all hover:border-[#D4AF37]/20">
                              <Maximize2 className="w-5 h-5 text-[#D4AF37] mb-2" />
                              <p className="text-white text-xl font-serif">{selectedProperty.metros}</p>
                              <p className="text-[#444] text-[8px] font-black uppercase tracking-[0.2em]">Metros²</p>
                          </div>
                          <div className="bg-[#112240] p-5 border border-white/5 flex flex-col items-center justify-center text-center transition-all hover:border-[#D4AF37]/20">
                              <Info className="w-5 h-5 text-[#D4AF37] mb-2" />
                              <p className="text-white text-[9px] font-black uppercase tracking-tighter leading-tight">Clase A+</p>
                              <p className="text-[#444] text-[8px] font-black uppercase tracking-[0.2em]">Categoría</p>
                          </div>
                      </div>

                      {/* Executive Summary Block */}
                      <div className="mb-10">
                        <div className="flex items-center gap-3 mb-4">
                            <FileText className="w-4 h-4 text-[#D4AF37]" />
                            <span className="text-white text-[10px] font-black uppercase tracking-[0.4em]">Resumen Ejecutivo</span>
                        </div>
                        <div className="bg-white/[0.02] p-8 border-l-2 border-[#D4AF37] shadow-inner">
                            <p className="text-white/70 text-lg font-light leading-relaxed font-serif tracking-wide">
                              {selectedProperty.descripcion}
                            </p>
                        </div>
                      </div>

                      {/* Characteristics Grid */}
                      <div className="mb-12">
                          <span className="text-[#444] text-[9px] font-black uppercase tracking-[0.5em] mb-6 block">Especificaciones de Lujo</span>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                              {selectedProperty.caracteristicas.map((c, i) => (
                                  <div key={i} className="flex items-center gap-4 text-white/50 group">
                                    <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 opacity-40 group-hover:opacity-100 transition-opacity" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest transition-colors group-hover:text-white">{c}</span>
                                  </div>
                              ))}
                          </div>
                      </div>
                  </div>

                  {/* Fixed Bottom Action Panel (Stays at the bottom of the right column) */}
                  <div className="p-8 md:p-14 border-t border-white/5 bg-[#0A192F]/80 backdrop-blur-xl">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <button 
                          onClick={() => { setLeadContext(`Interés Directo: ${selectedProperty.titulo}`); setSelectedProperty(null); }}
                          className="btn-luxury-gold text-[#0A192F] py-6 text-[11px] font-black uppercase tracking-[0.4em] shadow-xl hover:shadow-[#D4AF37]/30 transition-all"
                        >
                          {t.modal_request_btn}
                        </button>
                        <a 
                          href={`https://wa.me/14377768395?text=Hola Miguel, solicito el dossier completo de la propiedad: ${selectedProperty.titulo}`}
                          target="_blank"
                          className="flex items-center justify-center gap-4 bg-[#112240] border border-[#D4AF37]/40 text-white py-6 text-[11px] font-black uppercase tracking-[0.4em] hover:bg-[#D4AF37] hover:text-[#0A192F] transition-all duration-500 group shadow-lg"
                        >
                          <MessageCircle className="w-5 h-5 text-[#D4AF37] group-hover:text-[#0A192F]" />
                          WHATSAPP PRIVADO
                        </a>
                      </div>
                  </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed bottom-10 right-10 z-[150] group">
        <a 
          href="https://wa.me/14377768395" 
          target="_blank"
          className="concierge-float w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center text-[#0A192F] shadow-2xl hover:scale-110 transition-transform"
        >
          <Headphones className="w-7 h-7" />
        </a>
      </div>
    </div>
  );
};

export default App;
