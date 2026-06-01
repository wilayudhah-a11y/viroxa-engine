'use client'
import { encodePayload } from '@/lib/encode'

import type { Payload } from '@/types/payload'

import { useState, useEffect } from 'react'

import {  User,  LogOut} from 'lucide-react'

export default function GeneratorPage() {
  const [title, setTitle] = useState('')
  
  const [savedTitles] =
  useState([

	'🔴 LIVE: Exclusive Room Is Open 🔑✨',
	'🔴 LIVE: VIP Show Just Started 🥂🔞',
	'🔴 LIVE: Special Streaming Now 🎬💦',
	'🔴 LIVE: Private Session On Air 🎧🔥',
	'🔴 LIVE: Premium Content active 👑📺',
	'🔒 PRIVATE: Secret Show Is Live 📹💦',
	'🤫 SECRET: Premium Live Stream 🎥✨',
	'🪐 PRIVATE: Late Night Show 🌌🔥',
	'🔑 ACCESS: Private Room Opened 🚪💦',
	'💎 VIP ONLY: Private Streaming 📹✨',
	'📺 STREAM: Midnight Show Active ⏰💦',
	'📹 CAM: Hot Private Stream 🔴🔥',
	'🎬 SHOW: VIP Access Started 🔓💦',
	'📡 BROADCAST: Exclusive Live ⚡✨',
	'🎥 CAMERA: Private Mode On 🔴💦',
	'🔴 JOIN: Private Show Started 📹💦',
	'💦 LIVE: Come Into My Room 🚪✨',
	'🔥 HOT: Private Cam Is Live 📹🔴',
	'🔓 UNLOCKED: Premium Stream 📺✨',
	'🔴 LIVE: Catch Me Private Now 📹💦',

  ])
  
  function randomizeTitles() {

  const randomTitles =

    [...savedTitles]

      .sort(
        () =>
          0.5 - Math.random()
      )

      .slice(0, 5)

  setTitle(

    randomTitles.join('\n')

  )

}

  const [description, setDescription] =
    useState('')
	
const [savedDescriptions] =
  useState([

    '👁️ 50.0K Views',
	'👁️ 60.0K Views',
	'👁️ 70.0K Views',
	'👁️ 51.0K Views',
	'👁️ 52.0K Views',
	'👁️ 53.0K Views',
	'👁️ 54.0K Views',
	'👁️ 55.0K Views',
	'👁️ 56.0K Views',
	'👁️ 57.0K Views',
	'👁️ 58.0K Views',
	'👁️ 59.0K Views',
	'👁️ 15.0K Views',
	'👁️ 25.0K Views',
	'👁️ 35.0K Views',
	'👁️ 45.0K Views',
	'👁️ 55.0K Views',
	'👁️ 65.0K Views',
	'👁️ 75.0K Views',
	'👁️ 85.0K Views',
	'👁️ 95.0K Views',
	'👁️ 75.0K Views',

  ])

  function randomizeDescriptions() {

  const randomDescriptions =

    [...savedDescriptions]

      .sort(
        () =>
          0.5 - Math.random()
      )

      .slice(0, 5)

  setDescription(

    randomDescriptions.join('\n')

  )

}

  const [images, setImages] = useState('')
  
const [savedImages] =
  useState([

	'https://grbto.net/ib/Uup0C9J0aQ.png',
	'https://grbto.net/ib/s5xRrW4Ryu.png',
	'https://grbto.net/ib/fy1aYlLhzB.png',
	'https://grbto.net/ib/sjSlajfg7t.png',
	'https://grbto.net/ib/7d2efPhwwh.png',
	'https://grbto.net/ib/HQ7A2LaLlv.png',
	'https://grbto.net/ib/93oc0kaN3v.png',
	'https://grbto.net/ib/Crw0QJVlCw.png',
	'https://grbto.net/ib/CK6o5STkuT.png',
	'https://grbto.net/ib/SMQTl0SS45.png',
	'https://grbto.net/ib/h19oC0ZhbE.png',
	'https://grbto.net/ib/j5EaPEq0Lk.png',
	'https://grbto.net/ib/sdBoqIWzeI.png',
	'https://grbto.net/ib/BFns5rOq8Q.png',
	'https://grbto.net/ib/g7eEpwCIhE.png',
	'https://grbto.net/ib/9IkGtYyLC4.png',
	'https://grbto.net/ib/qwzjzaLWMZ.png',
	'https://grbto.net/ib/MacXpo2I4c.png',
	'https://grbto.net/ib/IfdOr84jDX.png',
	'https://grbto.net/ib/3q61aWBNz2.png',
	'https://grbto.net/ib/6oDhgsTKJZ.png',
	'https://grbto.net/ib/yNClIs1r3b.png',
	'https://grbto.net/ib/BN6DtunM9J.png',
	'https://grbto.net/ib/GF3iiS14lX.png',
	'https://grbto.net/ib/B5Y1fWNvto.png',
	'https://grbto.net/ib/yG2gX7Ytf7.png',
	'https://grbto.net/ib/jcrYz2j17A.png',
	'https://grbto.net/ib/GRl6xxLnBx.png',
	'https://grbto.net/ib/Vop12CVcfn.png',
	'https://grbto.net/ib/N10vxuyPH2.png',
	'https://grbto.net/ib/N867XWbFAB.png',
	'https://grbto.net/ib/xWUjy5g5uy.png',
	'https://grbto.net/ib/HpjmJcSBcf.png',
	'https://grbto.net/ib/Zgdm0jxQIq.png',
	'https://grbto.net/ib/Hoj64tOOuO.png',
	'https://grbto.net/ib/FvxLXeoG09.png',
	'https://grbto.net/ib/UH4HpzvEwj.png',
	'https://grbto.net/ib/qUJrwQK6Nk.png',
	'https://grbto.net/ib/UMz083yfq0.png',
	'https://grbto.net/ib/fvRJA56OU4.png',
	'https://grbto.net/ib/b4w0ts6BUe.png',
	'https://grbto.net/ib/LsiyhjDsru.png',
	'https://grbto.net/ib/RZtY5MsosE.png',
	'https://grbto.net/ib/wmI1IKB1uq.png',
	'https://grbto.net/ib/wQTgNBbUnq.png',
	'https://grbto.net/ib/TabETFYIyy.png',
	'https://grbto.net/ib/O5OEa4rFzh.png',
	'https://grbto.net/ib/leZJ8zxNvU.png',
	'https://grbto.net/ib/VOy1WYkVzP.png',
	'https://grbto.net/ib/KaoNaJ47BP.png',
	'https://grbto.net/ib/3yQmdX7S7g.png',
	'https://grbto.net/ib/4BRhOUCTW6.png',
	'https://grbto.net/ib/qzxT2Kc1TT.png',
	'https://grbto.net/ib/SKTfc33oJM.png',
	'https://grbto.net/ib/64sOiRP3o2.png',
	'https://grbto.net/ib/kTW3ooEjzk.png',
	'https://grbto.net/ib/lgIK3S6aGV.png',
	'https://grbto.net/ib/W1TJ9LjyAD.png',
	'https://grbto.net/ib/iqwby7FUx2.png',
	'https://grbto.net/ib/DdGxOCSYRj.png',
	'https://grbto.net/ib/aC3BukqQBr.png',
	'https://grbto.net/ib/VL148IAcXP.png',
	'https://grbto.net/ib/jfpMTumfJ4.png',
	'https://grbto.net/ib/NVG1ov6p3i.png',
	'https://grbto.net/ib/YQTik3UdPK.png',
	'https://grbto.net/ib/y4nmSTmxli.png',
	'https://grbto.net/ib/jIDsvC9ls4.png',
	'https://grbto.net/ib/OkkTO85wOW.png',
	'https://grbto.net/ib/HWG2Offi1t.png',
	'https://grbto.net/ib/GmDyKgfa5W.png',
	'https://grbto.net/ib/I39ez1WbS6.png',
	'https://grbto.net/ib/8lkDwoLCQ2.png',
	'https://grbto.net/ib/Sifmfmcccr.png',
	'https://grbto.net/ib/ffUQ0T59Yh.png',
	'https://grbto.net/ib/ozbUlew4XV.png',
	'https://grbto.net/ib/MMd3cXIUKj.png',
	'https://grbto.net/ib/UyuFd7Rub4.png',
	'https://grbto.net/ib/DYph6dJiuE.png',
	'https://grbto.net/ib/QWGoDOnUuF.png',
	'https://grbto.net/ib/mj3UoqMzo5.png',
	'https://grbto.net/ib/bSfODwe4hu.png',
	'https://grbto.net/ib/GGg6jPpmI2.png',
	'https://grbto.net/ib/1rlJdyPD8H.png',
	'https://grbto.net/ib/pws6G3bSKe.png',
	'https://grbto.net/ib/oBeP6n1mKX.png',
	'https://grbto.net/ib/QaD4YrFS5G.png',
	'https://grbto.net/ib/akyZAoRJYW.png',
	'https://grbto.net/ib/gkt7t92rKQ.png',
	'https://grbto.net/ib/IzJZI6e6Mu.png',
	'https://grbto.net/ib/XjvtOmtbqS.png',
	'https://grbto.net/ib/pXyIUI5flR.png',
	'https://grbto.net/ib/ekNEUEtrfW.png',
	'https://grbto.net/ib/CY6jt7pkXL.png',
	'https://grbto.net/ib/5xO41ssawF.png',
	'https://grbto.net/ib/AhhVZJyKwa.png',
	'https://grbto.net/ib/b9cGL9W6PW.png',
	'https://grbto.net/ib/OkhmDPOBUr.png',
	'https://grbto.net/ib/IE51tXfIsq.png',
	'https://grbto.net/ib/KYa024MNp4.png',
	'https://grbto.net/ib/Oc9Qsi3GRV.png',
	'https://grbto.net/ib/vmyCshlpIN.png',
	'https://grbto.net/ib/htlPmgkLWd.png',
	'https://grbto.net/ib/OwcLNMi182.png',
	'https://grbto.net/ib/CpGjO8Zx9u.png',
	'https://grbto.net/ib/qALWKKgVN9.png',
	'https://grbto.net/ib/pDUCZuyIbU.png',
	'https://grbto.net/ib/51imK5WkGD.png',
	'https://grbto.net/ib/0swaXW9HVu.png',
	'https://grbto.net/ib/sgeeBE3mt4.png',
	'https://grbto.net/ib/UuMnrN0jDx.png',
	'https://grbto.net/ib/JMyjU9lYfL.png',
	'https://grbto.net/ib/9xIb6QI5YL.png',
	'https://grbto.net/ib/I8PNJhGOZH.png',
	'https://grbto.net/ib/thTyXgy2mE.png',
	'https://grbto.net/ib/vBVew7q6T4.png',
	'https://grbto.net/ib/0p7v8rFzt7.png',
	'https://grbto.net/ib/TpBaHTAbTg.png',
	'https://grbto.net/ib/PAcVwwzD3C.png',
	'https://grbto.net/ib/ssU1U0Ceng.png',
	'https://grbto.net/ib/nagCb1jb3j.png',
	'https://grbto.net/ib/SrVqUizSPA.png',
	'https://grbto.net/ib/qRyNOUVBZF.png',
	'https://grbto.net/ib/Q9S16KZbWw.png',
	'https://grbto.net/ib/Ssaf3iqC6p.png',
	'https://grbto.net/ib/6YvGyyZIvi.png',
	'https://grbto.net/ib/eMpLZK2AAa.png',
	'https://grbto.net/ib/EbexFTupUW.png',

  ])
  
function randomizeImages() {

  const randomImages =

    [...savedImages]

      .sort(
        () =>
          0.5 - Math.random()
      )

      .slice(0, 100)

  setImages(

    randomImages.join('\n')

  )

}

  const [target, setTarget] = useState('')
  
  const currentUser =
  typeof window !==
  'undefined'

    ? localStorage.getItem(
        'viroxa_user'
      )

    : null

const [offers,
setOffers] =
  useState<any[]>([])
  
useEffect(() => {

  async function loadOffers() {

    const currentUser =
      localStorage.getItem(
        'viroxa_user'
      )

    if (!currentUser)
      return

    const response =
      await fetch(

        'https://viroxa-api.wilayudhah.workers.dev/get-offers',

        {

          method: 'POST',

          headers: {
            'Content-Type':
              'application/json',
          },

          body: JSON.stringify({

            username:
              currentUser,

          }),

        }

      )

    const data:any =
      await response.json()

    setOffers([

      {
        name: 'Manual',
        url: '',
      },

      ...data,

    ])

  }

  loadOffers()

}, [])
  
  const [
		selectedOffer,
		setSelectedOffer
		] = useState('Manual')

  const [count, setCount] = useState(1)
  
  const [selectedDomain,
  setSelectedDomain] =
    useState('random')

const [
  shortDomains,
  setShortDomains
] = useState<any[]>([])

const [
  shortDomain,
  setShortDomain
] = useState('random')

const [
  shortening,
  setShortening
] = useState(false)

  const [generatedLinks, setGeneratedLinks] =
    useState<string[]>([])
		const [loading, setLoading] =
  useState(false)
  const [copied, setCopied] =
  useState(false)
  
  const [access, setAccess] =
    useState(false)
	
	useEffect(() => {

  const saved =
    localStorage.getItem(
      'viroxa_access'
    )

  if (saved === 'granted') {
    setAccess(true)
  }

}, [])

const [domains,
setDomains] =
  useState<any[]>([])
  
useEffect(() => {

  async function loadDomains() {

    const response =
      await fetch(

        'https://viroxa-api.wilayudhah.workers.dev/get-domains'

      )

    const data:any =
      await response.json()

    setDomains(data)

  }

  loadDomains()

}, [])

useEffect(() => {

  async function loadShortDomains() {

    const response =
      await fetch(
        'https://go.viroxa.io/api/domains.php'
      )

    const data: any =
      await response.json()

    if(data.success){

      setShortDomains(
        data.domains
      )

    }

  }

  loadShortDomains()

}, [])
  
  const [password, setPassword] =
	useState('')
  const [showPassword,  setShowPassword] =
    useState(false)

  async function generateLinks() {
  
    const imageList = images
      .split('\n')
      .map((img) => img.trim())
      .filter(Boolean)
	  
	const titleList = title
		.split('\n')
		.map((item) => item.trim())
		.filter(Boolean)
	const descriptionList = description
		.split('\n')
		.map((item) =>
		item.trim()
		)
		.filter(Boolean)

if (!target.trim()) {
  alert(
    'Link tujuan wajib diisi'
  )

  return
}

setLoading(true)

    const links: string[] = []

    for (let i = 0; i < count; i++) {
      const randomImage =
  imageList.length > 0
    ? imageList[
        Math.floor(
          Math.random() *
            imageList.length
        )
      ]
    : ''

const cleanTitles =
  titleList.filter(
    (item) =>
      item.trim().length > 0
  )

const randomTitle =
  cleanTitles.length > 0
    ? cleanTitles[
        Math.floor(
          Math.random() *
            cleanTitles.length
        )
      ]
    : ''
  
const cleanDescriptions =
  descriptionList.filter(
    (item) =>
      item.trim().length > 0
  )

const randomDescription =
  cleanDescriptions[
    Math.floor(
      Math.random() *
        cleanDescriptions.length
    )
  ] || ''

const data: Payload = {
  title: randomTitle,
  
        description:  randomDescription,
        image: randomImage,
        target,
      }

      const encoded =
        encodePayload(data)

      const domain =
  selectedDomain === 'random'
    ? domains[
        Math.floor(
          Math.random() *
            domains.length
        )
      ].url
    : selectedDomain

const url =
  `${domain}/p/${encoded}`

      links.unshift(url)
    }

    setGeneratedLinks(links)
	setTimeout(() => {
  setLoading(false)
}, 400)

setTimeout(() => {
  const textarea =
    document.getElementById(
      'generated-links'
    ) as HTMLTextAreaElement | null

  if (textarea) {
    textarea.scrollTop = 0
  }
}, 50)
  }

async function copyAll() {
  await navigator.clipboard.writeText(
    generatedLinks.join('\n')
  )

  setCopied(true)

  setTimeout(() => {
    setCopied(false)
  }, 2000)
}

async function handleShortLink() {

setShortening(true)

  if (
    generatedLinks.length === 0
  ) {
    return
  }

  const formData =
    new FormData()

  generatedLinks.forEach(
    (url) => {

      formData.append(
        'urls[]',
        url
      )

    }
  )

  formData.append(
    'domain',
    shortDomain
  )

  const response =
    await fetch(
      'https://go.viroxa.io/api/shorten.php',
      {
        method: 'POST',
        body: formData
      }
    )

  const data =
    await response.json()

  if (!data.success) {

    alert(
      data.message ||
      'Shorten failed'
    )

    return
  }

  setGeneratedLinks(
    data.links
	
  )
setShortening(false)
}

  function unlock() {
  if (password === 'viroxa2026') {
    setAccess(true)

    localStorage.setItem(
      'viroxa_access',
      'granted'
    )
  } else {
    alert('Wrong password')
  }
}

if (!access) {
  return (
    <main className="min-h-screen bg-[#070B14] flex items-center justify-center p-6">
      <div className="w-full max-w-sm bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
        <h1 className="text-3xl font-bold text-white mb-6">
          Access Required
        </h1>

       <div className="relative">

		<input
			type={
			showPassword
				? 'text'
				: 'password'
			}
			placeholder="Enter password"
			value={password}
			onChange={(e) =>
			setPassword(
				e.target.value
			)
			}
			onKeyDown={(e) => {
			if (e.key === 'Enter') {
				unlock()
			}
			}}
			className="w-full p-4 pr-14 rounded-2xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
		/>
		
		<button
			type="button"
			onClick={() =>
			setShowPassword(
				!showPassword
			)
			}
			className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition"
		>
			{showPassword
			? '🙈'
			: '👁️'}
		</button>
		
		</div>
		
        <button
          onClick={unlock}
          className="w-full mt-5 py-4 rounded-2xl bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold"
        >
          Unlock
        </button>
      </div>
    </main>
  )
}

  return (
    <main className="min-h-screen bg-[#070B14] text-white overflow-hidden relative">
		<div className="absolute inset-0 overflow-hidden">
		<div className="absolute top-[-200px] left-[-200px] w-[500px] h-[360px] bg-indigo-500/20 blur-3xl rounded-full" />
		
		<div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[360px] bg-fuchsia-500/20 blur-3xl rounded-full" />
		
		<div className="absolute top-[30%] left-[40%] w-[300px] h-[300px] bg-cyan-500/10 blur-3xl rounded-full" />
		</div>
		
			
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 mt-0 min-h-screen flex flex-col justify-start px-8 pt-10 pb-16">
	  
				<div className="mb-5">
			
			<div className="w-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl px-5 py-3 flex items-center justify-between shadow-2xl shadow-black/20">
			
				<div className="flex items-center gap-10">
			
				<div className="flex items-center gap-3">
					<div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center font-black text-lg">
					V
					</div>
			
					<div>
					<p className="font-semibold text-base">
						Viroxa
					</p>
			
					<p className="hidden">
						Generator Platform
					</p>
					</div>
					
				
					
				</div>
			
				</div>
			
<div className="flex items-center gap-3">

  <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/5 border border-white/10 text-sm">

    <User size={16} />

    {currentUser}

  </div>

  <button

    onClick={() => {

      localStorage.removeItem(
        'viroxa_user'
      )

      localStorage.removeItem(
        'viroxa_access'
      )

      window.location.href =
    `/login/${currentUser}`

    }}

    className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/5 border border-white/10 hover:bg-red-500/20 hover:border-red-500/20 transition text-sm"

  >

    <LogOut size={16} />

    Logout

  </button>

</div>					
			
			</div>
			
			</div>
	  
	  <div className="flex items-center gap-3 mb-1">

  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />

  <p className="text-sm text-zinc-500">

    System Online

  </p>

</div>

<h1 className="text-4xl font-black mb-3 tracking-tight">

  Viroxa Generator

</h1>

<p className="text-zinc-400 text-sm mb-5 leading-6 max-w-lg">

  Modern social preview generator engine

</p>

<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">

			<div className="space-y-5">
				<div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl shadow-black/30 space-y-4">
	
	<div className="flex justify-between items-start mb-1">

  <p className="text-[10px] text-zinc-50">

    Titles

  </p>

  <button

    onClick={randomizeTitles}

    className="text-[7px] px-2 py-1 rounded-lg bg-white/5 border border-white/7 hover:bg-white/7 transition"

  >

    🎲 Random 5

  </button>

</div>
	
				<textarea
					className="w-full h-15 p-3 text-xs rounded-xl bg-black/20 border border-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition resize-none"
					placeholder="1 judul per baris"
					value={title}
					onChange={(e) =>
						setTitle(e.target.value)
					}
					/>
			
	<div className="flex justify-between items-start mb-1">

  <p className="text-[10px] text-zinc-50">

    Descriptions

  </p>

  <button

    onClick={randomizeDescriptions}

    className="text-[7px] px-2 py-1 rounded-lg bg-white/5 border border-white/7 hover:bg-white/7 transition"

  >

    🎲 Random 5

  </button>

</div>
	
			
				<textarea
					className="w-full p-3 text-xs rounded-xl bg-black/20 border border-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
					placeholder="1 Deskripsi per baris"
					value={description}
					onChange={(e) =>
					setDescription(e.target.value)
					}
				/>
			
<div className="flex justify-between items-start mb-1">

  <p className="text-[10px] text-zinc-50">

    Images

  </p>

  <button

    onClick={randomizeImages}

    className="text-[7px] px-2 py-1 rounded-lg bg-white/5 border border-white/7 hover:bg-white/7 transition"

  >

    🎲 Random 5

  </button>

</div>
			
				<textarea
					className="w-full p-3 text-xs rounded-xl bg-black/20 border border-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
					placeholder="1 URL gambar per baris"
					value={images}
					onChange={(e) =>
					setImages(e.target.value)
					}
				/>
			
			<select

  value={selectedOffer}

  onChange={(e) => {

    const value =
      e.target.value

    setSelectedOffer(value)

    const found =
      offers.find(
        (o) =>
          o.name === value
      )

    if (found) {
      setTarget(found.url)
    }

  }}

  className="w-full p-3 text-xs rounded-xl bg-black/20 border border-white/10"

>

  {offers.map((offer) => (

    <option
      key={offer.name}
      value={offer.name}
      className="bg-black"
    >

      {offer.name}

    </option>

  ))}

</select>

				<input
					className="w-full p-3 text-xs rounded-xl bg-black/20 border border-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
					placeholder="Link tujuan"
					value={target}
					onChange={(e) =>
					setTarget(e.target.value)
					}
				/>
				
				<select
					value={selectedDomain}
					onChange={(e) =>
						setSelectedDomain(
						e.target.value
						)
					}
					className="w-full p-3 text-xs rounded-xl bg-black/20 border border-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
					>
					<option
  value="random"
  className="bg-black"
>
  Random Domain
</option>
					{domains.map((domain) => (
						<option
						key={domain.url}
						value={domain.url}
						className="bg-black"
						>
						{domain.name}
						</option>
					))}
					</select>
			
				<input
					type="number"
					min="1"
					max="1000"
					className="w-full p-3 text-xs rounded-xl bg-black/20 border border-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
					placeholder="Jumlah generate"
					value={count}
					onChange={(e) =>
					setCount(Number(e.target.value))
					}
				/>
			
				<div className="flex gap-3 pt-1">
					<button
  onClick={generateLinks}
  disabled={loading}
					className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 transition font-semibold shadow-lg shadow-indigo-900/40"
					>
					{loading
  ? 'Generating...'
  : '⚡ Generate'}
					</button>
			
					{generatedLinks.length > 0 && (
					<button
						onClick={copyAll}
						className="px-3 py-1.5 text-xs rounded-xl bg-emerald-600 hover:bg-emerald-500 transition font-semibold shadow-lg shadow-emerald-900/40"
					>
						📋 Copy
					</button>
					)}
					

{generatedLinks.length > 0 && (

<select
  value={shortDomain}
  onChange={(e) =>
    setShortDomain(
      e.target.value
    )
  }
  className="px-3 py-1.5 text-xs rounded-xl bg-black/20 border border-white/10"
>
  <option value="random">
    Random Short
  </option>

  {shortDomains.map((item) => (

    <option
      key={item.id}
      value={item.domain}
    >
      {item.domain
        .replace('https://','')
        .replace('/','')}
    </option>

  ))}

</select>

)}			
					{generatedLinks.length > 0 && (
  <button
  onClick={handleShortLink}
  disabled={shortening}
    className="px-3 py-1.5 text-xs rounded-xl bg-cyan-600 hover:bg-cyan-500 transition font-semibold shadow-lg shadow-cyan-900/40"
  >
    {
    shortening
      ? 'Shortening...'
      : '🔗 Short Link'
  }
  </button>
  
)}

					
				</div>
			
				</div>
			</div>
			
			<div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl shadow-black/30">
			<div className="flex items-center justify-between mb-4">
  <p className="text-xs text-zinc-400">
    {generatedLinks.length} generated
  </p>

  {generatedLinks.length > 0 && (
    <button
      onClick={() =>
        setGeneratedLinks([])
      }
      className="text-xs text-zinc-500 hover:text-white transition"
    >
      Clear
    </button>
  )}
</div>
				<textarea
				id="generated-links"
				readOnly
				value={generatedLinks.join('\n')}
				placeholder="Generated links..."
				className="w-full h-[590px] rounded-xl bg-black/20 border border-white/10 p-4 text-[11px] leading-5 focus:outline-none resize-none"
				/>
			</div>
				<div className="flex items-center justify-between mt-1 text-[12px] text-zinc-500">

				<div className="flex items-center gap-3">
				
					<span>
					{generatedLinks.length} generated
					</span>
				
					<span>
					{(
						generatedLinks.join('\n').length /
						1024
					).toFixed(1)} KB
					</span>
				
				</div>
				
				<div className="px-2 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-300">
					Fast Mode
				</div>
				
				</div>		
			</div>
        	  {copied && (
  <div className="fixed bottom-6 right-6 px-4 py-3 rounded-2xl bg-emerald-500 text-white text-sm shadow-2xl shadow-emerald-900/40 z-50">
    Copied successfully
  </div>
)}
      </div>
    </main>
  )
}