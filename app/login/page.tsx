'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setMessage('')

    if (!isLogin && password !== confirmPassword) {
      setError("Passwords don't match")
      return
    }

    if (isLogin) {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      })
      if (result?.error) {
        setError(result.error)
      } else {
        router.push('/')
      }
    } else {
      try {
        const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password }),
        })
        const data = await res.json()
        if (res.ok) {
          setMessage(data.message)
          setIsLogin(true)
        } else {
          setError(data.message || 'Registration failed')
        }
      } catch (error) {
        setError('An error occurred during registration. Please try again.')
        console.error('Registration error:', error)
      }
    }
  }

  const handleGoogleSignIn = async () => {
    await signIn('google', { callbackUrl: '/' })
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-md px-8 py-6 mt-4 text-left bg-card shadow-lg rounded-lg">
        <h3 className="text-2xl font-bold text-center text-foreground">
          {isLogin ? 'Login to Your Account' : 'Create New Account'}
        </h3>
        {error && <p className="text-destructive text-sm mt-2">{error}</p>}
        {message && <p className="text-primary text-sm mt-2">{message}</p>}
        <form onSubmit={handleSubmit} className="mt-4">
          {!isLogin && (
            <div className="mt-4">
              <Label htmlFor="name" className="text-foreground">Name</Label>
              <Input
                type="text"
                placeholder="Name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-1 bg-background text-foreground"
              />
            </div>
          )}
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
            <Label htmlFor="password" className="text-foreground">Password</Label>
            <Input
              type="password"
              placeholder="Password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 bg-background text-foreground"
            />
          </div>
          {!isLogin && (
            <div className="mt-4">
              <Label htmlFor="confirmPassword" className="text-foreground">Confirm Password</Label>
              <Input
                type="password"
                placeholder="Confirm Password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="mt-1 bg-background text-foreground"
              />
            </div>
          )}
          <div className="flex items-baseline justify-between mt-4">
            <Button type="submit" className="bg-primary text-primary-foreground">
              {isLogin ? 'Login' : 'Register'}
            </Button>
            <Button
              type="button"
              variant="link"
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-primary"
            >
              {isLogin ? 'Create an account' : 'Already have an account?'}
            </Button>
          </div>
        </form>
        <div className="mt-4">
          <Button
            onClick={handleGoogleSignIn}
            className="w-full bg-secondary text-secondary-foreground"
          >
            Sign in with Google
          </Button>
        </div>
      </div>
    </div>
  )
}