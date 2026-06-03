import { NextRequest, NextResponse }
from "next/server"

import { supabase }
from "@/lib/supabase"

export async function GET(
  req: NextRequest
) {

  const period =
    req.nextUrl.searchParams.get(
      "period"
    ) || "today"

  let startDate =
    new Date()

  let endDate:
    Date | null = null

  if(period === "today"){

    startDate.setHours(
      0,0,0,0
    )

  }

  else if(
    period ===
    "yesterday"
  ){

    startDate.setDate(
      startDate.getDate() - 1
    )

    startDate.setHours(
      0,0,0,0
    )

    endDate =
      new Date(startDate)

    endDate.setDate(
      endDate.getDate() + 1
    )

  }

  else if(
    period ===
    "last7days"
  ){

    startDate.setDate(
      startDate.getDate() - 6
    )

  }

  else if(
    period ===
    "thisweek"
  ){

    startDate.setDate(
      startDate.getDate() -
      startDate.getDay()
    )

    startDate.setHours(
      0,0,0,0
    )

  }

  else if(
    period ===
    "lastweek"
  ){

    const now =
      new Date()

    const startOfThisWeek =
      new Date(now)

    startOfThisWeek.setDate(
      now.getDate() -
      now.getDay()
    )

    startOfThisWeek.setHours(
      0,0,0,0
    )

    startDate =
      new Date(
        startOfThisWeek
      )

    startDate.setDate(
      startDate.getDate() - 7
    )

    endDate =
      startOfThisWeek

  }

  let clicksQuery =
    supabase
      .from("clicks")
      .select(
        "*",
        {
          count:"exact",
          head:true
        }
      )
      .gte(
        "created_at",
        startDate.toISOString()
      )

  let conversionsQuery =
    supabase
      .from("conversions")
      .select(
        "*",
        {
          count:"exact",
          head:true
        }
      )
      .gte(
        "created_at",
        startDate.toISOString()
      )

  if(endDate){

    clicksQuery =
      clicksQuery.lt(
        "created_at",
        endDate.toISOString()
      )

    conversionsQuery =
      conversionsQuery.lt(
        "created_at",
        endDate.toISOString()
      )

  }

  const {
    count: clicks
  } = await clicksQuery

  const {
    count: conversions
  } = await conversionsQuery

  return NextResponse.json({

    success:true,

    period,

    clicks:
      clicks || 0,

    conversions:
      conversions || 0

  })

}