import { NextResponse }
from "next/server"

import { supabase }
from "@/lib/supabase"

export async function GET() {

  const { data } =
    await supabase

      .from("campaigns")

      .select(`
        *,
        traffic_sources(name),
        offers(name),
        networks(name)
      `)

      .order(
        "id",
        { ascending: false }
      )

  return NextResponse.json({

    campaigns:
      data || []

  })

}