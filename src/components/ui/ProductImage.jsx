import { useState } from 'react';
import { CakeSlice } from 'lucide-react';

// Foto de un producto: ampliable al hacer clic, con tinte al pasar el cursor y un ícono de
// reemplazo si no hay foto o falla la carga. Debe vivir dentro de un contenedor con la clase `group`.
//   product   → { name, image }
//   onZoom    → recibe { src, alt } al hacer clic (normalmente el setter de useLightbox)
//   className → tamaño, forma y fondo del recuadro
//   iconClass → tamaño del ícono de reemplazo
export default function ProductImage({ product, onZoom, className = '', iconClass = 'w-10 h-10' }) {
  const [failed, setFailed] = useState(false);
  const hasImage = !!product.image && !failed;

  return (
    <div
      className={`relative overflow-hidden group/img ${hasImage ? 'cursor-zoom-in' : ''} ${className}`}
      onClick={() => hasImage && onZoom({ src: product.image, alt: product.name })}
    >
      {hasImage ? (
        <img
          src={product.image}
          alt={product.name}
          onError={() => setFailed(true)}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/img:scale-[1.03]"
          loading="lazy"
        />
      ) : (
        <div className="flex items-center justify-center w-full h-full text-pastelia-brown/30">
          <CakeSlice className={`${iconClass} opacity-30`} />
        </div>
      )}
      {/* Tinte sutil al pasar el cursor */}
      <div className="absolute inset-0 bg-pastelia-burgundy/0 group-hover:bg-pastelia-burgundy/5 transition-colors duration-500 pointer-events-none"></div>
    </div>
  );
}
