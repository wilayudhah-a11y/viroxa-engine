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

  const WIB_OFFSET_MS =
    7 * 60 * 60 * 1000

  function toWIB(
    date: Date
  ) {
    return new Date(
      date.getTime() +
        WIB_OFFSET_MS
    )
  }

  function fromWIB(
    date: Date
  ) {
    return new Date(
      date.getTime() -
        WIB_OFFSET_MS
    )
  }

  function getWIBDayStart(
    date: Date
  ) {
    const start =
      new Date(date)

    start.setHours(
      7, 0, 0, 0
    )

    if (start > date) {
      start.setDate(
        start.getDate() - 1
      )
    }

    return start
  }

  function getWIBWeekStart(
    date: Date
  ) {
    const day =
      date.getDay()

    const offset =
      day === 0
        ? 6
        : day - 1

    const weekStart =
      new Date(date)

    weekStart.setDate(
      date.getDate() -
        offset
    )

    weekStart.setHours(
      7, 0, 0, 0
    )

    if (
      day === 1 &&
      date.getHours() < 7
    ) {
      weekStart.setDate(
        weekStart.getDate() -
          7
      )
    }

    return weekStart
  }

  let startDate =
    new Date()

  let endDate:
    Date | null = null

  const wibNow =
    toWIB(startDate)

  const currentDayStart =
    getWIBDayStart(wibNow)

  if (period === "today") {
    startDate = fromWIB(
      currentDayStart
    )
  } else if (
    period ===
    "yesterday"
  ) {
    const yesterdayStart =
      new Date(
        currentDayStart
      )

    yesterdayStart.setDate(
      yesterdayStart.getDate() -
        1
    )

    startDate = fromWIB(
      yesterdayStart
    )
    endDate = fromWIB(
      currentDayStart
    )
  } else if (
    period ===
    "last7days"
  ) {
    const startOfLast7Days =
      new Date(
        currentDayStart
      )
    startOfLast7Days.setDate(
      startOfLast7Days.getDate() -
        6
    )

    startDate = fromWIB(
      startOfLast7Days
    )
  } else if (
    period ===
    "thisweek"
  ) {
    startDate = fromWIB(
      getWIBWeekStart(wibNow)
    )
  } else if (
    period ===
    "lastweek"
  ) {
    const startOfThisWeek =
      getWIBWeekStart(wibNow)

    const startOfLastWeek =
      new Date(
        startOfThisWeek
      )
    startOfLastWeek.setDate(
      startOfLastWeek.getDate() -
        7
    )

    startDate = fromWIB(
      startOfLastWeek
    )
    endDate = fromWIB(
      startOfThisWeek
    )
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

const {
  data: visitRows,
} =
  await supabase.rpc(
    "get_campaign_visits",
    {
      start_date:
        startDate.toISOString(),

      end_date:
        endDate
          ? endDate.toISOString()
          : null
    }
  )


  const campaignMap:any = {}

  
;(visitRows || [])
.forEach(
  (row:any) => {

    campaignMap[
      row.campaign
    ] = {

      campaign:
        row.campaign,

      visits:
        Number(
          row.visits || 0
        ),

      conversions:0,

      revenue:0

    }

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

const revenue =
  (conversionRows || [])
    .reduce(
      (
        total:number,
        row:any
      ) =>
        total +
        Number(
          row.payout || 0
        ),
      0
    )



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

  revenue,

  campaigns

})
  

}

