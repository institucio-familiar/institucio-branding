import type { SanityImageSource } from '@sanity/image-url'

import type {
  Block1,
  Block2,
  BlockData,
  Media
} from '@/components/ui/blocks/block-types'

/** Shape of a `mediaAsset` as returned by the GROQ media projection. */
export type SanityMediaAsset = {
  mediaType?: 'image' | 'video' | null
  image?: SanityImageSource | null
  video?: {
    asset?: {
      playbackId?: string | null
    } | null
  } | null
} | null

/** Shape of a block item as returned by the GROQ block projection. */
export type SanityBlockData = {
  _type: string
  media1?: SanityMediaAsset
  media2?: SanityMediaAsset
}

// PARSERS
export function toMedia(
  sanityMedia: SanityMediaAsset | undefined
): Media | null {
  if (!sanityMedia || !sanityMedia.mediaType) return null

  if (sanityMedia.mediaType === 'image' && sanityMedia.image) {
    return {
      mediaType: 'image',
      image: sanityMedia.image
    }
  }

  if (
    sanityMedia.mediaType === 'video' &&
    sanityMedia.video?.asset?.playbackId
  ) {
    return {
      mediaType: 'video',
      playbackId: sanityMedia.video.asset.playbackId
    }
  }

  return null
}

function toBlock1(block: SanityBlockData): Block1 | null {
  const media1 = toMedia(block.media1)
  if (!media1) return null

  return { media1 }
}

function toBlock2(block: SanityBlockData): Block2 | null {
  const media1 = toMedia(block.media1)
  const media2 = toMedia(block.media2)
  if (!media1 || !media2) return null

  return { media1, media2 }
}

export function toBlock(block: SanityBlockData): BlockData | null {
  if (block._type === 'block_1') {
    const parsed = toBlock1(block)
    return parsed && { type: 'block_1', block: parsed }
  }

  if (block._type === 'block_2') {
    const parsed = toBlock2(block)
    return parsed && { type: 'block_2', block: parsed }
  }

  return null
}
