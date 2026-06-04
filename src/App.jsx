import { useEffect } from "react"
import Lenis from "lenis"
import Navigation from "./components/layout/Navigation"
import Hero from "./components/sections/Hero"
import TextMarquee from "./components/ui/TextMarquee"
import Tortas from "./components/sections/Tortas"
import Queques from "./components/sections/Queques"
import Clasicos from "./components/sections/Clasicos"
import SocialProof from "./components/sections/SocialProof"
import Footer from "./components/layout/Footer"
import FloatingWhatsApp from "./components/ui/FloatingWhatsApp"
import PageSkeleton from "./components/ui/PageSkeleton"

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

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <PageSkeleton>
      <div className="min-h-screen w-full max-w-[100vw] overflow-x-hidden bg-pastelia-cream text-pastelia-brown font-sans selection:bg-pastelia-burgundy selection:text-pastelia-cream">
        <Navigation />
        <main>
          <Hero />
          <TextMarquee />
          <Tortas />
          <Queques />
          <Clasicos />
          <SocialProof />
        </main>
        <Footer />
        <FloatingWhatsApp />
      </div>
    </PageSkeleton>
  )
}

export default App
