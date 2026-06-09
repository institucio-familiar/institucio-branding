// Implementation with JSON files
// src/i18n/utils.ts
// import en from './en.json'
// import fr from './fr.json'
// import de from './de.json'

// const translations = { en, fr, de } as const

// type Locale = keyof typeof translations
// type TranslationKey = keyof typeof en

// export function useTranslations(locale: Locale) {
//   return function t(key: TranslationKey): string {
//     return translations[locale][key] ?? translations['en'][key] ?? key
//   }
// }

import { defaultLocale, type Locale } from './config'
import { allTranslations, buildUi } from './translations'

export const ui = buildUi(...allTranslations) satisfies Record<
  Locale,
  Record<string, string>
>

export type UiKey = keyof (typeof ui)[typeof defaultLocale]

export function useTranslations(locale: Locale) {
  return function t(key: UiKey): string {
    return ui[locale][key] ?? ui[defaultLocale][key]
  }
}
