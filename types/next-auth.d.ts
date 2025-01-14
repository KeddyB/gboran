import { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      hasPaid: boolean
    } & DefaultSession["user"]
  }

  interface User {
    id: string
    hasPaid: boolean
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    hasPaid: boolean
  }
}