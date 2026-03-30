import { lazy, Suspense, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import useMobile from '../../hooks/useMobile'

const HeroScene = lazy(() => import('../../three/scenes/HeroScene'))

export default function Hero() {
  const isMobile = useMobile()
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLAnchorElement>(null)

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
    <section id="hero" className="relative min-h-screen overflow-hidden bg-ink bg-mesh">
      {!isMobile && (
        <div className="absolute inset-0 opacity-90">
          <Suspense fallback={<div className="h-full w-full" />}>
            <HeroScene />
          </Suspense>
        </div>
      )}

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_25%,rgba(34,211,238,0.18),transparent_35%),radial-gradient(circle_at_75%_10%,rgba(57,255,136,0.15),transparent_35%)]" />
      <div className="pointer-events-none absolute inset-0 noise-overlay" />
      <div className="pointer-events-none absolute inset-0 vignette-overlay" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl items-center px-6 py-20 md:px-10">
        <div className="w-full max-w-2xl rounded-2xl border border-white/15 bg-white/5 p-8 backdrop-blur-2xl md:p-10">
          <p className="font-body text-xs uppercase tracking-[0.28em] text-neonGreen">Creative Frontend Engineer</p>
          <h1 ref={titleRef} className="mt-3 font-display text-5xl font-bold leading-tight text-white md:text-7xl">
            Building Immersive,
            <span className="block text-neonCyan">High-Performance Web Stories</span>
          </h1>
          <p ref={subtitleRef} className="mt-5 max-w-xl font-body text-base leading-relaxed text-slate-200 md:text-lg">
            I design and engineer polished portfolio experiences with cinematic 3D visuals, measurable performance, and product-level UX clarity.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              ref={ctaRef}
              to="/projects"
              className="cursor-pointer rounded-lg border border-neonCyan/45 bg-neonCyan/15 px-6 py-3 font-body text-sm font-semibold text-neonCyan shadow-glow transition-colors duration-200 hover:bg-neonCyan/25"
            >
              Explore Projects
            </Link>
            <a
              href="#contact"
              className="cursor-pointer rounded-lg border border-white/20 bg-black/20 px-6 py-3 font-body text-sm font-semibold text-white transition-colors duration-200 hover:bg-white/10"
            >
              Contact Me
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
