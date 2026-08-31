import useInView from '../hooks/useInView'
import useParallax from '../hooks/useParallax'
import useCountUp from '../hooks/useCountUp'

const STATS = [
  { value: 12, suffix: '', label: 'Years of craft' },
  { value: 48, suffix: '', label: 'Signature blends' },
  { value: 92, suffix: 'k', label: 'Clients served' },
  { value: 4.9, suffix: '', label: 'Average rating', decimals: 1 },
]

const PARAGRAPHS = [
  'Perfume Shop began in a small atelier with a single obsession: give every raw material the time it needs. Our blends rest for months before a single bottle is filled.',
  'We work directly with growers in Grasse, Kerala and Oaxaca, and we bottle in batches small enough that every flacon passes through a perfumer’s hands.',
]

export default function AboutSection() {
  const [sectionRef, inView] = useInView({ threshold: 0.12 })
  const [bigRef, bigOffset] = useParallax(46)
  const [smallRef, smallOffset] = useParallax(-30)

  // Chaque element attend son tour : effet d'enchainement soigne.
  const step = (i) => ({
    transitionDelay: inView ? `${120 + i * 110}ms` : '0ms',
  })
  const reveal = inView
    ? 'translate-y-0 opacity-100'
    : 'translate-y-8 opacity-0'

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative scroll-mt-24 overflow-hidden bg-[#f7f3ed] py-20 sm:py-28"
    >
      {/* Voile dore tres discret en fond */}
      <div className="pointer-events-none absolute -left-24 top-10 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(201,162,39,0.16),transparent_70%)] blur-2xl" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        {/* Colonne visuel : le flacon glisse dans son arche doree */}
        <div className="relative mx-auto h-[420px] w-full max-w-md sm:h-[500px]">
          {/* Arche doree qui apparait */}
          <div
            style={step(0)}
            className={`absolute inset-x-8 inset-y-6 rounded-[999px_999px_20px_20px] border border-gold/45 transition-all duration-1000 ease-out ${
              inView ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
            }`}
          />

          <div
            ref={bigRef}
            style={{ transform: `translateY(${bigOffset}px)`, ...step(1) }}
            className={`absolute left-1/2 top-6 h-[340px] -translate-x-1/2 transition-[opacity] duration-1000 sm:h-[410px] ${
              inView ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src="/images/bottles/bottle-amber.png"
              alt="Flacon ambre de la maison"
              loading="lazy"
              className="h-full w-auto drop-shadow-[0_30px_45px_rgba(22,42,53,0.28)]"
            />
          </div>

          {/* Medaillon, en contrepoint du flacon */}
          <div
            ref={smallRef}
            style={{ transform: `translateY(${smallOffset}px)`, ...step(2) }}
            className={`absolute bottom-2 right-0 z-10 grid h-24 w-24 place-items-center rounded-full border border-gold/50 bg-[#f7f3ed] text-center shadow-[0_16px_30px_-18px_rgba(22,42,53,0.5)] transition-[opacity] duration-1000 sm:h-28 sm:w-28 ${
              inView ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div>
              <span className="font-display block text-[19px] leading-none text-night">
                2014
              </span>
              <span className="mt-1.5 block text-[8.5px] uppercase tracking-[0.16em] text-night/50">
                Grasse
                <br />
                France
              </span>
            </div>
          </div>
        </div>

        {/* Colonne texte */}
        <div>
          <span
            style={step(0)}
            className={`caps block text-[10px] text-gold-dark transition-all duration-700 ease-out ${reveal}`}
          >
            Our Maison
          </span>

          <h2
            style={step(1)}
            className={`caps mt-4 text-[19px] leading-[1.6] text-night transition-all duration-700 ease-out sm:text-[22px] ${reveal}`}
          >
            Crafted in small batches, never in a hurry.
          </h2>

          {/* Filet dore qui se deploie */}
          <div
            style={step(2)}
            className={`mt-6 h-px bg-gradient-to-r from-gold via-gold/50 to-transparent transition-all duration-[1100ms] ease-out ${
              inView ? 'w-40 opacity-100' : 'w-0 opacity-0'
            }`}
          />

          {PARAGRAPHS.map((text, i) => (
            <p
              key={text}
              style={step(3 + i)}
              className={`mt-6 max-w-lg text-[12.5px] leading-[1.9] text-night/70 transition-all duration-700 ease-out ${reveal}`}
            >
              {text}
            </p>
          ))}

          {/* Chiffres qui defilent */}
          <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
            {STATS.map((stat, i) => (
              <Stat key={stat.label} {...stat} inView={inView} style={step(5 + i)} reveal={reveal} />
            ))}
          </div>

          <button
            style={step(9)}
            className={`caps group relative mt-11 overflow-hidden rounded-full border border-night/25 px-9 py-3 text-[10px] text-night transition-all duration-700 ease-out hover:border-night hover:bg-night hover:text-white ${reveal}`}
          >
            <span className="relative z-10">Discover our story</span>
            <span className="absolute inset-y-0 -left-full w-1/3 bg-gold/40 blur-sm group-hover:animate-shine" />
          </button>
        </div>
      </div>
    </section>
  )
}

function Stat({ value, suffix = '', label, decimals = 0, inView, style, reveal }) {
  const shown = useCountUp(value, inView, { decimals })

  return (
    <div
      style={style}
      className={`transition-all duration-700 ease-out ${reveal}`}
    >
      <span className="font-display text-[26px] leading-none text-night">
        {shown}
        <span className="text-gold-dark">{suffix}</span>
      </span>
      <span className="mt-2 block text-[10.5px] uppercase tracking-[0.12em] text-night/50">
        {label}
      </span>
    </div>
  )
}
