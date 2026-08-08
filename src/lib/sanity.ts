import {createClient} from '@sanity/client'

export const sanityClient = createClient({
  projectId: 'xxan1l35',
  dataset: 'production',
  apiVersion: '2026-07-30',
  useCdn: true,
})
