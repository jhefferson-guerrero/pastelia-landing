import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { heroImages, communityImages } from "../../data/hero"
import { catalog } from "../../data/products"
import { thumb } from "../../lib/images"
import { RevealContext } from "../../lib/reveal"
import { whenFullyMounted } from "../../lib/stagedMount"
import { lockScroll, unlockScroll } from "../../lib/smoothScroll"

const LOGO_SRC = "/images/logo-skeleton.webp"

// El logo se muestra como mínimo este tiempo, para que la animación siempre se vea completa
const MIN_VISIBLE_MS = 2400
// Pausa final con la barra llena, para que se vea el 100% antes de revelar la página
const FILL_HOLD_MS = 250
// Tope máximo de espera por recursos en conexiones lentas (el preloader nunca se queda colgado)
const MAX_ASSETS_WAIT_MS = 8000
// Tope de espera por el propio logo antes de arrancar la animación
const MAX_LOGO_WAIT_MS = 3000
// Tope de espera a que la página termine de montarse detrás del preloader
const MAX_MOUNT_WAIT_MS = 4000

// Qué se carga y en qué orden. Mientras corre la animación:
//  1. CRÍTICO: fuentes + primera foto del Hero (lo que se ve apenas se abre la página)
//  2. IMPORTANTE: resto del Hero, Tortas y Clásicos (lo primero que se desplaza a ver)
//  El preloader no termina hasta que 1 y 2 están listos (la barra llega al 100% con ellos).
//  3. SEGUNDO PLANO: Queques, Cuchareables y galería; se cargan sin bloquear nada.
const unique = (list) => [...new Set(list.filter(Boolean))]
// Se precargan las copias livianas (las que se ven en las tarjetas), con el ancho de cada sección
const imagesOf = (products, width) => products.map((p) => thumb(p.image, width))

const CRITICAL_IMAGE = heroImages[0].src
const IMPORTANT_IMAGES = unique([
  ...heroImages.map((img) => img.src),
  ...imagesOf(catalog.tortas, 800),
  ...imagesOf(catalog.clasicos, 640),
]).filter((src) => src !== CRITICAL_IMAGE)
const BACKGROUND_IMAGES = unique([
  ...imagesOf(catalog.queques, 480),
  ...imagesOf(catalog.cuchareables, 480),
  ...communityImages.map((src) => thumb(src, 640)),
]).filter((src) => src !== CRITICAL_IMAGE && !IMPORTANT_IMAGES.includes(src))

