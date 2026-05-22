'use client'


import {  useParams,  useRouter,} from 'next/navigation'

import {  useState,  useEffect} from 'react'

export default function LoginPage() {

const [users,
setUsers] =
  useState<any[]>([])
  
  useEffect(() => {

  const saved =
    localStorage.getItem(
      'viroxa_users'
    )

  if (saved) {

    setUsers(
      JSON.parse(saved)
    )

  }

}, [])

  const params =
    useParams()

  const router =
    useRouter()

  const username =
    params.username as string

  const user =
    users.find(
      (u) =>
        u.username === username
    )

  const [password,
  setPassword] =
    useState('')

  if (!user) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        User not found
      </main>
    )
  }

  function login() {

    if (
  password ===
  user?.password
)
	{

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