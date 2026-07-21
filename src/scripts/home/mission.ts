import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const FROST = '#eef3fd'
const BLUE = '#1469ff'

export function initMission() {
  const section = document.querySelector('[data-home-mission-section]')
  if (!section) return () => {}

  const sticky = section.querySelector('[data-mission-sticky]')
  const frameOrder = ['outer', 'middle', 'inner']
  const text = section.querySelector('[data-mission-text]')
  const punchaPath = section.querySelector('svg path')

  const ctx = gsap.context(() => {
    gsap.set(section, { backgroundColor: FROST })
    if (punchaPath) {
      gsap.set(punchaPath, { fill: FROST })
    }

    const colorTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 50%',
        toggleActions: 'play none none reverse'
      }
    })

    colorTimeline.to(
      section,
      {
        backgroundColor: BLUE,
        duration: 0.6,
        ease: 'power2.inOut'
      },
      0
    )

    if (punchaPath) {
      colorTimeline.to(
        punchaPath,
        {
          fill: BLUE,
          duration: 0.6,
          ease: 'power2.inOut'
        },
        0
      )
    }

    if (sticky) {
      const frames = frameOrder
        .map((name) => section.querySelector(`[data-mission-frame="${name}"]`))
        .filter(Boolean)

      gsap.set([...frames, text], { autoAlpha: 0 })

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
          pin: sticky,
          anticipatePin: 1
        }
      })

      frames.forEach((frame, index) => {
        timeline.fromTo(
          frame,
          { autoAlpha: 0, scale: 0.85 },
          {
            autoAlpha: 1,
            scale: 1,
            ease: 'power2.out',
            duration: 1
          },
          index === 0 ? 0 : '>'
        )
      })

      if (text) {
        timeline.fromTo(
          text,
          { autoAlpha: 0, y: 40 },
          {
            autoAlpha: 1,
            y: 0,
            ease: 'power2.out',
            duration: 1
          },
          '>'
        )
      }
    }
  }, section)

  return () => ctx.revert()
}
