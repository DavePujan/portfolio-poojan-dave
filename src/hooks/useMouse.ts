import { useEffect, useState } from 'react'

type MousePosition = {
  x: number
  y: number
}

export default function useMouse() {
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY })
    }

    window.addEventListener('mousemove', onMove)

    return () => {
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  return position
}
