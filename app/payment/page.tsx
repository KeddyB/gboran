'use client'

import { useEffect, useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { Button } from "@/components/ui/button"

const PaystackButton = dynamic(() => import('react-paystack').then((mod) => mod.PaystackButton), {
  ssr: false,
})

// Assuming FancyLoadingScreen is defined elsewhere and imported
const FancyLoadingScreen = () => <div>Fancy Loading Screen</div>;


export default function PaymentPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    } else if (session?.user?.hasPaid) {
      router.push('/')
    }
  }, [session, status, router])

  const handlePaymentSuccess = async (reference: any) => {
    try {
      if (!session?.user?.id) {
        throw new Error('User ID not found')
      }

      const res = await fetch('/api/update-payment-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          userId: session.user.id,
          paymentReference: reference 
        }),
      })

      if (res.ok) {
        setMessage('Payment successful. You will be redirected to the login page.')
        await signOut({ callbackUrl: '/' })
      } else {
        throw new Error('Error updating payment status')
      }
    } catch (error) {
      console.error('Payment update error:', error)
      setMessage('Error processing payment. Please try again.')
      router.push('/login')
    }
  }

  const componentProps = {
    email: session?.user?.email,
    amount: 100000, // Amount in kobo (1000 Naira)
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
    text: 'Pay Now',
    onSuccess: handlePaymentSuccess,
    onClose: () => alert('Payment cancelled'),
  }

  if (status === 'loading' || !session) {
    return <FancyLoadingScreen />
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="p-8 bg-card text-card-foreground rounded-lg shadow-lg">
      {message ? (
        <div>
          <p className="mb-4 text-xl font-bold text-primary text-green-600">{message}</p>
        </div>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-4">Complete Your Payment</h1>
          <p className="mb-4">Please pay 1000 Naira to access the full content.</p>
          <PaystackButton {...componentProps} className="bg-blue-500 text-primary-foreground px-4 py-2 rounded" />
        </>
      )}
      </div>
    </div>
  )
}

