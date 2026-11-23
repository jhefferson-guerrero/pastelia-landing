import { contactInfo } from '../../data/contact';
import { communityImages } from '../../data/hero';

export default function SocialProof() {
  // Duplicar el array para crear un bucle infinito continuo
  const marqueeImages = [...communityImages, ...communityImages];

  return (
    <section id="comunidad" className="relative pt-24 pb-24 bg-pastelia-burgundy overflow-hidden flex flex-col items-center">

      {/* Capas Decorativas */}
      <div className="absolute inset-0 bg-cherry-pattern opacity-10 pointer-events-none mix-blend-overlay"></div>

      {/* Encabezado */}
      <div className="relative z-10 flex flex-col items-center text-center mb-16 px-6">
        <h2 className="font-serif text-3xl md:text-4xl 2xl:text-5xl font-bold tracking-tight text-pastelia-cream mb-6">
          Únete a nuestra dulce comunidad
        </h2>

      </div>

      {/* Tira de Fotos Horizontal con Desplazamiento Automático */}
      <div className="w-full relative z-10 mb-16 flex overflow-hidden">
        {/* Contenedor de Marquesina */}
        <div className="flex w-max gap-4 md:gap-6 px-4 md:px-6 animate-marquee">
          {marqueeImages.map((img, idx) => (
            <a
              key={idx}
              href={`https://instagram.com/${contactInfo.instagram.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-[26rem] md:h-[26rem] flex-shrink-0 overflow-hidden rounded-[20px] md:rounded-[24px] bg-pastelia-cream/10 block group"
            >
              <img 
                src={img} 
                alt="Instagram Pastelia Gallery" 
                className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-[1.03] group-hover:brightness-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-pastelia-burgundy/0 group-hover:bg-pastelia-burgundy/5 transition-colors duration-500"></div>
            </a>
          ))}
        </div>
      </div>

      {/* CTA de Enlace en el Pie de Página */}
      <div className="relative z-10 px-6 flex flex-col sm:flex-row justify-center gap-4">
        <a 
          href={`https://instagram.com/${contactInfo.instagram.replace('@', '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-7 py-3.5 rounded-full border border-pastelia-cream text-sm md:text-base font-medium tracking-[0.08em] uppercase text-pastelia-cream hover:bg-pastelia-cream hover:text-pastelia-burgundy hover:-translate-y-[2px] transition-all duration-300 ease-out flex items-center justify-center gap-2"
        >
          Ver Instagram <span className="font-sans text-sm">↗</span>
        </a>
        <a 
          href={`https://tiktok.com/${contactInfo.tiktok}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-7 py-3.5 rounded-full border border-pastelia-cream text-sm md:text-base font-medium tracking-[0.08em] uppercase text-pastelia-cream hover:bg-pastelia-cream hover:text-pastelia-burgundy hover:-translate-y-[2px] transition-all duration-300 ease-out flex items-center justify-center gap-2"
        >
          Ver TikTok <span className="font-sans text-sm">↗</span>
        </a>
      </div>

    </section>
  );
}
