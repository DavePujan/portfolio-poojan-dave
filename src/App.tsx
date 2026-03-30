import { AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import AppRoutes from './routes'
import RootLayout from './components/layout/RootLayout'
import usePerformanceMode from './hooks/usePerformanceMode'
import { trackEvent, trackPageView } from './utils/analytics'

export default function App() {
  const location = useLocation()
  const performance = usePerformanceMode()

  useEffect(() => {
    trackPageView(location.pathname)
  }, [location.pathname])

  useEffect(() => {
    trackEvent('performance_mode_detected', {
      mode: performance.mode,
      lowPerf: performance.lowPerf,
    })
  }, [performance.lowPerf, performance.mode])

  return (
    <RootLayout>
      <AnimatePresence mode="wait">
        <AppRoutes key={location.pathname} location={location} />
      </AnimatePresence>
    </RootLayout>
  )
}
