// import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'
import type { StructureResolver } from 'sanity/structure'

import {
  mainPages,
  pageDocumentListItem,
  submenuPages
} from '@/sanity/pages-structure'
import { CopyIcon } from '@sanity/icons'
import { BsLightbulb } from 'react-icons/bs'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Contenido')
    .items([
      S.listItem()
        .title('Páginas')
        .icon(CopyIcon)
        .child(
          S.list()
            .title('Páginas')
            .items([
              ...mainPages.map((page) => pageDocumentListItem(S, page)),
              S.divider(),
              ...submenuPages.map((page) => pageDocumentListItem(S, page))
            ])
        ),
      S.divider()
      // S.listItem()
      //   .title('Test 1')
      //   .icon(BsLightbulb)
      //   .child(
      //     S.document().title('Test 1').schemaType('test-1').documentId('test-1')
      //   )
    ])
