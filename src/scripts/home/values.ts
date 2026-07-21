import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MD } from '@/scripts/home/breakpoints'

gsap.registerPlugin(ScrollTrigger)

const NAVY = '#0b2449'
const FROST = '#eef3fd'

export function initValues() {
  const scrollContainer = document.querySelector('[data-home-values-scroll]')
  const section = scrollContainer?.querySelector('[data-home-values-section]')

  if (!scrollContainer || !section) return () => {}

  const sticky = scrollContainer.querySelector('[data-home-values-sticky]')
  const background = section.querySelector('[data-home-values-bg]')
  const inner = section.querySelector('[data-home-values-inner]')
  const reveal = section.querySelector('[data-values-reveal]')
  const symbolImages = section.querySelectorAll('[data-values-symbol]')
  const punchaPaths = background?.querySelectorAll('path') ?? []

  const getInnerScrollDistance = () => {
    if (!(inner instanceof HTMLElement)) return 0

    return Math.max(
      0,
      inner.scrollHeight - document.documentElement.clientHeight
    )
  }

  const SCROLL_RUNWAY_VH = 400
  const EXPAND_COMPLETE_AT_SCROLL_VH = 200
  const PIN_SCROLL_VH = SCROLL_RUNWAY_VH - 100
  const TOTAL_TIMELINE_DURATION = 1
  const EXPAND_TO_100VH_DURATION =
    TOTAL_TIMELINE_DURATION * (EXPAND_COMPLETE_AT_SCROLL_VH / PIN_SCROLL_VH)
  const INNER_SCROLL_DURATION =
    TOTAL_TIMELINE_DURATION - EXPAND_TO_100VH_DURATION

  const ctx = gsap.context(() => {
    const setupSymbolCycle = () => {
      if (symbolImages.length <= 1) return

      const symbolsContainer = section.querySelector('[data-values-symbols]')
      if (!symbolsContainer) return

      gsap.set(symbolImages, { autoAlpha: 0 })
      gsap.set(symbolImages[0], { autoAlpha: 1 })

      const CYCLE_COUNT = 2
      const SYMBOL_DURATION = 0.12
      const timeline = gsap.timeline({
        paused: true,
        scrollTrigger: {
          trigger: symbolsContainer,
          start: 'top 85%',
          toggleActions: 'play none none none',
          once: true
        }
      })

      for (let cycle = 0; cycle < CYCLE_COUNT; cycle++) {
        const isLastCycle = cycle === CYCLE_COUNT - 1

        for (let i = 0; i < symbolImages.length; i++) {
          if (isLastCycle && i === symbolImages.length - 1) break

          const current = symbolImages[i]
          const next = symbolImages[(i + 1) % symbolImages.length]

          timeline
            .set(current, { autoAlpha: 0 })
            .set(next, { autoAlpha: 1 }, '<')
            .to({}, { duration: SYMBOL_DURATION })
        }
      }
    }

    const setupScrollReveal = (withMaskZoom: boolean) => {
      if (
        !(sticky instanceof HTMLElement) ||
        !(background instanceof HTMLElement) ||
        !(inner instanceof HTMLElement)
      ) {
        return
      }

      const maskZoom = section.querySelector('#mask-zoom')

      gsap.set(background, {
        height: '50lvh'
      })
      gsap.set(inner, { y: 0 })
      gsap.set(reveal, { autoAlpha: 0 })

      if (maskZoom && withMaskZoom) {
        gsap.set(maskZoom, { scale: 0.65 })
      }

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: scrollContainer,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
          pin: sticky,
          anticipatePin: 1,
          invalidateOnRefresh: true
        }
      })

      timeline
        .to(background, {
          height: '100lvh',
          ease: 'none',
          duration: EXPAND_TO_100VH_DURATION
        })
        .to(reveal, {
          autoAlpha: 1,
          ease: 'none',
          duration: 0.1
        })
        .to(
          inner,
          {
            y: () => -getInnerScrollDistance(),
            ease: 'none',
            duration: INNER_SCROLL_DURATION
          },
          '>'
        )

      if (maskZoom && withMaskZoom) {
        timeline.to(
          maskZoom,
          {
            scale: 1,
            ease: 'none',
            duration: INNER_SCROLL_DURATION
          },
          '<'
        )
      }

      gsap.set(background, { backgroundColor: NAVY })
      if (punchaPaths.length > 0) {
        gsap.set(punchaPaths, { fill: NAVY })
      }

      const colorTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: scrollContainer,
          start: 'bottom 50%',
          toggleActions: 'play none none reverse'
        }
      })

      colorTimeline.to(
        background,
        {
          backgroundColor: FROST,
          duration: 0.6,
          ease: 'power2.inOut'
        },
        0
      )

      if (punchaPaths.length > 0) {
        colorTimeline.to(
          punchaPaths,
          {
            fill: FROST,
            duration: 0.6,
            ease: 'power2.inOut'
          },
          0
        )
      }
    }

    setupSymbolCycle()

    const mm = gsap.matchMedia()
    mm.add(MD, () => {
      setupScrollReveal(true)
    })
    mm.add(`not ${MD}`, () => {
      setupScrollReveal(false)
    })

    requestAnimationFrame(() => {
      ScrollTrigger.refresh()
    })
  }, scrollContainer)

  return () => ctx.revert()
}
