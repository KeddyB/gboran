import { NextResponse } from 'next/server'
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXTPUBLICSANITYDATASET,
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.NEXTPUBLICSANITYTOKEN,
})

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const token = searchParams.get('token')

  if (!token) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 400 })
  }

  try {
    const user = await client.fetch(
      `*[_type == "user" && verificationToken == $token][0]`,
      { token }
    )

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }

    await client
      .patch(user._id)
      .set({ isConfirmed: true, verificationToken: null })
      .commit()

    return NextResponse.json({ message: 'Email verified successfully' })
  } catch (error) {
    return NextResponse.json({ message: 'Error verifying email' }, { status: 500 })
  }
}