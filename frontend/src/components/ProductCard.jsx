import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function ProductCard({ perfume, dark = false }) {
  const { name, slug, price, old_price, rating, image_url, fallback_url, is_on_sale, is_new } =
    perfume
  const { addItem } = useCart()
  const [liked, setLiked] = useState(false)
  const [added, setAdded] = useState(false)

  // Remise arrondie au multiple de 5 le plus proche (badge commercial : "20% off")
  const discount =
    old_price > 0
      ? Math.round(((old_price - price) / old_price) * 100 / 5) * 5
      : 0

  const handleAdd = () => {
    addItem(perfume, { volume: 30, quantity: 1, unitPrice: price })
    setAdded(true)
    setTimeout(() => setAdded(false), 1400)
  }

  return (
    <article
      className={`arch group flex flex-col overflow-hidden pb-5 border border-ink/8 shadow-[0_18px_40px_-26px_rgba(47,42,36,0.45)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_34px_60px_-28px_rgba(47,42,36,0.5)] ${
        dark ? 'bg-sand text-ink' : 'bg-white text-ink'
      }`}
    >
      {/* Visuel */}
      <Link to={`/product/${slug}`} className="arch-media relative m-2.5 block overflow-hidden">
        <img
          src={image_url}
          alt={name}
          loading="lazy"
          onError={(e) => {
            if (fallback_url && e.currentTarget.src !== fallback_url) {
              e.currentTarget.src = fallback_url
            }
          }}
          className="aspect-[3/4] w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
        />

        {/* Voile qui se leve au survol */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <div className="absolute left-0 top-6 flex flex-col gap-1.5">
          {is_on_sale && discount > 0 && (
            <span className="rounded-r-[4px] bg-ink/85 px-2.5 py-1 text-[10px] font-medium text-ivory backdrop-blur-sm">
              {discount}% off
            </span>
          )}
          {is_new && (
            <span className="rounded-r-[4px] bg-gold px-2.5 py-1 text-[10px] font-medium text-ivory">
              New
            </span>
          )}
        </div>

        {/* Coup de coeur */}
        <button
          onClick={(e) => {
            e.preventDefault()
            setLiked((v) => !v)
          }}
          aria-label={liked ? 'Retirer des favoris' : 'Ajouter aux favoris'}
          aria-pressed={liked}
          className="absolute right-3 top-3 grid h-8 w-8 translate-y-2 place-items-center rounded-full bg-white/90 opacity-0 backdrop-blur-sm transition-all duration-300 hover:scale-110 group-hover:translate-y-0 group-hover:opacity-100"
        >
          <svg
            viewBox="0 0 24 24"
            className={`h-4 w-4 transition-colors ${
              liked ? 'fill-gold stroke-gold' : 'fill-none stroke-ink/70'
            }`}
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 20s-7-4.4-7-9a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 4.6-7 9-7 9Z" />
          </svg>
        </button>

        {/* Apercu rapide */}
        <span className="caps pointer-events-none absolute inset-x-3 bottom-3 translate-y-3 rounded-full bg-white/95 py-2 text-center text-[9px] text-ink opacity-0 transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100">
          Quick view
        </span>
      </Link>

      {/* Infos */}
      <div className="flex flex-1 flex-col px-4 pt-1">
        <div className="flex items-start justify-between gap-2">
          <Link to={`/product/${slug}`} className="caps text-[11px] leading-tight transition-colors hover:text-gold-dark">
            {name}
          </Link>
          <span
            className={`flex shrink-0 items-center gap-1 text-[10px] ${
              dark ? 'text-ink/75' : 'text-ink/75'
            }`}
          >
            <Star /> {Number(rating).toFixed(1)}
          </span>
        </div>

        <div className="mt-2 flex items-baseline justify-center gap-2">
          <span className="text-[15px] font-semibold">
            ${Number(price).toFixed(2)}
          </span>
          {old_price > 0 && (
            <span
              className={`text-[11px] line-through ${
                dark ? 'text-ink/45' : 'text-ink/40'
              }`}
            >
              ${Number(old_price).toFixed(2)}
            </span>
          )}
        </div>

        <button
          onClick={handleAdd}
          className="caps group/btn relative mt-3 w-full overflow-hidden rounded-full bg-gradient-to-b from-gold-light to-gold-soft py-2 text-[10px] text-ink shadow-sm transition-all duration-300 hover:from-gold hover:to-gold-dark hover:text-ivory active:scale-[0.97]"
        >
          <span className="relative z-10">
            {added ? '✓ Added' : 'Add to Cart'}
          </span>
          {/* Balayage lumineux au survol */}
          <span className="absolute inset-y-0 -left-full w-1/3 bg-white/45 blur-sm group-hover/btn:animate-shine" />
        </button>
      </div>
    </article>
  )
}

function Star() {
  return (
    <svg viewBox="0 0 24 24" className="h-3 w-3 fill-gold" aria-hidden="true">
      <path d="m12 2.6 2.7 6.1 6.6.6-5 4.4 1.5 6.5L12 16.8 6.2 20.2l1.5-6.5-5-4.4 6.6-.6L12 2.6Z" />
    </svg>
  )
}
