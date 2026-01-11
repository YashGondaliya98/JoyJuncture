import dotenv from "dotenv";
import connectDB from "./config/database.js";

dotenv.config();

const testConnection = async () => {
  console.log("🔍 Testing MongoDB connection...");
  
  if (!process.env.MONGODB_URI) {
    console.error("❌ MONGODB_URI not found in environment variables");
    process.exit(1);
  }
  
  const isConnected = await connectDB();
  
  if (isConnected) {
    console.log("✅ MongoDB connection test successful!");
    process.exit(0);
  } else {
    console.log("❌ MongoDB connection test failed!");
    process.exit(1);
  }
};

testConnection();