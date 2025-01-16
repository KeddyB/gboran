'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from 'next/navigation'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setMessage('')

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (res.ok) {
        setMessage(data.message)
      } else {
        setError(data.message || 'An error occurred')
      }
    } catch (error) {
      console.error('Forgot password error:', error)
      setError('An unexpected error occurred. Please try again.')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-md px-8 py-6 mt-4 text-left bg-card shadow-lg rounded-lg">
        <h3 className="text-2xl font-bold text-center text-foreground">Forgot Password</h3>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        {message && <p className="text-green-500 text-sm mt-2">{message}</p>}
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mt-4">
            <Label htmlFor="email" className="text-foreground">Email</Label>
            <Input
              type="email"
              placeholder="Email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 bg-background text-foreground"
            />
          </div>
          <div className="mt-4">
            <Button type="submit" className="w-full bg-primary text-primary-foreground">
              Reset Password
            </Button>
          </div>
        </form>
        <div className="mt-4 text-center">
          <Button
            variant="link"
            onClick={() => router.push('/login')}
            className="text-sm text-primary"
          >
            Back to Login
          </Button>
        </div>
      </div>
    </div>
  )
}

