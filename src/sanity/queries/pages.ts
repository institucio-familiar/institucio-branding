import { defineQuery } from 'groq'

const muxVideoProjection = /* groq */ `{
  asset->{
    playbackId
  }
}`

const mediaAssetProjection = /* groq */ `{
  mediaType,
  image,
  video ${muxVideoProjection}
}`

const heroProjection = /* groq */ `{
  media ${mediaAssetProjection}
}`

const atom1Projection = /* groq */ `{
  title,
  description,
  media1 ${mediaAssetProjection}
}`

const atom2Projection = /* groq */ `{
  title,
  description,
  medias[] ${mediaAssetProjection}
}`

const atom1ArrayProjection = /* groq */ `[]${atom1Projection}`

const atom2ArrayProjection = /* groq */ `[]${atom2Projection}`

export const atomArrayProjection = /* groq */ `[]{
  _type,
  _type == "atom_1" => ${atom1Projection},
  _type == "atom_2" => ${atom2Projection}
}`

const badUsesProjection = /* groq */ `{
  title,
  description,
  blocks[]{
    media ${mediaAssetProjection},
    description
  }
}`

const mediaDescriptionBlockProjection = /* groq */ `[]{
  description,
  media ${mediaAssetProjection}
}`

export const blockProjection = /* groq */ `[]{
  _type,
  _type == "block_1" => {
    media1 ${mediaAssetProjection}
  },
  _type == "block_2" => {
    media1 ${mediaAssetProjection},
    media2 ${mediaAssetProjection}
  }
}`

const motionSectionProjection = /* groq */ `{
  title,
  description,
  blocks ${mediaDescriptionBlockProjection}
}`

const sectionWithAtom1BlocksProjection = /* groq */ `{
  title,
  description,
  blocks ${atom1ArrayProjection}
}`

const sectionWithAtom2BlocksProjection = /* groq */ `{
  title,
  description,
  blocks ${atom2ArrayProjection}
}`

const trademarkSectionProjection = /* groq */ `{
  title,
  description,
  media ${mediaAssetProjection},
  blocks ${atomArrayProjection}
}`

export const HOME_PAGE_QUERY = defineQuery(/* groq */ `
  *[_type == "home_page" && _id == "home_page"][0]{
    hero ${heroProjection},
    textSlides {
      textSlide1,
      textSlide2
    },
    videoLogos {
      asset->{
        url
      }
    },
    tileGrid {
      image1 ${mediaAssetProjection},
      image2 ${mediaAssetProjection},
      text1,
      text2
    },
    carouselIllustrations {
      images,
      video {
        asset->{
          url
        }
      },
      text_lines {
        line1,
        line2,
        line3
      }
    },
    valuesSection {
      text,
      image ${mediaAssetProjection}
    },
    imagesGrid {
      image1 ${mediaAssetProjection},
      image2 ${mediaAssetProjection},
      image3 ${mediaAssetProjection},
      image4 ${mediaAssetProjection},
      image5 ${mediaAssetProjection}
    },
    missionSection {
      text
    },
    slidesSection {
      images,
      text
    },
    finalMessageSection {
      firstMessage {
        image ${mediaAssetProjection},
        text
      },
      secondMessage {
        text
      },
      thirdMessage {
        text
      }
    }
  }
`)

export const NUESTRA_MARCA_PAGE_QUERY = defineQuery(/* groq */ `
  *[_type == "nuestra_marca_page" && _id == "nuestra_marca_page"][0]{
    hero ${heroProjection},
    intro {
      title,
      description,
      media ${mediaAssetProjection}
    },
    section1 {
      title,
      questions[]{
        question,
        answer
      }
    },
    section2[]{
      title,
      description,
      media ${mediaAssetProjection}
    },
    section3 {
      typography ${atom1Projection},
      color ${atom1Projection},
      voz ${atom1Projection}
    }
  }
`)

export const ASI_HABLAMOS_PAGE_QUERY = defineQuery(/* groq */ `
  *[_type == "asi_hablamos_page" && _id == "asi_hablamos_page"][0]{
    hero ${heroProjection},
    intro {
      title,
      description,
      medias[] ${mediaAssetProjection}
    },
    section1 ${sectionWithAtom1BlocksProjection},
    section2 {
      blocks ${atom1ArrayProjection}
    },
    section3[]{
      correct,
      incorrect
    },
    section4[]{
      correct,
      incorrect
    }
  }
`)

export const ASI_NOS_VEMOS_PAGE_QUERY = defineQuery(/* groq */ `
  *[_type == "asi_nos_vemos_page" && _id == "asi_nos_vemos_page"][0]{
    hero ${heroProjection},
    intro {
      title,
      description
    },
    sections {
      asiNosVemos ${blockProjection},
      color ${blockProjection},
      tipografia ${blockProjection},
      patrones ${blockProjection},
      layout ${blockProjection},
      ilustracion ${blockProjection},
      iconografia ${blockProjection},
      fotografia ${blockProjection},
      motion ${blockProjection}
    }
  }
`)

export const RECURSOS_PAGE_QUERY = defineQuery(/* groq */ `
  *[_type == "recursos_page" && _id == "recursos_page"][0]{
    hero ${heroProjection},
    intro {
      title,
      description
    },
    section1[]{
      title,
      description,
      url,
      media ${mediaAssetProjection}
    }
  }
`)

