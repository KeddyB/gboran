import NextAuth from 'next-auth'
import { authConfig } from '@/auth.config'
import { createClient } from '@sanity/client'
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

const handler = NextAuth({
  ...authConfig,
  callbacks: {
    ...authConfig.callbacks,
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        const existingUser = await client.fetch(
          `*[_type == "user" && email == $email][0]`,
          { email: user.email }
        )

        if (!existingUser) {
          const verificationCode = Math.floor(100000 + Math.random() * 900000).toString()
          await client.create({
            _type: 'user',
            name: user.name,
            email: user.email,
            hasPaid: false,
            isVerified: false,
            verificationCode,
          })

          // Send verification email
          transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to: user.email,
            subject: 'Verify Your Email',
            html: `
              <p>Your verification code is: <strong>${verificationCode}</strong></p>
              <p>Please enter this code on the verification page to complete your registration.</p>
            `,
          })
        }
      }
      return true
    },
  },
})

export { handler as GET, handler as POST }

