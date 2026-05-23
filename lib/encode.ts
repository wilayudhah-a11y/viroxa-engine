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

}

export function decodePayload(
  slug: string
) {

  try {

    return JSON.parse(

      decodeURIComponent(

        escape(

          atob(slug)

        )

      )

    )

  } catch {

    return null

  }

}