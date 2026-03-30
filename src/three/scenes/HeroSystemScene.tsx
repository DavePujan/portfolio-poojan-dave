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

export default function HeroSystemScene({ intensity, lowPerf }: SceneProps) {
  return (
    <>
      <Lighting intensity={intensity} />
      <CameraController />
      <Nodes />
      <Edges />
      <FlowParticles disabled={lowPerf} />
      {!lowPerf && (
        <EffectComposer enableNormalPass={false} multisampling={4}>
          <Bloom mipmapBlur intensity={0.62 * intensity} luminanceThreshold={0.18} luminanceSmoothing={0.55} />
        </EffectComposer>
      )}
    </>
  )
}
