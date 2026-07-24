import { defineType, defineField, defineArrayMember } from 'sanity'
import { DocumentTextIcon } from '@sanity/icons'
import { _mandatoryi18nField } from '@/sanity/lib/validations'
import { badUsesField } from '@/sanity/schemaTypes/abtracts/bad-uses'

const SECTIONS = [
  { name: 'section2', title: 'Sección 2 (Animación logotipo)' },
  {
    name: 'section3',
    title: 'Sección 3 (Animación tipográfica)'
  },
  {
    name: 'section4',
    title: 'Sección 4 (Transiciones)'
  },
  {
    name: 'section5',
    title: 'Sección 5 (Animaciones UI)'
  }
]

export const motionPage = defineType({
  name: 'motion_page',
  title: 'Motion Page',
  type: 'document',
  icon: DocumentTextIcon,
  preview: {
    prepare() {
      return {
        title: 'Motion'
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
        })
      ]
    }),
    defineField({
      name: 'section1',
      title: 'Sección 1 (Principio)',
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
    ...SECTIONS.map((section) => sectionField(section.name, section.title)),
    badUsesField('section6', 'Sección 6 - Malos usos')
  ]
})

function sectionField(name: string, title: string) {
  return defineField({
    name,
    title,
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
            ],
            preview: {
              select: {
                title: 'description.es'
              },
              prepare({ title }) {
                return { title }
              }
            }
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
  })
}
