import { defineCliConfig } from 'sanity/cli'
import { loadEnv } from 'vite'

const { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET } = loadEnv(
  process.env.NODE_ENV ?? 'development',
  process.cwd(),
  ''
)

export default defineCliConfig({
  api: {
    projectId: PUBLIC_SANITY_PROJECT_ID,
    dataset: PUBLIC_SANITY_DATASET
  },
  typegen: {
    enabled: true,
    path: './src/**/*.{ts,tsx,js,jsx,astro}',
    schema: 'schema.json',
    generates: './sanity.types.ts',
    overloadClientMethods: true
  }
})
