import { useEffect, useRef } from 'react'
import type { MouseEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import useMobile from '../../hooks/useMobile'
import type { ProjectMeta } from './projectMeta'

type ProjectCardProps = {
  project: ProjectMeta
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const animationFrameRef = useRef<number | null>(null)
  const pointerTargetRef = useRef({ rotateX: 0, rotateY: 0 })
  const navigate = useNavigate()
  const isMobile = useMobile()

  useEffect(() => {
    return () => {
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  const applyTilt = () => {
    const element = cardRef.current
    if (!element || isMobile) {
      return
    }

    const { rotateX, rotateY } = pointerTargetRef.current
    element.style.transform = `perspective(1100px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`
    animationFrameRef.current = null
  }

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

    pointerTargetRef.current = { rotateX, rotateY }

    if (animationFrameRef.current === null) {
      animationFrameRef.current = window.requestAnimationFrame(applyTilt)
    }
  }

  const resetCard = () => {
    const element = cardRef.current
    if (!element) {
      return
    }

    if (animationFrameRef.current !== null) {
      window.cancelAnimationFrame(animationFrameRef.current)
      animationFrameRef.current = null
    }

    element.style.transform = 'perspective(1100px) rotateX(0deg) rotateY(0deg) scale(1)'
  }

  return (
    <article
      ref={cardRef}
      onMouseMove={isMobile ? undefined : handleMouseMove}
      onMouseLeave={resetCard}
      onClick={() => navigate(`/projects/${project.id}`)}
      className="group cursor-pointer rounded-2xl border border-white/15 bg-white/5 p-7 backdrop-blur-2xl transition duration-200 hover:border-neonCyan/50 hover:bg-neonCyan/10"
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          navigate(`/projects/${project.id}`)
        }
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-neonBlue/10 via-transparent to-neonGreen/10 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

      <div className="relative z-10">
        <p className="font-body text-xs uppercase tracking-[0.26em] text-neonGreen">Engineering Story</p>
        <h3 className="mt-2 font-display text-3xl font-bold text-white">{project.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-slate-200">{project.tagline}</p>
        <div className="mt-4 flex items-center gap-2">
          <span className="rounded-md border border-neonBlue/35 bg-neonBlue/10 px-2.5 py-1 text-[11px] uppercase tracking-[0.2em] text-neonBlue">{project.category}</span>
          <span className="rounded-md border border-white/15 bg-black/25 px-2.5 py-1 text-[11px] uppercase tracking-[0.2em] text-slate-300">{project.tier.replace('-', ' ')}</span>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.tech.map((item) => (
            <span key={`${project.id}-${item}`} className="rounded-md border border-white/10 bg-black/25 px-2.5 py-1 text-xs font-semibold text-slate-200">
              {item}
            </span>
          ))}
        </div>

        <p className="mt-5 text-sm font-semibold text-neonCyan">Decision focus: {project.highlight}</p>
        <p className="mt-3 text-sm text-slate-300">{project.summary}</p>

        <p className="mt-6 inline-flex items-center text-sm font-semibold text-white transition-colors duration-200 group-hover:text-neonGreen">
          Explore Architecture
        </p>
      </div>
    </article>
  )
}
