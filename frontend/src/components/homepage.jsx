import { useState } from "react";
import "./HomePage.css";
import logo from "../assets/logo.png";

function HomePage() {
  const [activePage, setActivePage] = useState("home");

  const showPage = (page) => {
    setActivePage(page);
    window.scrollTo(0, 0);
  };

  return (
    <>
      {/* ================= HEADER ================= */}
      <header>
        <nav>
          <img src={logo} alt="Joy Juncture" className="logo-img" />
          <div className="logo"> Joy Juncture</div>
          <ul className="nav-links">
            <li onClick={() => showPage("home")}>Home</li>
            <li onClick={() => showPage("about")}>About Us</li>
            <li onClick={() => showPage("founder")}>Founder Story</li>
            <li className="login-btn" onClick={() => showPage("login")}>
              Login
            </li>
          </ul>
        </nav>
      </header>

      {/* ================= HOME PAGE ================= */}
      {activePage === "home" && (
        <section className="landing-section">
          <div className="landing-content">
            {/* ===== SECTION 1 : HERO ===== */}
            <h1>Where Games Become Memories</h1>
            <p>
              Joy Juncture is an experience-first gaming platform that brings
              people together through board games, card games, live game nights
              and joyful celebrations. We believe games are not just products —
              they are moments of connection, laughter and belonging.
            </p>

            {/* ===== SECTION 2 : 3 MAIN CARDS ===== */}
            <div className="cards-container">
              <div className="event-card" onClick={() => showPage("explore")}>
                <div className="card-icon">🎯</div>
                <h3>Explore Functions</h3>
                <p>
                  Discover curated board & card games designed for families,
                  friends and communities. Find games for every mood,
                  occasion and play style.
                </p>
                <button className="card-btn">Explore</button>
              </div>

              <div className="event-card" onClick={() => showPage("reviews")}>
                <div className="card-icon">⭐</div>
                <h3>Review Functions</h3>
                <p>
                  Read real stories and experiences shared by players,
                  communities and event participants who have played with
                  Joy Juncture.
                </p>
                <button className="card-btn">Reviews</button>
              </div>

              <div className="event-card" onClick={() => showPage("gamestore")}>
                <div className="card-icon">🎮</div>
                <h3>Game Store</h3>
                <p>
                  Explore and purchase Joy Juncture games, earn reward points
                  and begin your journey into playful, meaningful experiences.
                </p>
                <button className="card-btn">Store</button>
              </div>
            </div>

            {/* ===== SECTION 3 : SUPPORTING TEXT ===== */}
            <p style={{ marginTop: "3rem", maxWidth: "800px", marginInline: "auto" }}>
              Joy Juncture brings together games, live events, custom experiences
              and a growing community into one joyful ecosystem. Whether you are
              playing at home, attending a game night or celebrating a special
              occasion — Joy Juncture helps you play, connect and belong.
            </p>
          </div>
        </section>
      )}

      {/* ================= GAME STORE ================= */}
      

      {/* ================= FOOTER ================= */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-section">
            <h3>🎉 Joy Juncture</h3>
            <p>
              A joyful ecosystem of games, experiences and community where
              play creates lasting connections.
            </p>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li onClick={() => showPage("home")}>Home</li>
              <li onClick={() => showPage("about")}>About Us</li>
              <li onClick={() => showPage("founder")}>Founder Story</li>
              <li onClick={() => showPage("gamestore")}>Game Store</li>
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
