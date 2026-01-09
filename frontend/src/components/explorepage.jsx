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
import Layout from "./shared/Layout";
import "./explorepage.css";

export default function ExplorePage() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });
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
  const [loading, setLoading] = useState(false);

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

  const handleCreateEvent = (eventId) => {
    if (!isLoggedIn) {
      alert('Please login first to create events!');
      navigate('/login');
      return;
    }
    setSelectedEvent(eventId);
  };

  const handleFindVenues = async () => {
    if (!formData.eventName || !formData.date || !formData.numberOfPeople) {
      alert('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5000/api/venues/available?date=${formData.date}&capacity=${formData.numberOfPeople}`
      );
      
      if (response.ok) {
        const venues = await response.json();
        setAvailableVenues(venues);
        setFormStep(2);
      } else {
        alert('Failed to fetch venues. Please try again.');
      }
    } catch (error) {
      const venues = [
        { _id: '1', name: "Grand Hall", capacity: 200, location: "Downtown" },
        { _id: '2', name: "Garden Pavilion", capacity: 150, location: "Park Side" },
        { _id: '3', name: "Conference Center", capacity: 100, location: "Business District" },
        { _id: '4', name: "Cozy Studio", capacity: 50, location: "Arts Quarter" },
      ];
      const suitable = venues.filter(
        (v) => v.capacity >= Number(formData.numberOfPeople)
      );
      setAvailableVenues(suitable);
      setFormStep(2);
    }
    setLoading(false);
  };

  const handleSubmit = async () => {
    if (!selectedVenue) {
      alert('Please select a venue');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/venues/${selectedVenue._id}/book`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventName: formData.eventName,
          date: formData.date,
          numberOfPeople: formData.numberOfPeople,
          eventType: selectedEvent
        })
      });

      if (response.ok) {
        setUpcomingEvents([
          ...upcomingEvents,
          {
            id: Date.now(),
            ...formData,
            venue: selectedVenue,
            type: selectedEvent,
          },
        ]);
        
        alert(`Event "${formData.eventName}" has been booked successfully at ${selectedVenue.name}!`);
        
        setSelectedEvent(null);
        setFormStep(1);
        setFormData({ eventName: "", date: "", numberOfPeople: "" });
        setSelectedVenue(null);
      } else {
        const result = await response.json();
        alert(result.error || 'Failed to book venue');
      }
    } catch (error) {
      setUpcomingEvents([
        ...upcomingEvents,
        {
          id: Date.now(),
          ...formData,
          venue: selectedVenue,
          type: selectedEvent,
        },
      ]);
      
      alert(`Event "${formData.eventName}" has been booked locally!`);
      
      setSelectedEvent(null);
      setFormStep(1);
      setFormData({ eventName: "", date: "", numberOfPeople: "" });
      setSelectedVenue(null);
    }
    setLoading(false);
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
    <Layout className="full-width">
      <section className="explore-section">
        <div className="container">
        <h1 className="explore-page-title">Explore Functions</h1>

        {!selectedEvent && (
          <div className="explore-grid">
            {eventTypes.map((event) => (
              <div key={event.id} className="explore-card">
                <span className="explore-icon">{event.icon}</span>
                <h3>{event.title}</h3>
                <p className="explore-desc">{event.desc}</p>
                <button 
                  className="btn btn-primary"
                  onClick={() => handleCreateEvent(event.id)}
                >
                  <Plus /> Create Event
                </button>
              </div>
            ))}
          </div>
        )}

        {selectedEvent && (
          <div className="explore-form">
            <button className="btn btn-secondary" onClick={() => setSelectedEvent(null)}>
              <X /> Close
            </button>

            {formStep === 1 && (
              <>
                <div className="form-group">
                  <input
                    className="form-input"
                    placeholder="Event Name"
                    value={formData.eventName}
                    onChange={(e) =>
                      setFormData({ ...formData, eventName: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-input"
                    type="date"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-input"
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
                </div>
                <button className="btn btn-primary" onClick={handleFindVenues} disabled={loading}>
                  {loading ? 'Finding Venues...' : 'Find Venues'} <ArrowRight />
                </button>
              </>
            )}

            {formStep === 2 && (
              <>
                <div className="venues-grid">
                  {availableVenues.map((venue) => (
                    <div
                      key={venue._id}
                      className={`venue-card ${
                        selectedVenue?._id === venue._id ? "active" : ""
                      }`}
                      onClick={() => setSelectedVenue(venue)}
                    >
                      <h4>{venue.name}</h4>
                      <p>
                        <MapPin /> {venue.location || 'Location TBD'} • <Users /> {venue.capacity}
                      </p>
                    </div>
                  ))}
                </div>

                <button
                  className="btn btn-primary"
                  disabled={!selectedVenue || loading}
                  onClick={handleSubmit}
                >
                  {loading ? 'Booking...' : 'Submit Event'}
                </button>
              </>
            )}
          </div>
        )}

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
      </section>
    </Layout>
  );
}