import { defineType, defineField } from 'sanity'

export const test1 = defineType({
  name: 'test-1',
  title: 'Test 1',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 }
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text'
    }),
    defineField({
      name: 'heroMedia',
      title: 'Hero media',
      type: 'mediaAsset'
    })
  ]
})
