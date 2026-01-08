import React from 'react';
import { Link } from 'react-router-dom';
import SiteLayout from './src/components/SiteLayout';
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
    <SiteLayout>
      <main className="main-card">
      {/* HEADER */}
      <div className="dashboard-header">
        <div className="brand-logo-small">Joy Juncture</div>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <span style={{ borderBottom: '2px solid var(--brand-blue)' }}>
            Wallet
          </span>
          <Link to="/profile">My Profile</Link>
        </div>
      </div>

      <div className="wallet-content">
        {/* LEFT: PLAYER PROFILE */}
        <div className="profile-section">
          <div className="avatar-large">KP</div>
          <h2>Khushi Poddar</h2>

          <div className="profile-label">Player Status</div>
          <div className="profile-value">Gold Member</div>

          <div className="profile-label">Joined</div>
          <div className="profile-value">August 2024</div>

          <div className="profile-label">Email</div>
          <div className="profile-value">khushi@example.com</div>
        </div>

        {/* RIGHT: WALLET INFO */}
        <div>
          <div className="balance-card">
            <div className="balance-title">Your Joy Points</div>
            <div className="points-amount">
              {points.toLocaleString()}{' '}
              <span style={{ fontSize: '1.5rem' }}>pts</span>
            </div>

            <div className="rupee-value">
              Current Value: ₹ {value.toLocaleString()}
            </div>

            <div className="conversion-rate">
              Rate: 1 Point = ₹ 1.00
            </div>
          </div>

          <div className="actions-grid">
            <button className="action-btn" onClick={handleConvertPoints}>
              <span className="btn-icon">💱</span>
              Convert to Cash
            </button>

            <button className="action-btn" onClick={handleWithdrawForGame}>
              <span className="btn-icon">🛍️</span>
              Withdraw for Game Buy
            </button>
          </div>

          <div style={{ marginTop: '30px' }}>
            <h3
              style={{
                fontSize: '1.1rem',
                borderBottom: '1px solid #e2e8f0',
                paddingBottom: '10px',
                color: 'var(--text-light)',
              }}
            >
              Points History
            </h3>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '15px 0',
                borderBottom: '1px solid #f1f5f9',
                fontSize: '0.9rem',
              }}
            >
              <span>Win: Dead Man&apos;s Deck</span>
              <span
                style={{
                  color: 'var(--success-green)',
                  fontWeight: 600,
                }}
              >
                + 500 pts
              </span>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '15px 0',
                borderBottom: '1px solid #f1f5f9',
                fontSize: '0.9rem',
              }}
            >
              <span>Converted to Cash</span>
              <span
                style={{
                  color: 'var(--text-dark)',
                  fontWeight: 600,
                }}
              >
                - 1000 pts
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
    </SiteLayout>
  );
};

export default WalletPage;