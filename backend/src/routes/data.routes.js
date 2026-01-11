import express from "express";
import { 
  getGames, 
  addGame, 
  blockGame,
  getVenues,
  addVenue,
  bookVenue,
  getFunctions
} from "../controllers/data.controller.js";

const router = express.Router();

// Games routes
router.get("/games", getGames);
router.post("/games", addGame);
router.patch("/games/:gameId/block", blockGame);

// Venues routes
router.get("/venues", getVenues);
router.post("/venues", addVenue);
router.patch("/venues/:venueId/book", bookVenue);

// Functions routes
router.get("/functions", getFunctions);

export default router;