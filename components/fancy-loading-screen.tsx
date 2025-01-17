import React from 'react'

export function FancyLoadingScreen() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background">
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 border-4 border-t-primary border-r-primary border-b-transparent border-l-transparent rounded-full animate-spin"></div>
        <div className="absolute inset-2 border-4 border-t-secondary border-r-secondary border-b-transparent border-l-transparent rounded-full animate-spin-reverse"></div>
        <div className="absolute inset-4 border-4 border-t-accent border-r-accent border-b-transparent border-l-transparent rounded-full animate-pulse"></div>
      </div>
    </div>
  )
}