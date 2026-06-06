import { Line } from '@react-three/drei'
import useEdges from './useEdges'

export default function Edges() {
  const edges = useEdges()

  return (
    <group>
      {edges.map((edge) => (
        <Line key={edge.id} points={[edge.from, edge.to]} color="#67E8F9" linewidth={1} transparent opacity={edge.opacity} />
      ))}
    </group>
  )
}
