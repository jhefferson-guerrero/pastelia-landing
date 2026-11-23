import { contactInfo } from '../../data/contact';
import { MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-pastelia-burgundy text-pastelia-cream overflow-hidden pt-16 pb-24 md:pb-8 px-6">
      <div className="absolute inset-0 bg-cherry-pattern opacity-10 pointer-events-none mix-blend-overlay"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center">
        
        {/* Marca y Misión */}
        <div className="mb-10 flex flex-col items-center">
          <img
            src="/images/logo-skeleton.webp"
            alt="Pastelia Bakery"
            width="160"
            height="160"
            loading="lazy"
            className="h-24 w-24 md:h-32 md:w-32 object-contain mb-4"
          />
          <p className="text-pastelia-cream/80 text-lg md:text-2xl font-serif italic max-w-xl leading-relaxed">
            "Postres artesanales hechos con dedicación para momentos especiales."
          </p>
        </div>

        <div className="w-full h-px bg-pastelia-cream/10 mb-10 max-w-md mx-auto"></div>

        {/* Área de Acción */}
        <div className="flex flex-col items-center justify-center w-full max-w-2xl gap-6 mb-16">
          <span className="font-serif italic text-xl md:text-2xl text-pastelia-cream">
            Realiza tu pedido vía WhatsApp
          </span>
          
          <div className="flex flex-wrap justify-center items-center gap-4 font-sans text-lg md:text-xl text-pastelia-cream/80 font-light mb-2">
            <a href={contactInfo.whatsappChatUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
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
              className="group relative text-xs md:text-sm font-medium tracking-[0.08em] uppercase text-pastelia-cream/85 hover:text-white transition-all duration-300 ease-out flex items-center gap-1 pb-1"
            >
              Instagram <span className="font-sans text-xs md:text-sm">↗</span>
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
            </a>
            <a 
              href={`https://tiktok.com/${contactInfo.tiktok}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group relative text-xs md:text-sm font-medium tracking-[0.08em] uppercase text-pastelia-cream/85 hover:text-white transition-all duration-300 ease-out flex items-center gap-1 pb-1"
            >
              TikTok <span className="font-sans text-xs md:text-sm">↗</span>
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
            </a>
            <a 
              href="https://www.facebook.com/dulcesdemama76" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group relative text-xs md:text-sm font-medium tracking-[0.08em] uppercase text-pastelia-cream/85 hover:text-white transition-all duration-300 ease-out flex items-center gap-1 pb-1"
            >
              Facebook <span className="font-sans text-xs md:text-sm">↗</span>
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
            </a>
          </div>
        </div>

        {/* Letra Pequeña (Horario y Entrega) */}
        <div className="w-full flex flex-col items-center gap-5 pt-8 border-t border-pastelia-cream/15">

          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-center">
            <p className="flex flex-col md:flex-row items-center gap-1 md:gap-3">
              <span className="uppercase text-xs tracking-[0.2em] font-semibold text-pastelia-cream/60">Reparto</span>
              <span className="text-sm md:text-base text-pastelia-cream/90">Lima, Perú</span>
            </p>
            <span aria-hidden="true" className="hidden md:block h-5 w-px bg-pastelia-cream/25"></span>
            <p className="flex flex-col md:flex-row items-center gap-1 md:gap-3">
              <span className="uppercase text-xs tracking-[0.2em] font-semibold text-pastelia-cream/60">Atención</span>
              <span className="text-sm md:text-base text-pastelia-cream/90">Lun-Vie 10am-7pm, Sáb 1pm-7pm</span>
            </p>
          </div>

          <p className="text-xs md:text-sm tracking-wide text-pastelia-cream/60">
            &copy; {new Date().getFullYear()} Pastelia Bakery.
          </p>

        </div>

      </div>
    </footer>
  );
}
