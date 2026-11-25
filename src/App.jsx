import { useEffect } from "react"
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import { MotionConfig } from "motion/react"
import Lenis from "lenis"
import { setLenis, scrollToSection } from "./lib/smoothScroll"
import { startStaging, revealAll, Deferred } from "./lib/stagedMount"
import { useRevealed } from "./lib/reveal"
import Navigation from "./components/layout/Navigation"
import Footer from "./components/layout/Footer"
import FloatingWhatsApp from "./components/ui/FloatingWhatsApp"
import PageSkeleton from "./components/ui/PageSkeleton"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Arranca el montaje por etapas (solo en la portada). Si la dirección trae #sección, monta todo de una
// vez y va a esa sección apenas se ve la página, antes de que la persona empiece a desplazarse.
// No salta al recargar ni al volver atrás: solo cuando se abre un enlace con #sección.
function StagedStart() {
  const { pathname } = useLocation();
  const revealed = useRevealed();

  useEffect(() => {
    if (pathname !== "/" || window.location.hash) {
      revealAll()
      return
    }
    // Si el preloader todavía se ve, la página se monta detrás de él, sin esperas entre etapas
    startStaging({ fast: !revealed })
  }, [pathname]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!revealed || pathname !== "/") return
    const id = window.location.hash.slice(1)
    const nav = performance.getEntriesByType("navigation")[0]
    if (!id || (nav && nav.type !== "navigate")) return
    const timer = setTimeout(() => {
      if (window.scrollY < 80) scrollToSection(id, { immediate: true })
    }, 150)
    return () => clearTimeout(timer)
  }, [revealed]) // eslint-disable-line react-hooks/exhaustive-deps

  return null
}

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      syncTouch: false, // en pantallas táctiles se usa el scroll nativo
      touchMultiplier: 2,
      infinite: false,
    })

    let rafId
    function raf(time) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)
    setLenis(lenis)

    return () => {
      cancelAnimationFrame(rafId)
      setLenis(null)
      lenis.destroy()
    }
  }, [])

  return (
    <MotionConfig reducedMotion="user">
    <BrowserRouter>
      <ScrollToTop />
      <PageSkeleton>
        <div className="min-h-screen w-full max-w-[100vw] overflow-x-hidden bg-pastelia-cream text-pastelia-brown font-sans selection:bg-pastelia-burgundy selection:text-pastelia-cream">
          <StagedStart />
          <Navigation />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Deferred stage={4}>
            <Footer />
          </Deferred>
          <FloatingWhatsApp />
        </div>
      </PageSkeleton>
    </BrowserRouter>
    </MotionConfig>
  )
}

export default App
