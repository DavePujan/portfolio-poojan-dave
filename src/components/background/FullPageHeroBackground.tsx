import { lazy, Suspense } from 'react'
import { useLocation } from 'react-router-dom'
import useMobile from '../../hooks/useMobile'
import usePerformanceMode from '../../hooks/usePerformanceMode'

const HeroScene = lazy(() => import('../../three/scenes/HeroScene'))

function HeroSceneFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-ink/30 via-transparent to-ink/40">
      <div className="rounded-xl border border-white/15 bg-slate-950/70 px-5 py-3 text-center backdrop-blur-md">
        <p className="text-[10px] uppercase tracking-[0.22em] text-slate-300">Loading 3D System</p>
        <p className="mt-1 animate-pulse text-xs font-semibold tracking-[0.14em] text-neonCyan">Initializing Node Graph...</p>
      </div>
    </div>
  )
}

export default function FullPageHeroBackground() {
  const isMobile = useMobile()
  const performance = usePerformanceMode()
  const { pathname } = useLocation()

  const normalizedPath = pathname.endsWith('/') && pathname.length > 1 ? pathname.slice(0, -1) : pathname

  // Don't render on mobile or when not on home
  if (isMobile || normalizedPath !== '/') {
    return null
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <Suspense fallback={<HeroSceneFallback />}>
        <HeroScene mode="hero" intensity={performance.intensity} lowPerf={performance.lowPerf} />
      </Suspense>
    </div>
  )
}