export const TRADEMARKS_PAGE_QUERY = defineQuery(/* groq */ `
  *[_type == "trademarks_page" && _id == "trademarks_page"][0]{
    hero ${heroProjection},
    intro {
      title,
      description,
      blocks ${atom1ArrayProjection}
    },
    section1 ${trademarkSectionProjection},
    section2 ${trademarkSectionProjection},
    section3 ${trademarkSectionProjection},
    section4 ${trademarkSectionProjection},
    section5 ${trademarkSectionProjection},
    section6 ${badUsesProjection}
  }
`)

export const BRAND_COLORS_PAGE_QUERY = defineQuery(/* groq */ `
  *[_type == "brand_colors_page" && _id == "brand_colors_page"][0]{
    hero ${heroProjection},
    intro {
      title,
      description
    },
    section1 ${atom2Projection},
    section2 ${atom2Projection},
    section3 {
      title,
      description,
      percentages ${atom1Projection}
    },
    section4 ${sectionWithAtom2BlocksProjection},
    section5 ${badUsesProjection}
  }
`)

export const PATRONES_PAGE_QUERY = defineQuery(/* groq */ `
  *[_type == "patrones_page" && _id == "patrones_page"][0]{
    hero ${heroProjection},
    intro {
      title,
      description,
      media ${mediaAssetProjection}
    },
    section1 ${sectionWithAtom1BlocksProjection},
    section2 ${atom2Projection},
    section3 ${sectionWithAtom2BlocksProjection},
    section4 {
      title,
      description,
      media ${mediaAssetProjection},
      blocks ${atom1ArrayProjection}
    },
    section5 {
      title,
      description
    },
    section6 ${badUsesProjection}
  }
`)

export const ICONOGRAFIA_PAGE_QUERY = defineQuery(/* groq */ `
  *[_type == "iconografia_page" && _id == "iconografia_page"][0]{
    hero ${heroProjection},
    intro {
      title,
      description,
      media ${mediaAssetProjection}
    },
    section1 ${atom1Projection},
    section2 ${sectionWithAtom1BlocksProjection},
    section3 ${badUsesProjection}
  }
`)

export const ILUSTRACION_PAGE_QUERY = defineQuery(/* groq */ `
  *[_type == "ilustracion_page" && _id == "ilustracion_page"][0]{
    hero ${heroProjection},
    intro {
      title,
      description,
      media ${mediaAssetProjection}
    },
    section1 {
      title,
      description
    },
    section2 ${atom1Projection},
    section3 ${atom1Projection},
    section4 ${atom1Projection},
    section5 {
      title,
      description,
      blocks ${mediaDescriptionBlockProjection}
    },
    section6 ${atom1Projection},
    section7 {
      title,
      description,
      instructions {
        title,
        description,
        prompt
      }
    },
    section8 ${badUsesProjection}
  }
`)

export const TIPOGRAFIA_PAGE_QUERY = defineQuery(/* groq */ `
  *[_type == "tipografia_page" && _id == "tipografia_page"][0]{
    hero ${heroProjection},
    intro {
      title,
      description
    },
    section1 {
      title,
      alverata {
        testText,
        downloadUrl
      },
      inter {
        testText,
        downloadUrl
      }
    },
    section2 {
      title,
      description,
      titulares {
        title,
        description
      },
      configuration {
        title,
        content ${atom2Projection}
      },
      usage ${atom2Projection}
    },
    section3 ${sectionWithAtom2BlocksProjection},
    section4 ${sectionWithAtom2BlocksProjection},
    section5 ${badUsesProjection}
  }
`)

export const LAYOUT_PAGE_QUERY = defineQuery(/* groq */ `
  *[_type == "layout_page" && _id == "layout_page"][0]{
    hero ${heroProjection},
    intro {
      title,
      description,
      overview ${atom1Projection}
    },
    section1 {
      title,
      description,
      configuration ${atom2Projection}
    },
    section2 {
      title,
      description,
      mediaAsset ${mediaAssetProjection},
      formats[]{
        title,
        description,
        image1 ${mediaAssetProjection},
        image2 ${mediaAssetProjection}
      }
    },
    section3 ${atom1Projection},
    section4 ${badUsesProjection}
  }
`)

export const FOTOGRAFIA_PAGE_QUERY = defineQuery(/* groq */ `
  *[_type == "fotografia_page" && _id == "fotografia_page"][0]{
    hero ${heroProjection},
    intro {
      title,
      description,
      media ${mediaAssetProjection}
    },
    section1 ${atom1ArrayProjection},
    section2 ${badUsesProjection}
  }
`)

export const MOTION_PAGE_QUERY = defineQuery(/* groq */ `
  *[_type == "motion_page" && _id == "motion_page"][0]{
    hero ${heroProjection},
    intro {
      title,
      description
    },
    section1 ${sectionWithAtom1BlocksProjection},
    section2 ${motionSectionProjection},
    section3 ${motionSectionProjection},
    section4 ${motionSectionProjection},
    section5 ${motionSectionProjection},
    section6 ${badUsesProjection}
  }
`)

export const TEST_1_QUERY = defineQuery(/* groq */ `
  *[_type == "test-1" && _id == "test-1"][0]{
    title,
    slug,
    description,
    heroMedia ${mediaAssetProjection},
    blocks ${blockProjection}
  }
`)
