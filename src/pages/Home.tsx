import Hero from '../sections/hero/Hero.tsx'
import Contact from '../sections/contact/Contact.tsx'
import Skills from '../sections/skills/Skills.tsx'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect } from 'react'
import { useScene } from '../context/useScene'
import usePerformanceMode from '../hooks/usePerformanceMode'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const { setActiveSection, setCameraMode, setInteraction } = useScene()
  const performance = usePerformanceMode()

  useEffect(() => {
    setCameraMode('wide')
    setInteraction('idle')

    if (performance.lowPerf) {
      setActiveSection('hero')

      return () => {
        ScrollTrigger.getAll().forEach((trigger) => {
          const id = `${trigger.vars.id ?? ''}`
          if (id.startsWith('scene-')) {
            trigger.kill()
          }
        })
      }
    }

    const sections = [
      { id: '#hero', value: 'hero' as const },
      { id: '#skills', value: 'skills' as const },
      { id: '#contact', value: 'contact' as const },
    ]

    const triggers = sections.map((section) => {
      return ScrollTrigger.create({
        id: `scene-${section.value}`,
        trigger: section.id,
        start: 'top 55%',
        end: 'bottom 45%',
        onEnter: () => setActiveSection(section.value),
        onEnterBack: () => setActiveSection(section.value),
      })
    })

    setActiveSection('hero')

    return () => {
      triggers.forEach((trigger) => trigger.kill())
      ScrollTrigger.getAll().forEach((trigger) => {
        const id = `${trigger.vars.id ?? ''}`
        if (id.startsWith('scene-')) {
          trigger.kill()
        }
      })
    }
  }, [performance.lowPerf, setActiveSection, setCameraMode, setInteraction])

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
