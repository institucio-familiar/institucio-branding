import { defineType, defineField } from 'sanity'
import { BlockElementIcon } from '@sanity/icons'

export const block1 = defineType({
  name: 'block_1',
  title: 'Block 1',
  type: 'object',
  icon: BlockElementIcon,
  fields: [
    defineField({
      name: 'media1',
      title: 'Media',
      type: 'mediaAsset',
      validation: (rule) => rule.required()
    })
  ],
  preview: {
    select: {
      mediaType: 'media1.mediaType'
    },
    prepare({ mediaType }) {
      return {
        title: 'Block 1',
        subtitle: mediaType === 'video' ? 'Video' : 'Imágen',
        media: BlockElementIcon
      }
    }
  }
})
