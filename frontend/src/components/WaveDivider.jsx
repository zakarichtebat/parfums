import { useEffect, useRef, useState } from 'react'

// Courbe commune aux deux vagues : la bande grise est l'espace entre les deux.
const TOP =
  'M0,104 C240,44 420,174 720,144 C1000,116 1180,32 1440,72'
const BOTTOM =
  'M0,192 C240,132 420,262 720,232 C1000,204 1180,120 1440,160'
// Meme courbe, a mi-hauteur de la bande : c'est le rail du texte defilant.
const RIBBON =
  'M0,148 C240,88 420,218 720,188 C1000,160 1180,76 1440,116'

// Bande = bord haut, puis bord bas parcouru a l'envers.
const BAND =
  `${TOP} L1440,160 C1180,120 1000,204 720,232 C420,262 240,132 0,192 Z`
const WHITE = `${BOTTOM} L1440,300 L0,300 Z`

const PHRASE =
  'FREE DELIVERY OVER $60  ✦  COMPLIMENTARY SAMPLES  ✦  100% AUTHENTIC FRAGRANCES  ✦  SECURE PAYMENT  ✦  '

/**
 * Transition fluide en vague entre la zone bleu nuit et la zone blanche.
 * La bande intermediaire porte un bandeau de texte qui defile en boucle
 * le long de la courbe.
 */
export default function WaveDivider() {
  const ribbonRef = useRef(null)
  const [length, setLength] = useState(0)
  const [animated, setAnimated] = useState(true)

  useEffect(() => {
    if (ribbonRef.current) setLength(ribbonRef.current.getTotalLength())
    setAnimated(!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches)
  }, [])

  return (
    <div className="pointer-events-none absolute inset-x-0 -bottom-px leading-[0]">
      <svg viewBox="0 0 1440 300" className="block h-auto w-full" aria-hidden="true">
        <defs>
          <path id="wave-ribbon" ref={ribbonRef} d={RIBBON} fill="none" />
          <linearGradient id="wave-band" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.11" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.19" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.11" />
          </linearGradient>
        </defs>

        {/* Bande intermediaire */}
        <path d={BAND} fill="url(#wave-band)" />

        {/* Texte defilant : deux copies identiques, decalees d'une longueur
            de courbe, ce qui rend la boucle invisible. */}
        {length > 0 && (
          <text
            fill="#e0c069"
            fillOpacity="0.9"
            fontFamily="Cinzel, Georgia, serif"
            fontSize="23"
            letterSpacing="5"
            dominantBaseline="middle"
          >
            <textPath
              href="#wave-ribbon"
              startOffset="0"
              textLength={length * 2}
              lengthAdjust="spacing"
            >
              {PHRASE + PHRASE}
              {animated && (
                <animate
                  attributeName="startOffset"
                  from="0"
                  to={-length}
                  dur="34s"
                  repeatCount="indefinite"
                />
              )}
            </textPath>
          </text>
        )}

        {/* Vague blanche */}
        <path d={WHITE} fill="#ffffff" />
      </svg>
    </div>
  )
}
