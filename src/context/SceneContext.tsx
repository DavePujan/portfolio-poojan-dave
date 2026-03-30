import { createContext, useCallback, useMemo, useState, type ReactNode } from 'react'

type SceneSection = 'hero' | 'skills' | 'projects' | 'contact'
type CameraMode = 'wide' | 'focus'
type InteractionMode = 'idle' | 'hover'
type PerformanceMode = 'low' | 'balanced' | 'high'

type SceneState = {
  section: SceneSection
  cameraMode: CameraMode
  interaction: InteractionMode
  focusNode?: string
  intensity: number
  performanceMode: PerformanceMode
}

type SceneContextType = {
  sceneState: SceneState
  setSceneState: (value: SceneState | ((prev: SceneState) => SceneState)) => void
  activeSection: SceneSection
  setActiveSection: (section: SceneSection) => void
  setCameraMode: (cameraMode: CameraMode) => void
  setInteraction: (interaction: InteractionMode) => void
  setFocusNode: (focusNode?: string) => void
  setPerformanceMode: (performanceMode: PerformanceMode, intensity?: number) => void
}

const SceneContext = createContext<SceneContextType | null>(null)

export function SceneProvider({ children }: { children: ReactNode }) {
  const [sceneState, setSceneState] = useState<SceneState>({
    section: 'hero',
    cameraMode: 'wide',
    interaction: 'idle',
    focusNode: undefined,
    intensity: 0.7,
    performanceMode: 'balanced',
  })

  const setActiveSection = useCallback((section: SceneSection) => {
    setSceneState((prev) => ({ ...prev, section }))
  }, [])

  const setCameraMode = useCallback((cameraMode: CameraMode) => {
    setSceneState((prev) => ({ ...prev, cameraMode }))
  }, [])

  const setInteraction = useCallback((interaction: InteractionMode) => {
    setSceneState((prev) => ({ ...prev, interaction }))
  }, [])

  const setFocusNode = useCallback((focusNode?: string) => {
    setSceneState((prev) => ({ ...prev, focusNode }))
  }, [])

  const setPerformanceMode = useCallback((performanceMode: PerformanceMode, intensity?: number) => {
    setSceneState((prev) => ({
      ...prev,
      performanceMode,
      intensity: intensity ?? prev.intensity,
    }))
  }, [])

  const value = useMemo(
    () => ({
      sceneState,
      setSceneState,
      activeSection: sceneState.section,
      setActiveSection,
      setCameraMode,
      setInteraction,
      setFocusNode,
      setPerformanceMode,
    }),
    [sceneState, setActiveSection, setCameraMode, setInteraction, setFocusNode, setPerformanceMode],
  )

  return <SceneContext.Provider value={value}>{children}</SceneContext.Provider>
}

export { SceneContext }
