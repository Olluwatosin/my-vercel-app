import { NextResponse } from 'next/server'
import { connectDB } from '../../../../lib/mongodb'
import Service from '../../../../models/Service'

const defaultServices = [
  {
    name: "Hair Cut & Styling",
    description: "Professional hair cutting and styling service",
    price: 1000,
    duration: "1 hour",
    category: "Hair",
    isActive: true
  },
  {
    name: "Wig Installation",
    description: "Professional wig installation service",
    price: 1000,
    duration: "1 hour",
    category: "Hair",
    isActive: true
  },
  {
    name: "Hair Washing & Blow Dry",
    description: "Hair washing and blow dry service",
    price: 1000,
    duration: "1 hour",
    category: "Hair",
    isActive: true
  },
  {
    name: "Hair Braiding",
    description: "Professional hair braiding service",
    price: 1000,
    duration: "1 hour",
    category: "Hair",
    isActive: true
  },
  {
    name: "Hair Treatment",
    description: "Deep conditioning and hair treatment",
    price: 1000,
    duration: "1 hour",
    category: "Hair",
    isActive: true
  },
  {
    name: "Manicure",
    description: "Professional manicure service",
    price: 1000,
    duration: "1 hour",
    category: "Nails",
    isActive: true
  },
  {
    name: "Pedicure",
    description: "Professional pedicure service",
    price: 1000,
    duration: "1 hour",
    category: "Nails",
    isActive: true
  },
  {
    name: "Gel Nails",
    description: "Gel nail application service",
    price: 1000,
    duration: "1 hour",
    category: "Nails",
    isActive: true
  },
  {
    name: "Nail Art",
    description: "Creative nail art and design",
    price: 1000,
    duration: "1 hour",
    category: "Nails",
    isActive: true
  },
  {
    name: "Makeup Application",
    description: "Professional makeup service",
    price: 1000,
    duration: "1 hour",
    category: "Beauty",
    isActive: true
  },
  {
    name: "Eyebrow Shaping",
    description: "Eyebrow shaping and styling",
    price: 1000,
    duration: "1 hour",
    category: "Beauty",
    isActive: true
  },
  {
    name: "Facial Treatment",
    description: "Professional facial treatment",
    price: 1000,
    duration: "1 hour",
    category: "Beauty",
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