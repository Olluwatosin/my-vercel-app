import type { Metadata, Viewport } from 'next'
import './globals.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import WhatsAppFloat from '../components/WhatsAppFloat'

export const metadata: Metadata = {
  title: 'DAMZZ BEAUTY LOUNGE | Salon & Beauty',
  description: 'Luxury hair, installs, nails & training in Abuja.',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' }
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }]
  },
  openGraph: {
    title: 'DAMZZ BEAUTY LOUNGE',
    description: 'Luxury hair, installs, nails & training in Abuja.',
    images: ['/og-1200x630.png'],
    type: 'website'
  },
  manifest: '/site.webmanifest'
}

// ✅ Move themeColor here (NOT in metadata)
export const viewport: Viewport = {
  themeColor: '#000000'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="py-0">{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  )
}
