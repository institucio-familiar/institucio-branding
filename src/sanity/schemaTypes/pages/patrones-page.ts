import { defineType, defineField, defineArrayMember } from 'sanity'
import { DocumentTextIcon } from '@sanity/icons'
import { _mandatoryi18nField } from '@/sanity/lib/validations'
import { badUsesField } from '@/sanity/schemaTypes/abtracts/bad-uses'

export const patronesPage = defineType({
  name: 'patrones_page',
  title: 'Patrones Page',
  type: 'document',
  icon: DocumentTextIcon,
  preview: {
    prepare() {
      return {
        title: 'Patrones'
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
      title: 'Sección 1 (Contenedor)',
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
              type: 'atom_1'
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
      name: 'section2',
      title: 'Sección 2 (Destacado gráfico)',
      type: 'atom_2',
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'section3',
      title: 'Sección 3 (Patrones decorativos)',
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
          of: [defineArrayMember({ type: 'atom_2' })],
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
      name: 'section4',
      title: 'Sección 4 (Transiciones)',
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
    defineField({
      name: 'section5',
      title: 'Sección 5 (Tipografía y patrones)',
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
    badUsesField('section6', 'Sección 6 - Malos usos')
  ]
})
