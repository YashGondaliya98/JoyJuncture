import Function from "../models/Function.js";
import Review from "../models/Review.js";
import User from "../models/Account.js";

// Get all completed events grouped by type
export const getAllEvents = async (req, res) => {
  try {
    const completedEvents = await Function.find({
      status: "completed"
    }).populate('venueId', 'name location');
    
    const groupedEvents = {
      wedding: completedEvents.filter(e => e.eventType === "wedding"),
      gameNights: completedEvents.filter(e => e.eventType === "gaming"),
      workshops: completedEvents.filter(e => e.eventType === "workshop")
    };
    
    res.json({ success: true, events: groupedEvents });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Submit review for an event
export const submitReview = async (req, res) => {
  try {
    const { eventId, userId, userName, rating, comment } = req.body;
    
    if (!eventId || !userId || !rating) {
      return res.status(400).json({ error: "Event ID, User ID and rating are required" });
    }
    
    // Check if review already exists
    const existingReview = await Review.findOne({ eventId, userId });
    if (existingReview) {
      return res.status(400).json({ error: "Review already submitted" });
    }
    
    // Get event details
    const event = await Function.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    
    // Create review
    const review = new Review({
      eventId,
      eventType: event.eventType,
      userId,
      userName,
      rating: parseInt(rating),
      comment: comment || "",
      status: "active",
      createdAt: new Date()
    });
    
    await review.save();
    
    // Update function with review stats
    const reviews = await Review.find({ eventId, status: "active" });
    const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    
    await Function.findByIdAndUpdate(eventId, {
      reviewsCount: reviews.length,
      averageRating: avgRating,
      hasReviews: true
    });
    
    // Update user
    await User.findByIdAndUpdate(userId, {
      $inc: { totalReviews: 1 },
      lastReviewAt: new Date()
    });
    
    res.json({ success: true, message: "Review submitted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Get events by type
export const getEventsByType = async (req, res) => {
  try {
    const { eventType } = req.params;
    
    const events = await Function.find({
      eventType: eventType,
      status: "completed"
    }).populate('venueId', 'name location');
    
    res.json({ success: true, events });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Get reviews for an event
export const getEventReviews = async (req, res) => {
  try {
    const { eventId } = req.params;
    
    const reviews = await Review.find({
      eventId,
      status: "active"
    }).sort({ createdAt: -1 });
    
    res.json({ success: true, reviews });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};