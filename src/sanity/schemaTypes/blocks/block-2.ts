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
      mediaType: 'media1.mediaType'
    },
    prepare({ mediaType }) {
      return {
        title: 'Block 2',
        subtitle: mediaType === 'video' ? 'Video' : 'Imágen',
        media: BlockElementIcon
      }
    }
  }
})
