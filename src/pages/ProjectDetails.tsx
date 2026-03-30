import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { useEffect } from 'react'
import MediaFrame from '../components/ui/MediaFrame'
import { useScene } from '../context/useScene'
import projects from '../sections/projects/projectData'

const toneClassMap = {
  cyan: 'text-neonCyan',
  green: 'text-neonGreen',
  blue: 'text-neonBlue',
} as const

function CaseStudyBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-2xl border border-white/15 bg-white/5 p-7 backdrop-blur-xl md:p-8">
      <h2 className="font-display text-3xl font-bold text-white">{title}</h2>
      <div className="mt-4 text-slate-200">{children}</div>
    </section>
  )
}

export default function ProjectDetails() {
  const { id } = useParams()
  const { setActiveSection } = useScene()
  const project = projects.find((entry) => entry.id === id)

  useEffect(() => {
    setActiveSection('projects')
  }, [setActiveSection])

  if (!project) {
    return (
      <main className="mx-auto flex min-h-screen w-full max-w-4xl items-center justify-center px-6 text-slate-100">
        <div className="rounded-2xl border border-white/15 bg-white/5 p-8 text-center backdrop-blur-xl">
          <h1 className="font-display text-4xl font-bold text-white">Project Not Found</h1>
          <Link
            to="/projects"
            className="mt-6 inline-flex cursor-pointer rounded-lg border border-neonCyan/45 bg-neonCyan/15 px-5 py-2.5 text-sm font-semibold text-neonCyan transition-colors duration-200 hover:bg-neonCyan/25"
          >
            Back To Projects
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="relative bg-ink bg-mesh px-6 py-20 text-slate-100 md:px-10">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45 }} className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <section className="rounded-2xl border border-white/15 bg-white/5 p-8 backdrop-blur-xl md:p-10">
          <p className="font-body text-xs uppercase tracking-[0.28em] text-neonGreen">Product Case Study</p>
          <h1 className="mt-2 font-display text-5xl font-bold text-white md:text-6xl">{project.title}</h1>
          <p className="mt-4 text-xl text-slate-200">{project.tagline}</p>
          <p className="mt-5 max-w-4xl text-slate-300">{project.overview}</p>

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

        <CaseStudyBlock title="Core Features">
          <div className="space-y-7">
            {project.coreFeatures.map((group) => (
              <div key={group.title}>
                <h3 className="text-xl font-semibold text-white">{group.title}</h3>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-300">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CaseStudyBlock>

        <CaseStudyBlock title={project.monitoringFlowTitle}>
          <pre className="overflow-x-auto rounded-xl border border-emerald-300/20 bg-black/60 p-4 text-xs text-emerald-300 md:text-sm">
{project.architectureFlow.join('\n  ↓\n')}
          </pre>

          <div className="mt-8 rounded-xl border border-white/10 bg-black/35 p-5">
            <div className="flex flex-col items-center gap-2 text-center text-sm text-slate-200">
              {project.architectureFlow.map((step, index) => (
                <div key={step} className="w-full max-w-lg">
                  <div className="rounded-lg border border-white/10 bg-white/5 px-4 py-2">{step}</div>
                  {index < project.architectureFlow.length - 1 && <div className="py-1 text-neonCyan">↓</div>}
                </div>
              ))}
            </div>
          </div>
        </CaseStudyBlock>

        <CaseStudyBlock title="System Metrics">
          <div className="grid gap-4 md:grid-cols-3">
            {project.metrics.map((metric) => (
              <article key={metric.title} className="rounded-xl border border-white/10 bg-black/25 p-5 text-center">
                <h3 className={`font-display text-2xl font-bold ${toneClassMap[metric.tone]}`}>{metric.title}</h3>
                <p className="mt-2 text-sm text-slate-300">{metric.description}</p>
              </article>
            ))}
          </div>
        </CaseStudyBlock>

        <CaseStudyBlock title="Request Lifecycle">
          <div className="rounded-xl border border-white/10 bg-black/25 p-5">
            <ol className="space-y-2 text-slate-300">
              {project.requestLifecycle.map((step, index) => (
                <li key={step}>
                  <span className="mr-2 font-semibold text-neonCyan">{index + 1}.</span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </CaseStudyBlock>

        <CaseStudyBlock title="Impact">
          <p className="text-slate-300">{project.impact}</p>
        </CaseStudyBlock>

        <CaseStudyBlock title="Screenshots And Diagrams">
          <div className="grid gap-4 md:grid-cols-2">
            {project.evidence.map((item) => (
              <MediaFrame key={item.title} src={item.src} alt={item.title} title={item.title} caption={item.caption} />
            ))}
          </div>
        </CaseStudyBlock>

        <div className="grid gap-8 lg:grid-cols-2">
          <CaseStudyBlock title="Async Processing">
            <ul className="list-disc space-y-1 pl-5 text-slate-300">
              {project.asyncProcessing.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </CaseStudyBlock>

          <CaseStudyBlock title="DevOps And Observability">
            <ul className="list-disc space-y-1 pl-5 text-slate-300">
              {project.devOps.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </CaseStudyBlock>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <CaseStudyBlock title="Testing And Reliability">
            <ul className="list-disc space-y-1 pl-5 text-slate-300">
              {project.testing.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </CaseStudyBlock>

          <CaseStudyBlock title="Code Highlights">
            <ul className="list-disc space-y-1 pl-5 text-slate-300">
              {project.codeHighlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </CaseStudyBlock>
        </div>

        <CaseStudyBlock title="What Makes It Special">
          <ul className="list-disc space-y-1 pl-5 text-slate-300">
            {project.whatMakesItSpecial.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </CaseStudyBlock>

        <CaseStudyBlock title="Key Learnings">
          <ul className="list-disc space-y-1 pl-5 text-slate-300">
            {project.keyLearnings.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </CaseStudyBlock>

        <div className="grid gap-8 lg:grid-cols-2">
          <CaseStudyBlock title="Resume Version">
            <p className="text-slate-200">{project.resumeVersion}</p>
          </CaseStudyBlock>

          <CaseStudyBlock title="Final Verdict">
            <p className="text-lg font-semibold text-neonCyan">{project.finalVerdict}</p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-slate-300">
              {project.finalVerdictPoints.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </CaseStudyBlock>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            to="/projects"
            className="cursor-pointer rounded-lg border border-neonCyan/45 bg-neonCyan/15 px-5 py-2.5 text-sm font-semibold text-neonCyan transition-colors duration-200 hover:bg-neonCyan/25"
          >
            Back To Dashboard
          </Link>
          <Link
            to="/"
            className="cursor-pointer rounded-lg border border-white/25 bg-black/20 px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white/10"
          >
            Back To Home
          </Link>
        </div>
      </motion.div>
    </main>
  )
}
