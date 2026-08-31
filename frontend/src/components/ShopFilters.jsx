/** Colonne de filtres de la boutique. */
export default function ShopFilters({
  filters,
  update,
  toggle,
  genders,
  families,
  bounds,
  onReset,
}) {
  return (
    <aside className="lg:sticky lg:top-24 lg:self-start">
      {/* Recherche */}
      <div className="relative">
        <input
          type="search"
          value={filters.search}
          onChange={(e) => update({ search: e.target.value })}
          placeholder="Search a name or a note…"
          className="w-full rounded-full border border-ink/20 bg-white py-2.5 pl-10 pr-4 text-[11.5px] text-ink placeholder-ink/40 outline-none transition-colors focus:border-gold"
        />
        <svg
          viewBox="0 0 24 24"
          className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        >
          <circle cx="11" cy="11" r="6.2" />
          <path d="M15.6 15.6 20 20" />
        </svg>
      </div>

      <Group title="Gender">
        {genders.map((g) => (
          <Check
            key={g}
            label={g}
            checked={filters.genders.includes(g)}
            onChange={() => toggle('genders', g)}
          />
        ))}
      </Group>

      <Group title="Olfactive family">
        {families.map((f) => (
          <Check
            key={f}
            label={f}
            checked={filters.families.includes(f)}
            onChange={() => toggle('families', f)}
          />
        ))}
      </Group>

      <Group title="Max price">
        <div className="px-0.5">
          <input
            type="range"
            min={bounds.min}
            max={bounds.max}
            step="1"
            value={filters.maxPrice}
            onChange={(e) => update({ maxPrice: Number(e.target.value) })}
            className="w-full accent-gold"
          />
          <div className="mt-2 flex justify-between text-[10.5px] text-ink-light">
            <span>${bounds.min}</span>
            <span className="font-semibold text-ink">${filters.maxPrice}</span>
          </div>
        </div>
      </Group>

      <button
        onClick={onReset}
        className="caps mt-8 w-full rounded-full border border-ink/20 py-2.5 text-[10px] text-ink-light transition-all hover:border-ink hover:text-ink"
      >
        Reset filters
      </button>
    </aside>
  )
}

function Group({ title, children }) {
  return (
    <div className="mt-8 border-t border-ink/10 pt-6">
      <h3 className="caps text-[10px] text-gold-dark">{title}</h3>
      <div className="mt-4 space-y-2.5">{children}</div>
    </div>
  )
}

function Check({ label, checked, onChange }) {
  return (
    <label className="group flex cursor-pointer items-center gap-3 text-[11.5px] text-ink-light transition-colors hover:text-ink">
      <span
        className={`grid h-4 w-4 shrink-0 place-items-center rounded-[3px] border transition-all ${
          checked ? 'border-gold bg-gold' : 'border-ink/25 group-hover:border-gold/60'
        }`}
      >
        {checked && (
          <svg viewBox="0 0 24 24" className="h-3 w-3 text-ivory" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="m5 12.5 4.5 4.5L19 7" />
          </svg>
        )}
      </span>
      <input type="checkbox" checked={checked} onChange={onChange} className="sr-only" />
      {label}
    </label>
  )
}
