import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const sanityClient = createClient({
  projectId: 'pc6bcxu3',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
  // Only published documents are ever served to site visitors.
  perspective: 'published',
})

const builder = imageUrlBuilder(sanityClient)

type SanityImageSource = Parameters<typeof builder.image>[0]

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}
