'use client'

import {  useState,  useEffect} from 'react'

export default function AdminPage() {

const [
  offerUsername,
  setOfferUsername
] = useState('')

const [
  offerName,
  setOfferName
] = useState('')

const [
  offerUrl,
  setOfferUrl
] = useState('')


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

const [
  domainName,
  setDomainName
] = useState('')

const [
  domainUrl,
  setDomainUrl
] = useState('')

const [userList,
setUserList] =
  useState<any[]>([])
  
const [domains,
setDomains] =
  useState<any[]>([])
 
const [offers,
setOffers] =
  useState<any[]>([])

async function loadOffers() {

  const response =
    await fetch(

      'https://viroxa-api.wilayudhah.workers.dev/get-offers-admin'

    )

  const data =
    await response.json()

  setOffers(data)

}

useEffect(() => {

  loadOffers()

}, [])
 
useEffect(() => {

async function loadDomains() {

  const response =
    await fetch(

      'https://viroxa-api.wilayudhah.workers.dev/get-domains'

    )

  const data =
    await response.json()

  setDomains(data)

}

  async function loadUsers() {

    const response =
      await fetch(

        'https://viroxa-api.wilayudhah.workers.dev/get-users'

      )

    const data =
      await response.json()

    setUserList(data)

  }

  loadUsers()
  loadDomains()
  loadOffers()

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
          className="w-full mt-5 py-4 rounded-2xl bg-indigo-600 hover:opacity-80 transition text-white font-bold"
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
		
<p className="text-zinc-400 mt-2">
  Viroxa Control Center
</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

          {/* USERS */}

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 h-fit">

            <h2 className="text-2xl font-bold mb-6">

              Users ({userList.length})

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
				
				 window.location.reload()
			
				}
			
			}}
			
			className="w-full py-3 rounded-2xl bg-indigo-600 hover:opacity-80 transition font-semibold"
			
			>
			
			Add User
			
			</button>
			
			</div>
			
			<div className="space-y-4">
			
			{userList.map((user) => (
			
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

  {
    offers.filter(
      (o) =>

        o.username
          ?.trim()
          .toLowerCase()

        ===

        user.username
          ?.trim()
          .toLowerCase()

    ).length
  } offers

</p>					
			
					</div>
			
					<button
			
					onClick={async () => {
			
			const response =
				await fetch(
			
				'https://viroxa-api.wilayudhah.workers.dev/delete-user',
			
				{
			
					method: 'POST',
			
					headers: {
					'Content-Type':
						'application/json',
					},
			
					body: JSON.stringify({
			
					username:
						user.username,
			
					}),
			
				}
			
				)
			
			const result =
				await response.json()
			
			if (result.success) {
			
				setUserList(
			
				userList.filter(
					(u) =>
					u.username !==
					user.username
				)
			
				)
			
			}
			
			}}

          className="px-3 py-1 rounded-xl bg-red-500/20 border border-red-500/20 text-red-300 text-sm"

        >

          Delete

        </button>

      </div>

    </div>

  ))}

</div>

</div>
   
   
   <div className="bg-white/5 border border-white/10 rounded-3xl p-6 mt-6">

  <h2 className="text-2xl font-bold mb-6">

    Offers ({offers.length})

  </h2>

  <div className="space-y-3">

    <input
      placeholder="Username"
      value={offerUsername}
      onChange={(e) =>
        setOfferUsername(
          e.target.value
        )
      }
      className="w-full p-3 rounded-2xl bg-black/20 border border-white/10 text-white"
    />

    <input
      placeholder="Offer Name"
      value={offerName}
      onChange={(e) =>
        setOfferName(
          e.target.value
        )
      }
      className="w-full p-3 rounded-2xl bg-black/20 border border-white/10 text-white"
    />

    <input
      placeholder="Offer URL"
      value={offerUrl}
      onChange={(e) =>
        setOfferUrl(
          e.target.value
        )
      }
      className="w-full p-3 rounded-2xl bg-black/20 border border-white/10 text-white"
    />

    <button

      onClick={async () => {

        const response =
          await fetch(

            'https://viroxa-api.wilayudhah.workers.dev/add-offer',

            {

              method: 'POST',

              headers: {
                'Content-Type':
                  'application/json',
              },

              body: JSON.stringify({

                username:
                  offerUsername,

                name:
                  offerName,

                url:
                  offerUrl,

              }),

            }

          )

        const result =
          await response.json()

if (result.success) {

  alert(
    'Offer added'
  )

  await loadOffers()

  setOfferUsername('')
  setOfferName('')
  setOfferUrl('')

}

      }}

      className="w-full py-3 rounded-2xl bg-indigo-600 hover:opacity-80 transition font-semibold"

    >

      Add Offer

    </button>

  </div>

