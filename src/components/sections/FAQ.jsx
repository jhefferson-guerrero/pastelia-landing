import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { RevealTitle, RevealLead } from '../ui/RevealTitle';
import { RevealCard, itemVariants } from '../ui/RevealCard';

const faqs = [
  {
    question: '¿Con cuánto tiempo de anticipación debo hacer mi pedido?',
    answer: 'Para tortas y pedidos clásicos solicitamos un mínimo de 48 horas de anticipación. Si deseas un diseño personalizado o para un evento especial, te recomendamos escribirnos con 2 a 5 días de antelación.'
  },
  {
    question: '¿Tienen servicio de delivery?',
    answer: '¡Sí! Realizamos envíos a varios distritos de Lima. El costo del delivery se calcula según tu ubicación (puedes consultarlo por WhatsApp). También tienes la opción de recoger tu pedido directamente en nuestro taller.'
  },
  {
    question: '¿Cuáles son los métodos de pago?',
    answer: 'Para confirmar tu pedido solicitamos el 50% de adelanto mediante Yape, Plin o transferencia bancaria. El saldo restante se cancela tranquilamente al momento de la entrega o recojo.'
  },
  {
    question: '¿Cómo debo conservar mi postre?',
    answer: 'Para disfrutar de la mejor textura y sabor, te sugerimos mantener las tortas refrigeradas y retirarlas a temperatura ambiente unos 30 minutos antes de consumirlas.'
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0); // El primero abierto por defecto

  return (
    <section id="faq" className="py-24 md:py-32 px-6 max-w-4xl mx-auto border-t border-pastelia-brown/5 relative z-10">
      <div className="text-center mb-12 md:mb-16">
        <RevealTitle className="font-serif font-semibold text-4xl md:text-4xl 2xl:text-5xl text-pastelia-burgundy mb-4">Preguntas Frecuentes</RevealTitle>
        <RevealLead className="text-pastelia-brown/70 max-w-xl mx-auto text-lg">
          Resolvemos tus principales dudas para que tu experiencia de compra sea lo más dulce posible.
        </RevealLead>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <RevealCard
              key={index}
              index={index}
              rise={24}
              className={`border border-pastelia-brown/10 rounded-[1.5rem] overflow-hidden transition-[background-color,box-shadow] duration-300 ${isOpen ? 'bg-white/60 shadow-md shadow-pastelia-brown/5' : 'bg-transparent hover:bg-white/30'}`}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full flex items-center justify-between p-6 md:p-8 text-left focus:outline-none group"
                aria-expanded={isOpen}
              >
                <motion.span variants={itemVariants} className="font-serif text-lg md:text-xl text-pastelia-brown font-semibold pr-8">
                  {faq.question}
                </motion.span>
                {/* El contenedor recibe la cascada de entrada; la circulita interior gira al abrir */}
                <motion.div variants={itemVariants} className="flex-shrink-0">
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
                    className={`p-2 rounded-full transition-all duration-300 group-hover:translate-y-1 ${isOpen ? 'bg-pastelia-burgundy text-pastelia-cream' : 'text-pastelia-burgundy bg-pastelia-burgundy/5 group-hover:bg-pastelia-burgundy/10'}`}
                  >
                    <ChevronDown className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2.5} />
                  </motion.div>
                </motion.div>
              </button>
              
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {/* El texto se aclara y sube un poco una vez que el espacio ya empezó a abrirse */}
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] } }}
                      exit={{ opacity: 0, transition: { duration: 0.15 } }}
                      className="px-6 md:px-8 pb-6 md:pb-8 pt-0 text-pastelia-brown/70 leading-relaxed font-light"
                    >
                      {faq.answer}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </RevealCard>
          );
        })}
      </div>
    </section>
  );
}
