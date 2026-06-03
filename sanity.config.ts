// sanity.config.ts
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

import { visionTool } from '@sanity/vision'

import { media } from 'sanity-plugin-media'
import { muxInput } from 'sanity-plugin-mux-input'

import { structure } from '@/sanity/structure'
import { schema } from '@/sanity/schemaTypes'
import { StudioIcon } from '@/components/icons/studio-icon'

// TESTINGAL > Expand config
export default defineConfig({
  icon: StudioIcon,
  name: 'institucio-branding',
  title: 'Institució Branding',
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET,
  schema,
  plugins: [
    structureTool({ name: 'content', title: 'Content', structure }),
    media(),
    muxInput({ mp4_support: 'standard' }),
    // Vision is a tool that lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: '2026-05-31' })
  ]
})
