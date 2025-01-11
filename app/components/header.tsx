'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

const images = [
  '/landscape.jpg',
  '/ogboran.jpg',
  '/ogbo.jpg',
  '/scene.jpg'
]

export function Header() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 5000) // Change image every 5 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <header className="relative h-[100vh] flex items-center justify-center overflow-hidden">
      {images.map((src, index) => (
        <Image
          key={src}
          src={src}
          alt={`Okeogboran town image ${index + 1}`}
          fill
          className={`object-cover transition-opacity duration-1000 ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
          priority={index === 0}
        />
      ))}
      <div className="absolute inset-0 bg-black/50" /> {/* Overlay for better text visibility */}
      <div className="relative z-10 text-center space-y-6 text-white">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Welcome to Okeogboran
        </h1>
        <p className="text-lg md:text-xl">
          Discover the charm of our enchanting town
        </p>
      </div>
    </header>
  )
}