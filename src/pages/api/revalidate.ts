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

    const siteUrl = import.meta.env.PUBLIC_SITE_URL
    const results = await Promise.all(
      paths.map((path) => revalidatePath(path, siteUrl, secret))
    )

    const revalidated = results.every((result) => result.revalidated)

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

async function revalidatePath(
  path: string,
  siteUrl: string,
  bypassToken: string
): Promise<RevalidateResult> {
  const url = new URL(path, siteUrl)
  const response = await fetch(url, {
    method: 'HEAD',
    headers: {
      'x-prerender-revalidate': bypassToken
    }
  })

  return {
    path: url.pathname,
    revalidated: response.ok,
    status: response.status,
    statusText: response.statusText,
    cache: response.headers.get('x-vercel-cache')
  }
}
