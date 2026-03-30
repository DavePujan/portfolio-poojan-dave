import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import type { Mesh, Vector3Tuple } from 'three'
import * as THREE from 'three'
import { EDGES } from '../../config/edges.config'
import { NODES } from '../../config/nodes.config'
import useSceneState from '../../hooks/useSceneState'

export default function useFlow(disabled?: boolean) {
  const meshRefs = useRef<Array<Mesh | null>>([])
  const { section, performanceMode } = useSceneState()

  const flowCount = performanceMode === 'low' ? 0 : performanceMode === 'balanced' ? 12 : 20
  const sectionSpeed = section === 'projects' ? 1.6 : section === 'contact' ? 0.5 : 1

  const flowPoints = useMemo(() => {
    if (flowCount === 0) {
      return []
    }

    const nodeMap = new Map<string, Vector3Tuple>(NODES.map((node) => [node.id, node.position]))

    return [...Array(flowCount)].map((_, index) => {
      const edge = EDGES[index % EDGES.length]
      const from = new THREE.Vector3(...(nodeMap.get(edge[0]) ?? [0, 0, 0]))
      const to = new THREE.Vector3(...(nodeMap.get(edge[1]) ?? [0, 0, 0]))

      return {
        from,
        to,
        progress: (index * 0.17) % 1,
        speed: (0.0025 + (index % 5) * 0.0009) * sectionSpeed,
      }
    })
  }, [flowCount, sectionSpeed])

  useFrame(() => {
    if (disabled || document.hidden || flowPoints.length === 0) {
      return
    }

    flowPoints.forEach((point, index) => {
      point.progress += point.speed

      if (point.progress > 1) {
        point.progress = 0
      }

      const mesh = meshRefs.current[index]
      if (!mesh) {
        return
      }

      mesh.position.lerpVectors(point.from, point.to, point.progress)
    })
  })

  return {
    flowPoints,
    meshRefs,
  }
}
