import { Html } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import type { Mesh, MeshStandardMaterial } from 'three'
import * as THREE from 'three'
import useSceneState from '../../hooks/useSceneState'
import useMobile from '../../../hooks/useMobile'
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
  id: string
  label: string
  position: [number, number, number]
  type: NodeType
  scale: number
  opacity: number
  isActive: boolean
  isHovered: boolean
  isFocused: boolean
  interactive: boolean
  onHover: (nodeId: string) => void
  onBlur: () => void
  onFocus: (nodeId: string) => void
  isMobile: boolean
}

function NodeVisual({
  id,
  label,
  position,
  type,
  scale,
  opacity,
  isActive,
  isHovered,
  isFocused,
  interactive,
  onHover,
  onBlur,
  onFocus,
  isMobile,
}: NodeVisualProps) {
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
    materialRef.current.emissiveIntensity = isFocused ? 2 : isHovered ? 1 : isActive ? 1.2 : 0.45
  })

  const nodeColor = isFocused ? '#22C55E' : isHovered ? '#38BDF8' : colorByType[type]

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerOver={(event) => {
        if (!interactive) {
          return
        }
        event.stopPropagation()
        onHover(id)
      }}
      onPointerOut={(event) => {
        if (!interactive) {
          return
        }
        event.stopPropagation()
        onBlur()
      }}
      onClick={(event) => {
        if (!interactive) {
          return
        }
        event.stopPropagation()
        onFocus(id)
      }}
      onPointerDown={(event) => {
        if (!interactive || !isMobile) {
          return
        }
        event.stopPropagation()
        onFocus(id)
      }}
    >
      <sphereGeometry args={[0.13, 18, 18]} />
      <meshStandardMaterial
        ref={materialRef}
        color={nodeColor}
        emissive={nodeColor}
        roughness={0.35}
        metalness={0.2}
        transparent
        opacity={opacity}
      />
      {(isActive || isHovered || isFocused) && (
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
  const { setFocusNode, setHoverNode, setInteraction, setCameraMode, section, hoverNode, focusNode } = useSceneState()
  const isMobile = useMobile()
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const interactive = section === 'hero' || section === 'skills' || section === 'projects'

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current)
      }
    }
  }, [])

  const handleHover = (nodeId: string) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
      hoverTimeoutRef.current = null
    }
    setHoverNode(nodeId)
    setInteraction('hover')
  }

  const handleHoverOut = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setHoverNode(undefined)
      setInteraction('idle')
      hoverTimeoutRef.current = null
    }, 50)
  }

  const handleFocus = (nodeId: string) => {
    setFocusNode(nodeId)
    setHoverNode(undefined)
    setCameraMode('focus')
    setInteraction('hover')
  }

  return (
    <group>
      {nodes.map((node) => (
        <NodeVisual
          key={node.id}
          {...node}
          isHovered={hoverNode === node.id}
          isFocused={focusNode === node.id}
          interactive={interactive}
          onHover={handleHover}
          onBlur={handleHoverOut}
          onFocus={handleFocus}
          isMobile={isMobile}
        />
      ))}
    </group>
  )
}
