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
  const { pathname, search } = context.url

  if (shouldSkip(pathname) || hasLocalePrefix(pathname)) {
    return next()
  }

  const localizedPath =
    pathname === '/' ? `/${defaultLocale}/` : `/${defaultLocale}${pathname}`

  return context.redirect(`${localizedPath}${search}`)
})
