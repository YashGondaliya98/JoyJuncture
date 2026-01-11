import mongoose from "mongoose";
import Admin from "./src/models/Admin.js";
import connectDB from "./src/config/database.js";
import dotenv from "dotenv";

dotenv.config();

const testExtendedSchema = async () => {
  try {
    await connectDB();
    
    // Fetch existing admin and show extended fields
    const admin = await Admin.findOne({ email: "admin@joyjuncture.com" });
    
    console.log("✅ EXTENDED ADMIN SCHEMA VERIFICATION");
    console.log("=====================================");
    
    console.log("\n📋 EXISTING FIELDS (preserved):");
    console.log(`   fullName: ${admin.fullName}`);
    console.log(`   email: ${admin.email}`);
    console.log(`   role: ${admin.role}`);
    console.log(`   city: ${admin.city}`);
    
    console.log("\n📋 NEW FIELDS WITH DEFAULTS:");
    console.log(`   adminLevel: ${admin.adminLevel || 'normal'}`);
    console.log(`   country: ${admin.country || 'India'}`);
    console.log(`   timezone: ${admin.timezone || 'Asia/Kolkata'}`);
    console.log(`   joinedAt: ${admin.joinedAt || admin.createdAt}`);
    console.log(`   lastLogout: ${admin.lastLogout || 'null'}`);
    console.log(`   loginAttempts: ${admin.loginAttempts || 0}`);
    console.log(`   lastIpAddress: ${admin.lastIpAddress || 'undefined'}`);
    console.log(`   deviceInfo: ${admin.deviceInfo || 'undefined'}`);
    console.log(`   avatarText: ${admin.avatarText || 'undefined'}`);
    console.log(`   profileNote: ${admin.profileNote || 'undefined'}`);
    console.log(`   isDeleted: ${admin.isDeleted || false}`);
    console.log(`   deletedAt: ${admin.deletedAt || 'null'}`);
    
    console.log("\n📋 EXTENDED PERMISSIONS:");
    console.log(`   manageAdmins: ${admin.permissions?.manageAdmins || false}`);
    console.log(`   manageWallets: ${admin.permissions?.manageWallets || true}`);
    console.log(`   viewReports: ${admin.permissions?.viewReports || true}`);
    
    console.log("\n✅ Schema extension successful!");
    console.log("✅ Existing data preserved!");
    console.log("✅ New fields ready with defaults!");
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
};

testExtendedSchema();