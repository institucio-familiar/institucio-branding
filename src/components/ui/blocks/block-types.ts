import type { SanityImageSource } from '@sanity/image-url'

export type ImageMedia = {
  mediaType: 'image'
  image: SanityImageSource
}

export type VideoMedia = {
  mediaType: 'video'
  playbackId: string
}

export type Media = ImageMedia | VideoMedia

export type Block1 = {
  media1: Media
}

export type Block2 = {
  media1: Media
  media2: Media
}

export type BlockData =
  | { type: 'block_1'; block: Block1 }
  | { type: 'block_2'; block: Block2 }
