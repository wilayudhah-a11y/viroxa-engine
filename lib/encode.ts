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

  const bytes =
    new TextEncoder()
      .encode(json)

  let binary = ''

  bytes.forEach((b) => {

    binary +=
      String.fromCharCode(b)

  })

  return btoa(binary)

    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')

}

export function decodePayload(
  slug: string
) {

  try {

    const base64 =

      slug
        .replace(/-/g, '+')
        .replace(/_/g, '/')

    const padded =

      base64 +
      '='.repeat(
        (4 - base64.length % 4) % 4
      )

    const binary =
      atob(padded)

    const bytes =
      Uint8Array.from(

        binary,
        (c) =>
          c.charCodeAt(0)

      )

    const json =
      new TextDecoder()
        .decode(bytes)

    return JSON.parse(json)

  } catch {

    return null

  }

}