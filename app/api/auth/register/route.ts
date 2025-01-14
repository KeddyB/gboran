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
    const { name, email, password } = await req.json()

    const existingUser = await client.fetch(
      `*[_type == "user" && email == $email][0]`,
      { email }
    )

    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await client.create({
      _type: 'user',
      name,
      email,
      password: hashedPassword,
      hasPaid: false,
    })

    return NextResponse.json({ message: 'User registered successfully.' })
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json({ message: 'Error registering user' }, { status: 500 })
  }
}