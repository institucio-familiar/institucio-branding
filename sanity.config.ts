// sanity.config.ts
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { test } from './sanity/schemaTypes/test'

// TESTINGAL > Expand config
export default defineConfig({
  name: 'institucio-branding',
  title: 'Institució Branding',
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET,
  plugins: [structureTool()],
  schema: {
    types: [test]
  }
})
