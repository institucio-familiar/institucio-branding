import { loadEnv } from 'vite'

// @ts-check
import { defineConfig } from 'astro/config'

import tailwindcss from '@tailwindcss/vite'

import sanity from '@sanity/astro'
import react from '@astrojs/react'

const { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET } = loadEnv(
  process.env.NODE_ENV,
  process.cwd(),
  ''
)

// TESTINGAL
// import vercel from '@astrojs/vercel'

// https://astro.build/config
export default defineConfig({
  vite: {
    optimizeDeps: {
      include: [
        'react/compiler-runtime',
        'lodash/isObject.js',
        'lodash/groupBy.js',
        'lodash/keyBy.js',
        'lodash/partition.js',
        'lodash/sortedIndex.js'
      ]
    },
    plugins: [tailwindcss()]
  },
  integrations: [
    sanity({
      projectId: PUBLIC_SANITY_PROJECT_ID,
      dataset: PUBLIC_SANITY_DATASET,
      // Set useCdn to false if you're building statically.
      useCdn: false,
      apiVersion: '2026-05-31',
      // Optional: log server-side Sanity client requests.
      // Modes: 'dev' | 'build' | 'always'
      logClientRequests: 'dev',
      // Access the Studio on your.url/admin
      studioBasePath: '/admin'
    }),
    react()
  ]
})
