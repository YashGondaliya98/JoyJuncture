import User from "../models/Account.js";
import Game from "../models/Game.js";

const GAME_PRICES = {
  trivia: 5,
  rps: 200,
  guess: 400,
  word: 600
};

export const buyGame = async (req, res) => {
  try {
    const { userId, gameId } = req.body;
    
    if (!userId || !gameId) {
      return res.status(400).json({ error: "User ID and Game ID are required" });
    }
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    // Check if already owned
    if (user.ownedGames.includes(gameId)) {
      return res.status(400).json({ error: "Game already owned" });
    }
    
    const price = GAME_PRICES[gameId];
    if (!price) {
      return res.status(400).json({ error: "Invalid game" });
    }
    
    if (user.joyPoints < price) {
      return res.status(400).json({ error: "Insufficient points" });
    }
    
    // Deduct points and add game
    await User.findByIdAndUpdate(userId, {
      $inc: { joyPoints: -price, walletValue: -price },
      $addToSet: { ownedGames: gameId }
    });
    
    res.json({ success: true, message: "Game purchased successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const playGame = async (req, res) => {
  try {
    const { userId, gameId, won } = req.body;
    
    if (!userId || !gameId) {
      return res.status(400).json({ error: "User ID and Game ID are required" });
    }
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    // Check if game is blocked by admin
    const game = await Game.findOne({ name: gameId });
    if (game && game.status === "blocked") {
      return res.status(403).json({ error: "Game is currently blocked" });
    }
    
    const isOwned = user.ownedGames.includes(gameId);
    const trialCount = user.gameTrials[gameId] || 0;
    
    if (!isOwned && trialCount >= 3) {
      return res.status(403).json({ error: "Trial limit reached. Purchase game to continue." });
    }
    
    // Allow play and increment trial if not owned
    const updateData = {};
    if (!isOwned) {
      updateData[`gameTrials.${gameId}`] = trialCount + 1;
    }
    
    // Add reward if won
    if (won) {
      const reward = GAME_PRICES[gameId] * 0.1; // 10% of game price
      updateData.$inc = { joyPoints: reward, walletValue: reward };
    }
    
    await User.findByIdAndUpdate(userId, updateData);
    
    res.json({ success: true, canPlay: true });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const attendEvent = async (req, res) => {
  try {
    const { userId, eventId } = req.body;
    
    if (!userId || !eventId) {
      return res.status(400).json({ error: "User ID and Event ID are required" });
    }
    
    await User.findByIdAndUpdate(userId, {
      $addToSet: { attendedEvents: eventId }
    });
    
    res.json({ success: true, message: "Event attendance recorded" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};