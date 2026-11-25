// Las fotos originales (/images/foo.webp) son grandes y se reservan para el visor al ampliar.
// En tarjetas y galerías se usa una copia liviana de /images/thumbs, generada a un ancho fijo
// (480, 640 u 800 px) según el tamaño con que se muestra cada foto.
export function thumb(src, width = 800) {
  if (!src || !src.startsWith('/images/')) return src;
  return src.replace('/images/', '/images/thumbs/').replace(/\.webp$/, `-${width}.webp`);
}
