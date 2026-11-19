// Scroll suave compartido: lo usa el menú para ir a las secciones con la misma inercia de Lenis.
let lenisInstance = null;

export function setLenis(instance) {
  lenisInstance = instance;
}

// Frenado gradual al llegar (ease-out cuártico)
const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Duración proporcional a la distancia: los saltos largos no se sienten bruscos ni los cortos lentos
const durationFor = (distance) => Math.min(2.2, Math.max(0.9, Math.abs(distance) / 2500));

function scrollTarget(top, { immediate = false } = {}) {
  const distance = top - window.scrollY;
  if (lenisInstance) {
    // Tras cambiar de página Lenis puede conservar el largo de la anterior y recortar el destino
    lenisInstance.resize();
    lenisInstance.scrollTo(top, {
      duration: durationFor(distance),
      easing: easeOutQuart,
      immediate: immediate || prefersReducedMotion(),
    });
  } else {
    window.scrollTo({ top, behavior: immediate || prefersReducedMotion() ? 'auto' : 'smooth' });
  }
}

export function scrollToSection(id, options) {
  const el = document.getElementById(id);
  if (!el) return false;
  // Respeta el scroll-margin-top de cada sección, igual que el salto nativo de las anclas
  const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
  const top = el.getBoundingClientRect().top + window.scrollY - margin;
  scrollTarget(Math.max(0, top), options);
  return true;
}

export function scrollToTop(options) {
  scrollTarget(0, options);
}