// Resuelve siempre (también si la imagen falla): un recurso roto nunca debe frenar el preloader.
// Con decode=true espera además a que la imagen esté lista para pintarse sin parpadeo.
function loadImage(src, decode = true) {
  return new Promise((resolve) => {
    const img = new Image()
    img.src = src
    if (decode && img.decode) {
      img.decode().then(resolve, resolve)
    } else {
      img.onload = () => resolve()
      img.onerror = () => resolve()
    }
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

// Carga la lista de a pocas por vez, para no competir con lo que la persona ya está viendo
async function loadInBackground(list, concurrency = 3) {
  const queue = [...list]
  await Promise.all(
    Array.from({ length: concurrency }, async () => {
      while (queue.length) await loadImage(queue.shift(), false)
    })
  )
}

const smoothstep = (t) => t * t * (3 - 2 * t)

export default function PageSkeleton({ children }) {
  const [logoReady, setLogoReady] = useState(false)
  // Si el HTML trae el splash estático, el logo de React ya parte visible (sin fundido de entrada)
  const [hasStaticSplash] = useState(() => !!document.getElementById("splash"))
  // 0: logo visible · 1: el logo se desvanece · 2: el fondo se desvanece y se monta la app
  const [stage, setStage] = useState(0)
  // 0 a 1: avanza con el tiempo, pero nunca más que lo realmente cargado
  const [progress, setProgress] = useState(0)
  // En pantallas de escritorio la página se monta DETRÁS del preloader (cuando ya están las
  // fuentes y la primera foto), así el trabajo pesado ocurre mientras se ve el logo y no justo
  // al retirarse. En móvil se mantiene el montaje al retirarse el preloader.
  const [mountBehind] = useState(() => window.matchMedia("(min-width: 768px)").matches)
  const [appMounted, setAppMounted] = useState(false)
  // Las animaciones de entrada de la página arrancan cuando el preloader ya se retira
  const revealed = stage >= 2
  const showApp = revealed || (mountBehind && appMounted)

  // Mientras se ve el preloader no se puede desplazar la página que ya está montada detrás
  useEffect(() => {
    if (revealed) return
    const html = document.documentElement
    html.style.overflow = "hidden"
    lockScroll()
    // Lenis se crea en un efecto del padre, que corre después de este: se reintenta al siguiente cuadro
    const frame = requestAnimationFrame(() => lockScroll())
    return () => {
      cancelAnimationFrame(frame)
      html.style.overflow = ""
      unlockScroll()
    }
  }, [revealed])

  // El logo de React ya está pintado encima: se retira el splash estático del HTML
  useEffect(() => {
    if (logoReady) document.getElementById("splash")?.remove()
  }, [logoReady])

  useEffect(() => {
    let cancelled = false
    let ticker
    const timers = []
    const wait = (ms) => new Promise((resolve) => timers.push(setTimeout(resolve, ms)))

    async function run() {
      // 1. Esperar al logo: la cuenta de la animación empieza cuando ya es visible
      await Promise.race([loadImage(LOGO_SRC), wait(MAX_LOGO_WAIT_MS)])
      if (cancelled) return
      setLogoReady(true)
      const start = performance.now()

      // 2. Mientras se anima: lo crítico primero y, apenas llega, lo importante en paralelo
      const saveData = !!navigator.connection?.saveData
      const important = saveData ? [] : IMPORTANT_IMAGES
      const total = 2 + important.length
      let done = 0
      let settled = false
      const track = (promise) => promise.then(() => { done++ })

      const fonts = track(loadFonts())
      const hero = track(loadImage(CRITICAL_IMAGE))
      // Con las fuentes y la primera foto listas, la página ya puede montarse detrás del preloader
      if (mountBehind) Promise.all([fonts, hero]).then(() => { if (!cancelled) setAppMounted(true) })
      const rest = hero.then(() => Promise.all(important.map((src) => track(loadImage(src)))))
      const assets = Promise.race([Promise.all([fonts, hero, rest]), wait(MAX_ASSETS_WAIT_MS)])
        .then(() => { settled = true })

      // Lo que no es urgente se baja en segundo plano cuando lo importante ya llegó
      if (!saveData) assets.then(() => loadInBackground(BACKGROUND_IMAGES))

      // La barra sigue al tiempo, pero nunca llega al 100% antes que los recursos
      ticker = setInterval(() => {
        const byTime = smoothstep(Math.min(1, (performance.now() - start) / MIN_VISIBLE_MS))
        const byAssets = settled ? 1 : done / total
        setProgress((prev) => Math.max(prev, Math.min(byTime, byAssets)))
      }, 50)

      // 3. Se sale solo cuando pasó el tiempo mínimo Y todo lo importante está listo
      await Promise.all([wait(MIN_VISIBLE_MS), assets])
      if (cancelled) return
      // ...y la página ya está montada detrás (con tope, para que el preloader nunca se quede colgado)
      if (mountBehind) await Promise.race([whenFullyMounted(), wait(MAX_MOUNT_WAIT_MS)])
      if (cancelled) return
      clearInterval(ticker)
      setProgress(1)
      await wait(FILL_HOLD_MS)
      if (cancelled) return
      setStage(1)
      await wait(450)
      if (cancelled) return
      setStage(2)
    }

    run()
    return () => {
      cancelled = true
      clearInterval(ticker)
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
                      className="absolute inset-0 origin-left bg-pastelia-burgundy/80 rounded-full"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: progress }}
                      transition={{ duration: 0.12, ease: "linear" }}
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

      {/* En móvil la app se monta cuando el preloader ya casi desapareció; en escritorio, detrás de él.
          En ambos casos las animaciones de entrada esperan a `revealed` (ver lib/reveal.js). */}
      {showApp && <RevealContext.Provider value={revealed}>{children}</RevealContext.Provider>}
    </>
  )
}
