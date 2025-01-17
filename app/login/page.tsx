'use client'

import { useState, useEffect } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FaGoogle } from "react-icons/fa";
import Link from 'next/link'

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const router = useRouter()
  const { data: session, status } = useSession()

  const validatePassword = (password: string) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
    return regex.test(password)
  }

  const getPasswordStrength = (password: string) => {
    if (password.length === 0) return ''
    if (password.length < 6) return 'Weak'
    if (validatePassword(password)) return 'Strong'
    return 'Medium'
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setMessage('')

    if (isLogin) {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      })
      if (result?.error) {
        setError(result.error === "CredentialsSignin" ? "Invalid email or password" : result.error)
      } else {
        router.push('/payment')
      }
    } else {
      if (password !== confirmPassword) {
        setError("Passwords don't match")
        return
      }
      try {
        const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password }),
        })
        const data = await res.json()
        if (res.ok) {
          setMessage('Account created successfully. Please log in.')
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

  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl: '/payment' })
  }

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/payment')
    }
  }, [status, router])

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-md px-8 py-6 mt-4 text-left bg-card shadow-lg rounded-lg">
        <h3 className="text-2xl font-bold text-center text-foreground">
          {isLogin ? 'Login to Your Account' : 'Create New Account'}
        </h3>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        {message && <p className="text-green-500 text-sm mt-2">{message}</p>}
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
            {!isLogin && (
              <p className="text-sm text-muted-foreground mt-1">
                Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.
              </p>
            )}
            {!isLogin && (
              <div className="mt-2">
                <span className={`text-sm ${
                  getPasswordStrength(password) === 'Weak' ? 'text-red-500' :
                  getPasswordStrength(password) === 'Medium' ? 'text-yellow-500' :
                  'text-green-500'
                }`}>
                  Password strength: {getPasswordStrength(password)}
                </span>
              </div>
            )}
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
        {isLogin && (
          <div className="mt-4 text-center">
            <Link href="/forgot-password" className="text-sm text-primary hover:underline">
              Forgot Password?
            </Link>
          </div>
        )}
        <div className="mt-4">
          <Button
            onClick={handleGoogleSignIn}
            className="w-full bg-secondary text-secondary-foreground"
          >
           <div className="flex justify-center items-center h-full">
            <FaGoogle />&nbsp;Sign in with Google
          </div>
          </Button>
        </div>
      </div>
    </div>
  )
}