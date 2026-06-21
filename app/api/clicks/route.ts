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
    data,
    error
  } =
    await supabase

      .from("clicks")

      .select(
        "clickid,campaign,country,device,created_at"
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

  return NextResponse.json({

    success: true,

    clicks:
      data || [],

  })

}
