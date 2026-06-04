import { locales, type Locale } from './config'

/** Path segment(s) after the locale prefix, for use with getRelativeLocaleUrl. */
export function getPathKey(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean)

  if (segments.length > 0 && locales.includes(segments[0] as Locale)) {
    return segments.slice(1).join('/')
  }

  return ''
}
