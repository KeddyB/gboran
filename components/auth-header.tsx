'use client'

import { useSession, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { User, LogOut } from 'lucide-react'
import Link from 'next/link'

export function AuthHeader() {
  const { data: session } = useSession()

  return (
    <header className="bg-primary text-primary-foreground p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Okeogboran</h1>
      <div className="flex items-center space-x-4">
        {session && (
          <>
            <Link href="/account">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            <Button onClick={() => signOut()} variant="outline" size="icon">
              <LogOut className="h-5 w-5" />
            </Button>
          </>
        )}
      </div>
    </header>
  )
}