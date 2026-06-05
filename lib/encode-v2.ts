import {
  compressToEncodedURIComponent,
  decompressFromEncodedURIComponent
} from "lz-string"

export function encodePayloadV2(
  data: unknown
) {
  return compressToEncodedURIComponent(
    JSON.stringify(data)
  )
}

export function decodePayloadV2(
  payload: string
) {
  try {

    const json =
      decompressFromEncodedURIComponent(
        payload
      )

    return json
      ? JSON.parse(json)
      : null

  } catch {

    return null

  }
}