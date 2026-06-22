import { defineType, defineField, defineArrayMember } from 'sanity'
import { DocumentTextIcon } from '@sanity/icons'
import { _mandatoryi18nField } from '@/sanity/lib/validations'

const PRINCIPIOS_CREATIVOS = [
  {
    name: 'typography',
    title: 'Tipografía'
  },
  {
    name: 'color',
    title: 'Color'
  },
  {
    name: 'voz',
    title: 'Voz'
  }
]

export const nuestraMarcaPage = defineType({
  name: 'nuestra_marca_page',
  title: 'Nuestra Marca Page',
  type: 'document',
  icon: DocumentTextIcon,
  preview: {
    prepare() {
      return {
        title: 'Nuestra Marca'
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
          name: 'questions',
          title: 'Preguntas',
          type: 'array',
          validation: (rule) => rule.required(),
          of: [
            defineArrayMember({
              name: 'question',
              title: 'Pregunta',
              type: 'object',
              preview: {
                select: {
                  question: 'question.es'
                },
                prepare({ question }) {
                  return { title: question }
                }
              },
              fields: [
                defineField({
                  name: 'question',
                  title: 'Pregunta',
                  type: 'i18n.string',
                  validation: _mandatoryi18nField
                }),
                defineField({
                  name: 'answer',
                  title: 'Respuesta',
                  type: 'i18n.text',
                  validation: _mandatoryi18nField
                })
              ]
            })
          ]
        })
      ]
    }),
    defineField({
      name: 'section2',
      title: 'Sección 2',
      type: 'array',
      validation: (rule) => rule.required(),
      of: [
        defineArrayMember({
          type: 'object',
          preview: {
            select: {
              title: 'title.es'
            },
            prepare({ title }) {
              return { title }
            }
          },
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
        })
      ]
    }),
    defineField({
      name: 'section3',
      title: 'Sección 3 (Principios creativos)',
      type: 'object',
      validation: (rule) => rule.required(),
      fields: PRINCIPIOS_CREATIVOS.map((principio) =>
        defineField({
          name: principio.name,
          title: principio.title,
          type: 'atom_1',
          validation: (rule) => rule.required()
        })
      )
    })
  ]
})
