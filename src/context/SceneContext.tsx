import { createContext, useMemo, useState, type ReactNode } from 'react'

type SceneSection = 'hero' | 'skills' | 'projects' | 'contact'

type SceneContextType = {
  activeSection: SceneSection
  setActiveSection: (section: SceneSection) => void
}

const SceneContext = createContext<SceneContextType | null>(null)

export function SceneProvider({ children }: { children: ReactNode }) {
  const [activeSection, setActiveSection] = useState<SceneSection>('hero')

  const value = useMemo(
    () => ({
      activeSection,
      setActiveSection,
    }),
    [activeSection],
  )

  return <SceneContext.Provider value={value}>{children}</SceneContext.Provider>
}

export { SceneContext }
