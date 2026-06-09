import type { SanityImageSource } from '@sanity/image-url'

import type { BlockData, Media } from '@/components/ui/blocks/block-types'

export type SanityMediaAsset = {
  mediaType?: 'image' | 'video' | null
  image?: SanityImageSource | null
  video?: {
    asset?: {
      playbackId?: string | null
    } | null
  } | null
} | null

export type SanityBlockData = {
  _key: string
  _type: string
  media1?: SanityMediaAsset
  media2?: SanityMediaAsset
  media3?: SanityMediaAsset
}

export function toMedia(media: SanityMediaAsset | undefined): Media | null {
  if (!media) return null

  const asset = media.video?.asset

  return {
    mediaType: media.mediaType,
    image: media.image,
    playbackId:
      asset && 'playbackId' in asset ? (asset.playbackId ?? null) : null
  }
}

export function toBlock(block: SanityBlockData): BlockData | null {
  if (!['block_1', 'block_2', 'block_3'].includes(block._type)) return null

  const media1 = toMedia(block.media1)
  if (!media1) return null

  if (block._type === 'block_1') {
    return {
      _key: block._key,
      _type: 'block_1',
      media1
    }
  }

  if (block._type === 'block_2') {
    return {
      _key: block._key,
      _type: 'block_2',
      media1,
      media2: toMedia(block.media2)
    }
  }

  return {
    _key: block._key,
    _type: 'block_3',
    media1,
    media2: toMedia(block.media2),
    media3: toMedia(block.media3)
  }
}
