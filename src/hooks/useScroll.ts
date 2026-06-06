import { useEffect, useState } from 'react'

export default function useScroll() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    let animationFrame: number | null = null

    const updateScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? window.scrollY / docHeight : 0
      setScrollProgress(Math.min(Math.max(progress, 0), 1))
      animationFrame = null
    }

    const onScroll = () => {
      if (animationFrame === null) {
        animationFrame = window.requestAnimationFrame(updateScroll)
      }
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame)
      }
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return scrollProgress
}
