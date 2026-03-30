import { motion } from 'framer-motion'
import FilterBar from './FilterBar'
import ProjectCard from './ProjectCard'
import projectMeta from './projectMeta'
import useProjectFilter from './useProjectFilter'

export default function ProjectsDashboard() {
  const { activeCategory, setActiveCategory, categories, filteredProjects } = useProjectFilter(projectMeta)
  const activePanelId = `projects-panel-${activeCategory.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`

  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-20 md:px-10">
      <div className="mb-12 text-center">
        <p className="font-body text-xs uppercase tracking-[0.28em] text-neonGreen">Evidence-Led Engineering Work</p>
        <h1 className="mt-2 font-display text-5xl font-bold text-white md:text-6xl">Case Studies That Show How I Think</h1>
        <p className="mx-auto mt-4 max-w-2xl text-slate-300">
          Each project documents the why, architecture decisions, execution details, and measurable outcomes rather than just feature screenshots.
        </p>
      </div>

      <div className="mb-8 grid gap-3 rounded-2xl border border-white/15 bg-black/20 p-5 text-sm text-slate-200 md:grid-cols-3">
        <p className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">1. Problem framing and constraints</p>
        <p className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">2. System and product decisions</p>
        <p className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">3. Reliability, metrics, and outcomes</p>
      </div>

      <FilterBar active={activeCategory} categories={categories} setActive={setActiveCategory} />

      <motion.div
        id={activePanelId}
        layout
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.32 }}
        className="grid gap-8 md:grid-cols-2"
      >
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </motion.div>
    </section>
  )
}
