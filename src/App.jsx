import Navigation from "./components/layout/Navigation"
import Hero from "./components/sections/Hero"
import Tortas from "./components/sections/Tortas"
import Queques from "./components/sections/Queques"
import Clasicos from "./components/sections/Clasicos"
import SocialProof from "./components/sections/SocialProof"
import Footer from "./components/layout/Footer"
import FloatingWhatsApp from "./components/ui/FloatingWhatsApp"

function App() {
  return (
    <div className="min-h-screen w-full max-w-[100vw] overflow-x-hidden bg-pastelia-cream text-pastelia-brown font-sans selection:bg-pastelia-burgundy selection:text-pastelia-cream">
      <Navigation />
      <main>
        <Hero />
        <Tortas />
        <Queques />
        <Clasicos />
        <SocialProof />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  )
}

export default App
