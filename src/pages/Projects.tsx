import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useScene } from '../context/useScene'
import ProjectsDashboard from '../sections/projects/ProjectsDashboard'

export default function Projects() {
  const { setActiveSection } = useScene()

  useEffect(() => {
    setActiveSection('projects')
  }, [setActiveSection])

  return (
    <main className="min-h-screen bg-ink bg-mesh text-slate-100">
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
