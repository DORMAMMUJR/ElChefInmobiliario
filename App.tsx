
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
  MapPin
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  const [language, setLanguage] = useState<'es' | 'en'>('es');
  const t = TRANSLATIONS[language];

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
  const [leadStatus, setLeadStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  // Reveal animation on scroll
  useEffect(() => {
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-reveal');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [language]); // Re-observe if language changes and elements re-render

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
    const result = await parseUserSearchIntent(filters.query);
    if (result) {
      setFilters(prev => ({
        ...prev,
        operacion: result.operacion === 'Venta' ? 'Venta' : result.operacion === 'Renta' ? 'Renta' : 'todos',
        tipo: result.tipo || 'todos',
        precioMax: result.precioMax ? result.precioMax.toString() : '',
      }));
    }
    setIsAIProcessing(false);
  };

  const toggleLanguage = () => setLanguage(prev => prev === 'es' ? 'en' : 'es');

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

  return (
    <div className="min-h-screen bg-[#050505]">
      {/* HEADER STICKY */}
      <header className="fixed top-0 w-full z-[100] bg-[#050505]/95 backdrop-blur-md border-b border-white/5 h-24">
        <div className="container mx-auto px-6 h-full flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <span className="text-white text-lg font-serif font-bold tracking-tighter">MIGUEL ANGEL PÉREZ</span>
            <span className="text-[#D4AF37] text-[9px] uppercase tracking-[0.4em] font-bold">El Chef Inmobiliario</span>
          </motion.div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-10 text-[10px] font-bold text-white uppercase tracking-widest">
            <a href="#inicio" className="nav-link">{t.nav_home}</a>
            <a href="#inventario" className="nav-link">{t.nav_properties}</a>
            <a href="#vender" className="nav-link">{t.nav_sell}</a>
            <a href="#nosotros" className="nav-link">{t.nav_about}</a>
          </nav>

          <div className="flex items-center gap-4 md:gap-8">
            {/* Language Switcher */}
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-2 text-white/60 hover:text-[#D4AF37] transition-colors text-[10px] font-bold uppercase tracking-widest border border-white/10 px-3 py-1"
            >
              <Globe className="w-3 h-3" />
              {t.lang_btn}
            </button>

            <div className="hidden sm:flex flex-col items-end opacity-60">
                <span className="text-[#D4AF37] text-[10px] font-bold tracking-widest">HG</span>
                <span className="text-white text-[8px] uppercase tracking-[0.2em]">HolaGroup</span>
            </div>

            <a 
              href="https://wa.me/14377768395"
              target="_blank"
              className="bg-[#D4AF37] text-black px-6 md:px-8 py-3 rounded-none text-[10px] font-bold hover:bg-white transition-all tracking-[0.2em] flex items-center gap-2"
            >
              <MessageCircle className="w-3 h-3" />
              <span className="hidden xs:inline">{t.nav_cta}</span>
            </a>

            {/* Mobile Menu Toggle */}
            <button 
              className="lg:hidden text-white p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-[#111] border-b border-white/5 overflow-hidden"
            >
              <nav className="flex flex-col p-8 gap-6 text-[11px] font-bold text-white uppercase tracking-widest">
                <a href="#inicio" onClick={() => setIsMenuOpen(false)}>{t.nav_home}</a>
                <a href="#inventario" onClick={() => setIsMenuOpen(false)}>{t.nav_properties}</a>
                <a href="#vender" onClick={() => setIsMenuOpen(false)}>{t.nav_sell}</a>
                <a href="#nosotros" onClick={() => setIsMenuOpen(false)}>{t.nav_about}</a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* HERO SECTION */}
      <section id="inicio" className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: 'linear' }}
          src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=90&w=2000" 
          className="absolute inset-0 w-full h-full object-cover" 
          alt="Luxury Architecture"
        />
        <div className="absolute inset-0 hero-overlay opacity-80"></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="relative z-10 text-center px-6"
        >
          <h1 className="text-5xl md:text-8xl font-serif font-bold text-white mb-8 drop-shadow-2xl">
            {t.hero_title}
          </h1>
          <p className="text-[#D4AF37] text-lg md:text-2xl font-light tracking-[0.2em] uppercase mb-12">
            {t.hero_subtitle}
          </p>
          <a href="#inventario" className="inline-block border border-white text-white px-12 py-5 text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-white hover:text-black transition-all">
            {t.hero_cta}
          </a>
        </motion.div>

        {/* ADVANCED SEARCH BAR (FLOATING) */}
        <motion.div 
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-0 left-0 w-full px-6 translate-y-1/2 z-20"
        >
          <div className="container mx-auto">
            <div className="bg-[#111] p-8 md:p-12 shadow-luxury border border-white/5">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[9px] uppercase font-bold text-[#A0A0A0] tracking-widest">{t.filter_op}</label>
                  <select 
                    value={filters.operacion}
                    onChange={(e) => setFilters({...filters, operacion: e.target.value})}
                    className="w-full border border-white/10 rounded-none p-4 text-sm focus:border-[#D4AF37] outline-none"
                  >
                    <option value="todos">{language === 'es' ? 'Cualquiera' : 'Any'}</option>
                    <option value="Venta">Venta</option>
                    <option value="Renta">Renta</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[9px] uppercase font-bold text-[#A0A0A0] tracking-widest">{t.filter_type}</label>
                  <select 
                    value={filters.tipo}
                    onChange={(e) => setFilters({...filters, tipo: e.target.value})}
                    className="w-full border border-white/10 rounded-none p-4 text-sm focus:border-[#D4AF37] outline-none"
                  >
                    <option value="todos">{language === 'es' ? 'Cualquiera' : 'Any'}</option>
                    <option value="Casa">Casa</option>
                    <option value="Departamento">Departamento</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[9px] uppercase font-bold text-[#A0A0A0] tracking-widest">{t.filter_loc}</label>
                  <select 
                    value={filters.zona}
                    onChange={(e) => setFilters({...filters, zona: e.target.value})}
                    className="w-full border border-white/10 rounded-none p-4 text-sm focus:border-[#D4AF37] outline-none"
                  >
                    <option value="todos">Ciudad de México</option>
                    {Array.from(new Set(PROPIEDADES.map(p => p.zona))).map(z => (
                      <option key={z} value={z}>{z}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[9px] uppercase font-bold text-[#A0A0A0] tracking-widest">{t.filter_rooms}</label>
                  <select className="w-full border border-white/10 rounded-none p-4 text-sm focus:border-[#D4AF37] outline-none">
                    <option>{language === 'es' ? 'Cualquiera' : 'Any'}</option>
                    <option>1+</option>
                    <option>2+</option>
                    <option>3+</option>
                  </select>
                </div>
                <button className="bg-[#D4AF37] text-black font-bold h-[54px] mt-auto flex items-center justify-center gap-3 hover:bg-white transition-all uppercase tracking-[0.2em] text-xs">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                  {t.filter_search_btn}
                </button>
              </div>

              {/* AI INTEGRATION */}
              <div className="mt-8 pt-8 border-t border-white/5">
                <form onSubmit={handleAISearch} className="flex gap-4">
                  <input 
                    type="text" 
                    value={filters.query}
                    onChange={(e) => setFilters({...filters, query: e.target.value})}
                    placeholder={t.filter_ai_placeholder}
                    className="flex-grow border border-white/10 py-3 px-6 text-xs outline-none focus:border-[#D4AF37] bg-black/20"
                  />
                  <button type="submit" className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-widest hover:text-white transition-colors">
                    {isAIProcessing ? '...' : 'AI ASSISTANT'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* NUEVOS DESARROLLOS */}
      <main id="inventario" className="pt-64 pb-32 bg-[#050505]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center mb-20 text-center reveal-on-scroll">
            <span className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.6em] mb-4">Curaduría Exclusiva</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">{t.section_properties}</h2>
            <div className="w-20 h-[1px] bg-[#D4AF37]"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredProperties.map((prop, index) => (
              <div key={prop.id} className="reveal-on-scroll" style={{ animationDelay: `${index * 0.1}s` }}>
                <PropertyCard 
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
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* VENDER SECCIÓN (PLACEHOLDER) */}
      <section id="vender" className="py-32 bg-[#111] reveal-on-scroll">
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative aspect-square">
                <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover grayscale-[30%]" alt="Sell Luxury" />
                <div className="absolute inset-0 border-[20px] border-[#D4AF37]/10 translate-x-10 translate-y-10 -z-10"></div>
            </div>
            <div>
                <span className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.6em] mb-4">{t.nav_sell}</span>
                <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-8 leading-tight">Maximizamos el Valor de su Propiedad</h2>
                <p className="text-[#A0A0A0] text-lg font-light leading-relaxed mb-12 uppercase tracking-widest">Servicio de asesoría estratégica para inmuebles de alto perfil.</p>
                <button 
                  onClick={() => setLeadContext(t.nav_sell)}
                  className="bg-[#D4AF37] text-black px-12 py-5 text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-white transition-all"
                >
                  Agendar Consultoría
                </button>
            </div>
        </div>
      </section>

      {/* SERVICIOS EXCLUSIVOS */}
      <section className="py-32 bg-[#050505]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-24 reveal-on-scroll">
            <h2 className="text-4xl font-serif font-bold text-white mb-6">{t.section_services}</h2>
            <p className="text-[#A0A0A0] tracking-widest uppercase text-xs">Expertise Inmobiliaria de Guante Blanco</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {SERVICIOS.map((serv, index) => (
              <div key={serv.id} className="text-center group reveal-on-scroll" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="text-5xl mb-8 group-hover:scale-110 transition-transform duration-500 block">{serv.icono}</div>
                <h3 className="text-xl font-serif text-[#D4AF37] mb-4">{serv.titulo}</h3>
                <p className="text-[#A0A0A0] text-sm leading-relaxed max-w-xs mx-auto">{serv.descripcion}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEL QUIERO A LA REALIDAD */}
      <section className="py-32 bg-[#111]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center mb-24 text-center reveal-on-scroll">
            <h2 className="text-4xl font-serif font-bold text-white mb-6">{t.section_testimonials}</h2>
            <div className="w-16 h-[1px] bg-[#D4AF37]"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {TESTIMONIOS.map((test, index) => (
              <div key={test.id} className="bg-[#050505] p-12 border border-white/5 flex flex-col md:flex-row gap-8 items-center md:items-start transition-all hover:border-[#D4AF37]/30 reveal-on-scroll" style={{ animationDelay: `${index * 0.2}s` }}>
                <img src={test.foto} className="w-24 h-24 rounded-full object-cover border border-[#D4AF37]" alt={test.nombre} />
                <div className="text-center md:text-left">
                  <p className="text-white italic text-lg font-light leading-relaxed mb-6">"{test.comentario}"</p>
                  <h4 className="text-[#D4AF37] font-bold text-sm tracking-widest uppercase">{test.nombre}</h4>
                  <span className="text-[#A0A0A0] text-[10px] uppercase tracking-widest">{test.rol}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NOSOTROS SECCIÓN (PLACEHOLDER) */}
      <section id="nosotros" className="py-32 bg-[#050505] reveal-on-scroll">
        <div className="container mx-auto px-6 text-center max-w-4xl">
            <h2 className="text-5xl font-serif font-bold text-white mb-10">La Diferencia es el Detalle</h2>
            <p className="text-[#A0A0A0] text-lg font-light leading-relaxed mb-12 tracking-widest uppercase">
                Miguel Angel Pérez combina la pasión de un chef con la precisión de un estratega inmobiliario. Cada propiedad es una receta única de arquitectura, inversión y estilo de vida.
            </p>
            <div className="flex justify-center gap-12">
                <div className="text-center">
                    <p className="text-[#D4AF37] text-4xl font-serif mb-2">15+</p>
                    <p className="text-white text-[9px] uppercase tracking-widest font-bold">Años de Trayectoria</p>
                </div>
                <div className="text-center">
                    <p className="text-[#D4AF37] text-4xl font-serif mb-2">500+</p>
                    <p className="text-white text-[9px] uppercase tracking-widest font-bold">Clientes Satisfechos</p>
                </div>
                <div className="text-center">
                    <p className="text-[#D4AF37] text-4xl font-serif mb-2">80%</p>
                    <p className="text-white text-[9px] uppercase tracking-widest font-bold">Referidos</p>
                </div>
            </div>
        </div>
      </section>

      {/* FOOTER CORPORATIVO */}
      <footer className="bg-[#050505] pt-32 pb-16 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
            <div className="col-span-1 md:col-span-1">
              <h3 className="text-white font-serif font-bold text-xl mb-8">MIGUEL ANGEL PÉREZ</h3>
              <p className="text-[#A0A0A0] text-xs leading-relaxed uppercase tracking-widest">
                HG Hola Group Property Advisors. Liderazgo y excelencia en Real Estate de Ultra-Lujo.
              </p>
              <div className="flex gap-4 mt-8">
                  <a href="#" className="w-10 h-10 border border-white/10 flex items-center justify-center text-[#A0A0A0] hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all">
                      <Instagram className="w-4 h-4" />
                  </a>
                  <a href="#" className="w-10 h-10 border border-white/10 flex items-center justify-center text-[#A0A0A0] hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all">
                      <Linkedin className="w-4 h-4" />
                  </a>
                  <a href="#" className="w-10 h-10 border border-white/10 flex items-center justify-center text-[#A0A0A0] hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all">
                      <Facebook className="w-4 h-4" />
                  </a>
              </div>
            </div>
            <div>
              <h4 className="text-white font-bold text-[10px] uppercase tracking-[0.3em] mb-8">{t.footer_offices}</h4>
              <div className="space-y-4">
                  <div className="flex items-start gap-4">
                      <MapPin className="w-4 h-4 text-[#D4AF37] mt-1 shrink-0" />
                      <p className="text-[#A0A0A0] text-xs leading-loose uppercase tracking-wider">
                        Presidente Masaryk 120<br/>
                        Polanco, Ciudad de México<br/>
                        CP 11560
                      </p>
                  </div>
              </div>
            </div>
            <div>
              <h4 className="text-white font-bold text-[10px] uppercase tracking-[0.3em] mb-8">{t.footer_care}</h4>
              <div className="space-y-4">
                  <a href="tel:525512345678" className="flex items-center gap-4 text-[#A0A0A0] text-xs leading-loose hover:text-[#D4AF37] group">
                      <Phone className="w-4 h-4 text-[#D4AF37]" />
                      <span>+52 55 1234 5678</span>
                  </a>
                  <a href="mailto:private@hola-group.mx" className="flex items-center gap-4 text-[#A0A0A0] text-xs leading-loose hover:text-[#D4AF37] group">
                      <Mail className="w-4 h-4 text-[#D4AF37]" />
                      <span>private@hola-group.mx</span>
                  </a>
              </div>
            </div>
            <div>
              <h4 className="text-white font-bold text-[10px] uppercase tracking-[0.3em] mb-8">{t.footer_social}</h4>
              <div className="flex flex-col gap-4 text-[#A0A0A0] text-[10px] font-bold uppercase tracking-widest">
                <a href="#" className="hover:text-[#D4AF37] flex items-center gap-2 transition-colors">Instagram</a>
                <a href="#" className="hover:text-[#D4AF37] flex items-center gap-2 transition-colors">LinkedIn</a>
                <a href="#" className="hover:text-[#D4AF37] flex items-center gap-2 transition-colors">Facebook</a>
              </div>
            </div>
          </div>
          
          <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[9px] text-white/30 uppercase tracking-[0.4em] font-bold">
            <p>© 2024 Miguel Angel Pérez | HG Hola Group. Todos los derechos reservados.</p>
            <div className="flex gap-12 mt-8 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">{t.footer_legal}</a>
              <span>Socio AMPI Certificado</span>
            </div>
          </div>
        </div>
      </footer>

      {/* LEAD MODAL (REUTILIZADO) */}
      <AnimatePresence>
      {leadContext && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[300] flex items-center justify-center p-6"
        >
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setLeadContext(null)}></div>
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-[#111] max-w-md w-full p-12 relative z-10 border border-[#D4AF37]/20 rounded-none shadow-2xl"
          >
            <button onClick={() => setLeadContext(null)} className="absolute top-6 right-6 text-[#A0A0A0] hover:text-white text-2xl">×</button>
            <h2 className="text-2xl font-serif font-bold text-white mb-2 uppercase tracking-tighter">{leadStatus === 'success' ? (language === 'es' ? 'Recibido' : 'Received') : leadContext}</h2>
            
            {leadStatus === 'success' ? (
              <div className="text-center py-10">
                <div className="text-5xl mb-6">✨</div>
                <p className="text-[#A0A0A0] text-sm uppercase tracking-widest leading-relaxed">Miguel Angel Pérez se pondrá en contacto con usted personalmente.</p>
              </div>
            ) : (
              <form onSubmit={handleLeadSubmit} className="space-y-8 mt-10">
                <div className="space-y-2">
                  <label className="text-[9px] uppercase font-bold text-[#A0A0A0] tracking-widest">Nombre Completo</label>
                  <input type="text" required className="w-full border-b border-white/10 py-3 text-sm outline-none focus:border-[#D4AF37] bg-transparent" />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] uppercase font-bold text-[#A0A0A0] tracking-widest">WhatsApp</label>
                  <input type="tel" required className="w-full border-b border-white/10 py-3 text-sm outline-none focus:border-[#D4AF37] bg-transparent" />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] uppercase font-bold text-[#A0A0A0] tracking-widest">Email</label>
                  <input type="email" required className="w-full border-b border-white/10 py-3 text-sm outline-none focus:border-[#D4AF37] bg-transparent" />
                </div>
                <button 
                  type="submit" 
                  disabled={leadStatus === 'sending'}
                  className="w-full bg-[#D4AF37] text-black py-5 font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-white transition-all shadow-xl"
                >
                  {leadStatus === 'sending' ? 'PROCESANDO...' : (language === 'es' ? 'SOLICITAR CONTACTO' : 'REQUEST CONTACT')}
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
          className="fixed inset-0 z-[300] flex items-center justify-center p-6"
        >
          <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={() => setSelectedProperty(null)}></div>
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="bg-[#111] max-w-6xl w-full max-h-[90vh] overflow-y-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 shadow-2xl border border-white/5"
          >
            <div className="h-[400px] lg:h-full relative overflow-hidden">
                <img src={selectedProperty.img} className="w-full h-full object-cover" alt={selectedProperty.titulo} />
                <button onClick={() => setSelectedProperty(null)} className="absolute top-8 left-8 bg-black/50 p-4 hover:bg-[#D4AF37] hover:text-black text-white transition-all duration-500">
                    <X className="w-6 h-6" />
                </button>
            </div>
            <div className="p-10 lg:p-20 flex flex-col bg-[#111]">
                <span className="text-[#D4AF37] font-bold text-[10px] uppercase tracking-[0.6em] mb-4">{selectedProperty.zona}</span>
                <h2 className="text-4xl lg:text-5xl font-serif font-bold text-white mb-6 leading-tight">{selectedProperty.titulo}</h2>
                <div className="flex items-center justify-between mb-12 pb-8 border-b border-white/5">
                   <p className="text-3xl font-bold text-[#D4AF37]">{FORMAT_PRICE(selectedProperty.precio)}</p>
                   <span className="px-4 py-1 border border-[#D4AF37] text-[#D4AF37] text-[10px] font-bold uppercase tracking-widest">{selectedProperty.operacion}</span>
                </div>

                <p className="text-[#A0A0A0] text-lg leading-relaxed font-light mb-12 italic">"{selectedProperty.descripcion}"</p>
                
                <div className="grid grid-cols-3 gap-10 mb-12 py-10 border-y border-white/5">
                    <div className="text-center">
                        <p className="text-white text-2xl font-serif mb-2">{selectedProperty.recamaras}</p>
                        <p className="text-[#A0A0A0] text-[9px] font-bold uppercase tracking-widest">{t.card_rooms}</p>
                    </div>
                    <div className="text-center">
                        <p className="text-white text-2xl font-serif mb-2">{selectedProperty.banos}</p>
                        <p className="text-[#A0A0A0] text-[9px] font-bold uppercase tracking-widest">{t.card_baths}</p>
                    </div>
                    <div className="text-center">
                        <p className="text-white text-2xl font-serif mb-2">{selectedProperty.metros}</p>
                        <p className="text-[#A0A0A0] text-[9px] font-bold uppercase tracking-widest">M²</p>
                    </div>
                </div>

                <div className="flex flex-wrap gap-3 mb-12">
                    {selectedProperty.caracteristicas.map((c, i) => (
                        <span key={i} className="px-5 py-2 bg-white/5 border border-white/5 text-[9px] font-bold uppercase tracking-widest text-[#A0A0A0]">✓ {c}</span>
                    ))}
                </div>

                <div className="mt-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <button 
                        onClick={() => {
                            setLeadContext(`Agenda Privada: ${selectedProperty.titulo}`);
                            setSelectedProperty(null);
                        }}
                        className="bg-[#D4AF37] text-black py-5 font-bold text-[10px] uppercase tracking-[0.4em] hover:bg-white transition-all shadow-xl"
                    >
                        {t.modal_request_btn}
                    </button>
                    <a 
                        href={`https://wa.me/14377768395?text=Deseo información exclusiva sobre ${selectedProperty.titulo}`}
                        target="_blank"
                        className="border border-white/20 text-white py-5 font-bold text-[10px] uppercase tracking-[0.4em] flex items-center justify-center gap-4 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all"
                    >
                        <MessageCircle className="w-4 h-4" />
                        {t.modal_whatsapp_btn}
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
