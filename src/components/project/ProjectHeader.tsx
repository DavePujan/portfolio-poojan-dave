import type { ProjectCaseStudy } from '../../sections/projects/projectDetails'

type ProjectHeaderProps = {
  project: ProjectCaseStudy
}

export default function ProjectHeader({ project }: ProjectHeaderProps) {
  return (
    <section className="rounded-2xl border border-white/15 bg-white/5 p-8 backdrop-blur-xl md:p-10">
      <p className="font-body text-xs uppercase tracking-[0.28em] text-neonGreen">Deep-Dive Case Study</p>
      <h1 className="mt-2 font-display text-5xl font-bold text-white md:text-6xl">{project.title}</h1>
      <p className="mt-4 text-xl text-slate-200">{project.tagline}</p>
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
            className="cursor-pointer rounded-lg border border-neonCyan/45 bg-neonCyan/15 px-5 py-2.5 text-sm font-semibold text-neonCyan transition-colors duration-200 hover:bg-neonCyan/25"
          >
            View GitHub
          </a>
        )}
        {project.links.liveUrl && (
          <a
            href={project.links.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="cursor-pointer rounded-lg border border-neonGreen/45 bg-neonGreen/15 px-5 py-2.5 text-sm font-semibold text-neonGreen transition-colors duration-200 hover:bg-neonGreen/25"
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
