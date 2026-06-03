import { createImageUrlBuilder } from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url'

import { sanityClient } from 'sanity:client'

// https://www.sanity.io/docs/image-url
const builder = createImageUrlBuilder(sanityClient)

export const urlForImage = (source: SanityImageSource) => {
  return builder.image(source).auto('format').fit('max')
}
