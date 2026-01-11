import React, { useState, useEffect } from "react";
import { Gamepad2 } from "lucide-react";
import Layout from "./shared/Layout";
import "./gamestore.css";

const GameStore = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [walletPoints, setWalletPoints] = useState(500);
  const [purchasedGames, setPurchasedGames] = useState([]);
  const [showMessage, setShowMessage] = useState(null);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/games?status=active');
      const data = await response.json();
      if (data.success) {
        setGames(data.games);
      }
    } catch (error) {
      console.error('Error fetching games:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ["All", "board", "puzzle", "arcade", "card"];

  const filteredGames = games.filter(game =>
    (game.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      game.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedCategory === "All" || game.type === selectedCategory)
  );

  const displayMessage = (text, type) => {
    setShowMessage({ text, type });
    setTimeout(() => setShowMessage(null), 3000);
  };

  const handleBuyGame = game => {
    if (purchasedGames.includes(game._id)) {
      displayMessage(`You already own ${game.name}`, "info");
      return;
    }

    if (walletPoints >= game.points) {
      setWalletPoints(walletPoints - game.points);
      setPurchasedGames([...purchasedGames, game._id]);
      displayMessage(`Purchased ${game.name}!`, "success");
    } else {
      displayMessage("Insufficient points!", "error");
    }
  };

  const handlePlayOnline = game => {
    if (purchasedGames.includes(game._id)) {
      displayMessage(`Launching ${game.name}...`, "success");
    } else {
      displayMessage("Please purchase the game first!", "error");
    }
  };

  if (loading) {
    return (
      <Layout className="full-width">
        <section className="gamestore-section">
          <div className="container">
            <div style={{ textAlign: 'center', padding: '50px' }}>Loading games...</div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout className="full-width">
      <section className="gamestore-section">
        <div className="container">
        <h1 className="game-store-title">Game Store</h1>

        <div className="store-controls">
          <div className="category-bar">
            {categories.map(cat => (
              <button
                key={cat}
                className={`category-btn ${selectedCategory === cat ? "active" : ""}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat === "All" ? "All" : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          <div className="search-bar">
            <input
              className="form-input"
              type="text"
              placeholder="Search games..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {showMessage && (
          <div className={`message ${showMessage.type}`}>
            {showMessage.text}
          </div>
        )}

        <div className="game-grid">
          {filteredGames.map(game => {
            const owned = purchasedGames.includes(game._id);
            return (
              <div key={game._id} className="game-card">
                <div className="game-placeholder" style={{ 
                  height: '200px', 
                  background: '#f0f0f0', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  color: '#666'
                }}>
                  🎮 {game.name}
                </div>
                <div className="game-info">
                  <h3>{game.name}</h3>
                  <p>{game.description}</p>
                  <p className="points">{game.points} Points</p>
                  
                  <div className="game-actions">
                    <button
                      className={`btn ${owned ? "btn-primary" : "btn-secondary"}`}
                      onClick={() => handlePlayOnline(game)}
                    >
                      <Gamepad2 size={16} /> Play
                    </button>
                    <button
                      className="btn btn-primary"
                      disabled={owned}
                      onClick={() => handleBuyGame(game)}
                    >
                      {owned ? "Owned" : "Buy"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        </div>
      </section>
    </Layout>
  );
};

export default GameStore;