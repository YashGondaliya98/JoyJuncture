import express from 'express';
import Venue from '../models/Venue.js';

const router = express.Router();

// Get all venues (for admin)
router.get('/venues', async (req, res) => {
  try {
    const venues = await Venue.find().sort({ createdAt: -1 });
    res.json(venues);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get available venues by date and capacity
router.get('/venues/available', async (req, res) => {
  try {
    const { date, capacity } = req.query;
    
    const query = {
      status: 'available',
      capacity: { $gte: parseInt(capacity) }
    };
    
    // If date is provided, exclude venues booked on that date
    if (date) {
      const searchDate = new Date(date);
      query.$or = [
        { bookedDate: null },
        { bookedDate: { $ne: searchDate } }
      ];
    }
    
    const venues = await Venue.find(query).sort({ capacity: 1 });
    res.json(venues);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add new venue (admin only)
router.post('/venues', async (req, res) => {
  try {
    const venue = new Venue(req.body);
    await venue.save();
    res.status(201).json(venue);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ error: 'Venue name already exists' });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
});

// Book a venue
router.patch('/venues/:id/book', async (req, res) => {
  try {
    const { eventName, date, numberOfPeople, eventType } = req.body;
    
    const venue = await Venue.findById(req.params.id);
    if (!venue) {
      return res.status(404).json({ error: 'Venue not found' });
    }
    
    if (venue.status === 'booked') {
      return res.status(400).json({ error: 'Venue is already booked' });
    }
    
    venue.status = 'booked';
    venue.bookedDate = new Date(date);
    venue.eventDetails = {
      eventName,
      numberOfPeople: parseInt(numberOfPeople),
      eventType
    };
    
    await venue.save();
    res.json(venue);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete venue (admin only)
router.delete('/venues/:id', async (req, res) => {
  try {
    const venue = await Venue.findByIdAndDelete(req.params.id);
    if (!venue) {
      return res.status(404).json({ error: 'Venue not found' });
    }
    res.json({ message: 'Venue deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;