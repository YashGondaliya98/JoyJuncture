import React, { useState } from "react";
import { Star, Heart, Gamepad2, BookOpen, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./homepage.css"; // header/footer styles
import "./reviewpage.css"; // review page styles
import logo from "../assets/logo.png";

/* ================= STAR RATING ================= */
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

/* ================= EVENT CARD ================= */
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
          <button onClick={() => onSelectEvent({ event, category })}>
            Review
          </button>
        </div>
      </div>
    ))}
  </div>
);

/* ================= MAIN REVIEW PAGE ================= */
export default function ReviewPage() {
  const navigate = useNavigate(); // ← useNavigate for routing
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
    <>
      {/* ================= HEADER ================= */}
      <header>
        <nav>
          <img src={logo} alt="Joy Juncture" className="logo-img" />
          <div className="logo">Joy Juncture</div>

          <ul className="nav-links">
            <li onClick={() => navigate("/")}>Home</li>
            <li onClick={() => navigate("/about")}>About Us</li>
            <li onClick={() => navigate("/founder")}>Founder Story</li>
            <li className="login-btn" onClick={() => navigate("/login")}>Login</li>
          </ul>
        </nav>
      </header>

      <div style={{ paddingTop: "100px" }}>
  {/* ================= PAGE TITLE ================= */}
  <h1 className="review-page-title">Review Functions</h1>

  {/* ================= REVIEW FORM ================= */}
  {selectedEvent ? (
    <div className="review-form-page">
      <button className="back-btn" onClick={() => setSelectedEvent(null)}>
        <ArrowLeft /> Back
      </button>
      <h2>{selectedEvent.event.name}</h2>
      <input
        placeholder="Your Name"
        value={reviewForm.name}
        onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
      />
      <StarRating
        rating={reviewForm.rating}
        interactive
        onChange={(rating) => setReviewForm({ ...reviewForm, rating })}
      />
      <textarea
        placeholder="Your Review"
        value={reviewForm.comment}
        onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
      />
      <button className="submit-btn" onClick={handleSubmit}>
        Submit Review
      </button>
    </div>
  ) : (
    /* ================= LIST OF EVENTS ================= */
    <div className="review-page">
      <EventCard
        title="Wedding Events"
        Icon={Heart}
        events={events.weddings}
        category="weddings"
        color="bg-pink-500"
        onSelectEvent={setSelectedEvent}
      />
      <EventCard
        title="Game Nights"
        Icon={Gamepad2}
        events={events.gameNights}
        category="gameNights"
        color="bg-purple-500"
        onSelectEvent={setSelectedEvent}
      />
      <EventCard
        title="Workshops"
        Icon={BookOpen}
        events={events.workshops}
        category="workshops"
        color="bg-blue-500"
        onSelectEvent={setSelectedEvent}
      />
    </div>
  )}
</div>


      {/* ================= FOOTER ================= */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-section">
            <h3>🎉 Joy Juncture</h3>
            <p>A joyful ecosystem of games, experiences and community where play creates lasting connections.</p>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li onClick={() => navigate("/")}>Home</li>
              <li onClick={() => navigate("/about")}>About Us</li>
              <li onClick={() => navigate("/founder")}>Founder Story</li>
              <li onClick={() => navigate("/gamestore")}>Game Store</li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contact</h4>
            <p>📧 support@joyjuncture.com</p>
            <p>📞 +91 98765 43210</p>
            <p>📍 India</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Joy Juncture. All Rights Reserved.</p>
        </div>
      </footer>
    </>
  );
}