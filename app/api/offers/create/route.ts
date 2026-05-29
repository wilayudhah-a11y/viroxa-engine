import { NextResponse }
from "next/server"

import { supabase }
from "@/lib/supabase"

export async function POST(
  request: Request
) {

  const body =
    await request.json()

  const { data, error } =
    await supabase

      .from("offers")

      .insert({

        name:
          body.offerName,

        destination_url:
          body.offerUrl

      })

      .select()

      .single()

  if (error) {

    return NextResponse.json({

      success:false,
      error:error.message

    })

  }

  return NextResponse.json({

    success:true,
    offer:data

  })

}