import { loadEnv } from 'vite'

import { defineConfig, fontProviders } from 'astro/config'

import tailwindcss from '@tailwindcss/vite'

import sanity from '@sanity/astro'
import react from '@astrojs/react'
import vercel from '@astrojs/vercel'

const { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET } = loadEnv(
  process.env.NODE_ENV,
  process.cwd(),
  ''
)

// https://astro.build/config
export default defineConfig({
  site: 'https://institucio-branding.vercel.app',
  vite: {
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
  ],
  adapter: vercel(),
  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Source Sans Pro',
      cssVariable: '--custom-font-sans',
      fallbacks: ['sans-serif'],
      options: {
        variants: [
          {
            weight: 400,
            style: 'normal',
            display: 'swap',
            src: ['./src/assets/fonts/SourceSans3-Regular.woff2']
          },
          {
            weight: 700,
            style: 'normal',
            display: 'swap',
            src: ['./src/assets/fonts/SourceSans3-Bold.woff2']
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
