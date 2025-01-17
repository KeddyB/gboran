'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useSession } from 'next-auth/react'
// Assuming FancyLoadingScreen is imported elsewhere or defined in this file.  If not, add import statement.
import FancyLoadingScreen from './FancyLoadingScreen'; // Or wherever it's located


export default function VerifyPage() {
  const [verificationCode, setVerificationCode] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const router = useRouter()
  const { data: session, status, update } = useSession()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    } else if (session?.user?.isVerified) {
      router.push('/payment')
    }
  }, [session, status, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setMessage('')

    try {
      const res = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: session?.user?.email, verificationCode }),
      })
      const data = await res.json()
      if (res.ok) {
        setMessage(data.message)
        await update({ isVerified: true })
        router.push('/payment')
      } else {
        setError(data.message || 'Verification failed')
      }
    } catch (error) {
      setError('An error occurred. Please try again.')
    }
  }

  if (status === 'loading') {
    return <FancyLoadingScreen />
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-md px-8 py-6 mt-4 text-left bg-card shadow-lg rounded-lg">
        <h3 className="text-2xl font-bold text-center text-foreground">Verify Your Email</h3>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        {message && <p className="text-green-500 text-sm mt-2">{message}</p>}
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mt-4">
            <Label htmlFor="verificationCode" className="text-foreground">Verification Code</Label>
            <Input
              type="text"
              placeholder="6-digit code"
              id="verificationCode"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              required
              className="mt-1 bg-background text-foreground"
            />
          </div>
          <div className="mt-4">
            <Button type="submit" className="w-full bg-primary text-primary-foreground">
              Verify
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}