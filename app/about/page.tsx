'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useTheme } from 'next-themes'

import History from './History'
import Economy from './Economy'
import Religion from './Religion'
import Education from './Education'
import Footer from './Footer'

export default function About() {
  const { theme } = useTheme()

  return (
    <div className="min-h-screen bg-background text-foreground py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="max-w-7xl mx-auto bg-card shadow-xl transition-colors duration-200">
        {/* Top mini articles */}
        <div className="grid grid-cols-3 gap-4 p-4 border-b border-border">
          <div className="flex gap-2">
            <Image 
              src="/oke.png" 
              alt="Festival celebration" 
              width={60} 
              height={60}
              className="object-cover"
            />
            <div className="text-xs">
              <h3 className="font-bold">Annual Olunhundole Festival</h3>
              <p>Traditional celebration brings community together</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Image 
              src="/landscape.jpg"
              alt="Education" 
              width={60} 
              height={60}
              className="object-cover"
            />
            <div className="text-xs">
              <h3 className="font-bold">Educational Excellence</h3>
              <p>Leading quarter in academic achievements</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Image 
              src="/oke.png"
              alt="Agriculture" 
              width={60} 
              height={60}
              className="object-cover"
            />
            <div className="text-xs">
              <h3 className="font-bold">Agricultural Heritage</h3>
              <p>Thriving farming community continues tradition</p>
            </div>
          </div>
        </div>
        
        {/* Newspaper title */}
        <div className="text-center py-8 border-b-2 border-border">
          <h1 className="text-4xl font-bold">
            <span className="text-primary">ABOUT</span> OKEOGBORAN
          </h1>
          <p className="text-sm mt-2 text-muted-foreground">Supare Akoko, Ondo State, Nigeria</p>
        </div>

        {/* Main article */}
        <History />

        {/* Secondary articles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 border-t border-b-2 border-border">
          <div>
            <Link href='/about#economy' className="hover:opacity-80 transition-opacity duration-200">
              <h3 className="text-xl font-bold mb-2">Economic Vitality</h3>
              <p className="text-sm text-muted-foreground">
                Farming continues to be the backbone of Okeogboran&apos;s economy, with both short-distance 
                and long-distance farms supporting food and cash crop production. The community&apos;s 
                entrepreneurial spirit is evident in its diverse trades, from carpentry to blacksmithing.
              </p>
            </Link>
          </div>
          <div>
            <Link href='/about#religion' className="hover:opacity-80 transition-opacity duration-200">
              <h3 className="text-xl font-bold mb-2">Religious Harmony</h3>
              <p className="text-sm text-muted-foreground">
                The quarter&apos;s religious landscape has evolved from traditional worship to embrace both 
                Islam and Christianity, with notable leaders emerging from each faith tradition, 
                fostering a community of religious tolerance and understanding.
              </p>
            </Link>
          </div>
          <div>
            <Link href='/about#education' className="hover:opacity-80 transition-opacity duration-200">
              <h3 className="text-xl font-bold mb-2">Educational Excellence</h3>
              <p className="text-sm text-muted-foreground">
                Okeogboran&apos;s commitment to education has produced numerous professionals across various 
                fields, including medicine, law, engineering, and academia, maintaining its position as 
                the most educated quarter in Supare.
              </p>
            </Link>
          </div>
        </div>
        <Economy />
        <Religion />
        <Education />
        
        {/* Footer */}
        <Footer />
      </div>
    </div>
  )
}

