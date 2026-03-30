import { OrbitControls } from '@react-three/drei'
import CanvasWrapper from '../canvas/CanvasWrapper'
import SkillSphere from './SkillSphere'

export default function SkillSphereScene() {
  return (
    <CanvasWrapper>
      <ambientLight intensity={0.45} />
      <directionalLight position={[2, 3, 2]} intensity={1.4} color="#67E8F9" />
      <pointLight position={[-2, -1.5, 2]} intensity={0.8} color="#39FF88" />
      <SkillSphere />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.45} />
    </CanvasWrapper>
  )
}
