import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import WaveDivider from '../components/WaveDivider'
import ProductsSection from '../components/ProductsSection'
import AboutSection from '../components/AboutSection'
import { MOCK_PERFUMES } from '../data/perfumes'

// Vitrine : les quatre parfums les plus populaires.
const FEATURED = [...MOCK_PERFUMES]
  .sort((a, b) => b.popularity - a.popularity)
  .slice(0, 4)

export default function HomePage() {
  return (
    <>
      {/* Bloc clair + vague de transition */}
      <div className="relative bg-gradient-to-b from-ivory-dark via-ivory to-sand">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(176,141,46,0.12),transparent_62%)]" />
        <Navbar />
        <Hero />
        <WaveDivider />
      </div>

      <main>
        <ProductsSection perfumes={FEATURED} />
        <AboutSection />
      </main>
    </>
  )
}
