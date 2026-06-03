import { useState } from 'react';
import { motion } from 'motion/react';
import { OrganicBlob } from '../ui/Decorations';
import { catalog } from '../../data/products';
import { MessageCircle, CakeSlice } from 'lucide-react';

export default function Clasicos() {
  const clasicos = catalog.clasicos;
  const [imgError, setImgError] = useState({});

  const handleImgError = (id) => {
    setImgError(prev => ({ ...prev, [id]: true }));
  };

  return (
    <section id="clasicos" className="relative py-24 scroll-mt-24 md:py-32 px-6 bg-pastelia-burgundy overflow-hidden">
      
      {/* Capas Decorativas */}
      <div className="absolute inset-0 bg-cherry-pattern opacity-10 pointer-events-none mix-blend-overlay"></div>
      <OrganicBlob className="bg-pastelia-white/5 w-[35rem] h-[35rem] top-1/4 -right-10 mix-blend-overlay" delay={1.5} />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
          className="mb-16 md:mb-24 text-center"
        >
          <h2 className="font-serif text-5xl md:text-7xl font-bold tracking-tight text-pastelia-cream mb-6">
            Clásicos de Pastelia
          </h2>
          <p className="text-pastelia-cream/80 text-lg md:text-2xl font-serif max-w-2xl mx-auto tracking-wide">
            Recetas originales que definen la esencia de Pastelia. Perfectas en su simpleza.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {clasicos.map((product, idx) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group flex flex-col bg-pastelia-cream p-5 md:p-6 rounded-[3rem] shadow-xl hover:shadow-2xl transition-all duration-500 ease-out"
            >
              <div className="relative aspect-square w-full overflow-hidden rounded-[2.5rem] bg-pastelia-white mb-6">
                {!imgError[product.id] ? (
                  <img 
                    src={product.image} alt={product.name} 
                    onError={() => handleImgError(product.id)}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" loading="lazy"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center w-full h-full text-pastelia-brown/30"><CakeSlice className="w-10 h-10 mb-2 opacity-30" /></div>
                )}
              </div>
              <div className="flex flex-col flex-1 px-4 pb-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-serif italic text-3xl text-pastelia-burgundy">{product.name}</h3>
                </div>
                <p className="text-pastelia-brown/60 text-base leading-relaxed mb-6 font-light">{product.description}</p>
                <div className="mt-auto flex items-center justify-between">
                  <span className="font-sans font-medium text-xl text-pastelia-brown">{product.price}</span>
                  <a href={product.waLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-10 h-10 rounded-full bg-pastelia-burgundy text-white hover:scale-110 transition-transform">
                    <MessageCircle className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
