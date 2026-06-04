export const locales = ['es', 'ca'] as const

export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'es'

export const localeLabels: Record<Locale, string> = {
  es: 'ES',
  ca: 'CA'
}

export const htmlLang: Record<Locale, string> = {
  es: 'es',
  ca: 'ca'
}
