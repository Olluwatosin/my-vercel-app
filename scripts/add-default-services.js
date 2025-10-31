const mongoose = require('mongoose')
require('dotenv').config({ path: '.env.local' })

const ServiceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  duration: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String },
  isActive: { type: Boolean, default: true }
}, {
  timestamps: true
})

const Service = mongoose.models.Service || mongoose.model('Service', ServiceSchema)

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
    name: "Full Lace Wig Installation",
    description: "Complete full lace wig installation with 360-degree natural look and professional styling.",
    price: 20000,
    duration: "3-4 hours",
    category: "Hair",
    isActive: true
  },
  {
    name: "Hair Coloring",
    description: "Professional hair coloring service with premium products. Includes consultation and aftercare.",
    price: 12000,
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
    name: "Nail Art Design",
    description: "Creative nail art designs with premium materials and professional techniques.",
    price: 4000,
    duration: "45 minutes",
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
    name: "Eyebrow Shaping & Tinting",
    description: "Professional eyebrow shaping and tinting for perfectly defined brows.",
    price: 5000,
    duration: "30 minutes",
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
  },
  {
    name: "Nail Technician Training",
    description: "Professional nail technician certification course covering all aspects of nail care and art.",
    price: 35000,
    duration: "1 week",
    category: "Training",
    isActive: true
  }
]

async function addDefaultServices() {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('Connected to MongoDB')
    
    // Clear existing services
    await Service.deleteMany({})
    console.log('Cleared existing services')
    
    // Add default services
    await Service.insertMany(defaultServices)
    console.log('Added default services successfully!')
    
    const count = await Service.countDocuments()
    console.log(`Total services in database: ${count}`)
    
  } catch (error) {
    console.error('Error adding default services:', error)
  } finally {
    await mongoose.disconnect()
    console.log('Disconnected from MongoDB')
  }
}

addDefaultServices()