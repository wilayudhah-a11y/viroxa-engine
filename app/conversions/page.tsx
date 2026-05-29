"use client"

import { useEffect, useState }
from "react"

export default function ConversionsPage() {

  const [
    conversions,
    setConversions
  ] = useState<any[]>([])

  const [loading, setLoading] =
    useState(true)

  useEffect(() => {

    async function fetchConversions() {

      const res =
        await fetch(
          "/api/conversions"
        )

      const data =
        await res.json()

      setConversions(
        data.conversions || []
      )

      setLoading(false)

    }

    fetchConversions()

  }, [])

  return (

    <div className="min-h-screen bg-[#0f172a] text-white p-10">

      <h1 className="text-3xl font-bold mb-8">

        Live Conversions

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
                  Click ID
                </th>

                <th className="text-left p-4">
                  Payout
                </th>

                <th className="text-left p-4">
                  Status
                </th>

                <th className="text-left p-4">
                  Created
                </th>

              </tr>

            </thead>

            <tbody>

              {conversions.map(
                (item, index) => (

                  <tr
                    key={index}
                    className="border-b border-white/5"
                  >

                    <td className="p-4 text-xs text-orange-400">

                      {item.clickid}

                    </td>

                    <td className="p-4 text-green-400 font-semibold">

                      ${item.payout}

                    </td>

                    <td className="p-4">

                      <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/20 text-xs">

                        {item.status}

                      </span>

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

