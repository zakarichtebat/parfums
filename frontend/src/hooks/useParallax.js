import { useEffect, useRef, useState } from 'react'

/**
 * Deplace legerement un element au defilement (effet de profondeur).
 * `strength` = amplitude en pixels.
 */
export default function useParallax(strength = 40) {
  const ref = useRef(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return

    let frame = 0
    const update = () => {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      // -1 quand l'element arrive par le bas, +1 quand il sort par le haut
      const progress =
        (rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight
      setOffset(-progress * strength)
    }
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [strength])

  return [ref, offset]
}
