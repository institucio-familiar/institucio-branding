import { gsap } from 'gsap'

export function initHero() {
  const heroSection = document.querySelector('[data-hero-section]')
  const heroMedia = document.querySelector('[data-hero-media]')

  if (!heroSection || !heroMedia) return () => {}

  const ctx = gsap.context(() => {
    gsap.fromTo(
      heroMedia,
      { scale: 1.2 },
      {
        scale: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: heroSection,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      }
    )
  }, heroSection)

  return () => ctx.revert()
}
