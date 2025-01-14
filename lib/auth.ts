import { getServerSession } from "next-auth"
import { authConfig } from "@/auth.config"

export async function getSession() {
  return await getServerSession(authConfig)
}

export async function getCurrentUser() {
  const session = await getSession()
  return session?.user
}