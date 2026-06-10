import { defineType, defineField } from 'sanity'
import { BlockElementIcon } from '@sanity/icons'

export const atom1 = defineType({
  name: 'atom_1',
  title: 'Atom 1',
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
      name: 'media1',
      title: 'Media',
      type: 'mediaAsset',
      validation: (rule) => rule.required()
    })
  ],
  preview: {
    select: {
      mediaType: 'media1.mediaType',
      title: 'title.es'
    },
    prepare({ mediaType, title }) {
      return {
        title: title,
        subtitle: mediaType === 'video' ? 'Video' : 'Imágen',
        media: BlockElementIcon // TESTINGAL > Add custom images to blocks here
      }
    }
  }
})
