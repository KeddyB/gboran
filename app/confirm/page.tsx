'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function ConfirmPage() {
  const [message, setMessage] = useState('Confirming your email...')
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  useEffect(() => {
    if (token) {
      fetch(`/api/auth/confirm?token=${token}`)
        .then((res) => res.json())
        .then((data) => {
          setMessage(data.message)
          setTimeout(() => router.push('/login'), 3000)
        })
        .catch(() => {
          setMessage('Error confirming email. Please try again.')
        })
    } else {
      setMessage('Invalid confirmation link.')
    }
  }, [token, router])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 text-center bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Email Confirmation</h1>
        <p>{message}</p>
      </div>
    </div>
  )
}