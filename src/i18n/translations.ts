import { locales, type Locale } from './config'

export type BilingualTranslations = Record<Locale, Record<string, string>>

export function buildUi(
  ...sources: BilingualTranslations[]
): Record<Locale, Record<string, string>> {
  const result = Object.fromEntries(
    locales.map((locale) => [locale, {}])
  ) as Record<Locale, Record<string, string>>

  for (const source of sources) {
    for (const locale of locales) {
      Object.assign(result[locale], source[locale])
    }
  }

  return result
}

const school = import.meta.env.PUBLIC_SCHOOL_NAME

const sharedGenerics = {
  'site.title': `${school} - Branding`,
  'home.hero': 'Brand guidelines'
}

export const generics: BilingualTranslations = {
  es: sharedGenerics,
  ca: sharedGenerics
}

export const nav: BilingualTranslations = {
  es: {
    'nav.home': 'Inicio',
    'nav.test': 'Test',
    'nav.nuestraMarca': 'Nuestra Marca',
    'nav.asiHablamos': 'Así hablamos',
    'nav.asiNosVemos': 'Así nos vemos',
    'nav.recursos': 'Recursos',
    'nav.overview': 'Overview',
    'nav.trademarks': 'Trademarks',
    'nav.brandColors': 'Brand colors',
    'nav.patrones': 'Patrones',
    'nav.iconografia': 'Iconografía',
    'nav.ilustracion': 'Ilustración',
    'nav.tipografia': 'Tipografía',
    'nav.layout': 'Layout',
    'nav.fotografia': 'Fotografía',
    'nav.motion': 'Motion'
  },
  ca: {
    'nav.home': 'Inici',
    'nav.test': 'Test',
    'nav.nuestraMarca': 'La nostra marca',
    'nav.asiHablamos': 'Així parlem',
    'nav.asiNosVemos': 'Així ens veiem',
    'nav.recursos': 'Recursos',
    'nav.overview': 'Overview',
    'nav.trademarks': 'Trademarks',
    'nav.brandColors': 'Brand colors',
    'nav.patrones': 'Patrons',
    'nav.iconografia': 'Iconografia',
    'nav.ilustracion': 'Il·lustració',
    'nav.tipografia': 'Tipografia',
    'nav.layout': 'Layout',
    'nav.fotografia': 'Fotografia',
    'nav.motion': 'Motion'
  }
}

export const header: BilingualTranslations = {
  es: {
    'header.needHelp': 'Necesitas ayuda?'
  },
  ca: {
    'header.needHelp': 'Necessites ajuda?'
  }
}

export const footer: BilingualTranslations = {
  es: {
    'footer.rights': 'Todos los derechos reservados.',
    'footer.scrollToTop': 'Volver arriba'
  },
  ca: {
    'footer.rights': 'Tots els drets reservats.',
    'footer.scrollToTop': 'Tornar amunt'
  }
}

export const lang: BilingualTranslations = {
  es: {
    'lang.switch': 'Idioma'
  },
  ca: {
    'lang.switch': 'Idioma'
  }
}

export const hero: BilingualTranslations = {
  es: {
    'hero.scroll-down': 'Desliza para descubrir'
  },
  ca: {
    'hero.scroll-down': 'Desplaça per descobrir'
  }
}

export const home: BilingualTranslations = {
  es: {
    'home.tagline': 'Educamos a personas únicas, preparándolas para el futuro.',
    'home.section3': 'Este camino lo hacemos contigo',
    'home.section4': 'Sección 4 — Cielo',
    'home.section5': 'Sección 5 — Niebla',
    'home.section6': 'Sección 6 — Blanco'
  },
  ca: {
    'home.tagline': 'Eduquem persones úniques, preparant-les per al futur.',
    'home.section3': 'Aquest camí el fem junts',
    'home.section4': 'Secció 4 — Cel',
    'home.section5': 'Secció 5 — Boira',
    'home.section6': 'Secció 6 — Blanc'
  }
}

export const library: BilingualTranslations = {
  es: {
    'test.title': 'Library',
    'test.section2': 'Sección 2 — Marino',
    'test.section3': 'Sección 3 — Azul',
    'test.section4': 'Sección 4 — Cielo',
    'test.section5': 'Sección 5 — Niebla',
    'test.section6': 'Sección 6 — Crema'
  },
  ca: {
    'test.title': 'Library',
    'test.section2': 'Secció 2 — Marí',
    'test.section3': 'Secció 3 — Blau',
    'test.section4': 'Secció 4 — Cel',
    'test.section5': 'Secció 5 — Boira',
    'test.section6': 'Secció 6 — Blanc'
  }
}

export const notFound: BilingualTranslations = {
  es: {
    '404.title': 'Página no encontrada',
    '404.description':
      'La página que buscas no existe o puede haber sido movida.',
    '404.back': 'Volver al inicio'
  },
  ca: {
    '404.title': 'Pàgina no trobada',
    '404.description':
      'La pàgina que cerques no existeix o pot haver estat moguda.',
    '404.back': "Tornar a l'inici"
  }
}

