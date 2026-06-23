import EmblaCarousel from 'embla-carousel'

const AUTOPLAY_DELAY_DEFAULT = 5000

export function initCarousels() {
  const destroyFns: (() => void)[] = []

  document.querySelectorAll<HTMLElement>('[data-carousel]').forEach((root) => {
    const viewport = root.querySelector<HTMLElement>('[data-carousel-viewport]')
    if (!viewport) return

    const slideCount = viewport.querySelectorAll('[data-carousel-slide]').length
    if (slideCount <= 1) return

    const autoplayDelay =
      Number(root.dataset.autoplayDelay) || AUTOPLAY_DELAY_DEFAULT
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    const embla = EmblaCarousel(viewport, { loop: true })
    const dots = [
      ...root.querySelectorAll<HTMLElement>('[data-carousel-dot]')
    ]
    const prevBtn = root.querySelector<HTMLButtonElement>('[data-carousel-prev]')
    const nextBtn = root.querySelector<HTMLButtonElement>('[data-carousel-next]')

    const updateDots = () => {
      const index = embla.selectedScrollSnap()

      dots.forEach((dot, dotIndex) => {
        const isActive = dotIndex === index
        dot.toggleAttribute('data-active', isActive)
        dot.setAttribute('aria-current', isActive ? 'true' : 'false')
      })
    }

    embla.on('select', updateDots)
    updateDots()

    let autoplayTimer: ReturnType<typeof setInterval> | undefined

    const stopAutoplay = () => {
      if (!autoplayTimer) return
      clearInterval(autoplayTimer)
      autoplayTimer = undefined
    }

    const startAutoplay = () => {
      if (prefersReducedMotion) return
      stopAutoplay()
      autoplayTimer = setInterval(() => embla.scrollNext(), autoplayDelay)
    }

    const resetAutoplay = () => {
      startAutoplay()
    }

    const listeners: Array<{
      element: HTMLElement
      type: string
      handler: (event: Event) => void
    }> = []

    const addListener = (
      element: HTMLElement | null,
      type: string,
      handler: (event: Event) => void
    ) => {
      if (!element) return
      element.addEventListener(type, handler)
      listeners.push({ element, type, handler })
    }

    dots.forEach((dot) => {
      addListener(dot, 'click', (event) => {
        event.stopPropagation()
        const index = Number(dot.dataset.carouselDot)
        embla.scrollTo(index)
        resetAutoplay()
      })
    })

    addListener(prevBtn, 'click', (event) => {
      event.stopPropagation()
      embla.scrollPrev()
      resetAutoplay()
    })

    addListener(nextBtn, 'click', (event) => {
      event.stopPropagation()
      embla.scrollNext()
      resetAutoplay()
    })

    startAutoplay()

    destroyFns.push(() => {
      stopAutoplay()
      listeners.forEach(({ element, type, handler }) => {
        element.removeEventListener(type, handler)
      })
      embla.destroy()
    })
  })

  return () => {
    destroyFns.forEach((destroy) => destroy())
  }
}
