import type { Metadata }
from 'next'

import { decodePayload }
from '@/lib/decode'

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

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params

  const data =
    decodePayload(slug)

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
    decodePayload(slug)

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