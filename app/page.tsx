'use client'
import { useState, useEffect } from 'react'
import Hero from '../components/Hero'
import ProductGallery from '../components/ProductGallery'
import Testimonials from '../components/Testimonials'
import BeforeAfter from '../components/BeforeAfter'
import Link from 'next/link'
import services from '../data/services.json'
import products from '../data/products.json'
import hair from '../data/hair.json'

export default function HomePage() {
  return (
    <div className="space-y-0">
      <Hero />
      
      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="section-title mb-4">Our Premium Services</h2>
            <p className="text-gray-600 text-lg">Professional beauty treatments tailored just for you</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.slice(0,6).map((service, i) => (
              <div key={i} className="card group">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">💅</div>
                <h3 className="font-bold text-xl mb-2 group-hover:text-brand transition-colors">{service.name}</h3>
                <p className="text-gray-600 mb-3">{service.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>⏱️ {service.duration}</span>
                  <span className="badge">{service.category || 'Beauty'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-brand">{service.price}</span>
                  <button className="btn-primary text-sm">Book Now</button>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/services" className="btn-secondary">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Products Gallery */}
      <ProductGallery 
        products={products} 
        title="Shop Hair Products" 
        viewAllLink="/products"
      />

      {/* Before/After Showcase */}
      <BeforeAfter />

      {/* Hair Types Section */}
      <section className="py-16 bg-gradient-to-br from-brand/5 to-purple-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="section-title mb-4">Premium Human Hair</h2>
            <p className="text-gray-600 text-lg">Authentic, high-quality hair for your perfect look</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {hair.slice(0,6).map((hairType, i) => (
              <div key={i} className="card group">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">💇‍♀️</div>
                <h3 className="font-bold text-xl mb-2 group-hover:text-brand transition-colors">{hairType.name}</h3>
                <p className="text-gray-600 mb-4">{hairType.note}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-brand">{hairType.price}</span>
                  <button className="btn-primary text-sm">Shop Now</button>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/hair" className="btn-secondary">
              Browse All Hair Types
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-brand to-brand-dark">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready for Your Transformation?
          </h2>
          <p className="text-brand-light text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied clients who trust DAMZZ Beauty Lounge for their beauty needs.
            Book your appointment today and experience luxury like never before.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/appointment" className="btn bg-white text-brand hover:bg-gray-100">
              Book Appointment
            </Link>
            <Link href="/services" className="btn border-2 border-white text-white hover:bg-white hover:text-brand">
              Explore Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
