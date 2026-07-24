import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

export default function Lightbox({ imageSrc, imageAlt, isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10 bg-pastelia-cream/95 backdrop-blur-md cursor-zoom-out"
        >
          <motion.img
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            src={imageSrc}
            alt={imageAlt}
            className="w-auto h-auto max-w-full max-h-[75vh] md:max-h-[85vh] object-contain rounded-[1rem] md:rounded-[2rem] shadow-2xl"
            onClick={(e) => e.stopPropagation()} 
          />
          
          {/* Botón Cerrar en la parte inferior central */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="absolute bottom-8 md:bottom-10 left-0 right-0 flex justify-center px-4"
          >
            <button 
              className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-pastelia-burgundy text-white hover:scale-110 transition-transform shadow-xl z-[110]"
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              aria-label="Cerrar imagen"
            >
              <X className="w-6 h-6 md:w-7 md:h-7" />
            </button>
          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
