import React, { useState } from "react";
import { Gamepad2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./homepage.css";  
import "./gamestore.css";
import logo from "../assets/logo.png";
import sudokuImg from "../assets/sudoku.png";
import puzzle from "../assets/2048puzzle.png";

const GameStore = () => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [walletPoints, setWalletPoints] = useState(500);
  const [purchasedGames, setPurchasedGames] = useState([]);
  const [showMessage, setShowMessage] = useState(null);

  const games = [
    {
      id: 1,
      title: "Tic Tac Toe",
      category: "Board",
      points: 50,
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=400&h=300&fit=crop",
      description: "Classic 3x3 grid game. Challenge the AI or play with friends."
    },
    {
      id: 2,
      title: "Chess Master",
      category: "Board",
      points: 150,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1586165368502-1bad197a6461?w=400&h=300&fit=crop",
      description: "Ultimate chess experience with multiple difficulty levels."
    },
    {
      id: 3,
      title: "Sudoku Challenge",
      category: "Puzzle",
      points: 80,
      rating: 4.7,
      image: sudokuImg,
      description: "Train your brain with classic Sudoku puzzles."
    },
    {
      id: 4,
      title: "Snake Game",
      category: "Arcade",
      points: 60,
      rating: 4.4,
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=300&fit=crop",
      description: "Classic snake game with modern graphics."
    },
    {
      id: 5,
      title: "2048 Puzzle",
      category: "Puzzle",
      points: 70,
      rating: 4.6,
      image: puzzle,
      description: "Combine tiles to reach 2048."
    },
    {
      id: 6,
      title: "Memory Match",
      category: "Puzzle",
      points: 55,
      rating: 4.3,
      image: "https://images.unsplash.com/photo-1594122230689-45899d9e6f69?w=400&h=300&fit=crop",
      description: "Flip cards and find matching pairs."
    }
  ];

  const categories = ["All", "Board", "Puzzle", "Arcade", "Card"];

  const filteredGames = games.filter(game =>
    (game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      game.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedCategory === "All" || game.category === selectedCategory)
  );

  const displayMessage = (text, type) => {
    setShowMessage({ text, type });
    setTimeout(() => setShowMessage(null), 3000);
  };

  const handleBuyGame = game => {
    if (purchasedGames.includes(game.id)) {
      displayMessage(`You already own ${game.title}`, "info");
      return;
    }

    if (walletPoints >= game.points) {
      setWalletPoints(walletPoints - game.points);
      setPurchasedGames([...purchasedGames, game.id]);
      displayMessage(`Purchased ${game.title}!`, "success");
    } else {
      displayMessage("Insufficient points!", "error");
    }
  };

  const handlePlayOnline = game => {
    if (purchasedGames.includes(game.id)) {
      displayMessage(`Launching ${game.title}...`, "success");
    } else {
      displayMessage("Please purchase the game first!", "error");
    }
  };

  return (
    <>
      {/* ================= HEADER ================= */}
      <header>
        <nav>
          <img src={logo} alt="Joy Juncture" className="logo-img" />
          <div className="logo">Joy Juncture</div>

          <ul className="nav-links">
            <li onClick={() => navigate("/")}>Home</li>
            <li onClick={() => navigate("/about")}>About Us</li>
            <li onClick={() => navigate("/founder")}>Founder Story</li>
            <li className="login-btn" onClick={() => navigate("/login")}>Login</li>
          </ul>
        </nav>
      </header>

      <div style={{ paddingTop: "100px" }} className="game-store-container">
        {/* ================= PAGE TITLE ================= */}
        <h1 className="game-store-title">Game Store</h1>

        {/* ================= CATEGORY FILTER ================= */}
        <div className="category-bar">
          {categories.map(cat => (
            <button
              key={cat}
              className={selectedCategory === cat ? "active" : ""}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ================= SEARCH BAR ================= */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search games..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* ================= MESSAGE ================= */}
        {showMessage && (
          <div className={`message ${showMessage.type}`}>
            {showMessage.text}
          </div>
        )}

        {/* ================= GAME GRID ================= */}
        <div className="game-grid">
          {filteredGames.map(game => {
            const owned = purchasedGames.includes(game.id);
            return (
              <div key={game.id} className="game-card">
                <img src={game.image} alt={game.title} />
                <h3>{game.title}</h3>
                <p>{game.description}</p>
                <p className="points">{game.points} Points</p>

                <div className="btn-row">
                  <button
                    className={owned ? "play owned" : "play"}
                    onClick={() => handlePlayOnline(game)}
                  >
                    <Gamepad2 size={16} /> Play
                  </button>
                  <button
                    className="buy"
                    disabled={owned}
                    onClick={() => handleBuyGame(game)}
                  >
                    {owned ? "Owned" : "Buy"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ================= FOOTER ================= */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-section">
            <h3>🎉 Joy Juncture</h3>
            <p>A joyful ecosystem of games, experiences and community where play creates lasting connections.</p>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li onClick={() => navigate("/")}>Home</li>
              <li onClick={() => navigate("/about")}>About Us</li>
              <li onClick={() => navigate("/founder")}>Founder Story</li>
              <li onClick={() => navigate("/gamestore")}>Game Store</li>
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

export default GameStore;
