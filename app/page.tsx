export default function HomePage() {

  return (

    <div className="min-h-screen bg-[#0B1220] text-white">

      {/* HEADER */}

      <header className="border-b border-slate-800">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <h1 className="text-2xl font-bold">
            VIROXA
          </h1>

          <div className="flex gap-3">

            <a
              href="/management"
              className="
                rounded-xl
                border
                border-slate-700
                px-4
                py-2
                text-sm
              "
            >
              Management
            </a>

            <a
              href="/realtime"
              className="
                rounded-xl
                bg-blue-600
                px-4
                py-2
                text-sm
              "
            >
              Realtime
            </a>

          </div>

        </div>

      </header>

      {/* HERO */}

      <section className="mx-auto max-w-7xl px-6 py-24">

        <div className="max-w-3xl">

          <div className="mb-4 inline-flex rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm text-blue-400">

            Affiliate Tracking Platform

          </div>

          <h1 className="text-6xl font-bold leading-tight">

            Track Every Click.
            <br />
            Optimize Every Conversion.

          </h1>

          <p className="mt-6 text-lg text-slate-400">

            Modern self-hosted affiliate tracker
            built for media buyers, affiliates,
            agencies and performance marketers.

          </p>

          <div className="mt-8 flex gap-4">

            <a
              href="/management"
              className="
                rounded-xl
                bg-blue-600
                px-6
                py-3
                font-medium
              "
            >
              Open Dashboard
            </a>

            <a
              href="/realtime"
              className="
                rounded-xl
                border
                border-slate-700
                px-6
                py-3
              "
            >
              View Realtime
            </a>

          </div>

        </div>

      </section>

      {/* FEATURES */}

      <section className="mx-auto max-w-7xl px-6 pb-24">

        <div className="grid gap-6 md:grid-cols-4">

          <div className="rounded-2xl border border-slate-800 bg-[#111827] p-6">

            <h3 className="mb-3 text-lg font-semibold">
              Click Tracking
            </h3>

            <p className="text-sm text-slate-400">

              Capture every click with
              unique click IDs and
              realtime logging.

            </p>

          </div>

          <div className="rounded-2xl border border-slate-800 bg-[#111827] p-6">

            <h3 className="mb-3 text-lg font-semibold">
              Conversion Tracking
            </h3>

            <p className="text-sm text-slate-400">

              Receive postbacks and
              attribute conversions
              accurately.

            </p>

          </div>

          <div className="rounded-2xl border border-slate-800 bg-[#111827] p-6">

            <h3 className="mb-3 text-lg font-semibold">
              Realtime Analytics
            </h3>

            <p className="text-sm text-slate-400">

              Monitor clicks,
              conversions and revenue
              in realtime.

            </p>

          </div>

          <div className="rounded-2xl border border-slate-800 bg-[#111827] p-6">

            <h3 className="mb-3 text-lg font-semibold">
              Custom Tracker
            </h3>

            <p className="text-sm text-slate-400">

              Built for affiliate
              marketers who want
              full control.

            </p>

          </div>

        </div>

      </section>

      {/* FOOTER */}

      <footer className="border-t border-slate-800 py-8 text-center text-sm text-slate-500">

        © 2026 Viroxa Tracker

      </footer>

    </div>

  )

}