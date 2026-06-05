import { NextResponse }
from "next/server"

import { supabase }
from "@/lib/supabase"

export async function GET() {

  const {
    data,
    error
  } =
    await supabase

      .from("clicks")

      .select("*")

      .order(
        "created_at",
        {
          ascending: false
        }
      )

      .range(
        0,
        10000
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