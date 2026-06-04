import { motion } from 'motion/react';

export default function TextMarquee() {
  const words = [
    "Ingredientes de Alta Calidad",
    "Elaborado a Mano",
    "100% Artesanal",
    "Recetas Exclusivas"
  ];

  // Repetimos el arreglo varias veces para asegurar un scroll infinito fluido
  const repeatedWords = [...words, ...words, ...words, ...words];

  return (
    <div className="w-full bg-pastelia-burgundy text-pastelia-cream overflow-hidden py-3 md:py-4 border-y border-pastelia-brown/20 flex whitespace-nowrap">
      <motion.div
        className="flex gap-4 md:gap-8 min-w-max pr-4 md:pr-8"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 25, // Velocidad del deslizamiento
        }}
      >
        {repeatedWords.map((word, i) => (
          <span key={i} className="flex items-center gap-4 md:gap-8 font-sans font-light tracking-[0.2em] uppercase text-xs md:text-sm">
            <span>{word}</span>
            <span className="text-pastelia-cream/40">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
