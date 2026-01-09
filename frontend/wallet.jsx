import React from 'react';
import { Link } from 'react-router-dom';
import Layout from './src/components/shared/Layout';
import './wallet.css';

const WalletPage = () => {
  const points = 2500;
  const rate = 1;
  const value = points * rate;

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
            <div className="avatar-large">KP</div>
            <h2>Khushi Poddar</h2>
            
            <div className="profile-details">
              <div className="profile-item">
                <span className="profile-label">Player Status</span>
                <span className="profile-value">Gold Member</span>
              </div>
              <div className="profile-item">
                <span className="profile-label">Joined</span>
                <span className="profile-value">August 2024</span>
              </div>
              <div className="profile-item">
                <span className="profile-label">Email</span>
                <span className="profile-value">khushi@example.com</span>
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
              <div className="history-item">
                <span>Win: Dead Man's Deck</span>
                <span className="points-gain">+ 500 pts</span>
              </div>
              <div className="history-item">
                <span>Converted to Cash</span>
                <span className="points-loss">- 1000 pts</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default WalletPage;