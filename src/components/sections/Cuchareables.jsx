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
    <section id="cuchareables" className="relative py-24 scroll-mt-10 md:scroll-mt-5 md:py-32 px-6 max-w-7xl mx-auto border-t border-pastelia-brown/5 overflow-hidden">
      
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
        className="relative z-10 mb-16 md:mb-24 text-center max-w-xl mx-auto flex flex-col items-center"
      >
        <span className="text-pastelia-burgundy font-sans uppercase tracking-widest text-sm font-semibold mb-2">Nuevo Lanzamiento</span>
        <h2 className="font-serif text-5xl md:text-6xl 2xl:text-7xl font-bold tracking-tight text-pastelia-brown mb-6">
          Cuchareables
        </h2>
        <p className="text-pastelia-brown/70 text-lg md:text-2xl font-serif tracking-wide">
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
            className="group flex flex-col sm:flex-row items-start sm:items-center p-6 md:px-7 md:py-6 rounded-[28px] bg-white border border-pastelia-brown/10 hover:shadow-2xl hover:shadow-pastelia-brown/10 hover:-translate-y-1 transition-all duration-500 ease-out"
          >
            <div 
              className="relative w-full sm:w-56 md:w-64 aspect-[4/3] sm:aspect-square flex-shrink-0 overflow-hidden rounded-[2rem] bg-pastelia-cream mb-6 sm:mb-0 sm:mr-8 cursor-zoom-in"
              onClick={() => !imgError[product.id] && setSelectedImage({ src: product.image, alt: product.name })}
            >
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

      <Lightbox 
        isOpen={!!selectedImage} 
        imageSrc={selectedImage?.src} 
        imageAlt={selectedImage?.alt} 
        onClose={() => setSelectedImage(null)} 
      />
    </section>
  );
}
