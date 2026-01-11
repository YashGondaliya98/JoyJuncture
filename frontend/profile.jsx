import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from './src/components/shared/Layout';
import './profile.css';

const ProfilePage = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem('user'));
        console.log('User data from localStorage:', userData);
        
        if (!userData || !userData.id) {
          console.log('No user data found, redirecting to login');
          window.location.href = '/login';
          return;
        }

        const response = await fetch(`http://localhost:5000/profile/${userData.id}`);
        const data = await response.json();
        console.log('Profile response:', data);

        if (data.success) {
          setUserProfile(data.profile);
        } else {
          console.error('Profile fetch failed:', data.error);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
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
          <div style={{ textAlign: 'center', padding: '50px' }}>Loading...</div>
        </div>
      </Layout>
    );
  }

  if (!userProfile) {
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
          <div style={{ textAlign: 'center', padding: '50px' }}>Profile not found</div>
        </div>
      </Layout>
    );
  }

  const initials = userProfile.fullName ? userProfile.fullName.split(' ').map(n => n[0]).join('').toUpperCase() : 'U';
  const joinedDate = userProfile.joinedAt ? new Date(userProfile.joinedAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Unknown';

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
            <div className="user-name">{userProfile.fullName || 'User'}</div>
            <div className="user-email">{userProfile.email || 'No email'}</div>

            <div className="user-details">
              <div className="detail-row">
                <span className="detail-label">Phone</span>
                <span className="detail-val">{userProfile.phone || 'Not provided'}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">City</span>
                <span className="detail-val">{userProfile.city || 'Not provided'}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Member Since</span>
                <span className="detail-val">{joinedDate}</span>
              </div>
            </div>
          </aside>

          <div className="profile-content">
            <div className="wallet-banner">
              <div className="wallet-info">
                <h3>Wallet Balance</h3>
                <div className="wallet-points">
                  {(userProfile.joyPoints || 0).toLocaleString()} pts
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
                  {userProfile.purchasedGames && userProfile.purchasedGames.length > 0 ? (
                    userProfile.purchasedGames.map((game, idx) => (
                      <div className="game-item" key={idx}>
                        <span className="game-icon">🎲</span>
                        <span className="game-name">{game}</span>
                        <span className="game-type">Game</span>
                      </div>
                    ))
                  ) : (
                    <div style={{ textAlign: 'center', color: '#666', padding: '20px' }}>
                      No games purchased yet
                    </div>
                  )}
                </div>
              </div>

              <div className="card">
                <h4>Past Experience</h4>
                <div className="history-list">
                  <div className="history-item">
                    <span className="history-icon">🗓️</span>
                    <div className="history-text">
                      <div className="history-event">Joined Joy Juncture</div>
                      <div className="history-date">{joinedDate}</div>
                    </div>
                    <span className="history-reward">Welcome</span>
                  </div>
                  <div className="history-item">
                    <span className="history-icon">🎮</span>
                    <div className="history-text">
                      <div className="history-event">Player Status</div>
                      <div className="history-date">Current</div>
                    </div>
                    <span className="history-reward">{userProfile.playerStatus || 'Beginner'}</span>
                  </div>
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