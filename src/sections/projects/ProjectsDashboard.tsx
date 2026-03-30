import { motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import FilterBar from './FilterBar'
import ProjectCard from './ProjectCard'
import projects from './projectData'

export default function ProjectsDashboard() {
  const [activeCategory, setActiveCategory] = useState('All')

  const categories = useMemo(() => {
    const set = new Set<string>(['All'])
    projects.forEach((project) => set.add(project.category))
    return [...set]
  }, [])

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') {
      return projects
    }

    return projects.filter((project) => project.category === activeCategory)
  }, [activeCategory])

  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-20 md:px-10">
      <div className="mb-12 text-center">
        <p className="font-body text-xs uppercase tracking-[0.28em] text-neonGreen">Portfolio Products</p>
        <h1 className="mt-2 font-display text-5xl font-bold text-white md:text-6xl">Projects Dashboard</h1>
        <p className="mx-auto mt-4 max-w-2xl text-slate-300">
          Product-first case studies designed to communicate engineering depth, architecture clarity, and business impact.
        </p>
      </div>

      <FilterBar active={activeCategory} categories={categories} setActive={setActiveCategory} />

      <motion.div
        layout
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="grid gap-8 md:grid-cols-2"
      >
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </motion.div>
    </section>
  )
}
