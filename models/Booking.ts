import mongoose, { Document, Model } from 'mongoose'

interface IBooking extends Document {
  name: string
  phone: string
  email: string
  service: string
  date: Date
  time: string
  notes?: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
}

const BookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  service: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  notes: { type: String },
  status: { type: String, enum: ['pending', 'confirmed', 'completed', 'cancelled'], default: 'pending' }
}, {
  timestamps: true
})

const Booking: Model<IBooking> = mongoose.models.Booking || mongoose.model<IBooking>('Booking', BookingSchema)
export default Booking