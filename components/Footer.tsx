import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-gray-100 bg-gradient-to-br from-gray-50 to-white">
      <div className="container py-12 grid gap-8 md:grid-cols-3 text-sm text-gray-700">
        
        {/* Brand Info */}
        <div className="flex flex-col items-start">
          <Image
            src="/logo-white-bg.jpg"
            alt="DAMZZ BEAUTY LOUNGE"
            width={160}
            height={80}
            className="object-contain mb-4"
            priority
          />
          <p className="text-gray-600 leading-relaxed">
            Your one-stop beauty and hair lounge in Abuja. 
            We offer luxury human hair, wig installations, nails, and professional beauty training—where style meets perfection.
          </p>
        </div>

        {/* Contact Info */}
        <div>
          <p className="font-semibold mb-2 text-gray-800">📍 Contact Us</p>
          <p>14 Plaza, Shop 4</p>
          <p>After Abuja Unity Hospital</p>
          <p>Lugbe FHA, Abuja, Nigeria</p>

          <p className="mt-3">
            📞 <a href="https://wa.me/2349016469984" target="_blank" className="text-pink-600 hover:underline">09016469984</a>
          </p>
          <p>
            📸 <a href="https://instagram.com/damzz_beautylounge" target="_blank" className="text-pink-600 hover:underline">@damzz_beautylounge</a>
          </p>
          <p className="mt-2 text-xs text-gray-500">
            Open Monday–Saturday • 9AM – 8PM
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <p className="font-semibold mb-2 text-gray-800">Quick Links</p>
          <ul className="space-y-1">
            <li><a href="/services" className="hover:text-pink-600 transition-colors">Services</a></li>
            <li><a href="/products" className="hover:text-pink-600 transition-colors">Hair Products</a></li>
            <li><a href="/hair" className="hover:text-pink-600 transition-colors">Human Hair</a></li>
            <li><a href="/appointment" className="hover:text-pink-600 transition-colors">Book Appointment</a></li>
            <li><a href="/admin" className="hover:text-pink-600 transition-colors text-xs">Admin (Staff Only)</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 bg-white/70 py-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} DAMZZ BEAUTY LOUNGE. All rights reserved. |
        Built with ❤️ by <span className="font-semibold text-pink-600">SMAT Concept & Innovative Solutions</span>
      </div>
    </footer>
  )
}
