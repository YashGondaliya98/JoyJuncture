import React from 'react';
import { Link } from 'react-router-dom';
import Layout from './src/components/shared/Layout';
import './profile.css';

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

  return (
    <Layout>
      <div className="container">
        <div className="profile-header">
          <div className="profile-nav">
            <Link to="/">Home</Link>
            <Link to="/wallet">Wallet</Link>
            <Link to="/profile" className="active">Profile</Link>
            <Link to="/login">Log Out</Link>
          </div>
        </div>

        <div className="profile-container">
          <aside className="user-sidebar">
            <div className="avatar">{initials}</div>
            <div className="user-name">{name}</div>
            <div className="user-email">{email}</div>

            <div className="user-details">
              <div className="detail-row">
                <span className="detail-label">Phone</span>
                <span className="detail-val">{phone}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">City</span>
                <span className="detail-val">{city}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Member Since</span>
                <span className="detail-val">{joined}</span>
              </div>
            </div>
          </aside>

          <div className="profile-content">
            <div className="wallet-banner">
              <div className="wallet-info">
                <h3>Wallet Balance</h3>
                <div className="wallet-points">
                  {points.toLocaleString()} pts
                </div>
              </div>
              <Link to="/wallet" className="btn btn-primary">
                View Wallet
              </Link>
            </div>

            <div className="grid grid-2">
              <div className="card">
                <h4>Your Game Store</h4>
                <div className="game-list">
                  {myGames.map((game, idx) => (
                    <div className="game-item" key={idx}>
                      <span className="game-icon">🎲</span>
                      <span className="game-name">{game.name}</span>
                      <span className="game-type">{game.type}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card">
                <h4>Past Experience</h4>
                <div className="history-list">
                  {history.map((item, idx) => (
                    <div className="history-item" key={idx}>
                      <span className="history-icon">🗓️</span>
                      <div className="history-text">
                        <div className="history-event">{item.event}</div>
                        <div className="history-date">{item.date}</div>
                      </div>
                      <span className="history-reward">{item.reward}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;