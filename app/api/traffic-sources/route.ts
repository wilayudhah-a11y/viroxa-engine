import { NextResponse }
from "next/server"

import { supabase }
from "@/lib/supabase"

export async function GET() {

  const { data }
    = await supabase

      .from(
        "traffic_sources"
      )

      .select("*")

  return NextResponse.json({

    sources: data || []

  })

}