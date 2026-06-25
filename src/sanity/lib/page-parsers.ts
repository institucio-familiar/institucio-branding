import type { Locale } from '@/i18n/config'
import type { BlockData, Media } from '@/components/ui/blocks/block-types'
import {
  toBlock,
  toMedia,
  type SanityBlockData,
  type SanityMediaAsset
} from '@/sanity/lib/utils'

export type I18nString = Partial<Record<Locale, string>> | null | undefined
export type I18nText = Partial<Record<Locale, string>> | null | undefined

export function toLocaleString(value: I18nString, locale: Locale): string {
  return value?.[locale] ?? ''
}

export function toMedias(
  medias: SanityMediaAsset[] | null | undefined
): Media[] {
  return (medias ?? [])
    .map(toMedia)
    .filter((media): media is Media => media !== null)
}

export type SanityAtom1 = {
  title?: I18nString
  description?: I18nText
  media1?: SanityMediaAsset
}

export type SanityAtom2 = {
  title?: I18nString
  description?: I18nText
  medias?: SanityMediaAsset[] | null
}

export type SanityAtomData = (SanityAtom1 | SanityAtom2) & {
  _type?: string
}

export type Atom1Data = {
  title: string
  description: string
  media: Media
}

export type Atom2Data = {
  title: string
  description: string
  medias: Media[]
}

export type AtomBlockData =
  | { type: 'atom_1'; block: Atom1Data }
  | { type: 'atom_2'; block: Atom2Data }

export function toAtom1(
  atom: SanityAtom1 | null | undefined,
  locale: Locale
): Atom1Data | null {
  const media = toMedia(atom?.media1)
  const title = atom?.title?.[locale]
  const description = atom?.description?.[locale]
  if (!media || !title || !description) return null

  return { title, description, media }
}

export function toAtom2(
  atom: SanityAtom2 | null | undefined,
  locale: Locale
): Atom2Data | null {
  const medias = toMedias(atom?.medias)
  const title = atom?.title?.[locale]
  const description = atom?.description?.[locale]
  if (!title || !description || medias.length === 0) return null

  return { title, description, medias }
}

export function toAtom1Array(
  atoms: SanityAtom1[] | null | undefined,
  locale: Locale
): Atom1Data[] {
  return (atoms ?? [])
    .map((atom) => toAtom1(atom, locale))
    .filter((atom): atom is Atom1Data => atom !== null)
}

export function toAtom2Array(
  atoms: SanityAtom2[] | null | undefined,
  locale: Locale
): Atom2Data[] {
  return (atoms ?? [])
    .map((atom) => toAtom2(atom, locale))
    .filter((atom): atom is Atom2Data => atom !== null)
}

export function toAtomBlock(
  atom: SanityAtomData,
  locale: Locale
): AtomBlockData | null {
  if (atom._type === 'atom_2') {
    const block = toAtom2(atom, locale)
    return block ? { type: 'atom_2', block } : null
  }

  const block = toAtom1(atom, locale)
  return block ? { type: 'atom_1', block } : null
}

export function toAtomBlockArray(
  atoms: SanityAtomData[] | null | undefined,
  locale: Locale
): AtomBlockData[] {
  return (atoms ?? [])
    .map((atom) => toAtomBlock(atom, locale))
    .filter((block): block is AtomBlockData => block !== null)
}

export function toBlocks(
  blocks: SanityBlockData[] | null | undefined
): BlockData[] {
  return (blocks ?? [])
    .map(toBlock)
    .filter((block): block is BlockData => block !== null)
}

export type MediaDescriptionBlock = {
  description: string
  media: Media
}

export function toMediaDescriptionBlock(
  block:
    | { description?: I18nText; media?: SanityMediaAsset }
    | null
    | undefined,
  locale: Locale
): MediaDescriptionBlock | null {
  const media = toMedia(block?.media)
  const description = block?.description?.[locale]
  if (!media || !description) return null

  return { description, media }
}

