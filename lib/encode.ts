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

  return btoa(

    unescape(

      encodeURIComponent(

        JSON.stringify(data)

      )

    )

  )

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

    return JSON.parse(

      decodeURIComponent(

        escape(

          atob(padded)

        )

      )

    )

  } catch {

    return null

  }

}