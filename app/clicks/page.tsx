"use client"

import { useEffect, useState }
from "react"

export default function ClicksPage() {

  const [clicks, setClicks] =
    useState<any[]>([])

  const [loading, setLoading] =
    useState(true)

  useEffect(() => {

    async function fetchClicks() {

      const res =
        await fetch(
          "/api/clicks"
        )

      const body:any =
        await res.json()

      setClicks(
        data.clicks || []
      )

      setLoading(false)

    }

    fetchClicks()

  }, [])

  return (

    <div className="min-h-screen bg-[#0f172a] text-white p-10">

      <h1 className="text-3xl font-bold mb-8">

        Live Clicks

      </h1>

      {loading ? (

        <div>
          Loading...
        </div>

      ) : (

        <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/5">

          <table className="w-full text-sm">

            <thead className="border-b border-white/10 bg-white/5">

              <tr>

                <th className="text-left p-4">
                  Campaign
                </th>

                <th className="text-left p-4">
                  Click ID
                </th>

                <th className="text-left p-4">
                  Country
                </th>

                <th className="text-left p-4">
                  Created
                </th>

              </tr>

            </thead>

            <tbody>

              {clicks.map(
                (item, index) => (

                  <tr
                    key={index}
                    className="border-b border-white/5"
                  >

                    <td className="p-4 text-orange-400">

                      {item.campaign}

                    </td>

                    <td className="p-4 text-xs text-gray-400">

                      {item.clickid}

                    </td>

                    <td className="p-4">

                      {item.country}

                    </td>

                    <td className="p-4 text-gray-400">

                      {item.created_at}

                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>

      )}

    </div>

  )

}