import { useMemo } from 'react'

// Nombre de particules "sillage" liberees a chaque changement de flacon.
const PARTICLE_COUNT = 14

// Les bords de la photo se fondent dans le bleu nuit : le flacon semble
// flotter dans un halo, quelle que soit la couleur de fond du cliche.
const BOTTLE_MASK =
  'radial-gradient(ellipse 46% 50% at 50% 46%, #000 32%, rgba(0,0,0,0.55) 68%, transparent 92%)'

/**
 * Pile de flacons superposes : un seul est visible a la fois.
 * Le passage d'un flacon a l'autre se fait en fondu + leger zoom + flou,
 * accompagne d'un souffle de particules dorees.
 */
export default function HeroBottle({ slides, index }) {
  // Positions/durees tirees une seule fois : le rendu reste stable entre 2 frames.
  const particles = useMemo(
    () =>
      Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
        id: i,
        left: 12 + Math.random() * 76, // %
        size: 2 + Math.random() * 3.5, // px
        delay: Math.random() * 0.9, // s
        duration: 2.2 + Math.random() * 1.6, // s
        drift: -18 + Math.random() * 36, // px
      })),
    []
  )

  return (
    <div className="relative flex justify-center">
      {/* Halo dore : il respire a chaque changement */}
      <div
        key={`halo-${index}`}
        className="pointer-events-none absolute inset-0 -z-10 animate-halo rounded-full bg-[radial-gradient(circle_at_50%_45%,rgba(201,162,39,0.28),transparent_65%)] blur-2xl"
      />

      <div className="relative aspect-[3/4] w-52 animate-floaty sm:w-64 lg:w-72">
        {slides.map((slide, i) => (
          <img
            key={slide.id}
            src={slide.image}
            alt={`Flacon ${slide.brand}`}
            loading={i === 0 ? 'eager' : 'lazy'}
            onError={(e) => {
              // Repli sur le visuel local si le CDN est injoignable.
              if (slide.fallback && e.currentTarget.src !== slide.fallback) {
                e.currentTarget.src = slide.fallback
              }
            }}
            aria-hidden={i !== index}
            className={`absolute inset-0 h-full w-full object-cover contrast-[1.06] saturate-[1.05] drop-shadow-[0_25px_45px_rgba(0,0,0,0.45)] transition-all duration-[1600ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] ${
              i === index
                ? 'scale-100 opacity-100 blur-0'
                : 'pointer-events-none scale-[0.88] opacity-0 blur-[6px]'
            }`}
            style={{ maskImage: BOTTLE_MASK, WebkitMaskImage: BOTTLE_MASK }}
          />
        ))}

        {/* Souffle de particules : la cle force le rejeu a chaque diapositive */}
        <div
          key={`particles-${index}`}
          className="pointer-events-none absolute inset-0 overflow-hidden"
          aria-hidden="true"
        >
          {particles.map((p) => (
            <span
              key={p.id}
              className="absolute bottom-[22%] animate-drift rounded-full bg-gold-light"
              style={{
                left: `${p.left}%`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                animationDelay: `${p.delay}s`,
                animationDuration: `${p.duration}s`,
                '--drift-x': `${p.drift}px`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
