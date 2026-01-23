
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
  MessageCircle, 
  MapPin, 
  Sparkles, 
  Headphones, 
  Maximize2,
  Bed,
  Bath,
  CheckCircle2,
  FileText,
  Info,
  ArrowUpRight
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
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=90&w=2000" 
            className="w-full h-full object-cover" 
            alt="Luxury Mansion Exterior"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#011511] via-[#022c22]/30 to-black/20"></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1.2 }}
          className="relative z-10 text-center px-6"
        >
          <h1 className="text-6xl md:text-[110px] font-serif font-bold text-white mb-8 leading-none tracking-tighter">
            {t.hero_title.split(' ').map((word, i) => (
              <span key={i} className={i === 2 ? "text-[#D4AF37] italic" : ""}>{word} </span>
            ))}
          </h1>
          <p className="text-[#D4AF37] text-sm md:text-2xl font-light tracking-[0.7em] uppercase mb-14 opacity-90">
            {t.hero_subtitle}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button 
                onClick={() => navigateTo('catalog')}
                className="btn-luxury-gold text-black px-14 py-6 text-[11px] font-black uppercase tracking-[0.5em] shadow-2xl"
            >
                {t.hero_cta}
            </button>
            <button 
                onClick={() => setLeadContext('Asesoría Personalizada')}
                className="btn-luxury-outline px-14 py-6 text-[11px] font-black uppercase tracking-[0.5em]"
            >
                Hablar con un Experto
            </button>
          </div>
        </motion.div>
      </section>

      <section className="py-40 bg-[#011511] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent"></div>
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-24 relative z-10">
          {SERVICIOS.map((serv, index) => (
            <motion.div 
              key={serv.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className="text-center group cursor-pointer p-10 bg-[#022c22]/30 border border-white/5 hover:border-[#D4AF37]/30 transition-all"
              onClick={() => setLeadContext(`Interés en: ${serv.titulo}`)}
            >
              <div className="text-6xl mb-8 group-hover:scale-110 transition-transform duration-500">{serv.icono}</div>
              <h3 className="text-2xl font-serif text-[#D4AF37] mb-4 uppercase tracking-tighter">{serv.titulo}</h3>
              <p className="text-white/50 text-[10px] tracking-[0.3em] uppercase leading-relaxed mb-8">{serv.descripcion}</p>
              <span className="text-[#D4AF37] text-[9px] font-black tracking-[0.4em] uppercase opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-2">
                Solicitar Info <ArrowUpRight className="w-3 h-3" />
              </span>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );

  const renderCatalog = () => (
    <section className="pt-40 pb-40 min-h-screen bg-[#011511]">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <span className="text-[#D4AF37] text-[11px] font-black tracking-[0.8em] uppercase mb-4 block">Portafolio Premium</span>
            <h2 className="text-6xl font-serif font-bold text-white tracking-tighter">{t.section_properties}</h2>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-wrap gap-5"
          >
             <select 
              value={filters.operacion}
              onChange={(e) => setFilters({...filters, operacion: e.target.value})}
              className="bg-[#022c22]/80 border border-white/10 px-8 py-4 text-[11px] font-bold uppercase tracking-widest text-white outline-none focus:border-[#D4AF37] appearance-none cursor-pointer"
             >
                <option value="todos">Operación</option>
                <option value="Venta">En Venta</option>
                <option value="Renta">En Renta</option>
             </select>
             <select 
              value={filters.tipo}
              onChange={(e) => setFilters({...filters, tipo: e.target.value})}
              className="bg-[#022c22]/80 border border-white/10 px-8 py-4 text-[11px] font-bold uppercase tracking-widest text-white outline-none focus:border-[#D4AF37] appearance-none cursor-pointer"
             >
                <option value="todos">Tipo de Propiedad</option>
                <option value="Casa">Residencias</option>
                <option value="Departamento">Departamentos</option>
             </select>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-24 p-10 bg-white/[0.03] border border-white/10 backdrop-blur-sm"
        >
           <form onSubmit={handleAISearch} className="flex flex-col md:flex-row gap-6">
             <div className="flex-grow relative">
                <input 
                    type="text"
                    value={filters.query}
                    onChange={(e) => setFilters({...filters, query: e.target.value})}
                    placeholder={t.filter_ai_placeholder}
                    className="w-full bg-transparent border-b border-white/20 py-4 text-[12px] uppercase tracking-widest text-white outline-none focus:border-[#D4AF37] transition-all"
                />
                <Sparkles className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4AF37]/50" />
             </div>
             <button type="submit" className="btn-luxury-gold px-12 py-4 text-[10px] font-black tracking-widest text-black flex items-center justify-center gap-3">
                {isAIProcessing ? 'PROCESANDO...' : 'CONSULTAR INTELIGENCIA ARTIFICIAL'}
             </button>
           </form>
           <AnimatePresence>
            {aiExplanation && (
              <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-6 text-[#D4AF37]/60 text-[11px] italic font-medium">
                AI Response: "{aiExplanation}"
              </motion.p>
            )}
           </AnimatePresence>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
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
    <section className="pt-40 min-h-screen bg-[#011511]">
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-32 items-center mb-40">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="relative"
        >
          <div className="absolute inset-0 border-[20px] border-[#D4AF37]/10 -m-10 pointer-events-none"></div>
          <img 
            src="https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?auto=format&fit=crop&q=80&w=1000" 
            className="w-full aspect-[4/5] object-cover shadow-[0_50px_100px_-20px_rgba(0,0,0,0.7)] relative z-10" 
            alt="Miguel Angel Pérez In Action"
          />
          <div className="absolute -bottom-14 -right-14 bg-[#D4AF37] p-16 text-black z-20 shadow-2xl hidden xl:block">
            <h4 className="text-5xl font-serif font-bold mb-3 tracking-tighter">ELITE</h4>
            <p className="text-[11px] font-black tracking-[0.5em] uppercase">Standards</p>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <span className="text-[#D4AF37] text-[12px] font-black tracking-[1em] uppercase mb-8 block">Marketing de Autor</span>
          <h2 className="text-7xl font-serif font-bold text-white mb-12 tracking-tighter leading-none uppercase">Venda su propiedad como una obra de arte.</h2>
          <p className="text-white/60 text-xl font-light mb-16 leading-relaxed max-w-xl">
            La venta de una propiedad de alto perfil requiere más que un listado; requiere una curaduría experta. Aplicamos técnicas de <span className="text-[#D4AF37] italic">gastronomía de marketing</span> para deleitar a los prospectos más exigentes.
          </p>
          <button 
            onClick={() => setLeadContext('Venta de Propiedad Premium')}
            className="btn-luxury-gold text-black px-20 py-7 text-[12px] font-black uppercase tracking-[0.6em] shadow-2xl"
          >
            SOLICITAR AUDITORÍA DE VALOR
          </button>
        </motion.div>
      </div>
      
      <div className="bg-[#021f1a] py-40 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-24">
            <span className="text-[#D4AF37] text-[10px] font-black tracking-[0.6em] uppercase mb-4 block">Clientes Satisfechos</span>
            <h3 className="text-5xl font-serif font-bold text-white tracking-tighter">La Voz de la Exclusividad</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {TESTIMONIOS.map((test, idx) => (
              <motion.div 
                key={test.id} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="bg-[#011511] p-16 border border-white/5 flex flex-col md:flex-row gap-10 items-center hover:border-[#D4AF37]/30 transition-all duration-500"
              >
                <img src={test.foto} className="w-24 h-24 rounded-full object-cover grayscale hover:grayscale-0 transition-all duration-500 border-2 border-[#D4AF37]/20" alt={test.nombre} />
                <div>
                  <Sparkles className="w-6 h-6 text-[#D4AF37] mb-6 opacity-40" />
                  <p className="text-white italic text-xl mb-6 leading-relaxed font-serif">"{test.comentario}"</p>
                  <p className="text-[#D4AF37] font-bold text-xs tracking-[0.3em] uppercase">{test.nombre}</p>
                  <p className="text-white/30 text-[9px] uppercase tracking-widest mt-1">{test.rol}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-[#011511] selection:bg-[#D4AF37] selection:text-black">
      <header className="fixed top-0 w-full z-[100] bg-[#022c22]/95 backdrop-blur-xl border-b border-white/10 h-28 transition-all">
        <div className="container mx-auto px-6 h-full flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col cursor-pointer group"
            onClick={() => navigateTo('home')}
          >
            <span className="text-white text-2xl font-serif font-bold tracking-tighter group-hover:text-[#D4AF37] transition-colors duration-500">MIGUEL ANGEL PÉREZ</span>
            <span className="text-[#D4AF37] text-[9px] uppercase tracking-[0.6em] font-black opacity-80 group-hover:opacity-100">El Chef Inmobiliario</span>
          </motion.div>

          <nav className="hidden lg:flex items-center gap-14 text-[10px] font-black text-white uppercase tracking-[0.3em]">
            <button onClick={() => navigateTo('home')} className={`nav-link ${currentView === 'home' ? 'text-[#D4AF37]' : ''}`}>{t.nav_home}</button>
            <button onClick={() => navigateTo('catalog')} className={`nav-link ${currentView === 'catalog' ? 'text-[#D4AF37]' : ''}`}>{t.nav_properties}</button>
            <button onClick={() => navigateTo('sell')} className={`nav-link ${currentView === 'sell' ? 'text-[#D4AF37]' : ''}`}>{t.nav_sell}</button>
          </nav>

          <div className="flex items-center gap-8">
            <button 
              onClick={toggleLanguage}
              className="text-white/40 hover:text-[#D4AF37] transition-all text-[10px] font-black uppercase tracking-widest border border-white/10 px-5 py-2 hover:border-[#D4AF37]/50"
            >
              {t.lang_btn}
            </button>

            <a 
              href="https://wa.me/14377768395"
              target="_blank"
              className="btn-luxury-gold text-black px-8 py-4 text-[10px] font-black uppercase tracking-widest flex items-center gap-3 shadow-lg"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline">{t.nav_cta}</span>
            </a>

            <button className="lg:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
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
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[200] bg-[#011511] p-12 flex flex-col items-center justify-center overflow-y-auto custom-scrollbar"
          >
            <button className="absolute top-10 right-10 text-white p-2" onClick={() => setIsMenuOpen(false)}>
              <X className="w-10 h-10" />
            </button>
            <div className="flex flex-col gap-14 items-center">
              <button onClick={() => navigateTo('home')} className="text-5xl font-serif text-white uppercase tracking-tighter hover:text-[#D4AF37] transition-colors">Inicio</button>
              <button onClick={() => navigateTo('catalog')} className="text-5xl font-serif text-white uppercase tracking-tighter hover:text-[#D4AF37] transition-colors">Propiedades</button>
              <button onClick={() => navigateTo('sell')} className="text-5xl font-serif text-white uppercase tracking-tighter hover:text-[#D4AF37] transition-colors">Vender</button>
              <div className="flex gap-10 mt-12">
                <Instagram className="w-8 h-8 text-[#D4AF37] hover:scale-125 transition-transform" />
                <Linkedin className="w-8 h-8 text-[#D4AF37] hover:scale-125 transition-transform" />
                <Facebook className="w-8 h-8 text-[#D4AF37] hover:scale-125 transition-transform" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentView}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          {currentView === 'home' && renderHome()}
          {currentView === 'catalog' && renderCatalog()}
          {currentView === 'sell' && renderSell()}
        </motion.div>
      </AnimatePresence>

      <footer className="bg-[#011511] pt-40 pb-20 border-t border-white/5 relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37]/10 to-transparent"></div>
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-20 mb-32">
            <div className="col-span-1 md:col-span-1">
              <h3 className="text-white font-serif font-bold text-2xl mb-8 tracking-tighter">MIGUEL ANGEL PÉREZ</h3>
              <p className="text-white/40 text-[10px] uppercase tracking-[0.4em] leading-loose">
                HG Hola Group Property Advisors.<br/>Liderazgo y visión en el mercado internacional de lujo.
              </p>
            </div>
            <div>
              <h4 className="text-[#D4AF37] text-[11px] font-black tracking-widest uppercase mb-8">{t.footer_offices}</h4>
              <p className="text-white/60 text-[10px] uppercase tracking-widest leading-loose">Paseo de la Reforma 250, Juárez<br/>CDMX, 06600</p>
            </div>
            <div>
              <h4 className="text-[#D4AF37] text-[11px] font-black tracking-widest uppercase mb-8">{t.footer_care}</h4>
              <p className="text-white/60 text-[10px] uppercase tracking-widest leading-loose">+52 55 8888 9999<br/>concierge@hola-group.mx</p>
            </div>
            <div className="flex gap-6">
               <Instagram className="w-6 h-6 text-white/20 hover:text-[#D4AF37] cursor-pointer transition-all duration-300" />
               <Linkedin className="w-6 h-6 text-white/20 hover:text-[#D4AF37] cursor-pointer transition-all duration-300" />
               <Facebook className="w-6 h-6 text-white/20 hover:text-[#D4AF37] cursor-pointer transition-all duration-300" />
            </div>
          </div>
          <div className="text-center pt-20 border-t border-white/5">
            <p className="text-white/20 text-[9px] uppercase tracking-[0.8em]">© 2024 Miguel Angel Pérez | El Chef Inmobiliario. All Rights Reserved.</p>
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
            className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-[#011511]/95 backdrop-blur-2xl overflow-y-auto"
          >
            <div className="absolute inset-0" onClick={() => setLeadContext(null)}></div>
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              className="bg-[#022c22] max-w-xl w-full p-12 md:p-20 relative border border-[#D4AF37]/30 shadow-[0_50px_100px_rgba(0,0,0,0.8)] my-8 overflow-hidden flex flex-col max-h-[90vh]"
            >
              <button onClick={() => setLeadContext(null)} className="absolute top-8 right-8 text-white/30 hover:text-white p-2 z-10 transition-colors"><X className="w-8 h-8" /></button>
              
              <div className="overflow-y-auto custom-scrollbar flex-1 pr-4">
                <span className="text-[#D4AF37] text-[10px] font-black tracking-[0.5em] uppercase mb-4 block">Contacto Concierge</span>
                <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4 tracking-tighter uppercase leading-none">{leadStatus === 'success' ? 'Solicitud Recibida' : leadContext}</h2>
                
                {leadStatus === 'success' ? (
                  <div className="text-center py-20">
                    <Sparkles className="w-16 h-16 text-[#D4AF37] mx-auto mb-10" />
                    <p className="text-white/60 text-[12px] uppercase tracking-[0.4em] leading-loose">Su solicitud ha sido procesada. Un asesor de cuenta se pondrá en contacto con usted en las próximas 24 horas.</p>
                    <button onClick={() => setLeadContext(null)} className="mt-12 text-[#D4AF37] text-[10px] font-black tracking-widest uppercase border-b border-[#D4AF37]/40 pb-2">Regresar</button>
                  </div>
                ) : (
                  <form onSubmit={handleLeadSubmit} className="space-y-12 mt-16">
                    <div className="space-y-4">
                      <label className="text-[10px] uppercase font-black text-[#D4AF37]/50 tracking-[0.3em]">Nombre Completo</label>
                      <input required type="text" className="w-full bg-transparent border-b border-white/20 py-4 text-white outline-none focus:border-[#D4AF37] transition-all text-xl font-light" placeholder="John Doe" />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] uppercase font-black text-[#D4AF37]/50 tracking-[0.3em]">Email Corporativo</label>
                      <input required type="email" className="w-full bg-transparent border-b border-white/20 py-4 text-white outline-none focus:border-[#D4AF37] transition-all text-xl font-light" placeholder="j.doe@company.com" />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] uppercase font-black text-[#D4AF37]/50 tracking-[0.3em]">Móvil / WhatsApp</label>
                      <input required type="tel" className="w-full bg-transparent border-b border-white/20 py-4 text-white outline-none focus:border-[#D4AF37] transition-all text-xl font-light" placeholder="+52 ..." />
                    </div>
                    <button type="submit" className="w-full btn-luxury-gold py-8 text-[12px] font-black uppercase tracking-[0.6em] text-black shadow-2xl mt-10">
                      {leadStatus === 'sending' ? 'PROCESANDO...' : 'SOLICITAR ACCESO PRIVADO'}
                    </button>
                  </form>
                )}
              </div>
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
            className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-10 glass-emerald overflow-y-auto backdrop-blur-2xl"
          >
            <div className="absolute inset-0 bg-[#011511]/40" onClick={() => setSelectedProperty(null)}></div>
            
            <motion.div 
              initial={{ y: 100, scale: 0.9, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 100, scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 30, stiffness: 200 }}
              className="bg-[#022c22] max-w-7xl w-full h-auto lg:h-[85vh] overflow-hidden relative grid grid-cols-1 lg:grid-cols-12 shadow-[0_50px_100px_rgba(0,0,0,0.9)] border border-[#D4AF37]/40 rounded-none my-auto"
            >
              <button 
                onClick={() => setSelectedProperty(null)} 
                className="absolute top-8 right-8 z-[320] bg-[#022c22] border border-[#D4AF37]/50 p-4 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#022c22] transition-all rounded-full shadow-2xl group"
              >
                <X className="w-8 h-8 transition-transform group-hover:rotate-90" />
              </button>

              <div className="lg:col-span-5 relative h-[400px] md:h-[550px] lg:h-full overflow-hidden bg-black/40">
                  <motion.img 
                    initial={{ scale: 1.3 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    src={selectedProperty.img} 
                    className="w-full h-full object-cover" 
                    alt={selectedProperty.titulo} 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#022c22] via-transparent to-black/20"></div>
                  
                  <div className="absolute bottom-12 left-12 flex flex-col gap-5">
                    <span className="px-8 py-3 bg-[#D4AF37] text-black text-[11px] font-black uppercase tracking-[0.4em] shadow-2xl inline-block w-fit">
                        {selectedProperty.operacion}
                    </span>
                    <span className="px-8 py-3 bg-white/5 backdrop-blur-md text-white text-[11px] font-bold uppercase tracking-[0.4em] border border-white/20 shadow-2xl inline-block w-fit">
                        {selectedProperty.tipo}
                    </span>
                  </div>
              </div>

              <div className="lg:col-span-7 flex flex-col h-full emerald-gradient relative min-h-0">
                  <div className="p-10 md:p-20 overflow-y-auto flex-1 custom-scrollbar w-full">
                      <div className="mb-14">
                        <div className="flex items-center gap-4 text-[#D4AF37] font-black text-[11px] uppercase tracking-[0.8em] mb-6">
                            <MapPin className="w-4 h-4" />
                            {selectedProperty.zona}
                        </div>
                        <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-10 tracking-tighter leading-tight border-l-8 border-[#D4AF37] pl-10 uppercase">
                            {selectedProperty.titulo}
                        </h2>
                        <div className="flex flex-wrap items-center gap-10">
                            <div className="flex flex-col">
                                <span className="text-white/30 text-[10px] font-black uppercase tracking-widest mb-1">Precio de Mercado</span>
                                <p className="text-4xl md:text-6xl font-bold text-[#D4AF37] tracking-tighter">
                                    {FORMAT_PRICE(selectedProperty.precio)}
                                </p>
                            </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-14">
                          <div className="bg-[#064e3b]/50 p-8 border border-white/5 flex flex-col items-center justify-center text-center transition-all hover:border-[#D4AF37]/40 hover:bg-[#064e3b]">
                              <Bed className="w-7 h-7 text-[#D4AF37] mb-3" />
                              <p className="text-white text-2xl font-serif">{selectedProperty.recamaras}</p>
                              <p className="text-white/40 text-[9px] font-black uppercase tracking-[0.3em] mt-2">{t.card_rooms}</p>
                          </div>
                          <div className="bg-[#064e3b]/50 p-8 border border-white/5 flex flex-col items-center justify-center text-center transition-all hover:border-[#D4AF37]/40 hover:bg-[#064e3b]">
                              <Bath className="w-7 h-7 text-[#D4AF37] mb-3" />
                              <p className="text-white text-2xl font-serif">{selectedProperty.banos}</p>
                              <p className="text-white/40 text-[9px] font-black uppercase tracking-[0.3em] mt-2">{t.card_baths}</p>
                          </div>
                          <div className="bg-[#064e3b]/50 p-8 border border-white/5 flex flex-col items-center justify-center text-center transition-all hover:border-[#D4AF37]/40 hover:bg-[#064e3b]">
                              <Maximize2 className="w-7 h-7 text-[#D4AF37] mb-3" />
                              <p className="text-white text-2xl font-serif">{selectedProperty.metros}</p>
                              <p className="text-white/40 text-[9px] font-black uppercase tracking-[0.3em] mt-2">M² Totales</p>
                          </div>
                          <div className="bg-[#064e3b]/50 p-8 border border-white/5 flex flex-col items-center justify-center text-center transition-all hover:border-[#D4AF37]/40 hover:bg-[#064e3b]">
                              <Info className="w-7 h-7 text-[#D4AF37] mb-3" />
                              <p className="text-white text-[11px] font-black uppercase tracking-tighter leading-tight">Clase A+</p>
                              <p className="text-white/40 text-[9px] font-black uppercase tracking-[0.3em] mt-2">Portfolio</p>
                          </div>
                      </div>

                      <div className="mb-14">
                        <div className="flex items-center gap-4 mb-8">
                            <FileText className="w-5 h-5 text-[#D4AF37]" />
                            <span className="text-white text-[12px] font-black uppercase tracking-[0.6em]">Dossier Informativo</span>
                        </div>
                        <div className="bg-white/[0.03] p-12 border-l-4 border-[#D4AF37] shadow-inner relative overflow-hidden group/text">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <Sparkles className="w-20 h-20 text-[#D4AF37]" />
                            </div>
                            <p className="text-white/80 text-xl md:text-2xl font-light leading-relaxed font-serif tracking-wide relative z-10">
                              {selectedProperty.descripcion}
                            </p>
                        </div>
                      </div>

                      <div className="mb-20">
                          <span className="text-[#D4AF37]/50 text-[10px] font-black uppercase tracking-[0.8em] mb-10 block">Amenidades y Características</span>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                              {selectedProperty.caracteristicas.map((c, i) => (
                                  <div key={i} className="flex items-center gap-6 text-white/60 group/feat">
                                    <CheckCircle2 className="w-5 h-5 text-[#D4AF37] shrink-0 opacity-30 group-hover/feat:opacity-100 transition-all duration-300" />
                                    <span className="text-[11px] font-bold uppercase tracking-[0.2em] transition-all group-hover/feat:text-white">{c}</span>
                                  </div>
                              ))}
                          </div>
                      </div>
                  </div>

                  <div className="p-12 md:p-20 border-t border-white/10 bg-[#022c22]/90 backdrop-blur-3xl z-20">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <button 
                          onClick={() => { setLeadContext(`Interés en: ${selectedProperty.titulo}`); setSelectedProperty(null); }}
                          className="btn-luxury-gold text-black py-8 text-[12px] font-black uppercase tracking-[0.6em] shadow-[0_20px_50px_rgba(212,175,55,0.3)]"
                        >
                          {t.modal_request_btn}
                        </button>
                        <a 
                          href={`https://wa.me/14377768395?text=Hola Miguel, solicito el dossier privado de: ${selectedProperty.titulo}`}
                          target="_blank"
                          className="flex items-center justify-center gap-4 bg-[#064e3b] border border-[#D4AF37]/50 text-white py-8 text-[12px] font-black uppercase tracking-[0.6em] hover:bg-[#D4AF37] hover:text-[#022c22] transition-all duration-500 group shadow-2xl"
                        >
                          <MessageCircle className="w-6 h-6 text-[#D4AF37] group-hover:text-black" />
                          CONCIERGE DIRECTO
                        </a>
                      </div>
                  </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed bottom-12 right-12 z-[150] group">
        <div className="absolute -top-16 right-0 bg-[#D4AF37] text-black text-[9px] font-black uppercase tracking-widest px-4 py-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl">
            Atención VIP Online
        </div>
        <a 
          href="https://wa.me/14377768395" 
          target="_blank"
          className="concierge-float w-20 h-20 bg-[#D4AF37] rounded-full flex items-center justify-center text-[#022c22] shadow-[0_20px_40px_rgba(0,0,0,0.5)] hover:scale-110 transition-transform"
        >
          <Headphones className="w-8 h-8" />
        </a>
      </div>
    </div>
  );
};

export default App;
