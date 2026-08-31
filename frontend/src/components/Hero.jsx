import { useCallback, useEffect, useRef, useState } from 'react'
import { HERO_SLIDES } from '../data/perfumes'
import HeroBottle from './HeroBottle'

// Duree d'affichage d'un flacon avant de passer au suivant.
const SLIDE_DURATION = 4600

export default function Hero() {
  const [index, setIndex] = useState(1) // "Dior" actif, comme la maquette
  const [paused, setPaused] = useState(false)
  const timer = useRef(null)

  const goTo = useCallback((next) => {
    setIndex((i) => (typeof next === 'function' ? next(i) : next))
  }, [])

  const prev = () => goTo((i) => (i === 0 ? HERO_SLIDES.length - 1 : i - 1))
  const next = () => goTo((i) => (i + 1) % HERO_SLIDES.length)

  // Defilement automatique. Le timer repart de zero apres chaque interaction
  // (clic sur un point ou sur un chevron) grace a la dependance sur `index`.
  useEffect(() => {
    if (paused) return
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    timer.current = setTimeout(
      () => setIndex((i) => (i + 1) % HERO_SLIDES.length),
      SLIDE_DURATION
    )
    return () => clearTimeout(timer.current)
  }, [index, paused])

  return (
    <section
      className="relative z-10 mx-auto max-w-6xl px-5 pb-24 pt-10 sm:px-8 sm:pb-32 lg:pb-40"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto_1fr] lg:gap-6">
        {/* Colonne gauche : titre + CTA */}
        <div className="animate-fadeUp text-center lg:text-left">
          <h1 className="caps text-[19px] leading-[1.7] text-white sm:text-[22px] lg:text-[23px]">
            Unleash your senses: discover exquisite fragrances that captivate.
          </h1>
          <div className="mx-auto mt-7 h-px w-52 bg-gradient-to-r from-transparent via-gold/70 to-transparent lg:mx-0 lg:bg-gradient-to-r lg:from-gold/70 lg:via-gold/40 lg:to-transparent" />
          <button className="caps mt-8 rounded-[4px] border border-gold/50 bg-white/10 px-10 py-3 text-[12px] text-gold-light backdrop-blur-sm transition-all hover:bg-gold hover:text-night">
            Discover
          </button>
        </div>

        {/* Colonne centre : flacon anime */}
        <HeroBottle slides={HERO_SLIDES} index={index} />

        {/* Colonne droite : arguments + pagination verticale */}
        <div className="flex items-center justify-center gap-8 lg:justify-end">
          {/* Les textes changent en meme temps que le flacon.
              Hauteur reservee pour eviter tout saut de mise en page. */}
          <div className="relative min-h-[220px] w-full max-w-[280px]">
            {HERO_SLIDES.map((slide, i) => (
              <ul
                key={slide.id}
                aria-hidden={i !== index}
                className={`absolute inset-0 space-y-7 transition-all duration-[1200ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] ${
                  i === index
                    ? 'translate-y-0 opacity-100'
                    : 'pointer-events-none translate-y-3 opacity-0'
                }`}
              >
                {slide.bullets.map((text) => (
                  <li key={text} className="flex gap-3">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gold" />
                    <p className="text-[11.5px] leading-[1.75] text-white/75">{text}</p>
                  </li>
                ))}
              </ul>
            ))}
          </div>

          {/* Pagination verticale des marques */}
          <div className="hidden flex-col items-center gap-2 sm:flex">
            <Chevron dir="up" onClick={prev} />
            {HERO_SLIDES.map((slide, i) => (
              <button
                key={slide.id}
                onClick={() => goTo(i)}
                aria-label={slide.brand}
                aria-current={i === index}
                className="relative grid h-6 w-6 place-items-center"
              >
                <span
                  className={`caps absolute right-8 whitespace-nowrap text-[11px] text-white transition-opacity duration-700 ${
                    i === index ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  {slide.brand}
                </span>
                <span
                  className={`rounded-full transition-all duration-500 ${
                    i === index
                      ? 'h-3.5 w-3.5 bg-gold ring-1 ring-gold ring-offset-2 ring-offset-night'
                      : 'h-1.5 w-1.5 bg-white/70 hover:bg-white'
                  }`}
                />
              </button>
            ))}
            <Chevron dir="down" onClick={next} />
          </div>
        </div>
      </div>
    </section>
  )
}

function Chevron({ dir, onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label={dir === 'up' ? 'Precedent' : 'Suivant'}
      className="text-white/60 transition-colors hover:text-gold-light"
    >
      <svg
        viewBox="0 0 24 24"
        className={`h-4 w-4 ${dir === 'down' ? 'rotate-180' : ''}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m6 13 6-6 6 6" />
        <path d="m6 18 6-6 6 6" />
      </svg>
    </button>
  )
}
