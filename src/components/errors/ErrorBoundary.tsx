import { Component, type ErrorInfo, type ReactNode } from 'react'

type ErrorBoundaryProps = {
  children: ReactNode
}

type ErrorBoundaryState = {
  hasError: boolean
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Application error boundary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-ink px-6 text-center text-slate-100">
          <div className="max-w-xl rounded-2xl border border-white/15 bg-white/5 p-8 backdrop-blur-xl">
            <p className="text-xs uppercase tracking-[0.2em] text-neonCyan">Unexpected Error</p>
            <h1 className="mt-2 font-display text-3xl font-bold text-white">Something went wrong while loading this experience.</h1>
            <p className="mt-3 text-sm text-slate-300">Please refresh the page. If the issue persists, reach out and I will fix it quickly.</p>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
