import { motion } from 'framer-motion'
import { lazy, Suspense } from 'react'
import type { ReactElement } from 'react'
import { useRoutes, type Location, type RouteObject } from 'react-router-dom'

const Home = lazy(() => import('./pages/Home'))
const NotFound = lazy(() => import('./pages/NotFound'))
const ProjectDetails = lazy(() => import('./pages/ProjectDetails'))
const Projects = lazy(() => import('./pages/Projects'))

function RouteFallback() {
  return <div className="flex min-h-screen items-center justify-center text-sm uppercase tracking-[0.2em] text-neonCyan">Loading</div>
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
      initial={{ opacity: 0, scale: 0.985, y: 24, filter: 'blur(8px)' }}
      animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, scale: 1.01, y: -20, filter: 'blur(8px)' }}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
    >
      {content}
    </motion.div>
  )
}
