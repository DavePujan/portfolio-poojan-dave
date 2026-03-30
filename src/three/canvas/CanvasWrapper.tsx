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
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0.4, 5], fov: 45 }}
    >
      <Suspense fallback={<CanvasLoader />}>{children}</Suspense>
    </Canvas>
  )
}
