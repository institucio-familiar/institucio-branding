import { defineType, defineField } from 'sanity'
import { ImageIcon } from '@sanity/icons'

import { MediaAssetInput } from '@/sanity/ui/media-asset-input'

export const mediaAsset = defineType({
  name: 'mediaAsset',
  title: 'Media',
  type: 'object',
  icon: ImageIcon,
  components: {
    input: MediaAssetInput
  },
  fields: [
    defineField({
      name: 'mediaType',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Image', value: 'image' },
          { title: 'Video', value: 'video' }
        ],
        layout: 'radio'
      },
      initialValue: 'image',
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      hidden: ({ parent }) => parent?.mediaType !== 'image'
    }),
    defineField({
      name: 'video',
      title: 'Video',
      type: 'mux.video',
      hidden: ({ parent }) => parent?.mediaType !== 'video'
    })
  ],
  validation: (rule) =>
    rule.custom((value) => {
      if (!value?.mediaType) return 'Choose image or video'
      if (value.mediaType === 'image' && !value.image)
        return 'Image is required'
      if (value.mediaType === 'video' && !value.video)
        return 'Video is required'
      return true
    })
})
