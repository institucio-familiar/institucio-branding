import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MD } from '@/scripts/home/breakpoints'

gsap.registerPlugin(ScrollTrigger)

const BLUE = '#1469ff'
const NAVY = '#0b2449'

export function initTextFill() {
  const section = document.querySelector('[data-home-text-fill]')
  if (!section) return () => {}

  const lines = [...section.querySelectorAll('[data-text-fill-line]')]
  const parallax = section.querySelector('[data-text-fill-parallax]')
  const compassRotate = section.querySelector('[data-compass-rotate]')
  const imageZoom = section.querySelector('[data-image-zoom]')
  const videoClip = section.querySelector('[data-video-clip]')
  const lightOn = section.querySelector('[data-light-on]')

  const ctx = gsap.context(() => {
    const mm = gsap.matchMedia()

    // Counteract scroll so content rises slower than the page (no pin).
    // Higher travel = slower pass-by. Desktop only — too heavy on touch.
    mm.add(MD, () => {
      if (!parallax) return

      gsap.fromTo(
        parallax,
        { y: () => -document.documentElement.clientHeight * 0.6 },
        {
          y: () => document.documentElement.clientHeight * 0.6,
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
    })

    if (videoClip) {
      const videoClipTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: videoClip,
          start: 'top 82%',
          end: 'center 55%',
          scrub: true
        }
      })

      videoClipTimeline.fromTo(
        videoClip,
        { '--clip-inset-x': '50%' },
        { '--clip-inset-x': '0%', ease: 'none' },
        0
      )

      if (lightOn) {
        videoClipTimeline.set(lightOn, { autoAlpha: 1 })
      }
    }

    if (imageZoom) {
      gsap.fromTo(
        imageZoom,
        { scale: 0.65 },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: imageZoom,
            start: 'top 72%',
            end: 'center 45%',
            scrub: true
          }
        }
      )
    }

    if (compassRotate) {
      gsap.fromTo(
        compassRotate,
        { rotation: 0 },
        {
          rotation: 240,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top 65%',
            end: 'bottom 30%',
            scrub: true,
            invalidateOnRefresh: true
          }
        }
      )
    }

    const splitIntoLetters = (paragraph: Element) => {
      const text = paragraph.textContent ?? ''
      const letters: HTMLSpanElement[] = []

      paragraph.textContent = ''
      paragraph.setAttribute('aria-label', text.trim())

      for (const char of text) {
        const span = document.createElement('span')
        span.textContent = char === ' ' ? '\u00a0' : char
        span.setAttribute('data-text-fill-letter', '')
        span.className = 'inline-block'
        letters.push(span)
        paragraph.appendChild(span)
      }

      return letters
    }

    const letters = lines.flatMap((line) => splitIntoLetters(line))

    if (letters.length > 0) {
      gsap.set(letters, { color: BLUE })

      const letterDuration = 1 / letters.length
      // Mobile section is ~60vh — widen the scrub window so the fill
      // doesn't collapse into a near-instant color change.
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: () =>
            window.matchMedia(MD).matches ? 'top 28%' : 'top 50%',
          end: () =>
            window.matchMedia(MD).matches ? 'bottom 85%' : 'bottom 50%',
          scrub: true,
          invalidateOnRefresh: true
        }
      })

      letters.forEach((letter, index) => {
        timeline.to(
          letter,
          {
            color: NAVY,
            ease: 'none',
            duration: letterDuration
          },
          index * letterDuration
        )
      })
    }

    ScrollTrigger.refresh()
  }, section)

  return () => ctx.revert()
}
