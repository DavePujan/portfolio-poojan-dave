import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { useScene } from '../context/useScene'
import ProjectsDashboard from '../sections/projects/ProjectsDashboard'

export default function Projects() {
  const { setActiveSection, setCameraMode, setInteraction } = useScene()

  useEffect(() => {
    setActiveSection('projects')
    setCameraMode('focus')
    setInteraction('idle')
  }, [setActiveSection, setCameraMode, setInteraction])

  return (
    <main className="min-h-screen bg-ink bg-mesh text-slate-100">
      <motion.section
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="mx-auto w-full max-w-7xl px-6 pb-8 pt-16 md:px-10"
      >
        <div className="rounded-2xl border border-white/15 bg-white/5 p-7 backdrop-blur-xl md:p-8">
          <p className="text-xs uppercase tracking-[0.24em] text-neonCyan">Project Intelligence Layer</p>
          <h1 className="mt-2 font-display text-4xl font-bold text-white md:text-5xl">Architecture-First Case Studies</h1>
          <p className="mt-3 max-w-3xl text-slate-300">
            This page is intentionally built as an engineering dashboard: each card focuses on system constraints, reliability decisions, and measurable outcomes.
          </p>
        </div>
      </motion.section>

      <ProjectsDashboard />

      <div className="mx-auto w-full max-w-7xl px-6 pb-16 md:px-10">
        <Link
          to="/"
          className="inline-flex cursor-pointer items-center rounded-lg border border-neonCyan/40 bg-neonCyan/10 px-5 py-2.5 text-sm font-semibold text-neonCyan transition-colors duration-200 hover:bg-neonCyan/20"
        >
          Back To Home
        </Link>
      </div>
    </main>
  )
}
