import mongoose from "mongoose";
import Admin from "./src/models/Admin.js";
import { connectDB } from "./src/config/database.js";

// Test admin collection creation
const testAdminCollection = async () => {
  try {
    await connectDB();
    console.log("✅ Connected to MongoDB");
    
    // Test collection creation (this will create the collection if it doesn't exist)
    const adminCount = await Admin.countDocuments();
    console.log(`✅ admin_jj collection accessible. Current admin count: ${adminCount}`);
    
    console.log("\n📋 EXAMPLE ADMIN DOCUMENT FOR MANUAL INSERTION:");
    console.log("Copy this JSON and insert manually via MongoDB Compass or shell:\n");
    
    const exampleAdmin = {
      fullName: "Khushi Poddar",
      email: "admin@joyjuncture.com",
      phone: "9876543210",
      password: "admin123",
      role: "admin",
      status: "active",
      isActive: true,
      city: "Surat, Gujarat",
      createdAt: new Date(),
      lastLogin: null,
      permissions: {
        manageUsers: true,
        manageGames: true,
        manageVenues: true,
        manageEvents: true
      },
      activityLog: []
    };
    
    console.log(JSON.stringify(exampleAdmin, null, 2));
    
    console.log("\n📝 MONGODB SHELL COMMAND:");
    console.log("db.admin_jj.insertOne(" + JSON.stringify(exampleAdmin, null, 2) + ")");
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
};

testAdminCollection();