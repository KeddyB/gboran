"use client"

import { AuthProvider } from '@/components/auth-provider'
import { ThemeProvider } from "@/components/theme-provider"
import { LayoutWrapper } from "@/components/layout-wrapper"
import "./globals.css"
import { useSession } from 'next-auth/react'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { FancyLoadingScreen } from '@/components/fancy-loading-screen'

function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const protectedRoutes = ['/', '/about', '/advertisement']
    const isProtectedRoute = protectedRoutes.includes(pathname)

    const checkUserStatus = async () => {
      if (status === 'authenticated') {
        try {
          const res = await fetch('/api/auth/user-status')
          const data = await res.json()
          
          if (!data.isVerified) {
            router.push('/verify')
          } else if (!data.hasPaid && isProtectedRoute) {
            router.push('/payment')
          }
        } catch (error) {
          console.error('Error checking user status:', error)
          router.push('/login')
        }
      } else if (status === 'unauthenticated' && isProtectedRoute) {
        router.push('/login')
      }
    }

    checkUserStatus()
  }, [status, router, pathname])

  if (status === 'loading') {
    return <FancyLoadingScreen />
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