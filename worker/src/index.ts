import { createClient }
from "@supabase/supabase-js"

export default {

  async fetch(
    request: Request,
    env: any
  ) {

    const supabase =
      createClient(

        env.SUPABASE_URL,

        env.SUPABASE_KEY

      )

    const url =
      new URL(request.url)

    const path =
      url.pathname

    // TRACK CLICK
    if (
      path.startsWith("/go/")
    ) {

      const campaign =
        path.split("/")[2]

      const clickid =
        crypto.randomUUID()

      const ip =
        request.headers.get(
          "CF-Connecting-IP"
        ) || "unknown"

      const ua =
        request.headers.get(
          "User-Agent"
        ) || "unknown"

      const country =
        request.headers.get(
          "CF-IPCountry"
        ) || "unknown"

		let device = "Desktop"

		if (/android/i.test(ua))
		device = "Android"
		
		else if (/iphone/i.test(ua))
		device = "iPhone"
		
		else if (/ipad/i.test(ua))
		device = "iPad"
		
		const referer =
		request.headers.get(
			"Referer"
		) || ""
		
		let source = "Direct"
		
		if (
		referer.includes(
			"facebook"
		)
		)
		source = "Facebook"
		
		else if (
		referer.includes(
			"tiktok"
		)
		)
		source = "TikTok"
		
		else if (
		referer.includes(
			"google"
		)
		)
		source = "Google"

		await supabase
		.from("clicks")
		.insert({
		
			clickid,
		
			campaign,
		
			country,
		
			ip,
		
			ua,
		
			device,
		
			source,
		
		})

      const offerUrl =
        `https://google.com/?clickid=${clickid}`

      return Response.redirect(
        offerUrl,
        302
      )

    }

    // POSTBACK
    if (
      path === "/postback"
    ) {

      const clickid =
        url.searchParams.get(
          "clickid"
        )

      const payout =
        url.searchParams.get(
          "payout"
        )

      await supabase
        .from("conversions")
        .insert({

          clickid,

          payout,

          status:
            "approved",

        })

      return Response.json({

        success: true,

        conversion: true,

        clickid,

        payout,

      })

    }

    return Response.json({

      success: true,

      message:
        "Viroxa Tracker Active",

    })

  },

}

