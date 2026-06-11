import { defineType, defineField, defineArrayMember } from 'sanity'
import { DocumentTextIcon } from '@sanity/icons'
import { _mandatoryi18nField } from '@/sanity/lib/validations'
import { badUsesField } from '@/sanity/schemaTypes/abtracts/bad-uses'

export const tipografiaPage = defineType({
  name: 'tipografia_page',
  title: 'Tipografía Page',
  type: 'document',
  icon: DocumentTextIcon,
  preview: {
    prepare() {
      return {
        title: 'Tipografía'
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
      title: 'Sección 1 (Nuestras tipografías)',
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
          name: 'alverata',
          title: 'Alverata',
          type: 'object',
          validation: (rule) => rule.required(),
          fields: [
            defineField({
              name: 'testText',
              title: 'Texto de prueba',
              type: 'i18n.text',
              validation: _mandatoryi18nField
            }),
            defineField({
              name: 'downloadUrl',
              title: 'URL de descarga',
              type: 'url',
              validation: (rule) => rule.required()
            })
          ]
        }),
        defineField({
          name: 'inter',
          title: 'Inter',
          type: 'object',
          validation: (rule) => rule.required(),
          fields: [
            defineField({
              name: 'testText',
              title: 'Texto de prueba',
              type: 'i18n.text',
              validation: _mandatoryi18nField
            }),
            defineField({
              name: 'downloadUrl',
              title: 'URL de descarga',
              type: 'url',
              validation: (rule) => rule.required()
            })
          ]
        })
      ]
    }),
    defineField({
      name: 'section2',
      title: 'Sección 2 (Jerarquías y mezclas)',
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
          name: 'titulares',
          title: 'Titulares',
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
          name: 'configuration',
          title: 'Configuración tipográfica',
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
              name: 'content',
              title: 'Contenido',
              type: 'atom_2',
              validation: (rule) => rule.required()
            })
          ]
        }),
        defineField({
          name: 'usage',
          title: 'Uso de las distintas tipografías',
          type: 'atom_2',
          validation: (rule) => rule.required()
        })
      ]
    }),
    defineField({
      name: 'section3',
      title: 'Sección 3 (Composición del texto)',
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
      ]
    }),
    defineField({
      name: 'section4',
      title: 'Sección 4 (Color tipográfico)',
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
      ]
    }),
    badUsesField('section5', 'Sección 5 - Malos usos')
  ]
})
