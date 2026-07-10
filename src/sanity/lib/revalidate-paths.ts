import { locales } from '@/i18n/config'

/** Maps Sanity document `_type` to the path segment after the locale prefix. */
const sanityTypeToPathSegment: Record<string, string> = {
  home_page: '',
  nuestra_marca_page: 'nuestra-marca',
  asi_hablamos_page: 'asi-hablamos',
  asi_nos_vemos_page: 'asi-nos-vemos',
  recursos_page: 'recursos',
  trademarks_page: 'trademarks',
  brand_colors_page: 'brand-colors',
  patrones_page: 'patrones',
  iconografia_page: 'iconografia',
  ilustracion_page: 'ilustracion',
  tipografia_page: 'tipografia',
  layout_page: 'layout',
  fotografia_page: 'fotografia',
  motion_page: 'motion',
  'test-1': 'library'
}

export function getPathsForSanityType(documentType: string): string[] {
  const segment = sanityTypeToPathSegment[documentType]
  if (segment === undefined) return []

  return locales.flatMap((locale) =>
    segment === '' ? [`/${locale}/`] : [`/${locale}/${segment}`]
  )
}
