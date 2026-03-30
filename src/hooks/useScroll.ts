import { useEffect, useState } from 'react'

export default function useScroll() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    let animationFrame: number | null = null

    const updateScroll = () => {
      setScrollY(window.scrollY)
      animationFrame = null
    }

    const onScroll = () => {
      if (animationFrame === null) {
        animationFrame = window.requestAnimationFrame(updateScroll)
      }
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame)
      }
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return scrollY
}
