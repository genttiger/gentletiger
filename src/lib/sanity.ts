import { createClient } from '@sanity/client'

export const sanityClient = createClient({
  projectId: 'xxan1l35',
  dataset: 'production',
  apiVersion: '2025-01-01',
  useCdn: false,
})

export const client = sanityClient
