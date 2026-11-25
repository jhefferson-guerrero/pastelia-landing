import { useRef, useState } from 'react';
import { CakeSlice } from 'lucide-react';
import { thumb } from '../../lib/images';

// Foto de un producto: ampliable al hacer clic, con tinte al pasar el cursor y un ícono de
// reemplazo si no hay foto o falla la carga. Debe vivir dentro de un contenedor con la clase `group`.
// Muestra una copia liviana; la original se reserva para el visor y se precarga al acercarse.
// Si falta la copia liviana (por ejemplo, una foto nueva sin generarla), se usa la original.
//   product    → { name, image }
//   onZoom     → recibe { src, thumb, alt } al hacer clic (normalmente el setter de useLightbox)
//   className  → tamaño, forma y fondo del recuadro
//   iconClass  → tamaño del ícono de reemplazo
//   thumbWidth → ancho de la copia liviana (480, 640 u 800), según el tamaño con que se muestra
export default function ProductImage({ product, onZoom, className = '', iconClass = 'w-10 h-10', thumbWidth = 800 }) {
  // 0: copia liviana · 1: foto original · 2: sin foto (se muestra el ícono)
  const [stage, setStage] = useState(0);
  const warmed = useRef(false);
  const hasImage = !!product.image && stage < 2;
  const lightCopy = thumb(product.image, thumbWidth);
  const small = stage === 0 ? lightCopy : product.image;

  // Baja la original en segundo plano cuando el cursor se acerca, para que el visor abra al instante
  const warmOriginal = () => {
    if (warmed.current || !hasImage || navigator.connection?.saveData) return;
    warmed.current = true;
    new Image().src = product.image;
  };

  return (
    <div
      className={`relative overflow-hidden group/img ${hasImage ? 'cursor-zoom-in' : ''} ${className}`}
      onClick={() => hasImage && onZoom({ src: product.image, thumb: small, alt: product.name })}
      onPointerEnter={warmOriginal}
      onFocus={warmOriginal}
    >
      {hasImage ? (
        <img
          src={small}
          alt={product.name}
          onError={() => setStage((s) => (s === 0 && lightCopy !== product.image ? 1 : 2))}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/img:scale-[1.03]"
          loading="lazy"
          decoding="async"
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
