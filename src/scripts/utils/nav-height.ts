/** Keep in sync with `--nav-height-sm` / `--nav-height-md` in global.css */
export const NAV_HEIGHT = {
  sm: 68,
  md: 100
} as const

const MD_QUERY = '(min-width: 768px)'

export function getNavHeight() {
  if (typeof window === 'undefined') return NAV_HEIGHT.md
  return window.matchMedia(MD_QUERY).matches ? NAV_HEIGHT.md : NAV_HEIGHT.sm
}

export function getNavProbeLine() {
  return getNavHeight() + 1
}
