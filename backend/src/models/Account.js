import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  // BASIC INFO
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  },
  city: {
    type: String,
    default: "Surat, Gujarat"
  },
  
  // ACCOUNT STATUS
  status: {
    type: String,
    default: "active"
  },
  isActive: {
    type: Boolean,
    default: true
  },
  
  // DATES
  joinedAt: {
    type: Date,
    default: Date.now
  },
  lastLogin: {
    type: Date,
    default: null
  },
  
  // GAME & WALLET
  joyPoints: {
    type: Number,
    default: 10
  },
  walletValue: {
    type: Number,
    default: function() { return this.joyPoints || 10; }
  },
  
  // PROFILE DISPLAY
  playerStatus: {
    type: String,
    default: "Beginner"
  },
  avatarText: {
    type: String
  },
  
  // USER HISTORY
  purchasedGames: {
    type: [String],
    default: []
  },
  ownedGames: {
    type: [String],
    default: []
  },
  gameTrials: {
    type: {
      wordGuess: { type: Number, default: 0 },
      memoryMatch: { type: Number, default: 0 },
      quickMath: { type: Number, default: 0 }
    },
    default: {
      wordGuess: 0,
      memoryMatch: 0,
      quickMath: 0
    }
  },
  createdEvents: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Function' }],
    default: []
  },
  attendedEvents: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Function' }],
    default: []
  },
  reviewedEvents: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Function' }],
    default: []
  },
  activityLog: {
    type: [{
      actionType: String,
      referenceId: String,
      pointsChange: Number,
      date: { type: Date, default: Date.now }
    }],
    default: []
  },
  
  // REVIEWS (OPTIONAL EXTENSION)
  totalReviews: {
    type: Number,
    default: 0
  },
  lastReviewAt: {
    type: Date,
    default: null
  }
}, { collection: 'users' });

export default mongoose.model("User", userSchema);