<div className="space-y-4 mt-5 max-h-[320px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-white/10">

  {offers.map((offer) => (

    <div
      key={offer.id}
      className="p-4 rounded-2xl bg-black/20 border border-white/10"
    >

      <div className="flex items-center justify-between">

        <div>

          <p className="font-semibold">

            {offer.name}

          </p>

          <p className="text-sm text-zinc-400">

            {offer.username}

          </p>

          <p className="text-sm text-zinc-500 break-all">

            {offer.url}

          </p>

        </div>

        <button

          onClick={async () => {

            const response =
              await fetch(

                'https://viroxa-api.wilayudhah.workers.dev/delete-offer',

                {

                  method: 'POST',

                  headers: {
                    'Content-Type':
                      'application/json',
                  },

                  body: JSON.stringify({

                    id:
                      offer.id,

                  }),

                }

              )

            const result =
              await response.json()

            if (result.success) {

              setOffers(

                offers.filter(
                  (o) =>
                    o.id !==
                    offer.id
                )

              )

            }

          }}

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

             <h2 className="text-2xl font-bold mb-6">

              Domains ({domains.length})

            </h2>

<div className="mb-5 space-y-3">

  <input
    placeholder="Domain Name"
    value={domainName}
    onChange={(e) =>
      setDomainName(
        e.target.value
      )
    }
    className="w-full p-3 rounded-2xl bg-black/20 border border-white/10 text-white"
  />

  <input
    placeholder="https://domain.com"
    value={domainUrl}
    onChange={(e) =>
      setDomainUrl(
        e.target.value
      )
    }
    className="w-full p-3 rounded-2xl bg-black/20 border border-white/10 text-white"
  />

  <button

    onClick={async () => {

      const response =
        await fetch(

          'https://viroxa-api.wilayudhah.workers.dev/add-domain',

          {

            method: 'POST',

            headers: {
              'Content-Type':
                'application/json',
            },

            body: JSON.stringify({

              name:
                domainName,

              url:
                domainUrl,

            }),

          }

        )

      const result =
        await response.json()

      if (result.success) {

        alert(
          'Domain added'
        )

        setDomainName('')
        setDomainUrl('')

      }

    }}

    className="w-full py-3 rounded-2xl bg-indigo-600 hover:opacity-80 transition font-semibold"

  >

    Add Domain

  </button>

</div>

            <div className="space-y-4">

{domains.map((domain) => (

  <div
    key={domain.id}
    className="p-4 rounded-2xl bg-black/20 border border-white/10"
  >

    <div className="flex items-center justify-between">

      <div>

        <p className="font-semibold">

          {domain.name}

        </p>

        <p className="text-sm text-zinc-400 break-all">

          {domain.url}

        </p>

      </div>

      <button

        onClick={async () => {

          const response =
            await fetch(

              'https://viroxa-api.wilayudhah.workers.dev/delete-domain',

              {

                method: 'POST',

                headers: {
                  'Content-Type':
                    'application/json',
                },

                body: JSON.stringify({

                  id:
                    domain.id,

                }),

              }

            )

          const result =
            await response.json()

          if (result.success) {

            setDomains(

              domains.filter(
                (d) =>
                  d.id !==
                  domain.id
              )

            )

          }

        }}

        className="px-3 py-1 rounded-xl bg-white/5 hover:bg-red-500/20 transition border border-red-500/20 text-red-300 text-sm"

      >

        Delete

      </button>

    </div>

  </div>

))}

            </div>

          </div>

        </div>

      </div>

    </main>

  )
}