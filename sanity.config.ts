// sanity.config.ts
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

import { visionTool } from '@sanity/vision'

import { media } from 'sanity-plugin-media'
import { muxInput } from 'sanity-plugin-mux-input'

import { structure } from '@/sanity/structure'
import { schema } from '@/sanity/schemaTypes'
import { apiVersion, dataset, projectId } from '@/sanity/env'
import { StudioIcon } from '@/sanity/ui/studio-icon'

export default defineConfig({
  icon: StudioIcon,
  name: 'institucio-branding',
  title: 'Institució Branding',
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool({ name: 'content', title: 'Contenido', structure }),
    media(),
    muxInput({ mp4_support: 'standard' }),
    // Vision is a tool that lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion })
  ]
})
