import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import StickyNav from './components/StickyNav'
import Hero from './components/Hero'
import WaveDivider from './components/WaveDivider'
import ProductsSection from './components/ProductsSection'
import AboutSection from './components/AboutSection'
import Footer from './components/Footer'
import { MOCK_PERFUMES } from './data/perfumes'
import { fetchPerfumes } from './services/api'

// Passe a true une fois l'API Laravel lancee (ETAPE 2).
const USE_API = false

export default function App() {
  const [perfumes, setPerfumes] = useState(MOCK_PERFUMES)
  const [loading, setLoading] = useState(USE_API)
  const [cart, setCart] = useState([])

  useEffect(() => {
    if (!USE_API) return
    let cancelled = false
    fetchPerfumes()
      .then((data) => {
        if (!cancelled) setPerfumes(data)
      })
      .catch((err) => {
        console.error('API indisponible, on garde les donnees mock.', err)
        if (!cancelled) setPerfumes(MOCK_PERFUMES)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  const handleAddToCart = (perfume) => setCart((c) => [...c, perfume])

  return (
    <div id="top" className="min-h-screen bg-white">
      <StickyNav cartCount={cart.length} />

      {/* Bloc bleu nuit + vague de transition */}
      <div className="relative bg-night">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(201,162,39,0.10),transparent_60%)]" />
        <Navbar cartCount={cart.length} />
        <Hero />
        <WaveDivider />
      </div>

      <main>
        <ProductsSection
          perfumes={perfumes}
          loading={loading}
          onAddToCart={handleAddToCart}
        />
        <AboutSection />
      </main>

      <Footer />
    </div>
  )
}
