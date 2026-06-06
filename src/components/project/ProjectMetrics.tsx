import { memo } from 'react'
import type { ProjectCaseStudy } from '../../sections/projects/projectDetails'

type ProjectMetricsProps = {
  metrics: ProjectCaseStudy['metrics']
}

const toneClassMap = {
  cyan: 'text-neonCyan',
  green: 'text-neonGreen',
  blue: 'text-neonBlue',
} as const

function ProjectMetricsComponent({ metrics }: ProjectMetricsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {metrics.map((metric) => (
        <article key={metric.title} className="rounded-xl border border-white/10 bg-black/25 p-5 text-center">
          <h3 className={`break-words font-display text-xl font-bold sm:text-2xl ${toneClassMap[metric.tone]}`}>{metric.title}</h3>
          <p className="mt-2 text-sm text-slate-300">{metric.description}</p>
        </article>
      ))}
    </div>
  )
}

const ProjectMetrics = memo(ProjectMetricsComponent)

export default ProjectMetrics
