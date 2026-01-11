import mongoose from "mongoose";
import Game from "./src/models/Game.js";
import Venue from "./src/models/Venue.js";
import Function from "./src/models/Function.js";
import Admin from "./src/models/Admin.js";
import User from "./src/models/Account.js";
import connectDB from "./src/config/database.js";
import dotenv from "dotenv";

dotenv.config();

const verifyCollections = async () => {
  try {
    await connectDB();
    
    console.log("📋 MONGODB COLLECTIONS VERIFICATION");
    console.log("=====================================\n");
    
    // Games Collection
    const games = await Game.find({}, 'name type status points');
    console.log(`🎮 GAMES COLLECTION (${games.length} documents):`);
    games.forEach(game => {
      console.log(`   - ${game.name} (${game.type}) - ${game.status} - ${game.points} pts`);
    });
    
    // Venues Collection
    const venues = await Venue.find({}, 'name capacity status');
    console.log(`\n🏢 VENUES COLLECTION (${venues.length} documents):`);
    venues.forEach(venue => {
      console.log(`   - ${venue.name} (Capacity: ${venue.capacity}) - ${venue.status}`);
    });
    
    // Functions Collection
    const functions = await Function.find({}, 'eventName eventType status');
    console.log(`\n🎉 FUNCTIONS COLLECTION (${functions.length} documents):`);
    if (functions.length > 0) {
      functions.forEach(func => {
        console.log(`   - ${func.eventName} (${func.eventType}) - ${func.status}`);
      });
    } else {
      console.log("   (Empty - ready for future events)");
    }
    
    // Admin Collection
    const admins = await Admin.find({}, 'fullName email role');
    console.log(`\n👨‍💼 ADMIN_JJ COLLECTION (${admins.length} documents):`);
    admins.forEach(admin => {
      console.log(`   - ${admin.fullName} (${admin.email}) - ${admin.role}`);
    });
    
    // Users Collection
    const users = await User.find({}, 'fullName email role');
    console.log(`\n👥 USERS COLLECTION (${users.length} documents):`);
    if (users.length > 0) {
      users.forEach(user => {
        console.log(`   - ${user.fullName} (${user.email}) - ${user.role}`);
      });
    } else {
      console.log("   (Empty - ready for user registrations)");
    }
    
    console.log("\n✅ All collections verified and ready!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
};

verifyCollections();