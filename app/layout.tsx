"use client"

import { AuthProvider } from '@/components/auth-provider'
import { ThemeProvider } from "@/components/theme-provider"
import { LayoutWrapper } from "@/components/layout-wrapper"
import "./globals.css"
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    const checkUserStatus = async () => {
      if (status === 'authenticated') {
        try {
          const res = await fetch('/api/auth/user-status')
          const data = await res.json()
          
          if (!data.isVerified) {
            router.push('/verify')
          } else if (!data.hasPaid) {
            router.push('/payment')
          } else {
            router.push('/')
          }
        } catch (error) {
          console.error('Error checking user status:', error)
          router.push('/login')
        }
      }
    }

    checkUserStatus()
  }, [status, router])

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  return <>{children}</>
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <AuthWrapper>
              <LayoutWrapper>
                {children}
              </LayoutWrapper>
            </AuthWrapper>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}

