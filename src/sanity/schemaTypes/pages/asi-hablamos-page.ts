import { defineType, defineField } from 'sanity'
import { DocumentTextIcon } from '@sanity/icons'

export const asiHablamosPage = defineType({
  name: 'asi_hablamos_page',
  title: 'Así hablamos Page',
  type: 'document',
  icon: DocumentTextIcon,
  preview: {
    prepare() {
      return {
        title: 'Así hablamos'
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
