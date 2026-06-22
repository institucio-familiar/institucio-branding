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
      // S.listItem()
      //   .title('Products')
      //   .icon(TiersIcon)
      //   .child(
      //     S.list()
      //       .title('Products')
      //       .items([
      //         orderableDocumentListDeskItem({
      //           type: 'camera',
      //           title: 'Cameras',
      //           icon: BsFillCameraReelsFill,
      //           S,
      //           context
      //         }),
      //         orderableDocumentListDeskItem({
      //           type: 'lenses',
      //           title: 'Lenses',
      //           icon: RiCameraLensFill,
      //           S,
      //           context
      //         }),
      //         orderableDocumentListDeskItem({
      //           type: 'accessories',
      //           title: 'Accessories',
      //           icon: AiFillTool,
      //           S,
      //           context
      //         }),
      //         orderableDocumentListDeskItem({
      //           type: 'light',
      //           title: 'Lights',
      //           icon: BsLightbulb,
      //           S,
      //           context
      //         }),
      //         orderableDocumentListDeskItem({
      //           type: 'grip',
      //           title: 'Grip',
      //           icon: GiIBeam,
      //           S,
      //           context
      //         }),
      //         orderableDocumentListDeskItem({
      //           type: 'power_and_transports',
      //           title: 'Power & Transports',
      //           icon: BsLightningChargeFill,
      //           S,
      //           context
      //         }),
      //         orderableDocumentListDeskItem({
      //           type: 'consumables',
      //           title: 'Consumables',
      //           icon: FaTape,
      //           S,
      //           context
      //         })
      //       ])
      //   ),
      // S.divider(),
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
          //   S.listItem()
          //     .title('Conditions')
          //     .icon(DocumentTextIcon)
          //     .child(
          //       S.document()
          //         .title('Conditions')
          //         .schemaType('conditions')
          //         .documentId('conditions')
          //     ),
          //   S.listItem()
          //     .title('Privacy Policy')
          //     .icon(DocumentTextIcon)
          //     .child(
          //       S.document()
          //         .title('Privacy Policy')
          //         .schemaType('privacyPolicy')
          //         .documentId('privacyPolicy')
          //     )
          // ])
        ),
      S.divider(),
      // S.listItem()
      //   .title('Settings')
      //   .icon(CogIcon)
      //   .child(
      //     S.document()
      //       .title('Settings')
      //       .schemaType('settings')
      //       .documentId('settings')
      //   ),
      // S.divider(),
      // S.listItem()
      //   .title('V2')
      //   .icon(CopyIcon)
      //   .child(
      //     S.list()
      //       .title('V2')
      //       .items([
      //         S.listItem()
      //           .title('Home V2')
      //           .icon(HomeIcon)
      //           .child(
      //             S.document()
      //               .title('Home V2')
      //               .schemaType('home_page_v2')
      //               .documentId('home_page_v2')
      //           ),
      //         S.listItem()
      //           .title('Services')
      //           .icon(DocumentTextIcon)
      //           .child(
      //             S.document()
      //               .title('Services')
      //               .schemaType('services_page')
      //               .documentId('services_page')
      //           ),
      //         S.listItem()
      //           .title('Store')
      //           .icon(BasketIcon)
      //           .child(
      //             S.document()
      //               .title('Store')
      //               .schemaType('store_page')
      //               .documentId('store_page')
      //           ),
      //         orderableDocumentListDeskItem({
      //           type: 'shoot_studio',
      //           title: 'Studios',
      //           icon: LiaWarehouseSolid,
      //           S,
      //           context
      //         }),
      //         S.listItem()
      //           .title('General Information')
      //           .icon(InfoOutlineIcon)
      //           .child(
      //             S.document()
      //               .title('General Information')
      //               .schemaType('general_information')
      //               .documentId('general_information')
      //           )
      //       ])
      //   )
      S.listItem()
        .title('Test 1')
        .icon(BsLightbulb)
        .child(
          S.document().title('Test 1').schemaType('test-1').documentId('test-1')
        )
    ])
