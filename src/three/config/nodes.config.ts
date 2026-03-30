import type { SceneNode } from '../systems/nodes/nodeTypes'

export const NODES: SceneNode[] = [
  { id: 'frontend', label: 'Frontend', position: [-2.9, 0.6, 0.2], type: 'frontend' },
  { id: 'api', label: 'API Gateway', position: [-1.3, 0.15, 0], type: 'api' },
  { id: 'queue', label: 'Queue', position: [0, 0.5, -0.1], type: 'queue' },
  { id: 'worker', label: 'Workers', position: [1.4, -0.35, 0.18], type: 'worker' },
  { id: 'redis', label: 'Redis', position: [2.7, 0.85, -0.12], type: 'cache' },
  { id: 'db', label: 'Database', position: [2.8, -0.95, 0.05], type: 'db' },
]
