import { useMemo } from 'react'

export type PerformanceMode = 'low' | 'balanced' | 'high'

type PerformanceProfile = {
  mode: PerformanceMode
  intensity: number
  lowPerf: boolean
}

export default function usePerformanceMode(): PerformanceProfile {
  return useMemo(() => {
    if (typeof navigator === 'undefined') {
      return { mode: 'balanced', intensity: 0.7, lowPerf: false }
    }

    const cores = navigator.hardwareConcurrency ?? 8
    const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData ?? false
    const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (saveData || prefersReducedMotion || cores <= 4 || memory <= 4) {
      return { mode: 'low', intensity: 0.5, lowPerf: true }
    }

    if (cores <= 8 || memory <= 8) {
      return { mode: 'balanced', intensity: 0.7, lowPerf: false }
    }

    return { mode: 'high', intensity: 0.85, lowPerf: false }
  }, [])
}
