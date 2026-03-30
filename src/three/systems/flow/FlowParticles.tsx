import useFlow from './useFlow'

type FlowParticlesProps = {
  disabled?: boolean
}

export default function FlowParticles({ disabled = false }: FlowParticlesProps) {
  const { flowPoints, meshRefs } = useFlow(disabled)

  if (flowPoints.length === 0) {
    return null
  }

  return (
    <group>
      {flowPoints.map((_, index) => (
        <mesh
          key={`flow-${index}`}
          ref={(mesh) => {
            meshRefs.current[index] = mesh
          }}
        >
          <sphereGeometry args={[0.038, 10, 10]} />
          <meshBasicMaterial color="#22D3EE" transparent opacity={0.7} />
        </mesh>
      ))}
    </group>
  )
}
