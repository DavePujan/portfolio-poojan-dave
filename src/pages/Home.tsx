import Hero from '../sections/hero/Hero'
import Contact from '../sections/contact/Contact'
import Skills from '../sections/skills/Skills'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect } from 'react'
import { useScene } from '../context/useScene'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const { setActiveSection } = useScene()

  useEffect(() => {
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
    }
  }, [setActiveSection])

  return (
    <main className="relative min-h-screen bg-ink text-slate-100">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45 }}>
        <Hero />
        <Skills />
        <Contact />
      </motion.div>
    </main>
  )
}
