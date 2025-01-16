import { useEffect, useState } from 'react'
import Image from 'next/image'
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXTPUBLICSANITYDATASET,
  apiVersion: "2024-01-01",
  useCdn: true,
})

interface Advertisement {
  _id: string
  title: string
  description?: string
  image: {
    asset: {
      _ref: string
    }
  }
  link?: string
}

export function Advertisement() {
  const [ad, setAd] = useState<Advertisement | null>(null)

  useEffect(() => {
    const fetchAd = async () => {
      const query = `*[_type == "advertisement" && isActive == true && startDate <= $now && endDate >= $now][0]`
      const params = { now: new Date().toISOString() }
      const result = await client.fetch(query, params)
      setAd(result)
    }

    fetchAd()
  }, [])

  if (!ad) return null

  return (
    <div className="bg-card shadow-lg rounded-lg overflow-hidden">
      <div className="p-4">
        <h3 className="text-lg font-bold mb-2">{ad.title}</h3>
        {ad.description && <p className="text-sm mb-4">{ad.description}</p>}
        {ad.image && (
          <div className="relative h-48 mb-4">
            <Image
              src={`https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXTPUBLICSANITYDATASET}/${ad.image.asset._ref.replace('image-', '').replace('-jpg', '.jpg')}`}
              alt={ad.title}
              layout="fill"
              objectFit="cover"
            />
          </div>
        )}
        {ad.link && (
          <a
            href={ad.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90 transition-colors"
          >
            Learn More
          </a>
        )}
      </div>
    </div>
  )
}

