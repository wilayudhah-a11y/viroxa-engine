'use client'


import {
  useParams,
  useRouter,
} from 'next/navigation'

import { useState }
from 'react'

export default function LoginPage() {

  const params =
    useParams()

  const router =
    useRouter()

  const username =
    String(
      params.username || ''
    )

  const [password,
  setPassword] =
    useState('')


async function login() {

  const response =
    await fetch(

      'https://viroxa-api.wilayudhah.workers.dev/login',

      {

        method: 'POST',

        headers: {
          'Content-Type':
            'application/json',
        },

        body: JSON.stringify({

          username,
          password,

        }),

      }

    )

  const result =
    await response.json()

  if (result.success) {

    localStorage.setItem(
      'viroxa_user',
      username
    )

    localStorage.setItem(
      'viroxa_access',
      'granted'
    )

    router.push(
      '/generator'
    )

  } else {

    alert(
      'Wrong password'
    )

  }

}

  return (

    <main className="min-h-screen bg-[#070B14] flex items-center justify-center p-6">

      <div className="w-full max-w-sm bg-white/5 border border-white/10 rounded-3xl p-8">

        <h1 className="text-3xl font-bold text-white mb-6">

          {username}

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
              login()
            }
          }}
          className="w-full p-4 rounded-2xl bg-black/20 border border-white/10 text-white"
        />

        <button
          onClick={login}
          className="w-full mt-5 py-4 rounded-2xl bg-indigo-600 text-white font-bold"
        >

          Login

        </button>

      </div>

    </main>

  )

}