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

  return Array.from(bytes)

    .map((b) =>

      b
        .toString(16)
        .padStart(2, '0')

    )

    .join('')

}

export function decodePayload(
  payload: string
) {

  try {

    const bytes =
      new Uint8Array(

        payload.match(/.{1,2}/g)

          ?.map((hex) =>

            parseInt(hex, 16)

          ) || []

      )

    const json =
      new TextDecoder()
        .decode(bytes)

    return JSON.parse(json)

  } catch {

    return null

  }

}