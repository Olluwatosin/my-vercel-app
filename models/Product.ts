import mongoose from 'mongoose'

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

export default mongoose.models.Product || mongoose.model('Product', ProductSchema)