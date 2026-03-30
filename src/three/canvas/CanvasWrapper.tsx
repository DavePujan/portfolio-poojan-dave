import { Canvas } from '@react-three/fiber'
import { Suspense, type ReactNode } from 'react'
import CanvasLoader from '../../components/loaders/CanvasLoader'

type CanvasWrapperProps = {
  children: ReactNode
}

export default function CanvasWrapper({ children }: CanvasWrapperProps) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      performance={{ min: 0.5, max: 1 }}
      camera={{ position: [0, 0.4, 5], fov: 45 }}
      onCreated={({ gl }) => {
        gl.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
      }}
    >
      <Suspense fallback={<CanvasLoader />}>{children}</Suspense>
    </Canvas>
  )
}
