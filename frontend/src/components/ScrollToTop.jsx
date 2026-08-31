import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Remet la page en haut a chaque changement d'URL.
 * Si l'URL porte une ancre (#about), on y fait defiler en douceur.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      // On laisse la page se peindre avant de chercher la cible.
      const id = hash.slice(1)
      const timer = setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      }, 80)
      return () => clearTimeout(timer)
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}
