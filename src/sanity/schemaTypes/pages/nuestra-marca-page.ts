import { defineType, defineField } from 'sanity'
import { DocumentTextIcon } from '@sanity/icons'

export const nuestraMarcaPage = defineType({
  name: 'nuestra_marca_page',
  title: 'Nuestra Marca Page',
  type: 'document',
  icon: DocumentTextIcon,
  preview: {
    prepare() {
      return {
        title: 'Nuestra Marca'
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
