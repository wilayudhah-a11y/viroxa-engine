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
      .select(
        `
        campaign,
        country,
        device,
        created_at
         `
      )
      .order(
        "created_at",
        {
          ascending:false
        }
      )
      .limit(20)


  if(error){

    return NextResponse.json({

      success:false,
      error:error.message

    })

  }

  return NextResponse.json({

    success:true,

    clicks:
      data || []

  })

}