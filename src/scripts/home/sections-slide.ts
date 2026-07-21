import { gsap } from 'gsap'

export function initSectionsSlide() {
  const sectionsBlock = document.querySelector('[data-home-sections]')
  const section2 = document.querySelector('[data-home-section-2]')

  if (!sectionsBlock || !section2) return () => {}

  const ctx = gsap.context(() => {
    gsap.fromTo(
      section2,
      { x: '100%' },
      {
        x: '0%',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionsBlock,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true
        }
      }
    )
  }, sectionsBlock)

  return () => ctx.revert()
}
