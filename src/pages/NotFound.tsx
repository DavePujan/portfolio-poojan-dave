import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-ink px-6 text-slate-100">
      <section className="text-center">
        <p className="font-body text-sm uppercase tracking-[0.28em] text-neonBlue">404</p>
        <h1 className="mt-2 font-display text-4xl font-bold">Page Not Found</h1>
        <Link
          to="/"
          className="mt-6 inline-flex cursor-pointer rounded-lg border border-neonBlue/40 bg-neonBlue/10 px-5 py-2.5 text-sm font-semibold text-neonBlue transition-colors duration-200 hover:bg-neonBlue/20"
        >
          Return Home
        </Link>
      </section>
    </main>
  )
}
