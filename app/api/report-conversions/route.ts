import {
  NextRequest,
  NextResponse
}
from "next/server"

import { supabase }
from "@/lib/supabase"

function getLimit(
  request: NextRequest
) {

  const rawLimit =
    Number(
      request.nextUrl.searchParams.get(
        "limit"
      ) || 500
    )

  if (
    Number.isNaN(rawLimit) ||
    rawLimit < 1
  ) {
    return 500
  }

  return Math.min(
    rawLimit,
    1000
  )
}

export async function GET(
  request: NextRequest
) {

  const limit =
    getLimit(request)

  const {
    data: conversions,
    error,
  } = await supabase

    .from("conversions")

    .select(
      "clickid,payout,status,created_at"
    )

    .order(
      "created_at",
      {
        ascending: false
      }
    )

    .limit(
      limit
    )

  if (error) {

    return NextResponse.json({

      success: false,

      error:
        error.message,

    })

  }

  const clickIds =
    (conversions || []).map(
      (c) => c.clickid
    ).filter(Boolean)

  const {
    data: clicks
  } =
    clickIds.length > 0

      ? await supabase

        .from("clicks")

        .select(
          "clickid,campaign,country,device,ip"
        )

        .in(
          "clickid",
          clickIds
        )

      : {
          data: []
        }

  const merged =
    (conversions || []).map(
      (conversion) => {

        const click =
          clicks?.find(
            (c) =>
              c.clickid ===
              conversion.clickid
          )

        return {

          ...conversion,

          campaign:
            click?.campaign ||
            "-",

          country:
            click?.country ||
            "-",

          device:
            click?.device ||
            "-",

          ip:
            click?.ip ||
            "-",

        }

      }
    )

  return NextResponse.json({

    success: true,

    conversions:
      merged,

  })

}
