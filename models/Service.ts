import mongoose from 'mongoose'

export interface IService {
  _id?: string
  name: string
  description: string
  price: number
  duration: string
  category: string
  image?: string
  isActive: boolean
  createdAt?: Date
  updatedAt?: Date
}

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

export default mongoose.models.Service || mongoose.model('Service', ServiceSchema)