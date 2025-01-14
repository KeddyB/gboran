'use client'

import { useEffect, useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { Button } from "@/components/ui/button"

const PaystackButton = dynamic(() => import('react-paystack').then((mod) => mod.PaystackButton), {
  ssr: false,
})

export default function PaymentPage() {
  const { data: session, update } = useSession()
  const router = useRouter()
  const [paymentSuccess, setPaymentSuccess] = useState(false)

  useEffect(() => {
    if (session?.user?.hasPaid) {
      router.push('/')
    }
  }, [session, router])

  const handlePaymentSuccess = async (reference: any) => {
    try {
      // Update user's payment status in Sanity
      const res = await fetch('/api/update-payment-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: session?.user?.id, paymentReference: reference }),
      })

      if (res.ok) {
        setPaymentSuccess(true)
        await update({ hasPaid: true })
        setTimeout(() => {
          signOut({ callbackUrl: '/login' })
        }, 5000)
      } else {
        alert('Error updating payment status')
      }
    } catch (error) {
      console.error('Payment update error:', error)
      alert('Error processing payment')
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

  if (!session || session.user?.hasPaid) return null

  if (paymentSuccess) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="p-8 bg-card text-card-foreground rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-4">Payment Successful!</h1>
          <p className="mb-4">Thank you for your payment. You will be logged out in 5 seconds. Please log in again to access the full content.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="p-8 bg-card text-card-foreground rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Complete Your Payment</h1>
        <p className="mb-4">Please pay 1000 Naira to access the full content.</p>
        <PaystackButton {...componentProps} className="bg-primary text-primary-foreground px-4 py-2 rounded" />
      </div>
    </div>
  )
}
