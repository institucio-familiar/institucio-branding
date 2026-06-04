import { locales, defaultLocale, type Locale } from './config'

export function isValidLocale(value: string | undefined): value is Locale {
  return locales.includes(value as Locale)
}

export function getPageLocale(
  currentLocale: string | undefined,
  paramLocale: string | undefined
): Locale {
  if (isValidLocale(paramLocale)) return paramLocale
  if (isValidLocale(currentLocale)) return currentLocale
  return defaultLocale
}
