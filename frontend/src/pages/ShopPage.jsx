import { useMemo, useState } from 'react'
import PageHeader from '../components/PageHeader'
import ProductCard from '../components/ProductCard'
import ShopFilters from '../components/ShopFilters'
import { FAMILIES, GENDERS, MOCK_PERFUMES, PRICE_BOUNDS } from '../data/perfumes'

const SORTS = [
  { id: 'popular', label: 'Popularity' },
  { id: 'new', label: 'New arrivals' },
  { id: 'price-asc', label: 'Price: low to high' },
  { id: 'price-desc', label: 'Price: high to low' },
]

const PER_PAGE = 8

const EMPTY_FILTERS = {
  search: '',
  genders: [],
  families: [],
  maxPrice: PRICE_BOUNDS.max,
}

export default function ShopPage() {
  const [filters, setFilters] = useState(EMPTY_FILTERS)
  const [sort, setSort] = useState('popular')
  const [page, setPage] = useState(1)

  // Toute modification de filtre ou de tri ramene a la premiere page.
  const update = (patch) => {
    setFilters((f) => ({ ...f, ...patch }))
    setPage(1)
  }

  const toggle = (key, value) =>
    update({
      [key]: filters[key].includes(value)
        ? filters[key].filter((v) => v !== value)
        : [...filters[key], value],
    })

  const results = useMemo(() => {
    const needle = filters.search.trim().toLowerCase()

    const filtered = MOCK_PERFUMES.filter((p) => {
      if (filters.genders.length && !filters.genders.includes(p.gender)) return false
      if (filters.families.length && !filters.families.includes(p.family)) return false
      if (p.price > filters.maxPrice) return false
      if (!needle) return true
      // La recherche couvre le nom, la famille et les notes olfactives.
      const haystack = [
        p.name,
        p.family,
        p.gender,
        p.concentration,
        ...p.notes.top,
        ...p.notes.heart,
        ...p.notes.base,
      ]
        .join(' ')
        .toLowerCase()
      return haystack.includes(needle)
    })

    const sorted = [...filtered]
    if (sort === 'price-asc') sorted.sort((a, b) => a.price - b.price)
    else if (sort === 'price-desc') sorted.sort((a, b) => b.price - a.price)
    else if (sort === 'new')
      sorted.sort(
        (a, b) => Number(b.is_new) - Number(a.is_new) || b.popularity - a.popularity
      )
    else sorted.sort((a, b) => b.popularity - a.popularity)

    return sorted
  }, [filters, sort])

  const pageCount = Math.max(1, Math.ceil(results.length / PER_PAGE))
  const current = Math.min(page, pageCount)
  const visible = results.slice((current - 1) * PER_PAGE, current * PER_PAGE)

  const activeChips = [
    ...filters.genders.map((v) => ({ label: v, clear: () => toggle('genders', v) })),
    ...filters.families.map((v) => ({ label: v, clear: () => toggle('families', v) })),
    ...(filters.maxPrice < PRICE_BOUNDS.max
      ? [
          {
            label: `Under $${filters.maxPrice}`,
            clear: () => update({ maxPrice: PRICE_BOUNDS.max }),
          },
        ]
      : []),
    ...(filters.search
      ? [{ label: `"${filters.search}"`, clear: () => update({ search: '' }) }]
      : []),
  ]

  return (
    <>
      <PageHeader
        title="The Collection"
        subtitle="Twelve blends, each rested for months before bottling. Filter by family, gender or budget to find yours."
        crumbs={[{ label: 'Shop' }]}
      />

      <main className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[240px_1fr]">
          <ShopFilters
            filters={filters}
            update={update}
            toggle={toggle}
            genders={GENDERS}
            families={FAMILIES}
            bounds={PRICE_BOUNDS}
            onReset={() => {
              setFilters(EMPTY_FILTERS)
              setPage(1)
            }}
          />

          <div>
            {/* Barre de resultats + tri */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-ink/10 pb-4">
              <p className="text-[11.5px] text-ink-light">
                <span className="font-semibold text-ink">{results.length}</span>{' '}
                {results.length === 1 ? 'fragrance' : 'fragrances'}
              </p>

              <label className="flex items-center gap-3 text-[11px] text-ink-light">
                <span className="uppercase tracking-[0.12em]">Sort by</span>
                <select
                  value={sort}
                  onChange={(e) => {
                    setSort(e.target.value)
                    setPage(1)
                  }}
                  className="rounded-full border border-ink/20 bg-white px-4 py-2 text-[11px] text-ink outline-none transition-colors focus:border-gold"
                >
                  {SORTS.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {/* Filtres actifs */}
            {activeChips.length > 0 && (
              <div className="mt-4 flex flex-wrap items-center gap-2">
                {activeChips.map((chip) => (
                  <button
                    key={chip.label}
                    onClick={chip.clear}
                    className="group flex items-center gap-2 rounded-full border border-ink/15 bg-white px-3 py-1.5 text-[10.5px] text-ink-light transition-colors hover:border-gold hover:text-ink"
                  >
                    {chip.label}
                    <span className="text-ink/35 transition-colors group-hover:text-gold-dark">
                      ×
                    </span>
                  </button>
                ))}
              </div>
            )}

            {/* Grille */}
            {visible.length === 0 ? (
              <div className="mt-16 rounded-2xl border border-dashed border-ink/15 py-20 text-center">
                <p className="caps text-[12px] text-ink">Nothing matches yet</p>
                <p className="mx-auto mt-3 max-w-xs text-[11.5px] leading-relaxed text-ink-light">
                  Try widening the price range or clearing a filter.
                </p>
              </div>
            ) : (
              <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 xl:grid-cols-3">
                {visible.map((perfume, i) => (
                  <div
                    key={perfume.id}
                    style={{ animationDelay: `${i * 70}ms` }}
                    className="animate-fadeUp"
                  >
                    <ProductCard perfume={perfume} dark={i % 3 === 1} />
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {pageCount > 1 && (
              <nav className="mt-14 flex items-center justify-center gap-2">
                <PageButton
                  disabled={current === 1}
                  onClick={() => setPage(current - 1)}
                  label="Page precedente"
                >
                  &lsaquo;
                </PageButton>

                {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
                  <PageButton
                    key={n}
                    active={n === current}
                    onClick={() => setPage(n)}
                    label={`Page ${n}`}
                  >
                    {n}
                  </PageButton>
                ))}

                <PageButton
                  disabled={current === pageCount}
                  onClick={() => setPage(current + 1)}
                  label="Page suivante"
                >
                  &rsaquo;
                </PageButton>
              </nav>
            )}
          </div>
        </div>
      </main>
    </>
  )
}

function PageButton({ children, onClick, active, disabled, label }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      aria-current={active || undefined}
      className={`grid h-9 min-w-[36px] place-items-center rounded-full border px-3 text-[11px] transition-all ${
        active
          ? 'border-gold bg-gold text-ivory'
          : 'border-ink/15 bg-white text-ink-light hover:border-gold hover:text-ink'
      } ${disabled ? 'cursor-not-allowed opacity-35' : ''}`}
    >
      {children}
    </button>
  )
}
