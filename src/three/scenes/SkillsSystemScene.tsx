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

export default function SkillsSystemScene({ intensity, lowPerf }: SceneProps) {
  return (
    <>
      <Lighting intensity={intensity * 0.88} />
      <CameraController />
      <Nodes />
      <Edges />
      <FlowParticles disabled={lowPerf} />
      {!lowPerf && (
        <EffectComposer enableNormalPass={false} multisampling={2}>
          <Bloom mipmapBlur intensity={0.44 * intensity} luminanceThreshold={0.2} luminanceSmoothing={0.5} />
        </EffectComposer>
      )}
    </>
  )
}
