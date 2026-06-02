"use client";

import { useEffect, useState }
from "react";

import RealtimeFeed
from "./components/RealtimeFeed";

export default function RealtimePage() {

const [password, setPassword] = useState("")
const [authorized, setAuthorized] = useState(false)
const [showPassword, setShowPassword] = useState(false)
const [activeTab, setActiveTab] =
  useState("dashboard")

const [clicks, setClicks] =
  useState<any[]>([]);

const [conversions, setConversions] =
  useState<any[]>([]);
  
const [
  reportConversions,
  setReportConversions
] = useState<any[]>([]);
  
  const [search, setSearch] =
  useState("")

const [
  reportPeriod,
  setReportPeriod
] = useState("today")

const [reportSearch, setReportSearch] =
  useState("")

const [stats,setStats] =
  useState({

    clicks:0,
    conversions:0,
    revenue:0

  });

useEffect(() => {

  const auth =
    localStorage.getItem(
      "realtime_auth"
    )

  if (
    auth === "true"
  ) {

    setAuthorized(
      true
    )

  }

}, [])

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
  
async function loadReportConversions() {

  try {

    const res =
      await fetch(
        "/api/report-conversions"
      );

    const data:any =
      await res.json();

    setReportConversions(
      data.conversions || []
    );

  } catch (err) {

    console.log(err);

  }

}

  loadStats();

  loadConversions();

  loadClicks();
  
  loadReportConversions();


const interval =
  setInterval(() => {

    loadStats();
    loadConversions();
	loadClicks();

  }, 5000);

  return () =>
    clearInterval(interval);

}, []);



if (!authorized) {

return (
  <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0B1220]">

    <div className="absolute top-0 left-0 h-[500px] w-[500px] rounded-full bg-orange-500/10 blur-[140px]" />
    <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-purple-500/10 blur-[140px]" />

    <div className="relative z-10 w-full max-w-md px-6">

      <div className="mb-10 text-center">

        <h1 className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-6xl font-bold text-transparent">
          VIROXA
        </h1>

        <p className="mt-3 text-slate-400">
          Affiliate Tracking Platform
        </p>

      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-2xl shadow-[0_0_60px_rgba(0,0,0,0.35)]">

        <div className="mb-8 text-center">

          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 shadow-[0_0_25px_rgba(249,115,22,0.35)]">

            📡

          </div>

          <h2 className="text-2xl font-semibold text-white">
            Access Realtime
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            Access live tracker analytics
          </p>

        </div>

        <div className="relative mb-5">

          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
            className="
              w-full
              rounded-2xl
              border
              border-white/10
              bg-white/5
              px-5
              py-4
              pr-14
              text-white
              placeholder:text-slate-500
              outline-none
              transition-all
              duration-300
              focus:border-orange-500/50
              focus:bg-white/10
              focus:shadow-[0_0_25px_rgba(249,115,22,0.15)]
            "
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword(!showPassword)
            }
            className="
              absolute
              right-4
              top-1/2
              -translate-y-1/2
              text-slate-400
              hover:text-orange-400
              transition-colors
            "
          >
            {showPassword ? "🙈" : "👁"}
          </button>

        </div>

        <button
 onClick={() => {

  if (
    password ===
    "Bhuijn900@"
  ) {

    localStorage.setItem(
      "realtime_auth",
      "true"
    )

    setAuthorized(
      true
    )

    return

  }

  alert(
    "Wrong Password"
  )

}}
          className="
            w-full
            rounded-2xl
            bg-gradient-to-r
            from-orange-500
            to-orange-600
            py-4
            font-semibold
            text-white
            transition-all
            duration-300
            hover:scale-[1.02]
            hover:from-orange-400
            hover:to-orange-500
            shadow-[0_0_30px_rgba(249,115,22,0.35)]
            hover:shadow-[0_0_50px_rgba(249,115,22,0.55)]
            active:scale-[0.98]
          "
        >
          Access Management
        </button>

      </div>

      <p className="mt-8 text-center text-xs text-slate-500">
        VIROXA Tracker © 2026
      </p>

    </div>

  </div>
)

}

function getWIBDate(
  date:string
){

  const d =
    new Date(
      date.replace(
        " ",
        "T"
      )
    )

  d.setHours(
    d.getHours() + 7
  )

  return d
    .toISOString()
    .split("T")[0]

}

const today =
  new Date()
    .toISOString()
    .split("T")[0]

const yesterday =
  new Date()

yesterday.setDate(
  yesterday.getDate() - 1
)

const yesterdayStr =
  yesterday
    .toISOString()
    .split("T")[0]

