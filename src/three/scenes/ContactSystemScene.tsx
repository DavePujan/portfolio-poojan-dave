import CameraController from '../core/CameraController'
import Lighting from '../core/Lighting'
import Edges from '../systems/edges/Edges'
import Nodes from '../systems/nodes/Nodes'

type SceneProps = {
  intensity: number
}

export default function ContactSystemScene({ intensity }: SceneProps) {
  return (
    <>
      <Lighting intensity={intensity * 0.5} />
      <CameraController />
      <Nodes />
      <Edges />
    </>
  )
}
