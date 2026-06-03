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

  let clicksDataQuery =
  supabase
    .from("clicks")
    .select(
      "campaign"
    )
    .gte(
      "created_at",
      startDate.toISOString()
    )

if(endDate){

  clicksDataQuery =
    clicksDataQuery.lt(
      "created_at",
      endDate.toISOString()
    )

}

const {
  data: clickRows
} =
  await clicksDataQuery

  const campaignMap:any = {}

;(clickRows || [])
.forEach(
  (click:any) => {

    const campaign =
      click.campaign ||
      "Unknown"

    if(
      !campaignMap[campaign]
    ){

      campaignMap[campaign] = {

        campaign,

        visits:0,

        conversions:0,

        revenue:0

      }

    }

    campaignMap[
      campaign
    ].visits++

  }
)

let conversionsDataQuery =
  supabase
    .from("conversions")
    .select(
      "campaign,payout"
    )
    .gte(
      "created_at",
      startDate.toISOString()
    )

if(endDate){

  conversionsDataQuery =
    conversionsDataQuery.lt(
      "created_at",
      endDate.toISOString()
    )

}

const {
  data: conversionRows
} =
  await conversionsDataQuery

  ;(conversionRows || [])
.forEach(
  (conversion:any) => {

    const campaign =
      conversion.campaign ||
      "Unknown"

    if(
      !campaignMap[campaign]
    ){

      campaignMap[campaign] = {

        campaign,

        visits:0,

        conversions:0,

        revenue:0

      }

    }

    campaignMap[
      campaign
    ].conversions++

    campaignMap[
      campaign
    ].revenue +=
      Number(
        conversion.payout || 0
      )

  }
)

const campaigns =
  Object.values(
    campaignMap
  ).map(
    (report:any) => ({

      ...report,

      cr:
        report.visits > 0

          ? (
              report.conversions /
              report.visits
            ) * 100

          : 0,

      rpc:
        report.visits > 0

          ? (
              report.revenue /
              report.visits
            )

          : 0

    })
  )


return NextResponse.json({

  success:true,

  period,

  clicks:
    clicks || 0,

  conversions:
    conversions || 0,

  campaigns

})
  

}

