import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: '¿Con cuánto tiempo de anticipación debo hacer mi pedido?',
    answer: 'Para tortas y pedidos clásicos solicitamos un mínimo de 48 horas de anticipación. Si deseas un diseño personalizado o para un evento especial, te recomendamos escribirnos con 1 o 2 semanas de antelación.'
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
    question: '¿Tienen opciones sin gluten o veganas?',
    answer: 'Actualmente nuestro menú se centra en recetas artesanales tradicionales con insumos clásicos. Estamos perfeccionando algunas opciones especiales, ¡te invitamos a seguirnos en nuestras redes para enterarte cuando las lancemos!'
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0); // El primero abierto por defecto

  return (
    <section id="faq" className="py-24 md:py-32 px-6 max-w-4xl mx-auto border-t border-pastelia-brown/5 relative z-10">
      <div className="text-center mb-12 md:mb-16">
        <h2 className="font-serif text-4xl md:text-5xl text-pastelia-burgundy mb-4">
          Preguntas Frecuentes
        </h2>
        <p className="text-pastelia-brown/70 max-w-xl mx-auto text-lg">
          Resolvemos tus principales dudas para que tu experiencia de compra sea lo más dulce posible.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div 
              key={index} 
              className={`border border-pastelia-brown/10 rounded-[1.5rem] overflow-hidden transition-all duration-300 ${isOpen ? 'bg-white/60 shadow-md shadow-pastelia-brown/5' : 'bg-transparent hover:bg-white/30'}`}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full flex items-center justify-between p-6 md:p-8 text-left focus:outline-none"
                aria-expanded={isOpen}
              >
                <span className="font-serif text-lg md:text-xl text-pastelia-brown font-medium pr-8">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
                  className="flex-shrink-0 text-pastelia-burgundy bg-pastelia-burgundy/5 p-2 rounded-full"
                >
                  <ChevronDown className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2.5} />
                </motion.div>
              </button>
              
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
                  >
                    <div className="px-6 md:px-8 pb-6 md:pb-8 pt-0 text-pastelia-brown/70 leading-relaxed font-light">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
