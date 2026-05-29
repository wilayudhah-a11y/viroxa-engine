import { NextResponse }
from "next/server"

import { supabase }
from "@/lib/supabase"

export async function GET() {

  const {
    count: clicks
  } = await supabase

    .from("clicks")

    .select("*", {
      count: "exact",
      head: true,
    })

  const {
    data: conversions
  } = await supabase

    .from("conversions")

    .select("*")

  const totalConversions =
    conversions?.length || 0

  const revenue =
    conversions?.reduce(

      (acc, item) =>

        acc +
        Number(
          item.payout || 0
        ),

      0

    ) || 0

  const cr =
    clicks && clicks > 0

      ? (
          totalConversions /
          clicks
        ) * 100

      : 0

  return NextResponse.json({

    clicks:
      clicks || 0,

    conversions:
      totalConversions,

    revenue:
      revenue.toFixed(2),

    cr:
      cr.toFixed(2),

  })

}

