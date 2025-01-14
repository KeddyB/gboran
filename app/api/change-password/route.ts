import { NextResponse } from 'next/server'
import { createClient } from '@sanity/client'
import bcrypt from 'bcryptjs'
import { getServerSession } from 'next-auth/next'
import { handler as authOptions } from '@/app/api/auth/[...nextauth]/route'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXTPUBLICSANITYDATASET,
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.NEXTPUBLICSANITYTOKEN,
})

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const { currentPassword, newPassword } = await req.json()

    const user = await client.fetch(
      `*[_type == "user" && _id == $userId][0]`,
      { userId: session.user.id }
    )

    if (!user || !(await bcrypt.compare(currentPassword, user.password))) {
      return NextResponse.json({ message: 'Current password is incorrect' }, {
 status: 400 })
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10)

    await client
      .patch(user._id)
      .set({ password: hashedPassword })
      .commit()

    return NextResponse.json({ message: 'Password changed successfully' })
  } catch (error) {
    console.error('Error changing password:', error)
    return NextResponse.json({ message: 'Error changing password' }, { status: 500 })
  }
}