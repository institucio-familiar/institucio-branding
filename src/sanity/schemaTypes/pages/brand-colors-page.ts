import { defineType, defineField } from 'sanity'
import { DocumentTextIcon } from '@sanity/icons'

export const brandColorsPage = defineType({
  name: 'brand_colors_page',
  title: 'Brand colors Page',
  type: 'document',
  icon: DocumentTextIcon,
  preview: {
    prepare() {
      return {
        title: 'Brand colors'
      }
    }
  },
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'object',
      fields: [
        defineField({
          name: 'media',
          title: 'Media',
          type: 'mediaAsset'
        })
      ]
    })
  ]
})
