import { NextResponse } from 'next/server'
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXTPUBLICSANITYDATASET,
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.NEXTPUBLICSANITYTOKEN,
})

export async function POST(req: Request) {
  try {
    const { email, verificationCode } = await req.json()

    const user = await client.fetch(
      `*[_type == "user" && email == $email && verificationCode == $verificationCode][0]`,
      { email, verificationCode }
    )

    if (!user) {
      return NextResponse.json({ message: 'Invalid verification code' }, { status: 400 })
    }

    await client
      .patch(user._id)
      .set({ isVerified: true, verificationCode: null })
      .commit()

    return NextResponse.json({ message: 'Email verified successfully' })
  } catch (error) {
    console.error('Verification error:', error)
    return NextResponse.json({ message: 'Error verifying email' }, { status: 500 })
  }
}

