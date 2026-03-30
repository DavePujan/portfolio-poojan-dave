import projectDetails, { type ProjectCaseStudy } from './projectDetails'

export type ProjectMeta = Pick<ProjectCaseStudy, 'id' | 'title' | 'tagline' | 'summary' | 'category' | 'tier' | 'tech' | 'highlight' | 'links'>

const projectMeta: ProjectMeta[] = projectDetails.map((project) => ({
  id: project.id,
  title: project.title,
  tagline: project.tagline,
  summary: project.summary,
  category: project.category,
  tier: project.tier,
  tech: project.tech,
  highlight: project.highlight,
  links: project.links,
}))

export default projectMeta
