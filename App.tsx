
import React, { useState, useMemo } from 'react';
import { Property, FilterState } from './types';
import { PROPIEDADES, TESTIMONIOS, SERVICIOS, FORMAT_PRICE, TRANSLATIONS } from './constants';
import { PropertyCard } from './components/PropertyCard';
import { parseUserSearchIntent } from './services/geminiService';

const App: React.FC = () => {
  const [language, setLanguage] = useState<'es' | 'en'>('es');
  const t = TRANSLATIONS[language];

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
      <header className="fixed top-0 w-full z-50 bg-[#050505]/90 backdrop-blur-md border-b border-white/5 h-24">
        <div className="container mx-auto px-6 h-full flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-white text-lg font-serif font-bold tracking-tighter">MIGUEL ANGEL PÉREZ</span>
            <span className="text-[#D4AF37] text-[9px] uppercase tracking-[0.4em] font-bold">El Chef Inmobiliario</span>
          </div>

          <nav className="hidden lg:flex gap-10 text-[10px] font-bold text-white uppercase tracking-widest">
            <a href="#inicio" className="hover:text-[#D4AF37] transition-colors">{t.nav_home}</a>
            <a href="#inventario" className="hover:text-[#D4AF37] transition-colors">{t.nav_properties}</a>
            <a href="#vender" className="hover:text-[#D4AF37] transition-colors">{t.nav_sell}</a>
            <a href="#nosotros" className="hover:text-[#D4AF37] transition-colors">{t.nav_about}</a>
          </nav>

          <div className="flex items-center gap-8">
            <img 
              src="https://placehold.co/120x40/050505/D4AF37?text=HG+HolaGroup" 
              alt="HG Holagroup" 
              className="h-8 w-auto hidden sm:block"
            />
            <a 
              href="https://wa.me/14377768395"
              target="_blank"
              className="bg-[#D4AF37] text-black px-8 py-3 rounded-none text-[10px] font-bold hover:bg-white transition-all tracking-[0.2em]"
            >
              {t.nav_cta}
            </a>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section id="inicio" className="relative h-screen flex items-center justify-center overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2000" 
          className="absolute inset-0 w-full h-full object-cover scale-105" 
          alt="Luxury Architecture"
        />
        <div className="absolute inset-0 hero-overlay"></div>
        
        <div className="relative z-10 text-center px-6">
          <h1 className="text-5xl md:text-8xl font-serif font-bold text-white mb-8 drop-shadow-2xl">
            {t.hero_title}
          </h1>
          <p className="text-[#D4AF37] text-lg md:text-2xl font-light tracking-[0.2em] uppercase mb-12">
            {t.hero_subtitle}
          </p>
          <a href="#inventario" className="inline-block border border-white text-white px-12 py-5 text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-white hover:text-black transition-all">
            {t.hero_cta}
          </a>
        </div>

        {/* ADVANCED SEARCH BAR (FLOATING) */}
        <div className="absolute bottom-0 left-0 w-full px-6 translate-y-1/2 z-20">
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
                    <option value="todos">Cualquiera</option>
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
                    <option value="todos">Cualquiera</option>
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
                    <option>Cualquiera</option>
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
                    className="flex-grow border border-white/10 py-3 px-6 text-xs outline-none focus:border-[#D4AF37]"
                  />
                  <button type="submit" className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-widest hover:text-white transition-colors">
                    {isAIProcessing ? '...' : 'AI ASSISTANT'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NUEVOS DESARROLLOS */}
      <main id="inventario" className="pt-64 pb-32 bg-[#050505]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center mb-20 text-center">
            <span className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.6em] mb-4">Curaduría Exclusiva</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">{t.section_properties}</h2>
            <div className="w-20 h-[1px] bg-[#D4AF37]"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredProperties.map(prop => (
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
      </main>

      {/* SERVICIOS EXCLUSIVOS */}
      <section className="py-32 bg-[#111]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-4xl font-serif font-bold text-white mb-6">{t.section_services}</h2>
            <p className="text-[#A0A0A0] tracking-widest uppercase text-xs">Expertise Inmobiliaria de Guante Blanco</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {SERVICIOS.map(serv => (
              <div key={serv.id} className="text-center group">
                <div className="text-5xl mb-8 group-hover:scale-110 transition-transform duration-500 block">{serv.icono}</div>
                <h3 className="text-xl font-serif text-[#D4AF37] mb-4">{serv.titulo}</h3>
                <p className="text-[#A0A0A0] text-sm leading-relaxed max-w-xs mx-auto">{serv.descripcion}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEL QUIERO A LA REALIDAD */}
      <section className="py-32 bg-[#050505]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center mb-24 text-center">
            <h2 className="text-4xl font-serif font-bold text-white mb-6">{t.section_testimonials}</h2>
            <div className="w-16 h-[1px] bg-[#D4AF37]"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {TESTIMONIOS.map(test => (
              <div key={test.id} className="bg-[#111] p-12 border border-white/5 flex flex-col md:flex-row gap-8 items-center md:items-start transition-all hover:border-[#D4AF37]/30">
                <img src={test.foto} className="w-24 h-24 rounded-full grayscale object-cover border border-[#D4AF37]" alt={test.nombre} />
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

      {/* FOOTER CORPORATIVO */}
      <footer className="bg-[#050505] pt-32 pb-16 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
            <div className="col-span-1 md:col-span-1">
              <h3 className="text-white font-serif font-bold text-xl mb-8">MIGUEL ANGEL PÉREZ</h3>
              <p className="text-[#A0A0A0] text-xs leading-relaxed uppercase tracking-widest">
                HG Hola Group Property Advisors. Liderazgo y excelencia en Real Estate de Ultra-Lujo.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold text-[10px] uppercase tracking-[0.3em] mb-8">{t.footer_offices}</h4>
              <p className="text-[#A0A0A0] text-xs leading-loose uppercase tracking-wider">
                Presidente Masaryk 120<br/>
                Polanco, Ciudad de México<br/>
                CP 11560
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold text-[10px] uppercase tracking-[0.3em] mb-8">{t.footer_care}</h4>
              <a href="tel:525512345678" className="text-[#A0A0A0] text-xs leading-loose block hover:text-[#D4AF37]">T: +52 55 1234 5678</a>
              <a href="mailto:private@hola-group.mx" className="text-[#A0A0A0] text-xs leading-loose block hover:text-[#D4AF37]">private@hola-group.mx</a>
            </div>
            <div>
              <h4 className="text-white font-bold text-[10px] uppercase tracking-[0.3em] mb-8">{t.footer_social}</h4>
              <div className="flex gap-6 text-[#A0A0A0]">
                <a href="#" className="hover:text-[#D4AF37]">Instagram</a>
                <a href="#" className="hover:text-[#D4AF37]">LinkedIn</a>
                <a href="#" className="hover:text-[#D4AF37]">Facebook</a>
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
      {leadContext && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setLeadContext(null)}></div>
          <div className="bg-[#111] max-w-md w-full p-12 relative z-10 border border-[#D4AF37]/20 rounded-none shadow-2xl animate-in zoom-in duration-500">
            <button onClick={() => setLeadContext(null)} className="absolute top-6 right-6 text-[#A0A0A0] hover:text-white text-2xl">×</button>
            <h2 className="text-2xl font-serif font-bold text-white mb-2">{leadStatus === 'success' ? 'Solicitud Enviada' : leadContext}</h2>
            
            {leadStatus === 'success' ? (
              <div className="text-center py-10">
                <div className="text-5xl mb-6">✅</div>
                <p className="text-[#A0A0A0] text-sm uppercase tracking-widest leading-relaxed">Miguel Angel Pérez se pondrá en contacto con usted personalmente.</p>
              </div>
            ) : (
              <form onSubmit={handleLeadSubmit} className="space-y-8 mt-10">
                <div className="space-y-2">
                  <label className="text-[9px] uppercase font-bold text-[#A0A0A0] tracking-widest">Nombre Completo</label>
                  <input type="text" required className="w-full border-b border-white/10 py-3 text-sm outline-none focus:border-[#D4AF37]" />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] uppercase font-bold text-[#A0A0A0] tracking-widest">WhatsApp</label>
                  <input type="tel" required pattern="[0-9]{10}" className="w-full border-b border-white/10 py-3 text-sm outline-none focus:border-[#D4AF37]" />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] uppercase font-bold text-[#A0A0A0] tracking-widest">Email</label>
                  <input type="email" required className="w-full border-b border-white/10 py-3 text-sm outline-none focus:border-[#D4AF37]" />
                </div>
                <button 
                  type="submit" 
                  disabled={leadStatus === 'sending'}
                  className="w-full bg-[#D4AF37] text-black py-5 font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-white transition-all shadow-xl"
                >
                  {leadStatus === 'sending' ? 'PROCESANDO...' : 'SOLICITAR CONTACTO'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* PROPERTY DETAIL MODAL */}
      {selectedProperty && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={() => setSelectedProperty(null)}></div>
          <div className="bg-[#111] max-w-6xl w-full max-h-[90vh] overflow-y-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 shadow-2xl border border-white/5">
            <div className="h-[400px] lg:h-full relative overflow-hidden">
                <img src={selectedProperty.img} className="w-full h-full object-cover grayscale-[20%]" alt={selectedProperty.titulo} />
                <button onClick={() => setSelectedProperty(null)} className="absolute top-8 left-8 bg-black/50 p-4 hover:bg-[#D4AF37] hover:text-black text-white transition-all duration-500">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
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
                        {t.modal_whatsapp_btn}
                    </a>
                </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
