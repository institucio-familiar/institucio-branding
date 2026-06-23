import { $scroll } from '@/scripts/stores/scroll'
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
}
