import { defineType, defineField, defineArrayMember } from 'sanity'
import { DocumentTextIcon } from '@sanity/icons'
import { _mandatoryField, _mandatoryi18nField } from '@/sanity/lib/validations'

export const recursosPage = defineType({
  name: 'recursos_page',
  title: 'Recursos Page',
  type: 'document',
  icon: DocumentTextIcon,
  preview: {
    prepare() {
      return {
        title: 'Recursos'
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
        })
      ]
    }),
    defineField({
      name: 'section1',
      title: 'Sección 1 (Assets)',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
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
              name: 'url',
              title: 'URL (Link descarga)',
              type: 'url',
              validation: (rule) => rule.required()
            }),
            defineField({
              name: 'media',
              title: 'Media',
              type: 'mediaAsset',
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
        })
      ]
    })
  ]
})
