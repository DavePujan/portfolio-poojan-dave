import { useScene } from '../../context/useScene'

export default function useSceneState() {
  const { sceneState, setSceneState, setFocusNode, setInteraction } = useScene()

  return {
    section: sceneState.section,
    cameraMode: sceneState.cameraMode,
    interaction: sceneState.interaction,
    focusNode: sceneState.focusNode,
    intensity: sceneState.intensity,
    performanceMode: sceneState.performanceMode,
    setFocusNode,
    setInteraction,
    setSceneState,
  }
}
