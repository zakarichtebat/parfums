import { useEffect, useState } from 'react'

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3)

/**
 * Fait defiler un nombre de 0 jusqu'a `target` des que `start` passe a true.
 */
export default function useCountUp(target, start, { duration = 1600, decimals = 0 } = {}) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!start) return
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setValue(target)
      return
    }

    let frame = 0
    const t0 = performance.now()
    const tick = (now) => {
      const progress = Math.min((now - t0) / duration, 1)
      setValue(target * easeOutCubic(progress))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [target, start, duration])

  return value.toFixed(decimals)
}
