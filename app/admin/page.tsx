'use client'

import { users }
from '@/config/users'

import { domains }
from '@/config/domains'

export default function AdminPage() {

  return (

    <main className="min-h-screen bg-[#070B14] text-white p-6">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-black mb-8">

          Admin Panel

        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* USERS */}

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">

            <h2 className="text-2xl font-bold mb-5">

              Users

            </h2>

            <div className="space-y-4">

              {users.map((user) => (

                <div
                  key={user.username}
                  className="p-4 rounded-2xl bg-black/20 border border-white/10"
                >

                  <div className="flex items-center justify-between">

                    <div>

                      <p className="font-semibold">

                        {user.username}

                      </p>

                      <p className="text-sm text-zinc-400">

                        {user.offers.length} offers

                      </p>

                    </div>

                    <button
                      className="px-3 py-1 rounded-xl bg-red-500/20 border border-red-500/20 text-red-300 text-sm"
                    >

                      Delete

                    </button>

                  </div>

                </div>

              ))}

            </div>

          </div>

          {/* DOMAINS */}

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">

            <h2 className="text-2xl font-bold mb-5">

              Domains

            </h2>

            <div className="space-y-4">

              {domains.map((domain) => (

                <div
                  key={domain.url}
                  className="p-4 rounded-2xl bg-black/20 border border-white/10"
                >

                  <p className="font-semibold">

                    {domain.name}

                  </p>

                  <p className="text-sm text-zinc-400 break-all">

                    {domain.url}

                  </p>

                </div>

              ))}

            </div>

          </div>

        </div>

      </div>

    </main>

  )
}