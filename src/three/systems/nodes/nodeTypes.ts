export type NodeType = 'frontend' | 'api' | 'queue' | 'worker' | 'cache' | 'db'

export type SceneNode = {
  id: string
  label: string
  position: [number, number, number]
  type: NodeType
}

export type VisualNode = SceneNode & {
  scale: number
  opacity: number
  isActive: boolean
}
