import { defineType, defineField } from 'sanity'
import { DocumentTextIcon } from '@sanity/icons'

export const layoutPage = defineType({
  name: 'layout_page',
  title: 'Layout Page',
  type: 'document',
  icon: DocumentTextIcon,
  preview: {
    prepare() {
      return {
        title: 'Layout'
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