export const nuestraMarca: BilingualTranslations = {
  es: {
    'nuestra-marca.title': 'Nuestra Marca',
    'nuestra-marca.description':
      'Descubre nuestra marca y cómo nos hemos posicionado en el mercado.'
  },
  ca: {
    'nuestra-marca.title': 'La nostra marca',
    'nuestra-marca.description':
      'Descobreix la nostra marca i com hem posat-nos en el mercat.'
  }
}

export const asiHablamos: BilingualTranslations = {
  es: {
    'asi-hablamos.title': 'Así hablamos',
    'asi-hablamos.description':
      'Descubre cómo nos comunicamos y expresamos nuestra marca.'
  },
  ca: {
    'asi-hablamos.title': 'Així parlem',
    'asi-hablamos.description':
      'Descobreix com ens comuniquem i expressem la nostra marca.'
  }
}

export const asiNosVemos: BilingualTranslations = {
  es: {
    'asi-nos-vemos.title': 'Así nos vemos',
    'asi-nos-vemos.description': 'Descubre cómo nos presentamos visualmente.'
  },
  ca: {
    'asi-nos-vemos.title': 'Així ens veiem',
    'asi-nos-vemos.description': 'Descobreix com ens presentem visualment.'
  }
}

export const recursos: BilingualTranslations = {
  es: {
    'recursos.title': 'Recursos',
    'recursos.description': 'Accede a los recursos de nuestra marca.'
  },
  ca: {
    'recursos.title': 'Recursos',
    'recursos.description': 'Accedeix als recursos de la nostra marca.'
  }
}

export const overview: BilingualTranslations = {
  es: {
    'overview.title': 'Overview',
    'overview.description': 'Visión general de nuestra identidad de marca.'
  },
  ca: {
    'overview.title': 'Overview',
    'overview.description': 'Visió general de la nostra identitat de marca.'
  }
}

export const trademarks: BilingualTranslations = {
  es: {
    'trademarks.title': 'Trademarks',
    'trademarks.description': 'Guía de uso de nuestras marcas registradas.'
  },
  ca: {
    'trademarks.title': 'Trademarks',
    'trademarks.description': "Guia d'ús de les nostres marques registrades."
  }
}

export const brandColors: BilingualTranslations = {
  es: {
    'brand-colors.title': 'Brand colors',
    'brand-colors.description': 'Paleta de colores oficiales de la marca.'
  },
  ca: {
    'brand-colors.title': 'Brand colors',
    'brand-colors.description': 'Paleta de colors oficials de la marca.'
  }
}

export const patrones: BilingualTranslations = {
  es: {
    'patrones.title': 'Patrones',
    'patrones.description': 'Patrones gráficos de la identidad visual.'
  },
  ca: {
    'patrones.title': 'Patrons',
    'patrones.description': 'Patrons gràfics de la identitat visual.'
  }
}

export const iconografia: BilingualTranslations = {
  es: {
    'iconografia.title': 'Iconografía',
    'iconografia.description': 'Sistema de iconos de la marca.'
  },
  ca: {
    'iconografia.title': 'Iconografia',
    'iconografia.description': "Sistema d'icones de la marca."
  }
}

export const ilustracion: BilingualTranslations = {
  es: {
    'ilustracion.title': 'Ilustración',
    'ilustracion.description': 'Estilo y uso de ilustraciones.'
  },
  ca: {
    'ilustracion.title': 'Il·lustració',
    'ilustracion.description': "Estil i ús d'il·lustracions."
  }
}

export const tipografia: BilingualTranslations = {
  es: {
    'tipografia.title': 'Tipografía',
    'tipografia.description': 'Tipografías oficiales y su aplicación.'
  },
  ca: {
    'tipografia.title': 'Tipografia',
    'tipografia.description': 'Tipografies oficials i la seva aplicació.'
  }
}

export const layout: BilingualTranslations = {
  es: {
    'layout.title': 'Layout',
    'layout.description': 'Sistema de composición y rejilla.'
  },
  ca: {
    'layout.title': 'Layout',
    'layout.description': 'Sistema de composició i graella.'
  }
}

export const fotografia: BilingualTranslations = {
  es: {
    'fotografia.title': 'Fotografía',
    'fotografia.description': 'Dirección de arte fotográfico.'
  },
  ca: {
    'fotografia.title': 'Fotografia',
    'fotografia.description': "Direcció d'art fotogràfic."
  }
}

export const motion: BilingualTranslations = {
  es: {
    'motion.title': 'Motion',
    'motion.description': 'Animaciones y movimiento de marca.'
  },
  ca: {
    'motion.title': 'Motion',
    'motion.description': 'Animacions i moviment de marca.'
  }
}

export const allTranslations: BilingualTranslations[] = [
  generics,
  nav,
  header,
  footer,
  lang,
  hero,
  home,
  library,
  notFound,
  nuestraMarca,
  asiHablamos,
  asiNosVemos,
  recursos,
  overview,
  trademarks,
  brandColors,
  patrones,
  iconografia,
  ilustracion,
  tipografia,
  layout,
  fotografia,
  motion
]
