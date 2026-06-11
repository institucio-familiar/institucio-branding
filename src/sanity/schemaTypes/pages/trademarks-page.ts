import { defineType, defineField, defineArrayMember } from 'sanity'
import { DocumentTextIcon } from '@sanity/icons'
import { _mandatoryi18nField } from '@/sanity/lib/validations'
import { badUsesField } from '@/sanity/schemaTypes/abtracts/bad-uses'

const SECTIONS = [
  {
    name: 'section1',
    title: 'Sección 1 - Logotipo'
  },
  {
    name: 'section2',
    title: 'Sección 2 - Escudo'
  },
  {
    name: 'section3',
    title: 'Sección 3 - Favicon'
  },
  {
    name: 'section4',
    title: 'Sección 4 - Otros formatos'
  },
  {
    name: 'section5',
    title: 'Sección 5 - Colaboraciones'
  }
]

export const trademarksPage = defineType({
  name: 'trademarks_page',
  title: 'Trademarks Page',
  type: 'document',
  icon: DocumentTextIcon,
  preview: {
    prepare() {
      return {
        title: 'Trademarks'
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
          name: 'blocks',
          title: 'Bloques',
          type: 'array',
          of: [defineArrayMember({ type: 'atom_1' })],
          validation: (rule) =>
            rule.custom((blocks) => {
              if (!Array.isArray(blocks) || blocks.length !== 3) {
                return 'Debe haber exactamente 3 bloques'
              }
              return true
            })
        })
      ],
      preview: {
        prepare() {
          return { title: 'Introducción' }
        }
      }
    }),
    ...SECTIONS.map((section) =>
      defineField({
        name: section.name,
        title: section.title,
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
            of: [
              defineArrayMember({ type: 'atom_1', title: '1 imagen/video' }),
              defineArrayMember({
                type: 'atom_2',
                title: 'Carrusel de imágenes/vídeos'
              })
            ],
            validation: (rule) => rule.required()
          })
        ],
        preview: {
          prepare() {
            return { title: section.title }
          }
        }
      })
    ),
    badUsesField('section6', 'Sección 6 - Malos usos')
  ]
})
