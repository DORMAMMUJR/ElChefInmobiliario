
import React, { useState, useEffect } from 'react';
import { Property, FilterState } from './types';
import { PROPIEDADES, TRANSLATIONS, FORMAT_PRICE, CONTACT_INFO, VENTAJAS, TESTIMONIOS, HISTORIA_MIGUEL, RAZONES_MEXICO } from './constants';
import { PropertyCard } from './components/PropertyCard';
import { parseUserSearchIntent } from './services/geminiService';
import {
  X, MessageCircle, Maximize2, Bed, Bath, Car, Star, ChevronRight, Menu, Globe, Instagram, Linkedin, ShieldCheck, Award, Lock, ShoppingBag, CheckCircle2, Phone, Camera, Key, BarChart
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  const [lang, setLang] = useState<'es' | 'en'>('es');
  const [currentView, setCurrentView] = useState<'home' | 'catalog' | 'sell' | 'contact' | 'concierge'>('home');
  const [conciergeStep, setConciergeStep] = useState<'intro' | 'register' | 'store'>('intro');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isAIProcessing, setIsAIProcessing] = useState(false);
  const [filters, setFilters] = useState<FilterState>({ operacion: 'todos', tipo: 'todos', zona: 'todos', precioMax: '', query: '' });

  // Profile Picture State - Local image (place file at /public/images/perfil-miguel.jpeg)
  const [profilePic, setProfilePic] = useState<string>("/images/perfil-miguel.jpeg");
  const [isChangingPic, setIsChangingPic] = useState(false);
  const [password, setPassword] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [changeStep, setChangeStep] = useState<'prompt' | 'password' | 'url'>('prompt');
  const [error, setError] = useState("");
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formZona, setFormZona] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

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

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Updated password: Sasquexy1
    if (password === "Sasquexy1") {
      setChangeStep('url');
      setError("");
    } else {
      setError("Clave incorrecta. Acceso Denegado.");
    }
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newUrl.startsWith("http")) {
      setProfilePic(newUrl);
      setIsChangingPic(false);
      setChangeStep('prompt');
      setPassword("");
      setNewUrl("");
      setError("");
    } else {
      setError("Por favor proporcione una URL de imagen válida.");
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ── Reemplaza TU_ID_DE_FORMSPREE con tu ID real de formspree.io ──
    const response = await fetch("https://formspree.io/f/TU_ID_DE_FORMSPREE", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre: formName,
        email: formEmail,
        zona: formZona
      })
    });

    if (response.ok) {
      setFormSubmitted(true);
    } else {
      alert("Hubo un error al enviar tu solicitud. Intenta por WhatsApp.");
    }
  };

  const PANTRY_ITEMS = [
    { id: 1, name: lang === 'es' ? 'Reserva del Chef' : 'Chef\'s Reserve', desc: 'Ingredientes de grado ultra-premium seleccionados a mano.', price: '$25.00', img: 'https://images.unsplash.com/photo-1550583724-1255818c0533?auto=format&fit=crop&q=80&w=400' },
    { id: 2, name: lang === 'es' ? 'Cosecha Inmobiliaria' : 'Estate Harvest', desc: 'Producción limitada para paladares exigentes.', price: '$45.00', img: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&q=80&w=400' },
    { id: 3, name: lang === 'es' ? 'Trufa de Selección' : 'Select Truffle', desc: 'El diamante de la cocina en su hogar.', price: '$85.00', img: 'https://images.unsplash.com/photo-1486297678162-ad2a19b05840?auto=format&fit=crop&q=80&w=400' }
  ];

  return (
    <div className="min-h-screen bg-[#011c16] text-white flex flex-col font-sans selection:bg-[#D4AF37] selection:text-black overflow-x-hidden">
      {/* HEADER */}
      <header className="fixed top-0 w-full z-[100] h-24 border-b border-white/5 backdrop-blur-2xl bg-[#011c16]/90">
        <div className="container mx-auto h-full px-6 lg:px-12 flex justify-between items-center">
          <div className="flex items-center gap-6 cursor-pointer group">
            <div className="relative" onClick={() => setIsChangingPic(true)}>
              <img
                src="/images/logo-chef.jpeg"
                className="w-12 h-12 rounded-full object-cover border border-[#D4AF37]/40 shadow-xl group-hover:opacity-60 transition-opacity"
                alt="Executive Profile"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-[#D4AF37]">
                <Camera size={18} />
              </div>
            </div>
            <div className="flex flex-col items-start select-none" onClick={() => setCurrentView('home')}>
              <span className="text-[10px] text-[#D4AF37] font-black tracking-[0.4em] uppercase mb-1">EL CHEF</span>
              <span className="text-sm font-serif font-black tracking-widest text-white leading-none">INMOBILIARIO</span>
            </div>
            <div className="h-10 w-px bg-white/10 hidden md:block" />
            <div className="hidden md:flex flex-col items-start select-none opacity-60">
              <span className="text-[10px] text-white font-black tracking-widest uppercase">HOLA GROUP</span>
              <span className="text-[8px] text-white/50 tracking-[0.2em] uppercase">Property Advisors</span>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-12">
            {['home', 'catalog', 'sell', 'concierge', 'contact'].map(view => (
              <button
                key={view}
                onClick={() => {
                  if (view === 'concierge') {
                    setCurrentView('home');
                    setTimeout(() => document.getElementById('historia')?.scrollIntoView({ behavior: 'smooth' }), 150);
                  } else {
                    setCurrentView(view as any);
                  }
                }}
                className={`text-[11px] font-black uppercase tracking-[0.3em] transition-all hover:text-[#D4AF37] ${currentView === view ? 'text-[#D4AF37]' : 'text-white/40'}`}
              >
                {t[`nav_${view === 'catalog' ? 'properties' : view}` as keyof typeof t]}
              </button>
            ))}
            <button
              onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
              className="ml-6 text-[10px] font-black text-[#D4AF37] border border-[#D4AF37]/30 px-4 py-2 hover:bg-[#D4AF37] hover:text-black transition-all"
            >
              {t.lang_toggle}
            </button>
          </nav>

          <button className="lg:hidden text-[#D4AF37]"><Menu size={28} /></button>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-grow pt-24">
        <AnimatePresence mode="wait">
          {currentView === 'home' && (
            <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full">
              {/* HERO SECTION */}
              <section className="min-h-[calc(100vh-96px)] flex flex-col lg:flex-row w-full bg-[#011c16]">
                <div className="w-full lg:w-1/2 relative h-[60vh] lg:h-auto overflow-hidden bg-black">
                  <img src="/images/perfil-miguel.jpeg" className="w-full h-full object-cover object-top opacity-60 scale-105" alt="Miguel Angel Pérez - El Chef Inmobiliario" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#011c16] via-[#011c16]/20 to-transparent lg:hidden" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#011c16] opacity-60 hidden lg:block" />
                </div>
                <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 lg:px-24 py-20 lg:py-12 border-l border-white/5 bg-[#011c16] relative">
                  <div className="max-w-xl">
                    <span className="text-[#D4AF37] text-[11px] font-black uppercase tracking-[0.6em] mb-8 block opacity-70">{t.hero_supertitle}</span>
                    <h1 className="text-4xl lg:text-6xl font-serif font-black mb-4 tracking-tight leading-tight text-white">
                      {t.hero_title} <span className="text-[#D4AF37]">{t.hero_subtitle}</span>
                    </h1>
                    <p className="text-white/50 text-base leading-relaxed mb-12 border-l-2 border-[#D4AF37] pl-6 max-w-lg">{t.hero_desc}</p>
                    <div className="flex flex-col md:flex-row gap-6">
                      <a href="#agendar" onClick={e => { e.preventDefault(); document.getElementById('agendar')?.scrollIntoView({ behavior: 'smooth' }) }} className="btn-luxury-gold px-10 py-5 text-[11px] text-center flex-grow md:flex-grow-0">
                        {t.hero_cta_primary}
                      </a>
                      <button onClick={() => setCurrentView('catalog')} className="px-10 py-5 text-[11px] border border-white/10 hover:border-[#D4AF37] transition-all font-black uppercase tracking-[0.4em] flex-grow md:flex-grow-0">
                        {t.hero_cta_secondary}
                      </button>
                    </div>
                    <p className="mt-10 text-[10px] font-black text-[#D4AF37]/40 uppercase tracking-[0.6em]">{t.hero_badge}</p>
                  </div>
                </div>
              </section>

              {/* VENTAJAS INMOBILIARIAS DETALLADAS */}
              <section className="py-32 bg-[#022c22]/20 border-y border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-[#D4AF37]/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="container mx-auto px-6 lg:px-12 relative z-10">
                  <div className="max-w-4xl mb-24">
                    <span class="text-[#D4AF37] text-[12px] font-black uppercase tracking-[1.5em] mb-8 block italic">{t.section_why_sub}</span>
                    <h2 class="text-5xl lg:text-8xl font-serif font-black uppercase tracking-tighter leading-tight">{t.section_why_title}</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {VENTAJAS.map((v, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="luxury-card p-10 border-white/5 hover:border-[#D4AF37]/30 transition-all flex flex-col gap-6 group"
                      >
                        <div className="w-12 h-12 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-black transition-all">
                          {i === 0 && <Award size={20} />}
                          {i === 1 && <Globe size={20} />}
                          {i === 2 && <BarChart size={20} />}
                          {i === 3 && <ShieldCheck size={20} />}
                        </div>
                        <h4 className="text-xl font-serif font-black uppercase tracking-tight text-white">{v.titulo}</h4>
                        <p className="text-white/40 text-[12px] uppercase tracking-widest leading-loose font-medium">{v.desc}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>

              {/* OPINIONES DE LA CRÍTICA */}
              <section className="py-32 bg-[#011c16]">
                <div className="container mx-auto px-6 lg:px-12">
                  <div className="text-center mb-24">
                    <span className="text-[#D4AF37] text-[12px] font-black uppercase tracking-[1.5em] mb-8 block italic">Experiencia de Cliente</span>
                    <h2 className="text-5xl lg:text-7xl font-serif font-black uppercase tracking-tighter leading-tight">OPINIONES DEL <span className="text-[#D4AF37]">PORTAFOLIO</span></h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {TESTIMONIOS.map((t, i) => (
                      <div key={i} className="luxury-card p-12 text-center flex flex-col items-center border-white/5 hover:bg-white/5 transition-all">
                        <div className="flex gap-1 text-[#D4AF37] mb-8">
                          {[...Array(t.estrellas)].map((_, j) => <Star key={j} size={14} fill="currentColor" />)}
                        </div>
                        <p className="text-white/60 text-lg md:text-xl font-serif italic mb-10 leading-relaxed">"{t.cita}"</p>
                        <div className="mt-auto">
                          <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#D4AF37]/20 mx-auto mb-4">
                            <img src={t.foto} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all" alt={t.nombre} />
                          </div>
                          <h5 className="text-[11px] font-black uppercase tracking-[0.4em] text-white">{t.nombre}</h5>
                          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#D4AF37] opacity-60">{t.rol}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* STATS SECTION */}
              <section className="py-32 bg-[#011c16] border-y border-white/5">
                <div className="container mx-auto px-6 lg:px-12 grid grid-cols-2 lg:grid-cols-4 gap-16">
                  {[
                    { label: 'Transacciones', val: '500+', icon: <ShieldCheck size={28} /> },
                    { label: 'Años Exp', val: '15+', icon: <Award size={28} /> },
                    { label: 'Clientes VIP', val: '120+', icon: <Star size={28} /> },
                    { label: 'Ubicaciones', val: '12', icon: <Globe size={28} /> }
                  ].map((s, i) => (
                    <div key={i} className="text-center group">
                      <div className="text-[#D4AF37] mb-8 flex justify-center opacity-60 group-hover:opacity-100 transition-opacity">{s.icon}</div>
                      <div className="text-5xl font-serif font-black mb-4 tracking-tighter text-white">{s.val}</div>
                      <div className="text-[11px] font-black uppercase tracking-[0.5em] text-white/20 group-hover:text-white/50 transition-colors">{s.label}</div>
                    </div>
                  ))}
                </div>
              </section>

              {/* HISTORIA DE MIGUEL */}
              <section id="historia" className="py-28 bg-[#011c16]">
                <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                  <div className="relative overflow-hidden h-[500px]">
                    <img src="/images/perfil-miguel.jpeg" className="w-full h-full object-cover object-top grayscale" alt="Miguel Angel Pérez" />
                    <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-[#011c16] to-transparent" />
                  </div>
                  <div>
                    <span className="text-[#D4AF37] text-[11px] font-black uppercase tracking-[1em] mb-6 block italic">{HISTORIA_MIGUEL[lang].supertitle}</span>
                    <h2 className="text-4xl lg:text-6xl font-serif font-black uppercase tracking-tight mb-8">{HISTORIA_MIGUEL[lang].title}</h2>
                    <div className="space-y-4 mb-10">
                      <p className="text-white/50 leading-relaxed">{HISTORIA_MIGUEL[lang].body}</p>
                      <p className="text-white/50 leading-relaxed">{HISTORIA_MIGUEL[lang].body2}</p>
                      <p className="text-[#D4AF37]/80 font-serif text-lg italic">{HISTORIA_MIGUEL[lang].body3}</p>
                    </div>
                    <div className="space-y-3">
                      {HISTORIA_MIGUEL[lang].credenciales.map((c, i) => (
                        <div key={i} className="flex items-center gap-4 border-b border-white/5 pb-3">
                          <span className="text-xl">{c.icon}</span>
                          <span className="text-white/50 text-sm tracking-wide">{c.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* POR QUÉ MÉXICO */}
              <section className="py-28 bg-[#022c22]/20 border-y border-white/5">
                <div className="container mx-auto px-6 lg:px-12">
                  <div className="text-center mb-20">
                    <span className="text-[#D4AF37] text-[11px] font-black uppercase tracking-[1.5em] mb-6 block italic">{RAZONES_MEXICO[lang].supertitle}</span>
                    <h2 className="text-5xl lg:text-7xl font-serif font-black uppercase tracking-tighter">{RAZONES_MEXICO[lang].title}</h2>
                    <p className="text-white/40 mt-6 text-lg max-w-2xl mx-auto">{RAZONES_MEXICO[lang].subtitle}</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {RAZONES_MEXICO[lang].razones.map((r, i) => (
                      <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="luxury-card p-10 border-white/5 hover:border-[#D4AF37]/30 transition-all">
                        <div className="text-4xl mb-6">{r.icon}</div>
                        <span className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.8em] mb-3 block">{r.zona}</span>
                        <h3 className="text-xl font-serif font-black uppercase mb-4">{r.titulo}</h3>
                        <p className="text-white/40 text-sm leading-relaxed mb-6">{r.desc}</p>
                        <span className="border border-[#D4AF37]/30 px-3 py-2 text-[#D4AF37] text-[10px] font-black uppercase tracking-wider">{r.stat}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>

              {/* CTA FINAL + FORM */}
              <section id="agendar" className="py-28 bg-[#011c16]">
                <div className="container mx-auto px-6 lg:px-12 max-w-4xl text-center">
                  <span className="text-[#D4AF37] text-[11px] font-black uppercase tracking-[1.5em] mb-6 block italic">{t.cta_final_supertitle}</span>
                  <h2 className="text-5xl lg:text-7xl font-serif font-black uppercase tracking-tighter mb-6">{t.cta_final_title}</h2>
                  <p className="text-white/40 text-lg mb-14 max-w-2xl mx-auto">{t.cta_final_sub}</p>
                  {formSubmitted ? (
                    <div className="luxury-card p-16 text-center">
                      <CheckCircle2 size={56} className="text-[#D4AF37] mx-auto mb-6" />
                      <h3 className="text-2xl font-serif font-black uppercase mb-4">{lang === 'es' ? '¡Perfecto!' : 'Perfect!'}</h3>
                      <p className="text-white/50">{lang === 'es' ? 'Te contactaré muy pronto para agendar tu llamada.' : 'I will contact you soon to schedule your call.'}</p>
                    </div>
                  ) : (
                    <form onSubmit={handleFormSubmit} className="luxury-card p-10 lg:p-14 text-left space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <label className="text-[10px] font-black uppercase tracking-[0.5em] text-white/30 block mb-3">{t.form_name}</label>
                          <input required value={formName} onChange={e => setFormName(e.target.value)} className="w-full bg-transparent border-b border-white/10 py-3 text-white outline-none focus:border-[#D4AF37] transition-all" placeholder={lang === 'es' ? 'Tu nombre' : 'Your name'} />
                        </div>
                        <div>
                          <label className="text-[10px] font-black uppercase tracking-[0.5em] text-white/30 block mb-3">{t.form_email}</label>
                          <input required type="email" value={formEmail} onChange={e => setFormEmail(e.target.value)} className="w-full bg-transparent border-b border-white/10 py-3 text-white outline-none focus:border-[#D4AF37] transition-all" placeholder="correo@ejemplo.com" />
                        </div>
                      </div>
                      <div>
                        <label className="text-[10px] font-black uppercase tracking-[0.5em] text-white/30 block mb-3">{t.form_zona}</label>
                        <select required value={formZona} onChange={e => setFormZona(e.target.value)} className="w-full bg-[#011c16] border-b border-white/10 py-3 text-white outline-none focus:border-[#D4AF37] transition-all">
                          <option value="">{t.form_zona}</option>
                          <option value="merida">{t.form_zona_merida}</option>
                          <option value="riviera">{t.form_zona_riviera}</option>
                          <option value="progreso">{t.form_zona_progreso}</option>
                          <option value="otro">{t.form_zona_otro}</option>
                        </select>
                      </div>
                      <div className="flex flex-col md:flex-row gap-6 pt-2">
                        <button type="submit" className="btn-luxury-gold flex-1 py-5 text-[11px]">{t.form_submit}</button>
                        <a href={`https://wa.me/${CONTACT_INFO.whatsapp}`} target="_blank" rel="noopener noreferrer" className="px-10 py-5 text-[11px] font-black uppercase tracking-[0.4em] border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all flex items-center justify-center gap-3"><MessageCircle size={16} /> {t.form_whatsapp}</a>
                      </div>
                    </form>
                  )}
                </div>
              </section>
            </motion.div>
          )}

          {currentView === 'catalog' && (
            <motion.div key="catalog" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="container mx-auto px-6 lg:px-12 py-32">
              <div className="flex flex-col lg:flex-row justify-between items-end mb-24 gap-12">
                <div>
                  <span className="text-[#D4AF37] text-[12px] font-black uppercase tracking-[1em] mb-8 block italic opacity-60">Curated Portfolio</span>
                  <h2 className="text-6xl lg:text-9xl font-serif font-black uppercase tracking-tighter leading-none">SELECCIÓN <br /> <span className="text-[#D4AF37]">DE ACTIVOS</span></h2>
                </div>
                <form onSubmit={handleAISearch} className="flex gap-6 border-b border-white/10 pb-4 w-full lg:w-[450px] group">
                  <input value={filters.query} onChange={e => setFilters({ ...filters, query: e.target.value })} placeholder={t.search_placeholder} className="bg-transparent text-[13px] uppercase tracking-widest outline-none flex-grow font-bold text-white placeholder-white/10" />
                  <button type="submit" className="text-[#D4AF37] group-hover:scale-125 transition-transform">{isAIProcessing ? '...' : <ChevronRight size={28} />}</button>
                </form>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
                {PROPIEDADES.map(p => <PropertyCard key={p.id} property={p} onViewDetails={setSelectedProperty} onToggleCompare={() => { }} isComparing={false} labels={{ rooms: t.specs_rooms, baths: t.specs_baths, details: t.hero_cta_primary }} />)}
              </div>
            </motion.div>
          )}

          {currentView === 'sell' && (
            <motion.div key="sell" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="container mx-auto px-6 lg:px-12 py-40 flex flex-col items-center">
              <span className="text-[#D4AF37] text-[12px] font-black uppercase tracking-[1em] mb-10 block italic opacity-50">Strategic Advisory</span>
              <h2 className="text-6xl lg:text-9xl font-serif font-black uppercase tracking-tighter text-center mb-24">VALUACIÓN<br />DE PRECISIÓN</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center max-w-7xl">
                <div className="luxury-card p-16 lg:p-24 space-y-16">
                  <h3 className="text-4xl font-serif font-black uppercase text-[#D4AF37]">POSICIONAMIENTO ÉLITE</h3>
                  <p className="text-white/40 text-[14px] leading-relaxed uppercase tracking-widest font-medium">Combinamos la elegancia del sector de lujo con la agresividad de los algoritmos financieros para vender su activo al mejor postor global.</p>
                  <button className="btn-luxury-gold w-full py-8 text-[13px]">SOLICITAR CONSULTORÍA</button>
                </div>
                <div className="relative overflow-hidden grayscale aspect-[3/4] rounded-none shadow-2xl bg-black border border-white/5">
                  <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover" alt="Elite Property" />
                </div>
              </div>
            </motion.div>
          )}

          {currentView === 'contact' && (
            <motion.div key="contact" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="container mx-auto px-6 lg:px-12 py-40 min-h-[70vh] flex items-center justify-center">
              <div className="text-center max-w-4xl">
                <span className="text-[#D4AF37] text-[12px] font-black uppercase tracking-[1.5em] mb-12 block italic opacity-50">Exclusive Line</span>
                <h2 className="text-7xl lg:text-9xl font-serif font-black uppercase tracking-tighter mb-20 leading-none">CONECTA CON<br />HOLA GROUP</h2>
                <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
                  <a href={`https://wa.me/${CONTACT_INFO.whatsapp}`} className="btn-luxury-gold px-24 py-8 text-[13px] flex items-center justify-center gap-6 w-full md:w-auto">
                    <MessageCircle size={28} /> WHATSAPP VIP
                  </a>
                  <a href={`mailto:${CONTACT_INFO.email}`} className="px-24 py-8 text-[13px] font-black uppercase tracking-[0.6em] border border-white/10 hover:border-[#D4AF37] transition-all flex items-center justify-center gap-6 w-full md:w-auto">
                    CANAL OFICIAL
                  </a>
                </div>
                <div className="mt-24 pt-12 border-t border-white/5 opacity-40">
                  <p className="text-[12px] font-black tracking-[0.5em] uppercase text-white/50">{CONTACT_INFO.phone}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* FOOTER */}
      <footer className="bg-[#011c16] border-t border-white/5 pt-32 pb-16 mt-auto">
        <div className="container mx-auto px-6 lg:px-12">
          {/* UPDATED FOOTER IMAGE */}
          <div className="w-full h-[450px] overflow-hidden mb-24 relative group">
            <img src="https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&q=90&w=1600" className="w-full h-full object-cover grayscale opacity-30 group-hover:grayscale-0 group-hover:opacity-70 transition-all duration-1000" alt="Architecture" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#011c16]/80" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-12">
              <h4 className="text-6xl md:text-8xl font-serif font-black uppercase tracking-tighter text-white mb-6">HOLA GROUP</h4>
              <p className="text-[#D4AF37] text-[11px] font-black uppercase tracking-[1.5em] opacity-80">ESTRATEGIA INMOBILIARIA DE CLASE MUNDIAL</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-24 mb-32">
            <div className="md:col-span-6">
              <h4 className="text-white font-serif font-black text-2xl mb-8 uppercase tracking-tighter leading-none">MIGUEL ANGEL PÉREZ <span className="text-[#D4AF37]">|</span> EL CHEF INMOBILIARIO</h4>
              <p className="text-white/20 text-[11px] uppercase tracking-[0.6em] leading-loose max-w-lg mb-12">
                Asesoría de ultra-lujo y curaduría de activos estratégicos en asociación con Hola Group Property Advisors.
              </p>
              <div className="flex gap-12">
                <a href="#" className="text-white/20 hover:text-[#D4AF37] transition-colors"><Instagram size={28} /></a>
                <a href="#" className="text-white/20 hover:text-[#D4AF37] transition-colors"><Linkedin size={28} /></a>
              </div>
            </div>
            <div className="md:col-span-3">
              <h5 className="text-[#D4AF37] text-[11px] font-black uppercase tracking-[0.4em] mb-12 opacity-30">NAVEGACIÓN</h5>
              <div className="flex flex-col gap-6">
                {['home', 'catalog', 'sell', 'concierge', 'contact'].map(view => (
                  <button key={view} onClick={() => setCurrentView(view as any)} className="text-[11px] text-white/20 hover:text-white uppercase tracking-widest text-left transition-colors font-bold">
                    {t[`nav_${view === 'catalog' ? 'properties' : view}` as keyof typeof t]}
                  </button>
                ))}
              </div>
            </div>
            <div className="md:col-span-3">
              <h5 className="text-[#D4AF37] text-[11px] font-black uppercase tracking-[0.4em] mb-12 opacity-30">ESTRATÉGICO</h5>
              <div className="flex flex-col gap-6">
                <button className="text-[11px] text-white/20 hover:text-white uppercase tracking-widest text-left font-bold">AVISO DE PRIVACIDAD</button>
                <button className="text-[11px] text-white/20 hover:text-white uppercase tracking-widest text-left font-bold">TÉRMINOS DE SERVICIO</button>
                <button className="text-[11px] text-white/20 hover:text-white uppercase tracking-widest text-left font-bold">RED DE AGENTES</button>
              </div>
            </div>
          </div>
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
            <span className="text-[11px] font-black text-white/5 uppercase tracking-[1em]">© 2027 MIGUEL ANGEL PÉREZ • EL CHEF INMOBILIARIO</span>
            <div className="flex items-center gap-6">
              <span className="text-[10px] font-black text-white/5 uppercase tracking-[0.5em]">HOLA GROUP PROPERTY ADVISORS</span>
              <div className="h-4 w-px bg-white/5" />
              <span className="text-[10px] font-black text-white/5 uppercase tracking-[0.5em]">BY INTECNIAM</span>
            </div>
          </div>
        </div>
      </footer>

      {/* DETAIL MODAL */}
      <AnimatePresence>
        {selectedProperty && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] flex items-center justify-center p-6 lg:p-12 bg-black/98 backdrop-blur-3xl overflow-y-auto">
            <div className="absolute inset-0" onClick={() => setSelectedProperty(null)} />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-[#011c16] w-full max-w-7xl relative overflow-hidden border border-white/10 grid grid-cols-1 lg:grid-cols-12 shadow-[0_0_100px_rgba(0,0,0,1)]">
              <button onClick={() => setSelectedProperty(null)} className="absolute top-10 right-10 z-[210] text-white/20 hover:text-white p-5 transition-all hover:scale-125"><X size={36} /></button>
              <div className="lg:col-span-5 h-[50vh] lg:h-auto overflow-hidden bg-black">
                <img src={selectedProperty.img} className="w-full h-full object-cover grayscale" alt="" />
              </div>
              <div className="lg:col-span-7 p-12 lg:p-24 flex flex-col">
                <span className="text-[#D4AF37] text-[12px] font-black uppercase tracking-[1.2em] mb-10 block italic opacity-50">{selectedProperty.zona}</span>
                <h2 className="text-5xl lg:text-8xl font-serif font-black mb-10 uppercase tracking-tighter leading-none">{selectedProperty.titulo}</h2>
                <p className="text-5xl font-black text-[#D4AF37] mb-16 tracking-tighter">{FORMAT_PRICE(selectedProperty.precio)}</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
                  <div className="flex flex-col items-center bg-white/5 p-8 border border-white/10">
                    <Maximize2 size={24} className="text-[#D4AF37] mb-4" />
                    <span className="text-3xl font-serif font-black">{selectedProperty.metros}</span>
                    <span className="text-[11px] uppercase tracking-widest text-white/20 mt-3 font-black">METROS²</span>
                  </div>
                </div>
                <p className="text-white/40 text-2xl leading-loose mb-20 italic border-l-4 border-[#D4AF37] pl-12 max-w-3xl">"{selectedProperty.descripcion}"</p>
                <div className="mt-auto flex flex-col md:flex-row gap-10">
                  <button onClick={() => setSelectedProperty(null)} className="btn-luxury-gold flex-1 py-6 text-[12px]">{t.hero_cta_primary}</button>
                  <a href={`https://wa.me/${CONTACT_INFO.whatsapp}`} className="px-16 border border-[#D4AF37]/30 text-[#D4AF37] flex items-center justify-center text-[12px] font-black uppercase tracking-[0.8em] hover:bg-[#D4AF37] hover:text-black transition-all">VIP CONNECT</a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PROFILE PIC CHANGE MODAL */}
      <AnimatePresence>
        {isChangingPic && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[300] flex items-center justify-center p-6 bg-black/90 backdrop-blur-md">
            <div className="absolute inset-0" onClick={() => setIsChangingPic(false)} />
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="luxury-card max-w-md w-full p-10 relative overflow-hidden text-center">
              <button onClick={() => setIsChangingPic(false)} className="absolute top-4 right-4 text-white/20 hover:text-white"><X size={24} /></button>

              {changeStep === 'prompt' && (
                <div className="py-8">
                  <Camera size={48} className="text-[#D4AF37] mx-auto mb-6" />
                  <h3 className="text-2xl font-serif font-black uppercase tracking-tight mb-4">Cambiar Retrato Ejecutivo?</h3>
                  <p className="text-white/40 text-[11px] uppercase tracking-widest mb-10">Se requiere verificación de identidad del Jefe de Operaciones.</p>
                  <button onClick={() => setChangeStep('password')} className="btn-luxury-gold w-full py-4 text-[11px]">PROCEDER A VERIFICACIÓN</button>
                </div>
              )}

              {changeStep === 'password' && (
                <form onSubmit={handlePasswordSubmit} className="py-8">
                  <Key size={48} className="text-[#D4AF37] mx-auto mb-6" />
                  <h3 className="text-2xl font-serif font-black uppercase tracking-tight mb-4">CLAVE DE ACCESO</h3>
                  <p className="text-white/40 text-[11px] uppercase tracking-widest mb-10">Ingrese la contraseña de administrador inmobiliario.</p>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white/5 border-b border-[#D4AF37]/30 py-4 px-4 text-center text-white outline-none focus:border-[#D4AF37] transition-all mb-8 font-black tracking-[0.5em]"
                    placeholder="••••••••"
                    autoFocus
                  />
                  {error && <p className="text-red-500 text-[10px] font-black uppercase mb-6 tracking-widest">{error}</p>}
                  <button type="submit" className="btn-luxury-gold w-full py-4 text-[11px]">VALIDAR IDENTIDAD</button>
                </form>
              )}

              {changeStep === 'url' && (
                <form onSubmit={handleUrlSubmit} className="py-8 text-left">
                  <Globe size={48} className="text-[#D4AF37] mx-auto mb-6" />
                  <h3 className="text-2xl font-serif font-black uppercase tracking-tight mb-4 text-center">NUEVA URL DE IMAGEN</h3>
                  <p className="text-white/40 text-[11px] uppercase tracking-widest mb-4 leading-relaxed">Ejemplo recomendado:</p>
                  <code className="block bg-black/40 p-3 text-[10px] text-[#D4AF37] break-all mb-8 border border-white/5">
                    https://github.com/DORMAMMUJR/ElChefInmobiliario/blob/main/WhatsApp%20Image%202026-01-23%20at%204.22.16%20PM.jpeg?raw=true
                  </code>
                  <input
                    type="text"
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                    className="w-full bg-white/5 border-b border-[#D4AF37]/30 py-4 px-4 text-white outline-none focus:border-[#D4AF37] transition-all mb-8 font-bold text-sm"
                    placeholder="Pegue la URL aquí..."
                    autoFocus
                  />
                  {error && <p className="text-red-500 text-[10px] font-black uppercase mb-6 tracking-widest text-center">{error}</p>}
                  <button type="submit" className="btn-luxury-gold w-full py-4 text-[11px]">GUARDAR CAMBIOS</button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FLOATING WHATSAPP */}
      <a href={"https://wa.me/" + CONTACT_INFO.whatsapp} target="_blank" rel="noopener noreferrer" className="fixed bottom-8 right-8 z-[500] w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform">
        <MessageCircle size={28} className="text-white fill-white" />
      </a>
    </div>
  );
};

export default App;
