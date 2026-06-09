import { defineQuery } from 'groq'

const mediaAssetProjection = /* groq */ `{
  mediaType,
  image,
  video {
    asset->{
      playbackId
    }
  }
}`

const heroProjection = /* groq */ `{
  hero {
    media ${mediaAssetProjection}
  }
}`

export const HOME_PAGE_QUERY = defineQuery(/* groq */ `
  *[_type == "home_page" && _id == "home_page"][0]{
    hero {
      media ${mediaAssetProjection}
    },
    textSlides {
      textSlide1,
      textSlide2
    },
    imageZoom ${mediaAssetProjection},
    imagesGrid {
      image1 ${mediaAssetProjection},
      image2 ${mediaAssetProjection},
      image3 ${mediaAssetProjection},
      image4 ${mediaAssetProjection}
    },
    imageEye ${mediaAssetProjection},
    bookText,
    words {
      word1,
      word2,
      word3
    }
  }
`)

export const NUESTRA_MARCA_PAGE_QUERY = defineQuery(/* groq */ `
  *[_type == "nuestra_marca_page" && _id == "nuestra_marca_page"][0]${heroProjection}
`)

export const ASI_HABLAMOS_PAGE_QUERY = defineQuery(/* groq */ `
  *[_type == "asi_hablamos_page" && _id == "asi_hablamos_page"][0]${heroProjection}
`)

export const ASI_NOS_VEMOS_PAGE_QUERY = defineQuery(/* groq */ `
  *[_type == "asi_nos_vemos_page" && _id == "asi_nos_vemos_page"][0]${heroProjection}
`)

export const RECURSOS_PAGE_QUERY = defineQuery(/* groq */ `
  *[_type == "recursos_page" && _id == "recursos_page"][0]${heroProjection}
`)

export const TRADEMARKS_PAGE_QUERY = defineQuery(/* groq */ `
  *[_type == "trademarks_page" && _id == "trademarks_page"][0]${heroProjection}
`)

export const BRAND_COLORS_PAGE_QUERY = defineQuery(/* groq */ `
  *[_type == "brand_colors_page" && _id == "brand_colors_page"][0]${heroProjection}
`)

export const PATRONES_PAGE_QUERY = defineQuery(/* groq */ `
  *[_type == "patrones_page" && _id == "patrones_page"][0]${heroProjection}
`)

export const ICONOGRAFIA_PAGE_QUERY = defineQuery(/* groq */ `
  *[_type == "iconografia_page" && _id == "iconografia_page"][0]${heroProjection}
`)

export const ILUSTRACION_PAGE_QUERY = defineQuery(/* groq */ `
  *[_type == "ilustracion_page" && _id == "ilustracion_page"][0]${heroProjection}
`)

export const TIPOGRAFIA_PAGE_QUERY = defineQuery(/* groq */ `
  *[_type == "tipografia_page" && _id == "tipografia_page"][0]${heroProjection}
`)

export const LAYOUT_PAGE_QUERY = defineQuery(/* groq */ `
  *[_type == "layout_page" && _id == "layout_page"][0]${heroProjection}
`)

export const FOTOGRAFIA_PAGE_QUERY = defineQuery(/* groq */ `
  *[_type == "fotografia_page" && _id == "fotografia_page"][0]${heroProjection}
`)

export const MOTION_PAGE_QUERY = defineQuery(/* groq */ `
  *[_type == "motion_page" && _id == "motion_page"][0]${heroProjection}
`)

const blockProjection = /* groq */ `[]{
  _key,
  _type,
  _type == "block_1" => {
    media1 ${mediaAssetProjection}
  },
  _type == "block_2" => {
    media1 ${mediaAssetProjection},
    media2 ${mediaAssetProjection}
  }
}`

export const TEST_1_QUERY = defineQuery(/* groq */ `
  *[_type == "test-1" && _id == "test-1"][0]{
    title,
    heroMedia ${mediaAssetProjection},
    blocks ${blockProjection}
  }
`)
