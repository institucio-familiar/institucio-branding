// TESTINGAL > Implementation with JSON files
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
    'header.needHelp': 'Necesitas ayuda?',
    'footer.rights': 'Todos los derechos reservados.',
    'footer.scrollToTop': 'Volver arriba',
    'lang.switch': 'Idioma',
    '404.title': 'Página no encontrada',
    '404.description':
      'La página que buscas no existe o puede haber sido movida.',
    '404.back': 'Volver al inicio',
    'nuestra-marca.title': 'Nuestra Marca',
    'nuestra-marca.description':
      'Descubre nuestra marca y cómo nos hemos posicionado en el mercado.',
    'asi-hablamos.title': 'Así hablamos',
    'asi-hablamos.description':
      'Descubre cómo nos comunicamos y expresamos nuestra marca.',
    'asi-nos-vemos.title': 'Así nos vemos',
    'asi-nos-vemos.description': 'Descubre cómo nos presentamos visualmente.',
    'recursos.title': 'Recursos',
    'recursos.description': 'Accede a los recursos de nuestra marca.',
    'overview.title': 'Overview',
    'overview.description': 'Visión general de nuestra identidad de marca.',
    'trademarks.title': 'Trademarks',
    'trademarks.description': 'Guía de uso de nuestras marcas registradas.',
    'brand-colors.title': 'Brand colors',
    'brand-colors.description': 'Paleta de colores oficiales de la marca.',
    'patrones.title': 'Patrones',
    'patrones.description': 'Patrones gráficos de la identidad visual.',
    'iconografia.title': 'Iconografía',
    'iconografia.description': 'Sistema de iconos de la marca.',
    'ilustracion.title': 'Ilustración',
    'ilustracion.description': 'Estilo y uso de ilustraciones.',
    'tipografia.title': 'Tipografía',
    'tipografia.description': 'Tipografías oficiales y su aplicación.',
    'layout.title': 'Layout',
    'layout.description': 'Sistema de composición y rejilla.',
    'fotografia.title': 'Fotografía',
    'fotografia.description': 'Dirección de arte fotográfico.',
    'motion.title': 'Motion',
    'motion.description': 'Animaciones y movimiento de marca.'
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
    'header.needHelp': 'Necessites ajuda?',
    'footer.rights': 'Tots els drets reservats.',
    'footer.scrollToTop': 'Tornar amunt',
    'lang.switch': 'Idioma',
    '404.title': 'Pàgina no trobada',
    '404.description':
      'La pàgina que cerques no existeix o pot haver estat moguda.',
    '404.back': "Tornar a l'inici",
    'nuestra-marca.title': 'La nostra marca',
    'nuestra-marca.description':
      'Descobreix la nostra marca i com hem posat-nos en el mercat.',
    'asi-hablamos.title': 'Així parlem',
    'asi-hablamos.description':
      'Descobreix com ens comuniquem i expressem la nostra marca.',
    'asi-nos-vemos.title': 'Així ens veiem',
    'asi-nos-vemos.description': 'Descobreix com ens presentem visualment.',
    'recursos.title': 'Recursos',
    'recursos.description': 'Accedeix als recursos de la nostra marca.',
    'overview.title': 'Overview',
    'overview.description': 'Visió general de la nostra identitat de marca.',
    'trademarks.title': 'Trademarks',
    'trademarks.description': "Guia d'ús de les nostres marques registrades.",
    'brand-colors.title': 'Brand colors',
    'brand-colors.description': 'Paleta de colors oficials de la marca.',
    'patrones.title': 'Patrons',
    'patrones.description': 'Patrons gràfics de la identitat visual.',
    'iconografia.title': 'Iconografia',
    'iconografia.description': "Sistema d'icones de la marca.",
    'ilustracion.title': 'Il·lustració',
    'ilustracion.description': "Estil i ús d'il·lustracions.",
    'tipografia.title': 'Tipografia',
    'tipografia.description': 'Tipografies oficials i la seva aplicació.',
    'layout.title': 'Layout',
    'layout.description': 'Sistema de composició i graella.',
    'fotografia.title': 'Fotografia',
    'fotografia.description': "Direcció d'art fotogràfic.",
    'motion.title': 'Motion',
    'motion.description': 'Animacions i moviment de marca.'
  }
} satisfies Record<Locale, Record<string, string>>

export type UiKey = keyof (typeof ui)[typeof defaultLocale]

export function useTranslations(locale: Locale) {
  return function t(key: UiKey): string {
    return ui[locale][key] ?? ui[defaultLocale][key]
  }
}
