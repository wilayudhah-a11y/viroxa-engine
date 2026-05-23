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

  return Array.from(json)

    .map((char) =>

      char
        .charCodeAt(0)
        .toString(16)
        .padStart(2, '0')

    )

    .join('')

}

export function decodePayload(
  payload: string
) {

  try {

    const json =

      payload.match(/.{1,2}/g)

        ?.map((hex) =>

          String.fromCharCode(
            parseInt(hex, 16)
          )

        )

        .join('')

    return JSON.parse(
      json || ''
    )

  } catch {

    return null

  }

}