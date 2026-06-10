import { defineType, defineField, defineArrayMember } from 'sanity'
import { DocumentTextIcon } from '@sanity/icons'
import { _mandatoryi18nField } from '../../lib/validations'

const principioCreativoFields = [
  defineField({
    name: 'media',
    title: 'Media',
    type: 'mediaAsset'
  }),
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
          type: 'mediaAsset'
        })
      ]
    }),
    defineField({
      name: 'section1',
      title: 'Sección 1',
      type: 'object',
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
          of: [
            defineArrayMember({
              name: 'question',
              title: 'Pregunta',
              type: 'object',
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
      of: [
        defineArrayMember({
          name: 'block',
          title: 'Bloque',
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
              name: 'media',
              title: 'Media',
              type: 'mediaAsset'
            })
          ]
        })
      ]
    }),
    defineField({
      name: 'section3',
      title: 'Sección 3 (Principios creativos)',
      type: 'object',
      fields: PRINCIPIOS_CREATIVOS.map((principio) =>
        defineField({
          name: principio.name,
          title: principio.title,
          type: 'object',
          fields: principioCreativoFields
        })
      )
    })
  ]
})
