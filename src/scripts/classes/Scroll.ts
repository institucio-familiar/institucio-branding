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

  // =============================================================================
  // Lifecycle
  // =============================================================================
  static init() {
    gsap.registerPlugin(ScrollTrigger)

    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }

    this.locomotiveScroll = new LocomotiveScroll({
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
