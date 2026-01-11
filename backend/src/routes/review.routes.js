import express from "express";
import { getAllEvents, submitReview, getEventsByType, getEventReviews } from "../controllers/review.controller.js";

const router = express.Router();

// Get all completed events grouped by type
router.get("/events", getAllEvents);

// Submit review for an event
router.post("/submit", submitReview);

// Get events by type
router.get("/events/:eventType", getEventsByType);

// Get reviews for an event
router.get("/event/:eventId", getEventReviews);

export default router;