import React, { useState, useEffect } from "react";
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
      <div key={event._id} className="event-item">
        <h3>{event.eventName}</h3>
        <p>
          {new Date(event.eventDate).toLocaleDateString()} • {event.venueId?.name || 'Venue TBD'}
        </p>
        <div className="event-footer">
          <span>
            {event.reviewsCount || 0}{" "}
            {(event.reviewsCount || 0) === 1 ? "Review" : "Reviews"}
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
    weddings: [],
    gameNights: [],
    workshops: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const userId = user?.id;
      
      if (!userId) {
        setLoading(false);
        return;
      }
      
      const response = await fetch(`https://joyjuncture-b.onrender.com/api/wedding/upcoming-events/${userId}`);
      const data = await response.json();
      
      if (data.success) {
        const allEvents = data.events;
        console.log('All events:', allEvents.map(e => ({ name: e.eventName, eventType: e.eventType, category: e.category })));
        
        setEvents({
          weddings: allEvents.filter(e => (e.category === "wedding" || e.eventType === "wedding")),
          gameNights: allEvents.filter(e => (e.category === "gamenight" || e.eventType === "gaming" || e.eventType === "gamenight")),
          workshops: allEvents.filter(e => (e.category === "workshop" || e.eventType === "workshop"))
        });
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    }
    setLoading(false);
  };

  const handleSubmit = async () => {
    if (!reviewForm.name || !reviewForm.comment) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const userId = user?.id;
      
      if (!userId) {
        alert('Please login to submit review');
        return;
      }
      
      const response = await fetch('https://joyjuncture-b.onrender.com/api/reviews/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventId: selectedEvent.event._id,
          userId: userId,
          userName: reviewForm.name,
          rating: reviewForm.rating,
          comment: reviewForm.comment
        })
      });
      
      const result = await response.json();
      
      if (result.success) {
        alert('Review submitted successfully!');
        setSelectedEvent(null);
        setReviewForm({ name: "", rating: 5, comment: "" });
        fetchEvents();
      } else {
        alert(result.error || 'Failed to submit review');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Failed to submit review');
    }
  };

  if (loading) {
    return (
      <Layout className="full-width">
        <section className="review-section">
          <div className="container">
            <h1 className="review-page-title">Review Functions</h1>
            <div style={{ textAlign: 'center', padding: '50px' }}>Loading...</div>
          </div>
        </section>
      </Layout>
    );
  }

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
            <h2>{selectedEvent.event.eventName}</h2>
            
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