const countryStats =
  Object.entries(

    clicks

      .filter(
        (click:any) =>
          getWIBDate(
            click.created_at
          ) === today
      )

      .reduce(

        (
          acc:any,
          click:any
        ) => {

          const country =
            click.country ||
            "Unknown"

          acc[country] =
            (acc[country] || 0) + 1

          return acc

        },

        {}

      )

  )

  .sort(
    (a:any,b:any) =>
      b[1] - a[1]
  )

  .slice(0,5)
  
function formatGMT(date:string){

  return date.substring(
    11,
    19
  )

}

function formatWIB(date:string){

  const d = new Date(
    date.replace(" ","T")
  )

  d.setHours(
    d.getHours() + 7
  )

  return d.toLocaleTimeString(
    "id-ID",
    {
      hour12:false
    }
  )

}


const filteredClicks =
  clicks.filter(
    (click:any) => {

      const clickDate =
        getWIBDate(
          click.created_at
        )
		
      if(
        reportPeriod ===
        "today"
      ){

        return (
          clickDate ===
          today
        )

      }

      if(
        reportPeriod ===
        "yesterday"
      ){

        return (
          clickDate ===
          yesterdayStr
        )

      }
      return true

    }
  )

const filteredConversions =
  reportConversions.filter(
    (conversion:any) => {

      const conversionDate =
        getWIBDate(
          conversion.created_at
        )

      if(
        reportPeriod ===
        "today"
      ){

        return (
          conversionDate ===
          today
        )

      }

      if(
        reportPeriod ===
        "yesterday"
      ){

        return (
          conversionDate ===
          yesterdayStr
        )

      }

      return true

    }
  )


console.log(
  "PERIOD:",
  reportPeriod
)

console.log(
  "CLICKS:",
  filteredClicks.length
)

console.log(
  "CONV:",
  filteredConversions.length
)

