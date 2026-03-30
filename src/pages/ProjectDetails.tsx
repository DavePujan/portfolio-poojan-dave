import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { useEffect, useMemo } from 'react'
import ProjectFlow from '../components/project/ProjectFlow'
import ProjectHeader from '../components/project/ProjectHeader'
import ProjectMetrics from '../components/project/ProjectMetrics'
import MediaFrame from '../components/ui/MediaFrame'
import { useScene } from '../context/useScene'
import projects from '../sections/projects/projectDetails'

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

  const memoizedCoreFeatures = useMemo(() => project?.coreFeatures ?? [], [project])
  const memoizedRequestLifecycle = useMemo(() => project?.requestLifecycle ?? [], [project])
  const memoizedSpecialPoints = useMemo(() => project?.whatMakesItSpecial ?? [], [project])
  const memoizedEvidence = useMemo(() => project?.evidence ?? [], [project])
  const memoizedAsyncProcessing = useMemo(() => project?.asyncProcessing ?? [], [project])
  const memoizedDevOps = useMemo(() => project?.devOps ?? [], [project])
  const memoizedTesting = useMemo(() => project?.testing ?? [], [project])
  const memoizedCodeHighlights = useMemo(() => project?.codeHighlights ?? [], [project])
  const memoizedKeyLearnings = useMemo(() => project?.keyLearnings ?? [], [project])
  const memoizedFinalVerdictPoints = useMemo(() => project?.finalVerdictPoints ?? [], [project])

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
        <ProjectHeader project={project} />

        <CaseStudyBlock title="Core Features">
          <div className="space-y-7">
            {memoizedCoreFeatures.map((group) => (
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
          <ProjectFlow steps={project.architectureFlow} />
        </CaseStudyBlock>

        <CaseStudyBlock title="System Metrics">
          <ProjectMetrics metrics={project.metrics} />
        </CaseStudyBlock>

        <CaseStudyBlock title="Request Lifecycle">
          <div className="rounded-xl border border-white/10 bg-black/25 p-5">
            <ol className="space-y-2 text-slate-300">
              {memoizedRequestLifecycle.map((step, index) => (
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

        <CaseStudyBlock title="Why This Project Matters In My Portfolio">
          <ul className="list-disc space-y-1 pl-5 text-slate-300">
            {memoizedSpecialPoints.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </CaseStudyBlock>

        <CaseStudyBlock title="Screenshots And Diagrams">
          <div className="grid gap-4 md:grid-cols-2">
            {memoizedEvidence.map((item) => (
              <MediaFrame key={item.title} src={item.src} alt={item.title} title={item.title} caption={item.caption} />
            ))}
          </div>
        </CaseStudyBlock>

        <div className="grid gap-8 lg:grid-cols-2">
          <CaseStudyBlock title="Async Processing">
            <ul className="list-disc space-y-1 pl-5 text-slate-300">
              {memoizedAsyncProcessing.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </CaseStudyBlock>

          <CaseStudyBlock title="DevOps And Observability">
            <ul className="list-disc space-y-1 pl-5 text-slate-300">
              {memoizedDevOps.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </CaseStudyBlock>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <CaseStudyBlock title="Testing And Reliability">
            <ul className="list-disc space-y-1 pl-5 text-slate-300">
              {memoizedTesting.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </CaseStudyBlock>

          <CaseStudyBlock title="Code Highlights">
            <ul className="list-disc space-y-1 pl-5 text-slate-300">
              {memoizedCodeHighlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </CaseStudyBlock>
        </div>

        <CaseStudyBlock title="Key Learnings">
          <ul className="list-disc space-y-1 pl-5 text-slate-300">
            {memoizedKeyLearnings.map((item) => (
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
              {memoizedFinalVerdictPoints.map((item) => (
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
