import React, { useState } from "react";
import {
  Users,
  MapPin,
  Plus,
  X,
  ArrowRight,
  Clock,
  Trash2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import "./homepage.css";     // shared header/footer styles
import "./explorepage.css";  // explore page styles
import logo from "../assets/logo.png";

export default function ExplorePage() {
  const navigate = useNavigate();

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [formStep, setFormStep] = useState(1);
  const [formData, setFormData] = useState({
    eventName: "",
    date: "",
    numberOfPeople: "",
  });
  const [availableVenues, setAvailableVenues] = useState([]);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  const venues = [
    { id: 1, name: "Grand Hall", capacity: 200, location: "Downtown" },
    { id: 2, name: "Garden Pavilion", capacity: 150, location: "Park Side" },
    { id: 3, name: "Conference Center", capacity: 100, location: "Business District" },
    { id: 4, name: "Cozy Studio", capacity: 50, location: "Arts Quarter" },
  ];

  const eventTypes = [
    {
      id: "wedding",
      title: "Wedding Event",
      icon: "💒",
      desc: "Plan your dream wedding with elegant venues and seamless arrangements.",
    },
    {
      id: "gamenight",
      title: "Game Night",
      icon: "🎮",
      desc: "Host exciting game nights filled with fun, competition, and memories.",
    },
    {
      id: "workshop",
      title: "Workshop",
      icon: "📚",
      desc: "Organize professional or creative workshops in perfect spaces.",
    },
  ];

  const handleFindVenues = () => {
    const suitable = venues.filter(
      (v) => v.capacity >= Number(formData.numberOfPeople)
    );
    setAvailableVenues(suitable);
    setFormStep(2);
  };

  const handleSubmit = () => {
    setUpcomingEvents([
      ...upcomingEvents,
      {
        id: Date.now(),
        ...formData,
        venue: selectedVenue,
        type: selectedEvent,
      },
    ]);
    setSelectedEvent(null);
    setFormStep(1);
    setFormData({ eventName: "", date: "", numberOfPeople: "" });
    setSelectedVenue(null);
  };
  const getCategoryName = (type) => {
  switch (type) {
    case "wedding":
      return "Wedding";
    case "gamenight":
      return "Game Night";
    case "workshop":
      return "Workshop";
    default:
      return "";
  }
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
            <li className="login-btn" onClick={() => navigate("/login")}>
              Login
            </li>
          </ul>
        </nav>
      </header>

      <div style={{ paddingTop: "100px" }}>
        <h1 className="explore-page-title">Explore Functions</h1>

        {/* ================= EVENT CARDS ================= */}
        {!selectedEvent && (
          <div className="explore-grid">
            {eventTypes.map((event) => (
              <div key={event.id} className="explore-card">
                <span className="explore-icon">{event.icon}</span>
                <h3>{event.title}</h3>
                <p className="explore-desc">{event.desc}</p>
                <button onClick={() => setSelectedEvent(event.id)}>
                  <Plus /> Create Event
                </button>
              </div>
            ))}
          </div>
        )}

        {/* ================= EVENT FORM ================= */}
        {selectedEvent && (
          <div className="explore-form">
            <button className="back-btn" onClick={() => setSelectedEvent(null)}>
              <X /> Close
            </button>

            {formStep === 1 && (
              <>
                <input
                  placeholder="Event Name"
                  value={formData.eventName}
                  onChange={(e) =>
                    setFormData({ ...formData, eventName: e.target.value })
                  }
                />
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                />
                <input
                  type="number"
                  placeholder="Number of People"
                  value={formData.numberOfPeople}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      numberOfPeople: e.target.value,
                    })
                  }
                />
                <button className="submit-btn" onClick={handleFindVenues}>
                  Find Venues <ArrowRight />
                </button>
              </>
            )}

            {formStep === 2 && (
              <>
                {availableVenues.map((venue) => (
                  <div
                    key={venue.id}
                    className={`venue-card ${
                      selectedVenue?.id === venue.id ? "active" : ""
                    }`}
                    onClick={() => setSelectedVenue(venue)}
                  >
                    <h4>{venue.name}</h4>
                    <p>
                      <MapPin /> {venue.location} • <Users /> {venue.capacity}
                    </p>
                  </div>
                ))}

                <button
                  className="submit-btn"
                  disabled={!selectedVenue}
                  onClick={handleSubmit}
                >
                  Submit Event
                </button>
              </>
            )}
          </div>
        )}

        {/* ================= UPCOMING EVENTS ================= */}
        {upcomingEvents.length > 0 && !selectedEvent && (
          <div className="upcoming-events">
            <h2>
              <Clock /> Upcoming Events
            </h2>
            {upcomingEvents.map((event) => (
  <div key={event.id} className="upcoming-card">
    <p className="upcoming-line">
      <span className="badge">
        {getCategoryName(event.type)}
      </span>

      <span className="sep">•</span>
      <strong>{event.eventName}</strong>

      <span className="sep">•</span>
      {event.date}

      <span className="sep">•</span>
      {event.venue.name}
    </p>

    <Trash2 className="delete-icon" />
    </div>
    ))}
    </div>
        )}
      </div>

      {/* ================= FOOTER ================= */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-section">
            <h3>🎉 Joy Juncture</h3>
            <p>
              A joyful ecosystem of games, experiences and community where play
              creates lasting connections.
            </p>
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
