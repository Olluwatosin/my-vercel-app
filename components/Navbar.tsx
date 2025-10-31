import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/75 backdrop-blur">
      <div className="container flex items-center justify-between py-4">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo-main.jpg"        // black-background logo in /public
            alt="DAMZZ BEAUTY LOUNGE"
            width={44}
            height={44}
            className="h-11 w-auto object-contain rounded-sm"
            priority
          />
          <div className="leading-tight">
            <p className="font-bold text-base md:text-lg tracking-wide text-white">
              DAMZZ BEAUTY LOUNGE
            </p>
            <p className="text-[11px] md:text-xs text-gray-300">Salon • Beauty • Store</p>
          </div>
        </Link>

        {/* Nav */}
        <nav className="flex items-center gap-5 text-sm font-medium">
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
    </header>
  )
}
