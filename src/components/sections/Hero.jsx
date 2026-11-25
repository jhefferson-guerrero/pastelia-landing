import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MagneticButton from '../ui/MagneticButton';
import Button from '../ui/Button';
import { contactInfo } from '../../data/contact';
import { heroImages } from '../../data/hero';
import { OrganicBlob } from '../ui/Decorations';
import { useRevealed } from '../../lib/reveal';

// Entrada escalonada, de 1,2 s en total (el menú primero, el WhatsApp flotante al final):
//   menú 0 s · título 0,05 · foto 0,1 · texto 0,17 · botón 0,29 · WhatsApp 0,7
// Cada elemento aparece un poco después del anterior.
// Parte oculto y solo se anima cuando la página ya se ve (el preloader se retiró); así la
// entrada se ve completa aunque la página se haya montado detrás del preloader.
const EASE = [0.32, 0.72, 0, 1];
const HIDDEN = { opacity: 0, y: 24 };
const enter = (revealed, delay = 0) => ({
  initial: HIDDEN,
  animate: revealed ? { opacity: 1, y: 0 } : HIDDEN,
  transition: { duration: 0.8, ease: EASE, delay },
});

export default function Hero() {
  const revealed = useRevealed();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Paralaje del arco en móvil: la foto se mueve más lento que el scroll dentro del arco, que
  // queda fijo. Va ampliada (30 %) para que con el desplazamiento (±12 %) nunca se vean los bordes.
  const archRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: archRef, offset: ['start end', 'end start'] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['-12%', '12%']);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % heroImages.length);
  };

  // Rotación automática: 5 segundos después de cada cambio, también si fue manual (así el
  // temporizador se reinicia y la foto que acabas de elegir no se va de inmediato).
  // La cuenta empieza cuando la página ya se ve, no mientras sigue el preloader.
  useEffect(() => {
    if (!revealed) return;
    const timer = setTimeout(nextImage, 5000);
    return () => clearTimeout(timer);
  }, [currentIndex, revealed]);

  return (
    <section className="relative min-h-[75vh] md:min-h-screen flex items-center justify-center overflow-hidden bg-pastelia-cream px-6 pt-24 md:pt-24 pb-16 md:pb-0">

      {/* Fondos Artísticos Editoriales */}
      <div className="absolute inset-0 bg-cherry-pattern opacity-[0.015] pointer-events-none"></div>
      <OrganicBlob className="bg-pastelia-brown/10 w-[40rem] h-[40rem] -top-20 -left-20" />

      {/* Desktop Full-Height Image Background */}
      <motion.div
        initial={{ opacity: 0, scale: 1.06 }}
        animate={revealed ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.06 }}
        transition={{ duration: 1.0, ease: EASE, delay: 0.1 }}
        className="hidden md:block absolute top-0 right-0 bottom-0 w-1/2 z-0 [mask-image:linear-gradient(to_right,transparent,black_20%)] group"
      >
        <AnimatePresence initial={false}>
          <motion.img
            key={currentIndex}
            src={heroImages[currentIndex].src}
            alt={heroImages[currentIndex].alt}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover"
            loading={currentIndex === 0 ? "eager" : "lazy"}
          />
        </AnimatePresence>
        {/* Con mouse el botón aparece al pasar el cursor; en pantallas táctiles (sin hover) siempre se ve */}
        <div className="absolute inset-0 flex items-center justify-end px-8 pointer-events-none pointer-fine:opacity-0 pointer-fine:group-hover:opacity-100 pointer-fine:group-focus-within:opacity-100 transition-opacity duration-300 z-20">
          <button
            onClick={nextImage}
            className="pointer-events-auto w-12 h-12 flex items-center justify-center rounded-full bg-pastelia-cream/80 text-pastelia-burgundy backdrop-blur-sm shadow-lg hover:bg-pastelia-cream hover:scale-110 transition-all duration-300"
            aria-label="Siguiente imagen"
          >
            <ChevronRight className="w-6 h-6" strokeWidth={1.5} />
          </button>
        </div>
      </motion.div>

      <div className="relative z-10 w-full max-w-7xl [@media(max-height:720px)]:max-w-[78rem] [@media(max-height:720px)]:md:px-8 mx-auto pointer-events-none grid grid-cols-1 md:grid-cols-12 gap-5 lg:gap-10 items-center mt-4 md:mt-0">

        {/* Bloque de Texto Asimétrico (Centrado en móviles) */}
        <div className="md:col-span-7 pointer-events-auto flex flex-col items-center md:items-start text-center md:text-left w-full max-w-full z-20 pt-4 md:pt-0">
          {/* Logo / Nombre de Marca como el punto focal masivo */}
          <motion.h1 {...enter(revealed, 0.05)} className="font-serif text-[15vw] sm:text-6xl md:text-7xl lg:text-7xl 2xl:text-[7.5rem] font-bold tracking-tight text-pastelia-burgundy mb-3 md:mb-6 2xl:mb-8 leading-[0.9] max-w-full break-words">
            Pastelia <span className="sr-only">Bakery</span>
          </motion.h1>

          <motion.div {...enter(revealed, 0.17)} className="flex flex-col items-center md:items-start gap-2 md:gap-4 2xl:gap-6 mb-5 md:mb-8 2xl:mb-10 border-t md:border-t-0 border-l-0 md:border-l border-pastelia-brown/20 pt-4 md:pt-0 md:pl-5 w-full">
            <h2 className="uppercase text-pastelia-brown/60 text-xs md:text-sm tracking-[0.2em] md:tracking-[0.3em] font-bold">
              Carta de Pedidos {new Date().getFullYear()}
            </h2>

            <p className="text-pastelia-brown text-2xl font-serif italic max-w-lg leading-relaxed">
              Postres artesanales para momentos especiales.
            </p>

            <p className="hidden md:block text-pastelia-brown/70 text-base md:text-lg max-w-md leading-relaxed font-light px-4 md:px-0">
              Tortas, queques y dulces elaborados con dedicación, ingredientes de calidad y atención al detalle.
            </p>
          </motion.div>

          <motion.div {...enter(revealed, 0.29)}>
          <MagneticButton>
            <Button
              href={contactInfo.whatsappUrl}
              label="Hacer Pedido"
              variant="primary"
              className="pl-5 md:pl-8 pr-3 md:pr-5 py-2.5 md:py-4 text-sm md:text-lg tracking-wide shadow-md hover:shadow-2xl hover:shadow-pastelia-burgundy/20 hover:-translate-y-[2px] hover:scale-[1.02] transition-all duration-500 ease-out"
            />
          </MagneticButton>
          </motion.div>
        </div>

        {/* Bloque de Imagen (Arco elegante en móviles) */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={revealed ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 24, scale: 0.96 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
          className="md:hidden pointer-events-auto relative z-10 mt-2 flex justify-center w-full group"
        >
          <div ref={archRef} className="relative isolate transform-gpu aspect-[4/5] w-[85%] max-w-[360px] my-6 mx-auto overflow-hidden shadow-2xl shadow-pastelia-brown/15 ring-[7px] ring-[#E9DCCB] rounded-t-full rounded-b-3xl transition-all duration-700 ease-in-out group-hover:-translate-y-1 group-hover:shadow-pastelia-burgundy/15">

            <motion.div
              style={reduceMotion ? undefined : { y: parallaxY, scale: 1.3 }}
              className="absolute inset-0 will-change-transform"
            >
              <AnimatePresence initial={false}>
                <motion.img
                  key={currentIndex}
                  src={heroImages[currentIndex].src}
                  alt={heroImages[currentIndex].alt}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading={currentIndex === 0 ? "eager" : "lazy"}
                />
              </AnimatePresence>
            </motion.div>

            {/* Efecto ventana: sombra interior (la foto queda "al fondo", detrás del marco) y un
                reflejo muy tenue de vidrio. Es decorativo y no intercepta toques. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0_26px_34px_-14px_rgba(60,28,12,0.5),inset_16px_0_22px_-16px_rgba(60,28,12,0.3),inset_-16px_0_22px_-16px_rgba(60,28,12,0.3),inset_0_-12px_20px_-14px_rgba(60,28,12,0.22),inset_0_0_0_1px_rgba(60,28,12,0.25)] bg-[linear-gradient(135deg,rgba(255,255,255,0.16)_0%,rgba(255,255,255,0)_34%)]"
            ></div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
