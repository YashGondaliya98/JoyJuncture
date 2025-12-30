import { useNavigate } from "react-router-dom";
import "./homepage.css";
import logo from "../assets/logo.png";

function HomePage() {
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
            <li onClick={() => goTo("/")}>Home</li>
            <li onClick={() => goTo("/about")}>About Us</li>
            <li onClick={() => goTo("/founder")}>Founder Story</li>
            <li className="login-btn" onClick={() => goTo("/login")}>
              Login
            </li>
          </ul>
        </nav>
      </header>

      {/* ================= HOME PAGE ================= */}
      <section className="landing-section">
        <div className="landing-content">
          {/* ===== HERO ===== */}
          <h1>Where Games Become Memories</h1>
          <p>
            Joy Juncture is an experience-first gaming platform that brings
            people together through board games, card games, live game nights
            and joyful celebrations.
          </p>

          {/* ===== CARDS ===== */}
          <div className="cards-container">
            <div className="event-card" onClick={() => goTo("/explore")}>
              <div className="card-icon">🎯</div>
              <h3>Explore Functions</h3>
              <p>
                Discover curated board & card games designed for families,
                friends and communities.
              </p>
              <button className="card-btn">Explore</button>
            </div>

            <div className="event-card" onClick={() => goTo("/reviews")}>
              <div className="card-icon">⭐</div>
              <h3>Review Functions</h3>
              <p>
                Read real stories and experiences shared by players and event
                participants.
              </p>
              <button className="card-btn">Reviews</button>
            </div>

            <div className="event-card" onClick={() => goTo("/gamestore")}>
              <div className="card-icon">🎮</div>
              <h3>Game Store</h3>
              <p>
                Explore and purchase Joy Juncture games and begin your journey.
              </p>
              <button className="card-btn">Store</button>
            </div>
          </div>

          <p
            style={{
              marginTop: "3rem",
              maxWidth: "800px",
              marginInline: "auto",
            }}
          >
            Joy Juncture brings together games, live events, custom experiences
            and a growing community into one joyful ecosystem.
          </p>
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
              <li onClick={() => goTo("/")}>Home</li>
              <li onClick={() => goTo("/about")}>About Us</li>
              <li onClick={() => goTo("/founder")}>Founder Story</li>
              <li onClick={() => goTo("/gamestore")}>Game Store</li>
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

export default HomePage;
