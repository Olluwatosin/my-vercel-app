import { NextResponse } from 'next/server'
import { connectDB } from '../../../../lib/mongodb'
import Service from '../../../../models/Service'

const defaultServices = [
  {
    name: "Hair Cut & Styling",
    description: "Professional hair cutting and styling for all hair types. Includes wash, cut, and blow dry.",
    price: 5000,
    duration: "1 hour",
    category: "Hair",
    isActive: true
  },
  {
    name: "Wig Installation (Lace Front)",
    description: "Expert installation of lace front wigs with natural hairline blending and styling.",
    price: 8000,
    duration: "2 hours",
    category: "Hair",
    isActive: true
  },
  {
    name: "Hair Washing & Blow Dry",
    description: "Professional hair washing with premium products and expert blow dry styling.",
    price: 3000,
    duration: "45 minutes",
    category: "Hair",
    isActive: true
  },
  {
    name: "Manicure",
    description: "Complete manicure service including cuticle care, shaping, and polish application.",
    price: 3500,
    duration: "45 minutes",
    category: "Nails",
    isActive: true
  },
  {
    name: "Pedicure",
    description: "Relaxing pedicure service with foot care, nail shaping, and polish.",
    price: 4000,
    duration: "1 hour",
    category: "Nails",
    isActive: true
  },
  {
    name: "Gel Nails",
    description: "Long-lasting gel nail application with professional finish.",
    price: 6000,
    duration: "1 hour",
    category: "Nails",
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