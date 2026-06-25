import { gsap } from 'gsap'

const REVEAL_FROM = { y: 40, opacity: 0 }
const REVEAL_TO = {
  duration: 0.8,
  ease: 'power3.out',
  stagger: 0.1
}

let activeCleanup: (() => void) | null = null

function getDirectChildren(container: Element): HTMLElement[] {
  return [...container.children].filter(
    (child): child is HTMLElement => child instanceof HTMLElement
  )
}

function createRevealTween(
  elements: HTMLElement[],
  trigger: HTMLElement
): gsap.core.Tween {
  return gsap.from(elements, {
    ...REVEAL_FROM,
    ...REVEAL_TO,
    scrollTrigger: {
      trigger,
      start: 'top 85%',
      once: true
    }
  })
}

export function initRevealInView(): () => void {
  const tweens: gsap.core.Tween[] = []

  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches

  if (!prefersReducedMotion) {
    document
      .querySelectorAll<HTMLElement>('[data-reveal-in-view]')
      .forEach((container) => {
        const elements = getDirectChildren(container)
        if (elements.length === 0) return

        tweens.push(createRevealTween(elements, container))
      })

    document
      .querySelectorAll<HTMLElement>('[data-page-aside-section]')
      .forEach((section) => {
        const content = section.querySelector('[data-page-aside-content]')
        if (!content) return

        const elements = getDirectChildren(content).filter(
          (child) => !child.hasAttribute('data-reveal-in-view')
        )
        if (elements.length === 0) return

        tweens.push(createRevealTween(elements, section))
      })
  }

  return () => {
    tweens.forEach((tween) => {
      tween.scrollTrigger?.kill()
      tween.kill()
    })
  }
}

export function setupRevealInView() {
  const run = () => {
    activeCleanup?.()
    activeCleanup = initRevealInView()
  }

  run()

  document.addEventListener('swup:visit:start', () => {
    activeCleanup?.()
    activeCleanup = null
  })

  document.addEventListener('swup:content:replace', run)
}
