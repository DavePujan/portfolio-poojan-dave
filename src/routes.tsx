import { motion } from 'framer-motion'
import { lazy, Suspense } from 'react'
import type { ReactElement } from 'react'
import { useRoutes, type Location, type RouteObject } from 'react-router-dom'

const Home = lazy(() => import('./pages/Home'))
const NotFound = lazy(() => import('./pages/NotFound'))
const ProjectDetails = lazy(() => import('./pages/ProjectDetails'))
const Projects = lazy(() => import('./pages/Projects'))

function RouteFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-6 text-center" role="status" aria-live="polite">
      <div className="rounded-xl border border-white/15 bg-white/5 px-6 py-4 backdrop-blur-xl">
        <p className="text-xs uppercase tracking-[0.2em] text-neonCyan">Loading Experience...</p>
      </div>
    </div>
  )
}

function withSuspense(element: ReactElement) {
  return <Suspense fallback={<RouteFallback />}>{element}</Suspense>
}

const routes: RouteObject[] = [
  { path: '/', element: withSuspense(<Home />) },
  { path: '/projects', element: withSuspense(<Projects />) },
  { path: '/projects/:id', element: withSuspense(<ProjectDetails />) },
  { path: '*', element: withSuspense(<NotFound />) },
]

export default function AppRoutes({ location }: { location: Location }) {
  const content = useRoutes(routes, location)

  return (
    <motion.div
      className="relative z-10"
      initial={{ opacity: 0, scale: 0.985, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 1.01, y: -20 }}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
    >
      {content}
    </motion.div>
  )
}
