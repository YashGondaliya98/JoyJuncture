import express from 'express';
import Game from '../models/Game.js';

const router = express.Router();

// Get all games
router.get('/games', async (req, res) => {
  try {
    const games = await Game.find().sort({ createdAt: -1 });
    res.json(games);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add new game
router.post('/games', async (req, res) => {
  try {
    const game = new Game(req.body);
    await game.save();
    res.status(201).json(game);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ error: 'Game name already exists' });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
});

// Update game status
router.patch('/games/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const game = await Game.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }
    res.json(game);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;