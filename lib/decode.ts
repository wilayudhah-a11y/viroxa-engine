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