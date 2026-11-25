import { Fragment } from 'react';
import { motion, useReducedMotion } from 'motion/react';

// Entrada "premium" para los títulos de sección: cada palabra sube desde detrás de una línea
// invisible (máscara), una tras otra, y al final se dibuja una línea fina debajo (del color del título).
// Los lectores de pantalla leen el título completo.
const EASE = [0.22, 1, 0.36, 1];

export function RevealTitle({ children, className = '', as = 'h2', delay = 0, line = true }) {
  const reduceMotion = useReducedMotion();
  const Tag = motion[as];
  const text = String(children).replace(/\s+/g, ' ').trim();
  const words = text.split(' ');

  const wordVariants = reduceMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.6 } } }
    : { hidden: { y: '115%' }, visible: { y: 0, transition: { duration: 0.85, ease: EASE } } };

  // La línea se dibuja desde el centro cuando las palabras ya casi llegaron
  const lineVariants = reduceMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 0.6, transition: { duration: 0.6 } } }
    : { hidden: { scaleX: 0 }, visible: { scaleX: 1, transition: { duration: 0.7, ease: EASE, delay: 0.3 } } };

  return (
    <Tag
      className={`relative ${className}`}
      aria-label={text}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.6 }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: delay } } }}
    >
      {words.map((word, i) => (
        <Fragment key={i}>
          {/* El relleno vertical (con margen negativo que lo compensa) evita recortar tildes y colas de letras */}
          <span aria-hidden="true" className="inline-block overflow-hidden align-top py-[0.12em] -my-[0.12em]">
            <motion.span className="inline-block will-change-transform" variants={wordVariants}>
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 && ' '}
        </Fragment>
      ))}
      {/* Posicionada en el hueco bajo el título (no ocupa espacio, así no mueve nada de la página) */}
      {line && (
        <motion.span
          aria-hidden="true"
          className="absolute left-1/2 top-full -ml-7 mt-[0.13em] block h-[2px] w-14 origin-center rounded-full bg-current opacity-60"
          variants={lineVariants}
        />
      )}
    </Tag>
  );
}

// Aparición suave de lo que acompaña al título (subtítulo o etiqueta), un momento después
export function RevealLead({ children, className = '', as = 'p', delay = 0.45 }) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </Tag>
  );
}
