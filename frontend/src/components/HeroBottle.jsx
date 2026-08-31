import { useMemo } from 'react'

// Nombre de particules "sillage" liberees a chaque changement de flacon.
const PARTICLE_COUNT = 14

/**
 * Pile de flacons superposes : un seul est visible a la fois.
 * Les visuels sont detoures (PNG transparent), donc aucun fond n'apparait :
 * seul le flacon flotte sur le bleu nuit.
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
        duration: 1.5, // s
        drift: -18 + Math.random() * 36, // px
      })),
    []
  )

  return (
    <div className="relative flex justify-center">
      <div className="relative aspect-[3/4] w-52 animate-floaty sm:w-64 lg:w-72">
        {slides.map((slide, i) => (
          <img
            key={slide.id}
            src={slide.image}
            alt={slide.brand}
            loading={i === 0 ? 'eager' : 'lazy'}
            aria-hidden={i !== index}
            className={`absolute inset-y-0 left-1/2 h-full w-auto max-w-none -translate-x-1/2 object-contain drop-shadow-[0_28px_38px_rgba(0,0,0,0.55)] transition-all duration-[1600ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] ${
              i === index
                ? 'scale-100 opacity-100 blur-0'
                : 'pointer-events-none scale-[0.88] opacity-0 blur-[6px]'
            }`}
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
