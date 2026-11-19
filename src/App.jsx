import { useEffect } from "react"
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import { MotionConfig } from "motion/react"
import Lenis from "lenis"
import { setLenis } from "./lib/smoothScroll"
import Navigation from "./components/layout/Navigation"
import Footer from "./components/layout/Footer"
import FloatingWhatsApp from "./components/ui/FloatingWhatsApp"
import PageSkeleton from "./components/ui/PageSkeleton"
import Home from "./pages/Home"
import Catalogo from "./pages/Catalogo"

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
    setLenis(lenis)

    return () => {
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
          <Navigation />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/catalogo" element={<Catalogo />} />
            </Routes>
          </main>
          <Footer />
          <FloatingWhatsApp />
        </div>
      </PageSkeleton>
    </BrowserRouter>
    </MotionConfig>
  )
}

export default App
