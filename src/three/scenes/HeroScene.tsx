import { Environment, Html, Line, OrbitControls } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useMemo, useRef, useState } from 'react'
import type { Group, Vector3Tuple } from 'three'
import * as THREE from 'three'
import { useScene } from '../../context/useScene'
import useMobile from '../../hooks/useMobile'
import CanvasWrapper from '../canvas/CanvasWrapper'

gsap.registerPlugin(ScrollTrigger)

type NodeConfig = {
  id: string
  label: string
  position: Vector3Tuple
}

const nodes: NodeConfig[] = [
  { id: 'frontend', label: 'Frontend', position: [-2.2, 0.7, 0] },
  { id: 'api', label: 'API', position: [-0.7, 0.2, 0] },
  { id: 'queue', label: 'Queue', position: [0.8, 0.9, 0] },
  { id: 'worker', label: 'Worker', position: [0.9, -0.8, 0] },
  { id: 'database', label: 'Database', position: [2.6, 0, 0] },
]

const edgeIds = [
  ['frontend', 'api'],
  ['api', 'queue'],
  ['api', 'worker'],
  ['queue', 'database'],
  ['worker', 'database'],
] as const

function stableNoise(seed: number) {
  const x = Math.sin(seed * 17.13 + 0.73) * 43758.5453
  return x - Math.floor(x)
}

function Node({ label, position, active }: { label: string; position: Vector3Tuple; active: boolean }) {
  const [hovered, setHovered] = useState(false)

  return (
    <mesh
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <sphereGeometry args={[0.12, 20, 20]} />
      <meshStandardMaterial
        color={active ? '#22C55E' : hovered ? '#A7F3D0' : '#67E8F9'}
        emissive={active ? '#22C55E' : hovered ? '#39FF88' : '#22D3EE'}
        emissiveIntensity={active ? 2.5 : hovered ? 1.8 : 1}
        roughness={0.35}
        metalness={0.2}
      />

      {(hovered || active) && (
        <Html distanceFactor={10} position={[0, 0.25, 0]}>
          <div className="rounded border border-white/20 bg-slate-950/80 px-2 py-1 text-[10px] font-semibold tracking-[0.12em] text-neonCyan backdrop-blur-md">
            {label}
          </div>
        </Html>
      )}
    </mesh>
  )
}

function Connections() {
  const nodeMap = useMemo(() => {
    const map = new Map<string, Vector3Tuple>()
    nodes.forEach((node) => map.set(node.id, node.position))
    return map
  }, [])

  return (
    <group>
      {edgeIds.map(([from, to]) => {
        const fromPos = nodeMap.get(from)
        const toPos = nodeMap.get(to)

        if (!fromPos || !toPos) {
          return null
        }

        return <Line key={`${from}-${to}`} points={[fromPos, toPos]} color="#818CF8" lineWidth={1.2} transparent opacity={0.75} />
      })}
    </group>
  )
}

function FlowParticles() {
  const groupRef = useRef<Group>(null)
  const flowEdges = useMemo(() => {
    const map = new Map<string, Vector3Tuple>()
    nodes.forEach((node) => map.set(node.id, node.position))

    return edgeIds.map(([from, to]) => ({
      from: new THREE.Vector3(...(map.get(from) as Vector3Tuple)),
      to: new THREE.Vector3(...(map.get(to) as Vector3Tuple)),
      progress: stableNoise(from.length + to.length),
      speed: 0.0035 + stableNoise(from.length * 10 + to.length) * 0.003,
    }))
  }, [])

  useFrame(() => {
    if (!groupRef.current) {
      return
    }

    groupRef.current.children.forEach((child, index) => {
      const edge = flowEdges[index]
      edge.progress += edge.speed

      if (edge.progress > 1) {
        edge.progress = 0
      }

      child.position.lerpVectors(edge.from, edge.to, edge.progress)
    })
  })

  return (
    <group ref={groupRef}>
      {flowEdges.map((_, index) => (
        <mesh key={`flow-${index}`}>
          <sphereGeometry args={[0.05, 12, 12]} />
          <meshBasicMaterial color="#39FF88" />
        </mesh>
      ))}
    </group>
  )
}

function AmbientParticles() {
  const pointsRef = useRef<THREE.Points>(null)
  const count = 90

  const positions = useMemo(() => {
    const array = new Float32Array(count * 3)
    for (let index = 0; index < count; index += 1) {
      const i = index * 3
      array[i] = stableNoise(index + 1) * 7 - 3.5
      array[i + 1] = stableNoise(index + 101) * 4 - 2
      array[i + 2] = stableNoise(index + 201) * 2 - 1
    }
    return array
  }, [])

  useFrame((_state, delta) => {
    if (!pointsRef.current) {
      return
    }

    pointsRef.current.rotation.y += delta * 0.05
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#E2E8F0" transparent opacity={0.7} depthWrite={false} />
    </points>
  )
}

function CameraAnimation() {
  const { camera } = useThree()

  useEffect(() => {
    const timeline = gsap.timeline({
      scrollTrigger: {
        id: 'hero-system-camera',
        trigger: '#hero',
        start: 'top top',
        end: 'bottom+=500 top',
        scrub: true,
      },
    })

    timeline
      .to(camera.position, { x: 1.6, y: 0.4, z: 3.2 }, 0)
      .to(camera.rotation, { y: Math.PI / 8 }, 0)

    return () => {
      timeline.scrollTrigger?.kill()
      timeline.kill()
    }
  }, [camera])

  return null
}

export default function HeroScene() {
  const isMobile = useMobile()
  const { activeSection } = useScene()

  const activeNodeIds = useMemo(() => {
    if (activeSection === 'skills') {
      return new Set(['frontend', 'api'])
    }

    if (activeSection === 'projects') {
      return new Set(nodes.map((node) => node.id))
    }

    if (activeSection === 'contact') {
      return new Set<string>()
    }

    return new Set(['frontend', 'api', 'queue'])
  }, [activeSection])

  return (
    <CanvasWrapper>
      <ambientLight intensity={0.35} />
      <directionalLight position={[2.8, 2.4, 2.2]} intensity={1.6} color="#67E8F9" />
      <pointLight position={[-2.6, -1.2, 2]} intensity={0.9} color="#39FF88" />
      <Environment preset="city" />
      <CameraAnimation />

      <AmbientParticles />

      <group scale={isMobile ? 0.82 : 1}>
        {nodes.map((node) => (
          <Node key={node.id} label={node.label} position={node.position} active={activeNodeIds.has(node.id)} />
        ))}
        <Connections />
        <FlowParticles />
      </group>

      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.4} />
    </CanvasWrapper>
  )
}
