type AnalyticsPayload = Record<string, string | number | boolean>
let lastEventTime = 0
const EVENT_THROTTLE_MS = 500


declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>
    gtag?: (command: 'event' | 'config', eventName: string, payload?: Record<string, unknown>) => void
  }
}

export function trackEvent(name: string, payload: AnalyticsPayload = {}) {
  const now = Date.now()
  if (now - lastEventTime < EVENT_THROTTLE_MS) {
    return
  }
  lastEventTime = now
  
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
