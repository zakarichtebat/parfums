import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import ProductCard from '../components/ProductCard'
import ProductGallery from '../components/ProductGallery'
import Stars from '../components/Stars'
import { useCart } from '../context/CartContext'
import { VOLUMES, findPerfume, getReviews, getSimilar } from '../data/perfumes'

export default function ProductPage() {
  const { slug } = useParams()
  const perfume = findPerfume(slug)

  const [volume, setVolume] = useState(30)
  const [quantity, setQuantity] = useState(1)
  const [liked, setLiked] = useState(false)
  const [added, setAdded] = useState(false)
  const { addItem } = useCart()

  const reviews = useMemo(() => (perfume ? getReviews(perfume) : []), [perfume])
  const similar = useMemo(() => (perfume ? getSimilar(perfume) : []), [perfume])

  if (!perfume) {
    return (
      <>
        <PageHeader title="Fragrance not found" crumbs={[{ label: 'Shop', to: '/shop' }]} />
        <main className="mx-auto max-w-6xl px-5 pb-32 text-center sm:px-8">
          <Link
            to="/shop"
            className="caps rounded-full border border-ink/25 px-8 py-3 text-[10px] text-ink transition-all hover:border-ink hover:bg-ink hover:text-ivory"
          >
            Back to the collection
          </Link>
        </main>
      </>
    )
  }

  const factor = VOLUMES.find((v) => v.ml === volume)?.factor ?? 1
  const price = perfume.price * factor
  const oldPrice = perfume.old_price ? perfume.old_price * factor : 0
  const discount =
    oldPrice > 0 ? Math.round(((oldPrice - price) / oldPrice) * 100 / 5) * 5 : 0

  const handleAdd = () => {
    addItem(perfume, { volume, quantity, unitPrice: price })
    setAdded(true)
    setTimeout(() => setAdded(false), 1600)
  }

  return (
    <>
      <PageHeader
        title={perfume.name}
        crumbs={[{ label: 'Shop', to: '/shop' }, { label: perfume.name }]}
      />

      <main className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <ProductGallery images={perfume.gallery} name={perfume.name} />

          {/* Colonne achat */}
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="caps rounded-full border border-gold/50 px-3 py-1 text-[9.5px] text-gold-dark">
                {perfume.family}
              </span>
              <span className="caps rounded-full border border-ink/15 px-3 py-1 text-[9.5px] text-ink-light">
                {perfume.gender}
              </span>
              {perfume.is_new && (
                <span className="caps rounded-full bg-gold px-3 py-1 text-[9.5px] text-ivory">
                  New
                </span>
              )}
            </div>

            <h2 className="caps mt-5 text-[22px] text-ink sm:text-[26px]">
              {perfume.name}
            </h2>

            <div className="mt-3 flex items-center gap-3">
              <Stars value={perfume.rating} size={14} />
              <span className="text-[11.5px] text-ink-light">
                {perfume.rating.toFixed(1)} · {perfume.reviews_count} reviews
              </span>
            </div>

            <div className="mt-6 flex items-baseline gap-3">
              <span className="font-display text-[30px] leading-none text-ink">
                ${price.toFixed(2)}
              </span>
              {oldPrice > 0 && (
                <>
                  <span className="text-[14px] text-ink/40 line-through">
                    ${oldPrice.toFixed(2)}
                  </span>
                  <span className="rounded-full bg-gold/15 px-2.5 py-1 text-[10px] font-semibold text-gold-dark">
                    -{discount}%
                  </span>
                </>
              )}
            </div>

            <p className="mt-6 max-w-lg text-[12.5px] leading-[1.9] text-ink-light">
              {perfume.description}
            </p>

            {/* Contenance */}
            <div className="mt-8">
              <span className="caps text-[10px] text-gold-dark">Volume</span>
              <div className="mt-3 flex gap-3">
                {VOLUMES.map((v) => (
                  <button
                    key={v.ml}
                    onClick={() => setVolume(v.ml)}
                    className={`rounded-full border px-5 py-2.5 text-[11px] transition-all ${
                      volume === v.ml
                        ? 'border-gold bg-gold/12 text-ink'
                        : 'border-ink/20 text-ink-light hover:border-gold/60 hover:text-ink'
                    }`}
                  >
                    {v.ml} ml
                  </button>
                ))}
              </div>
            </div>

            {/* Quantite */}
            <div className="mt-7">
              <span className="caps text-[10px] text-gold-dark">Quantity</span>
              <div className="mt-3 inline-flex items-center rounded-full border border-ink/20 bg-white">
                <Stepper onClick={() => setQuantity((q) => Math.max(1, q - 1))} label="Moins">
                  −
                </Stepper>
                <span className="w-10 text-center text-[12px] font-semibold text-ink">
                  {quantity}
                </span>
                <Stepper onClick={() => setQuantity((q) => Math.min(10, q + 1))} label="Plus">
                  +
                </Stepper>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-9 flex flex-wrap gap-3">
              <button
                onClick={handleAdd}
                className="caps group relative flex-1 overflow-hidden rounded-full bg-gradient-to-b from-gold-light to-gold-soft px-8 py-3.5 text-[10.5px] text-ink shadow-sm transition-all hover:from-gold hover:to-gold-dark hover:text-ivory active:scale-[0.98]"
              >
                <span className="relative z-10">
                  {added ? '✓ Added to cart' : 'Add to cart'}
                </span>
                <span className="absolute inset-y-0 -left-full w-1/3 bg-white/45 blur-sm group-hover:animate-shine" />
              </button>

              <button
                onClick={handleAdd}
                className="caps flex-1 rounded-full bg-ink px-8 py-3.5 text-[10.5px] text-ivory transition-all hover:bg-ink-light active:scale-[0.98]"
              >
                Buy now
              </button>

              <button
                onClick={() => setLiked((v) => !v)}
                aria-pressed={liked}
                aria-label="Ajouter aux favoris"
                className="grid h-[46px] w-[46px] place-items-center rounded-full border border-ink/20 transition-all hover:border-gold"
              >
                <svg
                  viewBox="0 0 24 24"
                  className={`h-5 w-5 transition-colors ${
                    liked ? 'fill-gold stroke-gold' : 'fill-none stroke-ink/60'
                  }`}
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 20s-7-4.4-7-9a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 4.6-7 9-7 9Z" />
                </svg>
              </button>
            </div>

            <p className="mt-5 text-[10.5px] text-ink/45">
              Free delivery over $60 · Complimentary 2 ml sample with every order
            </p>
          </div>
        </div>

        {/* Pyramide olfactive */}
        <section className="mt-20 rounded-3xl border border-ink/10 bg-white p-8 sm:p-12">
          <h3 className="caps text-center text-[13px] text-ink">Olfactive pyramid</h3>
          <div className="mx-auto mt-4 h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent" />

          <div className="mt-10 space-y-5">
            <PyramidRow
              level="Top notes"
              hint="The first minutes"
              notes={perfume.notes.top}
              width="w-[55%]"
            />
            <PyramidRow
              level="Heart notes"
              hint="The core, after 30 min"
              notes={perfume.notes.heart}
              width="w-[75%]"
            />
            <PyramidRow
              level="Base notes"
              hint="What stays on the skin"
              notes={perfume.notes.base}
              width="w-full"
            />
          </div>
        </section>

        {/* Informations */}
        <section className="mt-10 rounded-3xl border border-ink/10 bg-sand/50 p-8 sm:p-12">
          <h3 className="caps text-[13px] text-ink">Information</h3>
          <dl className="mt-8 grid gap-x-10 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
            <Info label="Type" value="Fragrance" />
            <Info label="Gender" value={perfume.gender} />
            <Info label="Concentration" value={perfume.concentration} />
            <Info label="Volume" value={`${volume} ml`} />
            <Info label="Longevity" value={perfume.longevity} />
            <Info label="Sillage" value={perfume.sillage} />
          </dl>
        </section>

        {/* Avis clients */}
        <section className="mt-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h3 className="caps text-[13px] text-ink">Customer reviews</h3>
              <div className="mt-3 flex items-center gap-3">
                <Stars value={perfume.rating} size={15} />
                <span className="text-[12px] text-ink-light">
                  {perfume.rating.toFixed(1)} out of 5 · {perfume.reviews_count} reviews
                </span>
              </div>
            </div>
            <button className="caps rounded-full border border-ink/20 px-6 py-2.5 text-[10px] text-ink-light transition-all hover:border-ink hover:text-ink">
              Write a review
            </button>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {reviews.map((review) => (
              <article
                key={review.id}
                className="rounded-2xl border border-ink/10 bg-white p-6"
              >
                <div className="flex items-center justify-between gap-3">
                  <Stars value={review.stars} size={12} />
                  <span className="text-[10.5px] text-ink/45">{review.date}</span>
                </div>
                <h4 className="mt-3 text-[12.5px] font-semibold text-ink">
                  {review.title}
                </h4>
                <p className="mt-2 text-[11.5px] leading-[1.8] text-ink-light">
                  {review.text}
                </p>
                <span className="mt-4 block text-[10.5px] uppercase tracking-[0.12em] text-ink/45">
                  {review.author}
                </span>
              </article>
            ))}
          </div>
        </section>

        {/* Produits similaires */}
        <section className="mt-20">
          <h3 className="caps text-[13px] text-ink">You may also like</h3>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {similar.map((p, i) => (
              <ProductCard key={p.id} perfume={p} dark={i % 2 === 1} />
            ))}
          </div>
        </section>
      </main>
    </>
  )
}

function Stepper({ children, onClick, label }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="grid h-10 w-10 place-items-center text-[15px] text-ink-light transition-colors hover:text-gold-dark"
    >
      {children}
    </button>
  )
}

function PyramidRow({ level, hint, notes, width }) {
  return (
    <div className="flex flex-col items-center">
      <div
        className={`${width} rounded-2xl border border-gold/25 bg-gradient-to-r from-gold/5 via-gold/12 to-gold/5 px-6 py-5 text-center`}
      >
        <span className="caps text-[10px] text-gold-dark">{level}</span>
        <p className="mt-2 text-[12.5px] text-ink">{notes.join(' · ')}</p>
        <span className="mt-1.5 block text-[10px] text-ink/45">{hint}</span>
      </div>
    </div>
  )
}

function Info({ label, value }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-ink/10 pb-3">
      <dt className="text-[10.5px] uppercase tracking-[0.12em] text-ink/50">{label}</dt>
      <dd className="text-[12px] font-medium text-ink">{value}</dd>
    </div>
  )
}
