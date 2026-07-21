import type { APIRoute } from 'astro'
import { getPathsForSanityType } from '@/sanity/lib/revalidate-paths'

type WebhookPayload = {
  _type?: string
  _id?: string
  slug?: { current?: string }
}

type RevalidateResult = {
  path: string
  revalidated: boolean
  status: number
  statusText: string
  cache: string | null
  redirectLocation: string | null
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const secret = request.headers.get('x-revalidate-secret')

    if (secret !== import.meta.env.SANITY_REVALIDATE_SECRET) {
      return new Response('Unauthorized', { status: 401 })
    }

    const body = (await request.json()) as WebhookPayload
    const documentType = body._type

    if (!documentType) {
      return Response.json(
        { revalidated: false, reason: 'Missing _type', webhook: body },
        { status: 200 }
      )
    }

    const paths = getPathsForSanityType(documentType)

    if (paths.length === 0) {
      return Response.json(
        {
          revalidated: false,
          reason: `Unknown document type: ${documentType}`,
          webhook: body
        },
        { status: 200 }
      )
    }

    const results: RevalidateResult[] = []

    for (const path of paths) {
      results.push(await revalidatePath(path, secret))
    }

    const revalidated = results.every((result) => result.revalidated)

    if (!revalidated) {
      console.error('Revalidate failures:', results.filter((result) => !result.revalidated))
    }

    return Response.json(
      {
        revalidated,
        paths: results,
        webhook: body
      },
      { status: revalidated ? 200 : 502 }
    )
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Internal server error'
    console.error('Revalidate error:', err)
    return Response.json({ message }, { status: 500 })
  }
}

async function revalidatePath(url: string, bypassToken: string) {
  const response = await fetch(url, {
    method: 'GET',
    redirect: 'manual',
    headers: {
      'x-prerender-revalidate': bypassToken
    }
  })

  if (response.body) {
    await response.body.cancel()
  }

  const redirectLocation = response.headers.get('location')
  const revalidated = response.ok

  return {
    path: new URL(url).pathname,
    revalidated,
    status: response.status,
    statusText: response.statusText,
    cache: response.headers.get('x-vercel-cache'),
    redirectLocation
  }
}
