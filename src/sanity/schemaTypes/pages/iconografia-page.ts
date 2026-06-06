import { defineType, defineField } from 'sanity'
import { DocumentTextIcon } from '@sanity/icons'

export const iconografiaPage = defineType({
  name: 'iconografia_page',
  title: 'Iconografía Page',
  type: 'document',
  icon: DocumentTextIcon,
  preview: {
    prepare() {
      return {
        title: 'Iconografía'
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
