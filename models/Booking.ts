import mongoose from 'mongoose'

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

export default mongoose.models.Booking || mongoose.model('Booking', BookingSchema)