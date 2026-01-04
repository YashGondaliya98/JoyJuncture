import mongoose from 'mongoose';

const venueSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  capacity: {
    type: Number,
    required: true,
    min: 1
  },
  status: {
    type: String,
    enum: ['available', 'booked'],
    default: 'available'
  },
  bookedDate: {
    type: Date,
    default: null
  },
  eventDetails: {
    eventName: String,
    numberOfPeople: Number,
    eventType: String
  }
}, {
  timestamps: true
});

export default mongoose.model('Venue', venueSchema);