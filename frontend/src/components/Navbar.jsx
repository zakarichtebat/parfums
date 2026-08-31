import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CartButton } from './StickyNav'
import { useCart } from '../context/CartContext'

const LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/shop' },
  { label: 'About Us', to: '/#about' },
  { label: 'Contact Us', to: '/#contact' },
]

export default function Navbar() {
  const { count: cartCount } = useCart()
  const [active, setActive] = useState('Home')
  const [open, setOpen] = useState(false)

  return (
    <header className="relative z-20 w-full">
      {/* Ligne du haut : compte / logo / recherche + panier */}
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 pt-6 sm:px-8">
        <IconButton label="Mon compte">
          <UserIcon />
        </IconButton>

        <Link
          to="/"
          className="rounded-full border border-ink/20 px-6 py-2 transition-colors hover:border-gold sm:px-9 sm:py-2.5"
        >
          <span className="caps text-[13px] text-ink sm:text-[15px]">
            Perfume Shop
          </span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <IconButton label="Rechercher">
            <SearchIcon />
          </IconButton>
          <CartButton count={cartCount} className="sm:h-10 sm:w-10" />
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            className="ml-1 grid h-9 w-9 place-items-center rounded-full border border-ink/20 text-ink md:hidden"
          >
            <span className="text-lg leading-none">{open ? '×' : '≡'}</span>
          </button>
        </div>
      </div>

      {/* Separateur + navigation principale */}
      <nav className="mx-auto mt-5 max-w-4xl px-5 sm:px-8">
        <div className="border-t border-ink/12" />
        <ul
          className={`${
            open ? 'flex' : 'hidden'
          } flex-col items-center gap-4 py-5 md:flex md:flex-row md:justify-center md:gap-12 lg:gap-20`}
        >
          {LINKS.map((link) => (
            <li key={link.label}>
              <Link
                to={link.to}
                onClick={() => {
                  setActive(link.label)
                  setOpen(false)
                }}
                className={`caps group relative text-[11px] transition-colors sm:text-xs ${
                  active === link.label
                    ? 'text-gold-dark'
                    : 'text-ink-light hover:text-gold-dark'
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1.5 left-0 h-px bg-gold transition-all duration-300 ${
                    active === link.label ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

function IconButton({ children, label }) {
  return (
    <button
      aria-label={label}
      className="grid h-9 w-9 place-items-center rounded-full border border-ink/20 text-ink transition-colors hover:border-gold hover:text-gold-dark sm:h-10 sm:w-10"
    >
      {children}
    </button>
  )
}

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" {...stroke}>
      <circle cx="12" cy="8" r="3.4" />
      <path d="M5 19.5c1.3-3.4 4-5 7-5s5.7 1.6 7 5" />
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" {...stroke}>
      <circle cx="11" cy="11" r="6.2" />
      <path d="M15.6 15.6 20 20" />
    </svg>
  )
}
