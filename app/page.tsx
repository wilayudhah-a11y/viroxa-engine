"use client"

import { useEffect, useState }

from "react"

export default function Home() {

const [
  conversions,
  setConversions
] = useState<any[]>([])



  const [stats, setStats] =
    useState({

      clicks: 0,

      conversions: 0,

      revenue: 0,

      cr: 0,

    })

  useEffect(() => {

    async function fetchStats() {
	
	const conversionsRes =
  await fetch(
    "/api/conversions"
  )

const conversionsData =
  await conversionsRes.json()

setConversions(
  conversionsData
    .conversions || []
)

      const res =
        await fetch(
          "/api/stats"
        )

      const data =
        await res.json()

      setStats(data)

    }

    fetchStats()

  }, [])

  return (

    <div className="min-h-screen bg-[#0f172a] text-white p-10">

      <h1 className="text-4xl font-bold mb-10">

        Viroxa Tracker

      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">

          <p className="text-sm text-gray-400 mb-2">

            Total Clicks

          </p>

          <h2 className="text-4xl font-bold">

            {stats.clicks}

          </h2>

        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">

          <p className="text-sm text-gray-400 mb-2">

            Conversions

          </p>

          <h2 className="text-4xl font-bold">

            {stats.conversions}

          </h2>

        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">

          <p className="text-sm text-gray-400 mb-2">

            Revenue

          </p>

          <h2 className="text-4xl font-bold text-green-400">

            ${stats.revenue}

          </h2>

        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">

          <p className="text-sm text-gray-400 mb-2">

            CR

          </p>

          <h2 className="text-4xl font-bold text-orange-400">

            {stats.cr}%

          </h2>

        </div>
<div className="mt-10">

  <h2 className="text-2xl font-bold mb-6">

    Live Conversions

  </h2>

  <div className="space-y-4">

    {conversions.map(
      (item, index) => (

        <div
          key={index}
          className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center justify-between"
        >

          <div>

            <p className="text-green-400 font-semibold">

              New Conversion

            </p>

            <p className="text-sm text-gray-400">

              {item.clickid}

            </p>

          </div>

          <div className="text-right">

            <p className="text-xl font-bold text-green-400">

              ${item.payout}

            </p>

            <p className="text-xs text-gray-400">

              {item.status}

            </p>

          </div>

        </div>

      )
    )}

  </div>

</div>

      </div>

    </div>

  )

}
