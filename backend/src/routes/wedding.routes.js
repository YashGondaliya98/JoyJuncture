import express from "express";
import { findVenues, createWeddingEvent, getUpcomingEvents } from "../controllers/wedding.controller.js";
import Venue from "../models/Venue.js";
import Function from "../models/Function.js";

const router = express.Router();

// Simple test endpoint
router.get("/test", (req, res) => {
  res.json({ success: true, message: "Wedding routes working", timestamp: new Date() });
});

// Test endpoint to check database connection and add sample venues
router.get("/test-db", async (req, res) => {
  try {
    const venueCount = await Venue.countDocuments();
    
    // Add sample venues if none exist
    if (venueCount === 0) {
      const sampleVenues = [
        { name: "Grand Palace Hall", capacity: 200, location: "Surat, Gujarat", status: "available" },
        { name: "Garden View Resort", capacity: 150, location: "Surat, Gujarat", status: "available" },
        { name: "Royal Banquet", capacity: 300, location: "Surat, Gujarat", status: "available" },
        { name: "City Convention Center", capacity: 500, location: "Surat, Gujarat", status: "available" }
      ];
      
      await Venue.insertMany(sampleVenues);
      console.log('Sample venues added');
    }
    
    const finalCount = await Venue.countDocuments();
    const venues = await Venue.find({ status: "available" });
    
    res.json({ 
      success: true, 
      message: "Database connected", 
      venueCount: finalCount,
      availableVenues: venues.length,
      venues: venues
    });
  } catch (error) {
    console.error('Database test error:', error);
    res.status(500).json({ error: "Database connection failed", details: error.message });
  }
});

// Test find venues with GET method
router.get("/find-venues-test/:peopleCount", async (req, res) => {
  try {
    const peopleCount = req.params.peopleCount;
    const venues = await Venue.find({
      status: "available",
      capacity: { $gte: parseInt(peopleCount) }
    });
    res.json({ success: true, venues, peopleCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/find-venues", findVenues);
router.post("/create-event", createWeddingEvent);
router.get("/upcoming-events/:userId", getUpcomingEvents);

// Test endpoint to add sample completed events for reviews
router.get("/add-sample-events", async (req, res) => {
  try {
    const eventCount = await Function.countDocuments({ status: "completed" });
    
    if (eventCount === 0) {
      const venues = await Venue.find().limit(3);
      if (venues.length > 0) {
        const sampleEvents = [
          {
            eventName: "Raj & Priya Wedding",
            eventType: "wedding",
            eventDate: new Date('2024-01-15'),
            peopleCount: 200,
            venueId: venues[0]._id,
            createdByUserId: "60d5ecb74b24a1234567890a",
            status: "completed"
          },
          {
            eventName: "Corporate Game Night",
            eventType: "gaming", 
            eventDate: new Date('2024-02-10'),
            peopleCount: 50,
            venueId: venues[1]._id,
            createdByUserId: "60d5ecb74b24a1234567890b",
            status: "completed"
          },
          {
            eventName: "Photography Workshop",
            eventType: "workshop",
            eventDate: new Date('2024-03-05'),
            peopleCount: 30,
            venueId: venues[2]._id,
            createdByUserId: "60d5ecb74b24a1234567890c",
            status: "completed"
          }
        ];
        
        await Function.insertMany(sampleEvents);
        console.log('Sample completed events added');
      }
    }
    
    const completedEvents = await Function.find({ status: "completed" }).populate('venueId');
    res.json({ success: true, completedEvents });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;