import type { ReactNode } from 'react'
import FullPageHeroBackground from '../background/FullPageHeroBackground'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen bg-ink text-slate-100">
      <a
        href="#main-content"
        className="absolute left-3 top-3 z-[120] -translate-y-16 rounded-md border border-neonCyan/50 bg-slate-950/90 px-3 py-2 text-xs font-semibold text-neonCyan transition-transform duration-200 focus:translate-y-0"
      >
        Skip to main content
      </a>
      <FullPageHeroBackground />
      <div id="main-content" className="relative z-10" tabIndex={-1}>
        {children}
      </div>
    </div>
  )
}
