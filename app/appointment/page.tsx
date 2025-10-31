import BookingSystem from '../../components/BookingSystem'

export default function AppointmentPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand/5 via-white to-purple-50 py-12">
      <div className="container">
        <div className="text-center mb-12">
          <h1 className="section-title mb-6">Book Your Appointment</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Ready to transform your look? Schedule your appointment with our expert stylists and experience luxury beauty treatments.
          </p>
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8">
          <BookingSystem />
        </div>
        
        {/* Contact Info */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl mb-4">📍</div>
            <h3 className="font-bold text-lg mb-2">Location</h3>
            <p className="text-gray-600">Abuja, Nigeria</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">⏰</div>
            <h3 className="font-bold text-lg mb-2">Hours</h3>
            <p className="text-gray-600">Mon-Sat: 9AM-6PM<br/>Sunday: Closed</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">📞</div>
            <h3 className="font-bold text-lg mb-2">Contact</h3>
            <p className="text-gray-600">
              <a className="text-brand hover:underline" target="_blank" href="https://wa.me/2349016469984">WhatsApp: 09016469984</a><br/>
              <a className="text-brand hover:underline" target="_blank" href="https://instagram.com/damzz_beautylounge">@damzz_beautylounge</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}