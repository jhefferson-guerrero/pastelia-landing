import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { heroImages } from "../../data/hero"
import { catalog } from "../../data/products"

const LOGO_SRC = "/images/logo-skeleton.webp"

// El logo se muestra como mínimo este tiempo, para que la animación siempre se vea completa
const MIN_VISIBLE_MS = 2400
// Tope máximo de espera por recursos en conexiones lentas (el preloader nunca se queda colgado)
const MAX_ASSETS_WAIT_MS = 8000
// Tope de espera por el propio logo antes de arrancar la animación
const MAX_LOGO_WAIT_MS = 3000

function loadImage(src) {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => resolve()
    img.onerror = () => resolve()
    img.src = src
    if (img.decode) img.decode().then(resolve, resolve)
  })
}

function loadFonts() {
  if (!document.fonts?.load) return Promise.resolve()
  return Promise.all([
    document.fonts.load('400 1em "Playfair Display Variable"'),
    document.fonts.load('600 1em "Playfair Display Variable"'),
    document.fonts.load('italic 400 1em "Playfair Display Variable"'),
    document.fonts.load('400 1em "Plus Jakarta Sans Variable"'),
  ]).catch(() => {})
}

// Calienta la caché con las fotos del catálogo mientras el navegador está libre
function warmCatalogImages() {
  if (navigator.connection?.saveData) return
  const urls = Object.values(catalog).flat().map((p) => p.image).filter(Boolean)
  const idle = window.requestIdleCallback || ((cb) => setTimeout(cb, 300))
  idle(() => urls.forEach((src) => loadImage(src)))
}

export default function PageSkeleton({ children }) {
  const [logoReady, setLogoReady] = useState(false)
  // Si el HTML trae el splash estático, el logo de React ya parte visible (sin fundido de entrada)
  const [hasStaticSplash] = useState(() => !!document.getElementById("splash"))
  // 0: logo visible · 1: el logo se desvanece · 2: el fondo se desvanece y se monta la app
  const [stage, setStage] = useState(0)

  // El logo de React ya está pintado encima: se retira el splash estático del HTML
  useEffect(() => {
    if (logoReady) document.getElementById("splash")?.remove()
  }, [logoReady])

  useEffect(() => {
    let cancelled = false
    const timers = []
    const wait = (ms) => new Promise((resolve) => timers.push(setTimeout(resolve, ms)))

    async function run() {
      // 1. Esperar al logo: la cuenta de la animación empieza cuando ya es visible
      await Promise.race([loadImage(LOGO_SRC), wait(MAX_LOGO_WAIT_MS)])
      if (cancelled) return
      setLogoReady(true)

      // 2. Mientras se anima, cargar fuentes y fotos del hero (el resto en segundo plano)
      heroImages.slice(1).forEach((img) => loadImage(img.src))
      const assets = Promise.race([
        Promise.all([loadFonts(), loadImage(heroImages[0].src)]),
        wait(MAX_ASSETS_WAIT_MS),
      ])

      // 3. Se sale solo cuando pasó el tiempo mínimo Y todo está listo
      await Promise.all([wait(MIN_VISIBLE_MS), assets])
      if (cancelled) return
      setStage(1)
      await wait(450)
      if (cancelled) return
      setStage(2)
      warmCatalogImages()
    }

    run()
    return () => {
      cancelled = true
      timers.forEach(clearTimeout)
    }
  }, [])

  return (
    <>
      <AnimatePresence>
        {stage < 2 && (
          <motion.div
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-pastelia-cream"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.2, ease: "easeOut" } }}
          >
            <AnimatePresence>
              {logoReady && stage === 0 && (
                <motion.div
                  initial={hasStaticSplash ? false : { opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)", transition: { duration: 0.45, ease: "easeIn" } }}
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
                      src={LOGO_SRC}
                      alt="Cargando Pastelia..."
                      className="splash-logo"
                    />
                  </motion.div>

                  {/* Barra de progreso premium */}
                  <div className="splash-bar overflow-hidden rounded-full bg-pastelia-burgundy/10 relative">
                    <motion.div
                      className="absolute top-0 left-0 bottom-0 bg-pastelia-burgundy/80 w-full rounded-full"
                      initial={{ x: "-100%" }}
                      animate={{ x: "0%" }}
                      transition={{ duration: MIN_VISIBLE_MS / 1000 - 0.2, ease: [0.76, 0, 0.24, 1] }}
                    />
                  </div>

                  <motion.span
                    className="splash-text text-pastelia-burgundy/70"
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

      {/* La app se monta solo cuando el preloader ya casi desapareció, para que las
          animaciones de entrada del Hero arranquen después. */}
      {stage >= 2 && children}
    </>
  )
}
