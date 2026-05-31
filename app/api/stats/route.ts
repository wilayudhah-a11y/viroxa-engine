export async function GET() {

  const today =
    new Date()

  today.setHours(
    0,
    0,
    0,
    0
  )

  const {
    count: clicks
  } = await supabase

    .from("clicks")

    .select("*", {
      count: "exact",
      head: true,
    })

    .gte(
      "created_at",
      today.toISOString()
    )

  const {
    data: conversions
  } = await supabase

    .from("conversions")

    .select("*")

    .gte(
      "created_at",
      today.toISOString()
    )

  const totalConversions =
    conversions?.length || 0

  const revenue =
    conversions?.reduce(

      (acc, item) =>

        acc +
        Number(
          item.payout || 0
        ),

      0

    ) || 0

  const cr =
    clicks && clicks > 0

      ? (
          totalConversions /
          clicks
        ) * 100

      : 0

  return NextResponse.json({

    clicks:
      clicks || 0,

    conversions:
      totalConversions,

    revenue:
      revenue.toFixed(2),

    cr:
      cr.toFixed(2),

  })

}