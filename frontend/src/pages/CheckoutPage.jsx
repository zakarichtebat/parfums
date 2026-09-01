import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import { SHIPPING_METHODS, useCart } from '../context/CartContext'

const COUNTRIES = [
  'Morocco',
  'France',
  'Belgium',
  'Switzerland',
  'Canada',
  'Spain',
  'United Kingdom',
]

const EMPTY = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  zip: '',
  country: 'Morocco',
}

export default function CheckoutPage() {
  const {
    items,
    count,
    subtotal,
    discount,
    promo,
    shippingId,
    setShippingId,
    shippingCost,
    shippingIsFree,
    total,
    clear,
  } = useCart()

  const [form, setForm] = useState(EMPTY)
  const [placed, setPlaced] = useState(null)

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    // Demonstration : on genere un numero de commande et on vide le panier.
    const reference = `PS-${Date.now().toString().slice(-6)}`
    setPlaced({ reference, total, name: form.firstName })
    clear()
    window.scrollTo(0, 0)
  }

  if (placed) {
    return (
      <>
        <PageHeader title="Order confirmed" crumbs={[{ label: 'Checkout' }]} />
        <main className="mx-auto max-w-2xl px-5 pb-32 text-center sm:px-8">
          <div className="rounded-3xl border border-ink/10 bg-white p-12">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-gold text-[22px] text-ivory">
              &#10003;
            </span>
            <h2 className="caps mt-6 text-[15px] text-ink">
              Thank you{placed.name ? `, ${placed.name}` : ''}
            </h2>
            <p className="mx-auto mt-4 max-w-sm text-[12px] leading-[1.9] text-ink-light">
              Your order <strong className="text-ink">{placed.reference}</strong> is
              confirmed. You will pay ${placed.total.toFixed(2)} in cash when the
              courier hands you the parcel.
            </p>
            <Link
              to="/shop"
              className="caps mt-9 inline-block rounded-full bg-ink px-9 py-3 text-[10px] text-ivory transition-colors hover:bg-ink-light"
            >
              Continue shopping
            </Link>
          </div>
        </main>
      </>
    )
  }

  if (count === 0) {
    return (
      <>
        <PageHeader title="Checkout" crumbs={[{ label: 'Checkout' }]} />
        <main className="mx-auto max-w-6xl px-5 pb-32 sm:px-8">
          <div className="rounded-3xl border border-dashed border-ink/15 py-24 text-center">
            <p className="caps text-[13px] text-ink">Nothing to check out</p>
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
        title="Checkout"
        subtitle="Cash on delivery. No card details are collected on this site."
        crumbs={[{ label: 'Cart', to: '/cart' }, { label: 'Checkout' }]}
      />

      <main className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">
        <form onSubmit={submit} className="grid gap-10 lg:grid-cols-[1fr_360px]">
          <div className="space-y-8">
            {/* Informations client */}
            <section className="rounded-3xl border border-ink/10 bg-white p-7 sm:p-9">
              <Legend step="1" title="Customer information" />

              <div className="mt-7 grid gap-5 sm:grid-cols-2">
                <Field label="First name" value={form.firstName} onChange={set('firstName')} autoComplete="given-name" />
                <Field label="Last name" value={form.lastName} onChange={set('lastName')} autoComplete="family-name" />
                <Field label="Email" type="email" value={form.email} onChange={set('email')} autoComplete="email" />
                <Field label="Phone" type="tel" value={form.phone} onChange={set('phone')} autoComplete="tel" />
                <Field className="sm:col-span-2" label="Address" value={form.address} onChange={set('address')} autoComplete="street-address" />
                <Field label="City" value={form.city} onChange={set('city')} autoComplete="address-level2" />
                <Field label="Postal code" value={form.zip} onChange={set('zip')} autoComplete="postal-code" />

                <label className="sm:col-span-2">
                  <span className="caps block text-[9.5px] text-gold-dark">Country</span>
                  <select
                    value={form.country}
                    onChange={set('country')}
                    className="mt-2 w-full rounded-xl border border-ink/20 bg-ivory px-4 py-3 text-[12px] text-ink outline-none transition-colors focus:border-gold"
                  >
                    {COUNTRIES.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </label>
              </div>
            </section>

            {/* Livraison */}
            <section className="rounded-3xl border border-ink/10 bg-white p-7 sm:p-9">
              <Legend step="2" title="Delivery" />
              <div className="mt-7 space-y-3">
                {SHIPPING_METHODS.map((method) => (
                  <label
                    key={method.id}
                    className={`flex cursor-pointer items-center gap-4 rounded-2xl border px-5 py-4 transition-all ${
                      shippingId === method.id
                        ? 'border-gold bg-gold/8'
                        : 'border-ink/15 hover:border-gold/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="delivery"
                      checked={shippingId === method.id}
                      onChange={() => setShippingId(method.id)}
                      className="sr-only"
                    />
                    <Radio checked={shippingId === method.id} />
                    <span className="min-w-0 flex-1">
                      <span className="block text-[12px] text-ink">{method.label}</span>
                      <span className="block text-[10.5px] text-ink/50">{method.hint}</span>
                    </span>
                    <span className="text-[12px] font-semibold text-ink">
                      ${method.price.toFixed(2)}
                    </span>
                  </label>
                ))}
              </div>
            </section>

            {/* Paiement */}
            <section className="rounded-3xl border border-ink/10 bg-white p-7 sm:p-9">
              <Legend step="3" title="Payment" />
              <label className="mt-7 flex cursor-pointer items-center gap-4 rounded-2xl border border-gold bg-gold/8 px-5 py-4">
                <input type="radio" name="payment" defaultChecked className="sr-only" />
                <Radio checked />
                <span className="min-w-0 flex-1">
                  <span className="block text-[12px] text-ink">Cash on delivery</span>
                  <span className="block text-[10.5px] text-ink/50">
                    Pay the courier when your parcel arrives
                  </span>
                </span>
              </label>
              <p className="mt-4 text-[10.5px] leading-relaxed text-ink/45">
                Card payment is not available yet. Please keep the exact amount ready
                for the courier.
              </p>
            </section>
          </div>

          {/* Resume de commande */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-3xl border border-ink/10 bg-sand/40 p-7">
              <h2 className="caps text-[12px] text-ink">Order summary</h2>

              <ul className="mt-6 space-y-4 border-b border-ink/10 pb-6">
                {items.map((item) => (
                  <li key={item.key} className="flex items-center gap-3">
                    <div className="relative h-16 w-14 shrink-0 overflow-hidden rounded-lg border border-ink/10">
                      <img src={item.image} alt="" className="h-full w-full object-cover" />
                      <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-ink text-[9.5px] text-ivory">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="caps truncate text-[10px] text-ink">{item.name}</p>
                      <p className="mt-1 text-[10.5px] text-ink/50">{item.volume} ml</p>
                    </div>
                    <span className="text-[11.5px] font-semibold text-ink">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>

              <dl className="mt-6 space-y-3 text-[11.5px]">
                <Row label={`Subtotal (${count})`} value={`$${subtotal.toFixed(2)}`} />
                {discount > 0 && (
                  <Row
                    label={`Discount ${promo.code}`}
                    value={`-$${discount.toFixed(2)}`}
                    accent
                  />
                )}
                <Row
                  label="Shipping"
                  value={shippingIsFree ? 'Free' : `$${shippingCost.toFixed(2)}`}
                  accent={shippingIsFree}
                />
                <Row label="Payment" value="Cash on delivery" />
              </dl>

              <div className="mt-6 flex items-baseline justify-between border-t border-ink/10 pt-5">
                <span className="caps text-[11px] text-ink">Total due</span>
                <span className="font-display text-[24px] leading-none text-ink">
                  ${total.toFixed(2)}
                </span>
              </div>

              <button
                type="submit"
                className="caps group relative mt-7 w-full overflow-hidden rounded-full bg-gradient-to-b from-gold-light to-gold-soft py-3.5 text-[10.5px] text-ink transition-all hover:from-gold hover:to-gold-dark hover:text-ivory active:scale-[0.99]"
              >
                <span className="relative z-10">Place order</span>
                <span className="absolute inset-y-0 -left-full w-1/3 bg-white/45 blur-sm group-hover:animate-shine" />
              </button>

              <Link
                to="/cart"
                className="caps mt-4 block text-center text-[9.5px] text-ink-light transition-colors hover:text-gold-dark"
              >
                &lsaquo; Back to cart
              </Link>
            </div>
          </aside>
        </form>
      </main>
    </>
  )
}

function Legend({ step, title }) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid h-7 w-7 place-items-center rounded-full border border-gold text-[11px] text-gold-dark">
        {step}
      </span>
      <h2 className="caps text-[12px] text-ink">{title}</h2>
    </div>
  )
}

function Field({ label, className = '', ...props }) {
  return (
    <label className={className}>
      <span className="caps block text-[9.5px] text-gold-dark">{label}</span>
      <input
        required
        {...props}
        className="mt-2 w-full rounded-xl border border-ink/20 bg-ivory px-4 py-3 text-[12px] text-ink outline-none transition-colors focus:border-gold"
      />
    </label>
  )
}

function Radio({ checked }) {
  return (
    <span
      className={`grid h-4 w-4 shrink-0 place-items-center rounded-full border transition-colors ${
        checked ? 'border-gold' : 'border-ink/30'
      }`}
    >
      {checked && <span className="h-2 w-2 rounded-full bg-gold" />}
    </span>
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
