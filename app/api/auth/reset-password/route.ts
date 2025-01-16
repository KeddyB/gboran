import { NextResponse } from 'next/server'
import { createClient } from '@sanity/client'
import bcrypt from 'bcryptjs'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXTPUBLICSANITYDATASET,
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.NEXTPUBLICSANITYTOKEN,
})

export async function POST(req: Request) {
  try {
    const { token, password } = await req.json()

    const user = await client.fetch(
      `*[_type == "user" && resetToken == $token && resetTokenExpiry > $now][0]`,
      { token, now: Date.now() }
    )

    if (!user) {
      return NextResponse.json({ message: 'Invalid or expired reset token' }, { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await client
      .patch(user._id)
      .set({ password: hashedPassword, resetToken: undefined, resetTokenExpiry: undefined })
      .commit()

    return NextResponse.json({ message: 'Password reset successfully' })
  } catch (error) {
    console.error('Password reset error:', error)
    return NextResponse.json({ message: 'Error resetting password' }, { status: 500 })
  }
}