export function toMediaDescriptionBlocks(
  blocks:
    | Array<{ description?: I18nText; media?: SanityMediaAsset }>
    | null
    | undefined,
  locale: Locale
): MediaDescriptionBlock[] {
  return (blocks ?? [])
    .map((block) => toMediaDescriptionBlock(block, locale))
    .filter((block): block is MediaDescriptionBlock => block !== null)
}

export type BadUsesData = {
  title: string
  description: string
  items: Array<{ media: Media; description: string }>
}

export function toBadUses(
  badUses:
    | {
        title?: I18nString
        description?: I18nText
        blocks?: Array<{
          media?: SanityMediaAsset
          description?: I18nText
        }> | null
      }
    | null
    | undefined,
  locale: Locale
): BadUsesData {
  const items = (badUses?.blocks ?? [])
    .map((block) => {
      const media = toMedia(block.media)
      const blockDescription = block.description?.[locale]
      if (!media || !blockDescription) return null

      return { media, description: blockDescription }
    })
    .filter(
      (item): item is { media: Media; description: string } => item !== null
    )

  return {
    title: toLocaleString(badUses?.title, locale),
    description: toLocaleString(badUses?.description, locale),
    items
  }
}

export type SectionWithAtom1Blocks = {
  title: string
  description: string
  blocks: Atom1Data[]
}

export function toSectionWithAtom1Blocks(
  section:
    | {
        title?: I18nString
        description?: I18nText
        blocks?: SanityAtom1[] | null
      }
    | null
    | undefined,
  locale: Locale
): SectionWithAtom1Blocks | null {
  const title = section?.title?.[locale]
  const description = section?.description?.[locale]
  if (!title || !description) return null

  return {
    title,
    description,
    blocks: toAtom1Array(section?.blocks, locale)
  }
}

export type SectionWithAtom2Blocks = {
  title: string
  description: string
  blocks: Atom2Data[]
}

export function toSectionWithAtom2Blocks(
  section:
    | {
        title?: I18nString
        description?: I18nText
        blocks?: SanityAtom2[] | null
      }
    | null
    | undefined,
  locale: Locale
): SectionWithAtom2Blocks | null {
  const title = section?.title?.[locale]
  const description = section?.description?.[locale]
  if (!title || !description) return null

  return {
    title,
    description,
    blocks: toAtom2Array(section?.blocks, locale)
  }
}

export type TrademarkSection = {
  title: string
  description: string
  media: Media | null
  blocks: AtomBlockData[]
}

export function toTrademarkSection(
  section:
    | {
        title?: I18nString
        description?: I18nText
        media?: SanityMediaAsset
        blocks?: SanityAtomData[] | null
      }
    | null
    | undefined,
  locale: Locale
): TrademarkSection {
  return {
    title: toLocaleString(section?.title, locale),
    description: toLocaleString(section?.description, locale),
    media: toMedia(section?.media),
    blocks: toAtomBlockArray(section?.blocks, locale)
  }
}

export type MotionSection = {
  title: string
  description: string
  blocks: MediaDescriptionBlock[]
}

export function toMotionSection(
  section:
    | {
        title?: I18nString
        description?: I18nText
        blocks?: Array<{
          description?: I18nText
          media?: SanityMediaAsset
        }> | null
      }
    | null
    | undefined,
  locale: Locale
): MotionSection | null {
  const title = section?.title?.[locale]
  const description = section?.description?.[locale]
  if (!title || !description) return null

  return {
    title,
    description,
    blocks: toMediaDescriptionBlocks(section?.blocks, locale)
  }
}

export function parsePageHeader(
  data:
    | {
        hero?: { media?: SanityMediaAsset } | null
        intro?: { title?: I18nString; description?: I18nText } | null
      }
    | null
    | undefined,
  locale: Locale
) {
  return {
    heroMedia: toMedia(data?.hero?.media),
    pageTitle: toLocaleString(data?.intro?.title, locale),
    pageDescription: toLocaleString(data?.intro?.description, locale)
  }
}
