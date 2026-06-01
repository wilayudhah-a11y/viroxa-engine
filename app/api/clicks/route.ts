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
  data,
  error,
  count
} =
  await supabase

    .from("clicks")

    .select("*", {
      count: "exact"
    })

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

    .range(
      0,
      5000
    )

 
console.log(
  "SUPABASE COUNT:",
  count
)

console.log(
  "SUPABASE DATA:",
  data?.length
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

  count,

  total:
    data?.length,

  clicks: data,

})

}