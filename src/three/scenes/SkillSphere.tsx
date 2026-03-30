import { Line } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import type { Group, Mesh } from 'three'
import * as THREE from 'three'
import { useScene } from '../../context/useScene'

export default function SkillSphere() {
  const meshRef = useRef<Mesh>(null)
  const flowRef = useRef<Group>(null)
  const { sceneState } = useScene()

  const nodePositions = useMemo(
    () => [
      new THREE.Vector3(-1.35, 0.25, 0.3),
      new THREE.Vector3(-0.45, 0.9, -0.2),
      new THREE.Vector3(0.7, 0.35, 0.15),
      new THREE.Vector3(1.1, -0.65, -0.25),
      new THREE.Vector3(-0.4, -0.95, 0.1),
    ],
    [],
  )

  const edges = useMemo(
    () => [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 0],
      [0, 2],
    ] as const,
    [],
  )

  const flows = useMemo(
    () =>
      edges.map(([from, to], index) => ({
        from: nodePositions[from],
        to: nodePositions[to],
        progress: (index * 0.17) % 1,
        speed: 0.003 + (index % 3) * 0.0012,
      })),
    [edges, nodePositions],
  )

  useFrame((_state, delta) => {
    if (!meshRef.current) {
      return
    }

    const intensity = sceneState.interaction === 'hover' ? 1.25 : 1
    meshRef.current.rotation.y += delta * 0.55 * intensity
    meshRef.current.rotation.x += delta * 0.15 * intensity

    if (!flowRef.current) {
      return
    }

    flowRef.current.children.forEach((child, index) => {
      const flow = flows[index]
      flow.progress += flow.speed * intensity

      if (flow.progress > 1) {
        flow.progress = 0
      }

      child.position.lerpVectors(flow.from, flow.to, flow.progress)
    })
  })

  return (
    <group>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.45, 26, 26]} />
        <meshStandardMaterial
          wireframe
          color="#22D3EE"
          emissive="#0EA5E9"
          emissiveIntensity={sceneState.interaction === 'hover' ? 0.48 : 0.35}
        />
      </mesh>

      {edges.map(([from, to]) => (
        <Line key={`edge-${from}-${to}`} points={[nodePositions[from], nodePositions[to]]} color="#67E8F9" lineWidth={0.9} transparent opacity={0.28} />
      ))}

      {nodePositions.map((position, index) => (
        <mesh key={`node-${index}`} position={position}>
          <sphereGeometry args={[0.06, 12, 12]} />
          <meshStandardMaterial color="#39FF88" emissive="#39FF88" emissiveIntensity={sceneState.interaction === 'hover' ? 1.8 : 1.2} />
        </mesh>
      ))}

      <group ref={flowRef}>
        {flows.map((_, index) => (
          <mesh key={`flow-${index}`}>
            <sphereGeometry args={[0.038, 10, 10]} />
            <meshBasicMaterial color="#22D3EE" transparent opacity={0.72} />
          </mesh>
        ))}
      </group>
    </group>
  )
}
