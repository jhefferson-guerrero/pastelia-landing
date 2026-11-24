import { motion } from 'motion/react';
import { catalog } from '../../data/products';
import { MessageCircle } from 'lucide-react';
import { useLightbox } from '../ui/Lightbox';
import ProductImage from '../ui/ProductImage';

export default function Cuchareables() {
  const cuchareables = catalog.cuchareables;
  const [openImage, lightbox] = useLightbox();

  return (
    <section id="cuchareables" data-scroll-start="#cuchareables-titulo" data-scroll-end="#cuchareables-primera" className="relative py-24 scroll-mt-10 md:scroll-mt-5 fit-section-py px-6 bg-pastelia-burgundy overflow-hidden">

      {/* Capas Decorativas */}
      <div className="absolute inset-0 bg-cherry-pattern opacity-10 pointer-events-none mix-blend-overlay"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
      <motion.div
        id="cuchareables-titulo"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
        className="relative z-10 mb-16 fit-gap-lg text-center max-w-xl mx-auto flex flex-col items-center"
      >
        <span className="text-pastelia-cream/70 font-sans uppercase tracking-widest text-sm font-semibold mb-2">Nuevo Lanzamiento</span>
        <h2 className="font-serif text-[2.75rem] fit-title font-bold tracking-tight text-pastelia-cream mb-6">
          Cuchareables
        </h2>
        <p className="text-pastelia-cream/80 text-lg fit-lead font-serif tracking-wide">
          Capas de puro sabor en su formato más indulgente. Perfectos para disfrutar a tu propio ritmo.
        </p>
      </motion.div>

      <div className="relative z-10 flex flex-col gap-6 fit-list-gap max-w-4xl [@media(max-height:720px)]:max-w-2xl mx-auto">
        {cuchareables.map((product, idx) => (
          <motion.div 
            key={product.id}
            id={idx === 0 ? 'cuchareables-primera' : undefined}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="group flex flex-col sm:flex-row items-start sm:items-center p-6 md:px-7 fit-row-card rounded-[28px] bg-pastelia-cream border border-pastelia-cream shadow-lg hover:shadow-2xl transition-shadow duration-500 ease-out"
          >
            <ProductImage
              product={product}
              onZoom={openImage}
              className="w-full sm:w-56 md:w-64 fit-row-img aspect-[4/3] sm:aspect-square flex-shrink-0 rounded-[2rem] bg-white mb-6 sm:mb-0 sm:mr-8"
            />
            
            <div className="flex flex-col justify-center max-w-lg sm:pr-6 md:pr-10">
              <h3 className="font-serif italic text-2xl md:text-3xl fit-row-h3 text-pastelia-brown mb-2">{product.name}</h3>
              <p className="text-pastelia-brown/60 text-base md:text-base fit-row-desc leading-relaxed mb-4 sm:mb-0 font-light">
                {product.description}
              </p>
            </div>

            <div className="sm:ml-auto flex flex-row sm:flex-col justify-between sm:justify-center items-center w-full sm:w-auto gap-3 mt-4 sm:mt-0 border-t sm:border-t-0 border-pastelia-brown/10 pt-5 sm:pt-0">
              <span className="font-sans font-medium text-lg md:text-xl fit-row-price text-pastelia-burgundy whitespace-nowrap">{product.price}</span>
              <a href={product.waLink} target="_blank" rel="noopener noreferrer" className="flex-shrink-0 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-pastelia-burgundy text-white hover:bg-pastelia-brown hover:text-white transition-colors shadow-sm">
                <MessageCircle className="w-5 h-5 md:w-6 md:h-6" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
      </div>

      {lightbox}
    </section>
  );
}
