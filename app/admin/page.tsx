'use client'

import {  useState,  useEffect} from 'react'

import { users } from '@/config/users'

import { domains } from '@/config/domains'

export default function AdminPage() {

const [access,
setAccess] =
  useState(false)

const [password,
setPassword] =
  useState('')

useEffect(() => {

  const saved =
    localStorage.getItem(
      'viroxa_admin'
    )

  if (saved === 'granted') {
    setAccess(true)
  }

}, [])

function unlock() {

  if (
    password ===
    'admin2026'
  ) {

    localStorage.setItem(
      'viroxa_admin',
      'granted'
    )

    setAccess(true)

  } else {

    alert(
      'Wrong password'
    )

  }

}

const [userList,
setUserList] =
  useState<any[]>([])
  
useEffect(() => {

  const saved =
    localStorage.getItem(
      'viroxa_users'
    )

  if (saved) {

    setUserList(
      JSON.parse(saved)
    )

  } else {

    setUserList(users)

    localStorage.setItem(

      'viroxa_users',

      JSON.stringify(
        users
      )

    )

  }

}, [])

const [newUsername,
setNewUsername] =
  useState('')

const [newPassword,
setNewPassword] =
  useState('')
  

if (!access) {

  return (

    <main className="min-h-screen bg-[#070B14] flex items-center justify-center p-6">

      <div className="w-full max-w-sm bg-white/5 border border-white/10 rounded-3xl p-8">

        <h1 className="text-3xl font-bold text-white mb-6">

          Admin Access

        </h1>

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          onKeyDown={(e) => {
            if (
              e.key === 'Enter'
            ) {
              unlock()
            }
          }}
          className="w-full p-4 rounded-2xl bg-black/20 border border-white/10 text-white"
        />

        <button
          onClick={unlock}
          className="w-full mt-5 py-4 rounded-2xl bg-indigo-600 text-white font-bold"
        >

          Unlock

        </button>

      </div>

    </main>

  )

}

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

<div className="mb-5 space-y-3">

  <input
    placeholder="Username"
    value={newUsername}
    onChange={(e) =>
      setNewUsername(
        e.target.value
      )
    }
    className="w-full p-3 rounded-2xl bg-black/20 border border-white/10 text-white"
  />

  <input
    placeholder="Password"
    value={newPassword}
    onChange={(e) =>
      setNewPassword(
        e.target.value
      )
    }
    className="w-full p-3 rounded-2xl bg-black/20 border border-white/10 text-white"
  />

  <button

  onClick={async () => {

    if (
      !newUsername ||
      !newPassword
    ) return

    const response =
      await fetch(

        'https://viroxa-api.wilayudhah.workers.dev/add-user',

        {

          method: 'POST',

          headers: {
            'Content-Type':
              'application/json',
          },

          body: JSON.stringify({

            username:
              newUsername,

            password:
              newPassword,

          }),

        }

      )

    const result =
      await response.json()

    if (result.success) {

      alert(
        'User added'
      )

      setNewUsername('')
      setNewPassword('')

    }

  }}

  className="w-full py-3 rounded-2xl bg-indigo-600 font-semibold"

>

  Add User

</button>

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