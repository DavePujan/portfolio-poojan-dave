import { Bloom, EffectComposer } from '@react-three/postprocessing'
import CameraController from '../core/CameraController'
import Lighting from '../core/Lighting'
import Edges from '../systems/edges/Edges'
import FlowParticles from '../systems/flow/FlowParticles'
import Nodes from '../systems/nodes/Nodes'

type SceneProps = {
  intensity: number
  lowPerf: boolean
}

export default function ProjectsSystemScene({ intensity, lowPerf }: SceneProps) {
  return (
    <>
      <Lighting intensity={intensity * 0.95} />
      <CameraController />
      <Nodes />
      <Edges />
      <FlowParticles disabled={false} />
      {!lowPerf && (
        <EffectComposer enableNormalPass={false} multisampling={2}>
          <Bloom mipmapBlur intensity={0.52 * intensity} luminanceThreshold={0.2} luminanceSmoothing={0.5} />
        </EffectComposer>
      )}
    </>
  )
}
