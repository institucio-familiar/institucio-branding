import { defineType, defineField, defineArrayMember } from 'sanity'
import { DocumentTextIcon } from '@sanity/icons'
import { _mandatoryi18nField } from '@/sanity/lib/validations'
import { badUsesField } from '@/sanity/schemaTypes/abtracts/bad-uses'

export const layoutPage = defineType({
  name: 'layout_page',
  title: 'Layout Page',
  type: 'document',
  icon: DocumentTextIcon,
  preview: {
    prepare() {
      return {
        title: 'Layout'
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
          name: 'overview',
          title: 'Overview',
          type: 'atom_1',
          validation: (rule) => rule.required()
        })
      ]
    }),
    defineField({
      name: 'section1',
      title: 'Sección 1 (Sistema compositivo)',
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
          name: 'configuration',
          title: 'Configuración',
          type: 'atom_2',
          validation: (rule) => rule.required()
        })
      ]
    }),
    defineField({
      name: 'section2',
      title: 'Sección 2 (Formatos estándar)',
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
          name: 'mediaAsset',
          title: 'Media',
          type: 'mediaAsset',
          validation: (rule) => rule.required()
        }),
        defineField({
          name: 'formats',
          title: 'Formatos',
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
                  name: 'image1',
                  title: 'Imagen 1 (Ejemplo)',
                  type: 'mediaAsset',
                  validation: (rule) => rule.required()
                }),
                defineField({
                  name: 'image2',
                  title: 'Imagen 2 (Grid)',
                  type: 'mediaAsset',
                  validation: (rule) => rule.required()
                })
              ]
            })
          ],
          validation: (rule) => rule.required()
        })
      ],
      preview: {
        prepare() {
          return { title: 'Sección 2 (Formatos estándar)' }
        }
      }
    }),
    defineField({
      name: 'section3',
      title: 'Sección 3 (Márgenes)',
      type: 'atom_1',
      validation: (rule) => rule.required()
    }),
    badUsesField('section4', 'Sección 4 - Malos usos')
  ]
})
