import { useEffect } from "react"
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import { MotionConfig } from "motion/react"
import Lenis from "lenis"
import { setLenis, scrollToSection } from "./lib/smoothScroll"
import { startStaging, revealAll, Deferred } from "./lib/stagedMount"
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

// Arranca el montaje por etapas (solo en la portada) y, si la dirección trae #sección,
// va a ella cuando la página termina de montarse
function StagedStart() {
  const { pathname } = useLocation();
  useEffect(() => {
    if (pathname !== "/") {
      revealAll()
      return
    }
    startStaging()
    const goToHash = () => {
      const id = window.location.hash.slice(1)
      if (id) setTimeout(() => scrollToSection(id, { immediate: true }), 100)
    }
    window.addEventListener("pastelia:mounted", goToHash, { once: true })
    return () => window.removeEventListener("pastelia:mounted", goToHash)
  }, [pathname])
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
