import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Minus } from 'lucide-react';
import { lockScroll, unlockScroll } from '../../lib/smoothScroll';

const MIN_SCALE = 1;
const MAX_SCALE = 4;
const DOUBLE_TAP_MS = 300;
const DRAG_THRESHOLD = 5;

const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
const RESET = { s: 1, x: 0, y: 0 };

export default function Lightbox({ imageSrc, imageAlt, isOpen, onClose }) {
  const [view, setView] = useState(RESET);
  const [interacting, setInteracting] = useState(false);

  const overlayRef = useRef(null);
  const imgRef = useRef(null);
  const viewRef = useRef(RESET);
  const pointers = useRef(new Map());
  const gesture = useRef({ moved: false, lastTap: 0, pinchDist: 0 });
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  const apply = useCallback((next) => {
    viewRef.current = next;
    setView(next);
  }, []);

  // Mantiene la imagen dentro de sus bordes originales al acercar y mover
  const bound = useCallback((s, x, y) => {
    if (s <= MIN_SCALE) return RESET;
    const img = imgRef.current;
    const w = img ? img.offsetWidth : 0;
    const h = img ? img.offsetHeight : 0;
    const maxX = (w * (s - 1)) / 2;
    const maxY = (h * (s - 1)) / 2;
    return { s, x: clamp(x, -maxX, maxX), y: clamp(y, -maxY, maxY) };
  }, []);

  // Acerca/aleja manteniendo fijo el punto (cx, cy), medido desde el centro de la pantalla
  const zoomAt = useCallback((nextScale, cx, cy) => {
    const { s, x, y } = viewRef.current;
    const ns = clamp(nextScale, MIN_SCALE, MAX_SCALE);
    const k = ns / s;
    apply(bound(ns, cx - (cx - x) * k, cy - (cy - y) * k));
  }, [apply, bound]);

  const centerOf = (clientX, clientY) => {
    const r = overlayRef.current.getBoundingClientRect();
    return { cx: clientX - (r.left + r.width / 2), cy: clientY - (r.top + r.height / 2) };
  };

  const zoomFromButton = (factor) => {
    setInteracting(false);
    zoomAt(viewRef.current.s * factor, 0, 0);
  };

  // Al abrir: bloquear el scroll de la página, rueda para acercar y teclado
  useEffect(() => {
    if (!isOpen) return;
    apply(RESET);
    pointers.current.clear();
    lockScroll();

    const el = overlayRef.current;
    const onWheel = (e) => {
      e.preventDefault();
      setInteracting(false);
      const { cx, cy } = centerOf(e.clientX, e.clientY);
      // El pellizco del trackpad llega como rueda con ctrlKey y necesita más sensibilidad
      const speed = e.ctrlKey ? 0.01 : 0.0018;
      zoomAt(viewRef.current.s * Math.exp(-e.deltaY * speed), cx, cy);
    };
    const onKey = (e) => {
      if (e.key === 'Escape') onCloseRef.current();
      else if (e.key === '+' || e.key === '=') zoomAt(viewRef.current.s * 1.4, 0, 0);
      else if (e.key === '-') zoomAt(viewRef.current.s / 1.4, 0, 0);
      else if ([' ', 'ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End'].includes(e.key)) e.preventDefault();
    };

    el?.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onKey);
    return () => {
      el?.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKey);
      unlockScroll();
    };
  }, [isOpen, apply, zoomAt]);

  const onPointerDown = (e) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY, sx: e.clientX, sy: e.clientY });
    gesture.current.moved = false;
    if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      gesture.current.pinchDist = Math.hypot(a.x - b.x, a.y - b.y);
    }
    setInteracting(true);
  };

  const onPointerMove = (e) => {
    const p = pointers.current.get(e.pointerId);
    if (!p) return;
    const dx = e.clientX - p.x;
    const dy = e.clientY - p.y;
    p.x = e.clientX;
    p.y = e.clientY;
    if (Math.hypot(e.clientX - p.sx, e.clientY - p.sy) > DRAG_THRESHOLD) gesture.current.moved = true;

    if (pointers.current.size === 2) {
      // Pellizco con dos dedos
      const [a, b] = [...pointers.current.values()];
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      if (gesture.current.pinchDist) {
        const { cx, cy } = centerOf((a.x + b.x) / 2, (a.y + b.y) / 2);
        zoomAt(viewRef.current.s * (dist / gesture.current.pinchDist), cx, cy);
      }
      gesture.current.pinchDist = dist;
    } else if (viewRef.current.s > 1) {
      // Arrastrar para mover la imagen acercada
      const { s, x, y } = viewRef.current;
      apply(bound(s, x + dx, y + dy));
    }
  };

  const onPointerUp = (e) => {
    const wasTap = !gesture.current.moved && pointers.current.size === 1;
    pointers.current.delete(e.pointerId);
    gesture.current.pinchDist = 0;
    if (pointers.current.size === 0) setInteracting(false);

    if (wasTap) {
      // Doble toque / doble clic: alterna entre vista completa y acercada
      const now = Date.now();
      if (now - gesture.current.lastTap < DOUBLE_TAP_MS) {
        setInteracting(false);
        const { cx, cy } = centerOf(e.clientX, e.clientY);
        zoomAt(viewRef.current.s > 1.05 ? 1 : 2.5, cx, cy);
        gesture.current.lastTap = 0;
      } else {
        gesture.current.lastTap = now;
      }
    }
  };

  // Un arrastre que termina fuera de la imagen no debe cerrar el visor
  const onOverlayClick = () => {
    if (gesture.current.moved) {
      gesture.current.moved = false;
      return;
    }
    onClose();
  };

  const zoomed = view.s > 1.001;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={overlayRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onOverlayClick}
          data-lenis-prevent
          style={{ touchAction: 'none' }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10 bg-pastelia-cream/95 backdrop-blur-md cursor-zoom-out overflow-hidden"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="flex max-w-full"
          >
            <img
              ref={imgRef}
              src={imageSrc}
              alt={imageAlt}
              draggable={false}
              style={{
                transform: `translate(${view.x}px, ${view.y}px) scale(${view.s})`,
                transition: interacting ? 'none' : 'transform 160ms ease-out',
                cursor: zoomed ? (interacting ? 'grabbing' : 'grab') : 'zoom-in',
                touchAction: 'none',
              }}
              className="w-auto h-auto max-w-full max-h-[75vh] md:max-h-[85vh] object-contain rounded-[1rem] md:rounded-[2rem] shadow-2xl select-none"
              onClick={(e) => e.stopPropagation()}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
            />
          </motion.div>

          {/* Controles: alejar, cerrar, acercar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="absolute bottom-8 md:bottom-10 left-0 right-0 flex justify-center items-center gap-3 px-4"
          >
            <button
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/80 text-pastelia-burgundy shadow-md hover:bg-white transition-colors disabled:opacity-40 disabled:pointer-events-none"
              onClick={(e) => { e.stopPropagation(); zoomFromButton(1 / 1.6); }}
              disabled={!zoomed}
              aria-label="Alejar imagen"
            >
              <Minus className="w-5 h-5" />
            </button>
            <button
              className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-pastelia-burgundy text-white hover:scale-110 transition-transform shadow-xl z-[110]"
              onClick={(e) => { e.stopPropagation(); onClose(); }}
              aria-label="Cerrar imagen"
            >
              <X className="w-6 h-6 md:w-7 md:h-7" />
            </button>
            <button
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/80 text-pastelia-burgundy shadow-md hover:bg-white transition-colors disabled:opacity-40 disabled:pointer-events-none"
              onClick={(e) => { e.stopPropagation(); zoomFromButton(1.6); }}
              disabled={view.s >= MAX_SCALE - 0.001}
              aria-label="Acercar imagen"
            >
              <Plus className="w-5 h-5" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
