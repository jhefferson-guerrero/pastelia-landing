import { contactInfo } from '../../data/contact';
import { MessageCircle, Instagram, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-pastelia-burgundy text-pastelia-cream overflow-hidden pt-16 pb-8 px-6">
      <div className="absolute inset-0 bg-cherry-pattern opacity-10 pointer-events-none mix-blend-overlay"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center">
        
        {/* Marca y Misión */}
        <div className="mb-10 flex flex-col items-center">
          <img 
            src="/assets/images/logo-pastelia.png" 
            alt="Pastelia Bakery" 
            className="h-10 md:h-16 w-auto mb-6 opacity-90"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'block';
            }}
          />
          <span className="hidden font-serif text-4xl font-bold tracking-tight mb-6">
            Pastelia
          </span>
          <p className="text-pastelia-cream/80 text-lg md:text-2xl font-serif italic max-w-xl leading-relaxed">
            "Postres artesanales hechos con dedicación para momentos especiales."
          </p>
        </div>

        <div className="w-full h-px bg-pastelia-cream/10 mb-10 max-w-md mx-auto"></div>

        {/* Área de Acción */}
        <div className="flex flex-col items-center justify-center w-full max-w-2xl gap-6 mb-16">
          <span className="font-serif italic text-xl md:text-3xl text-pastelia-cream">
            Realiza tu pedido vía WhatsApp
          </span>
          
          <div className="flex flex-wrap justify-center items-center gap-4 font-sans text-lg md:text-xl text-pastelia-cream/80 font-light mb-2">
            <a href={`https://wa.me/${contactInfo.whatsapp1.replace(/\s/g, '')}`} className="hover:text-white transition-colors">
              {contactInfo.whatsapp1}
            </a>
          </div>
          
          <a 
            href={contactInfo.whatsappUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 md:px-10 py-3 md:py-4 rounded-full bg-pastelia-cream text-pastelia-burgundy font-medium text-base md:text-lg hover:scale-105 transition-transform duration-500 shadow-xl mt-2"
          >
            <MessageCircle className="w-6 h-6 mr-3" /> Hacer pedido por WhatsApp
          </a>

          {/* Enlaces Sociales en Texto Elegante */}
          <div className="flex items-center gap-5 mt-6">
            <a 
              href={`https://instagram.com/${contactInfo.instagram.replace('@', '')}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-xs md:text-sm font-medium tracking-[0.08em] uppercase text-pastelia-cream/85 hover:text-white hover:-translate-y-[2px] transition-all duration-300 ease-out flex items-center gap-1"
            >
              Instagram <span className="font-sans text-xs md:text-sm">↗</span>
            </a>
            <a 
              href="https://facebook.com/pasteliabakery" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-xs md:text-sm font-medium tracking-[0.08em] uppercase text-pastelia-cream/85 hover:text-white hover:-translate-y-[2px] transition-all duration-300 ease-out flex items-center gap-1"
            >
              Facebook <span className="font-sans text-xs md:text-sm">↗</span>
            </a>
          </div>
        </div>

        {/* Letra Pequeña (Horario y Entrega) */}
        <div className="w-full flex flex-col items-center gap-4 pt-8 border-t border-pastelia-cream/10 text-pastelia-cream/50 text-xs md:text-sm tracking-[0.1em] md:tracking-[0.15em]">
          
          <div className="flex flex-col md:flex-row items-center gap-3 md:gap-6 text-center">
            <span className="flex items-center gap-2">
              <span className="font-bold opacity-70">Reparto:</span> San Isidro, Miraflores, Surco
            </span>
            <span className="hidden md:inline opacity-30">|</span>
            <span className="flex items-center gap-2">
              <span className="font-bold opacity-70">Atención:</span> Lun-Sab 8am-8pm, Dom 9am-2pm
            </span>
          </div>

          <div className="mt-2 opacity-80">
            &copy; {new Date().getFullYear()} Pastelia Bakery.
          </div>

        </div>

      </div>
    </footer>
  );
}
