// src/pages/api/revalidate.ts
import type { APIRoute } from 'astro'
// import { revalidateTag } from '@vercel/functions'

export const POST: APIRoute = async ({ request }) => {
  try {
    const secret = request.headers.get('x-revalidate-secret')

    if (secret !== import.meta.env.SANITY_REVALIDATE_SECRET) {
      return new Response('Unauthorized', { status: 401 })
    }

    const body = await request.json()

    const bypassToken = secret

    // TESTINGAL > Decide how to revalidate. Could map types and slugs to paths.
    // Now the sanity webhook returns {_type, _id, slug }
    // {
    //   _id: '7ddf8774-2f0b-4bbf-94ca-d32dd9d1f2d5',
    //   _type: 'test',
    //   slug: { _type: 'slug', current: 'first-one-change-1' }
    // }
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

    // console.log('Revalidate response:', payload)

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
  // Include other urls in this function
  return new URL('/', import.meta.env.PUBLIC_SITE_URL)
}
