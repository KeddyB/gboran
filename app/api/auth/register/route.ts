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
  const { name, email, password } = await req.json()

  try {
    const user = await client.create({
      _type: 'user',
      name,
      email,
      password, // In a real app, make sure to hash the password before storing
      isConfirmed: false,
    })

    return NextResponse.json({ message: 'User registered successfully', user })
  } catch (error) {
    return NextResponse.json({ message: 'Error registering user' }, { status: 500 })
  }
}