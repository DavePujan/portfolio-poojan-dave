import { useMemo, useState } from 'react'

type CategorizedItem = {
  category: string
}

type UseProjectFilterResult<T extends CategorizedItem> = {
  activeCategory: string
  setActiveCategory: (value: string) => void
  categories: string[]
  filteredProjects: T[]
}

export default function useProjectFilter<T extends CategorizedItem>(projects: T[]): UseProjectFilterResult<T> {
  const [activeCategory, setActiveCategory] = useState('All')

  const categories = useMemo(() => {
    const categorySet = new Set<string>(['All'])
    projects.forEach((project) => categorySet.add(project.category))
    return [...categorySet]
  }, [projects])

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') {
      return projects
    }

    return projects.filter((project) => project.category === activeCategory)
  }, [activeCategory, projects])

  return {
    activeCategory,
    setActiveCategory,
    categories,
    filteredProjects,
  }
}
