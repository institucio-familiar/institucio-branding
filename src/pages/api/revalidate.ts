// src/pages/api/revalidate.ts
import type { APIRoute } from 'astro'
// import { revalidateTag } from '@vercel/functions'

export const POST: APIRoute = async ({ request }) => {
  try {
    console.log('Revalidate request:', request)
    const secret = request.headers.get('x-revalidate-secret')

    if (secret !== import.meta.env.SANITY_REVALIDATE_SECRET) {
      return new Response('Unauthorized', { status: 401 })
    }

    const body = await request.json()

    console.log('Revalidate request:', body)

    const bypassToken = secret ?? '' // TESTINGAL (Typescript fix)
    const url = buildUrl()

    const response = await fetch(url, {
      method: 'HEAD',
      headers: {
        'x-prerender-revalidate': bypassToken
      }
    })

    const revalidated = response.ok
    const payload = {
      revalidated,
      path: url.pathname,
      status: response.status,
      statusText: response.statusText,
      cache: response.headers.get('x-vercel-cache'),
      ...(body && typeof body === 'object' ? { webhook: body } : {})
    }

    console.log('Revalidate response:', payload)

    // TESTINGAL > Vercel revalidate by tags
    // const { slug } = await request.json()
    // revalidateTag(`post:${slug}`)
    // revalidateTag('post-list')

    return Response.json(payload, {
      status: revalidated ? 200 : 502
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Internal server error'
    console.error('Revalidate error:', err)
    return Response.json({ message }, { status: 500 })
  }
}

function buildUrl() {
  return new URL('/', 'https://institucio-branding.vercel.app')
}
