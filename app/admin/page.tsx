'use client'

import {
  useEffect,
  useState,
} from 'react'

import { users } from '@/config/users'
import { domains } from '@/config/domains'

export default function AdminPage() {

  const [access, setAccess] =
    useState(false)

  const [password, setPassword] =
    useState('')

  const [userList, setUserList] =
    useState<any[]>([])

  const [newUsername,
    setNewUsername] =
    useState('')

  const [newPassword,
    setNewPassword] =
    useState('')

  // LOAD ACCESS
  useEffect(() => {

    const saved =
      localStorage.getItem(
        'viroxa_admin'
      )

    if (
      saved === 'granted'
    ) {

      setAccess(true)

    }

  }, [])

  // LOAD USERS
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
        JSON.stringify(users)
      )

    }

  }, [])

  // LOGIN
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

  // ADD USER
  function addUser() {

    if (
      !newUsername ||
      !newPassword
    ) return

    const updatedUsers = [

      ...userList,

      {
        username:
          newUsername,

        password:
          newPassword,

        offers: [],
      },

    ]

    setUserList(
      updatedUsers
    )

    localStorage.setItem(

      'viroxa_users',

      JSON.stringify(
        updatedUsers
      )

    )

    setNewUsername('')
    setNewPassword('')

  }

  // DELETE USER
  function deleteUser(
    username: string
  ) {

    if (
      !confirm(
        'Delete user?'
      )
    ) return

    const updatedUsers =

      userList.filter(
        (u) =>
          u.username !==
          username
      )

    setUserList(
      updatedUsers
    )

    localStorage.setItem(

      'viroxa_users',

      JSON.stringify(
        updatedUsers
      )

    )

  }

  // LOCK SCREEN
  if (!access) {

    return (

      <main
        className="
        min-h-screen
        bg-[#070B14]
        flex
        items-center
        justify-center
        p-6
        text-white
        "
      >

        <div
          className="
          w-full
          max-w-md
          rounded-3xl
          border
          border-white/10
          bg-white/5
          backdrop-blur-xl
          shadow-2xl
          p-8
          "
        >

          <div className="mb-8">

            <div
              className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-fuchsia-500/20
              bg-fuchsia-500/10
              px-4
              py-1
              text-sm
              text-fuchsia-300
              "
            >
              VIROXA ADMIN
            </div>

            <h1
              className="
              mt-4
              text-4xl
              font-black
              tracking-tight
              "
            >
              Secure Access
            </h1>

            <p
              className="
              mt-2
              text-white/50
              "
            >
              Enter admin password
            </p>

          </div>

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
            className="
            w-full
            rounded-2xl
            bg-black/30
            border
            border-white/10
            px-4
            py-4
            text-white
            placeholder:text-white/30
            focus:outline-none
            focus:ring-2
            focus:ring-fuchsia-500/50
            "
          />

          <button
            onClick={unlock}
            className="
            w-full
            mt-5
            rounded-2xl
            bg-gradient-to-r
            from-fuchsia-500
            via-pink-500
            to-cyan-500
            py-4
            font-semibold
            text-white
            transition-all
            duration-300
            hover:scale-[1.02]
            active:scale-[0.98]
            shadow-lg
            shadow-fuchsia-500/20
            "
          >
            Unlock Admin
          </button>

        </div>

      </main>

    )

  }

  return (

    <main
      className="
      min-h-screen
      bg-[#070B14]
      text-white
      p-6
      "
    >

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="mb-10">

          <div
            className="
            inline-flex
            items-center
            gap-2
            rounded-full
            border
            border-fuchsia-500/20
            bg-fuchsia-500/10
            px-4
            py-1
            text-sm
            text-fuchsia-300
            "
          >
            VIROXA ADMIN
          </div>

          <h1
            className="
            mt-4
            text-5xl
            font-black
            tracking-tight
            "
          >
            Admin Dashboard
          </h1>

          <p
            className="
            mt-3
            text-white/50
            "
          >
            Manage users, domains,
            and system configuration.
          </p>

        </div>

        {/* STATS */}

        <div
          className="
          grid
          grid-cols-1
          md:grid-cols-3
          gap-5
          mb-8
          "
        >

          <div
            className="
            rounded-3xl
            border
            border-white/10
            bg-white/5
            backdrop-blur-xl
            shadow-2xl
            p-6
            "
          >

            <p className="text-white/50">
              Total Users
            </p>

            <h2
              className="
              mt-3
              text-5xl
              font-black
              "
            >
              {userList.length}
            </h2>

          </div>

          <div
            className="
            rounded-3xl
            border
            border-white/10
            bg-white/5
            backdrop-blur-xl
            shadow-2xl
            p-6
            "
          >

            <p className="text-white/50">
              Total Domains
            </p>

            <h2
              className="
              mt-3
              text-5xl
              font-black
              "
            >
              {domains.length}
            </h2>

          </div>

          <div
            className="
            rounded-3xl
            border
            border-white/10
            bg-white/5
            backdrop-blur-xl
            shadow-2xl
            p-6
            "
          >

            <p className="text-white/50">
              System Status
            </p>

            <h2
              className="
              mt-3
              text-2xl
              font-black
              text-green-400
              "
            >
              ONLINE
            </h2>

          </div>

        </div>

        {/* MAIN GRID */}

        <div
          className="
          grid
          grid-cols-1
          xl:grid-cols-[1fr_420px]
          gap-6
          "
        >

          {/* USERS */}

          <div
            className="
            rounded-3xl
            border
            border-white/10
            bg-white/5
            backdrop-blur-xl
            shadow-2xl
            p-6
            "
          >

            <div
              className="
              flex
              items-center
              justify-between
              mb-6
              "
            >

              <div>

                <h2
                  className="
                  text-3xl
                  font-black
                  "
                >
                  Users
                </h2>

                <p className="text-white/40 mt-1">
                  Manage platform users
                </p>

              </div>

            </div>

            {/* ADD USER */}

            <div
              className="
              mb-8
              space-y-4
              "
            >

              <input
                placeholder="Username"
                value={newUsername}
                onChange={(e) =>
                  setNewUsername(
                    e.target.value
                  )
                }
                className="
                w-full
                rounded-2xl
                bg-black/30
                border
                border-white/10
                px-4
                py-4
                text-white
                placeholder:text-white/30
                focus:outline-none
                focus:ring-2
                focus:ring-fuchsia-500/50
                "
              />

              <input
                placeholder="Password"
                value={newPassword}
                onChange={(e) =>
                  setNewPassword(
                    e.target.value
                  )
                }
                className="
                w-full
                rounded-2xl
                bg-black/30
                border
                border-white/10
                px-4
                py-4
                text-white
                placeholder:text-white/30
                focus:outline-none
                focus:ring-2
                focus:ring-fuchsia-500/50
                "
              />

              <button
                onClick={addUser}
                className="
                w-full
                rounded-2xl
                bg-gradient-to-r
                from-fuchsia-500
                via-pink-500
                to-cyan-500
                py-4
                font-semibold
                text-white
                transition-all
                duration-300
                hover:scale-[1.02]
                active:scale-[0.98]
                shadow-lg
                shadow-fuchsia-500/20
                "
              >
                Add User
              </button>

            </div>

            {/* USER LIST */}

            <div className="space-y-4">

              {userList.map((user) => (

                <div
                  key={user.username}
                  className="
                  rounded-2xl
                  bg-black/20
                  border
                  border-white/10
                  p-5
                  hover:border-fuchsia-500/30
                  transition-all
                  "
                >

                  <div
                    className="
                    flex
                    items-center
                    justify-between
                    gap-4
                    "
                  >

                    <div>

                      <p
                        className="
                        text-lg
                        font-semibold
                        "
                      >
                        {user.username}
                      </p>

                      <p
                        className="
                        text-sm
                        text-zinc-400
                        mt-1
                        "
                      >
                        {user.offers.length} offers
                      </p>

                    </div>

                    <button
                      onClick={() =>
                        deleteUser(
                          user.username
                        )
                      }
                      className="
                      px-4
                      py-2
                      rounded-xl
                      bg-red-500/10
                      border
                      border-red-500/20
                      text-red-300
                      text-sm
                      hover:bg-red-500/20
                      transition-all
                      "
                    >
                      Delete
                    </button>

                  </div>

                </div>

              ))}

            </div>

          </div>

          {/* DOMAINS */}

          <div
            className="
            sticky
            top-6
            rounded-3xl
            border
            border-white/10
            bg-white/5
            backdrop-blur-xl
            shadow-2xl
            p-6
            h-fit
            "
          >

            <h2
              className="
              text-3xl
              font-black
              mb-6
              "
            >
              Domains
            </h2>

            <div className="space-y-4">

              {domains.map((domain) => (

                <div
                  key={domain.url}
                  className="
                  rounded-2xl
                  bg-black/20
                  border
                  border-white/10
                  p-4
                  hover:border-cyan-500/30
                  transition-all
                  "
                >

                  <p
                    className="
                    font-semibold
                    "
                  >
                    {domain.name}
                  </p>

                  <p
                    className="
                    text-sm
                    text-zinc-400
                    mt-1
                    break-all
                    "
                  >
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