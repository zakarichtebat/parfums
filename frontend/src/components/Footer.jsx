import { useState } from 'react'
import useInView from '../hooks/useInView'

const COLUMNS = [
  { title: 'Shop', links: ['New Arrivals', 'Best Sellers', 'Gift Sets', 'Discovery Kits'] },
  { title: 'Maison', links: ['Our Story', 'Perfumers', 'Sustainability', 'Boutiques'] },
  { title: 'Help', links: ['Shipping', 'Returns', 'Track Order', 'Contact Us'] },
]

export default function Footer() {
  const [ref, inView] = useInView()
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const subscribe = (e) => {
    e.preventDefault()
    if (!email) return
    setSent(true)
    setEmail('')
  }

  return (
    <footer ref={ref} className="relative overflow-hidden bg-night pt-20">
      {/* Voile dore tres discret */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(201,162,39,0.10),transparent_55%)]" />

      <div
        className={`relative mx-auto max-w-6xl px-5 transition-all duration-700 sm:px-8 ${
          inView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
        }`}
      >
        {/* Lettre d'information */}
        <div className="mx-auto max-w-xl text-center">
          <h2 className="caps text-[14px] text-white">Join the Maison</h2>
          <p className="mt-3 text-[12px] leading-relaxed text-white/60">
            Private previews, limited editions and a complimentary sample with your
            first order.
          </p>

          <form onSubmit={subscribe} className="mx-auto mt-7 flex max-w-md gap-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-[12px] text-white placeholder-white/35 outline-none transition-colors focus:border-gold"
            />
            <button
              type="submit"
              className="caps group relative overflow-hidden rounded-full bg-gradient-to-b from-gold-light to-gold-soft px-6 py-2.5 text-[10px] text-night transition-all hover:from-gold hover:to-gold-dark hover:text-white"
            >
              <span className="relative z-10">{sent ? 'Thank you' : 'Subscribe'}</span>
              <span className="absolute inset-y-0 -left-full w-1/3 bg-white/40 blur-sm group-hover:animate-shine" />
            </button>
          </form>
        </div>

        {/* Colonnes de liens */}
        <div className="mt-16 grid gap-10 border-t border-white/10 pt-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <span className="caps text-[13px] text-white">Perfume Shop</span>
            <p className="mt-4 max-w-[240px] text-[11.5px] leading-[1.8] text-white/50">
              Rare fragrances, sourced and bottled with the patience the craft
              deserves.
            </p>
            <div className="mt-6 flex gap-3">
              {['Instagram', 'Pinterest', 'TikTok'].map((network) => (
                <a
                  key={network}
                  href="#"
                  aria-label={network}
                  className="grid h-9 w-9 place-items-center rounded-full border border-white/20 text-white/70 transition-all hover:-translate-y-0.5 hover:border-gold hover:text-gold-light"
                >
                  <span className="text-[10px]">{network[0]}</span>
                </a>
              ))}
            </div>
          </div>

          {COLUMNS.map((column) => (
            <div key={column.title}>
              <span className="caps text-[11px] text-gold-light">{column.title}</span>
              <ul className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="group inline-flex items-center gap-2 text-[11.5px] text-white/55 transition-colors hover:text-white"
                    >
                      <span className="h-px w-0 bg-gold transition-all duration-300 group-hover:w-3" />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 py-7 sm:flex-row">
          <p className="text-[10.5px] text-white/40">
            © {new Date().getFullYear()} Perfume Shop. All rights reserved.
          </p>
          <div className="flex gap-6 text-[10.5px] text-white/40">
            <a href="#" className="transition-colors hover:text-gold-light">Privacy</a>
            <a href="#" className="transition-colors hover:text-gold-light">Terms</a>
            <a href="#" className="transition-colors hover:text-gold-light">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
