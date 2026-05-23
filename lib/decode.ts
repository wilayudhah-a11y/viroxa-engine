export function decodePayload(
  slug: string
) {

  try {

    return JSON.parse(

      atob(slug)

    )

  } catch {

    return null

  }

}