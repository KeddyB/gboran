'use client'

import { usePathname } from 'next/navigation'
import { AuthHeader } from './auth-header'
import { ThemeToggle } from './theme-toggle'

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isLoginPage = pathname === '/login'

  return (
    <div className="min-h-screen bg-background">
      {!isLoginPage && <AuthHeader />}
      {children}
      <ThemeToggle />
    </div>
  )
}