import { useScene } from '../../context/useScene'

export default function useSceneState() {
  const { sceneState, setSceneState, setFocusNode, setHoverNode, setFocusStrength, setInteraction, setCameraMode } = useScene()

  if (!sceneState) {
    throw new Error('useSceneState must be used within SceneContext provider')
  }

  return {
    section: sceneState.section,
    cameraMode: sceneState.cameraMode,
    interaction: sceneState.interaction,
    focusNode: sceneState.focusNode,
    hoverNode: sceneState.hoverNode,
    focusStrength: sceneState.focusStrength,
    intensity: sceneState.intensity,
    performanceMode: sceneState.performanceMode,
    setFocusNode,
    setHoverNode,
    setFocusStrength,
    setInteraction,
    setCameraMode,
    setSceneState,
  }
}
