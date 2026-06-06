import type { SanityImageSource } from '@sanity/image-url'

export type Media = {
  mediaType?: 'image' | 'video' | null
  image?: SanityImageSource | null
  playbackId?: string | null
}

export type BlockMedias = {
  media1: Media
  media2?: Media | null
  media3?: Media | null
}

export type BlockData = {
  _key: string
  _type: 'block_1' | 'block_2' | 'block_3'
  media1: Media
  media2?: Media | null
  media3?: Media | null
}
