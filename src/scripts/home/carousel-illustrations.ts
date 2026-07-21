import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function initCarouselIllustrations() {
  const section = document.querySelector('[data-home-carousel-illustrations]')
  if (!section) return () => {}

  const sticky = section.querySelector('[data-carousel-sticky]')
  const track = section.querySelector('[data-carousel-track]')
  const items = section.querySelectorAll('[data-carousel-item]')

  if (!sticky || !track || items.length === 0) return () => {}

  const ctx = gsap.context(() => {
    const videoItem = section.querySelector(
      '[data-carousel-video-item]'
    ) as HTMLElement | null
    const videoMedia = section.querySelector(
      '[data-carousel-video-media]'
    ) as HTMLVideoElement | null
    const textLines = section.querySelectorAll('[data-carousel-text-line]')

    const getSlideDistance = () => window.innerWidth

    const arcCache = {
      viewportCenter: 0,
      maxYOffset: 0,
      arcSpread: 0,
      items: [] as Array<{
        centerInTrack: number
        setY: (value: number) => void
        isVideo: boolean
      }>
    }

    const refreshArcCache = () => {
      const viewportWidth = window.innerWidth

      arcCache.viewportCenter = viewportWidth / 2
      arcCache.maxYOffset = Math.min(80, window.innerHeight * 0.15)
      arcCache.arcSpread = viewportWidth * 0.6
      arcCache.items = Array.from(items).map((item) => {
        const element = item as HTMLElement
        return {
          centerInTrack: element.offsetLeft + element.offsetWidth / 2,
          setY: gsap.quickSetter(element, 'y', 'px') as (value: number) => void,
          isVideo: element === videoItem
        }
      })
    }

    const updateArc = () => {
      const trackLeft = (track as HTMLElement).getBoundingClientRect().left
      const videoX = videoItem
        ? (gsap.getProperty(videoItem, 'x') as number)
        : 0
      const videoScale = videoItem
        ? (gsap.getProperty(videoItem, 'scale') as number)
        : 1
      const {
        viewportCenter,
        maxYOffset,
        arcSpread,
        items: arcItems
      } = arcCache

      for (const { centerInTrack, setY, isVideo } of arcItems) {
        if (isVideo && videoScale > 1.01) {
          setY(0)
          continue
        }

        const itemX = isVideo ? videoX : 0
        const itemCenter = trackLeft + centerInTrack + itemX
        const t = (itemCenter - viewportCenter) / arcSpread
        setY(t * t * maxYOffset)
      }
    }

    const getMetrics = () => {
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight
      const viewportCenter = viewportWidth / 2
      const heroItem = (videoItem ?? items[items.length - 1]) as HTMLElement
      const heroCenterInTrack = heroItem.offsetLeft + heroItem.offsetWidth / 2
      const lockX = viewportCenter - heroCenterInTrack

      const heroIndex = Array.from(items).indexOf(heroItem)
      const previousItem =
        heroIndex > 0 ? (items[heroIndex - 1] as HTMLElement) : null
      const previousRight = previousItem
        ? previousItem.offsetLeft + previousItem.offsetWidth
        : 0
      const driftEndX = previousItem ? -previousRight - 40 : lockX
      const heroCompensationAtEnd = lockX - driftEndX

      const scaleBaseWidth = heroItem.offsetWidth || 1
      const scaleBaseHeight = heroItem.offsetHeight || 1
      const fullscreenScale = Math.min(
        viewportWidth / scaleBaseWidth,
        viewportHeight / scaleBaseHeight
      )

      return {
        startX: viewportWidth,
        lockX,
        driftEndX,
        heroCompensationAtEnd,
        fullscreenScale
      }
    }

    const { startX } = getMetrics()
    gsap.set(track, { x: startX })
    if (videoItem) {
      gsap.set(videoItem, { x: 0 })
    }
    if (videoMedia) {
      gsap.set(videoMedia, { scale: 1 })
    }
    if (videoItem) {
      gsap.set(videoItem, { scale: 1 })
    }

    textLines.forEach((line, index) => {
      const fromLeft = index === 1 ? false : true
      gsap.set(line, {
        x: fromLeft ? -getSlideDistance() : getSlideDistance()
      })
    })

    refreshArcCache()
    updateArc()

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        pin: sticky,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onRefresh: refreshArcCache
      }
    })

    timeline.fromTo(
      track,
      { x: () => getMetrics().startX },
      {
        x: () => getMetrics().lockX,
        ease: 'none',
        duration: 0.45
      }
    )

    timeline.to(
      track,
      {
        x: () => getMetrics().driftEndX,
        ease: 'none',
        duration: videoItem ? 0.15 : 0.35
      },
      '>'
    )

    if (videoItem) {
      timeline.to(
        videoItem,
        {
          x: () => getMetrics().heroCompensationAtEnd,
          ease: 'none',
          duration: 0.15
        },
        '<'
      )
    }

    if (textLines.length > 0) {
      textLines.forEach((line) => {
        timeline.to(
          line,
          {
            x: 0,
            ease: 'none',
            duration: 0.15
          },
          '>'
        )
      })
    }

    if (videoItem) {
      timeline.to(
        videoItem,
        {
          scale: () => getMetrics().fullscreenScale,
          ease: 'none',
          duration: 0.2
        },
        '>'
      )
    }

    timeline.eventCallback('onUpdate', updateArc)
  }, section)

  return () => ctx.revert()
}
