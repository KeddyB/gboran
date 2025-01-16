'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const validatePassword = (password: string) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/
    return regex.test(password)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setMessage('')

    if (!validatePassword(password)) {
      setError("Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.")
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords don't match")
      return
    }

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      })
      const data = await res.json()
      if (res.ok) {
        setMessage(data.message)
        setTimeout(() => router.push('/login'), 3000)
      } else {
        setError(data.message || 'An error occurred')
      }
    } catch (error) {
      setError('An error occurred. Please try again.')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-md px-8 py-6 mt-4 text-left bg-card shadow-lg rounded-lg">
        <h3 className="text-2xl font-bold text-center text-foreground">Reset Password</h3>
        {error && <p className="text-destructive text-sm mt-2">{error}</p>}
        {message && <p className="text-primary text-sm mt-2">{message}</p>}
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mt-4">
            <Label htmlFor="password" className="text-foreground">New Password</Label>
            <Input
              type="password"
              placeholder="New Password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 bg-background text-foreground"
            />
          </div>
          <div className="mt-4">
            <Label htmlFor="confirmPassword" className="text-foreground">Confirm New Password</Label>
            <Input
              type="password"
              placeholder="Confirm New Password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
      </div>
    </div>
  )
}

