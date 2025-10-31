'use client'
import { useState } from 'react'

export default function WhatsAppFloat() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative">
        {/* Close button */}
        <button
          onClick={() => setIsVisible(false)}
          className="absolute -top-2 -right-2 w-6 h-6 bg-gray-600 text-white rounded-full text-xs hover:bg-gray-700 transition-colors z-10"
        >
          ×
        </button>
        
        {/* WhatsApp button */}
        <a
          href="https://wa.me/2349016469984?text=Hi! I'd like to book an appointment at DAMZZ Beauty Lounge"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 bg-green-500 text-white px-4 py-3 rounded-full shadow-2xl hover:bg-green-600 transition-all duration-300 hover:scale-105 animate-pulse-slow"
        >
          <div className="text-2xl">💬</div>
          <div className="hidden sm:block">
            <p className="font-semibold text-sm">Chat with us!</p>
            <p className="text-xs opacity-90">Book your appointment</p>
          </div>
        </a>
      </div>
    </div>
  )
}