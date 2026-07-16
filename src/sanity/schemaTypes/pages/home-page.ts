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
      ],
      preview: {
        prepare() {
          return { title: 'Hero' }
        }
      }
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
      ],
      preview: {
        prepare() {
          return { title: 'Textos (slides)' }
        }
      }
    }),
    defineField({
      name: 'videoLogos',
      title: 'Videos logos',
      type: 'file',
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'tileGrid',
      title: 'Tile grid',
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
          name: 'text1',
          title: 'Texto 1',
          type: 'i18n.text',
          validation: _mandatoryi18nField
        }),
        defineField({
          name: 'text2',
          title: 'Texto 2',
          type: 'i18n.text',
          validation: _mandatoryi18nField
        })
      ],
      preview: {
        prepare() {
          return { title: 'Tile grid' }
        }
      }
    }),
    defineField({
      name: 'carouselIllustrations',
      title: 'Carousel ilustraciones',
      type: 'object',
      validation: (rule) => rule.required(),
      fields: [
        defineField({
          name: 'images',
          title: 'Imágenes',
          type: 'array',
          of: [{ type: 'image' }],
          validation: (rule) => rule.required().min(8).max(8)
        }),
        defineField({
          name: 'text_lines',
          title: 'Líneas de texto',
          type: 'object',
          validation: (rule) => rule.required(),
          fields: [
            defineField({
              name: 'line1',
              title: 'Línea 1',
              type: 'i18n.string',
              validation: _mandatoryi18nField
            }),
            defineField({
              name: 'line2',
              title: 'Línea 2',
              type: 'i18n.string',
              validation: _mandatoryi18nField
            }),
            defineField({
              name: 'line3',
              title: 'Línea 3',
              type: 'i18n.string',
              validation: _mandatoryi18nField
            })
          ]
        })
      ],
      preview: {
        prepare() {
          return { title: 'Carousel ilustraciones' }
        }
      }
    }),
    defineField({
      name: 'valuesSection',
      title: 'Sección valores',
      type: 'object',
      validation: (rule) => rule.required(),
      fields: [
        defineField({
          name: 'text',
          title: 'Texto',
          type: 'i18n.text',
          validation: _mandatoryi18nField
        }),
        defineField({
          name: 'image',
          title: 'Imagen',
          type: 'mediaAsset',
          validation: (rule) => rule.required()
        })
      ],
      preview: {
        select: {
          title: 'text.es'
        },
        prepare({ title }) {
          return { title }
        }
      }
    }),
    defineField({
      name: 'imagesGrid',
      title: 'Grid imágenes',
      type: 'object',
      validation: (rule) => rule.required(),
      fields: [
        defineField({
          name: 'image1',
          title: 'Imagen 1 (Izquierda Arriba)',
          type: 'mediaAsset',
          validation: (rule) => rule.required()
        }),
        defineField({
          name: 'image2',
          title: 'Imagen 2 (Izquierda Abajo)',
          type: 'mediaAsset',
          validation: (rule) => rule.required()
        }),
        defineField({
          name: 'image3',
          title: 'Imagen 3 (Centro)',
          type: 'mediaAsset',
          validation: (rule) => rule.required()
        }),
        defineField({
          name: 'image4',
          title: 'Imagen 4 (Derecha Arriba)',
          type: 'mediaAsset',
          validation: (rule) => rule.required()
        }),
        defineField({
          name: 'image5',
          title: 'Imagen 5 (Derecha Abajo)',
          type: 'mediaAsset',
          validation: (rule) => rule.required()
        })
      ],
      preview: {
        prepare() {
          return { title: 'Grid imágenes' }
        }
      }
    }),
    defineField({
      name: 'missionSection',
      title: 'Sección Misión',
      type: 'object',
      validation: (rule) => rule.required(),
      fields: [
        defineField({
          name: 'text',
          title: 'Texto',
          type: 'i18n.text',
          validation: _mandatoryi18nField
        })
      ]
    }),
    defineField({
      name: 'slidesSection',
      title: 'Sección slides',
      type: 'object',
      validation: (rule) => rule.required(),
      fields: [
        defineField({
          name: 'images',
          title: 'Imágenes',
          type: 'array',
          of: [{ type: 'image' }],
          validation: (rule) => rule.required().min(8).max(8)
        }),
        defineField({
          name: 'text',
          title: 'Texto',
          type: 'i18n.text',
          validation: _mandatoryi18nField
        })
      ],
      preview: {
        prepare() {
          return { title: 'Sección slides' }
        }
      }
    }),
    defineField({
      name: 'finalMessageSection',
      title: 'Sección mensaje final',
      type: 'object',
      validation: (rule) => rule.required(),
      fields: [
        defineField({
          name: 'firstMessage',
          title: 'Primer mensaje',
          type: 'object',
          validation: (rule) => rule.required(),
          fields: [
            defineField({
              name: 'image',
              title: 'Imagen',
              type: 'mediaAsset',
              validation: (rule) => rule.required()
            }),
            defineField({
              name: 'text',
              title: 'Texto',
              type: 'i18n.string',
              validation: _mandatoryi18nField
            })
          ]
        }),
        defineField({
          name: 'secondMessage',
          title: 'Segundo mensaje',
          type: 'object',
          validation: (rule) => rule.required(),
          fields: [
            defineField({
              name: 'text',
              title: 'Texto',
              type: 'i18n.string',
              validation: _mandatoryi18nField
            })
          ]
        }),
        defineField({
          name: 'thirdMessage',
          title: 'Tercer mensaje',
          type: 'object',
          validation: (rule) => rule.required(),
          fields: [
            defineField({
              name: 'text',
              title: 'Texto',
              type: 'i18n.string',
              validation: _mandatoryi18nField
            })
          ]
        })
      ],
      preview: {
        prepare() {
          return { title: 'Sección mensaje final' }
        }
      }
    })
  ]
})
