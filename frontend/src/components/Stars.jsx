/** Etoiles de notation, avec demi-etoile via un degrade. */
export default function Stars({ value = 0, size = 12, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-0.5 ${className}`} aria-label={`${value} sur 5`}>
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.max(0, Math.min(1, value - i))
        return (
          <svg
            key={i}
            viewBox="0 0 24 24"
            style={{ width: size, height: size }}
            aria-hidden="true"
          >
            <defs>
              <linearGradient id={`star-${i}-${Math.round(fill * 100)}`}>
                <stop offset={`${fill * 100}%`} stopColor="#b08d2e" />
                <stop offset={`${fill * 100}%`} stopColor="#d8cec0" />
              </linearGradient>
            </defs>
            <path
              fill={`url(#star-${i}-${Math.round(fill * 100)})`}
              d="m12 2.6 2.7 6.1 6.6.6-5 4.4 1.5 6.5L12 16.8 6.2 20.2l1.5-6.5-5-4.4 6.6-.6L12 2.6Z"
            />
          </svg>
        )
      })}
    </span>
  )
}
