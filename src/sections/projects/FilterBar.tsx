type FilterBarProps = {
  active: string
  categories: string[]
  setActive: (value: string) => void
}

export default function FilterBar({ active, categories, setActive }: FilterBarProps) {
  return (
    <div className="mb-10 flex flex-wrap justify-center gap-3">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setActive(category)}
          className={`cursor-pointer rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition-colors duration-200 ${
            active === category
              ? 'border-neonCyan/60 bg-neonCyan/20 text-neonCyan'
              : 'border-white/20 text-slate-200 hover:bg-white/10'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  )
}
