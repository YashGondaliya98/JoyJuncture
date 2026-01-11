import mongoose from "mongoose";

const functionSchema = new mongoose.Schema({
  // BASIC INFO
  eventName: {
    type: String,
    required: true
  },
  eventType: {
    type: String,
    enum: ["wedding", "gamenight", "workshop"],
    required: true
  },
  eventDate: {
    type: Date,
    required: true
  },
  peopleCount: {
    type: Number,
    required: true
  },
  
  // RELATIONS
  venueId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Venue',
    required: true
  },
  createdByUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  // STATUS
  status: {
    type: String,
    enum: ["upcoming", "completed", "cancelled"],
    default: "upcoming"
  },
  
  // REVIEWS (EXTENDED FIELDS)
  reviewsCount: {
    type: Number,
    default: 0
  },
  averageRating: {
    type: Number,
    default: 0
  },
  hasReviews: {
    type: Boolean,
    default: false
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
}, { collection: 'functions' });

export default mongoose.model("Function", functionSchema);