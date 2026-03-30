import { Line } from '@react-three/drei'
import useEdges from './useEdges'

export default function Edges() {
  const edges = useEdges()

  return (
    <group>
      {edges.map((edge) => (
        <Line key={edge.id} points={[edge.from, edge.to]} color="#67E8F9" lineWidth={1.15} transparent opacity={edge.opacity} />
      ))}
    </group>
  )
}
