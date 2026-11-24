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

// Aire entre el borde de la pantalla (o el menú) y el bloque que se quiere mostrar
const FIT_PADDING = 24;

// Posición del elemento respecto al documento. Usa offsetTop, que no cambia con las
// animaciones de entrada (transform), a diferencia de getBoundingClientRect.
function documentTop(el) {
  let y = 0;
  for (let node = el; node; node = node.offsetParent) y += node.offsetTop;
  return y;
}

// Una sección puede declarar qué bloque debe verse entero al llegar a ella:
//   data-scroll-start="#id" → desde dónde (normalmente el título)
//   data-scroll-end="#id"   → hasta dónde (normalmente la primera tarjeta)
// Si el bloque cabe en la pantalla, se muestra completo y centrado entre el menú y el borde
// inferior (con el mismo aire arriba y abajo). Si no cabe
// (pantalla baja), se prioriza ver el final entero y se recorta lo de arriba (el título).
function fitTop(section) {
  const start = section.dataset.scrollStart && document.querySelector(section.dataset.scrollStart);
  const end = section.dataset.scrollEnd && document.querySelector(section.dataset.scrollEnd);
  if (!start || !end) return null;

  const navHeight = document.querySelector('header')?.offsetHeight || 0;
  const startTop = documentTop(start);
  const endTop = documentTop(end);
  const endBottom = endTop + end.offsetHeight;
  const viewport = window.innerHeight;

  const free = viewport - navHeight - (endBottom - startTop); // espacio sobrante en pantalla
  if (free >= FIT_PADDING * 2) {
    const centered = startTop - navHeight - free / 2;
    // No dejar ver el final de la sección anterior (otro color de fondo) por encima de esta,
    // siempre que el título siga visible
    const sectionStart = documentTop(section) - navHeight;
    return Math.min(Math.max(centered, sectionStart), startTop - navHeight - FIT_PADDING);
  }
  // El final queda pegado abajo; si ni así cabe, al menos su parte superior queda bajo el menú
  return Math.min(endBottom - viewport + FIT_PADDING, endTop - navHeight - FIT_PADDING);
}

export function scrollToSection(id, options) {
  const el = document.getElementById(id);
  if (!el) return false;
  // Respeta el scroll-margin-top de cada sección, igual que el salto nativo de las anclas
  const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
  const top = fitTop(el) ?? el.getBoundingClientRect().top + window.scrollY - margin;
  scrollTarget(Math.max(0, top), options);
  return true;
}

export function scrollToTop(options) {
  scrollTarget(0, options);
}

// Bloquea el scroll de la página mientras hay un visor de imagen abierto
export function lockScroll() {
  lenisInstance?.stop();
}

export function unlockScroll() {
  lenisInstance?.start();
}
