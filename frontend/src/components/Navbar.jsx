import { useState } from 'react'
import { CartButton } from './StickyNav'

const LINKS = ['Home', 'Shop', 'About Us', 'Contact Us']

export default function Navbar({ cartCount = 0 }) {
  const [active, setActive] = useState('Home')
  const [open, setOpen] = useState(false)

  return (
    <header className="relative z-20 w-full">
      {/* Ligne du haut : compte / logo / recherche + panier */}
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 pt-6 sm:px-8">
        <IconButton label="Mon compte">
          <UserIcon />
        </IconButton>

        <a
          href="#"
          className="rounded-full border border-white/25 px-6 py-2 sm:px-9 sm:py-2.5"
        >
          <span className="caps text-[13px] text-white sm:text-[15px]">
            Perfume Shop
          </span>
        </a>

        <div className="flex items-center gap-2 sm:gap-3">
          <IconButton label="Rechercher">
            <SearchIcon />
          </IconButton>
          <CartButton count={cartCount} className="sm:h-10 sm:w-10" />
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            className="ml-1 grid h-9 w-9 place-items-center rounded-full border border-white/25 text-white md:hidden"
          >
            <span className="text-lg leading-none">{open ? '×' : '≡'}</span>
          </button>
        </div>
      </div>

      {/* Separateur + navigation principale */}
      <nav className="mx-auto mt-5 max-w-4xl px-5 sm:px-8">
        <div className="border-t border-white/15" />
        <ul
          className={`${
            open ? 'flex' : 'hidden'
          } flex-col items-center gap-4 py-5 md:flex md:flex-row md:justify-center md:gap-12 lg:gap-20`}
        >
          {LINKS.map((link) => (
            <li key={link}>
              <a
                href="#"
                onClick={() => {
                  setActive(link)
                  setOpen(false)
                }}
                className={`caps group relative text-[11px] transition-colors sm:text-xs ${
                  active === link
                    ? 'text-gold-light'
                    : 'text-white/80 hover:text-gold-light'
                }`}
              >
                {link}
                <span
                  className={`absolute -bottom-1.5 left-0 h-px bg-gold transition-all duration-300 ${
                    active === link ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </a>
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
      className="grid h-9 w-9 place-items-center rounded-full border border-white/25 text-white transition-colors hover:border-gold hover:text-gold-light sm:h-10 sm:w-10"
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
