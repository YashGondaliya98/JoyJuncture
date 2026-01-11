import mongoose from "mongoose";
import Admin from "./src/models/Admin.js";
import connectDB from "./src/config/database.js";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const createAdminCollection = async () => {
  try {
    await connectDB();
    console.log("✅ Connected to MongoDB");
    
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: "admin@joyjuncture.com" });
    if (existingAdmin) {
      console.log("⚠️ Admin already exists in database");
      console.log("Admin details:", existingAdmin);
      process.exit(0);
    }
    
    // Create and insert the first admin
    const adminData = {
      fullName: "Khushi Poddar",
      email: "admin@joyjuncture.com",
      phone: "9876543210",
      password: "admin123",
      city: "Surat, Gujarat"
    };
    
    const newAdmin = new Admin(adminData);
    const savedAdmin = await newAdmin.save();
    
    console.log("✅ admin_jj collection created successfully!");
    console.log("✅ First admin inserted:");
    console.log({
      id: savedAdmin._id,
      fullName: savedAdmin.fullName,
      email: savedAdmin.email,
      role: savedAdmin.role,
      status: savedAdmin.status,
      createdAt: savedAdmin.createdAt
    });
    
    // Verify collection exists
    const collections = await mongoose.connection.db.listCollections().toArray();
    const adminCollection = collections.find(col => col.name === 'admin_jj');
    
    if (adminCollection) {
      console.log("✅ admin_jj collection confirmed in database");
    }
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Error creating admin collection:", error.message);
    process.exit(1);
  }
};

createAdminCollection();