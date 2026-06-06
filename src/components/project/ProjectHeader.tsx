import type { ProjectCaseStudy } from '../../sections/projects/projectDetails'

type ProjectHeaderProps = {
  project: ProjectCaseStudy
}

export default function ProjectHeader({ project }: ProjectHeaderProps) {
  return (
    <section className="rounded-2xl border border-white/15 bg-white/5 p-5 backdrop-blur-xl sm:p-8 md:p-10">
      <p className="font-body text-[11px] uppercase tracking-[0.2em] text-neonGreen sm:text-xs sm:tracking-[0.28em]">Deep-Dive Case Study</p>
      <h1 className="mt-2 break-words font-display text-3xl font-bold text-white sm:text-4xl md:text-6xl">{project.title}</h1>
      <p className="mt-4 text-base text-slate-200 sm:text-xl">{project.tagline}</p>
      <p className="mt-5 max-w-4xl text-slate-300">{project.overview}</p>

      <div className="mt-6 grid gap-3 md:grid-cols-2">
        <article className="rounded-lg border border-white/10 bg-black/25 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-300">Problem Framing</p>
          <p className="mt-2 text-sm text-slate-200">{project.summary}</p>
        </article>
        <article className="rounded-lg border border-white/10 bg-black/25 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-300">Primary Engineering Decision</p>
          <p className="mt-2 text-sm text-neonCyan">{project.highlight}</p>
        </article>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        {project.links.repoUrl && (
          <a
            href={project.links.repoUrl}
            target="_blank"
            rel="noreferrer"
            className="touch-target inline-flex w-full cursor-pointer items-center justify-center rounded-lg border border-neonCyan/45 bg-neonCyan/15 px-5 py-3 text-sm font-semibold text-neonCyan transition-colors duration-200 hover:bg-neonCyan/25 sm:w-auto"
          >
            View GitHub
          </a>
        )}
        {project.links.liveUrl && (
          <a
            href={project.links.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="touch-target inline-flex w-full cursor-pointer items-center justify-center rounded-lg border border-neonGreen/45 bg-neonGreen/15 px-5 py-3 text-sm font-semibold text-neonGreen transition-colors duration-200 hover:bg-neonGreen/25 sm:w-auto"
          >
            Live Demo
          </a>
        )}
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {project.tech.map((tech) => (
          <span key={`${project.id}-${tech}`} className="rounded-md border border-white/10 bg-black/25 px-3 py-1 text-xs font-semibold text-slate-100">
            {tech}
          </span>
        ))}
      </div>
    </section>
  )
}
