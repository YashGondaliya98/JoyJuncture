import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
  // BASIC INFO
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ["board", "puzzle", "arcade", "card"],
    required: true
  },
  
  // GAME LOGIC
  points: {
    type: Number,
    default: 50
  },
  status: {
    type: String,
    enum: ["active", "blocked"],
    default: "active"
  },
  
  // PLAYER INFO
  minPlayers: {
    type: Number,
    required: true
  },
  maxPlayers: {
    type: Number,
    required: true
  },
  durationMinutes: {
    type: Number,
    required: true
  },
  
  // REVIEWS (FOR FUTURE USE)
  reviews: {
    type: [{
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      userName: String,
      rating: {
        type: Number,
        min: 1,
        max: 5
      },
      comment: String,
      reviewedAt: {
        type: Date,
        default: Date.now
      }
    }],
    default: []
  },
  
  // META
  createdByAdminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  blockedAt: {
    type: Date,
    default: null
  },
  
  // FLAGS
  isDeleted: {
    type: Boolean,
    default: false
  }
}, { collection: 'games' });

export default mongoose.model("Game", gameSchema);