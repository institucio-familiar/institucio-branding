import { defineType, defineField } from 'sanity'
import { DocumentTextIcon } from '@sanity/icons'

export const recursosPage = defineType({
  name: 'recursos_page',
  title: 'Recursos Page',
  type: 'document',
  icon: DocumentTextIcon,
  preview: {
    prepare() {
      return {
        title: 'Recursos'
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
