import Hero from '../sections/hero/Hero.tsx'
import Contact from '../sections/contact/Contact.tsx'
import Skills from '../sections/skills/Skills.tsx'
import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { useScene } from '../context/useScene'

export default function Home() {
  const { setActiveSection, setCameraMode, setInteraction } = useScene()

  useEffect(() => {
    setCameraMode('wide')
    setInteraction('idle')

    setActiveSection('hero')

    const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-section]'))

    if (sections.length === 0) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return
          }

          const section = entry.target.getAttribute('data-section')
          if (section === 'hero' || section === 'skills' || section === 'contact' || section === 'projects') {
            setActiveSection(section)
          }
        })
      },
      {
        threshold: 0.45,
        rootMargin: '-10% 0px -30% 0px',
      },
    )

    sections.forEach((section) => observer.observe(section))

    return () => {
      observer.disconnect()
    }
  }, [setActiveSection, setCameraMode, setInteraction])

  return (
    <main className="relative min-h-screen text-slate-100">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45 }}>
        <Hero />
        <Skills />
        <Contact />
      </motion.div>
    </main>
  )
}
