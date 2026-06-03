import { useState } from 'react';
import { motion } from 'motion/react';
import { CakeSlice, ArrowRight } from 'lucide-react';

export default function DoppelrandCard({ product }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div 
      className="group block h-full relative"
    >
      {/* Cambio de fondo decorativo para profundidad editorial */}
      <div className="absolute inset-0 bg-pastelia-brown/5 rounded-[2rem] transform translate-x-2 translate-y-2 group-hover:translate-x-3 group-hover:translate-y-3 transition-transform duration-500"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
        className="relative flex flex-col h-full bg-pastelia-white p-4 rounded-[2rem] border border-pastelia-brown/5 shadow-sm transition-colors duration-500 z-10"
      >
        
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.5rem] bg-pastelia-cream/50 mb-6">
          {!imgError ? (
            <img 
              src={product.image} 
              alt={product.name} 
              onError={() => setImgError(true)}
              className="w-full h-full object-cover transition-transform duration-1000 ease-[var(--ease-fluid)] group-hover:scale-110"
              loading="lazy"
            />
          ) : (
            <div className="flex flex-col items-center justify-center w-full h-full text-pastelia-brown/30">
              <CakeSlice className="w-10 h-10 mb-2 opacity-30 stroke-[1.5]" />
              <span className="text-[10px] uppercase tracking-[0.2em] font-medium">Pastelia</span>
            </div>
          )}
          <div className="absolute inset-0 bg-pastelia-burgundy/0 group-hover:bg-pastelia-burgundy/5 transition-colors duration-500"></div>
        </div>

        <div className="flex flex-col flex-1 px-2 pb-2">
          
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-serif italic text-2xl md:text-3xl font-medium tracking-tight text-pastelia-burgundy group-hover:text-pastelia-brown transition-colors">
              {product.name}
            </h3>
            <span className="font-sans font-medium text-lg tracking-tight text-pastelia-brown">
              {product.price}
            </span>
          </div>

          <p className="text-pastelia-brown/60 text-sm leading-relaxed mb-6 font-light">
            {product.description}
          </p>

          <a href={product.waLink} target="_blank" rel="noopener noreferrer" className="mt-auto flex w-fit items-center text-[10px] font-bold uppercase tracking-[0.2em] text-pastelia-burgundy/50 hover:text-pastelia-burgundy transition-colors">
            Descubrir
            <ArrowRight className="w-4 h-4 ml-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500" />
          </a>

        </div>
      </motion.div>
    </div>
  );
}
