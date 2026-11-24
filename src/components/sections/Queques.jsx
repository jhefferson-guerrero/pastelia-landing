import { motion } from 'motion/react';
import { catalog } from '../../data/products';
import { MessageCircle } from 'lucide-react';
import { useLightbox } from '../ui/Lightbox';
import ProductImage from '../ui/ProductImage';

export default function Queques() {
  const queques = catalog.queques;
  const [openImage, lightbox] = useLightbox();

  return (
    <section id="queques" data-scroll-start="#queques-titulo" data-scroll-end="#queques-primera" className="relative py-24 scroll-mt-10 md:scroll-mt-5 fit-section-py px-6 max-w-7xl mx-auto border-t border-pastelia-brown/5 overflow-hidden">
      
      <motion.div
        id="queques-titulo"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
        className="relative z-10 mb-16 fit-gap-lg text-center max-w-xl mx-auto flex flex-col items-center"
      >
        <h2 className="font-serif text-[2.75rem] fit-title font-bold tracking-tight text-pastelia-burgundy mb-6">
          Queques Artesanales
        </h2>
        <p className="text-pastelia-brown/70 text-lg fit-lead font-serif tracking-wide">
          El acompañante definitivo. Migas suaves, cortezas doradas y sabores pensados para la hora del té.
        </p>
      </motion.div>

      {/* Contenedor de Menú Elegante y Compacto */}
      <div className="relative z-10 flex flex-col gap-6 fit-list-gap max-w-4xl mx-auto">
        {queques.map((product, idx) => (
          <motion.div 
            key={product.id}
            id={idx === 0 ? 'queques-primera' : undefined}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="group flex flex-col sm:flex-row items-start sm:items-center p-6 md:px-7 fit-row-card rounded-[28px] bg-white/40 backdrop-blur-sm border border-pastelia-brown/5 shadow-sm hover:shadow-md transition-shadow duration-500 ease-out"
          >
            {/* 1. Imagen a la izquierda */}
            <ProductImage
              product={product}
              onZoom={openImage}
              className="w-full sm:w-56 md:w-64 fit-row-img aspect-[4/3] sm:aspect-square flex-shrink-0 rounded-[2rem] bg-pastelia-cream/50 mb-6 sm:mb-0 sm:mr-8"
            />
            
            {/* 2. Información del producto al centro */}
            <div className="flex flex-col justify-center max-w-lg sm:pr-6 md:pr-10">
              <h3 className="font-serif italic text-2xl md:text-3xl fit-row-h3 text-pastelia-burgundy mb-2">{product.name}</h3>
              <p className="text-pastelia-brown/60 text-base md:text-base fit-row-desc leading-relaxed mb-4 sm:mb-0 font-light">
                {product.description}
              </p>
            </div>

            {/* 3. Precio e icono de WhatsApp (Horizontal en móviles, vertical en escritorio) */}
            <div className="sm:ml-auto flex flex-row sm:flex-col justify-between sm:justify-center items-center w-full sm:w-auto gap-3 mt-4 sm:mt-0 border-t sm:border-t-0 border-pastelia-brown/10 pt-5 sm:pt-0">
              <span className="font-sans font-medium text-lg md:text-xl fit-row-price text-pastelia-brown whitespace-nowrap">{product.price}</span>
              <a href={product.waLink} target="_blank" rel="noopener noreferrer" className="flex-shrink-0 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-pastelia-burgundy text-white sm:bg-pastelia-brown/5 sm:text-pastelia-burgundy hover:bg-pastelia-burgundy hover:text-white hover:scale-110 hover:shadow-lg hover:shadow-pastelia-burgundy/30 transition-all duration-300 group">
                <MessageCircle className="w-5 h-5 md:w-6 md:h-6 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      {lightbox}
    </section>
  );
}
