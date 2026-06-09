import { defineType, defineField, defineArrayMember } from 'sanity'
import { DocumentTextIcon } from '@sanity/icons'
import { _mandatoryField, _mandatoryi18nField } from '@/sanity/lib/validations'

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
          type: 'mediaAsset',
          validation: (rule) => rule.required()
        }),
        defineField({
          name: 'title',
          title: 'Título',
          type: 'i18n.string',
          validation: _mandatoryi18nField
        }),
        defineField({
          name: 'description',
          title: 'Descripción',
          type: 'i18n.text',
          validation: _mandatoryi18nField
        })
      ]
    }),
    defineField({
      name: 'generalBlocks',
      title: 'Bloques generales',
      type: 'array',
      of: [
        defineArrayMember({ type: 'block_1' }),
        defineArrayMember({ type: 'block_2' })
      ]
    })
  ]
})
