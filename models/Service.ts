import mongoose from 'mongoose'

export interface IService {
  _id?: string
  name: string
  description: string
  price: number
  duration: string
  category: string
  image?: string
  video?: string
  mediaType?: 'image' | 'video'
  thumbnail?: string
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
  video: { type: String },
  mediaType: { type: String, enum: ['image', 'video'], default: 'image' },
  thumbnail: { type: String },
  isActive: { type: Boolean, default: true }
}, {
  timestamps: true
})

const Service = mongoose.models.Service || mongoose.model('Service', ServiceSchema)
export default Service