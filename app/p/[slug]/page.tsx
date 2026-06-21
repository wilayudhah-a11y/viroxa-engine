import type { Metadata }
from 'next'

import { unstable_cache }
from 'next/cache'

import { headers }
from 'next/headers'

import { redirect }
from 'next/navigation'

import { supabase }
from '@/lib/supabase'

type Props = {
  params: Promise<{
    slug: string
  }>
}

function isValidUrl(url: string) {
  try {
    const parsed = new URL(url)

    return (
      parsed.protocol === 'http:' ||
      parsed.protocol === 'https:'
    )
  } catch {
    return false
  }
}

function isCrawlerUserAgent(userAgent: string) {
  const normalized = userAgent.toLowerCase()

  return [
    'facebookexternalhit',
    'facebot',
    'twitterbot',
    'slackbot',
    'whatsapp',
    'telegrambot',
    'linkedinbot',
    'pinterest',
    'discordbot',
    'redditbot',
    'applebot',
    'googlebot',
    'bingpreview',
    'embedly',
    'quora link preview',
    'petalbot',
    'okhttp',
    'vkshare',
  ].some((agent) => normalized.includes(agent))
}

const getPayloadBySlug =
  unstable_cache(
    async (slug: string) => {
      const { data } =
        await supabase
          .from("payloads")
          .select(
            "title,description,image,target"
          )
          .eq(
            "slug",
            slug
          )
          .maybeSingle()

      return data
    },
    ["payload-by-slug"],
    {
      revalidate: 3600,
      tags: ["payloads"],
    }
  )

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params

  const data =
    await getPayloadBySlug(
      slug
    )

  if (!data) {
    return {
      title: 'Invalid Link',
    }
  }

  return {
    title: data.title,

    description:
      data.description,

    openGraph: {
      title: data.title,

      description:
        data.description,

      images: [
        {
          url: data.image,
        },
      ],
    },

    twitter: {
      card:
        'summary_large_image',

      title: data.title,

      description:
        data.description,

      images: [
        {
          url: data.image,
        },
      ],
    },
  }
}

export default async function Page({
  params,
}: Props) {
  const { slug } = await params

  const data =
    await getPayloadBySlug(
      slug
    )

  if (!data) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        Invalid Link
      </main>
    )
  }

  if (
    !isValidUrl(data.target)
  ) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        Invalid Target
      </main>
    )
  }

  const userAgent =
    (await headers()).get(
      'user-agent'
    ) || ''

  if (!isCrawlerUserAgent(userAgent)) {
    redirect(data.target)
  }

  return (
    <html>
      <head>
        <meta
          httpEquiv="refresh"
          content={`0;url=${data.target}`}
        />
      </head>

      <body className="bg-[#070B14] text-white">
        <main className="min-h-screen flex items-center justify-center p-6">
          <div className="w-full max-w-xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl shadow-black/40">

            <img
              src={data.image}
              alt="preview"
              className="w-full h-72 object-cover"
            />

            <div className="p-8">
              <p className="text-sm text-zinc-500 mb-3">
                Redirecting...
              </p>

              <h1 className="text-3xl font-bold leading-tight">
                {data.title}
              </h1>

              <p className="mt-4 text-zinc-400 leading-7">
                {data.description}
              </p>
            </div>

          </div>
        </main>
      </body>
    </html>
  )
}
