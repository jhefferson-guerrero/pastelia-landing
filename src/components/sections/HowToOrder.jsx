import { motion } from 'motion/react';
import { CakeSlice, MessageCircle, Gift } from 'lucide-react';

const steps = [
  {
    icon: <CakeSlice className="w-8 h-8 md:w-10 md:h-10 text-pastelia-burgundy transition-transform duration-500 group-hover:scale-110" strokeWidth={1.5} />,
    title: "1. Elige tu postre",
    description: "Explora nuestra carta y selecciona la torta o queque que más te provoque."
  },
  {
    icon: <MessageCircle className="w-8 h-8 md:w-10 md:h-10 text-pastelia-burgundy transition-transform duration-500 group-hover:scale-110" strokeWidth={1.5} />,
    title: "2. Escríbenos",
    description: "Haz clic en 'Pedir por WhatsApp' y dinos para qué fecha lo necesitas."
  },
  {
    icon: <Gift className="w-8 h-8 md:w-10 md:h-10 text-pastelia-burgundy transition-transform duration-500 group-hover:scale-110" strokeWidth={1.5} />,
    title: "3. Disfruta",
    description: "Nosotros horneamos la magia. Recíbelo por delivery o recógelo en el taller."
  }
];

export default function HowToOrder() {
  return (
    <section className="py-24 md:py-32 px-6 bg-pastelia-cream overflow-hidden border-t border-pastelia-brown/5 relative z-10">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-24"
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-pastelia-burgundy mb-4">
            Cómo hacer tu pedido
          </h2>
          <p className="text-pastelia-brown/70 text-lg font-light max-w-xl mx-auto">
            Un proceso tan simple como disfrutar de nuestras recetas.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 relative">
          {/* Línea conectora (solo visible en escritorio) */}
          <div className="hidden md:block absolute top-[48px] md:top-[60px] left-[15%] right-[15%] h-[1px] bg-pastelia-burgundy/20 z-0"></div>

          {steps.map((step, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="relative z-10 flex flex-col items-center text-center group"
            >
              <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-full flex items-center justify-center mb-8 shadow-md shadow-pastelia-brown/5 border border-pastelia-burgundy/10 group-hover:-translate-y-2 group-hover:shadow-xl group-hover:shadow-pastelia-brown/10 transition-all duration-500 ease-out">
                {step.icon}
              </div>
              <h3 className="font-serif italic text-2xl md:text-3xl text-pastelia-burgundy mb-4">
                {step.title}
              </h3>
              <p className="text-pastelia-brown/70 font-light leading-relaxed max-w-[280px]">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
