import { defineType, defineField, defineArrayMember } from 'sanity'
import { DocumentTextIcon } from '@sanity/icons'
import { _mandatoryi18nField } from '@/sanity/lib/validations'
import { badUsesField } from '@/sanity/schemaTypes/abtracts/bad-uses'

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
      validation: (rule) => rule.required(),
      fields: [
        defineField({
          name: 'media',
          title: 'Media',
          type: 'mediaAsset',
          validation: (rule) => rule.required()
        })
      ]
    }),
    defineField({
      name: 'intro',
      title: 'Introducción',
      type: 'object',
      validation: (rule) => rule.required(),
      fields: [
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
        }),
        defineField({
          name: 'media',
          title: 'Media',
          type: 'mediaAsset',
          validation: (rule) => rule.required()
        })
      ]
    }),
    defineField({
      name: 'section1',
      title: 'Sección 1 (Sistema de iconos)',
      type: 'atom_1',
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'section2',
      title: 'Sección 2 (Señalética)',
      type: 'object',
      validation: (rule) => rule.required(),
      fields: [
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
        }),
        defineField({
          name: 'blocks',
          title: 'Bloques',
          type: 'array',
          of: [defineArrayMember({ type: 'atom_1' })],
          validation: (rule) => rule.required()
        })
      ],
      preview: {
        select: {
          title: 'title.es'
        },
        prepare({ title }) {
          return { title }
        }
      }
    }),
    badUsesField('section3', 'Sección 3 - Malos usos')
  ]
})
