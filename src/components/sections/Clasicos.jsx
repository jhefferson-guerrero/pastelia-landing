import { motion } from 'motion/react';
import { OrganicBlob } from '../ui/Decorations';
import { catalog } from '../../data/products';
import { MessageCircle } from 'lucide-react';
import { useLightbox } from '../ui/Lightbox';
import ProductImage from '../ui/ProductImage';
import { RevealTitle, RevealLead } from '../ui/RevealTitle';

export default function Clasicos() {
  const clasicos = catalog.clasicos;
  const [openImage, lightbox] = useLightbox();

  return (
    <section id="clasicos" data-scroll-start="#clasicos-titulo" data-scroll-end="#clasicos-primera" className="relative py-24 scroll-mt-10 md:scroll-mt-5 fit-section-py px-6 bg-pastelia-burgundy overflow-hidden">
      
      {/* Capas Decorativas */}
      <div className="absolute inset-0 bg-cherry-pattern opacity-10 pointer-events-none mix-blend-overlay"></div>
      <OrganicBlob className="bg-pastelia-white/5 w-[35rem] h-[35rem] top-1/4 -right-10 mix-blend-overlay" />
      
      <div className="relative z-10 max-w-7xl [@media(max-height:720px)]:max-w-5xl mx-auto">
        <div id="clasicos-titulo" className="mb-16 fit-gap-sm text-center">
          <RevealTitle className="font-serif text-[2.75rem] fit-title font-bold tracking-tight text-pastelia-cream mb-6">Clásicos de Pastelia</RevealTitle>
          <RevealLead className="text-pastelia-cream/80 text-lg fit-lead font-serif max-w-2xl mx-auto tracking-wide">
            Recetas originales que definen la esencia de Pastelia. Perfectas en su simpleza.
          </RevealLead>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {clasicos.map((product, idx) => (
            <motion.div 
              key={product.id}
              id={idx === 0 ? 'clasicos-primera' : undefined}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group flex flex-col bg-pastelia-cream p-5 fit-clasico-card rounded-[3rem] shadow-lg hover:shadow-2xl transition-shadow duration-500 ease-out"
            >
              <ProductImage
                product={product}
                onZoom={openImage}
                thumbWidth={640}
                iconClass="w-10 h-10"
                className="aspect-square w-full fit-clasico-img rounded-[2.5rem] bg-pastelia-white mb-6"
              />
              <div className="flex flex-col flex-1 px-4 pb-4 md:pb-2">
                <div className="flex items-center justify-between mb-4 md:mb-2">
                  <h3 className="font-serif italic text-3xl fit-clasico-h3 text-pastelia-burgundy">{product.name}</h3>
                </div>
                <p className="text-pastelia-brown/60 text-base fit-clasico-desc leading-relaxed mb-6 font-light">{product.description}</p>
                <div className="mt-auto flex items-center justify-between">
                  <span className="font-sans font-medium text-xl fit-clasico-price text-pastelia-brown">{product.price}</span>
                  <a href={product.waLink} target="_blank" rel="noopener noreferrer" className="group/wa flex items-center justify-center w-10 h-10 fit-clasico-btn rounded-full bg-pastelia-burgundy text-white hover:scale-110 hover:shadow-lg transition-all duration-300">
                    <MessageCircle className="w-5 h-5 md:w-6 md:h-6 transition-transform duration-300 group-hover/wa:rotate-12 group-hover/wa:scale-110" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {lightbox}
    </section>
  );
}
