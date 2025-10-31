'use client'
import { useState, useEffect } from 'react'

const testimonials = [
  {
    name: "Adunni Okafor",
    service: "Hair Installation",
    rating: 5,
    text: "Absolutely amazing! The team at DAMZZ transformed my look completely. The hair installation was flawless and lasted for months. Highly recommend!",
    image: "👩🏾"
  },
  {
    name: "Kemi Adeleke",
    service: "Wig Revamping",
    rating: 5,
    text: "My old wig looked brand new after their revamping service. The attention to detail is incredible. Will definitely be back!",
    image: "👩🏿"
  },
  {
    name: "Funmi Lagos",
    service: "Braids & Nails",
    rating: 5,
    text: "Got my braids and nails done in one session. The quality is top-notch and the atmosphere is so relaxing. Love this place!",
    image: "👩🏽"
  },
  {
    name: "Blessing Abuja",
    service: "Beauty Treatment",
    rating: 5,
    text: "The facial treatment was heavenly! My skin has never looked better. The staff is professional and the environment is luxurious.",
    image: "👩🏾"
  }
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="py-16 bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="section-title mb-4">What Our Clients Say</h2>
          <p className="text-gray-600 text-lg">Real experiences from our beautiful clients</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-sm shadow-2xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 p-8 md:p-12">
                  <div className="text-center">
                    <div className="text-6xl mb-4">{testimonial.image}</div>
                    <div className="flex justify-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i} className="text-yellow-400 text-2xl">⭐</span>
                      ))}
                    </div>
                    <blockquote className="text-xl md:text-2xl text-gray-700 mb-6 italic leading-relaxed">
                      "{testimonial.text}"
                    </blockquote>
                    <div>
                      <p className="font-bold text-lg text-gray-900">{testimonial.name}</p>
                      <p className="text-brand font-medium">{testimonial.service}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation dots */}
            <div className="flex justify-center space-x-2 pb-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentIndex ? 'bg-brand scale-125' : 'bg-gray-300'
                  }`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}