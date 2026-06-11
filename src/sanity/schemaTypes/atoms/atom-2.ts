import { defineType, defineField, defineArrayMember } from 'sanity'
import { BlockElementIcon } from '@sanity/icons'

export const atom2 = defineType({
  name: 'atom_2',
  title: 'Atom 2',
  type: 'object',
  icon: BlockElementIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'i18n.string',
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'i18n.text',
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'medias',
      title: 'Carrusel de imágenes/vídeos',
      type: 'array',
      of: [defineArrayMember({ type: 'mediaAsset' })]
    })
  ],
  preview: {
    select: {
      title: 'title.es'
    },
    prepare({ title }) {
      return {
        title: title,
        subtitle: 'Carrusel de imágenes/vídeos',
        media: BlockElementIcon // TESTINGAL > Add custom images to blocks here
      }
    }
  }
})
