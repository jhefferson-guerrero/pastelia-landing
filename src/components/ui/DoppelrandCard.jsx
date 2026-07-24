import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CakeSlice, ArrowRight, X } from 'lucide-react';

export default function DoppelrandCard({ product }) {
  const [imgError, setImgError] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <div className="group block h-full relative">
        {/* Cambio de fondo decorativo para profundidad editorial */}
        <div className="absolute inset-0 bg-pastelia-brown/5 rounded-[2rem] transform translate-x-2 translate-y-2 group-hover:translate-x-3 group-hover:translate-y-3 transition-transform duration-500"></div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
          className="relative flex flex-col h-full bg-pastelia-white p-4 rounded-[2rem] border border-pastelia-brown/5 shadow-sm transition-colors duration-500 z-10"
        >
          
          {/* Contenedor de Imagen con click para expandir */}
          <div 
            className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.5rem] bg-pastelia-cream/50 mb-6 cursor-zoom-in"
            onClick={() => !imgError && setIsExpanded(true)}
          >
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

      {/* Lightbox / Modal de Imagen Expandida */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsExpanded(false)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10 bg-pastelia-cream/95 backdrop-blur-md cursor-zoom-out"
          >
            {/* Botón Cerrar */}
            <button 
              className="absolute top-6 right-6 md:top-10 md:right-10 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-pastelia-burgundy text-white hover:scale-110 transition-transform shadow-lg z-[110]"
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(false);
              }}
              aria-label="Cerrar imagen"
            >
              <X className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            {/* Imagen Grande */}
            <motion.img
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              src={product.image}
              alt={product.name}
              className="w-auto h-auto max-w-full max-h-[80vh] md:max-h-[90vh] object-contain rounded-[1rem] md:rounded-[2rem] shadow-2xl"
              onClick={(e) => e.stopPropagation()} 
            />
            
            {/* Título flotante abajo (Opcional decorativo) */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="absolute bottom-8 left-0 right-0 flex justify-center pointer-events-none px-4"
            >
              <h3 className="font-serif italic text-2xl md:text-3xl text-pastelia-burgundy bg-pastelia-cream/80 backdrop-blur-md px-6 py-2 md:py-3 rounded-full shadow-lg border border-pastelia-brown/10">
                {product.name}
              </h3>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
