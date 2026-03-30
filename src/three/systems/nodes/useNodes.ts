import { useMemo } from 'react'
import { NODES } from '../../config/nodes.config'
import useSceneState from '../../hooks/useSceneState'
import type { VisualNode } from './nodeTypes'

const sectionNodeMap: Record<'hero' | 'skills' | 'projects' | 'contact', Set<string>> = {
  hero: new Set(['frontend', 'api', 'queue', 'worker', 'redis', 'db']),
  skills: new Set(['frontend', 'api', 'worker']),
  projects: new Set(['api', 'queue', 'worker', 'redis', 'db']),
  contact: new Set(['frontend', 'api']),
}

export default function useNodes(): VisualNode[] {
  const { section, focusNode, interaction } = useSceneState()

  return useMemo(() => {
    const sectionNodes = sectionNodeMap[section]

    return NODES.map((node) => {
      const focusActive = Boolean(focusNode)
      const isFocusedNode = focusNode === node.id
      const isSectionNode = sectionNodes.has(node.id)
      const isActive = focusActive ? isFocusedNode : isSectionNode

      const baseScale = isActive ? 1.12 : 0.92
      const hoverBoost = interaction === 'hover' && isActive ? 0.14 : 0
      const scale = baseScale + hoverBoost
      const opacity = isActive ? 1 : focusActive ? 0.16 : 0.38

      return {
        ...node,
        scale,
        opacity,
        isActive,
      }
    })
  }, [focusNode, interaction, section])
}
