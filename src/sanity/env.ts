/** Shared env for Studio (Vite) and Sanity CLI (Node). */
export const projectId =
  process.env.PUBLIC_SANITY_PROJECT_ID ??
  import.meta.env.PUBLIC_SANITY_PROJECT_ID

export const dataset =
  process.env.PUBLIC_SANITY_DATASET ?? import.meta.env.PUBLIC_SANITY_DATASET

export const apiVersion =
  process.env.PUBLIC_SANITY_API_VERSION ??
  import.meta.env.PUBLIC_SANITY_API_VERSION
