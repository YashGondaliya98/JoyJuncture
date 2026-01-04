import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  minPlayers: {
    type: Number,
    required: true,
    min: 1
  },
  maxPlayers: {
    type: Number,
    required: true,
    min: 1
  },
  duration: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['Active', 'Blocked'],
    default: 'Active'
  }
}, {
  timestamps: true
});

export default mongoose.model('Game', gameSchema);