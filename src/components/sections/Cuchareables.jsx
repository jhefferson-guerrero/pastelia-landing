import { useState } from 'react';
import { motion } from 'motion/react';
import { catalog } from '../../data/products';
import { MessageCircle, CakeSlice } from 'lucide-react';
import Lightbox from '../ui/Lightbox';

export default function Cuchareables() {
  const cuchareables = catalog.cuchareables;
  const [imgError, setImgError] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImgError = (id) => {
    setImgError(prev => ({ ...prev, [id]: true }));
  };

  return (
    <section id="cuchareables" className="relative py-24 scroll-mt-10 md:scroll-mt-5 md:py-32 px-6 bg-pastelia-burgundy overflow-hidden">

      {/* Capas Decorativas */}
      <div className="absolute inset-0 bg-cherry-pattern opacity-10 pointer-events-none mix-blend-overlay"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
        className="relative z-10 mb-16 md:mb-24 text-center max-w-xl mx-auto flex flex-col items-center"
      >
        <span className="text-pastelia-cream/70 font-sans uppercase tracking-widest text-sm font-semibold mb-2">Nuevo Lanzamiento</span>
        <h2 className="font-serif text-5xl md:text-6xl 2xl:text-7xl font-bold tracking-tight text-pastelia-cream mb-6">
          Cuchareables
        </h2>
        <p className="text-pastelia-cream/80 text-lg md:text-2xl font-serif tracking-wide">
          Capas de puro sabor en su formato más indulgente. Perfectos para disfrutar a tu propio ritmo.
        </p>
      </motion.div>

      <div className="relative z-10 flex flex-col gap-6 md:gap-8 max-w-4xl mx-auto">
        {cuchareables.map((product, idx) => (
          <motion.div 
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="group flex flex-col sm:flex-row items-start sm:items-center p-6 md:px-7 md:py-6 rounded-[28px] bg-pastelia-cream border border-pastelia-cream shadow-lg hover:shadow-2xl transition-shadow duration-500 ease-out"
          >
            <div 
              className="relative w-full sm:w-56 md:w-64 aspect-[4/3] sm:aspect-square flex-shrink-0 overflow-hidden rounded-[2rem] bg-white mb-6 sm:mb-0 sm:mr-8 cursor-zoom-in group/img"
              onClick={() => product.image && !imgError[product.id] && setSelectedImage({ src: product.image, alt: product.name })}
            >
              {product.image && !imgError[product.id] ? (
                <img 
                  src={product.image} alt={product.name} 
                  onError={() => handleImgError(product.id)}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/img:scale-[1.03]" loading="lazy"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full text-pastelia-brown/30"><CakeSlice className="w-10 h-10 opacity-30" /></div>
              )}
            {/* Tinte sutil al pasar el cursor, igual que en Tortas */}
            <div className="absolute inset-0 bg-pastelia-burgundy/0 group-hover:bg-pastelia-burgundy/5 transition-colors duration-500 pointer-events-none"></div>
            </div>
            
            <div className="flex flex-col justify-center max-w-lg sm:pr-6 md:pr-10">
              <h3 className="font-serif italic text-2xl md:text-3xl text-pastelia-brown mb-2">{product.name}</h3>
              <p className="text-pastelia-brown/60 text-base md:text-base leading-relaxed mb-4 sm:mb-0 font-light">
                {product.description}
              </p>
            </div>

            <div className="sm:ml-auto flex flex-row sm:flex-col justify-between sm:justify-center items-center w-full sm:w-auto gap-3 mt-4 sm:mt-0 border-t sm:border-t-0 border-pastelia-brown/10 pt-5 sm:pt-0">
              <span className="font-sans font-medium text-lg md:text-xl text-pastelia-burgundy whitespace-nowrap">{product.price}</span>
              <a href={product.waLink} target="_blank" rel="noopener noreferrer" className="flex-shrink-0 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-pastelia-burgundy text-white hover:bg-pastelia-brown hover:text-white transition-colors shadow-sm">
                <MessageCircle className="w-5 h-5 md:w-6 md:h-6" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
      </div>

      <Lightbox
        isOpen={!!selectedImage} 
        imageSrc={selectedImage?.src} 
        imageAlt={selectedImage?.alt} 
        onClose={() => setSelectedImage(null)} 
      />
    </section>
  );
}
