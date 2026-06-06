import { defineType, defineField } from 'sanity'
import { HomeIcon } from '@sanity/icons'

export const homePage = defineType({
  name: 'home_page',
  title: 'Home Page',
  type: 'document',
  icon: HomeIcon,
  preview: {
    prepare() {
      return {
        title: 'Home'
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
