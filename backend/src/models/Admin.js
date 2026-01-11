import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
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
  
  // ROLE & STATUS
  role: {
    type: String,
    default: "admin"
  },
  status: {
    type: String,
    default: "active"
  },
  isActive: {
    type: Boolean,
    default: true
  },
  
  // LOCATION
  city: {
    type: String,
    required: true
  },
  
  // DATES
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastLogin: {
    type: Date,
    default: null
  },
  
  // PERMISSIONS
  permissions: {
    manageUsers: {
      type: Boolean,
      default: true
    },
    manageGames: {
      type: Boolean,
      default: true
    },
    manageVenues: {
      type: Boolean,
      default: true
    },
    manageEvents: {
      type: Boolean,
      default: true
    }
  },
  
  // ACTIVITY LOG
  activityLog: {
    type: [{
      actionType: String,
      referenceId: String,
      date: { type: Date, default: Date.now }
    }],
    default: []
  }
}, { collection: 'admin_jj' });

export default mongoose.model("Admin", adminSchema);