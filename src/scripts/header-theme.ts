import { getNavProbeLine } from '@/scripts/utils/nav-height'
import { $scroll } from '@/scripts/stores/scroll'
import { $isMenuOpen } from '@/store'

export type HeaderTheme = 'light' | 'dark'

const LIGHT_SECTION_SELECTOR = '[data-header-theme="light"]'

function getThemeFromScroll(sections: HTMLElement[]) {
  const line = getNavProbeLine()

  for (const section of sections) {
    const rect = section.getBoundingClientRect()
    if (rect.top <= line && rect.bottom > line) return 'light'
  }

  return 'dark'
}

export function initHeaderTheme() {
  const header = document.querySelector<HTMLElement>('[data-header]')
  if (!header) return () => {}

  let activeTheme: HeaderTheme = 'light'
  let menuForced = false
  let sections: HTMLElement[] = []

  function applyTheme(theme: HeaderTheme) {
    const resolved = menuForced ? 'light' : theme
    if (resolved === activeTheme) return
    activeTheme = resolved
    header!.dataset.theme = resolved
  }

  function syncTheme() {
    if (menuForced) {
      applyTheme('light')
      return
    }

    applyTheme(getThemeFromScroll(sections))
  }

  function refreshSections() {
    sections = [
      ...document.querySelectorAll<HTMLElement>(LIGHT_SECTION_SELECTOR)
    ]
    syncTheme()
  }

  const unsubscribeScroll = $scroll.subscribe(() => syncTheme())
  const unsubscribeMenu = $isMenuOpen.subscribe((isOpen) => {
    menuForced = isOpen
    syncTheme()
  })

  refreshSections()

  const onContentReplace = () => refreshSections()
  document.addEventListener('swup:content:replace', onContentReplace)

  return () => {
    unsubscribeScroll()
    unsubscribeMenu()
    document.removeEventListener('swup:content:replace', onContentReplace)
  }
}
