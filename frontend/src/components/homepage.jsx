import { useNavigate } from "react-router-dom";
import Layout from "./shared/Layout";
import "./homepage.css";

function HomePage() {
  const navigate = useNavigate();

  const goTo = (path) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  return (
    <Layout className="full-width">
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
    </Layout>
  );
}

export default HomePage;