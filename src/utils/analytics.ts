type AnalyticsPayload = Record<string, string | number | boolean>

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>
    gtag?: (command: 'event' | 'config', eventName: string, payload?: Record<string, unknown>) => void
  }
}

export function trackEvent(name: string, payload: AnalyticsPayload = {}) {
  const eventPayload = { event: name, ...payload }

  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push(eventPayload)
  }

  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', name, payload)
  }

  if (import.meta.env.DEV) {
    console.info('[analytics:event]', name, payload)
  }
}

export function trackPageView(path: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'portfolio-page-view', { page_path: path })
  }

  trackEvent('page_view', { path })
}
