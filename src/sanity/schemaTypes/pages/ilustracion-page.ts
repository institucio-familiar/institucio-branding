import { defineType, defineField } from 'sanity'
import { DocumentTextIcon } from '@sanity/icons'

export const ilustracionPage = defineType({
  name: 'ilustracion_page',
  title: 'Ilustración Page',
  type: 'document',
  icon: DocumentTextIcon,
  preview: {
    prepare() {
      return {
        title: 'Ilustración'
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
