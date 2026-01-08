import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './profile.css';
import logo from './src/assets/logo.png';

const userProfile = {
  name: 'Khushi Poddar',
  initials: 'KP',
  email: 'khushi@example.com',
  phone: '+91 98765 43210',
  city: 'Surat, Gujarat',
  joined: 'Aug 2024',
  points: 2500,
  myGames: [
    { name: "Dead Man's Deck", type: 'Card Game' },
    { name: 'Mehfil', type: 'Music' },
    { name: 'Tamasha', type: 'Party' },
  ],
  history: [
    { event: "Won 'Tamasha' Night", date: '2 days ago', reward: '+500 pts' },
    { event: 'Played at Garden Venue', date: '1 week ago', reward: 'XP Gained' },
    { event: "Bought 'Mehfil' Deck", date: '2 weeks ago', reward: '-799 pts' },
    { event: 'Joined Joy Juncture', date: 'Aug 2024', reward: 'Welcome' },
  ],
};

const ProfilePage = () => {
  const {
    name,
    initials,
    email,
    phone,
    city,
    joined,
    points,
    myGames,
    history,
  } = userProfile;

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
              Logout
            </li>
          </ul>
        </nav>
      </header>

      <main className="main-card">
      {/* HEADER */}
      <div className="dashboard-header">
        <div className="brand-logo-small">Joy Juncture</div>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/wallet">Wallet</Link>
          <Link
            to="/profile"
            style={{ borderBottom: '2px solid var(--brand-blue)' }}
          >
            Profile
          </Link>
          <Link to="/login">Log Out</Link>
        </div>
      </div>

      <div className="profile-container">
        {/* LEFT SIDEBAR: USER DETAILS */}
        <aside className="user-details-sidebar">
          <div className="avatar">{initials || '--'}</div>
          <div className="user-name">{name || 'Loading...'}</div>
          <div className="user-email">{email || '...'}</div>

          <div style={{ width: '100%', marginTop: '10px' }}>
            <div className="detail-row">
              <span className="detail-label">Phone</span>
              <span className="detail-val">{phone || '--'}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">City</span>
              <span className="detail-val">{city || '--'}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Member Since</span>
              <span className="detail-val">{joined || '--'}</span>
            </div>
          </div>
        </aside>

        {/* RIGHT CONTENT AREA */}
        <div className="content-area">
          {/* WALLET BANNER */}
          <div className="wallet-banner">
            <div className="wallet-info">
              <h3>Wallet Balance</h3>
              <div className="wallet-points">
                {points.toLocaleString()} pts
              </div>
            </div>
            <a href="wallet.html" className="wallet-btn">
              View Wallet
            </a>
          </div>

          {/* GAME STORE + HISTORY */}
          <div className="lists-grid">
            {/* GAME STORE */}
            <div className="info-card">
              <div className="card-title">Your Game Store</div>
              <div className="scroll-list">
                {myGames && myGames.length > 0 ? (
                  myGames.map((game, idx) => (
                    <div className="list-item" key={idx}>
                      <span className="list-icon">🎲</span>
                      <span className="list-text">{game.name}</span>
                      <span className="list-tag">{game.type}</span>
                    </div>
                  ))
                ) : (
                  <div
                    style={{
                      padding: '10px',
                      color: '#aaa',
                      fontStyle: 'italic',
                    }}
                  >
                    No games owned yet.
                  </div>
                )}
              </div>
            </div>

            {/* HISTORY */}
            <div className="info-card">
              <div className="card-title">Past Experience</div>
              <div className="scroll-list">
                {history && history.length > 0 ? (
                  history.map((item, idx) => (
                    <div className="list-item" key={idx}>
                      <span className="list-icon">🗓️</span>
                      <div className="list-text">
                        <div style={{ fontWeight: 600 }}>{item.event}</div>
                        <div
                          style={{
                            fontSize: '0.75rem',
                            color: '#888',
                          }}
                        >
                          {item.date}
                        </div>
                      </div>
                      <span
                        style={{
                          fontWeight: 600,
                          color: 'var(--brand-blue)',
                        }}
                      >
                        {item.reward}
                      </span>
                    </div>
                  ))
                ) : (
                  <div
                    style={{
                      padding: '10px',
                      color: '#aaa',
                      fontStyle: 'italic',
                    }}
                  >
                    No history yet.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

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

export default ProfilePage;