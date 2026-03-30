import { useMemo } from 'react'
import { EDGES } from '../../config/edges.config'
import { NODES } from '../../config/nodes.config'
import useSceneState from '../../hooks/useSceneState'

type VisualEdge = {
  id: string
  from: [number, number, number]
  to: [number, number, number]
  opacity: number
}

export default function useEdges(): VisualEdge[] {
  const { section, focusNode } = useSceneState()

  return useMemo(() => {
    const nodeMap = new Map(NODES.map((node) => [node.id, node.position]))

    return EDGES.map(([fromId, toId]) => {
      const focused = Boolean(focusNode)
      const related = focusNode === fromId || focusNode === toId

      let baseOpacity = section === 'contact' ? 0.12 : section === 'projects' ? 0.55 : 0.35
      if (focused) {
        baseOpacity = related ? 0.85 : 0.12
      }

      return {
        id: `${fromId}-${toId}`,
        from: nodeMap.get(fromId) ?? [0, 0, 0],
        to: nodeMap.get(toId) ?? [0, 0, 0],
        opacity: baseOpacity,
      }
    })
  }, [focusNode, section])
}
