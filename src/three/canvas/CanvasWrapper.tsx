import { Canvas } from '@react-three/fiber'
import { Suspense, useEffect, useRef, type ReactNode } from 'react'
import CanvasLoader from '../../components/loaders/CanvasLoader'
import usePerformanceMode from '../../hooks/usePerformanceMode'
import { useScene } from '../../context/useScene'

type CanvasWrapperProps = {
  children: ReactNode
}

export default function CanvasWrapper({ children }: CanvasWrapperProps) {
  const performance = usePerformanceMode()
  const { setFocusNode, setHoverNode, setInteraction, setCameraMode } = useScene()
  const dpr: [number, number] = performance.lowPerf ? [1, 1] : [1, 1.5]
  const focusResetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (focusResetTimeoutRef.current) {
        clearTimeout(focusResetTimeoutRef.current)
      }
    }
  }, [])
  
  return (
    <Canvas
      dpr={dpr}
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      performance={{ min: 0.5, max: 1 }}
      camera={{ position: [0, 0.4, 5], fov: 45 }}
      onCreated={({ gl }) => {
        gl.setPixelRatio(Math.min(window.devicePixelRatio, performance.lowPerf ? 1 : 1.5))
      }}
      onPointerMissed={() => {
        if (focusResetTimeoutRef.current) {
          clearTimeout(focusResetTimeoutRef.current)
        }
        setHoverNode(undefined)
        setInteraction('idle')
        setCameraMode('wide')
        focusResetTimeoutRef.current = setTimeout(() => {
          setFocusNode(undefined)
          focusResetTimeoutRef.current = null
        }, 120)
      }}
    >
      <Suspense fallback={<CanvasLoader />}>{children}</Suspense>
    </Canvas>
  )
}
