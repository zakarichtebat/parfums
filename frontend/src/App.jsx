import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import WaveDivider from './components/WaveDivider'
import ProductsSection from './components/ProductsSection'
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
    <div className="min-h-screen bg-white">
      {/* Bloc bleu nuit + vague de transition */}
      <div className="relative bg-night">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(201,162,39,0.10),transparent_60%)]" />
        <Navbar />
        <Hero />
        <WaveDivider />
      </div>

      <main>
        <ProductsSection
          perfumes={perfumes}
          loading={loading}
          onAddToCart={handleAddToCart}
        />
      </main>

      <footer className="bg-night py-8 text-center">
        <p className="caps text-[10px] text-white/50">
          Perfume Shop — {cart.length} article(s) dans le panier
        </p>
      </footer>
    </div>
  )
}
