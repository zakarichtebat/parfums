export default function ProductCard({ perfume, dark = false, onAddToCart }) {
  const { name, price, old_price, rating, image_url, fallback_url, is_on_sale } =
    perfume
  // Remise arrondie au multiple de 5 le plus proche (badge commercial : "20% off")
  const discount =
    old_price > 0
      ? Math.round(((old_price - price) / old_price) * 100 / 5) * 5
      : 0

  return (
    <article
      className={`arch group flex flex-col overflow-hidden pb-5 shadow-[0_18px_40px_-24px_rgba(22,42,53,0.55)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_28px_55px_-24px_rgba(22,42,53,0.6)] ${
        dark ? 'bg-night text-white' : 'bg-white text-night'
      }`}
    >
      {/* Visuel */}
      <div className="arch-media relative m-2.5 overflow-hidden">
        <img
          src={image_url}
          alt={name}
          loading="lazy"
          onError={(e) => {
            if (fallback_url && e.currentTarget.src !== fallback_url) {
              e.currentTarget.src = fallback_url
            }
          }}
          className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:h-72"
        />
        {is_on_sale && discount > 0 && (
          <span className="absolute left-0 top-6 rounded-r-[4px] bg-night/85 px-2.5 py-1 text-[10px] font-medium text-white backdrop-blur-sm">
            {discount}% off
          </span>
        )}
      </div>

      {/* Infos */}
      <div className="flex flex-1 flex-col px-4 pt-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="caps text-[11px] leading-tight">{name}</h3>
          <span
            className={`flex shrink-0 items-center gap-1 text-[10px] ${
              dark ? 'text-white/85' : 'text-night/75'
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
                dark ? 'text-white/45' : 'text-night/40'
              }`}
            >
              ${Number(old_price).toFixed(2)}
            </span>
          )}
        </div>

        <button
          onClick={() => onAddToCart?.(perfume)}
          className="caps mt-3 w-full rounded-full bg-gradient-to-b from-gold-light to-gold-soft py-2 text-[10px] text-night shadow-sm transition-all hover:from-gold hover:to-gold-dark hover:text-white"
        >
          Add to Cart
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
