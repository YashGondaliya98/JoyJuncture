import Venue from "../models/Venue.js";
import Function from "../models/Function.js";
import mongoose from "mongoose";

export const findVenues = async (req, res) => {
  try {
    console.log('=== FIND VENUES DEBUG ===');
    console.log('Request body:', req.body);
    console.log('MongoDB connection state:', mongoose.connection.readyState);
    
    const { peopleCount } = req.body;
    
    if (!peopleCount) {
      console.log('ERROR: No peopleCount provided');
      return res.status(400).json({ error: "People count is required" });
    }
    
    console.log('Searching for venues with capacity >=', peopleCount);
    
    // Force create venues if none exist
    const totalVenues = await Venue.countDocuments();
    console.log('Total venues in database:', totalVenues);
    
    if (totalVenues === 0) {
      console.log('No venues found, creating sample venues...');
      const sampleVenues = [
        { name: "Grand Palace Hall", capacity: 200, location: "Surat, Gujarat", status: "available" },
        { name: "Garden View Resort", capacity: 150, location: "Surat, Gujarat", status: "available" },
        { name: "Royal Banquet", capacity: 300, location: "Surat, Gujarat", status: "available" }
      ];
      
      const createdVenues = await Venue.insertMany(sampleVenues);
      console.log('Sample venues created:', createdVenues.length);
    }
    
    const query = {
      status: "available",
      capacity: { $gte: parseInt(peopleCount) }
    };
    
    console.log('Query:', JSON.stringify(query));
    
    const venues = await Venue.find(query);
    console.log('Found venues:', venues.length);
    
    if (venues.length === 0) {
      console.log('No venues match criteria, returning all available venues');
      const allVenues = await Venue.find({ status: "available" });
      console.log('All available venues:', allVenues.length);
      return res.json({ success: true, venues: allVenues, debug: { totalVenues, query, note: "Returned all available venues" } });
    }
    
    res.json({ success: true, venues, debug: { totalVenues, query } });
  } catch (error) {
    console.error('=== FIND VENUES ERROR ===');
    console.error('Error details:', error);
    res.status(500).json({ 
      error: "Server error", 
      details: error.message
    });
  }
};

export const getUpcomingEvents = async (req, res) => {
  try {
    const { userId } = req.params;
    
    const events = await Function.find({
      createdByUserId: userId,
      status: "upcoming"
    }).populate('venueId', 'name location capacity');
    
    res.json({ success: true, events });
  } catch (error) {
    console.error('Get upcoming events error:', error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

export const createWeddingEvent = async (req, res) => {
  try {
    console.log('Create event request:', req.body);
    const { eventName, eventDate, peopleCount, venueId, userId, eventType } = req.body;
    
    if (!userId) {
      return res.status(401).json({ error: "Please login first", requireLogin: true });
    }
    
    if (!eventName || !eventDate || !peopleCount || !venueId || !eventType) {
      return res.status(400).json({ error: "All fields are required" });
    }
    
    // Validate eventType
    const validEventTypes = ["wedding", "gamenight", "workshop"];
    if (!validEventTypes.includes(eventType)) {
      return res.status(400).json({ error: "Invalid event type" });
    }
    
    const event = new Function({
      eventName,
      eventType: eventType,
      eventDate: new Date(eventDate),
      peopleCount: parseInt(peopleCount),
      venueId,
      createdByUserId: userId,
      status: "upcoming",
      createdAt: new Date()
    });
    
    await event.save();
    await Venue.findByIdAndUpdate(venueId, { status: "booked" });
    
    res.json({ success: true, event });
  } catch (error) {
    console.error('Create event error:', error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
};