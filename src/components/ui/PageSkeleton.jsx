import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"

export default function PageSkeleton({ children }) {
  const [stage, setStage] = useState(0)

  useEffect(() => {
    // Etapa 1: El logo empieza a desaparecer
    const timer1 = setTimeout(() => {
      setStage(1)
    }, 2400)

    // Etapa 2: El fondo del skeleton desaparece, revelando el lienzo en blanco
    const timer2 = setTimeout(() => {
      setStage(2)
    }, 3200)

    // Etapa 3: Montamos la aplicación para que las animaciones iniciales arranquen desde cero
    const timer3 = setTimeout(() => {
      setStage(3)
    }, 3800)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [])

  return (
    <>
      <AnimatePresence>
        {stage < 2 && (
          <motion.div
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-pastelia-cream"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
          >
            <AnimatePresence>
              {stage === 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="relative flex flex-col items-center"
                >
                  <motion.div
                    animate={{ 
                      y: [0, -8, 0],
                    }}
                    transition={{
                      duration: 3,
                      ease: "easeInOut",
                      repeat: Infinity,
                    }}
                  >
                    <img 
                      src="/images/logo-skeleton.jpg" 
                      alt="Cargando Pastelia..." 
                      className="w-36 sm:w-48 md:w-64 aspect-square p-3 sm:p-4 md:p-6 object-contain rounded-full bg-pastelia-burgundy shadow-[0_20px_50px_rgba(89,17,25,0.15)] border border-pastelia-brown/5"
                    />
                  </motion.div>
                  
                  {/* Barra de progreso premium */}
                  <div className="mt-14 overflow-hidden h-[3px] w-48 sm:w-64 md:w-80 rounded-full bg-pastelia-burgundy/10 relative">
                    <motion.div 
                      className="absolute top-0 left-0 bottom-0 bg-pastelia-burgundy/80 w-full rounded-full"
                      initial={{ x: "-100%" }}
                      animate={{ x: "0%" }}
                      transition={{ duration: 2.2, ease: [0.76, 0, 0.24, 1] }}
                    />
                  </div>
                  
                  <motion.span 
                    className="mt-6 font-serif font-semibold text-pastelia-burgundy/70 tracking-[0.3em] text-sm sm:text-base md:text-lg uppercase text-center px-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 1 }}
                  >
                    Horneando...
                  </motion.span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Montamos los children SOLO cuando el skeleton ha desaparecido casi por completo.
          Esto asegura que el Hero y demás componentes ejecuten sus animaciones de entrada 
          después de que el skeleton termina, como solicitó el usuario. */}
      {stage >= 2 && children}
    </>
  )
}
