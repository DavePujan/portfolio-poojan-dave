import { lazy, Suspense, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useScene } from '../../context/useScene'

gsap.registerPlugin(ScrollTrigger)

const SkillSphereScene = lazy(() => import('../../three/scenes/SkillSphereScene'))

const strengths = [
  {
    title: 'Product Interface Engineering',
    text: 'Architected React interfaces with strong information hierarchy, conversion-aware UX, and production maintainability.',
  },
  {
    title: 'System Design For Web Products',
    text: 'Designed async job flows, queue-backed processing, and resilient APIs for high concurrency and predictable behavior.',
  },
  {
    title: 'Observability And Reliability',
    text: 'Implemented Prometheus and Grafana telemetry, meaningful service health signals, and failure-aware retry workflows.',
  },
]

const stackBands = [
  {
    label: 'Frontend Craft',
    items: ['React', 'TypeScript', 'Three.js', 'GSAP', 'Framer Motion', 'Tailwind CSS'],
  },
  {
    label: 'Backend Systems',
    items: ['Node.js', 'Express', 'Redis', 'BullMQ', 'Supabase'],
  },
  {
    label: 'Platform And Ops',
    items: ['Prometheus', 'Grafana', 'Docker', 'AWS ECS', 'Vercel'],
  },
]

export default function Skills() {
  const cardRefs = useRef<Array<HTMLDivElement | null>>([])
  const { setInteraction, setCameraMode } = useScene()

  useEffect(() => {
    const animations = cardRefs.current.map((card, index) => {
      if (!card) {
        return null
      }

      return gsap.fromTo(
        card,
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.48,
          delay: index * 0.045,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 84%',
          },
        },
      )
    })

    return () => {
      animations.forEach((animation) => animation?.kill())
    }
  }, [])

  return (
    <section id="skills" className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24 md:px-10">
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-2xl border border-white/15 bg-white/5 p-7 backdrop-blur-xl md:p-8">
          <h2 className="font-display text-3xl font-bold text-white md:text-4xl">What I Bring To Engineering Teams</h2>
          <p className="mt-3 max-w-2xl text-slate-300">
            I am strongest where interface quality, backend systems, and measurable reliability need to be solved together.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-lg border border-neonCyan/30 bg-neonCyan/10 px-4 py-3 transition-colors duration-200 hover:bg-neonCyan/15">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-300">Execution</p>
              <p className="mt-1 font-display text-xl font-semibold text-neonCyan">Scope With Intent</p>
            </div>
            <div className="rounded-lg border border-neonBlue/30 bg-neonBlue/10 px-4 py-3 transition-colors duration-200 hover:bg-neonBlue/15">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-300">Systems</p>
              <p className="mt-1 font-display text-xl font-semibold text-neonBlue">Reliability Thinking</p>
            </div>
            <div className="rounded-lg border border-neonGreen/30 bg-neonGreen/10 px-4 py-3 transition-colors duration-200 hover:bg-neonGreen/15">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-300">Delivery</p>
              <p className="mt-1 font-display text-xl font-semibold text-neonGreen">Production Finish</p>
            </div>
          </div>

          <div className="mt-9 space-y-4">
            {strengths.map((strength, index) => (
              <div
                key={strength.title}
                ref={(element) => {
                  cardRefs.current[index] = element
                }}
                onMouseEnter={() => {
                  setInteraction('hover')
                  setCameraMode('focus')
                }}
                onMouseLeave={() => {
                  setInteraction('idle')
                  setCameraMode('wide')
                }}
                className="rounded-lg border border-white/10 bg-black/15 px-4 py-3 transition-colors duration-200 hover:border-neonCyan/40 hover:bg-black/30"
              >
                <p className="font-display text-xl font-semibold text-white">{strength.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{strength.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <div className="rounded-2xl border border-white/15 bg-white/5 p-7 backdrop-blur-xl md:p-8">
            <h3 className="font-display text-2xl font-bold text-white">Capability Map</h3>
            <div className="mt-5 space-y-5">
              {stackBands.map((band) => (
                <div key={band.label}>
                  <p className="text-xs uppercase tracking-[0.18em] text-neonBlue">{band.label}</p>
                  <div className="mt-2 flex flex-wrap gap-2.5">
                    {band.items.map((item) => (
                      <span key={`${band.label}-${item}`} className="rounded-md border border-white/15 bg-black/25 px-3 py-1.5 text-xs font-semibold text-slate-100">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden h-72 overflow-hidden rounded-2xl border border-white/15 bg-black/25 lg:block">
            <Suspense fallback={<div className="h-full w-full" />}>
              <SkillSphereScene />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  )
}
