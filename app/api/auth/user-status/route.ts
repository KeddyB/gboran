import { NextResponse } from 'next/server'
import { getServerSession } from "next-auth/next"
import { authConfig } from '@/auth.config'
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXTPUBLICSANITYDATASET,
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.NEXTPUBLICSANITYTOKEN,
})

export async function GET() {
  const session = await getServerSession(authConfig)

  if (!session || !session.user) {
    return NextResponse.json({ isVerified: false, hasPaid: false }, { status: 401 })
  }

  const user = await client.fetch(
    `*[_type == "user" && email == $email][0]`,
    { email: session.user.email }
  )

  if (!user) {
    return NextResponse.json({ isVerified: false, hasPaid: false }, { status: 404 })
  }

  return NextResponse.json({
    isVerified: user.isVerified,
    hasPaid: user.hasPaid
  })
}