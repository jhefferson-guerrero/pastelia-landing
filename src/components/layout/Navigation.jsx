import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { contactInfo } from '../../data/contact';
import { scrollToSection, scrollToTop } from '../../lib/smoothScroll';
import { revealAll } from '../../lib/stagedMount';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // Navega a una sección con scroll suave (también desde /catalogo: vuelve al inicio y baja)
  const goToSection = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    const id = href.replace('/#', '');
    revealAll(); // si la página aún se está montando por etapas, la sección existe antes de ir a ella
    // Pequeña espera para que el menú móvil termine de cerrarse antes de empezar a desplazar
    const run = () => scrollToSection(id);
    if (pathname !== '/') {
      navigate('/');
      setTimeout(run, 250);
    } else {
      setTimeout(run, 60);
    }
    window.history.replaceState(null, '', href);
  };

  const goToTop = (e) => {
    e.preventDefault();
    setIsOpen(false);
    if (pathname !== '/') navigate('/');
    else setTimeout(() => scrollToTop(), 60);
    window.history.replaceState(null, '', '/');
  };

  useEffect(() => {
    // Mismo orden que las secciones en la página
    const sections = ['tortas', 'clasicos', 'queques', 'cuchareables', 'como-pedir', 'comunidad', 'faq'];
    let frame = 0;

    // Se calcula como mucho una vez por cuadro, no en cada evento de scroll
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > 50);
      let current = '';
      for (const section of sections) {
        const element = document.getElementById(section);
        // Activa la sección cuyo inicio ya está en el 40% superior de la pantalla
        if (element && y + window.innerHeight * 0.4 >= element.offsetTop) current = section;
      }
      setActiveSection(current);
    };
    const handleScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('pastelia:mounted', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('pastelia:mounted', handleScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // Prevenir el desplazamiento del fondo cuando el menú móvil está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const navLinks = [
    { label: 'Tortas', href: '/#tortas' },
    { label: 'Clásicos', href: '/#clasicos' },
    { label: 'Queques', href: '/#queques' },
    { label: 'Cuchareables', href: '/#cuchareables' },
    { label: 'Cómo pedir', href: '/#como-pedir' },
    { label: 'Preguntas', href: '/#faq' },
  ];

  // Cerrar el menú con la tecla Escape
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e) => { if (e.key === 'Escape') setIsOpen(false); };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  return (
    <>
      {/* Fondo oscurecido: enfoca el menú móvil y cierra al tocar fuera */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
            className="fixed inset-0 z-[55] md:hidden bg-pastelia-brown/25 backdrop-blur-[2px]"
          />
        )}
      </AnimatePresence>

      <header className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 pointer-events-none
        md:pointer-events-auto md:bg-pastelia-cream md:border-b md:border-pastelia-brown/10
        ${scrolled ? 'md:shadow-md' : ''}
      `}>
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1], delay: 0.5 }}
          className="w-full relative flex justify-center items-center pointer-events-none md:pointer-events-auto pt-4 px-4 md:p-0"
        >
          
          <div className={`
            flex items-center justify-between w-full md:max-w-[80rem] mx-auto px-4 py-1.5 md:px-8 md:py-4 pointer-events-auto
            rounded-full md:rounded-none border
            ${isOpen 
              ? 'bg-pastelia-cream/95 shadow-md border-pastelia-brown/15 md:bg-transparent md:shadow-none md:border-transparent' 
              : scrolled 
                ? 'bg-pastelia-cream/95 shadow-sm border-pastelia-brown/15 transition-all duration-300 md:bg-transparent md:shadow-none md:border-transparent' 
                : 'bg-transparent border-transparent shadow-none transition-all duration-300'}
          `}>
            <div className="flex-1 md:flex-none xl:flex-1 flex justify-start">
              <a href="/" className="flex-shrink-0 -mt-1" onClick={goToTop}>
                <img 
                  src="/images/logo.jpg" 
                  alt="Pastelia Bakery" 
                  className="h-9 md:h-11 w-auto mix-blend-multiply hover:scale-105 transition-transform duration-300"
                />
              </a>
            </div>

          <nav className="hidden md:flex md:flex-1 xl:flex-none justify-center items-center gap-3 lg:gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => goToSection(e, link.href)}
                className={`relative group inline-block whitespace-nowrap text-sm lg:text-base font-medium transition-colors duration-300 py-1 ${activeSection === link.href.replace('/#', '') ? 'text-pastelia-burgundy' : 'text-pastelia-brown/70 hover:text-pastelia-burgundy'}`}
              >
                {link.label}
                <span className={`absolute -bottom-0.5 left-0 h-[1.5px] bg-pastelia-burgundy transition-all duration-300 ease-out ${activeSection === link.href.replace('/#', '') ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'}`} />
              </a>
            ))}
          </nav>

            <div className="flex-1 md:flex-none xl:flex-1 flex justify-end items-center">
              <a 
                href={contactInfo.whatsappUrl} 
                className="hidden md:inline-flex whitespace-nowrap items-center justify-center gap-1.5 bg-pastelia-burgundy text-white px-4 lg:px-6 py-2.5 rounded-full text-sm lg:text-[15px] font-medium transition-all duration-300 shadow-sm hover:shadow-md hover:shadow-pastelia-burgundy/15 hover:-translate-y-0.5 group"
              >
                Hacer Pedido <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <button 
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden flex items-center justify-center p-1.5 -mr-1.5 text-pastelia-brown transition-transform hover:scale-105 active:scale-95"
                aria-label="Toggle Menu"
              >
                {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
              </button>
            </div>
          </div>

          <AnimatePresence>
            {isOpen && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="absolute top-full mt-2 left-4 right-4 z-10 bg-pastelia-cream/95 shadow-2xl border border-pastelia-brown/15 rounded-[2rem] overflow-y-auto overscroll-contain max-h-[calc(100dvh-6.5rem)] flex flex-col p-4 md:hidden pointer-events-auto"
              >
                <nav className="flex flex-col items-center justify-center w-full">
                  {navLinks.map((link, i) => (
                    <div key={link.label} className="w-full flex flex-col items-center">
                      <motion.a
                        href={link.href}
                        onClick={(e) => goToSection(e, link.href)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="flex items-center justify-center w-full py-3 [@media(max-height:700px)]:py-1.5 font-serif text-2xl text-pastelia-burgundy active:scale-95 transition-all"
                      >
                        {link.label}
                      </motion.a>
                      
                      {i < navLinks.length - 1 && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3, ease: 'easeOut' }}
                          className="w-[50%] max-w-[160px] h-px bg-pastelia-burgundy/10 my-1"
                        />
                      )}
                    </div>
                  ))}
                </nav>

                {/* Llamado a la acción y redes dentro del menú móvil */}
                <div className="flex flex-col items-center gap-6 [@media(max-height:700px)]:gap-4 mt-5 pt-7 [@media(max-height:700px)]:pt-5 pb-3 px-2 border-t border-pastelia-burgundy/10">
                  <a
                    href={contactInfo.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                    className="inline-flex items-center justify-center gap-1.5 bg-pastelia-burgundy text-white px-10 py-3.5 rounded-full text-base font-medium shadow-sm active:scale-95 transition-transform"
                  >
                    Hacer Pedido <ArrowUpRight className="w-4 h-4" />
                  </a>
                  <div className="grid grid-cols-2 gap-3 w-full max-w-[280px]">
                    <a
                      href={`https://instagram.com/${contactInfo.instagram.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 py-3 rounded-full border border-pastelia-burgundy/25 text-sm font-medium text-pastelia-burgundy active:bg-pastelia-burgundy/5 transition-colors"
                    >
                      Instagram <span className="font-sans text-sm">↗</span>
                    </a>
                    <a
                      href={`https://tiktok.com/${contactInfo.tiktok}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 py-3 rounded-full border border-pastelia-burgundy/25 text-sm font-medium text-pastelia-burgundy active:bg-pastelia-burgundy/5 transition-colors"
                    >
                      TikTok <span className="font-sans text-sm">↗</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </motion.div>
      </header>
    </>
  );
}
