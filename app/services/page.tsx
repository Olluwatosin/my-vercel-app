'use client'
import { useState, useEffect } from 'react'
import { IService } from '@/models/Service'

export default function ServicesPage() {
  const [services, setServices] = useState<IService[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

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
      setIsLoading(false)
    }
  }

  const categories = ['All', ...Array.from(new Set(services.map(service => service.category)))]
  const filteredServices = selectedCategory === 'All' 
    ? services 
    : services.filter(service => service.category === selectedCategory)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading services...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Our Services
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Professional beauty and hair services with transparent pricing
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-semibold transition-colors ${
                selectedCategory === category
                  ? 'bg-pink-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-pink-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div key={service._id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              {service.image && (
                <img 
                  src={service.image} 
                  alt={service.name}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-semibold text-gray-800">{service.name}</h3>
                  <span className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {service.category}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {service.description}
                </p>
                
                <div className="flex justify-between items-center mb-4">
                  <div className="text-2xl font-bold text-green-600">
                    ₦{service.price.toLocaleString()}
                  </div>
                  <div className="text-gray-500 text-sm">
                    ⏱️ {service.duration}
                  </div>
                </div>
                
                <a
                  href={`https://wa.me/2349016469984?text=Hi! I'd like to book ${service.name} (₦${service.price.toLocaleString()})`}
                  className="block w-full bg-pink-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-pink-700 transition-colors"
                >
                  Book Now
                </a>
              </div>
            </div>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">💇♀️</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No services found</h3>
            <p className="text-gray-500">
              {selectedCategory === 'All' 
                ? 'No services available at the moment.' 
                : `No services found in ${selectedCategory} category.`}
            </p>
          </div>
        )}

        {/* Contact Section */}
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Need a Custom Service?
          </h2>
          <p className="text-gray-600 mb-6">
            Don't see what you're looking for? Contact us for custom services and packages.
          </p>
          <a
            href="https://wa.me/2349016469984?text=Hi! I'd like to inquire about custom services"
            className="inline-block bg-green-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-600 transition-colors"
          >
            📱 WhatsApp Us
          </a>
        </div>
      </div>
    </div>
  )
}