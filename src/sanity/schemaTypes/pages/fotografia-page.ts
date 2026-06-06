import { defineType, defineField } from 'sanity'
import { DocumentTextIcon } from '@sanity/icons'

export const fotografiaPage = defineType({
  name: 'fotografia_page',
  title: 'Fotografía Page',
  type: 'document',
  icon: DocumentTextIcon,
  preview: {
    prepare() {
      return {
        title: 'Fotografía'
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
