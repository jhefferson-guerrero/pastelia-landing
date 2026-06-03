import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { contactInfo } from '../../data/contact';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = ['tortas', 'kekes', 'clasicos'];
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

  // Prevent background scrolling when mobile menu is open
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
    { label: 'Tortas', href: '#tortas' },
    { label: 'Kekes', href: '#kekes' },
    { label: 'Clásicos', href: '#clasicos' },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none pt-6 px-4">
        <div className="max-w-5xl mx-auto relative flex justify-center items-center pointer-events-auto">
          
          <div className={`
            flex items-center justify-between w-full md:w-auto px-6 py-3 md:px-10 md:py-4 rounded-full transition-[background-color,box-shadow,backdrop-filter,transform,opacity] duration-700 ease-[var(--ease-fluid)] border relative z-20
            ${scrolled || isOpen ? 'bg-white backdrop-blur-2xl shadow-sm border-pastelia-brown/15' : 'bg-transparent border-transparent shadow-none ring-0 outline-none'}
          `}>
            <a href="#" className="flex-shrink-0 md:mr-12" onClick={() => setIsOpen(false)}>
              <img 
                src="/assets/images/logo-pastelia.png" 
                alt="Pastelia Bakery" 
                className="h-8 md:h-10 w-auto"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <span className="hidden font-serif text-2xl font-bold tracking-tight text-pastelia-burgundy">
                Pastelia
              </span>
            </a>

            <nav className="hidden md:flex items-center gap-8 md:gap-12">
              {navLinks.map((link) => (
                <a 
                  key={link.label}
                  href={link.href}
                  className={`text-[15px] md:text-base font-medium transition-colors ${activeSection === link.href.substring(1) ? 'text-pastelia-burgundy' : 'text-pastelia-brown/60 hover:text-pastelia-burgundy'}`}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden flex items-center justify-center p-2 -mr-2 text-pastelia-brown transition-transform hover:scale-105 active:scale-95"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>

          <AnimatePresence>
            {isOpen && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="absolute top-full mt-2 left-0 right-0 z-10 bg-white/95 backdrop-blur-3xl shadow-2xl border border-pastelia-brown/10 rounded-[2rem] overflow-hidden flex flex-col p-4 md:hidden"
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
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </header>
    </>
  );
}
