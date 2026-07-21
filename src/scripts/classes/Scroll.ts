import { $scroll } from '@/scripts/stores/scroll'
import { getNavHeight } from '@/scripts/utils/nav-height'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import LocomotiveScroll, {
  type lenisTargetScrollTo,
  type ILenisScrollToOptions
} from 'locomotive-scroll'

export class Scroll {
  static locomotiveScroll: LocomotiveScroll

  private static inputLocked = false
  private static previousVirtualScroll:
    | ((data: {
        deltaX: number
        deltaY: number
        event: WheelEvent | TouchEvent
      }) => boolean)
    | undefined

  private static readonly scrollKeyBlocklist = new Set([
    'ArrowUp',
    'ArrowDown',
    'PageUp',
    'PageDown',
    'Home',
    'End',
    ' ',
    'Spacebar'
  ])

  private static onLockedKeydown = (event: KeyboardEvent) => {
    if (this.scrollKeyBlocklist.has(event.key)) {
      event.preventDefault()
    }
  }

  // =============================================================================
  // Lifecycle
  // =============================================================================
  static init() {
    gsap.registerPlugin(ScrollTrigger)

    // Avoid ScrollTrigger refresh loops when mobile browser chrome
    // shows/hides (which also changes dvh / innerHeight).
    ScrollTrigger.config({ ignoreMobileResize: true })

    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }

    this.locomotiveScroll = new LocomotiveScroll({
      // Keep wheel smooth; let touch use native scrolling so scrubbed
      // pins don't fight Lenis interpolation on mobile.
      lenisOptions: {
        syncTouch: false
      },
      initCustomTicker: (render) => {
        gsap.ticker.add(render)
      },
      destroyCustomTicker: (render) => {
        gsap.ticker.remove(render)
      },
      scrollCallback({ scroll, limit, velocity, direction, progress }) {
        $scroll.set({
          scroll,
          limit,
          velocity,
          direction,
          progress
        })
      }
    })

    gsap.ticker.lagSmoothing(0)

    const lenis = this.locomotiveScroll.lenisInstance
    if (lenis) {
      lenis.on('scroll', ScrollTrigger.update)
      ScrollTrigger.addEventListener('refresh', () => lenis.resize())
      ScrollTrigger.refresh()
    }

    this.scrollToInitialHash()
  }

  static destroy() {
    this.locomotiveScroll?.destroy()
  }

  // =============================================================================
  // Methods
  // =============================================================================
  static start() {
    this.locomotiveScroll?.start()
  }

  static stop() {
    this.locomotiveScroll?.stop()
  }

  /**
   * Block user scrolling without Lenis/Locomotive `stop()`.
   *
   * Lenis `stop()` adds `.lenis-stopped` → `overflow: clip` on <html>, which
   * breaks CSS `position: sticky` (and mid-scrub ScrollTriggers on sticky
   * sections). Locomotive `stop()` also tears down the GSAP custom ticker.
   *
   * Instead, reject virtual-scroll input and ignore scroll keys.
   */
  static lock() {
    const lenis = this.locomotiveScroll?.lenisInstance
    if (!lenis || this.inputLocked) return

    this.inputLocked = true
    this.previousVirtualScroll = lenis.options.virtualScroll

    // Settle any in-flight smooth scroll at the current animated position
    // without syncing to native scroll (that jump is what breaks scrub).
    lenis.targetScroll = lenis.animatedScroll
    ;(lenis as unknown as { animate: { stop: () => void } }).animate.stop()

    lenis.options.virtualScroll = (data) => {
      if (this.previousVirtualScroll?.(data) === false) return false
      if (data.event.cancelable) data.event.preventDefault()
      return false
    }

    window.addEventListener('keydown', this.onLockedKeydown, {
      passive: false
    })
  }

  static unlock() {
    const lenis = this.locomotiveScroll?.lenisInstance
    if (!lenis || !this.inputLocked) return

    this.inputLocked = false
    lenis.options.virtualScroll = this.previousVirtualScroll
    this.previousVirtualScroll = undefined
    window.removeEventListener('keydown', this.onLockedKeydown)
  }

  static addScrollElements(container: HTMLElement) {
    this.locomotiveScroll?.addScrollElements(container)
  }

  static removeScrollElements(container: HTMLElement) {
    this.locomotiveScroll?.removeScrollElements(container)
  }

  static scrollTo(
    target: lenisTargetScrollTo,
    options?: ILenisScrollToOptions
  ) {
    this.locomotiveScroll?.scrollTo(target, options)
  }

  static scrollToHash(options?: { immediate?: boolean }) {
    const rawHash = location.hash.slice(1)
    if (!rawHash) return false

    let hash = rawHash
    try {
      hash = decodeURIComponent(rawHash)
    } catch {
      // Keep the raw hash if it is malformed.
    }

    // Browsers/users often include a trailing slash (`#ilustracion/`).
    hash = hash.replace(/\/+$/, '')
    if (!hash) return false

    const target = document.getElementById(hash)
    if (!target) return false

    this.scrollTo(target, {
      offset: -getNavHeight(),
      immediate: options?.immediate,
      force: true
    })
    return true
  }

  private static scrollToInitialHash() {
    if (!location.hash) return

    const run = () => {
      this.locomotiveScroll?.resize()
      ScrollTrigger.refresh()
      this.scrollToHash({ immediate: true })
    }

    const schedule = () => {
      requestAnimationFrame(run)
    }

    // Wait for load so images/fonts have sized the page; scrolling earlier
    // often no-ops because Lenis still thinks the scroll limit is ~0.
    if (document.readyState === 'complete') {
      schedule()
    } else {
      window.addEventListener('load', schedule, { once: true })
    }
  }
}
