import { defineType, defineField, defineArrayMember } from 'sanity'
import { DocumentTextIcon } from '@sanity/icons'
import { _mandatoryi18nField } from '@/sanity/lib/validations'
import { badUsesField } from '@/sanity/schemaTypes/abtracts/bad-uses'

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
      validation: (rule) => rule.required(),
      fields: [
        defineField({
          name: 'media',
          title: 'Media',
          type: 'mediaAsset',
          validation: (rule) => rule.required()
        }),
        defineField({
          name: 'mediaMobile',
          title: 'Media Mobile',
          type: 'mediaAsset'
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
      title: 'Sección 1 (Bloques)',
      type: 'array',
      of: [defineArrayMember({ type: 'atom_1' })],
      validation: (rule) => rule.required()
    }),
    badUsesField('section2', 'Sección 2 - Malos usos')
  ]
})
