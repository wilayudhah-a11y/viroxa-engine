import { compressToEncodedURIComponent }
from 'lz-string'

function randomPrefix(length = 6) {
  const chars =
    'abcdefghijklmnopqrstuvwxyz0123456789'

  let result = ''

  for (let i = 0; i < length; i++) {
    result += chars.charAt(
      Math.floor(
        Math.random() * chars.length
      )
    )
  }

  return result
}

export function encodePayload(
  data: unknown
) {
  const json =
    JSON.stringify(data)

  const compressed =
    compressToEncodedURIComponent(json)
	
	const safe =
  compressed
    .replace(/\+/g, '-')
    .replace(/\//g, '_')

  const reversed =
    compressed
      .split('')
      .reverse()
      .join('')

  return `${randomPrefix()}${reversed}`
}