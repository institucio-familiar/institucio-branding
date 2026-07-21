import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MD } from '@/scripts/home/breakpoints'

gsap.registerPlugin(ScrollTrigger)

const NAVY = '#0b2449'
const FROST = '#eef3fd'
const BLUE = '#1469ff'

export function initAnimatedGrid() {
  const section = document.querySelector('[data-home-animated-grid]')
  if (!section) return () => {}

  const sticky = section.querySelector('[data-animated-grid-sticky]')
  const centerMedia = section.querySelector(
    '[data-grid-center-media]'
  ) as HTMLElement | null
  const centerMediaInner = section.querySelector('[data-grid-center-media-inner]')
  const centerSlot = section.querySelector('[data-grid-center-slot]')
  const slotOrder = ['left-top', 'right-top', 'left-bottom', 'right-bottom']

  const ctx = gsap.context(() => {
    gsap.set(section, { backgroundColor: NAVY })

    const animateBackground = (color: string) => {
      gsap.to(section, {
        backgroundColor: color,
        duration: 0.6,
        ease: 'power2.inOut',
        overwrite: 'auto'
      })
    }

    ScrollTrigger.create({
      trigger: section,
      start: 'top 50%',
      onEnter: () => animateBackground(FROST),
      onLeaveBack: () => animateBackground(NAVY)
    })

    ScrollTrigger.create({
      trigger: section,
      start: 'bottom 50%',
      onEnter: () => animateBackground(BLUE),
      onLeaveBack: () => animateBackground(FROST)
    })

    const mm = gsap.matchMedia()

    mm.add(MD, () => {
      if (!sticky) return

      const CLIP_ROUND = 5
      const CLIP_START = 16

      let targetClip = {
        top: CLIP_START,
        right: CLIP_START,
        bottom: CLIP_START,
        left: CLIP_START,
        round: CLIP_ROUND
      }

      function measureTargetClip() {
        if (!centerMedia || !centerSlot) {
          return targetClip
        }

        const mediaRect = centerMedia.getBoundingClientRect()
        const slotRect = centerSlot.getBoundingClientRect()

        return {
          top: Math.max(0, slotRect.top - mediaRect.top),
          right: Math.max(0, mediaRect.right - slotRect.right),
          bottom: Math.max(0, mediaRect.bottom - slotRect.bottom),
          left: Math.max(0, slotRect.left - mediaRect.left),
          round: CLIP_ROUND
        }
      }

      function applyCenterClip(progress: number) {
        if (!centerMedia) return

        const top = gsap.utils.interpolate(CLIP_START, targetClip.top, progress)
        const right = gsap.utils.interpolate(
          CLIP_START,
          targetClip.right,
          progress
        )
        const bottom = gsap.utils.interpolate(
          CLIP_START,
          targetClip.bottom,
          progress
        )
        const left = gsap.utils.interpolate(
          CLIP_START,
          targetClip.left,
          progress
        )

        centerMedia.style.clipPath = `inset(${top}px ${right}px ${bottom}px ${left}px round ${CLIP_ROUND}px)`
      }

      function refreshClipTarget() {
        targetClip = measureTargetClip()
      }

      refreshClipTarget()

      const clipProgress = { value: 0 }

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
          pin: sticky,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onRefreshInit: refreshClipTarget,
          onRefresh: () => applyCenterClip(clipProgress.value)
        }
      })

      timeline.to(
        clipProgress,
        {
          value: 1,
          ease: 'power4.out',
          duration: 6,
          onUpdate: () => applyCenterClip(clipProgress.value)
        },
        0
      )

      if (centerMediaInner) {
        timeline.fromTo(
          centerMediaInner,
          { scale: 1 },
          { scale: 0.65, ease: 'power4.out', duration: 6 },
          0
        )
      }

      slotOrder.forEach((slot, index) => {
        const item = section.querySelector(`[data-grid-slot="${slot}"]`)
        if (!item) return

        const origin = item.getAttribute('data-origin')
        const fromX = origin === 'right' ? '50vw' : '-50vw'
        const fromY = '30vh'

        timeline.fromTo(
          item,
          { x: fromX, y: fromY },
          {
            x: 0,
            y: 0,
            ease: 'power4.out',
            duration: 6
          },
          index * 0.25
        )
      })
    })
  }, section)

  return () => ctx.revert()
}
