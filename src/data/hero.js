import { thumb } from '../lib/images';

// En pantallas de hasta ~1700 px reales de ancho el Hero usa las mismas copias livianas que las
// tarjetas (se descargan una sola vez); en pantallas más grandes, las originales para no perder nitidez.
// La regla debe coincidir con los <link rel="preload"> de index.html.
const useOriginals = typeof window !== 'undefined' && window.innerWidth * (window.devicePixelRatio || 1) > 1700;
const heroSrc = (src) => (useOriginals ? src : thumb(src, 800));

const originalHeroImages = [
  { src: '/images/carrot-cake.webp', alt: 'Torta de Zanahoria artesanal con frosting' },
  { src: '/images/torta-de-chocolate.webp', alt: 'Torta de chocolate decorada con fresas' },
  { src: '/images/instagram-1.webp', alt: 'Detalle de postre Pastelia Bakery' },
  { src: '/images/choco-berry.webp', alt: 'Torta Choco Berry con frutos rojos' },
  { src: '/images/tres-delicias.webp', alt: 'Postre Tres Delicias especial' },
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
