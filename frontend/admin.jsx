import React, { useState, useEffect } from 'react';
import Layout from './src/components/shared/Layout';
import './admin.css';

const LABELS = {
  CURRENT_CATALOG: 'Current Catalog',
  ADD_NEW_GAME: 'Add New Game',
  BLOCK_A_GAME: 'Block A Game',
  VENUE_NAME: 'Venue Name',
  CAPACITY: 'Capacity / No. of People'
};

const AdminDashboard = () => {
  const [adminProfile, setAdminProfile] = useState(null);
  const [games, setGames] = useState([]);
  const [venues, setVenues] = useState([]);
  const [newGameName, setNewGameName] = useState('');
  const [blockGameId, setBlockGameId] = useState('');
  const [venueName, setVenueName] = useState('');
  const [venueCapacity, setVenueCapacity] = useState('');
  const [selectedVenue, setSelectedVenue] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminProfile();
    fetchGames();
    fetchVenues();
  }, []);

  const fetchAdminProfile = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user && user.id) {
        const response = await fetch(`https://joyjuncture-b.onrender.com/admin/profile/${user.id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.success) {
          setAdminProfile(data.admin);
        } else {
          console.error('Failed to fetch admin profile:', data.error);
        }
      }
    } catch (error) {
      console.error('Error fetching admin profile:', error);
    }
  };

  const fetchGames = async () => {
    try {
      const response = await fetch('https://joyjuncture-b.onrender.com/api/games');
      const data = await response.json();
      if (data.success) {
        setGames(data.games);
      }
    } catch (error) {
      console.error('Error fetching games:', error);
    }
  };

  const fetchVenues = async () => {
    try {
      const response = await fetch('https://joyjuncture-b.onrender.com/api/venues');
      const data = await response.json();
      if (data.success) {
        setVenues(data.venues);
        if (data.venues.length > 0) {
          setSelectedVenue(data.venues[0]._id);
        }
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching venues:', error);
      setLoading(false);
    }
  };

  const handleAddGame = async () => {
    if (!newGameName) {
      window.alert('Please enter a game name.');
      return;
    }
    
    try {
      const response = await fetch('https://joyjuncture-b.onrender.com/api/games', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify({ name: newGameName })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      if (data.success) {
        setGames([...games, data.game]);
        setNewGameName('');
        window.alert('Game added successfully!');
      } else {
        window.alert(data.error || 'Failed to add game');
      }
    } catch (error) {
      console.error('Error adding game:', error);
      window.alert('Error adding game');
    }
  };

  const handleBlockGame = async () => {
    if (!blockGameId) {
      window.alert('Please select a game to block.');
      return;
    }

    try {
      const response = await fetch(`https://joyjuncture-b.onrender.com/api/games/${blockGameId}/block`, {
        method: 'PATCH',
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      if (data.success) {
        setGames(games.filter(g => g._id !== blockGameId));
        setBlockGameId('');
        window.alert('Game blocked successfully!');
      } else {
        window.alert(data.error || 'Failed to block game');
      }
    } catch (error) {
      console.error('Error blocking game:', error);
      window.alert('Error blocking game');
    }
  };

  const handleAddVenue = async () => {
    if (!venueName || !venueCapacity) {
      window.alert('Please enter venue name and capacity.');
      return;
    }
    
    try {
      const response = await fetch('https://joyjuncture-b.onrender.com/api/venues', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify({ 
          name: venueName, 
          capacity: parseInt(venueCapacity) 
        })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      if (data.success) {
        setVenues([...venues, data.venue]);
        setVenueName('');
        setVenueCapacity('');
        window.alert('Venue added successfully!');
      } else {
        window.alert(data.error || 'Failed to add venue');
      }
    } catch (error) {
      console.error('Error adding venue:', error);
      window.alert('Error adding venue');
    }
  };

  const handleBookVenue = () => {
    if (!selectedDate) {
      window.alert('Please select a date first.');
      return;
    }
    const venue = venues.find(v => v._id === selectedVenue);
    window.alert(
      `Venue '${venue?.name}' booked for ${selectedDate}. It is now blocked for other functions on this date.`
    );
  };

  const getAdminInitials = (fullName) => {
    if (!fullName) return 'AD';
    return fullName.split(' ').map(name => name[0]).join('').toUpperCase();
  };

  if (loading) {
    return (
      <Layout>
        <div className="container">
          <div style={{ textAlign: 'center', padding: '50px' }}>Loading...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container">
        <div className="admin-content">
          <h1>Admin Dashboard</h1>
          
          <div className="admin-profile-card">
            <div className="admin-avatar">
              {adminProfile ? getAdminInitials(adminProfile.fullName) : 'AD'}
            </div>
            <div className="admin-info">
              <h3>Admin Profile</h3>
              <p><strong>Name:</strong> {adminProfile?.fullName || 'Loading...'}</p>
              <p><strong>Email:</strong> {adminProfile?.email || 'Loading...'}</p>
              <p><strong>Role:</strong> {adminProfile?.role || 'Administrator'}</p>
            </div>
          </div>

          <div className="management-grid">
            <div className="dashboard-column">
              <h2>Game Management</h2>

              <label>{LABELS.CURRENT_CATALOG}</label>
              <div className="game-list-container">
                {games.map((game) => (
                  <div className="game-item" key={game._id}>
                    <span>{game.name}</span>
                    <span className="game-status">
                      Active
                    </span>
                  </div>
                ))}
              </div>

              <div className="admin-actions">
                <div className="input-group">
                  <label>{LABELS.ADD_NEW_GAME}</label>
                  <input
                    className="form-input"
                    type="text"
                    placeholder="Enter game name..."
                    value={newGameName}
                    onChange={(e) => setNewGameName(e.target.value)}
                  />
                </div>

                <button className="btn btn-primary" onClick={handleAddGame}>
                  + Add to List
                </button>

                <div className="input-group" style={{ marginTop: '20px' }}>
                  <label>{LABELS.BLOCK_A_GAME}</label>
                  <select
                    className="form-input"
                    value={blockGameId}
                    onChange={(e) => setBlockGameId(e.target.value)}
                  >
                    <option value="" disabled>Select a game to block...</option>
                    {games.map((game) => (
                      <option key={game._id} value={game._id}>{game.name}</option>
                    ))}
                  </select>
                </div>

                <button className="btn btn-secondary" onClick={handleBlockGame}>
                  Block Selected Game
                </button>
              </div>
            </div>

            <div className="dashboard-column">
              <h2>Venue & Functions</h2>

              <div className="input-group">
                <label>{LABELS.VENUE_NAME}</label>
                <input
                  className="form-input"
                  type="text"
                  placeholder="Enter venue name..."
                  value={venueName}
                  onChange={(e) => setVenueName(e.target.value)}
                />
              </div>

              <div className="input-group">
                <label>{LABELS.CAPACITY}</label>
                <input
                  className="form-input"
                  type="number"
                  placeholder="Enter capacity..."
                  value={venueCapacity}
                  onChange={(e) => setVenueCapacity(e.target.value)}
                />
              </div>

              <button className="btn btn-primary" onClick={handleAddVenue}>
                Add Venue
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