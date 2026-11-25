import Hero from "../components/sections/Hero"
import Tortas from "../components/sections/Tortas"
import Queques from "../components/sections/Queques"
import Clasicos from "../components/sections/Clasicos"
import Cuchareables from "../components/sections/Cuchareables"
import HowToOrder from "../components/sections/HowToOrder"
import FAQ from "../components/sections/FAQ"
import SocialProof from "../components/sections/SocialProof"
import { Deferred } from "../lib/stagedMount"

export default function Home() {
  return (
    <>
      <Hero />
      <Deferred stage={1}>
        <Tortas />
        <Clasicos />
      </Deferred>
      <Deferred stage={2}>
        <Queques />
        <Cuchareables />
      </Deferred>
      <Deferred stage={3}>
        <HowToOrder />
        <SocialProof />
      </Deferred>
      <Deferred stage={4}>
        <FAQ />
      </Deferred>
    </>
  )
}
