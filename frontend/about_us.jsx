import React from 'react';
import { useNavigate } from 'react-router-dom';
import './about_us.css';
import logo from './src/assets/logo.png';

function AboutPage() {
  const navigate = useNavigate();

  const goTo = (path) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  return (
    <>
      {/* ================= HEADER ================= */}
      <header>
        <nav>
          <img src={logo} alt="Joy Juncture" className="logo-img" />
          <div className="logo">Joy Juncture</div>

          <ul className="nav-links">
            <li onClick={() => goTo('/')}>Home</li>
            <li onClick={() => goTo('/about_us')}>About Us</li>
            <li onClick={() => goTo('/founder_story')}>Founder Story</li>
            <li className="login-btn" onClick={() => goTo('/login')}>
              Login
            </li>
          </ul>
        </nav>
      </header>

      {/* ================= ABOUT PAGE ================= */}
      <section className="landing-section">
        <div className="landing-content">
          {/* ===== HERO ===== */}
          <h1>We Don't Just Make Games. We Spark Connections.</h1>
          <p>
            At Joy Juncture, we believe life is too short for boring evenings and awkward silences.
            We're an Indian gaming studio dedicated to bringing people back to the table.
          </p>

          {/* ===== ABOUT CONTENT CARDS ===== */}
          <div className="cards-container">
            <div className="event-card">
              <h3>The Vibe</h3>
              <p>
                We create experiences that turn friends into co-conspirators and strangers into stories you'll never forget.
              </p>
            </div>

            <div className="event-card">
              <h3>Our Philosophy</h3>
              <p>
                Connection over competition, aesthetics that feel premium, and games that are easy to learn but hard to stop playing.
              </p>
            </div>

            <div className="event-card">
              <h3>Why Joy Juncture?</h3>
              <p>
                Because the best stories happen when you gather your favorite people, open a box, and let the chaos begin.
              </p>
            </div>
          </div>
        </div>
      </section>

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
              <li onClick={() => goTo('/')}>Home</li>
              <li onClick={() => goTo('/about_us')}>About Us</li>
              <li onClick={() => goTo('/founder_story')}>Founder Story</li>
              <li onClick={() => goTo('/gamestore')}>Game Store</li>
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

export default AboutPage;
