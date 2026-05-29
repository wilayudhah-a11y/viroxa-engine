const data = [
  {
    country:"Indonesia",
    campaign:"COD-SHOES",
    time:"2 sec ago"
  },
  {
    country:"USA",
    campaign:"Nutra-Max",
    time:"5 sec ago"
  },
  {
    country:"Brazil",
    campaign:"SkinCare",
    time:"8 sec ago"
  },
  {
    country:"Japan",
    campaign:"Crypto-Pro",
    time:"12 sec ago"
  }
];

export default function RealtimeFeed() {

  return (

    <div className="rounded-xl border border-slate-800 bg-[#111827] p-4 h-[360px]">

      <div className="mb-4">

        <h2 className="text-lg font-semibold text-white">
          Live Clicks
        </h2>

        <p className="text-sm text-slate-400">
          Incoming realtime traffic
        </p>

      </div>

      <div className="space-y-3">

        {data.map((item,index) => (

          <div
            key={index}
            className="flex items-center justify-between rounded-lg bg-[#0B1220] p-3 border border-slate-800"
          >

            <div>

              <p className="text-sm font-medium text-white">
                {item.campaign}
              </p>

              <p className="text-xs text-slate-400">
                {item.country}
              </p>

            </div>

            <span className="text-xs text-slate-500">
              {item.time}
            </span>

          </div>

        ))}

      </div>

    </div>
  );
}