const campaignReports:any[] =
  Object.values(

const campaignReports:any[]  =
  Object.values(

    filteredClicks.reduce(
      (
        acc:any,
        click:any
      ) => {

        const campaign =
          click.campaign ||
          "Unknown"

        if(
          !acc[campaign]
        ){

          acc[campaign] = {

            campaign,

            visits:0,

            conversions:0,

            revenue:0

          }

        }

        acc[campaign]
          .visits++

        return acc

      },

      {}

    )

  )
  
filteredConversions.forEach(
  (conversion:any) => {

    const campaign =
      conversion.campaign ||
      "Unknown"

    const report:any =
      campaignReports.find(
        (item:any) =>
          item.campaign ===
          campaign
      )

    if(report){

      report.conversions++

      report.revenue +=
        Number(
          conversion.payout || 0
        )

    }

  }
)

campaignReports.forEach(
  (report:any) => {

    report.cr =
      report.visits > 0

        ? (
            report.conversions /
            report.visits
          ) * 100

        : 0

    report.epc =
      report.visits > 0

        ? (
            report.revenue /
            report.visits
          )

        : 0

  }
)


  return (

<div className="min-h-screen bg-[#0B1220] text-white">

  <div className="grid grid-cols-12">

    {/* LEFT SIDEBAR */}

    <div className="col-span-2 border-r border-slate-800 bg-[#111827] h-screen flex flex-col pt-10">

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

<button

  onClick={() => {

    localStorage.removeItem(
      "realtime_auth"
    )

    setAuthorized(
      false
    )

    setPassword("")

  }}

  className="
    w-full
    rounded-lg
    border
    border-red-500/20
    bg-red-500/10
    py-2
    text-sm
    text-red-400
    hover:bg-red-500/20
  "

>

  Logout

</button>

      </div>

    </div>

        {/* MAIN CONTENT */}

<div className="col-span-8 p-6">

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
        Showing latest 15 conversions
      </p>

    </div>

    <table className="w-full text-sm">

      <thead>

        <tr className="border-b border-slate-800 text-slate-400">
		
<th className="p-4 text-left">
  GMT
</th>

<th className="p-4 text-left">
  WIB
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

{conversions

      
  .slice(0, 15)

  .map(
    (
      conversion:any,
      index:number
    ) => (

      <tr
        key={index}
        className="border-b border-slate-900"
      >
	  
<td className="p-4 text-slate-400">
  {formatGMT(
    conversion.created_at
  )}
</td>

<td className="p-4 text-slate-400">
  {formatWIB(
    conversion.created_at
  )}
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
  GMT
</th>

<th className="p-4 text-left">
  WIB
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
			Source
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
  {formatGMT(
    click.created_at
  )}
</td>

<td className="p-4 text-slate-400">
  {formatWIB(
    click.created_at
  )}
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

<td className="p-4">

  {click.source || "-"}

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
        Showing latest 15 conversions
      </p>

    </div>

    <div className="rounded-xl border border-slate-800 bg-[#111827] p-4">

      <table className="w-full text-sm">

        <thead>

          <tr className="border-b border-slate-800 text-slate-400">

<th className="p-4 text-left">
  GMT
</th>

<th className="p-4 text-left">
  WIB
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

<td className="p-4 text-slate-400">
  {formatGMT(
    conversion.created_at
  )}
</td>

<td className="p-4 text-slate-400">
  {formatWIB(
    conversion.created_at
  )}
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
  value={reportSearch}
  onChange={(e) =>
    setReportSearch(
      e.target.value
    )
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

    {/* PERIOD FILTER */}

    <div className="mb-4 flex flex-wrap gap-2">

<button

  onClick={() =>
    setReportPeriod(
      "today"
    )
  }

  className={`
    rounded-lg
    px-3
    py-1
    text-xs

    ${
      reportPeriod ===
      "today"

      ? "border border-blue-500/20 bg-blue-500/10 text-blue-400"

      : "border border-slate-800 text-slate-400"
    }
  `}

>

  Today

</button>

<button

  onClick={() =>
    setReportPeriod(
      "yesterday"
    )
  }

  className={`
    rounded-lg
    px-3
    py-1
    text-xs

    ${
      reportPeriod ===
      "yesterday"

      ? "border border-blue-500/20 bg-blue-500/10 text-blue-400"

      : "border border-slate-800 text-slate-400"
    }
  `}

>

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
	
	<div className="mb-4 grid grid-cols-4 gap-3">

  <div className="rounded-lg border border-slate-800 p-3">

    <p className="text-xs text-slate-400">
      Campaigns
    </p>

    <p className="mt-1 font-bold">
      {campaignReports.length}
    </p>

  </div>

<div className="rounded-lg border border-slate-800 p-3">

  <p className="text-xs text-slate-400">
    Visits
  </p>

<p className="mt-1 font-bold">

  {
    campaignReports.reduce(
      (
        total:number,
        report:any
      ) =>

        total +
        Number(
          report.visits || 0
        ),

      0
    )
  }

</p>

</div>

  <div className="rounded-lg border border-slate-800 p-3">

    <p className="text-xs text-slate-400">
      Conv
    </p>

    <p className="mt-1 font-bold">

      {
        campaignReports.reduce(
          (
            total:any,
            report:any
          ) =>

            total +
            report.conversions,

          0
        )
      }

    </p>

  </div>

  <div className="rounded-lg border border-slate-800 p-3">

    <p className="text-xs text-slate-400">
      Revenue
    </p>

    <p className="mt-1 font-bold text-green-400">

      $

      {
        campaignReports
          .reduce(
            (
              total:any,
              report:any
            ) =>

              total +
              report.revenue,

            0
          )
          .toFixed(2)
      }

    </p>

  </div>

</div>

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

{campaignReports

  .filter(
    (report:any) =>

      report.campaign
        ?.toLowerCase()
        .includes(
          reportSearch
            .toLowerCase()
        )
  )

  .sort(
    (a:any,b:any) =>
      b.revenue - a.revenue
  )

  .map(
  (
    report:any,
    index:number
  ) => (

<tr
  key={index}
  className="
    border-b
    border-slate-900
  "
>

<td className="p-4 text-blue-400">

  {report.campaign}

</td>

<td className="p-4">

  {report.visits}

</td>

<td className="p-4">

  {report.conversions}

</td>

<td className="p-4">

  {report.cr.toFixed(2)}%

</td>

<td className="p-4">

  $
  {report.epc.toFixed(3)}

</td>

<td className="p-4 text-green-400">

  $
  {report.revenue.toFixed(2)}

</td>

</tr>

  )
)}

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

  {click.country}

  {" • "}

  {click.device}

</p>

          </div>

          <span className="text-xs text-slate-500">

{formatWIB(
  click.created_at
)}

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

<div className="space-y-2">

  {countryStats.map(
    ([country,count]:any) => (

      <div

        key={country}

        className="
          flex
          items-center
          justify-between
          rounded-lg
          border
          border-slate-800
          p-3
        "

      >

        <span>

          {country}

        </span>

        <span className="text-slate-400">

          {count}

        </span>

      </div>

    )
  )}

</div>

  </div>

</div>

      </div>
    </div>
  );
}