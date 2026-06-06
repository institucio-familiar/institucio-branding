import { defineType, defineField } from 'sanity'
import { DocumentTextIcon } from '@sanity/icons'

export const asiNosVemosPage = defineType({
  name: 'asi_nos_vemos_page',
  title: 'Así nos vemos Page',
  type: 'document',
  icon: DocumentTextIcon,
  preview: {
    prepare() {
      return {
        title: 'Así nos vemos'
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
