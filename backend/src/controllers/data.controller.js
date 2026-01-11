import Game from "../models/Game.js";
import Venue from "../models/Venue.js";
import Function from "../models/Function.js";

// GAMES APIs
export const getGames = async (req, res) => {
  try {
    const games = await Game.find({ status: "active" }, 'name description type points status minPlayers maxPlayers durationMinutes');
    res.json({ success: true, games });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const addGame = async (req, res) => {
  try {
    const { name } = req.body;
    
    const game = new Game({
      name,
      description: `${name} - Fun game for everyone`,
      type: "board",
      points: 50,
      minPlayers: 2,
      maxPlayers: 6,
      durationMinutes: 60,
      status: "active"
    });
    
    await game.save();
    res.json({ success: true, game });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const blockGame = async (req, res) => {
  try {
    const { gameId } = req.params;
    
    const game = await Game.findByIdAndUpdate(
      gameId,
      { status: "blocked", blockedAt: new Date() },
      { new: true }
    );
    
    if (!game) {
      return res.status(404).json({ error: "Game not found" });
    }
    
    res.json({ success: true, game });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// VENUES APIs
export const getVenues = async (req, res) => {
  try {
    const venues = await Venue.find({ status: "available" }, 'name capacity location status bookedDates');
    res.json({ success: true, venues });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const addVenue = async (req, res) => {
  try {
    const { name, capacity } = req.body;
    
    const venue = new Venue({
      name,
      capacity,
      location: "Surat, Gujarat",
      status: "available",
      bookedDates: []
    });
    
    await venue.save();
    res.json({ success: true, venue });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const bookVenue = async (req, res) => {
  try {
    const { venueId } = req.params;
    const { eventDate, functionId } = req.body;
    
    const venue = await Venue.findByIdAndUpdate(
      venueId,
      { 
        $push: { bookedDates: new Date(eventDate) },
        bookedBy: functionId,
        status: "booked"
      },
      { new: true }
    );
    
    if (!venue) {
      return res.status(404).json({ error: "Venue not found" });
    }
    
    res.json({ success: true, venue });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// FUNCTIONS APIs
export const getFunctions = async (req, res) => {
  try {
    const { eventType, status } = req.query;
    let filter = {};
    
    if (eventType) filter.eventType = eventType;
    if (status) filter.status = status;
    
    const functions = await Function.find(filter)
      .populate('venueId', 'name capacity location')
      .select('eventName eventType eventDate peopleCount status');
    
    res.json({ success: true, functions });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};