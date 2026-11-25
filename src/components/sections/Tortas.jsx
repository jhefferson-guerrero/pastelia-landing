import { motion } from 'motion/react';
import { OrganicBlob } from '../ui/Decorations';
import { catalog } from '../../data/products';
import { MessageCircle } from 'lucide-react';
import { useLightbox } from '../ui/Lightbox';
import ProductImage from '../ui/ProductImage';
import { RevealTitle, RevealLead } from '../ui/RevealTitle';
import { RevealCard, itemVariants } from '../ui/RevealCard';

export default function Tortas() {
  const tortas = catalog.tortas;
  const [openImage, lightbox] = useLightbox();

  return (
    <section id="tortas" data-scroll-start="#tortas-titulo" data-scroll-end="#tortas-primera" className="relative w-full border-t border-pastelia-brown/5 overflow-hidden py-24 fit-section-py scroll-mt-10 md:scroll-mt-5">
      <div className="max-w-6xl 2xl:max-w-7xl [@media(max-height:720px)]:max-w-4xl [@media(max-height:720px)]:2xl:max-w-4xl mx-auto px-6 relative w-full h-full">
        <OrganicBlob className="bg-pastelia-burgundy/5 w-[30rem] h-[30rem] top-10 md:top-[60px] right-0" />
      
      <div id="tortas-titulo" className="relative z-10 mb-16 fit-gap-sm text-center max-w-3xl mx-auto flex flex-col items-center">
        <RevealTitle className="font-serif text-[2.75rem] fit-title font-bold tracking-tight text-pastelia-burgundy mb-6">Nuestras Tortas</RevealTitle>
        <RevealLead className="text-pastelia-brown/70 text-lg fit-lead font-serif tracking-wide">
          Arte en cada capa. Bizcochos húmedos, rellenos artesanales abundantes y un diseño cuidado al detalle, pensado para deslumbrar en el centro de tu mesa.
        </RevealLead>
      </div>

      <div className="relative z-10 flex flex-col gap-10 lg:gap-14 2xl:gap-20">
        
        {tortas.map((product, idx) => {
          const isReverse = idx % 2 !== 0;
          return (
            <RevealCard
              key={product.id}
              id={idx === 0 ? 'tortas-primera' : undefined}
              rise={40}
              className="group block bg-white/40 border border-pastelia-brown/5 rounded-[28px] md:rounded-[2.5rem] p-5 fit-torta-card shadow-sm hover:shadow-md transition-shadow duration-500 ease-out"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 lg:gap-10 items-center">
                
                {/* Bloque de Imagen */}
                <ProductImage
                  product={product}
                  onZoom={openImage}
                  iconClass="w-12 h-12"
                  className={`lg:col-span-6 aspect-square md:aspect-[4/3] w-full max-h-[55vh] fit-torta-img rounded-[1.75rem] md:rounded-[2rem] bg-pastelia-cream/50 order-1 ${isReverse ? 'lg:order-2' : 'lg:order-1'}`}
                />

                {/* Bloque de Texto */}
                <div className={`lg:col-span-6 flex flex-col order-2 ${isReverse ? 'lg:order-1 lg:pr-6 2xl:pr-10 [@media(max-height:720px)]:lg:pl-6' : 'lg:order-2 lg:pl-6 2xl:pl-10'}`}>
                  <motion.h3 variants={itemVariants} className="font-serif italic text-3xl md:text-4xl fit-torta-h3 text-pastelia-burgundy mb-3 md:mb-4">{product.name}</motion.h3>
                  <motion.span variants={itemVariants} className="font-sans font-medium text-xl md:text-2xl fit-torta-price text-pastelia-brown mb-4 md:mb-6">{product.price}</motion.span>
                  <motion.p variants={itemVariants} className="text-pastelia-brown/60 text-base md:text-lg fit-torta-desc leading-relaxed mb-6 md:mb-8 font-light">{product.description}</motion.p>
                  <motion.a variants={itemVariants} href={product.waLink} target="_blank" rel="noopener noreferrer" className="group/btn relative inline-flex items-center text-sm font-bold uppercase tracking-[0.2em] text-pastelia-burgundy hover:text-pastelia-brown transition-colors w-fit pb-1">
                    <MessageCircle className="w-5 h-5 md:w-6 md:h-6 mr-3 transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:scale-110" /> 
                    <span className="relative">
                      Pedir por WhatsApp
                      <span className="absolute -bottom-2 left-0 w-0 h-[1.5px] bg-pastelia-brown transition-all duration-300 ease-out group-hover/btn:w-full"></span>
                    </span>
                  </motion.a>
                </div>

              </div>
            </RevealCard>
          );
        })}

      </div>

      </div>

      {lightbox}
    </section>
  );
}
