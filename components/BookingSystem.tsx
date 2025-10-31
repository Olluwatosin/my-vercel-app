'use client'
import { useState, useEffect } from 'react'
import { IService } from '../models/Service'

interface BookingData {
  name: string
  phone: string
  email: string
  service: string
  date: string
  time: string
  notes: string
}

const timeSlots = [
  '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
]

export default function BookingSystem() {
  const [step, setStep] = useState(1)
  const [services, setServices] = useState<IService[]>([])
  const [booking, setBooking] = useState<BookingData>({
    name: '', phone: '', email: '', service: '', date: '', time: '', notes: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [servicesLoading, setServicesLoading] = useState(true)

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/services')
      const data = await response.json()
      if (data.success) {
        setServices(data.services)
      }
    } catch (error) {
      console.error('Error fetching services:', error)
    } finally {
      setServicesLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(booking)
      })
      
      if (response.ok) {
        alert('Booking confirmed! We\'ll contact you soon.')
        setStep(1)
        setBooking({ name: '', phone: '', email: '', service: '', date: '', time: '', notes: '' })
      } else {
        alert('Booking failed. Please try again.')
      }
    } catch (error) {
      alert('Booking failed. Please try again.')
    }
    
    setIsSubmitting(false)
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          {[1, 2, 3].map((s) => (
            <div key={s} className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold ${
              step >= s ? 'bg-brand text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              {s}
            </div>
          ))}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-brand h-2 rounded-full transition-all duration-300" 
               style={{ width: `${(step / 3) * 100}%` }} />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Step 1: Personal Info */}
        {step === 1 && (
          <div className="animate-fadeInUp space-y-4">
            <h3 className="text-2xl font-bold text-center mb-6">Your Information</h3>
            <input
              type="text"
              placeholder="Full Name"
              className="input"
              value={booking.name}
              onChange={(e) => setBooking({...booking, name: e.target.value})}
              required
            />
            <input
              type="tel"
              placeholder="Phone Number"
              className="input"
              value={booking.phone}
              onChange={(e) => setBooking({...booking, phone: e.target.value})}
              required
            />
            <input
              type="email"
              placeholder="Email Address"
              className="input"
              value={booking.email}
              onChange={(e) => setBooking({...booking, email: e.target.value})}
              required
            />
            <button
              type="button"
              onClick={() => setStep(2)}
              className="btn-primary w-full"
              disabled={!booking.name || !booking.phone || !booking.email}
            >
              Next Step
            </button>
          </div>
        )}

        {/* Step 2: Service & Date */}
        {step === 2 && (
          <div className="animate-fadeInUp space-y-4">
            <h3 className="text-2xl font-bold text-center mb-6">Select Service & Date</h3>
            <select
              className="input"
              value={booking.service}
              onChange={(e) => setBooking({...booking, service: e.target.value})}
              required
              disabled={servicesLoading}
            >
              <option value="">{servicesLoading ? 'Loading services...' : 'Choose a service'}</option>
              {services.map((service) => (
                <option key={service._id} value={service.name}>
                  {service.name} - ₦{service.price.toLocaleString()}
                </option>
              ))}
            </select>
            <input
              type="date"
              className="input"
              value={booking.date}
              onChange={(e) => setBooking({...booking, date: e.target.value})}
              min={new Date().toISOString().split('T')[0]}
              required
            />
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  type="button"
                  className={`p-3 rounded-lg border transition-all ${
                    booking.time === time
                      ? 'bg-brand text-white border-brand'
                      : 'bg-white border-gray-300 hover:border-brand'
                  }`}
                  onClick={() => setBooking({...booking, time})}
                >
                  {time}
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <button type="button" onClick={() => setStep(1)} className="btn bg-gray-300 text-gray-700 flex-1">
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="btn-primary flex-1"
                disabled={!booking.service || !booking.date || !booking.time}
              >
                Next Step
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Confirmation */}
        {step === 3 && (
          <div className="animate-fadeInUp space-y-4">
            <h3 className="text-2xl font-bold text-center mb-6">Confirm Booking</h3>
            <div className="bg-gray-50 p-6 rounded-xl space-y-3">
              <p><strong>Name:</strong> {booking.name}</p>
              <p><strong>Phone:</strong> {booking.phone}</p>
              <p><strong>Service:</strong> {booking.service}</p>
              <p><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
              <p><strong>Time:</strong> {booking.time}</p>
            </div>
            <textarea
              placeholder="Any special requests or notes?"
              className="input h-24 resize-none"
              value={booking.notes}
              onChange={(e) => setBooking({...booking, notes: e.target.value})}
            />
            <div className="flex gap-3">
              <button type="button" onClick={() => setStep(2)} className="btn bg-gray-300 text-gray-700 flex-1">
                Back
              </button>
              <button
                type="submit"
                className="btn-secondary flex-1"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Booking...' : 'Confirm Booking'}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  )
}