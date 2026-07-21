import { gsap } from 'gsap'
import { $scroll } from '@/scripts/stores/scroll'

const FIRST_LETTER_VIEWBOX_WIDTH = 248
const FULL_VIEWBOX = '0 0 1173 436'
const FIRST_LETTER_RATIO = FIRST_LETTER_VIEWBOX_WIDTH / 1173
const ESCUDO_FULL_VIEWBOX = '0 0 23 35'
const ESCUDO_VIEWBOX_PADDING = 0.75
const ESCUDO_INNER_GAP_OFFSET = 1.2 // svg units; moves bottom bar up in compact state
// const ESCUDO_TRANSLATE_Y_RATIO = 3 / 36 // tuned for h-9 escudo (36px)
const ESCUDO_TRANSLATE_Y_RATIO = 0.035 // tuned for h-9 escudo (36px)
const SCROLL_THRESHOLD = 50

type LogoElements = {
  nombreWrap: HTMLElement
  escudoWrap: HTMLElement
  nombreSvg: SVGSVGElement
  escudoSvg: SVGSVGElement
}

function queryLogoElements(root: ParentNode) {
  const nombreWrap = root.querySelector<HTMLElement>(
    '[data-header-logo-nombre-wrap]'
  )
  const escudoWrap = root.querySelector<HTMLElement>(
    '[data-header-logo-escudo-wrap]'
  )
  const nombreSvg = nombreWrap?.querySelector('svg') ?? null
  const escudoSvg = escudoWrap?.querySelector('svg') ?? null

  if (!nombreWrap || !escudoWrap || !nombreSvg || !escudoSvg) return null

  return { nombreWrap, escudoWrap, nombreSvg, escudoSvg }
}

function getNombreLetters({ nombreSvg }: LogoElements) {
  return nombreSvg.querySelectorAll(':scope > path')
}

function getEscudoPaths({ escudoSvg }: LogoElements) {
  return escudoSvg.querySelectorAll(':scope > path')
}

function getEscudoInnerPaths(logo: LogoElements) {
  const paths = getEscudoPaths(logo)
  return [paths[0], paths[1]].filter(Boolean)
}

function getEscudoPathsToHide(logo: LogoElements) {
  const paths = getEscudoPaths(logo)
  return [paths[2], paths[3]].filter(Boolean)
}

function getEscudoBottomBarPath(logo: LogoElements) {
  return getEscudoPaths(logo)[1] ?? null
}

function getEscudoTranslateY(logo: LogoElements) {
  return (
    logo.escudoSvg.getBoundingClientRect().height * ESCUDO_TRANSLATE_Y_RATIO
  )
}

function measureEscudoInnerViewBox(logo: LogoElements, gapOffset = 0) {
  const paths = getEscudoInnerPaths(logo)
  if (paths.length === 0) return ESCUDO_FULL_VIEWBOX

  let minX = Infinity
  let minY = Infinity
  let maxX = -Infinity
  let maxY = -Infinity

  paths.forEach((path, index) => {
    const box = (path as SVGGraphicsElement).getBBox()
    const y = index === 1 ? box.y - gapOffset : box.y
    const height = box.height

    minX = Math.min(minX, box.x)
    minY = Math.min(minY, y)
    maxX = Math.max(maxX, box.x + box.width)
    maxY = Math.max(maxY, y + height)
  })

  const pad = ESCUDO_VIEWBOX_PADDING
  const x = minX - pad
  const y = minY - pad
  const width = maxX - minX + pad * 2
  const height = maxY - minY + pad * 2

  return `${x} ${y} ${width} ${height}`
}

function getCompactMetrics(
  logo: LogoElements,
  fullMetrics: {
    nombreWidth: number
    escudoHeight: number
    nombreWrapPadding: number
  }
) {
  const fullWidth = logo.nombreSvg.getBoundingClientRect().width
  const compactWidth = fullWidth * FIRST_LETTER_RATIO
  const escudoInnerViewBox = measureEscudoInnerViewBox(
    logo,
    ESCUDO_INNER_GAP_OFFSET
  )
  const escudoScale =
    logo.nombreSvg.getBoundingClientRect().height / fullMetrics.escudoHeight -
    0.1

  return { compactWidth, escudoInnerViewBox, escudoScale }
}

