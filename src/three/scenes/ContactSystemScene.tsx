import CameraController from '../core/CameraController'
import Lighting from '../core/Lighting'

type SceneProps = {
  intensity: number
}

export default function ContactSystemScene({ intensity }: SceneProps) {
  return (
    <>
      <Lighting intensity={intensity * 0.35} />
      <CameraController />
    </>
  )
}
