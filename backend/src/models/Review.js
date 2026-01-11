import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  // REFERENCES
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Function",
    required: true
  },
  eventType: {
    type: String,
    enum: ["wedding", "gaming", "workshop"],
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  
  // REVIEW DATA
  userName: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    default: ""
  },
  
  // STATUS & META
  status: {
    type: String,
    enum: ["active", "hidden"],
    default: "active"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { collection: 'reviews' });

export default mongoose.model("Review", reviewSchema);