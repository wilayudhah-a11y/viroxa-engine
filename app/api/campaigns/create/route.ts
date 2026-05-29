import { NextResponse }
from "next/server"

import { supabase }
from "@/lib/supabase"

export async function POST(
  request: Request
) {

  const body:any =
    await request.json()

  const slug =
    body.campaignName
      .toLowerCase()
      .replaceAll(
        " ",
        "-"
      )

  const appUrl =
    process.env
      .NEXT_PUBLIC_APP_URL

  const trackerUrl =
    `${appUrl}/c/${slug}`

  const postbackUrl =
    `${appUrl}/api/postback/${slug}`

  const { data, error } =
    await supabase

      .from("campaigns")

      .insert({

        name:
          body.campaignName,

        slug,

        traffic_source_id:
          body.sourceId,

        offer_id:
          body.offerId,

        network_id:
          body.networkId,

        tracker_url:
          trackerUrl,

        postback_url:
          postbackUrl,

        status:
          "active"

      })

      .select()

      .single()

  if (error) {

    return NextResponse.json({

      success:false,

      error:
        error.message

    })

  }

  return NextResponse.json({

    success:true,

    campaign:data

  })

}