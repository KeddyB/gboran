import { NextResponse } from 'next/server'
import { createClient } from '@sanity/client'
import nodemailer from 'nodemailer'
import crypto from 'crypto'

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
    const { email } = await req.json()

    const user = await client.fetch(
      `*[_type == "user" && email == $email][0]`,
      { email }
    )

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }

    const resetToken = crypto.randomBytes(20).toString('hex')
    const resetTokenExpiry = Date.now() + 3600000 // 1 hour from now

    await client
      .patch(user._id)
      .set({ resetToken, resetTokenExpiry })
      .commit()

    const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${resetToken}`

    try {
      await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: email,
        subject: 'Password Reset Request',
        html: `
          <p>You requested a password reset. Click the link below to reset your password:</p>
          <a href="${resetUrl}">${resetUrl}</a>
          <p>If you didn't request this, please ignore this email.</p>
        `,
      })
      return NextResponse.json({ message: 'Password reset email sent' })
    } catch (emailError) {
      console.error('Error sending password reset email:', emailError)
      return NextResponse.json({ message: 'Error sending password reset email. Please try again later.' }, { status: 500 })
    }
  } catch (error) {
    console.error('Password reset error:', error)
    return NextResponse.json({ message: 'An unexpected error occurred' }, { status: 500 })
  }
}

