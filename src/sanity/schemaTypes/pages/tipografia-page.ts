import { defineType, defineField } from 'sanity'
import { DocumentTextIcon } from '@sanity/icons'

export const tipografiaPage = defineType({
  name: 'tipografia_page',
  title: 'Tipografía Page',
  type: 'document',
  icon: DocumentTextIcon,
  preview: {
    prepare() {
      return {
        title: 'Tipografía'
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
