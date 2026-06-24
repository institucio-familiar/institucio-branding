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
    'footer.scrollToTop': 'Volver arriba'
  },
  ca: {
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

export const library: BilingualTranslations = {
  es: {
    'test.title': 'Library'
  },
  ca: {
    'test.title': 'Library'
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

export const recursos: BilingualTranslations = {
  es: {
    'recursos.download': 'Descarga'
  },
  ca: {
    'recursos.download': 'Descarrega'
  }
}

export const asiNosVemos: BilingualTranslations = {
  es: {
    'asi-nos-vemos.asi-nos-vemos': 'Así nos vemos',
    'asi-nos-vemos.color': 'Color',
    'asi-nos-vemos.tipografia': 'Tipografía',
    'asi-nos-vemos.patrones': 'Patrones',
    'asi-nos-vemos.layout': 'Layout',
    'asi-nos-vemos.ilustracion': 'Ilustración',
    'asi-nos-vemos.iconografia': 'Iconografía',
    'asi-nos-vemos.fotografia': 'Fotografía',
    'asi-nos-vemos.motion': 'Motion',
    'asi-nos-vemos.go-to.color': 'Ir a color',
    'asi-nos-vemos.go-to.tipografia': 'Ir a tipografía',
    'asi-nos-vemos.go-to.patrones': 'Ir a patrones',
    'asi-nos-vemos.go-to.layout': 'Ir a layout',
    'asi-nos-vemos.go-to.ilustracion': 'Ir a ilustración',
    'asi-nos-vemos.go-to.iconografia': 'Ir a iconografía',
    'asi-nos-vemos.go-to.fotografia': 'Ir a fotografía',
    'asi-nos-vemos.go-to.motion': 'Ir a motion'
  },
  ca: {
    'asi-nos-vemos.asi-nos-vemos': 'Així ens veiem',
    'asi-nos-vemos.color': 'Color',
    'asi-nos-vemos.tipografia': 'Tipografia',
    'asi-nos-vemos.patrones': 'Patrones',
    'asi-nos-vemos.layout': 'Layout',
    'asi-nos-vemos.ilustracion': 'Il·lustració',
    'asi-nos-vemos.iconografia': 'Iconografia',
    'asi-nos-vemos.fotografia': 'Fotografia',
    'asi-nos-vemos.motion': 'Motion',
    'asi-nos-vemos.go-to.color': 'Anar a color',
    'asi-nos-vemos.go-to.tipografia': 'Anar a tipografia',
    'asi-nos-vemos.go-to.patrones': 'Anar a patrons',
    'asi-nos-vemos.go-to.layout': 'Anar a layout',
    'asi-nos-vemos.go-to.ilustracion': 'Anar a il·lustració',
    'asi-nos-vemos.go-to.iconografia': 'Anar a iconografia',
    'asi-nos-vemos.go-to.fotografia': 'Anar a fotografia',
    'asi-nos-vemos.go-to.motion': 'Anar a motion'
  }
}

export const nuestraMarca: BilingualTranslations = {
  es: {
    'nuestra-marca.principios-creativos': 'Principios creativos',
    'nuestra-marca.go-to.typography': 'Ir a tipografía',
    'nuestra-marca.go-to.color': 'Ir a color',
    'nuestra-marca.go-to.voz': 'Ir a voz'
  },
  ca: {
    'nuestra-marca.principios-creativos': 'Principis creatius',
    'nuestra-marca.go-to.typography': 'Anar a tipografia',
    'nuestra-marca.go-to.color': 'Anar a color',
    'nuestra-marca.go-to.voz': 'Anar a veu'
  }
}

export const asiHablamos: BilingualTranslations = {
  es: {
    'asi-hablamos.section2.title': 'Nuestra voz no es...'
  },
  ca: {
    'asi-hablamos.section2.title': 'La nostra veu no és...'
  }
}

export const allTranslations: BilingualTranslations[] = [
  generics,
  nav,
  header,
  footer,
  lang,
  hero,
  library,
  notFound,
  recursos,
  asiNosVemos,
  nuestraMarca,
  asiHablamos
]
