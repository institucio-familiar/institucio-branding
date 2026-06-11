import { defineField, defineArrayMember } from 'sanity'
import { _mandatoryi18nField } from '@/sanity/lib/validations'

export function badUsesField(name: string, title: string) {
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
                name: 'media',
                title: 'Media',
                type: 'mediaAsset',
                validation: (rule) => rule.required()
              }),
              defineField({
                name: 'description',
                title: 'Descripción',
                type: 'i18n.text',
                validation: _mandatoryi18nField
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
      prepare() {
        return { title }
      }
    }
  })
}
