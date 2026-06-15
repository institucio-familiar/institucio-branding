import { defineType, defineField, defineArrayMember } from 'sanity'
import { DocumentTextIcon } from '@sanity/icons'
import { _mandatoryi18nField } from '@/sanity/lib/validations'
import { badUsesField } from '@/sanity/schemaTypes/abtracts/bad-uses'

export const ilustracionPage = defineType({
  name: 'ilustracion_page',
  title: 'Ilustración Page',
  type: 'document',
  icon: DocumentTextIcon,
  preview: {
    prepare() {
      return {
        title: 'Ilustración'
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
      title: 'Sección 1 (Paleta de color)',
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
      name: 'section2',
      title: 'Sección 2 (Convivencia)',
      type: 'atom_1',
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'section3',
      title: 'Sección 3 (Con tipografía)',
      type: 'atom_1',
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'section4',
      title: 'Sección 4 (Escala y proporción)',
      type: 'atom_1',
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'section5',
      title: 'Sección 5 (Composición)',
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
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
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
            })
          ],
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
    defineField({
      name: 'section6',
      title: 'Sección 6 (Animaciones)',
      type: 'atom_1',
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'section7',
      title: 'Sección 7 (Prompt)',
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
          name: 'instructions',
          title: 'Instrucciones',
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
              name: 'prompt',
              title: 'Prompt',
              type: 'text',
              validation: (rule) => rule.required()
            })
          ]
        })
      ]
    }),
    badUsesField('section8', 'Sección 8 - Malos usos')
  ]
})
