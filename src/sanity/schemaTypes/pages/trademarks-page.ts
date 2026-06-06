import { defineType, defineField } from 'sanity'
import { DocumentTextIcon } from '@sanity/icons'

export const trademarksPage = defineType({
  name: 'trademarks_page',
  title: 'Trademarks Page',
  type: 'document',
  icon: DocumentTextIcon,
  preview: {
    prepare() {
      return {
        title: 'Trademarks'
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
