import { motion } from 'motion/react';

// Entrada de las tarjetas de producto, con la misma curva que los títulos de sección.
// La tarjeta sube suave y, mientras se asienta, su contenido cae en cascada:
// cada hijo con `variants={itemVariants}` aparece uno tras otro (nombre, precio, descripción, botón).
// Solo usa opacidad y movimiento, así que no altera la disposición de la página.
const EASE = [0.22, 1, 0.36, 1];

export const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

// `index` escalona las tarjetas de una misma fila o lista; `rise` es cuánto suben al aparecer
export function RevealCard({ children, className = '', id, index = 0, rise = 28 }) {
  return (
    <motion.div
      id={id}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: { opacity: 0, y: rise, scale: 0.985 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            duration: 0.9,
            ease: EASE,
            delay: index * 0.1,
            delayChildren: index * 0.1 + 0.18,
            staggerChildren: 0.09,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
