import { useState } from 'react'

/**
 * Galerie produit : vignettes + image principale avec loupe au survol.
 * Le zoom deplace simplement l'origine de la transformation sous le curseur.
 */
export default function ProductGallery({ images, name }) {
  const [active, setActive] = useState(0)
  const [zooming, setZooming] = useState(false)
  const [origin, setOrigin] = useState('50% 50%')

  const onMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setOrigin(`${x}% ${y}%`)
  }

  return (
    <div className="flex flex-col-reverse gap-4 sm:flex-row">
      {/* Vignettes */}
      <div className="flex gap-3 sm:flex-col">
        {images.map((src, i) => (
          <button
            key={src}
            onClick={() => setActive(i)}
            aria-label={`Visuel ${i + 1}`}
            aria-current={i === active}
            className={`h-20 w-20 shrink-0 overflow-hidden rounded-xl border transition-all ${
              i === active
                ? 'border-gold ring-1 ring-gold/40'
                : 'border-ink/12 opacity-70 hover:opacity-100'
            }`}
          >
            <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>

      {/* Image principale */}
      <div
        onMouseEnter={() => setZooming(true)}
        onMouseLeave={() => setZooming(false)}
        onMouseMove={onMove}
        className="relative flex-1 overflow-hidden rounded-3xl border border-ink/10 bg-white"
      >
        <img
          src={images[active]}
          alt={name}
          className="h-full max-h-[560px] w-full object-cover transition-transform duration-300 ease-out"
          style={{
            transformOrigin: origin,
            transform: zooming ? 'scale(1.9)' : 'scale(1)',
          }}
        />
        <span
          className={`caps pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/90 px-4 py-1.5 text-[9px] text-ink-light backdrop-blur-sm transition-opacity duration-300 ${
            zooming ? 'opacity-0' : 'opacity-100'
          }`}
        >
          Hover to zoom
        </span>
      </div>
    </div>
  )
}
