'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import {Button}  from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isLogin && password !== confirmPassword) {
      alert("Passwords don't match")
      return
    }

    if (isLogin) {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      })
      if (result?.error) {
        alert(result.error)
      } else {
        router.push('/')
      }
    } else {
      // Register new user
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      })
      if (res.ok) {
        setIsLogin(true)
      } else {
        alert('Registration failed')
      }
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
        <h3 className="text-2xl font-bold text-center">
          {isLogin ? 'Login to Your Account' : 'Create New Account'}
        </h3>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="mt-4">
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                placeholder="Name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}
          <div className="mt-4">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              placeholder="Email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mt-4">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              placeholder="Password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {!isLogin && (
            <div className="mt-4">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                type="password"
                placeholder="Confirm Password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          )}
          <div className="flex items-baseline justify-between">
            <Button type="submit" className="mt-4">
              {isLogin ? 'Login' : 'Register'}
            </Button>
            <Button
              type="button"
              variant="link"
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm"
            >
              {isLogin ? 'Create an account' : 'Already have an account?'}
            </Button>
          </div>
        </form>
        <div className="mt-4">
          <Button
            onClick={() => signIn('google')}
            className="w-full"
            variant="outline"
          >
            Sign in with Google
          </Button>
        </div>
      </div>
    </div>
  )
}