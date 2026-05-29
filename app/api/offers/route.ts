import { NextResponse }
from "next/server"

import { supabase }
from "@/lib/supabase"

export async function GET() {

  const { data }
    = await supabase

      .from(
        "offers"
      )

      .select("*")

  return NextResponse.json({

    offers: data || []

  })

}