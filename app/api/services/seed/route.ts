import { NextResponse } from 'next/server'
import { connectDB } from '../../../../lib/mongodb'
import Service from '../../../../models/Service'

const defaultServices = [
  {
    name: "Hair Cut & Styling",
    description: "Professional hair cutting and styling for all hair types. Includes wash, cut, and blow dry.",
    price: 8000,
    duration: "1.5 hours",
    category: "Hair",
    isActive: true
  },
  {
    name: "Lace Front Wig Installation",
    description: "Expert installation of lace front wigs with natural hairline blending and styling.",
    price: 15000,
    duration: "2-3 hours",
    category: "Hair",
    isActive: true
  },
  {
    name: "Manicure & Pedicure",
    description: "Complete nail care service including cuticle care, shaping, and polish application.",
    price: 6000,
    duration: "1 hour",
    category: "Nails",
    isActive: true
  },
  {
    name: "Gel Nail Extensions",
    description: "Long-lasting gel nail extensions with custom length and shape. Includes nail art.",
    price: 10000,
    duration: "1.5 hours",
    category: "Nails",
    isActive: true
  },
  {
    name: "Makeup Application",
    description: "Professional makeup application for events, photoshoots, or special occasions.",
    price: 15000,
    duration: "1 hour",
    category: "Beauty",
    isActive: true
  },
  {
    name: "Hair Styling Training Course",
    description: "Comprehensive hair styling training course covering cutting, styling, and wig installation techniques.",
    price: 50000,
    duration: "2 weeks",
    category: "Training",
    isActive: true
  }
]

export async function POST() {
  try {
    await connectDB()
    
    const existingCount = await Service.countDocuments()
    if (existingCount > 0) {
      return NextResponse.json({ 
        success: false, 
        message: `${existingCount} services already exist` 
      })
    }
    
    await Service.insertMany(defaultServices)
    
    return NextResponse.json({ 
      success: true, 
      message: `Added ${defaultServices.length} default services` 
    })
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to seed services' 
    }, { status: 500 })
  }
}