function setFullState(logo: LogoElements) {
  const letters = getNombreLetters(logo)
  const trailingLetters = Array.from(letters).slice(1)
  const escudoPathsToHide = getEscudoPathsToHide(logo)
  const escudoBottomBar = getEscudoBottomBarPath(logo)

  gsap.killTweensOf([
    logo.nombreWrap,
    logo.escudoWrap,
    logo.escudoSvg,
    logo.nombreSvg,
    escudoBottomBar,
    ...trailingLetters,
    ...escudoPathsToHide
  ])

  gsap.set(logo.nombreSvg, {
    attr: { viewBox: FULL_VIEWBOX },
    width: 'auto',
    clearProps: 'width'
  })
  gsap.set(trailingLetters, {
    autoAlpha: 1,
    clearProps: 'opacity,visibility'
  })

  gsap.set(logo.escudoSvg, {
    attr: { viewBox: ESCUDO_FULL_VIEWBOX },
    scale: 1,
    transformOrigin: '50% 100%'
  })
  gsap.set(logo.escudoWrap, { y: 0, clearProps: 'transform' })
  gsap.set(logo.nombreWrap, { width: 'auto', clearProps: 'width,paddingLeft' })
  if (escudoBottomBar) {
    gsap.set(escudoBottomBar, { y: 0, clearProps: 'transform' })
  }
  gsap.set(escudoPathsToHide, {
    autoAlpha: 1,
    clearProps: 'opacity,visibility'
  })
}

function animateToFullState(
  logo: LogoElements,
  fullMetrics: {
    nombreWidth: number
    escudoHeight: number
    nombreWrapPadding: number
  }
) {
  const letters = getNombreLetters(logo)
  const trailingLetters = Array.from(letters).slice(1)
  const escudoPathsToHide = getEscudoPathsToHide(logo)
  const escudoBottomBar = getEscudoBottomBarPath(logo)
  const compactWidth =
    logo.nombreSvg.getBoundingClientRect().width ||
    fullMetrics.nombreWidth * FIRST_LETTER_RATIO
  const fullWidth = fullMetrics.nombreWidth || compactWidth / FIRST_LETTER_RATIO

  if (letters.length < 2) return

  gsap.killTweensOf([
    logo.nombreWrap,
    logo.escudoWrap,
    logo.escudoSvg,
    logo.nombreSvg,
    escudoBottomBar,
    ...trailingLetters,
    ...escudoPathsToHide
  ])

  const timeline = gsap.timeline({
    defaults: { ease: 'power2.inOut' },
    onComplete: () => setFullState(logo)
  })

  timeline.to(
    logo.escudoWrap,
    {
      y: 0,
      duration: 0.7
    },
    0
  )

  timeline.to(
    logo.escudoSvg,
    {
      attr: { viewBox: ESCUDO_FULL_VIEWBOX },
      scale: 1,
      transformOrigin: '50% 100%',
      duration: 0.7
    },
    0
  )

  if (escudoBottomBar) {
    timeline.to(
      escudoBottomBar,
      {
        y: 0,
        duration: 0.7
      },
      0.15
    )
  }

  if (escudoPathsToHide.length > 0) {
    timeline.to(
      escudoPathsToHide,
      {
        autoAlpha: 1,
        duration: 0.5
      },
      0.15
    )
  }

  timeline.to(
    logo.nombreWrap,
    {
      width: fullWidth,
      paddingLeft: fullMetrics.nombreWrapPadding,
      duration: 0.7
    },
    0.05
  )

  timeline.to(
    trailingLetters,
    {
      autoAlpha: 1,
      duration: 0.35,
      stagger: 0.03
    },
    0.32
  )
}

