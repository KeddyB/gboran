import { NextResponse } from 'next/server'
import { createClient } from '@sanity/client'
import bcrypt from 'bcryptjs'
import nodemailer from 'nodemailer'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXTPUBLICSANITYDATASET,
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.NEXTPUBLICSANITYTOKEN,
})

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json()

    // Check if user already exists
    const existingUser = await client.fetch(
      `*[_type == "user" && email == $email][0]`,
      { email }
    )

    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString()

    // Create new user
    const newUser = await client.create({
      _type: 'user',
      name,
      email,
      password: hashedPassword,
      hasPaid: false,
      isVerified: false,
      verificationCode,
    })

    // Send verification email
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Verify Your Email',
      html: `
        <p>Your verification code is: <strong>${verificationCode}</strong></p>
        <p>Please enter this code on the verification page to complete your registration.</p>
      `,
    })

    return NextResponse.json({ message: 'User registered successfully. Please check your email for the verification code.' })
  } catch (error) {
    console.error('Registration error:', error)
    if (error instanceof Error) {
      return NextResponse.json({ message: `Error registering user: ${error.message}` }, { status: 500 })
    }
    return NextResponse.json({ message: 'An unexpected error occurred during registration' }, { status: 500 })
  }
}

