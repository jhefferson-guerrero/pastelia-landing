import { useState } from 'react';
import { motion } from 'motion/react';
import { OrganicBlob } from '../ui/Decorations';
import { catalog } from '../../data/products';
import { MessageCircle, CakeSlice } from 'lucide-react';

export default function Tortas() {
  const tortas = catalog.tortas;
  const [imgError, setImgError] = useState({});

  const handleImgError = (id) => {
    setImgError(prev => ({ ...prev, [id]: true }));
  };

  return (
    <section id="tortas" className="relative py-24 scroll-mt-10 md:scroll-mt-5 md:py-32 px-6 max-w-7xl mx-auto border-t border-pastelia-brown/5 overflow-hidden">
      <OrganicBlob className="bg-pastelia-burgundy/5 w-[30rem] h-[30rem] top-10 md:top-[60px] right-0" delay={1} />
      
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
        className="relative z-10 mb-16 md:mb-24 text-center md:text-left"
      >
        <h2 className="font-serif text-5xl md:text-7xl font-bold tracking-tight text-pastelia-burgundy mb-6">
          Nuestras Tortas
        </h2>
        <p className="text-pastelia-brown/70 text-lg md:text-2xl font-serif max-w-2xl tracking-wide">
          Arquitectura en masa madre. Alturas perfectas, rellenos abundantes y un diseño pensado para deslumbrar en el centro de la mesa.
        </p>
      </motion.div>

      <div className="relative z-10 flex flex-col gap-12 lg:gap-32">
        
        {tortas.map((product, idx) => {
          const isReverse = idx % 2 !== 0;
          return (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="group block bg-[rgba(255,255,255,0.45)] border border-pastelia-burgundy/10 rounded-[28px] p-5 lg:bg-transparent lg:border-transparent lg:p-0"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                
                {/* Bloque de Imagen */}
                <div className={`lg:col-span-7 relative aspect-square md:aspect-[4/3] w-full overflow-hidden rounded-[2.5rem] bg-pastelia-cream/50 order-1 ${isReverse ? 'lg:order-2' : 'lg:order-1'}`}>
                  {!imgError[product.id] ? (
                    <img 
                      src={product.image} alt={product.name} 
                      onError={() => handleImgError(product.id)}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" loading="lazy"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center w-full h-full text-pastelia-brown/30"><CakeSlice className="w-12 h-12 mb-2 opacity-30" /></div>
                  )}
                </div>

                {/* Bloque de Texto */}
                <div className={`lg:col-span-5 flex flex-col order-2 ${isReverse ? 'lg:order-1 lg:pr-10' : 'lg:order-2 lg:pl-10'}`}>
                  <h3 className="font-serif italic text-3xl md:text-5xl text-pastelia-burgundy mb-4">{product.name}</h3>
                  <span className="font-sans font-medium text-xl md:text-2xl text-pastelia-brown mb-6">{product.price}</span>
                  <p className="text-pastelia-brown/60 text-base md:text-lg leading-relaxed mb-8 font-light">{product.description}</p>
                  <a href={product.waLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm font-bold uppercase tracking-[0.2em] text-pastelia-burgundy hover:text-pastelia-brown transition-colors w-fit">
                    <MessageCircle className="w-5 h-5 mr-3" /> Pedir por WhatsApp
                  </a>
                </div>

              </div>
            </motion.div>
          );
        })}

      </div>
    </section>
  );
}
