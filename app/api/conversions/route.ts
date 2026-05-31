import { NextResponse }
from "next/server"

import { supabase }
from "@/lib/supabase"

export async function GET() {

const today =
  new Date()

today.setHours(
  0,
  0,
  0,
  0
)

const {
  data: conversions,
  error,
} = await supabase

  .from("conversions")

  .select("*")

  .gte(
    "created_at",
    today.toISOString()
  )

  .order(
    "created_at",
    {
      ascending: false
    }
  )

  if (error) {

    return NextResponse.json({

      success: false,

      error:
        error.message,

    })

  }

  const clickIds =
    conversions.map(
      (c) => c.clickid
    )

  const {
    data: clicks
  } = await supabase

    .from("clicks")

    .select("*")

    .in(
      "clickid",
      clickIds
    )

  const merged =
    conversions.map(
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