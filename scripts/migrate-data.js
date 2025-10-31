require('dotenv').config({ path: '.env.local' })
const mongoose = require('mongoose')
const products = require('../data/products.json')
const hair = require('../data/hair.json')

// Product Schema
const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  note: { type: String, required: true },
  category: { type: String, required: true },
  inStock: { type: Boolean, default: true },
  image: { type: String },
  type: { type: String, enum: ['product', 'hair'], default: 'product' }
}, {
  timestamps: true
})

const Product = mongoose.model('Product', ProductSchema)

async function migrateData() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('Connected to MongoDB')

    // Clear existing data
    await Product.deleteMany({})
    console.log('Cleared existing products')

    // Add products
    const productData = products.map(p => ({ ...p, type: 'product' }))
    await Product.insertMany(productData)
    console.log(`Added ${productData.length} products`)

    // Add hair types
    const hairData = hair.map(h => ({ ...h, type: 'hair', category: 'Human Hair' }))
    await Product.insertMany(hairData)
    console.log(`Added ${hairData.length} hair types`)

    console.log('Migration completed successfully!')
    process.exit(0)
  } catch (error) {
    console.error('Migration failed:', error)
    process.exit(1)
  }
}

migrateData()