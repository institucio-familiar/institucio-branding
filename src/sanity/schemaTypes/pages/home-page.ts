import { defineType, defineField } from 'sanity'
import { HomeIcon } from '@sanity/icons'
import { _mandatoryField, _mandatoryi18nField } from '@/sanity/lib/validations'

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
      name: 'textSlides',
      title: 'Textos (slides)',
      type: 'object',
      validation: (rule) => rule.required(),
      fields: [
        defineField({
          name: 'textSlide1',
          title: 'Texto 1',
          type: 'i18n.text',
          validation: _mandatoryi18nField
        }),
        defineField({
          name: 'textSlide2',
          title: 'Texto 2',
          type: 'i18n.text',
          validation: _mandatoryi18nField
        })
      ]
    }),
    defineField({
      name: 'imageZoom',
      title: 'Imagen (zoom)',
      type: 'mediaAsset',
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'imagesGrid',
      title: 'Imágenes (grid)',
      type: 'object',
      validation: (rule) => rule.required(),
      fields: [
        defineField({
          name: 'image1',
          title: 'Imagen 1',
          type: 'mediaAsset',
          validation: (rule) => rule.required()
        }),
        defineField({
          name: 'image2',
          title: 'Imagen 2',
          type: 'mediaAsset',
          validation: (rule) => rule.required()
        }),
        defineField({
          name: 'image3',
          title: 'Imagen 3',
          type: 'mediaAsset',
          validation: (rule) => rule.required()
        }),
        defineField({
          name: 'image4',
          title: 'Imagen 4',
          type: 'mediaAsset',
          validation: (rule) => rule.required()
        })
      ]
    }),
    defineField({
      name: 'imageEye',
      title: 'Imagen ojo',
      type: 'mediaAsset',
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'bookText',
      title: 'Texto libro',
      type: 'i18n.text',
      validation: _mandatoryi18nField
    }),
    defineField({
      name: 'words',
      title: 'Palabras clave',
      type: 'object',
      validation: (rule) => rule.required(),
      fields: [
        defineField({
          name: 'word1',
          title: 'Palabra clave 1',
          type: 'i18n.string',
          validation: _mandatoryi18nField
        }),
        defineField({
          name: 'word2',
          title: 'Palabra clave 2',
          type: 'i18n.string',
          validation: _mandatoryi18nField
        }),
        defineField({
          name: 'word3',
          title: 'Palabra clave 3',
          type: 'i18n.string',
          validation: _mandatoryi18nField
        })
      ]
    })
  ]
})
