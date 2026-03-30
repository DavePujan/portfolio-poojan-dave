import CanvasWrapper from '../canvas/CanvasWrapper'
import useSceneState from '../hooks/useSceneState'
import ContactSystemScene from './ContactSystemScene'
import HeroSystemScene from './HeroSystemScene'
import ProjectsSystemScene from './ProjectsSystemScene'
import SkillsSystemScene from './SkillsSystemScene'

type HeroSceneProps = {
  mode?: 'hero' | 'ambient'
  intensity?: number
  lowPerf?: boolean
}

export default function HeroScene({ mode = 'hero', intensity = 0.8, lowPerf = false }: HeroSceneProps) {
  const { section } = useSceneState()

  const sceneIntensity = mode === 'ambient' ? intensity * 0.65 : intensity

  return (
    <CanvasWrapper>
      {section === 'hero' && <HeroSystemScene intensity={sceneIntensity} lowPerf={lowPerf} />}
      {section === 'skills' && <SkillsSystemScene intensity={sceneIntensity} lowPerf={lowPerf} />}
      {section === 'projects' && <ProjectsSystemScene intensity={sceneIntensity} lowPerf={lowPerf} />}
      {section === 'contact' && <ContactSystemScene intensity={sceneIntensity} />}
    </CanvasWrapper>
  )
}
