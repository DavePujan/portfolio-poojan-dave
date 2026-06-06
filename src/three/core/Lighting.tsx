import { Environment } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import type { DirectionalLight } from 'three'
import useSceneState from '../hooks/useSceneState'

type LightingProps = {
  intensity?: number
}

export default function Lighting({ intensity = 0.8 }: LightingProps) {
  const { section, performanceMode } = useSceneState()
  const mainLightRef = useRef<DirectionalLight>(null)

  useFrame(({ clock }) => {
    if (!mainLightRef.current) return
    const pulse = 1 + Math.sin(clock.getElapsedTime() * 0.5) * 0.08
    mainLightRef.current.intensity *= pulse * 0.5
  })

  const sectionScale = section === 'contact' ? 0.55 : section === 'projects' ? 0.95 : 1
  const perfScale = performanceMode === 'low' ? 0.7 : performanceMode === 'balanced' ? 0.85 : 1
  const final = intensity * sectionScale * perfScale

  return (
    <>
      <ambientLight intensity={0.22 * final} />
      <directionalLight ref={mainLightRef} position={[3.2, 2.6, 2.2]} intensity={1.35 * final} color="#67E8F9" />
      <directionalLight position={[-2.7, 0.5, 2.7]} intensity={0.65 * final} color="#818CF8" />
      <pointLight position={[-2.5, -1.2, 2]} intensity={0.85 * final} color="#39FF88" />
      <pointLight position={[2.5, 1.1, -1.8]} intensity={0.72 * final} color="#22D3EE" />
      <Environment preset="city" />
    </>
  )
}
