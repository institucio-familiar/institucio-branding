// @ts-check
import { loadEnv } from 'vite'

import { defineConfig, fontProviders } from 'astro/config'

import tailwindcss from '@tailwindcss/vite'

import sanity from '@sanity/astro'
import react from '@astrojs/react'
import vercel from '@astrojs/vercel'

const {
  PUBLIC_SANITY_PROJECT_ID,
  PUBLIC_SANITY_DATASET,
  PUBLIC_SANITY_API_VERSION,
  SANITY_REVALIDATE_SECRET
} = loadEnv(process.env.NODE_ENV, process.cwd(), '')

// https://astro.build/config
export default defineConfig({
  site: 'https://institucio-branding.vercel.app', // TESTINGAL
  // Output server to use ISR with Sanity
  output: 'server',
  i18n: {
    locales: ['es', 'ca'],
    defaultLocale: 'es',
    fallback: {
      ca: 'es'
    },
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: true
    }
  },
  adapter: vercel({
    isr: {
      bypassToken: SANITY_REVALIDATE_SECRET,
      exclude: ['/api/revalidate', /^\/studio/]
    }
  }),
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: [
        'react/compiler-runtime',
        'sanity/structure',
        '@sanity/vision',
        'sanity-plugin-media',
        'sanity-plugin-mux-input',
        '@mux/mux-player-react/lazy',
        'lodash/isObject.js',
        'lodash/groupBy.js',
        'lodash/keyBy.js',
        'lodash/partition.js',
        'lodash/sortedIndex.js'
      ]
    }
  },
  integrations: [
    sanity({
      projectId: PUBLIC_SANITY_PROJECT_ID,
      dataset: PUBLIC_SANITY_DATASET,
      // Set useCdn to false if you're building statically.
      useCdn: false,
      apiVersion: PUBLIC_SANITY_API_VERSION,
      // Optional: log server-side Sanity client requests.
      // Modes: 'dev' | 'build' | 'always'
      logClientRequests: 'dev',
      // Access the Studio on your.url/studio
      studioBasePath: '/studio'
    }),
    react()
  ],
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Inter',
      cssVariable: '--custom-font-sans',
      weights: [400, 500, 600, 700],
      fallbacks: ['ui-sans-serif', 'system-ui', 'sans-serif']
    },
    {
      provider: fontProviders.local(),
      name: 'Alverata',
      cssVariable: '--custom-font-serif',
      fallbacks: ['serif'],
      options: {
        variants: [
          {
            weight: 300,
            style: 'normal',
            display: 'swap',
            src: ['./src/assets/fonts/AlverataLt.woff2']
          },
          {
            weight: 400,
            style: 'normal',
            display: 'swap',
            src: ['./src/assets/fonts/Alverata.woff2']
          },
          {
            weight: 500,
            style: 'normal',
            display: 'swap',
            src: ['./src/assets/fonts/AlverataMd.woff2']
          },
          {
            weight: 600,
            style: 'normal',
            display: 'swap',
            src: ['./src/assets/fonts/AlverataSb.woff2']
          },
          {
            weight: 700,
            style: 'normal',
            display: 'swap',
            src: ['./src/assets/fonts/Alverata-Bold.woff2']
          },
          {
            weight: 900,
            style: 'normal',
            display: 'swap',
            src: ['./src/assets/fonts/AlverataBl.woff2']
          }
        ]
      }
    }
  ]
  // integrations: [
  //   icon({
  //     iconDir: './src/assets/svgs'
  //   })
  // ],
  // server: {
  //   allowedHosts: SERVER_ALLOWED_HOSTS
  // },
  // devToolbar: {
  //   enabled: false
  // },
  // image: {
  //   domains: ['locomotive.ca'],
  //   remotePatterns: [{ protocol: 'https' }]
  // },
})
