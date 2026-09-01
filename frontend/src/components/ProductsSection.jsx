import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from './ProductCard'
import useInView from '../hooks/useInView'

export default function ProductsSection({ perfumes, loading = false }) {
  const [titleRef, titleInView] = useInView()
  const [gridRef, gridInView] = useInView({ threshold: 0.1 })

  // Carrousel mobile : on suit la carte la plus proche du centre.
  const trackRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const syncActive = (track) => {
    if (!track) return
    const middle = track.scrollLeft + track.clientWidth / 2
    let closest = 0
    let best = Infinity
    Array.from(track.children).forEach((card, i) => {
      const distance = Math.abs(card.offsetLeft + card.offsetWidth / 2 - middle)
      if (distance < best) {
        best = distance
        closest = i
      }
    })
    setActiveIndex(closest)
  }

  const goTo = (i) => {
    const track = trackRef.current
    const card = track?.children[i]
    if (!track || !card) return
    track.scrollTo({
      left: card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2,
      behavior: 'smooth',
    })
  }

  return (
    <section id="shop" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-16 sm:px-8 sm:py-20">
      {/* Titre sur fond "coup de pinceau" */}
      <div ref={titleRef} className="mb-12 flex justify-center">
        <div
          className={`relative inline-flex items-center justify-center px-10 py-5 transition-all duration-700 sm:px-14 ${
            titleInView ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
          }`}
        >
          <BrushStroke />
          <h2 className="caps relative whitespace-nowrap text-[10px] text-ink sm:text-[13px]">
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
        <>
          {/*
            Mobile : bande horizontale avec accroche par carte.
            A partir de sm : grille classique, le defilement est neutralise.
          */}
          <div
            ref={(node) => {
              trackRef.current = node
              window.__trackDebug = { node, ref: trackRef }
              gridRef.current = node
            }}
            onScroll={(e) => syncActive(e.currentTarget)}
            className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:snap-none sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 lg:grid-cols-4"
          >
            {perfumes.map((perfume, i) => (
              <div
                key={perfume.id}
                // Apparition en cascade : chaque carte arrive 120 ms apres la precedente
                style={{ transitionDelay: gridInView ? `${i * 120}ms` : '0ms' }}
                className={`w-[78%] shrink-0 snap-center transition-all duration-700 ease-out sm:w-auto sm:shrink ${
                  gridInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
              >
                {/* Alternance subtile blanc / sable */}
                <ProductCard perfume={perfume} dark={i % 2 === 1} />
              </div>
            ))}
          </div>

          {/* Puces de progression, uniquement sur mobile */}
          <div className="mt-6 flex justify-center gap-2 sm:hidden">
            {perfumes.map((perfume, i) => (
              <button
                key={perfume.id}
                onClick={() => goTo(i)}
                aria-label={`Voir ${perfume.name}`}
                aria-current={i === activeIndex}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === activeIndex ? 'w-6 bg-gold' : 'w-1.5 bg-ink/20'
                }`}
              />
            ))}
          </div>
        </>
      )}

      <div className="mt-14 flex justify-center">
        <Link
          to="/shop"
          className="caps group relative overflow-hidden rounded-full border border-ink/25 px-10 py-3 text-[10px] text-ink transition-all hover:border-ink hover:bg-ink hover:text-ivory"
        >
          <span className="relative z-10">View all fragrances</span>
          <span className="absolute inset-y-0 -left-full w-1/3 bg-gold/40 blur-sm group-hover:animate-shine" />
        </Link>
      </div>
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
