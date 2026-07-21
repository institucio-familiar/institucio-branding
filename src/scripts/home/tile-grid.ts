import { gsap } from 'gsap'
import { MD } from '@/scripts/home/breakpoints'

export function initTileGrid() {
  const section = document.querySelector('[data-home-tile-grid]')
  if (!section) return () => {}

  const ctx = gsap.context(() => {
    const mm = gsap.matchMedia()

    mm.add(MD, () => {
      section.querySelectorAll('[data-tile-grid-mask]').forEach((mask) => {
        const transformOrigin =
          mask.getAttribute('data-origin') === 'top-right'
            ? 'top right'
            : 'top left'

        gsap.fromTo(
          mask,
          { scale: 0.3, transformOrigin },
          {
            scale: 1,
            transformOrigin,
            ease: 'none',
            scrollTrigger: {
              trigger: mask,
              start: 'top bottom',
              end: 'center center',
              scrub: true
            }
          }
        )
      })
    })

    section.querySelectorAll('[data-tile-grid-text]').forEach((text) => {
      gsap.fromTo(
        text,
        { y: 150 },
        {
          y: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: text,
            start: 'top bottom',
            end: 'center center',
            scrub: true
          }
        }
      )
    })
  }, section)

  return () => ctx.revert()
}
