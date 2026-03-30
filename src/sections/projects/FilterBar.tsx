import type { KeyboardEvent } from 'react'

type FilterBarProps = {
  active: string
  categories: string[]
  setActive: (value: string) => void
}

export default function FilterBar({ active, categories, setActive }: FilterBarProps) {
  const toPanelId = (value: string) => `projects-panel-${value.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const currentIndex = categories.findIndex((category) => category === active)

    if (event.key === 'ArrowRight') {
      event.preventDefault()
      const nextIndex = (currentIndex + 1) % categories.length
      setActive(categories[nextIndex])
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      const nextIndex = (currentIndex - 1 + categories.length) % categories.length
      setActive(categories[nextIndex])
    }

    if (event.key === 'Home') {
      event.preventDefault()
      setActive(categories[0])
    }

    if (event.key === 'End') {
      event.preventDefault()
      setActive(categories[categories.length - 1])
    }
  }

  return (
    <div className="mb-10 flex flex-wrap justify-center gap-3" role="tablist" aria-label="Project categories" onKeyDown={handleKeyDown}>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setActive(category)}
          role="tab"
          aria-selected={active === category}
          aria-controls={toPanelId(category)}
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
