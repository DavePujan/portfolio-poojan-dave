import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-ink px-4 text-slate-100 sm:px-6">
      <section className="text-center">
        <p className="font-body text-sm uppercase tracking-[0.28em] text-neonBlue">404</p>
        <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Page Not Found</h1>
        <Link
          to="/"
          className="touch-target mt-6 inline-flex w-full cursor-pointer items-center justify-center rounded-lg border border-neonBlue/40 bg-neonBlue/10 px-5 py-3 text-sm font-semibold text-neonBlue transition-colors duration-200 hover:bg-neonBlue/20 sm:w-auto"
        >
          Return Home
        </Link>
      </section>
    </main>
  )
}
