import { useState } from 'react';
import { motion } from 'motion/react';
import { MessageCircle, CakeSlice, ArrowLeft } from 'lucide-react';
import { catalog } from '../data/products';
import { Link } from 'react-router-dom';
import Lightbox from '../components/ui/Lightbox';
import { OrganicBlob } from '../components/ui/Decorations';

export default function Catalogo() {
  // Combinar productos o reciclar algunos para simular "Cuchareables" u otros más
  const allProducts = [
    ...catalog.tortas,
    ...catalog.queques,
    ...catalog.clasicos,
    // Productos reciclados como placeholders
    {
      ...catalog.clasicos[0],
      id: "placeholder-1",
      name: "Cuchareable de Chocolate (Próximamente)",
    },
    {
      ...catalog.clasicos[1],
      id: "placeholder-2",
      name: "Cuchareable de Fresa (Próximamente)",
    },
    {
      ...catalog.clasicos[2],
      id: "placeholder-3",
      name: "Cuchareable de Vainilla (Próximamente)",
    }
  ];

  const [imgError, setImgError] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImgError = (id) => {
    setImgError(prev => ({ ...prev, [id]: true }));
  };

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 bg-pastelia-cream relative overflow-hidden">
      <OrganicBlob className="bg-pastelia-burgundy/5 w-[35rem] h-[35rem] top-0 -left-20 mix-blend-multiply" delay={0.5} />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        <Link to="/" className="inline-flex items-center text-pastelia-burgundy font-medium hover:underline mb-8 transition-colors">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Volver al inicio
        </Link>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <h1 className="font-serif text-5xl md:text-6xl font-bold tracking-tight text-pastelia-brown mb-6">
            Todos Nuestros Productos
          </h1>
          <p className="text-pastelia-brown/70 text-lg md:text-xl font-serif max-w-2xl mx-auto">
            Descubre nuestra variedad completa, incluyendo tortas, queques, clásicos y nuestros nuevos cuchareables.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {allProducts.map((product, idx) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (idx % 4) * 0.1 }}
              className="group flex flex-col bg-white p-5 rounded-[2rem] shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div 
                className="relative aspect-square w-full overflow-hidden rounded-[1.5rem] bg-pastelia-cream mb-4 cursor-zoom-in"
                onClick={() => !imgError[product.id] && setSelectedImage({ src: product.image, alt: product.name })}
              >
                {!imgError[product.id] ? (
                  <img 
                    src={product.image} alt={product.name} 
                    onError={() => handleImgError(product.id)}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center w-full h-full text-pastelia-brown/30"><CakeSlice className="w-8 h-8 mb-2 opacity-30" /></div>
                )}
              </div>
              <div className="flex flex-col flex-1 px-2 pb-2">
                <h3 className="font-serif italic text-xl text-pastelia-burgundy mb-2">{product.name}</h3>
                <p className="text-pastelia-brown/60 text-sm leading-relaxed mb-4 font-light flex-1">{product.description}</p>
                <div className="mt-auto flex items-center justify-between">
                  <span className="font-sans font-medium text-lg text-pastelia-brown">{product.price}</span>
                  <a href={product.waLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-10 h-10 rounded-full bg-pastelia-burgundy text-white hover:scale-110 transition-transform">
                    <MessageCircle className="w-5 h-5" />
                  </a>
                </div>
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
    </div>
  );
}
