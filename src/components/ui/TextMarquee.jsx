import { motion } from 'motion/react';

// Un adorno de estrella de 4 puntas, muy usado en diseño premium/editorial
const StarOrnament = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 md:w-5 md:h-5 text-pastelia-cream/50">
    <path d="M12 0C12 6.62742 17.3726 12 24 12C17.3726 12 12 17.3726 12 24C12 17.3726 6.62742 12 0 12C6.62742 12 12 6.62742 12 0Z" fill="currentColor"/>
  </svg>
);

export default function TextMarquee() {
  const words = [
    "Ingredientes de Alta Calidad",
    "Elaborado a Mano",
    "100% Artesanal",
    "Recetas Exclusivas"
  ];

  // Repetimos el arreglo varias veces para asegurar un scroll infinito fluido
  const repeatedWords = [...words, ...words, ...words, ...words, ...words];

  return (
    <div className="w-full bg-pastelia-burgundy text-pastelia-cream overflow-hidden py-4 md:py-6 border-y border-pastelia-brown/20 flex whitespace-nowrap">
      <motion.div
        className="flex items-center gap-8 md:gap-16 min-w-max pr-8 md:pr-16"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 35, // Movimiento más suave y premium
        }}
      >
        {repeatedWords.map((word, i) => (
          <span key={i} className="flex items-center gap-8 md:gap-16">
            <span className="font-sans font-medium tracking-[0.25em] uppercase text-xs md:text-sm text-pastelia-cream/90">{word}</span>
            <StarOrnament />
          </span>
        ))}
      </motion.div>
    </div>
  );
}
