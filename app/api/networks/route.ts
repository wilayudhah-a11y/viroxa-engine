import { NextResponse }
from "next/server"

import { supabase }
from "@/lib/supabase"

export async function GET() {

  const { data }
    = await supabase

      .from(
        "networks"
      )

      .select("*")

  return NextResponse.json({

    networks: data || []

  })

}