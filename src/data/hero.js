import { thumb } from '../lib/images';

// En pantallas de hasta ~1700 px reales de ancho el Hero usa las mismas copias livianas que las
// tarjetas (se descargan una sola vez); en pantallas más grandes, las originales para no perder nitidez.
// La regla debe coincidir con los <link rel="preload"> de index.html.
const useOriginals = typeof window !== 'undefined' && window.innerWidth * (window.devicePixelRatio || 1) > 1700;
const heroSrc = (src) => (useOriginals ? src : thumb(src, 800));

// El carrusel del Hero muestra solo las 3 tortas (la primera es la que se precarga)
const originalHeroImages = [
  { src: '/images/carrot-cake.webp', alt: 'Carrot Cake: torta de zanahoria con frosting de queso crema' },
  { src: '/images/torta-de-chocolate.webp', alt: 'Torta de chocolate con virutas de chocolate' },
  { src: '/images/choco-berry.webp', alt: 'Torta Choco Berry con fresas y arándanos' },
];

export const heroImages = originalHeroImages.map((img) => ({ ...img, src: heroSrc(img.src) }));

// Fotos de la marquesina "Únete a nuestra dulce comunidad"
export const communityImages = [
  '/images/instagram-1.webp',
  '/images/instagram-2.webp',
  '/images/torta-de-chocolate.webp',
  '/images/carrot-cake.webp',
  '/images/choco-berry.webp',
  '/images/vanilla-roll.webp',
  '/images/queque-de-chocolate.webp',
  '/images/tres-delicias.webp',
];
