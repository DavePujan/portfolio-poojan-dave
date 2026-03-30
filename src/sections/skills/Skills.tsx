import { lazy, Suspense, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SkillSphereScene = lazy(() => import('../../three/scenes/SkillSphereScene'))

type Skill = {
  name: string
  level: number
}

const skills: Skill[] = [
  { name: 'React', level: 92 },
  { name: 'Three.js', level: 76 },
  { name: 'TypeScript', level: 88 },
  { name: 'GSAP', level: 84 },
  { name: 'Node.js', level: 79 },
]

const techGrid = ['React', 'Three.js', 'TypeScript', 'Node.js', 'GSAP', 'Tailwind CSS']

export default function Skills() {
  const barsRef = useRef<Array<HTMLDivElement | null>>([])

  useEffect(() => {
    const animations = barsRef.current.map((bar, index) => {
      if (!bar) {
        return null
      }

      return gsap.fromTo(
        bar,
        { width: '0%' },
        {
          width: `${skills[index].level}%`,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: bar,
            start: 'top 86%',
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
          <h2 className="font-display text-3xl font-bold text-white md:text-4xl">Skills</h2>
          <p className="mt-3 max-w-2xl text-slate-300">
            Recruiter-friendly capability mapping with motion-driven bars and a clean tech stack panel.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-lg border border-neonCyan/30 bg-neonCyan/10 px-4 py-3 transition-colors duration-200 hover:bg-neonCyan/15">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-300">Execution</p>
              <p className="mt-1 font-display text-xl font-semibold text-neonCyan">Fast Iteration</p>
            </div>
            <div className="rounded-lg border border-neonBlue/30 bg-neonBlue/10 px-4 py-3 transition-colors duration-200 hover:bg-neonBlue/15">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-300">Systems</p>
              <p className="mt-1 font-display text-xl font-semibold text-neonBlue">Architecture Focus</p>
            </div>
            <div className="rounded-lg border border-neonGreen/30 bg-neonGreen/10 px-4 py-3 transition-colors duration-200 hover:bg-neonGreen/15">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-300">Delivery</p>
              <p className="mt-1 font-display text-xl font-semibold text-neonGreen">Product Polish</p>
            </div>
          </div>

          <div className="mt-9 space-y-5">
            {skills.map((skill, index) => (
              <div
                key={skill.name}
                className="rounded-lg border border-white/10 bg-black/15 px-4 py-3 transition-colors duration-200 hover:border-neonCyan/40 hover:bg-black/30"
              >
                <div className="mb-1.5 flex items-center justify-between text-sm text-slate-200">
                  <span className="font-semibold">{skill.name}</span>
                  <span className="rounded-full border border-white/15 bg-white/5 px-2.5 py-0.5 text-xs text-slate-200">{skill.level}%</span>
                </div>
                <div className="h-2.5 w-full rounded-full bg-slate-700/60">
                  <div
                    ref={(element) => {
                      barsRef.current[index] = element
                    }}
                    className="skill-bar-fill h-2.5 rounded-full bg-gradient-to-r from-neonCyan to-neonGreen"
                    style={{ width: 0 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <div className="rounded-2xl border border-white/15 bg-white/5 p-7 backdrop-blur-xl md:p-8">
            <h3 className="font-display text-2xl font-bold text-white">Tech Stack</h3>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {techGrid.map((item) => (
                <div
                  key={item}
                  className="cursor-pointer rounded-lg border border-white/15 bg-black/20 px-4 py-3 text-center text-sm font-semibold text-slate-100 transition duration-200 hover:-translate-y-0.5 hover:border-neonCyan/60 hover:bg-neonCyan/10 hover:shadow-glow"
                >
                  {item}
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
