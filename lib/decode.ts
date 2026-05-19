import {
  decompressFromEncodedURIComponent,
} from 'lz-string'

export function decodePayload(
  slug: string
) {
  try {
    const stripped =
      slug.slice(6)

    const reversed =
      stripped
        .split('')
        .reverse()
        .join('')
const unsafe =
  reversed
    .replace(/-/g, '+')
    .replace(/_/g, '/')
	
    const decompressed =
  decompressFromEncodedURIComponent(
    unsafe
  )

    if (!decompressed) {
      return null
    }

    return JSON.parse(decompressed)
  } catch {
    return null
  }
}