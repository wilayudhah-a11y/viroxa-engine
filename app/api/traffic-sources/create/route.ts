import { NextResponse }
from "next/server"

import { supabase }
from "@/lib/supabase"

export async function POST(
  request: Request
) {

  const body:any =
    await request.json()

  const { data, error } =
    await supabase

      .from("traffic_sources")

      .insert({

        name:
          body.name

      })

      .select()

      .single()

  if (error) {

    return NextResponse.json({

      success:false,

      error:
        error.message

    })

  }

  return NextResponse.json({

    success:true,

    source:data

  })

}