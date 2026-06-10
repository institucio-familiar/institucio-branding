import type { ComponentType } from 'react'
import type { StructureBuilder } from 'sanity/structure'
import {
  BsAppIndicator,
  BsBadgeTm,
  BsBrushFill,
  BsChatLeftTextFill,
  BsEyeFill,
  BsFilm,
  BsFolder2Open,
  BsGrid3X3GapFill,
  BsHouseFill,
  BsLayoutThreeColumns,
  BsPaletteFill,
  BsType
} from 'react-icons/bs'
import { RiAwardLine, RiCameraLensFill } from 'react-icons/ri'

type PageStructureItem = {
  title: string
  schemaType: string
  documentId: string
  icon: ComponentType
}

export const mainPages = [
  {
    title: 'Home',
    schemaType: 'home_page',
    documentId: 'home_page',
    icon: BsHouseFill
  },
  {
    title: 'Nuestra Marca',
    schemaType: 'nuestra_marca_page',
    documentId: 'nuestra_marca_page',
    icon: RiAwardLine
  },
  {
    title: 'Así hablamos',
    schemaType: 'asi_hablamos_page',
    documentId: 'asi_hablamos_page',
    icon: BsChatLeftTextFill
  },
  {
    title: 'Así nos vemos',
    schemaType: 'asi_nos_vemos_page',
    documentId: 'asi_nos_vemos_page',
    icon: BsEyeFill
  },
  {
    title: 'Recursos',
    schemaType: 'recursos_page',
    documentId: 'recursos_page',
    icon: BsFolder2Open
  }
] satisfies PageStructureItem[]

export const submenuPages = [
  {
    title: 'Trademarks',
    schemaType: 'trademarks_page',
    documentId: 'trademarks_page',
    icon: BsBadgeTm
  },
  {
    title: 'Brand colors',
    schemaType: 'brand_colors_page',
    documentId: 'brand_colors_page',
    icon: BsPaletteFill
  },
  {
    title: 'Tipografía',
    schemaType: 'tipografia_page',
    documentId: 'tipografia_page',
    icon: BsType
  },
  {
    title: 'Layout',
    schemaType: 'layout_page',
    documentId: 'layout_page',
    icon: BsLayoutThreeColumns
  },
  {
    title: 'Patrones',
    schemaType: 'patrones_page',
    documentId: 'patrones_page',
    icon: BsGrid3X3GapFill
  },
  {
    title: 'Iconografía',
    schemaType: 'iconografia_page',
    documentId: 'iconografia_page',
    icon: BsAppIndicator
  },
  {
    title: 'Ilustración',
    schemaType: 'ilustracion_page',
    documentId: 'ilustracion_page',
    icon: BsBrushFill
  },
  {
    title: 'Fotografía',
    schemaType: 'fotografia_page',
    documentId: 'fotografia_page',
    icon: RiCameraLensFill
  },
  {
    title: 'Motion',
    schemaType: 'motion_page',
    documentId: 'motion_page',
    icon: BsFilm
  }
] satisfies PageStructureItem[]

export function pageDocumentListItem(
  S: StructureBuilder,
  page: PageStructureItem
) {
  return S.listItem()
    .title(page.title)
    .icon(page.icon)
    .child(
      S.document()
        .title(page.title)
        .schemaType(page.schemaType)
        .documentId(page.documentId)
    )
}
