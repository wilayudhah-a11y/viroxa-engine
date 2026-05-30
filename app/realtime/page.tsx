"use client";

import { useEffect, useState }
from "react";

import RealtimeFeed
from "./components/RealtimeFeed";

export default function RealtimePage() {


const [clicks, setClicks] =
  useState<any[]>([]);

const [conversions, setConversions] =
  useState<any[]>([]);
  
  const [search, setSearch] =
  useState("")
  
const [reportSearch, setReportSearch] =
  useState("")

const [stats,setStats] =
  useState({

    clicks:0,
    conversions:0,
    revenue:0

  });

useEffect(() => {

async function loadClicks() {

  try {

    const res =
      await fetch("/api/clicks");

const data:any =
  await res.json();

setClicks(
  data.clicks || []
);

  } catch (err) {

    console.log(err);

  }

}

async function loadConversions() {

  try {

    const res =
      await fetch("/api/conversions");

const data:any =
  await res.json();

setConversions(
  data.conversions || []
);

  } catch (err) {

    console.log(err);

  }

}

  async function loadStats() {

    try {

      const res =
        await fetch("/api/stats");

      const data:any =
        await res.json();

      setStats({

        clicks:
          data.clicks || 0,

        conversions:
          data.conversions || 0,

        revenue:
          data.revenue || 0

      });

    } catch (err) {

      console.log(err);

    }

  }

  loadStats();

  loadConversions();

  loadClicks();


const interval =
  setInterval(() => {

    loadStats();
    loadConversions();
	loadClicks();

  }, 5000);

  return () =>
    clearInterval(interval);

}, []);

const [activeTab, setActiveTab] =
  useState("dashboard")

  return (

<div className="min-h-screen bg-[#0B1220] text-white">

  <div className="grid grid-cols-12">

    {/* LEFT SIDEBAR */}

    <div className="col-span-1 border-r border-slate-800 bg-[#111827] h-screen flex flex-col pt-10">

      {/* LOGO */}

      <div className="p-3 border-b border-slate-800">

        <h1 className="text-lg font-bold">
          VIROXA
        </h1>

      </div>

{/* MENU */}

<div className="flex-1 overflow-y-auto p-3 space-y-4">

<div
  onClick={() =>
    setActiveTab("dashboard")
  }
  className={`
    flex
    cursor-pointer
    items-center
    gap-2
    rounded-lg
    px-3
    py-2
    text-sm

    ${
      activeTab === "dashboard"

        ? "border border-blue-500/20 bg-blue-500/10 text-blue-400"

        : "border border-slate-800 text-slate-400"
    }
  `}
>
    <div className="h-2 w-2 rounded-full bg-blue-400" />
    Dashboard
  </div>

  <div
    onClick={() => setActiveTab("clicks")}
className={`
  cursor-pointer
  rounded-lg
  px-3
  py-2
  text-sm

  ${
    activeTab === "clicks"

      ? "border border-blue-500/20 bg-blue-500/10 text-blue-400"

      : "border border-slate-800 text-slate-400"
  }
`}
  >
    Clicks
  </div>

  <div
    onClick={() => setActiveTab("conversions")}
className={`
  cursor-pointer
  rounded-lg
  px-3
  py-2
  text-sm

  ${
    activeTab === "conversions"

      ? "border border-blue-500/20 bg-blue-500/10 text-blue-400"

      : "border border-slate-800 text-slate-400"
  }
`}
  >
    Conversions
  </div>

  <div
    onClick={() => setActiveTab("reports")}
className={`
  cursor-pointer
  rounded-lg
  px-3
  py-2
  text-sm

  ${
    activeTab === "reports"

      ? "border border-blue-500/20 bg-blue-500/10 text-blue-400"

      : "border border-slate-800 text-slate-400"
  }
`}
  >
    Reports
  </div>

</div>

      {/* LOGOUT */}

      <div className="p-3 border-t border-slate-800">

        <button className="w-full rounded-lg border border-red-500/20 bg-red-500/10 py-2 text-sm text-red-400 hover:bg-red-500/20">

          Logout

        </button>

      </div>

    </div>

        {/* MAIN CONTENT */}

<div className="col-span-9 p-6">

 {activeTab === "dashboard" && (
    <>

  {/* HEADER */}

  <div className="mb-6">

<div className="flex items-center gap-3">

  <h1 className="text-3xl font-bold">
    Realtime Analytics
  </h1>

  <div className="flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1">

    <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />

    <span className="text-xs text-green-400">
      LIVE
    </span>

  </div>

</div>

    <p className="text-sm text-slate-400 mt-1">
      Live tracker dashboard
    </p>

  </div>

  {/* TOP CARDS */}

  <div className="grid grid-cols-4 gap-3">

    <div className="rounded-xl border border-slate-800 bg-[#111827] p-4">

      <p className="text-slate-400 text-sm">
        Total Clicks
      </p>

      <h2 className="text-xl font-bold mt-2">
        {stats.clicks}
      </h2>

    </div>

    <div className="rounded-xl border border-slate-800 bg-[#111827] p-4">

      <p className="text-slate-400 text-sm">
        Conversions
      </p>

      <h2 className="text-xl font-bold mt-2">
        {stats.conversions}
      </h2>

    </div>

    <div className="rounded-xl border border-slate-800 bg-[#111827] p-4">

      <p className="text-slate-400 text-sm">
        Earnings
      </p>

      <h2 className="text-xl font-bold mt-2">
        ${stats.revenue}
      </h2>

    </div>

<div className="rounded-xl border border-slate-800 bg-[#111827] p-4">

  <p className="text-slate-400 text-sm">
    CR %
  </p>

  <h2 className="text-xl font-bold mt-2">

    {(
      (
        stats.conversions /
        Math.max(
          stats.clicks,
          1
        )
      ) * 100
    ).toFixed(2)}%

  </h2>

</div>

  </div>

  {/* CONVERSIONS TABLE */}

  <div className="mt-6 rounded-xl border border-slate-800 bg-[#111827] p-4">

    <div className="mb-4">

      <h2 className="text-lg font-semibold">
        Today's Conversions
      </h2>

      <p className="text-sm text-slate-400">
        Live conversion activity
      </p>

    </div>

    <table className="w-full text-sm">

      <thead>

        <tr className="border-b border-slate-800 text-slate-400">
		
		<th className="text-left py-3">
  Time
</th>

<th className="text-left py-3">
  Campaign
</th>

<th className="text-left py-3">
  Country
</th>

<th className="text-left py-3">
  Device
</th>

<th className="text-left py-3">
  Payout
</th>

<th className="text-left py-3">
  Status
</th>

<th className="text-left py-3">
  IP
</th>

        </tr>

      </thead>

<tbody>

  {conversions.map(
    (conversion:any,index:number) => (

      <tr
        key={index}
        className="border-b border-slate-900"
      >

        <td className="py-3">

          {new Date(
            conversion.created_at
          ).toLocaleTimeString()}

        </td>

<td>
  {conversion.campaign}
</td>

<td>
  {conversion.country}
</td>

<td>
  {conversion.device}
</td>

<td className="text-green-400">
  $
  {Number(
    conversion.payout || 0
  ).toFixed(2)}
</td>

<td>
  {conversion.status}
</td>

<td className="text-xs text-slate-500">
  {conversion.ip}
</td>

      </tr>

    )
  )}

</tbody>

    </table>

  </div>
    </>
  )}


{activeTab === "clicks" && (

  <>

    <div className="mb-6">

      <h1 className="text-3xl font-bold">
        LIVE Clicks
      </h1>
	  
<p className="text-xs text-slate-500">
  Showing latest 15 clicks
</p>

      <p className="mt-2 text-slate-400">
        Live click logs
      </p>

    </div>

    <div className="mb-4">

			<input
			type="text"
			value={search}
			onChange={(e) =>
				setSearch(e.target.value)
			}
			placeholder="Search Campaign..."
			className="
				w-full
				rounded-xl
				border
				border-slate-800
				bg-[#111827]
				px-4
				py-3
				outline-none
			"
			/>

    </div>

    <div className="overflow-x-auto rounded-xl border border-slate-800 bg-[#111827]">

      <table className="w-full text-sm">

        <thead>

          <tr className="border-b border-slate-800 text-slate-400">

			<th className="p-4 text-left">
			Time
			</th>
			
			<th className="p-4 text-left">
			Campaign
			</th>
			
			<th className="p-4 text-left">
			Country
			</th>
			
			<th className="p-4 text-left">
			Device
			</th>
			
			<th className="p-4 text-left">
			IP
			</th>

          </tr>

        </thead>

        <tbody>

{clicks
  .filter((click:any) =>
    click.campaign
      ?.toLowerCase()
      .includes(
        search.toLowerCase()
      )
  )

  .slice(0, 15)

  .map(
            (
              click:any,
              index:number
            ) => (

<tr
  key={index}
  className="border-b border-slate-900"
>

  <td className="p-4 text-slate-400">

    {new Date(
      click.created_at
    ).toLocaleTimeString()}

  </td>

  <td className="p-4 text-blue-400">
    {click.campaign}
  </td>

  <td className="p-4">
    {click.country}
  </td>

  <td className="p-4">
    {click.device || "-"}
  </td>

  <td className="p-4 text-xs text-slate-500">
    {click.ip}
  </td>

</tr>

            )
          )}

        </tbody>

      </table>

    </div>

  </>

)}

{activeTab === "conversions" && (

  <>

    <div className="mb-6">

      <h1 className="text-3xl font-bold">
        Conversions
      </h1>

      <p className="mt-2 text-slate-400">
        Conversion activity
      </p>

    </div>

    <div className="rounded-xl border border-slate-800 bg-[#111827] p-4">

      <table className="w-full text-sm">

        <thead>

          <tr className="border-b border-slate-800 text-slate-400">

            <th className="text-left py-3">
              Time
            </th>

            <th className="text-left py-3">
              Campaign
            </th>

            <th className="text-left py-3">
              Country
            </th>

            <th className="text-left py-3">
              Device
            </th>

            <th className="text-left py-3">
              Payout
            </th>

            <th className="text-left py-3">
              Status
            </th>

            <th className="text-left py-3">
              IP
            </th>

          </tr>

        </thead>

        <tbody>

          {conversions.map(
            (
              conversion:any,
              index:number
            ) => (

              <tr
                key={index}
                className="border-b border-slate-900"
              >

                <td className="py-3">

                  {new Date(
                    conversion.created_at
                  ).toLocaleTimeString()}

                </td>

                <td>
                  {conversion.campaign}
                </td>

                <td>
                  {conversion.country}
                </td>

                <td>
                  {conversion.device}
                </td>

                <td className="text-green-400">
                  $
                  {Number(
                    conversion.payout || 0
                  ).toFixed(2)}
                </td>

                <td>

                  <span className="rounded-full bg-green-500/10 px-2 py-1 text-xs text-green-400">

                    {conversion.status}

                  </span>

                </td>

                <td className="text-xs text-slate-500">
                  {conversion.ip}
                </td>

              </tr>

            )
          )}

        </tbody>

      </table>

    </div>

  </>

)}

{activeTab === "reports" && (

  <>

    <div className="mb-6">

      <h1 className="text-3xl font-bold">
        Reports
      </h1>

      <p className="mt-2 text-slate-400">
        Campaign performance report
      </p>

    </div>

    {/* SEARCH */}

    <div className="mb-4">

      <input
        type="text"
        placeholder="Search Campaign..."
        className="
          w-full
          rounded-xl
          border
          border-slate-800
          bg-[#111827]
          px-4
          py-3
          outline-none
        "
      />

    </div>

    {/* PERIOD FILTER */}

    <div className="mb-4 flex flex-wrap gap-2">

      <button className="rounded-lg border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs text-blue-400">
        Today
      </button>

      <button className="rounded-lg border border-slate-800 px-3 py-1 text-xs text-slate-400">
        Yesterday
      </button>

      <button className="rounded-lg border border-slate-800 px-3 py-1 text-xs text-slate-400">
        Last 7 Days
      </button>

      <button className="rounded-lg border border-slate-800 px-3 py-1 text-xs text-slate-400">
        This Week
      </button>

      <button className="rounded-lg border border-slate-800 px-3 py-1 text-xs text-slate-400">
        Last Week
      </button>

    </div>

    {/* REPORT TABLE */}

    <div className="overflow-x-auto rounded-xl border border-slate-800 bg-[#111827]">

      <table className="w-full text-sm">

        <thead>

          <tr className="border-b border-slate-800 text-slate-400">

            <th className="p-4 text-left">
              Campaign
            </th>

            <th className="p-4 text-left">
              Visits
            </th>

            <th className="p-4 text-left">
              Conv
            </th>

            <th className="p-4 text-left">
              CR
            </th>

            <th className="p-4 text-left">
              EPC
            </th>

            <th className="p-4 text-left">
              Revenue
            </th>

          </tr>

        </thead>

        <tbody>

          <tr className="border-b border-slate-900">

            <td className="p-4 text-blue-400">
              IMO Main
            </td>

            <td className="p-4">
              245
            </td>

            <td className="p-4">
              12
            </td>

            <td className="p-4">
              4.89%
            </td>

            <td className="p-4">
              $0.12
            </td>

            <td className="p-4 text-green-400">
              $29.00
            </td>

          </tr>

          <tr className="border-b border-slate-900">

            <td className="p-4 text-blue-400">
              COD Shoes
            </td>

            <td className="p-4">
              180
            </td>

            <td className="p-4">
              8
            </td>

            <td className="p-4">
              4.44%
            </td>

            <td className="p-4">
              $0.18
            </td>

            <td className="p-4 text-green-400">
              $32.00
            </td>

          </tr>

        </tbody>

      </table>

    </div>

  </>

)}

</div>
        {/* RIGHT SIDEBAR */}

<div className="sticky top-0 col-span-2 border-l border-slate-800 bg-[#111827] h-screen p-4 flex flex-col gap-4">

  {/* LIVE CLICKS */}

  <div className="flex-1 rounded-xl border border-slate-800 bg-[#0B1220] p-4">

    <div className="mb-4">

      <h2 className="text-lg font-semibold">
        Live Clicks
      </h2>

      <p className="text-sm text-slate-400">
        Incoming realtime traffic
      </p>

    </div>

<div className="space-y-3">

  {clicks
    .slice(0,5)
    .map((click:any,index:number) => (

      <div
        key={index}
        className="rounded-lg border border-slate-800 p-3"
      >

        <div className="flex items-center justify-between">

          <div>

            <p className="text-sm font-medium">

              {click.campaign || "-"}

            </p>

            <p className="text-xs text-slate-400">

                {click.country !== "unknown"
					? click.country
					: click.device}

            </p>

          </div>

          <span className="text-xs text-slate-500">

            {new Date(
              click.created_at
            ).toLocaleTimeString()}

          </span>

        </div>

      </div>

    ))}

</div>

  </div>

  {/* TOP COUNTRIES */}

  <div className="flex-1 rounded-xl border border-slate-800 bg-[#0B1220] p-4">

    <div className="mb-4">

      <h2 className="text-lg font-semibold">
        Top Countries
      </h2>

      <p className="text-sm text-slate-400">
        Traffic distribution
      </p>

    </div>

    <div className="space-y-3">

      <div className="flex items-center justify-between rounded-lg border border-slate-800 p-3">

        <span className="text-sm">
          Indonesia
        </span>

        <span className="text-sm text-slate-400">
          42%
        </span>

      </div>

      <div className="flex items-center justify-between rounded-lg border border-slate-800 p-3">

        <span className="text-sm">
          USA
        </span>

        <span className="text-sm text-slate-400">
          27%
        </span>

      </div>

      <div className="flex items-center justify-between rounded-lg border border-slate-800 p-3">

        <span className="text-sm">
          Brazil
        </span>

        <span className="text-sm text-slate-400">
          18%
        </span>

      </div>

    </div>

  </div>

</div>

      </div>
    </div>
  );
}