import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import { SHIPPING_METHODS, useCart } from '../context/CartContext'

export default function CartPage() {
  const cart = useCart()
  const {
    items,
    count,
    subtotal,
    discount,
    promo,
    applyPromo,
    clearPromo,
    shippingId,
    setShippingId,
    shippingCost,
    shippingIsFree,
    total,
    updateQuantity,
    removeItem,
  } = cart

  const [code, setCode] = useState('')
  const [error, setError] = useState('')

  const submitPromo = (e) => {
    e.preventDefault()
    if (applyPromo(code)) {
      setCode('')
      setError('')
    } else {
      setError('This code is not valid.')
    }
  }

  if (count === 0) {
    return (
      <>
        <PageHeader title="Your cart" crumbs={[{ label: 'Cart' }]} />
        <main className="mx-auto max-w-6xl px-5 pb-32 sm:px-8">
          <div className="rounded-3xl border border-dashed border-ink/15 py-24 text-center">
            <p className="caps text-[13px] text-ink">Your cart is empty</p>
            <p className="mx-auto mt-3 max-w-xs text-[11.5px] leading-relaxed text-ink-light">
              Twelve blends are waiting. Start with a discovery size if you are
              unsure.
            </p>
            <Link
              to="/shop"
              className="caps mt-8 inline-block rounded-full bg-ink px-9 py-3 text-[10px] text-ivory transition-colors hover:bg-ink-light"
            >
              Browse the collection
            </Link>
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <PageHeader
        title="Your cart"
        subtitle={`${count} ${count === 1 ? 'item' : 'items'} ready to ship.`}
        crumbs={[{ label: 'Cart' }]}
      />

      <main className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
          {/* Lignes du panier */}
          <div>
            <div className="hidden border-b border-ink/10 pb-3 text-[10px] uppercase tracking-[0.12em] text-ink/45 sm:grid sm:grid-cols-[1fr_110px_100px_28px] sm:gap-4">
              <span>Product</span>
              <span className="text-center">Quantity</span>
              <span className="text-right">Subtotal</span>
              <span />
            </div>

            <ul className="divide-y divide-ink/10">
              {items.map((item) => (
                <li
                  key={item.key}
                  className="grid grid-cols-[80px_1fr] items-center gap-4 py-5 sm:grid-cols-[1fr_110px_100px_28px]"
                >
                  {/* Produit */}
                  <div className="col-span-2 flex items-center gap-4 sm:col-span-1">
                    <Link
                      to={`/product/${item.slug}`}
                      className="h-24 w-20 shrink-0 overflow-hidden rounded-xl border border-ink/10"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </Link>
                    <div className="min-w-0">
                      <Link
                        to={`/product/${item.slug}`}
                        className="caps text-[11px] text-ink transition-colors hover:text-gold-dark"
                      >
                        {item.name}
                      </Link>
                      <p className="mt-1.5 text-[11px] text-ink-light">
                        {item.volume} ml
                      </p>
                      <p className="mt-1 text-[11.5px] font-semibold text-ink">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {/* Quantite */}
                  <div className="flex sm:justify-center">
                    <div className="inline-flex items-center rounded-full border border-ink/20 bg-white">
                      <Step
                        onClick={() => updateQuantity(item.key, item.quantity - 1)}
                        label="Retirer un"
                      >
                        −
                      </Step>
                      <span className="w-8 text-center text-[12px] font-semibold text-ink">
                        {item.quantity}
                      </span>
                      <Step
                        onClick={() => updateQuantity(item.key, item.quantity + 1)}
                        label="Ajouter un"
                      >
                        +
                      </Step>
                    </div>
                  </div>

                  {/* Sous-total */}
                  <span className="text-right font-display text-[15px] text-ink">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>

                  {/* Supprimer */}
                  <button
                    onClick={() => removeItem(item.key)}
                    aria-label={`Supprimer ${item.name}`}
                    className="justify-self-end text-ink/35 transition-colors hover:text-gold-dark"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    >
                      <path d="M6 6l12 12M18 6L6 18" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>

            <Link
              to="/shop"
              className="caps mt-8 inline-flex items-center gap-2 text-[10px] text-ink-light transition-colors hover:text-gold-dark"
            >
              &lsaquo; Continue shopping
            </Link>
          </div>

          {/* Recapitulatif */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-3xl border border-ink/10 bg-white p-7">
              <h2 className="caps text-[12px] text-ink">Order summary</h2>

              {/* Code promo */}
              <form onSubmit={submitPromo} className="mt-6">
                <label className="caps block text-[9.5px] text-gold-dark">
                  Promo code
                </label>
                <div className="mt-2.5 flex gap-2">
                  <input
                    value={code}
                    onChange={(e) => {
                      setCode(e.target.value)
                      setError('')
                    }}
                    placeholder="WELCOME10"
                    className="min-w-0 flex-1 rounded-full border border-ink/20 bg-ivory px-4 py-2.5 text-[11px] uppercase tracking-wider text-ink placeholder-ink/30 outline-none transition-colors focus:border-gold"
                  />
                  <button
                    type="submit"
                    className="caps shrink-0 rounded-full border border-ink/25 px-5 py-2.5 text-[9.5px] text-ink transition-all hover:border-ink hover:bg-ink hover:text-ivory"
                  >
                    Apply
                  </button>
                </div>
                {error && (
                  <p className="mt-2 text-[10.5px] text-red-700/80">{error}</p>
                )}
                {promo && (
                  <div className="mt-3 flex items-center justify-between rounded-full bg-gold/12 px-4 py-2">
                    <span className="text-[10.5px] text-gold-dark">
                      <strong>{promo.code}</strong> · {promo.label}
                    </span>
                    <button
                      onClick={clearPromo}
                      type="button"
                      aria-label="Retirer le code"
                      className="text-gold-dark/60 transition-colors hover:text-gold-dark"
                    >
                      ×
                    </button>
                  </div>
                )}
              </form>

              {/* Livraison */}
              <div className="mt-7 border-t border-ink/10 pt-6">
                <span className="caps text-[9.5px] text-gold-dark">Delivery</span>
                <div className="mt-3 space-y-2">
                  {SHIPPING_METHODS.map((method) => (
                    <label
                      key={method.id}
                      className={`flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3 transition-all ${
                        shippingId === method.id
                          ? 'border-gold bg-gold/8'
                          : 'border-ink/15 hover:border-gold/50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="shipping"
                        checked={shippingId === method.id}
                        onChange={() => setShippingId(method.id)}
                        className="sr-only"
                      />
                      <span
                        className={`grid h-4 w-4 shrink-0 place-items-center rounded-full border transition-colors ${
                          shippingId === method.id ? 'border-gold' : 'border-ink/30'
                        }`}
                      >
                        {shippingId === method.id && (
                          <span className="h-2 w-2 rounded-full bg-gold" />
                        )}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[11px] text-ink">
                          {method.label}
                        </span>
                        <span className="block text-[10px] text-ink/50">
                          {method.hint}
                        </span>
                      </span>
                      <span className="text-[11px] font-semibold text-ink">
                        ${method.price.toFixed(2)}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Totaux */}
              <dl className="mt-7 space-y-3 border-t border-ink/10 pt-6 text-[11.5px]">
                <Row label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
                {discount > 0 && (
                  <Row
                    label={`Discount (${promo.value}%)`}
                    value={`−$${discount.toFixed(2)}`}
                    accent
                  />
                )}
                <Row
                  label="Shipping"
                  value={shippingIsFree ? 'Free' : `$${shippingCost.toFixed(2)}`}
                  accent={shippingIsFree}
                />
              </dl>

              <div className="mt-5 flex items-baseline justify-between border-t border-ink/10 pt-5">
                <span className="caps text-[11px] text-ink">Total</span>
                <span className="font-display text-[24px] leading-none text-ink">
                  ${total.toFixed(2)}
                </span>
              </div>

              <Link
                to="/checkout"
                className="caps group relative mt-7 block overflow-hidden rounded-full bg-gradient-to-b from-gold-light to-gold-soft py-3.5 text-center text-[10.5px] text-ink transition-all hover:from-gold hover:to-gold-dark hover:text-ivory"
              >
                <span className="relative z-10">Proceed to checkout</span>
                <span className="absolute inset-y-0 -left-full w-1/3 bg-white/45 blur-sm group-hover:animate-shine" />
              </Link>

              <p className="mt-4 text-center text-[10px] text-ink/45">
                Free standard delivery from $60
              </p>
            </div>
          </aside>
        </div>
      </main>
    </>
  )
}

function Step({ children, onClick, label }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="grid h-9 w-9 place-items-center text-[14px] text-ink-light transition-colors hover:text-gold-dark"
    >
      {children}
    </button>
  )
}

function Row({ label, value, accent }) {
  return (
    <div className="flex items-baseline justify-between">
      <dt className="text-ink-light">{label}</dt>
      <dd className={accent ? 'font-semibold text-gold-dark' : 'font-medium text-ink'}>
        {value}
      </dd>
    </div>
  )
}
