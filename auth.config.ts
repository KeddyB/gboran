import type { AuthConfig } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { createClient } from '@sanity/client'
import bcrypt from 'bcryptjs'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXTPUBLICSANITYDATASET,
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.NEXTPUBLICSANITYTOKEN,
})

export const authConfig: AuthConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) return null
          
          const user = await client.fetch(
            `*[_type == "user" && email == $email][0]`,
            { email: credentials.email }
          )

          if (!user) return null

          const isPasswordValid = await bcrypt.compare(credentials.password, user.password)

          if (!isPasswordValid) return null

          return {
            id: user._id,
            name: user.name,
            email: user.email,
            hasPaid: user.hasPaid,
            isVerified: user.isVerified
          }
        } catch (error) {
          console.error('Auth error:', error)
          return null
        }
      }
    })
  ],
  pages: {
    signIn: '/login',
    error: '/login',
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        try {
          const existingUser = await client.fetch(
            `*[_type == "user" && email == $email][0]`,
            { email: user.email }
          )

          if (!existingUser) {
            // Create new user for Google sign-in
            const newUser = await client.create({
              _type: 'user',
              name: user.name,
              email: user.email,
              hasPaid: false,
              isVerified: true, // Automatically verify Google users
            })
            user.id = newUser._id
          } else {
            user.id = existingUser._id
            user.hasPaid = existingUser.hasPaid
            user.isVerified = true // Ensure existing Google users are verified
          }
        } catch (error) {
          console.error('Error in signIn callback:', error)
          return false
        }
      }
      return true
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id
        token.hasPaid = user.hasPaid
        token.isVerified = user.isVerified
      }
      if (account?.provider === 'google') {
        token.isVerified = true
      }
      return token
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id as string
        session.user.hasPaid = token.hasPaid as boolean
        session.user.isVerified = token.isVerified as boolean
      }
      return session
    }
  },
  session: {
    strategy: "jwt"
  }
}

