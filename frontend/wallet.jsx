import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from './src/components/shared/Layout';
import './wallet.css';

const WalletPage = () => {
  const [walletData, setWalletData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWallet = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem('user'));
        console.log('User data from localStorage:', userData);
        
        if (!userData || !userData.id) {
          console.log('No user data found, redirecting to login');
          window.location.href = '/login';
          return;
        }

        const response = await fetch(`https://joyjuncture-b.onrender.com/user/wallet/${userData.id}`);
        const data = await response.json();
        console.log('Wallet response:', data);

        if (data.success) {
          setWalletData(data);
        } else {
          console.error('Wallet fetch failed:', data.error);
        }
      } catch (error) {
        console.error('Error fetching wallet:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWallet();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="container">
          <div className="wallet-header">
            <div className="wallet-nav">
              <Link to="/">Home</Link>
              <span className="active">Wallet</span>
              <Link to="/profile">My Profile</Link>
            </div>
          </div>
          <div style={{ textAlign: 'center', padding: '50px' }}>Loading...</div>
        </div>
      </Layout>
    );
  }

  if (!walletData) {
    return (
      <Layout>
        <div className="container">
          <div className="wallet-header">
            <div className="wallet-nav">
              <Link to="/">Home</Link>
              <span className="active">Wallet</span>
              <Link to="/profile">My Profile</Link>
            </div>
          </div>
          <div style={{ textAlign: 'center', padding: '50px' }}>Wallet not found</div>
        </div>
      </Layout>
    );
  }

  const points = walletData.joyPoints || 0;
  const rate = 1;
  const value = points * rate;
  const initials = walletData.fullName ? walletData.fullName.split(' ').map(n => n[0]).join('').toUpperCase() : 'U';
  const joinedDate = walletData.joinedAt ? new Date(walletData.joinedAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'Unknown';

  const handleConvertPoints = () => {
    const ok = window.confirm(
      `Do you want to convert ${points.toLocaleString()} Points into ₹${value.toLocaleString()}?`
    );
    if (ok) {
      window.alert(
        'Conversion request sent! Your wallet will be updated shortly.'
      );
    }
  };

  const handleWithdrawForGame = () => {
    window.alert('Redirecting to Game Store...');
  };

  return (
    <Layout>
      <div className="container">
        <div className="wallet-header">
          <div className="wallet-nav">
            <Link to="/">Home</Link>
            <span className="active">Wallet</span>
            <Link to="/profile">My Profile</Link>
          </div>
        </div>

        <div className="wallet-content">
          <div className="profile-section">
            <div className="avatar-large">{initials}</div>
            <h2>{walletData.fullName || 'User'}</h2>
            
            <div className="profile-details">
              <div className="profile-item">
                <span className="profile-label">Player Status</span>
                <span className="profile-value">{walletData.playerStatus || 'Beginner'}</span>
              </div>
              <div className="profile-item">
                <span className="profile-label">Joined</span>
                <span className="profile-value">{joinedDate}</span>
              </div>
              <div className="profile-item">
                <span className="profile-label">Email</span>
                <span className="profile-value">{walletData.email || 'No email'}</span>
              </div>
            </div>
          </div>

          <div className="wallet-section">
            <div className="balance-card">
              <div className="balance-title">Your Joy Points</div>
              <div className="points-amount">
                {points.toLocaleString()} <span>pts</span>
              </div>
              <div className="rupee-value">
                Current Value: ₹ {value.toLocaleString()}
              </div>
              <div className="conversion-rate">
                Rate: 1 Point = ₹ 1.00
              </div>
            </div>

            <div className="actions-grid">
              <button className="btn btn-primary" onClick={handleConvertPoints}>
                💱 Convert to Cash
              </button>
              <button className="btn btn-secondary" onClick={handleWithdrawForGame}>
                🛍️ Withdraw for Game Buy
              </button>
            </div>

            <div className="history-section">
              <h3>Points History</h3>
              {walletData.pointsHistory && walletData.pointsHistory.length > 0 ? (
                walletData.pointsHistory.map((item, idx) => (
                  <div className="history-item" key={idx}>
                    <span>
                      {item.actionType === 'game_win' ? `Win: ${item.referenceId || 'Game'}` : 'Converted to Cash'}
                    </span>
                    <span className={item.pointsChange > 0 ? "points-gain" : "points-loss"}>
                      {item.pointsChange > 0 ? '+' : ''}{item.pointsChange} pts
                    </span>
                  </div>
                ))
              ) : (
                <div className="history-item">
                  <span>No points history yet</span>
                  <span className="points-gain">Start playing!</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default WalletPage;