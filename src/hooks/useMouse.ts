import { useEffect, useRef } from 'react'

type MousePosition = {
  x: number
  y: number
}

export default function useMouse() {
  const positionRef = useRef<MousePosition>({ x: 0, y: 0 })

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const onMove = (event: MouseEvent) => {
      positionRef.current = { x: event.clientX, y: event.clientY }
    }

    window.addEventListener('mousemove', onMove)

    return () => {
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  return positionRef
}
