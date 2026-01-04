import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import healthRoutes from "./routes/health.routes.js";
import authRoutes from "./routes/auth.routes.js";
import gameRoutes from "./routes/game.routes.js";
import venueRoutes from "./routes/venue.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/JoyJuncture');
    console.log('📦 MongoDB connected');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

connectDB();

app.use("/api/health", healthRoutes);
app.use("/api", authRoutes);
app.use("/api", gameRoutes);
app.use("/api", venueRoutes);

export default app;
