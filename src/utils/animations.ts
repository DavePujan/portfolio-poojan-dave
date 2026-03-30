import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function fadeUp(element: Element) {
  gsap.fromTo(
    element,
    { y: 36, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 82%',
      },
    },
  )
}

export function heroIntro(elements: Element[]) {
  return gsap.fromTo(
    elements,
    { y: 24, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      stagger: 0.16,
      duration: 0.7,
      ease: 'power3.out',
    },
  )
}
