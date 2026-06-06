import CanvasWrapper from '../canvas/CanvasWrapper'
import { lazy } from 'react'
import useSceneState from '../hooks/useSceneState'

const ContactSystemScene = lazy(() => import('./ContactSystemScene'))
const HeroSystemScene = lazy(() => import('./HeroSystemScene'))
const ProjectsSystemScene = lazy(() => import('./ProjectsSystemScene'))
const SkillsSystemScene = lazy(() => import('./SkillsSystemScene'))

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
