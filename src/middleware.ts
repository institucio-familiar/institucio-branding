import { defineMiddleware } from 'astro:middleware'
import { defaultLocale, locales, type Locale } from '@/i18n/config'

const skippedPrefixes = ['/api/', '/_astro/', '/studio']

function shouldSkip(pathname: string) {
  return skippedPrefixes.some((prefix) => pathname.startsWith(prefix))
}

function hasLocalePrefix(pathname: string) {
  const segment = pathname.split('/').filter(Boolean)[0]
  return Boolean(segment && locales.includes(segment as Locale))
}

export const onRequest = defineMiddleware((context, next) => {
  const { pathname } = context.url

  if (shouldSkip(pathname) || hasLocalePrefix(pathname)) {
    return next()
  }

  // Strip ISR/adapter-internal param so it doesn't leak into public redirects
  const url = new URL(context.url)
  url.searchParams.delete('x_astro_path')
  const search = url.search

  const localizedPath =
    pathname === '/' ? `/${defaultLocale}/` : `/${defaultLocale}${pathname}`

  return context.redirect(`${localizedPath}${search}`)
})
