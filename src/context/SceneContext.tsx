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
  hoverNode?: string
  focusStrength: number
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
  setHoverNode: (hoverNode?: string) => void
  setFocusStrength: (focusStrength: number) => void
  setPerformanceMode: (performanceMode: PerformanceMode, intensity?: number) => void
}

const SceneContext = createContext<SceneContextType | null>(null)

export function SceneProvider({ children }: { children: ReactNode }) {
  const [sceneState, setSceneState] = useState<SceneState>({
    section: 'hero',
    cameraMode: 'wide',
    interaction: 'idle',
    focusNode: undefined,
    hoverNode: undefined,
    focusStrength: 0,
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
    setSceneState((prev) => ({ ...prev, focusNode, focusStrength: focusNode ? 1 : 0 }))
  }, [])

  const setHoverNode = useCallback((hoverNode?: string) => {
    setSceneState((prev) => ({ ...prev, hoverNode }))
  }, [])

  const setFocusStrength = useCallback((focusStrength: number) => {
    setSceneState((prev) => ({ ...prev, focusStrength }))
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
      setHoverNode,
      setFocusStrength,
      setPerformanceMode,
    }),
    [sceneState, setActiveSection, setCameraMode, setInteraction, setFocusNode, setHoverNode, setFocusStrength, setPerformanceMode],
  )

  return <SceneContext.Provider value={value}>{children}</SceneContext.Provider>
}

export { SceneContext }
