import Link from 'next/link'
import Image from 'next/image'

export default function Hero() {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-black text-white p-8 md:p-12">
      {/* soft gold glow */}
      <div className="pointer-events-none absolute -right-10 -bottom-14 h-72 w-72 md:h-[28rem] md:w-[28rem] rounded-full blur-3xl" style={{background:'radial-gradient(closest-side, rgba(255,215,0,0.25), transparent)'}} />
      {/* subtle top glow */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full blur-3xl" style={{background:'radial-gradient(closest-side, rgba(255,215,0,0.18), transparent)'}} />

      <div className="grid md:grid-cols-[140px_1fr] gap-6 items-center">
        <div className="hidden md:block">
          <Image
            src="/logo-main.jpg"
            alt="DAMZZ BEAUTY LOUNGE"
            width={140}
            height={140}
            className="rounded-md object-contain bg-black/0"
            priority
          />
        </div>

        <div>
          <p className="inline-block text-xs px-3 py-1 rounded-full bg-white/10 backdrop-blur">
            Salon • Beauty • Store
          </p>
          <h1 className="mt-3 text-4xl md:text-5xl font-extrabold tracking-wide">
            DAMZZ BEAUTY LOUNGE
          </h1>
          <p className="mt-3 text-white/90 md:text-lg">
            Step into luxury — experience professional hair installation, wig revamping, braids, nails, and
            beauty treatments at their finest.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/services" className="btn bg-white text-black hover:bg-white/90">Explore Services</Link>
            <Link href="/appointment" className="btn bg-gradient-to-r from-pink-600 to-purple-600 text-white hover:opacity-90">
              Book Appointment
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
