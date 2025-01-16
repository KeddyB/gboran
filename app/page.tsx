'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Header } from './components/header'
import { MainContent } from './components/main-content'
import { Footer } from './components/footer'
import { AuthHeader } from '@/components/auth-header'

export default function Home() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return
    if (!session) {
      router.push('/login')
    } else if (session.user && !session.user.hasPaid) {
      router.push('/payment')
    }
  }, [session, status, router])

  if (status === 'loading' || !session) {
    return <div>Loading...</div>
  }

  if (session.user && !session.user.hasPaid) {
    return <div>Redirecting to payment page...</div>
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <MainContent />
      </div>
      <Footer />
    </div>
  )
}