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
      slug:string
    }>
  }
) {

  const { slug } =
    await params

  const url =
    new URL(
      request.url
    )

  const clickid =
    url.searchParams.get(
      "click_id"
    )

  const payout =
    Number(
      url.searchParams.get(
        "payout"
      ) || 0
    )

const status =
  url.searchParams.get(
    "status"
  ) || "approved"

console.log(
  "POSTBACK HIT",
  {
    clickid,
    payout,
    status
  }
)

  if (!clickid) {

    return new NextResponse(
      "Missing click_id",
      {
        status:400
      }
    )

  }

  const { data: campaign }
    = await supabase

      .from("campaigns")

      .select("*")

      .eq(
        "slug",
        slug
      )

      .single()

  if (!campaign) {

    return new NextResponse(
      "Campaign Not Found",
      {
        status:404
      }
    )

  }

const { data: click } =
  await supabase

    .from("clicks")

    .select("*")

    .eq(
      "clickid",
      clickid
    )

    .single()

const { data: existing }
  = await supabase

    .from("conversions")

    .select("id")

    .eq(
      "clickid",
      clickid
    )

    .maybeSingle()

if (existing) {

  return new NextResponse(
    "OK"
  )

}

  const { error } =
    await supabase

      .from("conversions")

.insert({

  clickid,

  campaign:
    click?.campaign ||
    campaign.name,

  payout,

  status,
    

  country:
    click?.country ||
    "unknown",

  device:
    click?.device ||
    "unknown",

  ip:
    click?.ip ||
    "unknown"

})

  if (error) {

    return NextResponse.json({

      success:false,

      error:
        error.message

    })

  }

  return new NextResponse(
    "OK"
  )

}