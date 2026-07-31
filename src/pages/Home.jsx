import Hero from "../components/sections/Hero"
import Tortas from "../components/sections/Tortas"
import Queques from "../components/sections/Queques"
import Clasicos from "../components/sections/Clasicos"
import Cuchareables from "../components/sections/Cuchareables"
import HowToOrder from "../components/sections/HowToOrder"
import FAQ from "../components/sections/FAQ"
import SocialProof from "../components/sections/SocialProof"

export default function Home() {
  return (
    <>
      <Hero />
      <Tortas />
      <Queques />
      <Cuchareables />
      <Clasicos />
      <HowToOrder />
      <FAQ />
      <SocialProof />
    </>
  )
}
