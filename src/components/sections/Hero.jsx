import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MagneticButton from '../ui/MagneticButton';
import Button from '../ui/Button';
import { contactInfo } from '../../data/contact';
import { OrganicBlob } from '../ui/Decorations';

export default function Hero() {
  const heroImages = [
    '/images/carrot-cake.webp',
    '/images/torta-de-chocolate.webp',
    '/images/instagram-1.webp',
    '/images/choco-berry.webp',
    '/images/tres-delicias.webp',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Rotación automática cada 5 segundos
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % heroImages.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  return (
    <section className="relative min-h-[85vh] md:min-h-[80vh] flex items-center justify-center overflow-hidden bg-pastelia-cream px-6 pt-24 pb-16">

      {/* Fondos Artísticos Editoriales */}
      <div className="absolute inset-0 bg-cherry-pattern opacity-[0.015] pointer-events-none"></div>
      <OrganicBlob className="bg-pastelia-brown/10 w-[40rem] h-[40rem] -top-20 -left-20" delay={0} />

      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-10 items-center mt-8 md:mt-16">

        {/* Bloque de Texto Asimétrico (Centrado en móviles) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.32, 0.72, 0, 1] }}
          className="md:col-span-7 flex flex-col items-center md:items-start text-center md:text-left w-full max-w-full z-20 pt-4 md:pt-0"
        >
          {/* Logo / Nombre de Marca como el punto focal masivo */}
          <h1 className="font-serif text-[15vw] sm:text-6xl md:text-8xl lg:text-[7.5rem] font-bold tracking-tight text-pastelia-burgundy mb-3 md:mb-8 leading-[0.9] max-w-full break-words">
            Pastelia <span className="sr-only">Bakery</span>
          </h1>

          <div className="flex flex-col items-center md:items-start gap-2 md:gap-6 mb-5 md:mb-10 border-t md:border-t-0 border-l-0 md:border-l border-pastelia-brown/20 pt-4 md:pt-0 md:pl-5 w-full">
            <h2 className="uppercase text-pastelia-brown/60 text-xs md:text-sm tracking-[0.2em] md:tracking-[0.3em] font-bold">
              Carta de Pedidos 2026
            </h2>

            <p className="text-pastelia-brown text-2xl font-serif italic max-w-lg leading-relaxed">
              Postres artesanales para momentos especiales.
            </p>

            <p className="hidden md:block text-pastelia-brown/70 text-base md:text-lg max-w-md leading-relaxed font-light px-4 md:px-0">
              Tortas, queques y dulces elaborados con dedicación, ingredientes de calidad y atención al detalle.
            </p>
          </div>

          <MagneticButton>
            <Button
              href={contactInfo.whatsappUrl}
              label="Hacer Pedido"
              variant="primary"
              className="pl-5 md:pl-8 pr-3 md:pr-5 py-2.5 md:py-4 text-sm md:text-lg tracking-wide shadow-md hover:shadow-2xl hover:shadow-pastelia-burgundy/20 hover:-translate-y-[2px] hover:scale-[1.02] transition-all duration-500 ease-out"
            />
          </MagneticButton>
        </motion.div>

        {/* Bloque de Imagen Asimétrico (Escalado responsivo) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, rotate: 2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, ease: [0.32, 0.72, 0, 1], delay: 0.2 }}
          className="md:col-span-5 relative z-10 mt-0 flex justify-center md:justify-end w-full group"
        >
          <div className="relative aspect-square md:aspect-[5/6] w-[90%] sm:w-[80%] md:w-full max-h-[350px] md:max-h-none max-w-[400px] sm:max-w-[440px] md:max-w-[460px] lg:max-w-[520px] my-6 md:my-0 mx-auto md:mr-auto overflow-hidden shadow-md md:shadow-2xl shadow-pastelia-brown/10 md:shadow-pastelia-brown/20 rounded-[60%_40%_50%_50%_/_50%_50%_60%_40%] md:rounded-[60%_40%_30%_70%_/_60%_30%_70%_40%] border-[3px] md:border-[4px] border-pastelia-burgundy/40 md:-translate-x-4 lg:-translate-x-8 transition-all duration-[1.5s] ease-in-out group-hover:shadow-[0_30px_60px_-15px_rgba(89,17,25,0.3)] group-hover:rounded-[40%_60%_70%_30%_/_40%_50%_60%_50%]">

            <AnimatePresence>
              <motion.img
                key={currentIndex}
                src={heroImages[currentIndex]}
                alt="Pastelia Bakery Artisan Quality"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
                loading="eager"
              />
            </AnimatePresence>

            {/* Controles de flechas (visibles al pasar el mouse) */}
            <div className="absolute inset-0 flex items-center justify-between px-4 md:px-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
              <button
                onClick={prevImage}
                className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-pastelia-cream/80 text-pastelia-burgundy backdrop-blur-sm shadow-lg hover:bg-pastelia-cream hover:scale-110 transition-all duration-300"
                aria-label="Imagen anterior"
              >
                <ChevronLeft className="w-6 h-6" strokeWidth={1.5} />
              </button>
              <button
                onClick={nextImage}
                className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-pastelia-cream/80 text-pastelia-burgundy backdrop-blur-sm shadow-lg hover:bg-pastelia-cream hover:scale-110 transition-all duration-300"
                aria-label="Siguiente imagen"
              >
                <ChevronRight className="w-6 h-6" strokeWidth={1.5} />
              </button>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
