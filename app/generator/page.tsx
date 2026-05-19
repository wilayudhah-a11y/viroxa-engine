'use client'
import { domains } from '@/config/domains'

import { useState } from 'react'

import { encodePayload } from '@/lib/encode'

import type { Payload } from '@/types/payload'

export default function GeneratorPage() {
  const [title, setTitle] = useState('')

  const [description, setDescription] =
    useState('')

  const [images, setImages] = useState('')

  const [target, setTarget] = useState('')

  const [count, setCount] = useState(1)
  
  const [selectedDomain,
  setSelectedDomain] =
    useState('random')

  const [generatedLinks, setGeneratedLinks] =
    useState<string[]>([])
		const [loading, setLoading] =
  useState(false)
  const [copied, setCopied] =
  useState(false)
  
  const [access, setAccess] =
    useState(false)
  
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
        imageList[
          Math.floor(
            Math.random() * imageList.length
          )
        ]

      const randomTitle =
  titleList[
    Math.floor(
      Math.random() *
        titleList.length
    )
  ] || ''
  
  const randomDescription =
  descriptionList[
    Math.floor(
      Math.random() *
        descriptionList.length
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
		
			
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 mt-2 min-h-screen flex flex-col justify-start px-8 pt-10 pb-16">
	  
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
			
				<div className="hidden md:flex items-center gap-3 text-sm">
			
					<button className="px-3 py-1.5 rounded-xl bg-indigo-600/20 border border-indigo-500/20 text-indigo-300">
					Generator
					</button>
			
					<button className="px-3 py-1.5 rounded-xl text-zinc-400 hover:text-white transition">
					Analytics
					</button>
			
					<button className="px-3 py-1.5 rounded-xl text-zinc-400 hover:text-white transition">
					Domains
					</button>
			
					<button className="px-3 py-1.5 rounded-xl text-zinc-400 hover:text-white transition">
					Users
					</button>
			
					<button className="px-3 py-1.5 rounded-xl text-zinc-400 hover:text-white transition">
					Settings
					</button>
			
				</div>
			
				</div>
			
				<div className="flex items-center gap-3">
			
				<div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
			
				<p className="text-xs text-zinc-400">
					Online
				</p>
			
				</div>
			
			</div>
			
			</div>
	  
	  <div className="flex items-center gap-3 mb-4">

			<div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
			
			<p className="text-sm text-zinc-400">
				System Online
			</p>
			
		</div>
	  
        <h1 className="text-4xl font-black mb-4 tracking-tight">
          Viroxa Generator
        </h1>
			<p className="text-zinc-400 text-sm mb-8 leading-6 max-w-lg">
			Modern social preview generator engine
			</p>
			
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">

			<div className="space-y-5">
				<div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl shadow-black/30 space-y-4">
			
				<input
					className="w-full p-3 rounded-xl bg-black/20 border border-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
					placeholder="Judul"
					value={title}
					onChange={(e) =>
					setTitle(e.target.value)
					}
				/>
			
				<textarea
					className="w-full p-3 rounded-xl bg-black/20 border border-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
					placeholder="Deskripsi"
					value={description}
					onChange={(e) =>
					setDescription(e.target.value)
					}
				/>
			
				<textarea
					className="w-full h-32 p-3 rounded-xl bg-black/20 border border-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
					placeholder="1 URL gambar per baris"
					value={images}
					onChange={(e) =>
					setImages(e.target.value)
					}
				/>
			
				<input
					className="w-full p-3 rounded-xl bg-black/20 border border-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
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
					className="w-full p-3 rounded-xl bg-black/20 border border-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
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
					max="100"
					className="w-full p-3 rounded-xl bg-black/20 border border-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
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
						className="px-3 py-1.5 text-sm rounded-xl bg-emerald-600 hover:bg-emerald-500 transition font-semibold shadow-lg shadow-emerald-900/40"
					>
						📋 Copy
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
				className="w-full h-[540px] rounded-xl bg-black/20 border border-white/10 p-4 text-[11px] leading-5 focus:outline-none resize-none"
				/>
			</div>
				<div className="flex items-center justify-between mt-3 text-[11px] text-zinc-500">

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