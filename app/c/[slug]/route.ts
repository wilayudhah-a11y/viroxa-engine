import { NextResponse }
from "next/server"

import { supabase }
from "@/lib/supabase"

export async function GET(
  request: Request,
  {
    params
  }: {
    params: Promise<{
      slug: string
    }>
  }
) {

  const { slug } =
    await params

  const { data: campaign }
    = await supabase

      .from("campaigns")

      .select(`
        *,
        offers (
          *
        )
      `)

      .eq(
        "slug",
        slug
      )

      .single()

  if (!campaign) {

    return new NextResponse(
      "Campaign Not Found",
      {
        status: 404
      }
    )

  }

  let destinationUrl =
    campaign.offers
      ?.destination_url

  if (!destinationUrl) {

    return new NextResponse(
      "Offer Not Found",
      {
        status: 404
      }
    )

  }

  const clickId =
    crypto.randomUUID()

destinationUrl =
  destinationUrl.replaceAll(
    "{campaignName}",
    campaign.name
  )

  const redirectUrl =
    new URL(destinationUrl)

  redirectUrl.searchParams.set(
    "click_id",
    clickId
  )

await supabase

  .from("clicks")

  .insert({

    clickid:
      clickId,

    campaign:
      campaign.name,

    country:
      request.headers.get(
        "x-vercel-ip-country"
      ) || "unknown",

    ip:
      request.headers.get(
        "x-forwarded-for"
      ) || "unknown",

    ua:
      request.headers.get(
        "user-agent"
      ) || "unknown",

    device:
      request.headers.get(
        "user-agent"
      )?.includes("Mobile")

        ? "Mobile"

        : "Desktop",

    source:
      "Direct"

  })

  return NextResponse.redirect(
    redirectUrl.toString()
  )

}