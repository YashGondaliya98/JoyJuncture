import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/database.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

// Connect to MongoDB before starting server
const startServer = async () => {
  console.log('Starting server...');
  console.log('MongoDB URI:', process.env.MONGODB_URI);
  
  const dbConnected = await connectDB();
  
  if (!dbConnected) {
    console.error('❌ Failed to connect to MongoDB. Server not started.');
    process.exit(1);
  }
  
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📊 Test database: http://localhost:${PORT}/api/wedding/test-db`);
    console.log(`📊 Add sample events: http://localhost:${PORT}/api/wedding/add-sample-events`);
  });
};

startServer();
