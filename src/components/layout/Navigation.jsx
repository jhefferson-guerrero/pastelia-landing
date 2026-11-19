import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { contactInfo } from '../../data/contact';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Mismo orden que las secciones en la página
      const sections = ['tortas', 'clasicos', 'queques', 'cuchareables', 'como-pedir', 'comunidad', 'faq'];
      let current = '';
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && window.scrollY >= element.offsetTop - 120) {
          current = section;
        }
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
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
    // Solo en el menú móvil: en escritorio el botón "Hacer Pedido" ya cumple esa función
    { label: 'Cómo pedir', href: '/#como-pedir', mobileOnly: true },
    { label: 'Preguntas', href: '/#faq' },
  ];
  const desktopLinks = navLinks.filter((link) => !link.mobileOnly);

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 pointer-events-none
        md:pointer-events-auto md:bg-pastelia-cream md:border-b md:border-pastelia-brown/10
        ${scrolled ? 'md:shadow-md' : ''}
      `}>
        <div className="w-full relative flex justify-center items-center pointer-events-none md:pointer-events-auto pt-4 px-4 md:p-0">
          
          <div className={`
            flex items-center justify-between w-full md:max-w-6xl mx-auto px-4 py-2.5 md:px-8 md:py-4 pointer-events-auto
            rounded-full md:rounded-none border
            ${isOpen 
              ? 'bg-white/95 backdrop-blur-3xl shadow-md border-pastelia-brown/10 md:bg-transparent md:shadow-none md:border-transparent' 
              : scrolled 
                ? 'bg-white/95 backdrop-blur-3xl shadow-sm border-pastelia-brown/15 transition-all duration-300 md:bg-transparent md:shadow-none md:border-transparent' 
                : 'bg-transparent border-transparent shadow-none transition-all duration-300'}
          `}>
            <div className="flex-1 flex justify-start">
              <a href="#" className="flex-shrink-0 -mt-1" onClick={() => setIsOpen(false)}>
                <img 
                  src="/images/logo.jpg" 
                  alt="Pastelia Bakery" 
                  className="h-10 md:h-11 w-auto mix-blend-multiply hover:scale-105 transition-transform duration-300"
                />
              </a>
            </div>

          <nav className="hidden md:flex flex-1 justify-center items-center gap-4 lg:gap-8 xl:gap-10">
            {desktopLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`relative group inline-block text-sm lg:text-base font-medium transition-colors duration-300 py-1 ${activeSection === link.href.replace('/#', '') ? 'text-pastelia-burgundy' : 'text-pastelia-brown/70 hover:text-pastelia-burgundy'}`}
              >
                {link.label}
                <span className={`absolute -bottom-0.5 left-0 h-[1.5px] bg-pastelia-burgundy transition-all duration-300 ease-out ${activeSection === link.href.replace('/#', '') ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'}`} />
              </a>
            ))}
          </nav>

            <div className="flex-1 flex justify-end items-center">
              <a 
                href={contactInfo.whatsappUrl} 
                className="hidden md:inline-flex items-center justify-center gap-1.5 bg-pastelia-burgundy text-white px-4 lg:px-6 py-2.5 rounded-full text-sm lg:text-[15px] font-medium transition-all duration-300 shadow-sm hover:shadow-md hover:shadow-pastelia-burgundy/15 hover:-translate-y-0.5 group"
              >
                Hacer Pedido <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <button 
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden flex items-center justify-center p-2 -mr-2 text-pastelia-brown transition-transform hover:scale-105 active:scale-95"
                aria-label="Toggle Menu"
              >
                {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
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
                className="absolute top-full mt-2 left-4 right-4 z-10 bg-white/95 backdrop-blur-3xl shadow-2xl border border-pastelia-brown/10 rounded-[2rem] overflow-hidden flex flex-col p-4 md:hidden pointer-events-auto"
              >
                <nav className="flex flex-col items-center justify-center w-full">
                  {navLinks.map((link, i) => (
                    <div key={link.label} className="w-full flex flex-col items-center">
                      <motion.a
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="flex items-center justify-center w-full py-3 font-serif text-2xl text-pastelia-burgundy active:scale-95 transition-all"
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
                <div className="flex flex-col items-center gap-4 mt-4 pt-5 border-t border-pastelia-burgundy/10">
                  <a
                    href={contactInfo.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                    className="inline-flex items-center justify-center gap-1.5 bg-pastelia-burgundy text-white px-8 py-3 rounded-full text-base font-medium shadow-sm active:scale-95 transition-transform"
                  >
                    Hacer Pedido <ArrowUpRight className="w-4 h-4" />
                  </a>
                  <div className="flex items-center gap-6 text-xs font-medium tracking-[0.08em] uppercase text-pastelia-brown/70">
                    <a
                      href={`https://instagram.com/${contactInfo.instagram.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-pastelia-burgundy transition-colors"
                    >
                      Instagram ↗
                    </a>
                    <a
                      href={`https://tiktok.com/${contactInfo.tiktok}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-pastelia-burgundy transition-colors"
                    >
                      TikTok ↗
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </header>
    </>
  );
}
