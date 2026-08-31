import { Link } from 'react-router-dom'
import Navbar from './Navbar'

/** Bandeau clair reutilise en tete des pages internes. */
export default function PageHeader({ title, subtitle, crumbs = [] }) {
  return (
    <div className="relative bg-gradient-to-b from-ivory-dark to-ivory">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_0%,rgba(176,141,46,0.12),transparent_60%)]" />
      <Navbar />

      <div className="relative mx-auto max-w-6xl px-5 pb-12 pt-12 text-center sm:px-8 sm:pb-16">
        <nav className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.14em] text-ink/45">
          <Link to="/" className="transition-colors hover:text-gold-dark">
            Home
          </Link>
          {crumbs.map((crumb) => (
            <span key={crumb.label} className="flex items-center gap-2">
              <span className="text-ink/25">/</span>
              {crumb.to ? (
                <Link to={crumb.to} className="transition-colors hover:text-gold-dark">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-ink/70">{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>

        <h1 className="caps mt-6 text-[20px] text-ink sm:text-[24px]">{title}</h1>
        <div className="mx-auto mt-5 h-px w-28 bg-gradient-to-r from-transparent via-gold to-transparent" />
        {subtitle && (
          <p className="mx-auto mt-5 max-w-lg text-[12px] leading-[1.8] text-ink-light">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  )
}
