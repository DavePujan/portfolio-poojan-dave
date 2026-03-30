import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import type { Mesh } from 'three'

export default function SkillSphere() {
  const meshRef = useRef<Mesh>(null)

  useFrame((_state, delta) => {
    if (!meshRef.current) {
      return
    }

    meshRef.current.rotation.y += delta * 0.55
    meshRef.current.rotation.x += delta * 0.15
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.45, 26, 26]} />
      <meshStandardMaterial wireframe color="#22D3EE" emissive="#0EA5E9" emissiveIntensity={0.35} />
    </mesh>
  )
}
