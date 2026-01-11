import mongoose from "mongoose";
import Game from "./src/models/Game.js";
import Venue from "./src/models/venue.js";
import Function from "./src/models/Function.js";
import Admin from "./src/models/Admin.js";
import connectDB from "./src/config/database.js";
import dotenv from "dotenv";

dotenv.config();

const initializeCollections = async () => {
  try {
    await connectDB();
    console.log("✅ Connected to MongoDB");
    
    // Get admin ID for reference
    const admin = await Admin.findOne({ email: "admin@joyjuncture.com" });
    const adminId = admin ? admin._id : null;
    
    // Initialize Games Collection
    const gameCount = await Game.countDocuments();
    if (gameCount === 0) {
      const sampleGames = [
        {
          name: "Dead Man's Deck",
          description: "A thrilling card game of strategy and luck",
          type: "card",
          points: 100,
          minPlayers: 2,
          maxPlayers: 6,
          durationMinutes: 45,
          createdByAdminId: adminId
        },
        {
          name: "Mehfil",
          description: "Musical party game for groups",
          type: "board",
          points: 75,
          minPlayers: 4,
          maxPlayers: 10,
          durationMinutes: 60,
          createdByAdminId: adminId
        },
        {
          name: "Tamasha",
          description: "Party entertainment game",
          type: "board",
          points: 50,
          status: "blocked",
          minPlayers: 6,
          maxPlayers: 12,
          durationMinutes: 90,
          createdByAdminId: adminId,
          blockedAt: new Date()
        }
      ];
      
      await Game.insertMany(sampleGames);
      console.log("✅ Games collection created with 3 sample games");
    } else {
      console.log(`⚠️ Games collection already exists with ${gameCount} games`);
    }
    
    // Initialize Venues Collection
    const venueCount = await Venue.countDocuments();
    if (venueCount === 0) {
      const sampleVenues = [
        {
          name: "Main Hall A",
          capacity: 150,
          location: "Ground Floor, Joy Juncture Center"
        },
        {
          name: "Garden Area",
          capacity: 50,
          location: "Outdoor Garden, Joy Juncture"
        },
        {
          name: "Rooftop Terrace",
          capacity: 80,
          location: "Top Floor, Joy Juncture Building"
        }
      ];
      
      await Venue.insertMany(sampleVenues);
      console.log("✅ Venues collection created with 3 sample venues");
    } else {
      console.log(`⚠️ Venues collection already exists with ${venueCount} venues`);
    }
    
    // Initialize Functions Collection
    const functionCount = await Function.countDocuments();
    if (functionCount === 0) {
      // Get a venue ID for reference
      const venue = await Venue.findOne({ name: "Main Hall A" });
      const venueId = venue ? venue._id : null;
      
      const sampleFunctions = []; // Skip functions for now since we need actual user IDs
      
      console.log("⚠️ Functions collection skipped - requires actual user IDs");
    } else {
      console.log(`⚠️ Functions collection already exists with ${functionCount} functions`);
    }
    
    // Verify all collections exist
    const collections = await mongoose.connection.db.listCollections().toArray();
    const collectionNames = collections.map(col => col.name);
    
    console.log("\n📋 ALL COLLECTIONS IN DATABASE:");
    collectionNames.forEach(name => {
      if (['games', 'venues', 'functions', 'admin_jj', 'users'].includes(name)) {
        console.log(`✅ ${name}`);
      } else {
        console.log(`   ${name}`);
      }
    });
    
    console.log("\n✅ All collections initialized successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error initializing collections:", error.message);
    process.exit(1);
  }
};

initializeCollections();