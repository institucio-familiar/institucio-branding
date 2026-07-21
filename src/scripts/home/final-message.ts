import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MD } from '@/scripts/home/breakpoints'

gsap.registerPlugin(ScrollTrigger)

export function initFinalMessage() {
  const firstSection = document.querySelector('[data-home-final-message-first]')
  const iconSection = document.querySelector(
    '[data-home-final-message-icon-section]'
  )
  const secondSection = document.querySelector(
    '[data-home-final-message-second]'
  )
  const thirdSection = document.querySelector('[data-home-final-message-third]')

  if (!firstSection && !iconSection && !secondSection && !thirdSection) {
    return () => {}
  }

  const root =
    firstSection ?? iconSection ?? secondSection ?? thirdSection ?? document.body

  const setupFirstMessageParallax = (section: Element) => {
    const text = section.querySelector('[data-final-message-first-text]')
    if (!text) return

    gsap.fromTo(
      text,
      { y: '-100lvh' },
      {
        y: '100lvh',
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
          invalidateOnRefresh: true
        }
      }
    )
  }

  const setupThirdMessageImageRotation = (section: Element) => {
    const image = section.querySelector('[data-final-message-third-image]')
    if (!image) return

    gsap.fromTo(
      image,
      { rotation: 25 },
      {
        rotation: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: image,
          start: 'top bottom',
          end: 'center center',
          scrub: true,
          invalidateOnRefresh: true
        }
      }
    )
  }

  const setupStickyTextReveal = (
    section: Element,
    containerSelector: string,
    textSelector: string
  ) => {
    const container = section.querySelector(containerSelector)
    const text = section.querySelector(textSelector)
    if (!container || !text) return

    gsap.set(text, { y: '100%' })

    gsap.to(text, {
      y: '17.5%',
      ease: 'power4.out',
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        invalidateOnRefresh: true
      }
    })
  }

  let ctx: gsap.Context

  ctx = gsap.context(() => {
    const mm = gsap.matchMedia()

    mm.add(MD, () => {
      if (firstSection) {
        setupFirstMessageParallax(firstSection)
      }
    })

    if (secondSection) {
      setupStickyTextReveal(
        secondSection,
        '[data-final-message-second-container]',
        '[data-final-message-second-text]'
      )
    }

    if (thirdSection) {
      setupStickyTextReveal(
        thirdSection,
        '[data-final-message-third-container]',
        '[data-final-message-third-text]'
      )
      setupThirdMessageImageRotation(thirdSection)
    }

    if (iconSection) {
      const track = iconSection.querySelector('[data-final-message-icon-track]')
      const icon = iconSection.querySelector('[data-final-message-icon]')

      const setupIconAnimation = () => {
        if (!track || !icon) return

        const getTravelDistance = () => window.innerWidth * 0.6

        gsap.set(icon, { x: 0 })

        gsap
          .timeline({
            scrollTrigger: {
              trigger: track,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
              invalidateOnRefresh: true
            }
          })
          .fromTo(
            icon,
            { x: 0 },
            {
              x: () => -getTravelDistance(),
              ease: 'none',
              duration: 1,
              immediateRender: false
            }
          )
      }

      if (icon instanceof HTMLImageElement) {
        if (icon.complete) {
          setupIconAnimation()
        } else {
          icon.addEventListener(
            'load',
            () => {
              ctx.add(setupIconAnimation)
            },
            { once: true }
          )
        }
      }
    }

    requestAnimationFrame(() => {
      ScrollTrigger.refresh()
    })
  }, root)

  return () => ctx.revert()
}
