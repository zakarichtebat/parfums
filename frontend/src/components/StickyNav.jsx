import { useEffect, useState } from 'react'

const LINKS = [
  { label: 'Home', href: '#top' },
  { label: 'Shop', href: '#shop' },
  { label: 'About Us', href: '#about' },
  { label: 'Contact Us', href: '#contact' },
]

/**
 * Barre compacte qui descend une fois le hero depasse.
 * Le menu d'origine reste intact en haut de page.
 */
export default function StickyNav({ cartCount = 0 }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 460)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <div className="fixed inset-x-0 top-0 z-50 animate-slideDown border-b border-white/10 bg-night/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:px-8">
        <a href="#" className="caps text-[12px] text-white">
          Perfume Shop
        </a>

        <ul className="hidden items-center gap-10 md:flex">
          {LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="caps group relative text-[10px] text-white/80 transition-colors hover:text-gold-light"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <CartButton count={cartCount} />
      </div>
    </div>
  )
}

export function CartButton({ count = 0, className = '' }) {
  return (
    <button
      aria-label={`Panier, ${count} article(s)`}
      className={`relative grid h-9 w-9 place-items-center rounded-full border border-white/25 text-white transition-colors hover:border-gold hover:text-gold-light ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        className="h-[18px] w-[18px]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 8h12l-1 12H7L6 8Z" />
        <path d="M9.2 8V6.6a2.8 2.8 0 0 1 5.6 0V8" />
      </svg>
      {count > 0 && (
        <span
          key={count}
          className="absolute -right-1 -top-1 grid h-[18px] min-w-[18px] animate-bump place-items-center rounded-full bg-gold px-1 text-[10px] font-semibold text-night"
        >
          {count}
        </span>
      )}
    </button>
  )
}
