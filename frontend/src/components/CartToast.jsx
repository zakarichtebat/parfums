import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

/**
 * Confirmation qui glisse depuis la droite a chaque ajout au panier,
 * puis disparait au bout de quelques secondes.
 */
export default function CartToast() {
  const { lastAdded, count } = useCart()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!lastAdded) return
    setVisible(true)
    const timer = setTimeout(() => setVisible(false), 3600)
    return () => clearTimeout(timer)
  }, [lastAdded])

  if (!lastAdded || !visible) return null

  return (
    <div
      key={lastAdded.stamp}
      role="status"
      className="fixed right-4 top-20 z-[60] w-[300px] animate-slideInRight rounded-2xl border border-ink/10 bg-white p-4 shadow-[0_24px_50px_-24px_rgba(47,42,36,0.55)] sm:right-6"
    >
      <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-gold-dark">
        <span className="grid h-4 w-4 place-items-center rounded-full bg-gold text-[9px] text-ivory">
          ✓
        </span>
        Added to cart
      </div>

      <div className="mt-3 flex gap-3">
        <img
          src={lastAdded.image}
          alt=""
          className="h-16 w-14 shrink-0 rounded-lg object-cover"
        />
        <div className="min-w-0 flex-1">
          <p className="caps truncate text-[10.5px] text-ink">{lastAdded.name}</p>
          <p className="mt-1 text-[10.5px] text-ink-light">
            {lastAdded.volume} ml · ×{lastAdded.quantity}
          </p>
          <p className="mt-1 text-[12px] font-semibold text-ink">
            ${(lastAdded.price * lastAdded.quantity).toFixed(2)}
          </p>
        </div>
      </div>

      <Link
        to="/cart"
        onClick={() => setVisible(false)}
        className="caps mt-4 block rounded-full bg-ink py-2.5 text-center text-[9.5px] text-ivory transition-colors hover:bg-ink-light"
      >
        View cart ({count})
      </Link>
    </div>
  )
}
