'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/75 backdrop-blur">
      <div className="container flex items-center justify-between py-3 sm:py-4">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2 sm:gap-3">
          <Image
            src="/logo-main.jpg"
            alt="DAMZZ BEAUTY LOUNGE"
            width={40}
            height={40}
            className="h-8 sm:h-11 w-auto object-contain rounded-sm"
            priority
          />
          <div className="leading-tight">
            <p className="font-bold text-sm sm:text-base md:text-lg tracking-wide text-white">
              DAMZZ BEAUTY LOUNGE
            </p>
            <p className="text-[10px] sm:text-[11px] md:text-xs text-gray-300">Salon • Beauty • Store</p>
          </div>
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white p-2"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-5 text-sm font-medium">
          <Link href="/services" className="text-gray-300 hover:text-yellow-300 transition-colors">
            Services
          </Link>
          <Link href="/products" className="text-gray-300 hover:text-yellow-300 transition-colors">
            Hair Products
          </Link>
          <Link href="/hair" className="text-gray-300 hover:text-yellow-300 transition-colors">
            Human Hair
          </Link>
          <Link
            href="/appointment"
            className="rounded-full px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold hover:opacity-90 transition"
          >
            Book Appointment
          </Link>
        </nav>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur border-t border-white/10">
          <nav className="container py-4 space-y-3">
            <Link 
              href="/services" 
              className="block text-gray-300 hover:text-yellow-300 transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Services
            </Link>
            <Link 
              href="/products" 
              className="block text-gray-300 hover:text-yellow-300 transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Hair Products
            </Link>
            <Link 
              href="/hair" 
              className="block text-gray-300 hover:text-yellow-300 transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Human Hair
            </Link>
            <Link
              href="/appointment"
              className="block w-full text-center rounded-full px-4 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold hover:opacity-90 transition mt-4"
              onClick={() => setIsOpen(false)}
            >
              Book Appointment
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
