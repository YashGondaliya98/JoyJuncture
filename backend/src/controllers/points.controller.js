import User from "../models/Account.js";
import { addActivityLog } from "../utils/activityLog.js";

// Example: Game win - adds points
export const gameWin = async (req, res) => {
  try {
    const { userId, gameId, pointsWon } = req.body;
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    // Update points
    user.joyPoints += pointsWon;
    user.walletValue = user.joyPoints;
    
    // Add to activity log
    addActivityLog(user, "game_win", gameId, pointsWon);
    
    await user.save();
    
    res.json({ success: true, newPoints: user.joyPoints });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Example: Cash conversion - deducts points
export const convertToCash = async (req, res) => {
  try {
    const { userId, pointsToConvert } = req.body;
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    if (user.joyPoints < pointsToConvert) {
      return res.status(400).json({ error: "Insufficient points" });
    }
    
    // Update points
    user.joyPoints -= pointsToConvert;
    user.walletValue = user.joyPoints;
    
    // Add to activity log
    addActivityLog(user, "cash_converted", null, -pointsToConvert);
    
    await user.save();
    
    res.json({ success: true, newPoints: user.joyPoints });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Example: Game purchase - deducts points
export const purchaseGame = async (req, res) => {
  try {
    const { userId, gameId, gameCost } = req.body;
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    if (user.joyPoints < gameCost) {
      return res.status(400).json({ error: "Insufficient points" });
    }
    
    // Update points and purchased games
    user.joyPoints -= gameCost;
    user.walletValue = user.joyPoints;
    user.purchasedGames.push(gameId);
    
    // Add to activity log
    addActivityLog(user, "game_purchased", gameId, -gameCost);
    
    await user.save();
    
    res.json({ success: true, newPoints: user.joyPoints });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};