import React, { useState } from "react";
import { Star, Heart, Gamepad2, BookOpen, ArrowLeft } from "lucide-react";
import Layout from "./shared/Layout";
import "./reviewpage.css";

const StarRating = ({ rating, interactive = false, onChange }) => (
  <div className="stars">
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        className={`star ${star <= rating ? "active" : ""} ${
          interactive ? "cursor-pointer" : ""
        }`}
        onClick={() => interactive && onChange(star)}
      />
    ))}
  </div>
);

const EventCard = ({ title, events, category, color, onSelectEvent, Icon }) => (
  <div className="event-card">
    <div className="event-card-header">
      <div className={`event-icon ${color}`}>
        {Icon && <Icon className="w-6 h-6 text-white" />}
      </div>
      <h2>{title}</h2>
    </div>
    {events.map((event) => (
      <div key={event.id} className="event-item">
        <h3>{event.name}</h3>
        <p>
          {event.date} • {event.location}
        </p>
        <div className="event-footer">
          <span>
            {event.reviews.length}{" "}
            {event.reviews.length === 1 ? "Review" : "Reviews"}
          </span>
          <button className="btn btn-primary" onClick={() => onSelectEvent({ event, category })}>
            Review
          </button>
        </div>
      </div>
    ))}
  </div>
);

export default function ReviewPage() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [reviewForm, setReviewForm] = useState({ name: "", rating: 5, comment: "" });

  const [events, setEvents] = useState({
    weddings: [
      { id: "w1", name: "Sarah & John Wedding", date: "2024-11-15", location: "Grand Ballroom", reviews: [] },
      { id: "w2", name: "Emma & Michael Wedding", date: "2024-10-28", location: "Garden Venue", reviews: [] },
    ],
    gameNights: [
      { id: "g1", name: "Board Game Bonanza", date: "2024-12-01", location: "Community Center", reviews: [] },
      { id: "g2", name: "Trivia Night", date: "2024-11-22", location: "Joy Lounge", reviews: [] },
    ],
    workshops: [
      { id: "ws1", name: "Creative Writing Workshop", date: "2024-11-25", location: "Learning Center", reviews: [] },
      { id: "ws2", name: "Photography Basics", date: "2024-10-18", location: "Studio A", reviews: [] },
    ],
  });

  const handleSubmit = () => {
    if (!reviewForm.name || !reviewForm.comment) return alert("Fill all fields");

    const updatedEvents = { ...events };
    const { event, category } = selectedEvent;
    const index = updatedEvents[category].findIndex((e) => e.id === event.id);

    updatedEvents[category][index].reviews.unshift({
      id: Date.now(),
      ...reviewForm,
      date: new Date().toISOString().split("T")[0],
    });

    setEvents(updatedEvents);
    setSelectedEvent(null);
    setReviewForm({ name: "", rating: 5, comment: "" });
  };

  return (
    <Layout className="full-width">
      <section className="review-section">
        <div className="container">
        <h1 className="review-page-title">Review Functions</h1>

        {selectedEvent ? (
          <div className="review-form-page">
            <button className="btn btn-secondary mb-lg" onClick={() => setSelectedEvent(null)}>
              <ArrowLeft /> Back
            </button>
            <h2>{selectedEvent.event.name}</h2>
            
            <div className="form-group">
              <input
                className="form-input"
                placeholder="Your Name"
                value={reviewForm.name}
                onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
              />
            </div>
            
            <div className="form-group">
              <StarRating
                rating={reviewForm.rating}
                interactive
                onChange={(rating) => setReviewForm({ ...reviewForm, rating })}
              />
            </div>
            
            <div className="form-group">
              <textarea
                className="form-input"
                placeholder="Your Review"
                value={reviewForm.comment}
                onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                rows="4"
              />
            </div>
            
            <button className="btn btn-primary" onClick={handleSubmit}>
              Submit Review
            </button>
          </div>
        ) : (
          <div className="review-page">
            <EventCard
              title="Wedding Events"
              Icon={Heart}
              events={events.weddings}
              category="weddings"
              color="bg-pink"
              onSelectEvent={setSelectedEvent}
            />
            <EventCard
              title="Game Nights"
              Icon={Gamepad2}
              events={events.gameNights}
              category="gameNights"
              color="bg-purple"
              onSelectEvent={setSelectedEvent}
            />
            <EventCard
              title="Workshops"
              Icon={BookOpen}
              events={events.workshops}
              category="workshops"
              color="bg-blue"
              onSelectEvent={setSelectedEvent}
            />
          </div>
        )}
        </div>
      </section>
    </Layout>
  );
}