function applyCompactState(
  logo: LogoElements,
  animate: boolean,
  fullMetrics: {
    nombreWidth: number
    escudoHeight: number
    nombreWrapPadding: number
  }
) {
  const letters = getNombreLetters(logo)
  const trailingLetters = Array.from(letters).slice(1)
  const escudoPathsToHide = getEscudoPathsToHide(logo)
  const escudoBottomBar = getEscudoBottomBarPath(logo)
  const { compactWidth, escudoInnerViewBox, escudoScale } = getCompactMetrics(
    logo,
    fullMetrics
  )

  fullMetrics.nombreWidth =
    logo.nombreSvg.getBoundingClientRect().width || fullMetrics.nombreWidth
  fullMetrics.escudoHeight =
    logo.escudoSvg.getBoundingClientRect().height || fullMetrics.escudoHeight

  if (letters.length < 2) return

  gsap.killTweensOf([
    logo.nombreWrap,
    logo.escudoWrap,
    logo.escudoSvg,
    logo.nombreSvg,
    escudoBottomBar,
    ...trailingLetters,
    ...escudoPathsToHide
  ])

  if (!animate) {
    gsap.set(trailingLetters, { autoAlpha: 0 })
    gsap.set(logo.nombreWrap, {
      width: compactWidth,
      paddingLeft: 2
    })
    gsap.set(logo.nombreSvg, { attr: { viewBox: FULL_VIEWBOX } })
    gsap.set(escudoPathsToHide, { autoAlpha: 0 })
    gsap.set(logo.escudoSvg, {
      attr: { viewBox: escudoInnerViewBox },
      scale: escudoScale,
      transformOrigin: '50% 100%'
    })
    if (escudoBottomBar) {
      gsap.set(escudoBottomBar, { y: -ESCUDO_INNER_GAP_OFFSET })
    }
    gsap.set(logo.escudoWrap, { y: getEscudoTranslateY(logo) })
    return
  }

  const timeline = gsap.timeline({ defaults: { ease: 'power2.inOut' } })

  timeline.to(
    trailingLetters,
    {
      autoAlpha: 0,
      duration: 0.35,
      stagger: 0.03
    },
    0
  )

  timeline.to(
    logo.nombreWrap,
    {
      width: compactWidth,
      paddingLeft: 2,
      duration: 0.7
    },
    0.05
  )

  if (escudoPathsToHide.length > 0) {
    timeline.to(
      escudoPathsToHide,
      {
        autoAlpha: 0,
        duration: 0.5
      },
      0
    )
  }

  timeline.to(
    logo.escudoSvg,
    {
      attr: { viewBox: escudoInnerViewBox },
      scale: escudoScale,
      transformOrigin: '50% 100%',
      duration: 0.7
    },
    0.15
  )

  if (escudoBottomBar) {
    timeline.to(
      escudoBottomBar,
      {
        y: -ESCUDO_INNER_GAP_OFFSET,
        duration: 0.7
      },
      0.15
    )
  }

  timeline.to(
    logo.escudoWrap,
    {
      y: getEscudoTranslateY(logo),
      duration: 0.7
    },
    0.15
  )
}

export function initHeaderLogoAnimation() {
  const header = document.querySelector('[data-header]')
  if (!header) return () => {}

  const logo = queryLogoElements(header)
  if (!logo) return () => {}

  const elements = logo
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches

  let isCompact = false
  const fullMetrics = {
    nombreWidth: elements.nombreSvg.getBoundingClientRect().width,
    escudoHeight: elements.escudoSvg.getBoundingClientRect().height,
    nombreWrapPadding:
      parseFloat(getComputedStyle(elements.nombreWrap).paddingLeft) || 8
  }

  function syncLogo(scroll: number) {
    const shouldBeCompact = scroll > SCROLL_THRESHOLD

    if (shouldBeCompact && !isCompact) {
      isCompact = true
      applyCompactState(elements, !prefersReducedMotion, fullMetrics)
      return
    }

    if (!shouldBeCompact && isCompact) {
      isCompact = false

      if (prefersReducedMotion) {
        setFullState(elements)
        return
      }

      animateToFullState(elements, fullMetrics)
    }
  }

  const unsubscribe = $scroll.subscribe(({ scroll }) => syncLogo(scroll))
  syncLogo($scroll.get().scroll)

  return () => {
    unsubscribe()
    setFullState(elements)
  }
}
