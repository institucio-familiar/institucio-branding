import type { SanityImageSource } from '@sanity/image-url'

export type ImageMedia = {
  mediaType: 'image'
  image: SanityImageSource
}

export type VideoMedia = {
  mediaType: 'video'
  playbackId: string
}

export type OfflineMedia = {
  mediaType: 'offline'
  imageSrc: string
}

export type Media = ImageMedia | VideoMedia | OfflineMedia

export type Block1 = {
  media1: Media
}

export type Block2 = {
  media1: Media
  media2: Media
}

export type Block3 = {
  title: string
  description: string
  media: Media
}

export type Block4 = {
  title: string
  description: string
  media: Media
}

export type Block5 = {
  bigTitle?: string
  title: string
  description: string
  medias: Media[]
}

export type Block6 = {
  title: string
  description: string
  medias: Media[]
}

export type Block7 = {
  title: string
  description: string
  media: Media
}

export type Block8 = {
  titleSize?: string
  title: string
  description: string
  medias: Media[]
}

export type Block9 = {
  title: string
  description: string
  items: { media: Media; description: string }[]
}

export type Block10 = {
  title: string
  description: string
  media1: Media
  media2: Media
}

export type BlockData =
  | { type: 'block_1'; block: Block1 }
  | { type: 'block_2'; block: Block2 }
