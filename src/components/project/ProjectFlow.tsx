import { memo } from 'react'

type ProjectFlowProps = {
  steps: string[]
}

function ProjectFlowComponent({ steps }: ProjectFlowProps) {
  return (
    <>
      <div className="mt-4 text-slate-200">
        <pre className="overflow-x-auto rounded-xl border border-emerald-300/20 bg-black/60 p-3 text-[11px] leading-relaxed text-emerald-300 sm:p-4 sm:text-xs md:text-sm">{steps.join('\n  ↓\n')}</pre>

        <div className="mt-8 rounded-xl border border-white/10 bg-black/35 p-4 sm:p-5">
          <div className="flex flex-col items-center gap-2 text-center text-xs text-slate-200 sm:text-sm">
            {steps.map((step, index) => (
              <div key={step} className="w-full max-w-lg">
                <div className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 break-words">{step}</div>
                {index < steps.length - 1 && <div className="py-1 text-neonCyan">↓</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

const ProjectFlow = memo(ProjectFlowComponent)

export default ProjectFlow
