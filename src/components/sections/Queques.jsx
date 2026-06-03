import { useState } from 'react';
import { motion } from 'motion/react';
import { catalog } from '../../data/products';
import { MessageCircle, CakeSlice } from 'lucide-react';

export default function Queques() {
  const queques = catalog.queques;
  const [imgError, setImgError] = useState({});

  const handleImgError = (id) => {
    setImgError(prev => ({ ...prev, [id]: true }));
  };

  return (
    <section id="queques" className="relative py-24 scroll-mt-10 md:scroll-mt-5 md:py-32 px-6 max-w-7xl mx-auto border-t border-pastelia-brown/5 overflow-hidden">
      
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
        className="relative z-10 mb-16 md:mb-24 text-center max-w-xl mx-auto flex flex-col items-center"
      >
        <h2 className="font-serif text-5xl md:text-7xl font-bold tracking-tight text-pastelia-burgundy mb-6">
          Queques Artesanales
        </h2>
        <p className="text-pastelia-brown/70 text-lg md:text-2xl font-serif tracking-wide">
          El acompañante definitivo. Migas suaves, cortezas doradas y sabores pensados para la hora del té.
        </p>
      </motion.div>

      {/* Contenedor de Menú Elegante y Compacto */}
      <div className="relative z-10 flex flex-col gap-6 md:gap-8 max-w-4xl mx-auto">
        {queques.map((product, idx) => (
          <motion.div 
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="group flex flex-col sm:flex-row items-start sm:items-center p-6 md:px-7 md:py-6 rounded-[28px] bg-[rgba(255,255,255,0.45)] border border-pastelia-burgundy/10 hover:bg-[rgba(255,255,255,0.85)] hover:shadow-xl hover:shadow-pastelia-brown/5 hover:-translate-y-1 transition-all duration-500 ease-out"
          >
            {/* 1. Imagen a la izquierda (Incrementada 40%) */}
            <div className="relative w-full sm:w-56 md:w-64 aspect-[4/3] sm:aspect-square flex-shrink-0 overflow-hidden rounded-[2rem] bg-pastelia-cream/50 mb-6 sm:mb-0 sm:mr-8">
              {!imgError[product.id] ? (
                <img 
                  src={product.image} alt={product.name} 
                  onError={() => handleImgError(product.id)}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" loading="lazy"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full text-pastelia-brown/30"><CakeSlice className="w-10 h-10 opacity-30" /></div>
              )}
            </div>
            
            {/* 2. Información del producto al centro */}
            <div className="flex flex-col justify-center max-w-lg">
              <h3 className="font-serif italic text-2xl md:text-3xl text-pastelia-burgundy mb-2">{product.name}</h3>
              <p className="text-pastelia-brown/60 text-base md:text-base leading-relaxed mb-4 sm:mb-0 font-light">
                {product.description}
              </p>
            </div>

            {/* 3. Precio e icono de WhatsApp (Horizontal en móviles, vertical en escritorio) */}
            <div className="sm:ml-auto flex flex-row sm:flex-col justify-between sm:justify-center items-center w-full sm:w-auto gap-3 mt-4 sm:mt-0 border-t sm:border-t-0 border-pastelia-brown/10 pt-5 sm:pt-0">
              <span className="font-sans font-medium text-lg md:text-xl text-pastelia-brown whitespace-nowrap">{product.price}</span>
              <a href={product.waLink} target="_blank" rel="noopener noreferrer" className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-pastelia-burgundy text-white sm:bg-pastelia-brown/5 sm:text-pastelia-burgundy hover:bg-pastelia-burgundy hover:text-white transition-colors shadow-sm">
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
