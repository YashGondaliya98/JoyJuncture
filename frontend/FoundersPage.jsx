import React from 'react';
import { useNavigate } from 'react-router-dom';
import './founder_story.css';
import logo from './src/assets/logo.png';

const FoundersPage = () => {
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

      <div className="founders-page-root">
        <div className="brand-logo">Joy Juncture</div>

        <main className="main-card">
          {/* HERO */}
          <section className="hero">
            <h1>
              Our <span>(Accidentally Awesome)</span> Story
            </h1>
          </section>

          {/* STORY */}
          <section className="story-content">
            <p>
              <span className="highlight">Honestly?</span> There's no dramatic
              "lifelong passion" backstory here—just two people who
              figured out they're pretty good at creating chaos, laughter, and
              the kind of competitive tension that turns friends into frenemies.
            </p>

            <p>
              Instead of sticking with the family business (textiles and
              electricals—thrilling, right?), we thought, why not channel our
              inner entrepreneurs? <strong>Spoiler:</strong> we have no idea what
              we're doing, but we've got some "big" dreams for a
              fancy office, preferably with a sea view and a foosball table.
            </p>

            <p>
              Now here we are, turning what started as random ideas into something
              real, fun, and (fingers crossed) successful.
            </p>

            <p
              style={{
                fontWeight: 500,
                color: 'var(--brand-blue)',
              }}
            >
              So, hop on board this wild ride—no family legacy here, just two
              accidental game-makers with a knack for turning spontaneous ideas
              into epic fun!
            </p>
          </section>

          {/* TEAM */}
          <section className="team">
            <h2>Meet the Minds</h2>
            <p className="team-subtitle">Behind the Madness</p>

            <div className="founders-grid">
              <div className="founder-card">
                <div className="founder-name">Khushi Poddar</div>
                <div className="founder-role">The Dreamer-in-Chief</div>
                <div className="founder-desc">
                  With a knack for bringing wild ideas to life.
                </div>
              </div>

              <div className="founder-card">
                <div className="founder-name">Muskan Poddar</div>
                <div className="founder-role">The Design Whiz</div>
                <div className="founder-desc">
                  Making sure every card, board, and token looks as amazing as it
                  feels.
                </div>
              </div>
            </div>
          </section>
        </main>
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
};

export default FoundersPage;
