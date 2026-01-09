import React, { useState } from 'react';
import Layout from './src/components/shared/Layout';
import './admin.css';

const initialGames = [
  { name: "Dead Man's Deck", status: 'Active' },
  { name: 'Mehfil', status: 'Active' },
  { name: 'Tamasha', status: 'Blocked' },
];

const addableGames = [
  'The Bloody Inheritance',
  'Buzzed',
  'Judge Me & Guess',
  'One More Round',
  "Dead Man's Deck (Re-stock)",
  'Mehfil (Re-stock)',
  'Tamasha (Re-stock)',
];

const venues = [
  'Main Hall A (Capacity: 150)',
  'Garden Area (Capacity: 50)',
  'Rooftop Terrace (Capacity: 80)',
];

const AdminDashboard = () => {
  const [games, setGames] = useState(initialGames);
  const [newGame, setNewGame] = useState('');
  const [blockGameName, setBlockGameName] = useState('');
  const [selectedVenue, setSelectedVenue] = useState(venues[0]);
  const [selectedDate, setSelectedDate] = useState('');

  const handleAddGame = () => {
    if (!newGame) {
      window.alert('Please select a game from the list.');
      return;
    }
    setGames((prev) => [...prev, { name: newGame, status: 'Active' }]);
    setNewGame('');
  };

  const handleBlockGame = () => {
    if (!blockGameName) {
      window.alert('Please select a game from the list first.');
      return;
    }

    let found = false;
    const updated = games.map((g) => {
      if (g.name === blockGameName) {
        found = true;
        return { ...g, status: 'Blocked' };
      }
      return g;
    });

    if (!found) {
      window.alert('Game not active in the current catalog.');
      return;
    }

    setGames(updated);
    window.alert(`${blockGameName} has been blocked.`);
    setBlockGameName('');
  };

  const handleBookVenue = () => {
    if (!selectedDate) {
      window.alert('Please select a date first.');
      return;
    }
    window.alert(
      `Venue '${selectedVenue}' booked for ${selectedDate}. It is now blocked for other functions on this date.`
    );
  };

  const blockOptions = Array.from(new Set(games.map((g) => g.name)));

  return (
    <Layout>
      <div className="container">
        <div className="admin-content">
          <h1>Admin Dashboard</h1>
          
          <div className="admin-profile-card">
            <div className="admin-avatar">AD</div>
            <div className="admin-info">
              <h3>Admin Profile</h3>
              <p><strong>Name:</strong> Khushi Poddar & Muskan Poddar</p>
              <p><strong>Email:</strong> admin@joyjuncture.com</p>
              <p><strong>Role:</strong> Administrator</p>
            </div>
          </div>

          <div className="management-grid">
            <div className="dashboard-column">
              <h2>Game Management</h2>

              <label>Current Catalog</label>
              <div className="game-list-container">
                {games.map((game, idx) => (
                  <div className="game-item" key={idx}>
                    <span>{game.name}</span>
                    <span className={`game-status ${game.status === 'Blocked' ? 'blocked' : ''}`}>
                      {game.status}
                    </span>
                  </div>
                ))}
              </div>

              <div className="admin-actions">
                <div className="input-group">
                  <label>Add New Game</label>
                  <select
                    className="form-input"
                    value={newGame}
                    onChange={(e) => setNewGame(e.target.value)}
                  >
                    <option value="" disabled>Select a game to add...</option>
                    {addableGames.map((g) => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                  <button className="btn btn-primary" onClick={handleAddGame}>
                    + Add to List
                  </button>
                </div>

                <div className="input-group">
                  <label>Block A Game</label>
                  <select
                    className="form-input"
                    value={blockGameName}
                    onChange={(e) => setBlockGameName(e.target.value)}
                  >
                    <option value="" disabled>Select a game to block...</option>
                    {blockOptions.map((name) => (
                      <option key={name} value={name}>{name}</option>
                    ))}
                  </select>
                  <button className="btn btn-secondary" onClick={handleBlockGame}>
                    Block Selected Game
                  </button>
                </div>
              </div>
            </div>

            <div className="dashboard-column">
              <h2>Venue & Functions</h2>

              <div className="input-group">
                <label>Select Venue (With Capacity)</label>
                <select
                  className="form-input"
                  value={selectedVenue}
                  onChange={(e) => setSelectedVenue(e.target.value)}
                >
                  {venues.map((v) => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
              </div>

              <div className="input-group">
                <label>Function Date</label>
                <input
                  className="form-input"
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </div>

              <button className="btn btn-primary" onClick={handleBookVenue}>
                Add Function & Block Venue
              </button>

              <div className="logic-note">
                <strong>System Note:</strong> After adding one function on a
                specific venue & date, the system will automatically
                block that venue for any other function requests.
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;