
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
  Search,
  ArrowLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type View = 'home' | 'catalog' | 'sell';

const App: React.FC = () => {
  const [language, setLanguage] = useState<'es' | 'en'>('es');
  const [currentView, setCurrentView] = useState<View>('home');
  const t = TRANSLATIONS[language];

  // Fix: Added missing toggleLanguage function
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
      {/* HERO SECTION */}
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
        {/* Subtle gradient instead of heavy black overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10"></div>
        
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

      {/* QUICK STATS / TRUST */}
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
              className="bg-black/40 border border-white/10 px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-white outline-none focus:border-[#D4AF37]"
             >
                <option value="todos">Todas las Operaciones</option>
                <option value="Venta">Venta</option>
                <option value="Renta">Renta</option>
             </select>
             <select 
              value={filters.tipo}
              onChange={(e) => setFilters({...filters, tipo: e.target.value})}
              className="bg-black/40 border border-white/10 px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-white outline-none focus:border-[#D4AF37]"
             >
                <option value="todos">Todos los Tipos</option>
                <option value="Casa">Casa</option>
                <option value="Departamento">Departamento</option>
             </select>
          </div>
        </div>

        {/* AI SEARCH IN CATALOG */}
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
      
      {/* TESTIMONIALS SLIDER (SIMPLIFIED) */}
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
      {/* HEADER */}
      <header className="fixed top-0 w-full z-[100] bg-[#050505]/90 backdrop-blur-xl border-b border-white/5 h-24 transition-all">
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

          {/* Desktop Nav */}
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
            className="fixed inset-0 z-[200] bg-black p-10 flex flex-col justify-center items-center gap-12"
          >
            <button className="absolute top-10 right-10 text-white" onClick={() => setIsMenuOpen(false)}>
              <X className="w-8 h-8" />
            </button>
            <button onClick={() => navigateTo('home')} className="text-3xl font-serif text-white uppercase tracking-tighter">Inicio</button>
            <button onClick={() => navigateTo('catalog')} className="text-3xl font-serif text-white uppercase tracking-tighter">Propiedades</button>
            <button onClick={() => navigateTo('sell')} className="text-3xl font-serif text-white uppercase tracking-tighter">Vender</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* VIEW CONTENT */}
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

      {/* FOOTER */}
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
            className="fixed inset-0 z-[300] flex items-center justify-center p-6 bg-black/95 backdrop-blur-xl"
          >
            <div className="absolute inset-0" onClick={() => setLeadContext(null)}></div>
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-[#111] max-w-lg w-full p-16 relative border border-[#D4AF37]/20 shadow-2xl"
            >
              <button onClick={() => setLeadContext(null)} className="absolute top-6 right-6 text-white/40 hover:text-white"><X className="w-6 h-6" /></button>
              <h2 className="text-3xl font-serif font-bold text-white mb-2 tracking-tighter uppercase">{leadStatus === 'success' ? 'Solicitud Enviada' : leadContext}</h2>
              
              {leadStatus === 'success' ? (
                <div className="text-center py-10">
                  <Sparkles className="w-12 h-12 text-[#D4AF37] mx-auto mb-6" />
                  <p className="text-[#888] text-[11px] uppercase tracking-widest leading-loose">Un asesor concierge se pondrá en contacto con usted en breve.</p>
                </div>
              ) : (
                <form onSubmit={handleLeadSubmit} className="space-y-10 mt-12">
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase font-black text-[#444] tracking-widest">Nombre</label>
                    <input required type="text" className="w-full bg-transparent border-b border-white/10 py-3 text-white outline-none focus:border-[#D4AF37]" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase font-black text-[#444] tracking-widest">WhatsApp</label>
                    <input required type="tel" className="w-full bg-transparent border-b border-white/10 py-3 text-white outline-none focus:border-[#D4AF37]" />
                  </div>
                  <button type="submit" className="w-full btn-luxury-gold py-6 text-[10px] font-black uppercase tracking-[0.4em] text-black">
                    {leadStatus === 'sending' ? 'Enviando...' : 'Solicitar Acceso Privado'}
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PROPERTY DETAIL MODAL */}
      <AnimatePresence>
        {selectedProperty && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] flex items-center justify-center p-6 bg-black/98"
          >
            <div className="absolute inset-0" onClick={() => setSelectedProperty(null)}></div>
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-[#0a0a0a] max-w-6xl w-full max-h-[90vh] overflow-y-auto relative grid grid-cols-1 lg:grid-cols-2 shadow-2xl border border-white/5"
            >
              <button onClick={() => setSelectedProperty(null)} className="absolute top-8 left-8 z-10 bg-black/50 p-4 text-white hover:bg-[#D4AF37] hover:text-black transition-all">
                <X className="w-6 h-6" />
              </button>
              <div className="h-[400px] lg:h-full relative overflow-hidden">
                  <img src={selectedProperty.img} className="w-full h-full object-cover" alt={selectedProperty.titulo} />
              </div>
              <div className="p-12 lg:p-20 flex flex-col">
                  <span className="text-[#D4AF37] font-black text-[10px] uppercase tracking-[0.5em] mb-4">{selectedProperty.zona}</span>
                  <h2 className="text-4xl lg:text-6xl font-serif font-bold text-white mb-8 tracking-tighter">{selectedProperty.titulo}</h2>
                  <p className="text-4xl font-bold text-[#D4AF37] mb-12">{FORMAT_PRICE(selectedProperty.precio)}</p>
                  <p className="text-[#888] text-xl font-light italic leading-relaxed mb-12">"{selectedProperty.descripcion}"</p>
                  
                  <div className="grid grid-cols-3 gap-8 py-10 border-y border-white/5 mb-12">
                      <div className="text-center">
                          <p className="text-white text-2xl font-serif">{selectedProperty.recamaras}</p>
                          <p className="text-[#444] text-[8px] uppercase font-bold tracking-widest">{t.card_rooms}</p>
                      </div>
                      <div className="text-center">
                          <p className="text-white text-2xl font-serif">{selectedProperty.banos}</p>
                          <p className="text-[#444] text-[8px] uppercase font-bold tracking-widest">{t.card_baths}</p>
                      </div>
                      <div className="text-center">
                          <p className="text-white text-2xl font-serif">{selectedProperty.metros}</p>
                          <p className="text-[#444] text-[8px] uppercase font-bold tracking-widest">M²</p>
                      </div>
                  </div>

                  <div className="mt-auto flex flex-col sm:flex-row gap-6">
                      <button 
                        onClick={() => { setLeadContext(`Interés: ${selectedProperty.titulo}`); setSelectedProperty(null); }}
                        className="flex-grow btn-luxury-gold py-6 text-[10px] font-black uppercase tracking-widest text-black"
                      >
                        {t.modal_request_btn}
                      </button>
                      <a 
                        href={`https://wa.me/14377768395?text=Más información de ${selectedProperty.titulo}`}
                        target="_blank"
                        className="flex-grow flex items-center justify-center gap-4 bg-white/5 border border-white/10 text-white py-6 text-[10px] font-black uppercase tracking-widest hover:bg-[#D4AF37] hover:text-black transition-all"
                      >
                        <MessageCircle className="w-4 h-4" />
                        WHATSAPP
                      </a>
                  </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FLOATING CONCIERGE BUTTON */}
      <div className="fixed bottom-10 right-10 z-[150] group">
        <a 
          href="https://wa.me/14377768395" 
          target="_blank"
          className="concierge-float w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center text-black shadow-2xl hover:scale-110 transition-transform"
        >
          <Headphones className="w-7 h-7" />
        </a>
      </div>
    </div>
  );
};

export default App;
