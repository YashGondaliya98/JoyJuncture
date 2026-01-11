import mongoose from "mongoose";

const venueSchema = new mongoose.Schema({
  // BASIC INFO
  name: {
    type: String,
    required: true
  },
  capacity: {
    type: Number,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  
  // STATUS & BOOKING
  status: {
    type: String,
    enum: ["available", "booked"],
    default: "available"
  },
  bookedDates: {
    type: [Date],
    default: []
  },
  bookedBy: {
    type: mongoose.Schema.Types.ObjectId,
    default: null
  },
  
  // META
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  
  // FLAGS
  isDeleted: {
    type: Boolean,
    default: false
  }
}, { collection: 'venues' });

export default mongoose.model("Venue", venueSchema);