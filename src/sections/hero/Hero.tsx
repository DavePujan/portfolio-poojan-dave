import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLAnchorElement>(null)

  const proofSignals = ['Async Architecture', 'Observability-First Delivery', 'Cinematic Frontend Performance']

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    if (titleRef.current && subtitleRef.current && ctaRef.current) {
      tl.fromTo(titleRef.current, { y: 64, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 })
        .fromTo(subtitleRef.current, { y: 48, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.5')
        .fromTo(ctaRef.current, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, '-=0.45')
    }

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <section id="hero" className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_25%,rgba(34,211,238,0.08),transparent_35%),radial-gradient(circle_at_75%_10%,rgba(57,255,136,0.08),transparent_35%)]" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-[52%] bg-[radial-gradient(circle_at_42%_36%,rgba(34,211,238,0.15),transparent_58%)]" />
      <div className="pointer-events-none absolute inset-0 noise-overlay" />
      <div className="pointer-events-none absolute inset-0 vignette-overlay" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl items-center px-6 py-20 md:px-10">
        <div className="grid w-full gap-6 lg:grid-cols-[1.25fr_0.75fr]">
          <div className="relative rounded-2xl border border-white/15 bg-white/5 p-8 backdrop-blur-2xl md:p-10">
            <div className="pointer-events-none absolute -left-8 -top-8 h-32 w-32 rounded-full bg-neonCyan/25 blur-3xl" />
            <p className="font-body text-xs uppercase tracking-[0.28em] text-neonGreen">Pujan Dave • Full-Stack Product Engineer</p>
            <h1 ref={titleRef} style={{ willChange: 'transform, opacity' }} className="mt-3 font-display text-5xl font-bold leading-tight text-white md:text-7xl">
              I Engineer Products
              <span className="block text-neonCyan">That Feel Premium And Scale Calmly</span>
            </h1>
            <p ref={subtitleRef} style={{ willChange: 'transform, opacity' }} className="mt-5 max-w-2xl font-body text-base leading-relaxed text-slate-200 md:text-lg">
              My work sits at the intersection of visual storytelling and backend reliability. I build systems where frontend polish, async architecture, and operational visibility all ship together.
            </p>

            <div className="mt-6 flex flex-wrap gap-2.5">
              {proofSignals.map((signal) => (
                <span key={signal} className="rounded-md border border-white/15 bg-black/30 px-3 py-1.5 text-xs font-semibold tracking-wide text-slate-100">
                  {signal}
                </span>
              ))}
            </div>

            <div className="mt-5 grid gap-2 text-xs text-slate-300 sm:grid-cols-3">
              <p className="rounded-md border border-white/10 bg-white/5 px-3 py-2">Frontend → API</p>
              <p className="rounded-md border border-white/10 bg-white/5 px-3 py-2">API → Queue / Workers</p>
              <p className="rounded-md border border-white/10 bg-white/5 px-3 py-2">Workers → Redis / DB</p>
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                ref={ctaRef}
                to="/projects"
                style={{ willChange: 'transform, opacity' }}
                className="cursor-pointer rounded-lg border border-neonCyan/45 bg-neonCyan/15 px-6 py-3 font-body text-sm font-semibold text-neonCyan shadow-glow transition-colors duration-200 hover:bg-neonCyan/25"
              >
                View Case Studies
              </Link>
              <a
                href="#contact"
                className="cursor-pointer rounded-lg border border-white/20 bg-black/20 px-6 py-3 font-body text-sm font-semibold text-white transition-colors duration-200 hover:bg-white/10"
              >
                Start A Conversation
              </a>
            </div>
          </div>

          <aside className="rounded-2xl border border-white/15 bg-black/25 p-6 backdrop-blur-xl md:p-7">
            <p className="text-xs uppercase tracking-[0.22em] text-neonBlue">Operating Principles</p>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-200">
              <li className="rounded-lg border border-white/10 bg-white/5 p-3">Ship end-to-end ownership, not isolated UI tickets.</li>
              <li className="rounded-lg border border-white/10 bg-white/5 p-3">Design for real constraints: latency, retries, visibility, scale.</li>
              <li className="rounded-lg border border-white/10 bg-white/5 p-3">Use motion and 3D to explain systems, never to distract.</li>
            </ul>

            <div className="mt-6 rounded-lg border border-neonGreen/30 bg-neonGreen/10 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-300">Current Focus</p>
              <p className="mt-1 text-sm text-neonGreen">Distributed Node.js systems, observability engineering, and high-fidelity React interfaces.</p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
