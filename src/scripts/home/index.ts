import { initHero } from '@/scripts/home/hero'
import { initSectionsSlide } from '@/scripts/home/sections-slide'
import { initTileGrid } from '@/scripts/home/tile-grid'
import { initCarouselIllustrations } from '@/scripts/home/carousel-illustrations'
import { initValues } from '@/scripts/home/values'
import { initAnimatedGrid } from '@/scripts/home/animated-grid'
import { initMission } from '@/scripts/home/mission'
import { initTextFill } from '@/scripts/home/text-fill'
import { initFinalMessage } from '@/scripts/home/final-message'

function composeCleanups(cleanups: Array<() => void>) {
  return () => {
    cleanups.forEach((cleanup) => cleanup())
  }
}

export function setupHomeAnimations() {
  let cleanup: (() => void) | null = null

  const run = () => {
    cleanup?.()
    cleanup = composeCleanups([
      initHero(),
      initSectionsSlide(),
      initTileGrid(),
      initCarouselIllustrations(),
      initValues(),
      initAnimatedGrid(),
      initMission(),
      initTextFill(),
      initFinalMessage()
    ])
  }

  run()

  document.addEventListener('swup:visit:start', () => {
    cleanup?.()
    cleanup = null
  })

  document.addEventListener('swup:content:replace', run)
}
