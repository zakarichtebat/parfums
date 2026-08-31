import ProductCard from './ProductCard'
import useInView from '../hooks/useInView'

export default function ProductsSection({ perfumes, loading = false, onAddToCart }) {
  const [titleRef, titleInView] = useInView()
  const [gridRef, gridInView] = useInView({ threshold: 0.1 })

  return (
    <section id="shop" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-16 sm:px-8 sm:py-20">
      {/* Titre sur fond "coup de pinceau" */}
      <div ref={titleRef} className="mb-12 flex justify-center">
        <div
          className={`relative inline-flex items-center justify-center px-14 py-5 transition-all duration-700 ${
            titleInView ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
          }`}
        >
          <BrushStroke />
          <h2 className="caps relative text-[12px] text-ink sm:text-[13px]">
            Shop Signature Perfumes
          </h2>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="arch h-[430px] animate-pulse bg-ink/5" />
          ))}
        </div>
      ) : (
        <div
          ref={gridRef}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {perfumes.map((perfume, i) => (
            <div
              key={perfume.id}
              // Apparition en cascade : chaque carte arrive 120 ms apres la precedente
              style={{ transitionDelay: gridInView ? `${i * 120}ms` : '0ms' }}
              className={`transition-all duration-700 ease-out ${
                gridInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
            >
              <ProductCard
                perfume={perfume}
                // Alternance subtile blanc / bleu nuit
                dark={i % 2 === 1}
                onAddToCart={onAddToCart}
              />
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

function BrushStroke() {
  return (
    <svg
      viewBox="0 0 420 92"
      preserveAspectRatio="none"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <path
        fill="#e0d3bf"
        d="M6,52 C34,26 96,14 168,12 C238,10 320,14 386,24 C408,27 418,36 412,46 C406,58 380,66 340,72 C270,83 178,86 110,80 C66,76 28,70 10,62 C2,58 1,56 6,52 Z M170,16 C112,20 58,30 24,44 C48,34 104,24 170,16 Z"
      />
    </svg>
  )
}
