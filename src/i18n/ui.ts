import { defaultLocale, type Locale } from './config'

export const ui = {
  es: {
    'site.title': 'Institució Branding',
    'nav.home': 'Inicio',
    'nav.test': 'Test',
    'home.hero': 'Institució Branding',
    'home.tagline': 'Educamos a personas únicas, preparándolas para el futuro.',
    'home.section3': 'Sección 3 — Azul',
    'home.section4': 'Sección 4 — Cielo',
    'home.section5': 'Sección 5 — Niebla',
    'home.section6': 'Sección 6 — Blanco',
    'test.title': 'Library',
    'test.section2': 'Sección 2 — Marino',
    'test.section3': 'Sección 3 — Azul',
    'test.section4': 'Sección 4 — Cielo',
    'test.section5': 'Sección 5 — Niebla',
    'test.section6': 'Sección 6 — Crema',
    'footer.rights': 'Todos los derechos reservados.',
    'footer.scrollToTop': 'Volver arriba',
    'lang.switch': 'Idioma',
    '404.title': 'Página no encontrada',
    '404.description':
      'La página que buscas no existe o puede haber sido movida.',
    '404.back': 'Volver al inicio',
    'nuestra-marca.title': 'Nuestra Marca',
    'nuestra-marca.description':
      'Descubre nuestra marca y cómo nos hemos posicionado en el mercado.'
  },
  ca: {
    'site.title': 'Institució Branding',
    'nav.home': 'Inici',
    'nav.test': 'Test',
    'home.hero': 'Institució Branding',
    'home.tagline': 'Eduquem persones úniques, preparant-les per al futur.',
    'home.section3': 'Secció 3 — Blau',
    'home.section4': 'Secció 4 — Cel',
    'home.section5': 'Secció 5 — Boira',
    'home.section6': 'Secció 6 — Blanc',
    'test.title': 'Library',
    'test.section2': 'Secció 2 — Marí',
    'test.section3': 'Secció 3 — Blau',
    'test.section4': 'Secció 4 — Cel',
    'test.section5': 'Secció 5 — Boira',
    'test.section6': 'Secció 6 — Blanc',
    'footer.rights': 'Tots els drets reservats.',
    'footer.scrollToTop': 'Tornar amunt',
    'lang.switch': 'Idioma',
    '404.title': 'Pàgina no trobada',
    '404.description':
      'La pàgina que cerques no existeix o pot haver estat moguda.',
    '404.back': "Tornar a l'inici",
    'nuestra-marca.title': 'La nostra marca',
    'nuestra-marca.description':
      'Descobreix la nostra marca i com hem posat-nos en el mercat.'
  }
} satisfies Record<Locale, Record<string, string>>

export type UiKey = keyof (typeof ui)[typeof defaultLocale]

export function useTranslations(locale: Locale) {
  return function t(key: UiKey): string {
    return ui[locale][key] ?? ui[defaultLocale][key]
  }
}
