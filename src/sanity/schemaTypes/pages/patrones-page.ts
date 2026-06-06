import { defineType, defineField } from 'sanity'
import { DocumentTextIcon } from '@sanity/icons'

export const patronesPage = defineType({
  name: 'patrones_page',
  title: 'Patrones Page',
  type: 'document',
  icon: DocumentTextIcon,
  preview: {
    prepare() {
      return {
        title: 'Patrones'
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
