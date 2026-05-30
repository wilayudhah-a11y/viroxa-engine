import { NextResponse }
from "next/server"

import { supabase }
from "@/lib/supabase"

export async function DELETE(
  request: Request,
  {
    params
  }: {
    params: Promise<{
      id:string
    }>
  }
) {

  const { id } =
    await params

  const { error } =
    await supabase

      .from("networks")

      .delete()

      .eq(
        "id",
        id
      )

  if (error) {

    return NextResponse.json({

      success:false,

      error:error.message

    })

  }

  return NextResponse.json({

    success:true

  })

}

export async function PUT(
  request: Request,
  {
    params
  }: {
    params: Promise<{
      id:string
    }>
  }
) {

  const { id } =
    await params

  const body:any =
    await request.json()

  const { data, error } =
    await supabase

      .from("networks")

      .update({

        name:
          body.name

      })

      .eq(
        "id",
        id
      )

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

    network:data

  })

}