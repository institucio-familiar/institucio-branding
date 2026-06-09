import { defineType, defineField } from 'sanity'
import { BlockElementIcon } from '@sanity/icons'

export const block2 = defineType({
  name: 'block_2',
  title: 'Block 2',
  type: 'object',
  icon: BlockElementIcon,
  fields: [
    defineField({
      name: 'media1',
      title: 'Media 1',
      type: 'mediaAsset',
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'media2',
      title: 'Media 2',
      type: 'mediaAsset'
    })
  ],
  preview: {
    select: {
      mediaType1: 'media1.mediaType',
      mediaType2: 'media2.mediaType'
    },
    prepare({ mediaType1, mediaType2 }) {
      return {
        title: 'Bloque 2 (2 imágenes/vídeos)',
        subtitle: `${mediaType1 === 'video' ? 'Video' : 'Imágen'} | ${mediaType2 === 'video' ? 'Video' : 'Imágen'}`,
        media: BlockElementIcon
      }
    }
  }
})
