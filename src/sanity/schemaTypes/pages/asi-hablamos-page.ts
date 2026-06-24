import { defineType, defineField, defineArrayMember } from 'sanity'
import { DocumentTextIcon } from '@sanity/icons'
import { _mandatoryi18nField } from '@/sanity/lib/validations'

export const asiHablamosPage = defineType({
  name: 'asi_hablamos_page',
  title: 'Así hablamos Page',
  type: 'document',
  icon: DocumentTextIcon,
  preview: {
    prepare() {
      return {
        title: 'Así hablamos'
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
          name: 'medias',
          title: 'Carrusel de imágenes/vídeos',
          type: 'array',
          of: [defineArrayMember({ type: 'mediaAsset' })],
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
    // Section 1
    defineField({
      name: 'section1',
      title: 'Sección 1',
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
    // Section 2
    defineField({
      name: 'section2',
      title: 'Sección 2 (Nuestra voz no es)',
      type: 'object',
      validation: (rule) => rule.required(),
      fields: [
        defineField({
          name: 'blocks',
          title: 'Bloques',
          type: 'array',
          of: [defineArrayMember({ type: 'atom_1' })],
          validation: (rule) => rule.required()
        })
      ],
      preview: {
        prepare() {
          return { title: 'Sección 2' }
        }
      }
    }),
    defineField({
      name: 'section3',
      title: 'Sección 3 (En lugar de...decimos...)',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'correct',
              title: 'Correcto',
              type: 'i18n.string',
              validation: _mandatoryi18nField
            }),
            defineField({
              name: 'incorrect',
              title: 'Incorrecto',
              type: 'i18n.string',
              validation: _mandatoryi18nField
            })
          ],
          preview: {
            select: {
              correct: 'correct.es',
              incorrect: 'incorrect.es'
            },
            prepare({ correct, incorrect }) {
              return { title: `✅ ${correct} vs ❌ ${incorrect}` }
            }
          }
        })
      ],
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'section4',
      title: 'Sección 4 (Alto y claro!)',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'correct',
              title: 'Correcto',
              type: 'i18n.string',
              validation: _mandatoryi18nField
            }),
            defineField({
              name: 'incorrect',
              title: 'Incorrecto',
              type: 'i18n.string',
              validation: _mandatoryi18nField
            })
          ],
          preview: {
            select: {
              correct: 'correct.es',
              incorrect: 'incorrect.es'
            },
            prepare({ correct, incorrect }) {
              return { title: `✅ ${correct} vs ❌ ${incorrect}` }
            }
          }
        })
      ],
      validation: (rule) => rule.required()
    })
  ]
})
