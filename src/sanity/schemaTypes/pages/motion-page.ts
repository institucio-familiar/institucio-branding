import { defineType, defineField } from 'sanity'
import { DocumentTextIcon } from '@sanity/icons'

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
      fields: [
        defineField({
          name: 'media',
          title: 'Media',
          type: 'mediaAsset'
        })
      ]
    })
  ]
})
