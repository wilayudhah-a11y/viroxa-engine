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

  return NextResponse.redirect(
    redirectUrl.toString()
  )

}