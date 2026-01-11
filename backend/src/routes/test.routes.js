import express from "express";
import Venue from "../models/Venue.js";
import Function from "../models/Function.js";
import Review from "../models/Review.js";
import User from "../models/Account.js";

const router = express.Router();

// Test all database collections
router.get("/test-all", async (req, res) => {
  try {
    console.log("Testing database collections...");
    
    // Test venues
    const venueCount = await Venue.countDocuments();
    console.log("Venues count:", venueCount);
    
    // Test functions
    const functionCount = await Function.countDocuments();
    const completedCount = await Function.countDocuments({ status: "completed" });
    console.log("Functions count:", functionCount, "Completed:", completedCount);
    
    // Test reviews
    const reviewCount = await Review.countDocuments();
    console.log("Reviews count:", reviewCount);
    
    // Test users
    const userCount = await User.countDocuments();
    console.log("Users count:", userCount);
    
    // Create sample data if none exists
    if (venueCount === 0) {
      console.log("Creating sample venues...");
      const sampleVenues = [
        { name: "Grand Palace Hall", capacity: 200, location: "Surat, Gujarat", status: "available" },
        { name: "Garden View Resort", capacity: 150, location: "Surat, Gujarat", status: "available" },
        { name: "Royal Banquet", capacity: 300, location: "Surat, Gujarat", status: "available" }
      ];
      await Venue.insertMany(sampleVenues);
      console.log("Sample venues created");
    }
    
    if (completedCount === 0) {
      console.log("Creating sample completed events...");
      const venues = await Venue.find().limit(3);
      if (venues.length > 0) {
        const sampleFunctions = [
          {
            eventName: "Sarah & John Wedding",
            eventType: "wedding",
            eventDate: new Date('2024-01-15'),
            peopleCount: 150,
            venueId: venues[0]._id,
            createdByUserId: "507f1f77bcf86cd799439011",
            status: "completed"
          },
          {
            eventName: "Board Game Night",
            eventType: "gaming",
            eventDate: new Date('2024-02-10'),
            peopleCount: 50,
            venueId: venues[1]._id,
            createdByUserId: "507f1f77bcf86cd799439012",
            status: "completed"
          },
          {
            eventName: "Photography Workshop",
            eventType: "workshop",
            eventDate: new Date('2024-03-05'),
            peopleCount: 30,
            venueId: venues[2]._id,
            createdByUserId: "507f1f77bcf86cd799439013",
            status: "completed"
          }
        ];
        await Function.insertMany(sampleFunctions);
        console.log("Sample completed events created");
      }
    }
    
    // Get final counts and sample data
    const finalVenues = await Venue.countDocuments();
    const finalFunctions = await Function.countDocuments();
    const finalCompleted = await Function.countDocuments({ status: "completed" });
    const finalReviews = await Review.countDocuments();
    const finalUsers = await User.countDocuments();
    
    const completedEvents = await Function.find({ status: "completed" }).populate('venueId');
    
    res.json({
      success: true,
      message: "Database test complete",
      counts: {
        venues: finalVenues,
        functions: finalFunctions,
        completedEvents: finalCompleted,
        reviews: finalReviews,
        users: finalUsers
      },
      sampleData: {
        venues: await Venue.find().limit(3),
        completedEvents: completedEvents
      }
    });
    
  } catch (error) {
    console.error("Database test error:", error);
    res.status(500).json({ 
      error: "Database test failed", 
      details: error.message
    });
  }
});

export default router;