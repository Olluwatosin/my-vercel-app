import mongoose, { Document, Model } from 'mongoose'

interface IProduct extends Document {
  name: string
  price: string
  note: string
  category: string
  inStock: boolean
  image?: string
  video?: string
  mediaType: 'image' | 'video'
  thumbnail?: string
  type: 'product' | 'hair'
}

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  note: { type: String, required: true },
  category: { type: String, required: true },
  inStock: { type: Boolean, default: true },
  image: { type: String },
  video: { type: String },
  mediaType: { type: String, enum: ['image', 'video'], default: 'image' },
  thumbnail: { type: String },
  type: { type: String, enum: ['product', 'hair'], default: 'product' }
}, {
  timestamps: true
})

const Product: Model<IProduct> = mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema)
export default Product