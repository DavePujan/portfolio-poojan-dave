import { useRef } from 'react'
import type { MouseEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import type { ProjectCaseStudy } from './projectData'

type ProjectCardProps = {
  project: ProjectCaseStudy
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const element = cardRef.current
    if (!element) {
      return
    }

    const rect = element.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    const rotateX = (y / rect.height - 0.5) * 10
    const rotateY = (x / rect.width - 0.5) * -10

    element.style.transform = `perspective(1100px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`
  }

  const resetCard = () => {
    const element = cardRef.current
    if (!element) {
      return
    }

    element.style.transform = 'perspective(1100px) rotateX(0deg) rotateY(0deg) scale(1)'
  }

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetCard}
      onClick={() => navigate(`/projects/${project.id}`)}
      className="group cursor-pointer rounded-2xl border border-white/15 bg-white/5 p-7 backdrop-blur-2xl transition duration-300 hover:border-neonCyan/50 hover:bg-neonCyan/10"
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          navigate(`/projects/${project.id}`)
        }
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-neonBlue/10 via-transparent to-neonGreen/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative z-10">
        <p className="font-body text-xs uppercase tracking-[0.26em] text-neonGreen">Case Study</p>
        <h3 className="mt-2 font-display text-3xl font-bold text-white">{project.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-slate-200">{project.tagline}</p>
        <p className="mt-3 text-xs uppercase tracking-[0.2em] text-neonBlue">{project.category}</p>
        <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-slate-400">{project.tier.replace('-', ' ')}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.tech.map((item) => (
            <span key={`${project.id}-${item}`} className="rounded-md border border-white/10 bg-black/25 px-2.5 py-1 text-xs font-semibold text-slate-200">
              {item}
            </span>
          ))}
        </div>

        <p className="mt-5 text-sm font-semibold text-neonCyan">{project.highlight}</p>
        <p className="mt-3 text-sm text-slate-300">{project.summary}</p>

        <p className="mt-6 inline-flex items-center text-sm font-semibold text-white transition-colors duration-200 group-hover:text-neonGreen">
          Open Case Study
        </p>
      </div>
    </article>
  )
}
