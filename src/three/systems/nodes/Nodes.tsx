import { Html } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import type { Mesh, MeshStandardMaterial } from 'three'
import * as THREE from 'three'
import useSceneState from '../../hooks/useSceneState'
import useNodes from './useNodes'
import type { NodeType } from './nodeTypes'

const colorByType: Record<NodeType, string> = {
  frontend: '#22D3EE',
  api: '#38BDF8',
  queue: '#8B5CF6',
  worker: '#39FF88',
  cache: '#FB923C',
  db: '#F87171',
}

type NodeVisualProps = {
  label: string
  position: [number, number, number]
  type: NodeType
  scale: number
  opacity: number
  isActive: boolean
}

function NodeVisual({ label, position, type, scale, opacity, isActive }: NodeVisualProps) {
  const meshRef = useRef<Mesh>(null)
  const materialRef = useRef<MeshStandardMaterial>(null)

  useFrame(({ clock }, delta) => {
    if (!meshRef.current || !materialRef.current) {
      return
    }

    const pulse = 1 + Math.sin(clock.getElapsedTime() * 1.8 + position[0]) * 0.05
    const targetScale = scale * (isActive ? pulse : 1)
    const currentScale = meshRef.current.scale.x
    const nextScale = THREE.MathUtils.lerp(currentScale, targetScale, delta * 8)

    meshRef.current.scale.setScalar(nextScale)
    materialRef.current.opacity = opacity
    materialRef.current.emissiveIntensity = isActive ? 1.6 : 0.45
  })

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.13, 18, 18]} />
      <meshStandardMaterial
        ref={materialRef}
        color={colorByType[type]}
        emissive={colorByType[type]}
        roughness={0.35}
        metalness={0.2}
        transparent
        opacity={opacity}
      />
      {isActive && (
        <Html distanceFactor={11} position={[0, 0.26, 0]}>
          <div className="rounded border border-white/15 bg-slate-950/70 px-2 py-1 text-[10px] font-semibold tracking-[0.12em] text-neonCyan backdrop-blur-sm">
            {label}
          </div>
        </Html>
      )}
    </mesh>
  )
}

export default function Nodes() {
  const nodes = useNodes()
  const { setFocusNode, setInteraction, section } = useSceneState()

  const interactive = section === 'skills'

  return (
    <group
      onPointerOver={() => {
        if (interactive) {
          setInteraction('hover')
        }
      }}
      onPointerOut={() => {
        if (interactive) {
          setInteraction('idle')
          setFocusNode(undefined)
        }
      }}
    >
      {nodes.map((node) => (
        <group
          key={node.id}
          onPointerOver={() => {
            if (interactive) {
              setFocusNode(node.id)
            }
          }}
        >
          <NodeVisual {...node} />
        </group>
      ))}
    </group>
  )
}
