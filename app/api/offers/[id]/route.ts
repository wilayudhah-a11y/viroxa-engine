import { NextResponse }
from "next/server"

import { supabase }
from "@/lib/supabase"

export async function PUT(
  request: Request,
  {
    params
  }: {
    params: Promise<{
      id: string
    }>
  }
) {

  const { id } =
    await params

  const body =
    await request.json()

  const { data, error } =
    await supabase

      .from("offers")

      .update({

        name:
          body.name,

        destination_url:
          body.destination_url

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
    offer:data

  })

}

export async function DELETE(
  request: Request,
  {
    params
  }: {
    params: Promise<{
      id: string
    }>
  }
) {

  const { id } =
    await params

  const { error } =
    await supabase

      .from("offers")

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