import { Session } from 'next-auth'
import { useSession } from 'next-auth/react'

export const useSessionUpdate = () => {
  const { data: session, update: updateSession } = useSession()

  const updateSessionData = async (newData: Partial<Session['user']>) => {
    if (session) {
      await updateSession({
        ...session,
        user: {
          ...session.user,
          ...newData,
        },
      })
    }
  }

  return updateSessionData
}