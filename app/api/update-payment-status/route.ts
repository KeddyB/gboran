import { NextResponse } from 'next/server'
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXTPUBLICSANITYDATASET,
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.NEXTPUBLICSANITYTOKEN,
})

export async function POST(req: Request) {


  try {
    const { userId, paymentReference } = await req.json()

    await client
      .patch(userId)
      .set({ hasPaid: true })
      .commit()

    return NextResponse.json({ message: 'Payment status updated successfully' })
  } catch (error) {
    console.error('Error updating payment status:', error)
    return NextResponse.json({ message: 'Error updating payment status' }, { status: 500 })
  }
}